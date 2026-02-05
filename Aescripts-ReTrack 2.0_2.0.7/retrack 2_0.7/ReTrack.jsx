/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function ms_ReTrack_Global(thisObj) {
  function Check_Net() {
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
        alert(
          "Can\'t access Files. Can\'t create folder. Please tick the \"Allow Scripts to Write Files and Access Network\" checkbox if Preferences > General to run the script.",
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
    function ReTrack(thisObj) {
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
      function Clear_Console() {
        var bt = new BridgeTalk();
        bt.target = "estoolkit-4.0";
        bt.body =
          function () {
            app.clc();
          }.toSource() + "()";
        bt.send(5);
      }
      function Add_Keys(prop, keys_array) {
        if (keys_array.length > 0) {
          var times_arr = [];
          var values_arr = [];
          for (var ak = 0; ak < keys_array.length; ak += 1) {
            var key_time = keys_array[ak].time;
            var key_value = keys_array[ak].value;
            var key_index = keys_array[ak].index;
            if (prop.matchName == "ADBE Mask Shape") {
              var mask_value = prop.value;
              mask_value.vertices = key_value.vertices;
              mask_value.inTangents = key_value.inTangents;
              mask_value.outTangents = key_value.outTangents;
              key_value = mask_value;
            }
            times_arr.push(key_time);
            values_arr.push(key_value);
            prop.setValuesAtTimes(times_arr, values_arr);
          }
          for (var ak = 0; ak < keys_array.length; ak += 1) {
            var in_in = keys_array[ak].inIn.toString();
            in_in = parseFloat(in_in.slice(-2));
            if (in_in == 12) {
              var conv_in_in = KeyframeInterpolationType.LINEAR;
            }
            if (in_in == 13) {
              var conv_in_in = KeyframeInterpolationType.BEZIER;
            }
            if (in_in == 14) {
              var conv_in_in = KeyframeInterpolationType.HOLD;
            }
            var out_in = keys_array[ak].outIn.toString();
            out_in = parseFloat(out_in.slice(-2));
            if (out_in == 12) {
              var conv_out_in = KeyframeInterpolationType.LINEAR;
            }
            if (out_in == 13) {
              var conv_out_in = KeyframeInterpolationType.BEZIER;
            }
            if (out_in == 14) {
              var conv_out_in = KeyframeInterpolationType.HOLD;
            }
            newKeyIndex = ak + 1;
            if (conv_out_in != KeyframeInterpolationType.HOLD) {
              var ease_array = keys_array[ak].ease;
              var ease_in = [];
              var ease_out = [];
              for (var ae = 0; ae < ease_array.length; ae += 1) {
                var in_e = new KeyframeEase(
                  ease_array[ae][0],
                  ease_array[ae][1],
                );
                var out_e = new KeyframeEase(
                  ease_array[ae][2],
                  ease_array[ae][3],
                );
                ease_in.push(in_e);
                ease_out.push(out_e);
              }
              prop.setTemporalEaseAtKey(newKeyIndex, ease_in, ease_out);
            }
            prop.setInterpolationTypeAtKey(
              newKeyIndex,
              conv_in_in,
              conv_out_in,
            );
            if (
              conv_in_in == KeyframeInterpolationType.BEZIER &&
              conv_out_in == KeyframeInterpolationType.BEZIER
            ) {
              prop.setTemporalContinuousAtKey(newKeyIndex, keys_array[ak].cb);
              prop.setTemporalAutoBezierAtKey(newKeyIndex, keys_array[ak].ab);
            }
            if (
              prop.propertyValueType == PropertyValueType.TwoD_SPATIAL ||
              prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL
            ) {
              prop.setSpatialContinuousAtKey(newKeyIndex, keys_array[ak].scb);
              prop.setSpatialAutoBezierAtKey(newKeyIndex, keys_array[ak].sab);
              prop.setSpatialTangentsAtKey(
                newKeyIndex,
                keys_array[ak].ist,
                keys_array[ak].ost,
              );
            }
          }
          if (
            prop.propertyValueType == PropertyValueType.TwoD_SPATIAL ||
            prop.propertyValueType == PropertyValueType.ThreeD_SPATIAL
          ) {
            for (var ar = 0; ar < keys_array.length; ar += 1) {
              prop.setRovingAtKey(ar + 1, keys_array[ar].rov);
            }
          }
        }
      }
      function Get_Key_Data(prop) {
        var twoDS = PropertyValueType.TwoD_SPATIAL;
        var threeDS = PropertyValueType.ThreeD_SPATIAL;
        var kda = [];
        var prop_match = prop.matchName;
        for (var ak = 1; ak <= prop.numKeys; ak += 1) {
          var key_time = prop.keyTime(ak);
          var key_index = ak;
          var key_value = prop.valueAtTime(key_time, true);
          var inIn = prop.keyInInterpolationType(key_index);
          var outIn = prop.keyOutInterpolationType(key_index);
          if (
            inIn == KeyframeInterpolationType.BEZIER &&
            outIn == KeyframeInterpolationType.BEZIER
          ) {
            ab = prop.keyTemporalAutoBezier(key_index);
            cb = prop.keyTemporalContinuous(key_index);
          }
          if (
            inIn != KeyframeInterpolationType.HOLD ||
            outIn != KeyframeInterpolationType.HOLD
          ) {
            var ease_dim = [];
            for (
              var ae = 0;
              ae < prop.keyInTemporalEase(key_index).length;
              ae += 1
            ) {
              ease_dim[ae] = [];
              in_speed = prop.keyInTemporalEase(key_index)[ae].speed;
              temp_in_infl = prop.keyInTemporalEase(key_index)[ae].influence;
              out_speed = prop.keyOutTemporalEase(key_index)[ae].speed;
              temp_out_infl = prop.keyOutTemporalEase(key_index)[ae].influence;
              if (temp_in_infl < 0.1) {
                var in_infl = 0.1;
              } else {
                var in_infl = temp_in_infl;
              }
              if (temp_out_infl < 0.1) {
                var out_infl = 0.1;
              } else {
                var out_infl = temp_out_infl;
              }
              ease_dim[ae].push(in_speed, in_infl, out_speed, out_infl);
            }
          }
          if (
            prop.propertyValueType == twoDS ||
            prop.propertyValueType == threeDS
          ) {
            sab = prop.keySpatialAutoBezier(key_index);
            scb = prop.keySpatialContinuous(key_index);
            ist = prop.keyInSpatialTangent(key_index);
            ost = prop.keyOutSpatialTangent(key_index);
            rov = prop.keyRoving(key_index);
          }
          kda[kda.length] = {
            ab: ab,
            cb: cb,
            ease: ease_dim,
            inIn: inIn,
            index: key_index,
            ist: ist,
            ost: ost,
            outIn: outIn,
            rov: rov,
            sab: sab,
            scb: scb,
            time: key_time,
            value: key_value,
          };
        }
        return kda;
      }
      function Select_Layers() {
        if (app.project && app.project.activeItem) {
          var sel_layers = app.project.activeItem.selectedLayers;
          var sel = [];
          for (var al = 0; al < sel_layers.length; al += 1) {
            var selected_layer = sel_layers[al];
            var index = selected_layer.index;
            sel.push(index);
          }
          if (sel_layers.length > 1) {
            sel.sort(function (a, b) {
              return a > b;
            });
          }
        } else {
          sel = 0;
        }
        return sel;
      }
      function Perpendicular(A, B, C) {
        var x1 = A[0];
        var y1 = A[1];
        var x2 = B[0];
        var y2 = B[1];
        var x3 = C[0];
        var y3 = C[1];
        var px = x2 - x1;
        var py = y2 - y1;
        var dAB = px * px + py * py;
        var u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;
        var x = x1 + u * px;
        var y = y1 + u * py;
        return [x, y];
      }
      function Rotate(cx, cy, x, y, angle, rt) {
        var radians = (Math.PI / 180) * angle;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var nx = cos * (x - cx) * rt + sin * (y - cy) * rt + cx;
        var ny = cos * (y - cy) * rt - sin * (x - cx) * rt + cy;
        return [nx, ny];
      }
      function Perpendicular(tg, v) {
        var p1 = tg[0];
        var p2 = tg[1];
        var px = p2[0] - p1[0];
        var py = p2[1] - p1[1];
        var dAB = px * px + py * py;
        var u = ((v[0] - p1[0]) * px + (v[1] - p1[1]) * py) / dAB;
        var x = p1[0] + u * px;
        var y = p1[1] + u * py;
        return [x, y];
      }
      function Expand_Points(poly, spacing) {
        var resulting_path = [];
        var N = poly.length;
        for (var i = 0; i < N; i += 1) {
          mi =
            (poly[(i + 1) % N][1] - poly[i][1]) /
            (poly[(i + 1) % N][0] - poly[i][0]);
          mi1 =
            (poly[(i + 2) % N][1] - poly[(i + 1) % N][1]) /
            (poly[(i + 2) % N][0] - poly[(i + 1) % N][0]);
          li = Math.sqrt(
            (poly[(i + 1) % N][0] - poly[i][0]) *
              (poly[(i + 1) % N][0] - poly[i][0]) +
              (poly[(i + 1) % N][1] - poly[i][1]) *
                (poly[(i + 1) % N][1] - poly[i][1]),
          );
          li1 = Math.sqrt(
            (poly[(i + 2) % N][0] - poly[(i + 1) % N][0]) *
              (poly[(i + 2) % N][0] - poly[(i + 1) % N][0]) +
              (poly[(i + 2) % N][1] - poly[(i + 1) % N][1]) *
                (poly[(i + 2) % N][1] - poly[(i + 1) % N][1]),
          );
          ri =
            poly[i][0] + (spacing * (poly[(i + 1) % N][1] - poly[i][1])) / li;
          ri1 =
            poly[(i + 1) % N][0] +
            (spacing * (poly[(i + 2) % N][1] - poly[(i + 1) % N][1])) / li1;
          si =
            poly[i][1] - (spacing * (poly[(i + 1) % N][0] - poly[i][0])) / li;
          si1 =
            poly[(i + 1) % N][1] -
            (spacing * (poly[(i + 2) % N][0] - poly[(i + 1) % N][0])) / li1;
          Xi1 = (mi1 * ri1 - mi * ri + si - si1) / (mi1 - mi);
          Yi1 = (mi * mi1 * (ri1 - ri) + mi1 * si - mi * si1) / (mi1 - mi);
          if (poly[(i + 1) % N][0] - poly[i % N][0] == 0) {
            Xi1 =
              poly[(i + 1) % N][0] +
              (spacing * (poly[(i + 1) % N][1] - poly[i % N][1])) /
                Math.abs(poly[(i + 1) % N][1] - poly[i % N][1]);
            Yi1 = mi1 * Xi1 - mi1 * ri1 + si1;
          }
          if (poly[(i + 2) % N][0] - poly[(i + 1) % N][0] == 0) {
            Xi1 =
              poly[(i + 2) % N][0] +
              (spacing * (poly[(i + 2) % N][1] - poly[(i + 1) % N][1])) /
                Math.abs(poly[(i + 2) % N][1] - poly[(i + 1) % N][1]);
            Yi1 = mi * Xi1 - mi * ri + si;
          }
          resulting_path.push([Xi1, Yi1]);
        }
        return resulting_path;
      }
      function Point_Bilinear_Interpolation(v, pins, akr) {
        function cross(a, b) {
          return [a[0] * b[1] - a[1] * b[0]];
        }
        function Expand(p1, p2, pc) {
          var v1 = p1 - pc;
          var v2 = p2 - pc;
          var w = v1 + v2;
          var sq = Math.sqrt(w[0] * w[0] + w[1] * w[1]);
          var v = [w[0] / sq, w[1] / sq];
          var nx = pc[0] + k * v[0];
          var ny = pc[1] + k * v[1];
          return [nx, ny];
        }
        var a = pins[0][akr];
        var b = pins[1][akr];
        var c = pins[3][akr];
        var d = pins[2][akr];
        var arr = [a, b, c, d];
        var p = v;
        var achk = Check_Inside(p, arr);
        if (achk === false) {
          var dists = [];
          for (var aa = 0; aa < arr.length; aa += 1) {
            var vx = arr[aa][0];
            var vy = arr[aa][1];
            var ds = Math.sqrt(Math.pow(vx - v[0], 2) + Math.pow(vy - v[1], 2));
            dists.push(ds);
          }
          var spacing = dists.sort(function (a, b) {
            return b < a;
          })[0];
          spacing = spacing + (spacing / 100) * 200;
          var npins = Expand_Points(arr, spacing);
          a = npins[0];
          b = npins[1];
          c = npins[3];
          d = npins[2];
        }
        var e = b - a;
        var f = d - a;
        var g = a - b + c - d;
        var h = p - a;
        var k2 = cross(g, f);
        var k1 = cross(e, f) + cross(h, g);
        var k0 = cross(h, e);
        var w = k1 * k1 - 4 * k0 * k2;
        if (w < 0) {
          w = -1;
        }
        var neg = false;
        if (w < 0) {
          w = Math.sqrt(w * -1);
          var neg = true;
        } else {
          w = Math.sqrt(w);
        }
        var v1 = (-k1 - w) / (2 * k2);
        var u1 = (h[0] - f[0] * v1) / (e[0] + g[0] * v1);
        var v2 = (-k1 + w) / (2 * k2);
        var u2 = (h[0] - f[0] * v2) / (e[0] + g[0] * v2);
        var u = u1;
        var v = v1;
        if (v < 0 || v > 1 || u < 0 || u > 1) {
          u = u2;
          v = v2;
        }
        if (v < 0 || v > 1 || u < 0 || u > 1) {
        }
        v = 1 - v;
        var vals = [];
        for (var ak = 0; ak - pins[0].length; ak++) {
          var a = pins[0][ak];
          var b = pins[1][ak];
          var c = pins[3][ak];
          var d = pins[2][ak];
          var arr = [a, b, c, d];
          if (achk === false) {
            var npins = Expand_Points(arr, spacing);
            a = npins[0];
            b = npins[1];
            c = npins[3];
            d = npins[2];
          }
          var x =
            (1 - u) * ((1 - v) * d[0] + v * a[0]) +
            u * ((1 - v) * c[0] + v * b[0]);
          var y =
            (1 - u) * ((1 - v) * d[1] + v * a[1]) +
            u * ((1 - v) * c[1] + v * b[1]);
          vals.push([x, y]);
        }
        return vals;
      }
      function Point_Triangulation(v, pins, akr, rtype) {
        function Find_Close(cd, cpins) {
          var cvals = [];
          for (var ak = 0; ak < cpins[0].length; ak += 1) {
            var crver = [cpins[0][ak], cpins[1][ak], cpins[2][ak]];
            var cc = Get_Polygon_Centroid(crver);
            var cnv = cc + cd;
            cvals.push(cnv);
          }
          return cvals;
        }
        var fd = app.project.activeItem.frameDuration;
        var rver = [pins[0][akr], pins[1][akr], pins[2][akr]];
        var c = Get_Polygon_Centroid(rver);
        var d = v - c;
        if (rtype == "close") {
          var vals = Find_Close(d, pins);
        }
        if (rtype == "angle") {
          var tg1 = [rver[0], rver[1]];
          var tg2 = [rver[1], rver[2]];
          var tg3 = [rver[2], rver[0]];
          var d1 = Math.sqrt(
            Math.pow(rver[0][0] - v[0], 2) + Math.pow(rver[0][1] - v[1], 2),
          );
          var d2 = Math.sqrt(
            Math.pow(rver[1][0] - v[0], 2) + Math.pow(rver[1][1] - v[1], 2),
          );
          var d3 = Math.sqrt(
            Math.pow(rver[2][0] - v[0], 2) + Math.pow(rver[2][1] - v[1], 2),
          );
          var dists = [
            [0, d1],
            [1, d2],
            [2, d3],
          ];
          dists.sort(function (a, b) {
            return b[1] < a[1];
          })[0];
          var ref1 = dists[0][0];
          var ref2 = dists[1][0];
          var ref3 = dists[2][0];
          var p10 = pins[ref1][akr];
          var p20 = pins[ref2][akr];
          var p30 = pins[ref3][akr];
          var c0 = Get_Polygon_Centroid([p10, p20, p30]);
          var d = v - c0;
          var times = [];
          var vals = [];
          for (var ak = 0; ak < pins[0].length; ak += 1) {
            var t = ak * fd;
            times.push(t);
            var p1 = pins[ref1][ak];
            var p2 = pins[ref2][ak];
            var p3 = pins[ref3][ak];
            var c = Get_Polygon_Centroid([p1, p2, p3]);
            var fv = c + d;
            vals.push(fv);
          }
        }
        return vals;
      }
      function Point_Perspective_Interpolation(newp, pins, cf) {
        function numeric_identity(n) {
          return numeric_diag(numeric_rep([n], 1));
        }
        function numeric_cloneV(x) {
          var _n = x.length;
          var ret = Array(_n);
          for (i = _n - 1; i !== -1; --i) {
            ret[i] = x[i];
          }
          return ret;
        }
        function numeric_clone(x) {
          if (typeof x !== "object") {
            return x;
          }
          var V = numeric_cloneV;
          var s = numeric_dim(x);
          return numeric__foreach2(x, s, 0, V);
        }
        function numeric_dotMMsmall(x, y) {
          p = x.length;
          q = y.length;
          r = y[0].length;
          ret = Array(p);
          for (i = p - 1; i >= 0; i--) {
            foo = Array(r);
            bar = x[i];
            for (k = r - 1; k >= 0; k--) {
              woo = bar[q - 1] * y[q - 1][k];
              for (j = q - 2; j >= 1; j -= 2) {
                i0 = j - 1;
                woo += bar[j] * y[j][k] + bar[i0] * y[i0][k];
              }
              if (j === 0) {
                woo += bar[0] * y[0][k];
              }
              foo[k] = woo;
            }
            ret[i] = foo;
          }
          return ret;
        }
        function round(num) {
          return Math.round(num * 10000000000) / 10000000000;
        }
        function getNormalizationCoefficients(srcPts, dstPts) {
          var r1 = [
            srcPts[0],
            srcPts[1],
            1,
            0,
            0,
            0,
            -1 * dstPts[0] * srcPts[0],
            -1 * dstPts[0] * srcPts[1],
          ];
          var r2 = [
            0,
            0,
            0,
            srcPts[0],
            srcPts[1],
            1,
            -1 * dstPts[1] * srcPts[0],
            -1 * dstPts[1] * srcPts[1],
          ];
          var r3 = [
            srcPts[2],
            srcPts[3],
            1,
            0,
            0,
            0,
            -1 * dstPts[2] * srcPts[2],
            -1 * dstPts[2] * srcPts[3],
          ];
          var r4 = [
            0,
            0,
            0,
            srcPts[2],
            srcPts[3],
            1,
            -1 * dstPts[3] * srcPts[2],
            -1 * dstPts[3] * srcPts[3],
          ];
          var r5 = [
            srcPts[4],
            srcPts[5],
            1,
            0,
            0,
            0,
            -1 * dstPts[4] * srcPts[4],
            -1 * dstPts[4] * srcPts[5],
          ];
          var r6 = [
            0,
            0,
            0,
            srcPts[4],
            srcPts[5],
            1,
            -1 * dstPts[5] * srcPts[4],
            -1 * dstPts[5] * srcPts[5],
          ];
          var r7 = [
            srcPts[6],
            srcPts[7],
            1,
            0,
            0,
            0,
            -1 * dstPts[6] * srcPts[6],
            -1 * dstPts[6] * srcPts[7],
          ];
          var r8 = [
            0,
            0,
            0,
            srcPts[6],
            srcPts[7],
            1,
            -1 * dstPts[7] * srcPts[6],
            -1 * dstPts[7] * srcPts[7],
          ];
          var matA = [r1, r2, r3, r4, r5, r6, r7, r8];
          var matB = dstPts;
          try {
            matC = numeric_inv(
              numeric_dotMMsmall(numeric_transpose(matA), matA),
            );
          } catch (e) {
            return [1, 0, 0, 0, 1, 0, 0, 0];
          }
          var matD = numeric_dotMMsmall(matC, numeric_transpose(matA));
          var matX = numeric_dotMV(matD, matB);
          for (var i = 0; i < matX.length; i += 1) {
            matX[i] = round(matX[i]);
          }
          matX[8] = 1;
          return matX;
        }
        function PerspT(srcPts, dstPts) {
          coeffs = getNormalizationCoefficients(srcPts, dstPts);
          return coeffs;
        }
        function transformer(x, y) {
          var coordinates = [];
          coordinates[0] =
            (coeffs[0] * x + coeffs[1] * y + coeffs[2]) /
            (coeffs[6] * x + coeffs[7] * y + 1);
          coordinates[1] =
            (coeffs[3] * x + coeffs[4] * y + coeffs[5]) /
            (coeffs[6] * x + coeffs[7] * y + 1);
          return coordinates;
        }
        function z_transformer(x, y) {
          var coordinates = [];
          coordinates[0] =
            (coeffs[0] * x + coeffs[1] * y + coeffs[2]) /
            (coeffs[6] * x + coeffs[7] * y + 1);
          coordinates[1] =
            (coeffs[3] * x + coeffs[4] * y + coeffs[5]) /
            (coeffs[6] * x + coeffs[7] * y + 1);
          return coordinates;
        }
        numeric_diag = function diag(d) {
          var n = d.length;
          var A = Array(n);
          for (i = n - 1; i >= 0; i--) {
            Ai = Array(n);
            i1 = i + 2;
            for (j = n - 1; j >= i1; j -= 2) {
              Ai[j] = 0;
              Ai[j - 1] = 0;
            }
            if (j > i) {
              Ai[j] = 0;
            }
            Ai[i] = d[i];
            for (j = i - 1; j >= 1; j -= 2) {
              Ai[j] = 0;
              Ai[j - 1] = 0;
            }
            if (j === 0) {
              Ai[0] = 0;
            }
            A[i] = Ai;
          }
          return A;
        };
        numeric_rep = function rep(s, v, k) {
          if (typeof k === "undefined") {
            k = 0;
          }
          var n = s[k];
          var ret = Array(n);
          if (k === s.length - 1) {
            for (i = n - 2; i >= 0; i -= 2) {
              ret[i + 1] = v;
              ret[i] = v;
            }
            if (i === -1) {
              ret[0] = v;
            }
            return ret;
          }
          for (i = n - 1; i >= 0; i--) {
            ret[i] = numeric.rep(s, v, k + 1);
          }
          return ret;
        };
        numeric_dim = function dim(x) {
          if (typeof x === "object") {
            y = x[0];
            if (typeof y === "object") {
              z = y[0];
              if (typeof z === "object") {
                return numeric._dim(x);
              }
              return [x.length, y.length];
            }
            return [x.length];
          }
          return [];
        };
        numeric__foreach2 = function _foreach2(x, s, k, f) {
          if (k === s.length - 1) {
            return f(x);
          }
          var n = s[k];
          var ret = Array(n);
          for (i = n - 1; i >= 0; i--) {
            ret[i] = _foreach2(x[i], s, k + 1, f);
          }
          return ret;
        };
        numeric_transpose = function transpose(x) {
          var m = x.length;
          var n = x[0].length;
          var ret = Array(n);
          for (var j = 0; j < n; j += 1) {
            ret[j] = Array(m);
          }
          for (i = m - 1; i >= 1; i -= 2) {
            A1 = x[i];
            A0 = x[i - 1];
            for (j = n - 1; j >= 1; --j) {
              Bj = ret[j];
              Bj[i] = A1[j];
              Bj[i - 1] = A0[j];
              --j;
              Bj = ret[j];
              Bj[i] = A1[j];
              Bj[i - 1] = A0[j];
            }
            if (j === 0) {
              Bj = ret[0];
              Bj[i] = A1[0];
              Bj[i - 1] = A0[0];
            }
          }
          if (i === 0) {
            A0 = x[0];
            for (j = n - 1; j >= 1; --j) {
              ret[j][0] = A0[j];
              --j;
              ret[j][0] = A0[j];
            }
            if (j === 0) {
              ret[0][0] = A0[0];
            }
          }
          return ret;
        };
        numeric_inv = function inv(a) {
          var s = numeric_dim(a);
          var abs = Math.abs;
          var m = s[0];
          var n = s[1];
          var A = numeric_clone(a);
          var I = numeric_identity(m);
          for (var j = 0; j < n; j += 1) {
            var i0 = -1;
            var v0 = -1;
            for (i = j; i !== m; ++i) {
              k = abs(A[i][j]);
              if (k > v0) {
                i0 = i;
                v0 = k;
              }
            }
            Aj = A[i0];
            A[i0] = A[j];
            A[j] = Aj;
            Ij = I[i0];
            I[i0] = I[j];
            I[j] = Ij;
            x = Aj[j];
            for (k = j; k !== n; ++k) {
              Aj[k] /= x;
            }
            for (k = n - 1; k !== -1; --k) {
              Ij[k] /= x;
            }
            for (i = m - 1; i !== -1; --i) {
              if (i !== j) {
                Ai = A[i];
                Ii = I[i];
                x = Ai[j];
                for (k = j + 1; k !== n; ++k) {
                  Ai[k] -= Aj[k] * x;
                }
                for (k = n - 1; k > 0; --k) {
                  Ii[k] -= Ij[k] * x;
                  --k;
                  Ii[k] -= Ij[k] * x;
                }
                if (k === 0) {
                  Ii[0] -= Ij[0] * x;
                }
              }
            }
          }
          return I;
        };
        numeric_dotMMsmall = function dotMMsmall(x, y) {
          p = x.length;
          q = y.length;
          r = y[0].length;
          ret = Array(p);
          for (i = p - 1; i >= 0; i--) {
            foo = Array(r);
            bar = x[i];
            for (k = r - 1; k >= 0; k--) {
              woo = bar[q - 1] * y[q - 1][k];
              for (j = q - 2; j >= 1; j -= 2) {
                i0 = j - 1;
                woo += bar[j] * y[j][k] + bar[i0] * y[i0][k];
              }
              if (j === 0) {
                woo += bar[0] * y[0][k];
              }
              foo[k] = woo;
            }
            ret[i] = foo;
          }
          return ret;
        };
        numeric_dotMMsmall = function dotMMsmall(x, y) {
          p = x.length;
          q = y.length;
          r = y[0].length;
          ret = Array(p);
          for (i = p - 1; i >= 0; i--) {
            foo = Array(r);
            bar = x[i];
            for (k = r - 1; k >= 0; k--) {
              woo = bar[q - 1] * y[q - 1][k];
              for (j = q - 2; j >= 1; j -= 2) {
                i0 = j - 1;
                woo += bar[j] * y[j][k] + bar[i0] * y[i0][k];
              }
              if (j === 0) {
                woo += bar[0] * y[0][k];
              }
              foo[k] = woo;
            }
            ret[i] = foo;
          }
          return ret;
        };
        numeric_dotVV = function dotVV(x, y) {
          var n = x.length;
          var ret = x[n - 1] * y[n - 1];
          for (i = n - 2; i >= 1; i -= 2) {
            i1 = i - 1;
            ret += x[i] * y[i] + x[i1] * y[i1];
          }
          if (i === 0) {
            ret += x[0] * y[0];
          }
          return ret;
        };
        numeric_dotMV = function dotMV(x, y) {
          var p = x.length;
          var ret = Array(p);
          var dotVV = numeric_dotVV;
          for (i = p - 1; i >= 0; i--) {
            ret[i] = dotVV(x[i], y);
          }
          return ret;
        };
        var proj = pins;
        var proj_arr = [];
        for (var ak = 0; ak < proj[0].length; ak += 1) {
          var srcPts = [
            proj[0][cf][0],
            proj[0][cf][1],
            proj[1][cf][0],
            proj[1][cf][1],
            proj[2][cf][0],
            proj[2][cf][1],
            proj[3][cf][0],
            proj[3][cf][1],
          ];
          var dstPts = [
            proj[0][ak][0],
            proj[0][ak][1],
            proj[1][ak][0],
            proj[1][ak][1],
            proj[2][ak][0],
            proj[2][ak][1],
            proj[3][ak][0],
            proj[3][ak][1],
          ];
          var perspT = PerspT(srcPts, dstPts);
          var srcPt = [newp[0], newp[1]];
          var dstPt = z_transformer(srcPt[0], srcPt[1]);
          proj_arr.push(dstPt);
        }
        return proj_arr;
      }
      function Triangulate(vertices) {
        function z_supertriangle(vertices) {
          var xmin = Number.POSITIVE_INFINITY;
          var ymin = Number.POSITIVE_INFINITY;
          var xmax = Number.NEGATIVE_INFINITY;
          var ymax = Number.NEGATIVE_INFINITY;
          for (i = vertices.length; i--; ) {
            if (vertices[i][0] < xmin) {
              xmin = vertices[i][0];
            }
            if (vertices[i][0] > xmax) {
              xmax = vertices[i][0];
            }
            if (vertices[i][1] < ymin) {
              ymin = vertices[i][1];
            }
            if (vertices[i][1] > ymax) {
              ymax = vertices[i][1];
            }
          }
          dx = xmax - xmin;
          dy = ymax - ymin;
          dmax = Math.max(dx, dy);
          xmid = xmin + dx * 0.5;
          ymid = ymin + dy * 0.5;
          return [
            [xmid - 20 * dmax, ymid - dmax],
            [xmid, ymid + 20 * dmax],
            [xmid + 20 * dmax, ymid - dmax],
          ];
        }
        function z_circumcircle(vertices, i, j, k) {
          var x1 = vertices[i][0];
          var y1 = vertices[i][1];
          var x2 = vertices[j][0];
          var y2 = vertices[j][1];
          var x3 = vertices[k][0];
          var y3 = vertices[k][1];
          var fabsy1y2 = Math.abs(y1 - y2);
          var fabsy2y3 = Math.abs(y2 - y3);
          if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON) {
            throw new Error("Eek! Coincident points!");
          }
          if (fabsy1y2 < EPSILON) {
            m2 = -((x3 - x2) / (y3 - y2));
            mx2 = (x2 + x3) / 2;
            my2 = (y2 + y3) / 2;
            xc = (x2 + x1) / 2;
            yc = m2 * (xc - mx2) + my2;
          } else {
            if (fabsy2y3 < EPSILON) {
              m1 = -((x2 - x1) / (y2 - y1));
              mx1 = (x1 + x2) / 2;
              my1 = (y1 + y2) / 2;
              xc = (x3 + x2) / 2;
              yc = m1 * (xc - mx1) + my1;
            } else {
              m1 = -((x2 - x1) / (y2 - y1));
              m2 = -((x3 - x2) / (y3 - y2));
              mx1 = (x1 + x2) / 2;
              mx2 = (x2 + x3) / 2;
              my1 = (y1 + y2) / 2;
              my2 = (y2 + y3) / 2;
              xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
              yc =
                fabsy1y2 > fabsy2y3
                  ? m1 * (xc - mx1) + my1
                  : m2 * (xc - mx2) + my2;
            }
          }
          dx = x2 - xc;
          dy = y2 - yc;
          return { i: i, j: j, k: k, r: dx * dx + dy * dy, x: xc, y: yc };
        }
        function z_dedup(edges) {
          for (j = edges.length; j; ) {
            b = edges[--j];
            a = edges[--j];
            for (i = j; i; ) {
              n = edges[--i];
              m = edges[--i];
              if ((a === m && b === n) || (a === n && b === m)) {
                edges.splice(j, 2);
                edges.splice(i, 2);
                break;
              }
            }
          }
        }
        var EPSILON = 9.5367431640625e-7;
        var Delaunay = {
          contains: function (tri, p) {
            if (
              (p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
              (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
              (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
              (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1])
            ) {
              return null;
            }
            var a = tri[1][0] - tri[0][0];
            var b = tri[2][0] - tri[0][0];
            var c = tri[1][1] - tri[0][1];
            var d = tri[2][1] - tri[0][1];
            var i = a * d - b * c;
            if (i === 0) {
              return null;
            }
            var u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i;
            var v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;
            if (u < 0 || v < 0 || u + v > 1) {
              return null;
            }
            return [u, v];
          },
          triangulate: function (vertices, key) {
            var n = vertices.length;
            if (n < 3) {
              return [];
            }
            vertices = vertices.slice(0);
            if (key) {
              for (i = n; i--; ) {
                vertices[i] = vertices[i][key];
              }
            }
            indices = new Array(n);
            for (i = n; i--; ) {
              indices[i] = i;
            }
            indices.sort(function (i, j) {
              var diff = vertices[j][0] - vertices[i][0];
              return diff !== 0 ? diff : i - j;
            });
            st = z_supertriangle(vertices);
            vertices.push(st[0], st[1], st[2]);
            open = [z_circumcircle(vertices, n + 0, n + 1, n + 2)];
            closed = [];
            edges = [];
            for (i = indices.length; i--; edges.length = 0) {
              c = indices[i];
              for (j = open.length; j--; ) {
                dx = vertices[c][0] - open[j].x;
                if (dx > 0 && dx * dx > open[j].r) {
                  closed.push(open[j]);
                  open.splice(j, 1);
                  continue;
                }
                dy = vertices[c][1] - open[j].y;
                if (dx * dx + dy * dy - open[j].r > EPSILON) {
                  continue;
                }
                edges.push(
                  open[j].i,
                  open[j].j,
                  open[j].j,
                  open[j].k,
                  open[j].k,
                  open[j].i,
                );
                open.splice(j, 1);
              }
              z_dedup(edges);
              for (j = edges.length; j; ) {
                b = edges[--j];
                a = edges[--j];
                open.push(z_circumcircle(vertices, a, b, c));
              }
            }
            for (i = open.length; i--; ) {
              closed.push(open[i]);
            }
            open.length = 0;
            for (i = closed.length; i--; ) {
              if (closed[i].i < n && closed[i].j < n && closed[i].k < n) {
                open.push(closed[i].i, closed[i].j, closed[i].k);
              }
            }
            return open;
          },
        };
        if (typeof module !== "undefined") {
          module.exports = Delaunay;
        }
        var triangles = Delaunay.triangulate(vertices);
        return triangles;
      }
      function Get_Polygon_Centroid(pts) {
        var first = pts[0];
        var last = pts[pts.length - 1];
        if (first[0] != last[0] || first[1] != last[1]) {
          pts.push(first);
        }
        var twicearea = 0;
        var x = 0;
        var y = 0;
        for (var i = 0, j = pts.length - 1; i < pts.length; j = i++) {
          p1 = pts[i];
          p2 = pts[j];
          f =
            (p1[1] - first[1]) * (p2[0] - first[0]) -
            (p2[1] - first[1]) * (p1[0] - first[0]);
          twicearea += f;
          x += (p1[0] + p2[0] - 2 * first[0]) * f;
          y += (p1[1] + p2[1] - 2 * first[1]) * f;
        }
        f = twicearea * 3;
        var fx = x / f + first[0];
        var fy = y / f + first[1];
        return [fx, fy];
      }
      function Get_Polygon_Center(pts) {
        var xr = [];
        var yr = [];
        for (var av = 0; av < pts.length; av += 1) {
          var v = pts[av];
          xr.push(v[0]);
          yr.push(v[1]);
        }
        var minx = Math.min.apply(null, xr);
        var maxx = Math.max.apply(null, xr);
        var miny = Math.min.apply(null, yr);
        var maxy = Math.max.apply(null, yr);
        var fx = (maxx - minx) / 2;
        var fy = (maxy - miny) / 2;
        return [fx, fy];
      }
      function Convex_Hull(points) {
        points.sort(comparison);
        var L = [];
        for (var i = 0; i < points.length; i += 1) {
          while (
            L.length >= 2 &&
            cross(L[L.length - 2], L[L.length - 1], points[i]) <= 0
          ) {
            L.pop();
          }
          L.push(points[i]);
        }
        var U = [];
        for (var i = points.length - 1; i >= 0; i--) {
          while (
            U.length >= 2 &&
            cross(U[U.length - 2], U[U.length - 1], points[i]) <= 0
          ) {
            U.pop();
          }
          U.push(points[i]);
        }
        L.pop();
        U.pop();
        return L.concat(U);
      }
      function comparison(a, b) {
        return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
      }
      function cross(a, b, o) {
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
      }
      function Get_Polygon_Area(polygon) {
        var j = 0;
        var area = 0;
        for (var i = 0; i < polygon.length; i += 1) {
          j = (i + 1) % polygon.length;
          area += polygon[i][0] * polygon[j][1];
          area -= polygon[i][1] * polygon[j][0];
        }
        area /= 2;
        return area < 0 ? -area : area;
      }
      function Check_Inside(point, vs) {
        var x = point[0];
        var y = point[1];
        var inside = false;
        for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
          var xi = vs[i][0];
          var yi = vs[i][1];
          var xj = vs[j][0];
          var yj = vs[j][1];
          var intersect =
            yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
          if (intersect) {
            inside = !inside;
          }
        }
        return inside;
      }
      function Get_3D_Multi_Layers_Data(id) {
        var fd = app.project.activeItem.frameDuration;
        var fps = 1 / fd;
        var arr = [];
        var tcnt = 0;
        for (var al = 1; al <= app.project.activeItem.layers.length; al += 1) {
          var lr = app.project.activeItem.layers[al];
          if (lr.threeDLayer) {
            tcnt++;
          }
        }
        if (tcnt > 0) {
          var cnt = 0;
          var selcam = 0;
          for (
            var al = 1;
            al <= app.project.activeItem.layers.length;
            al += 1
          ) {
            var lr = app.project.activeItem.layers[al];
            if (lr instanceof CameraLayer) {
              cnt++;
              var cam = lr;
              if (cam.selected) {
                selcam++;
              }
            }
          }
          if (cnt == 0) {
          }
          if (cnt > 1 && selcam != 1) {
          }
          if (cnt == 1 || (cnt > 1 && selcam == 1)) {
            var ip = cam.inPoint;
            var op = cam.outPoint;
            var sel = Select_Layers();
            var cdur = app.project.activeItem.duration;
            var null3d = app.project.activeItem.layers.addNull();
            null3d.threeDLayer = true;
            null3d.moveToEnd();
            null3dp = null3d.transform.position;
            var temp_null = app.project.activeItem.layers.addNull();
            temp_null.enabled = false;
            temp_null.moveToEnd();
            temp_pos = temp_null.transform.position;
            for (var al = 0; al < sel.length; al += 1) {
              var sl = app.project.activeItem.layers[sel[al]];
              if (sl.threeDLayer) {
                var source_in = ip;
                var source_out = op;
                var start_ak = source_in * fps;
                var end_ak = source_out * fps - source_in * fps;
                var name = "#3D LR " + sl.name;
                null3dp.setValue(sl.transform.position.value);
                null3dp.parent = sl;
                var exp =
                  "L = thisComp.layer(" +
                  (temp_null.index - 1) +
                  "); L.toComp([0,0,0]);";
                temp_pos.expression = exp;
                temp_pos.selected = true;
                var cchk = false;
                for (var ax = 0; ax < convert.length; ax += 1) {
                  if (eval('app.findMenuCommandId("' + convert[ax] + '");')) {
                    eval(
                      'app.executeCommand(app.findMenuCommandId("' +
                        convert[ax] +
                        '"));',
                    );
                    cchk = true;
                    break;
                  }
                }
                if (cchk === false) {
                  alert(
                    "Sorry: language not supported. Please install After Effects english version.",
                  );
                }
                null3dp.parent = null;
                var times = [];
                var vals = [];
                for (var ak = 0; ak < end_ak; ak += 1) {
                  var t = (start_ak + ak) / fps;
                  if (t < 0 && t + fd > 0) {
                    t = 0;
                  }
                  var v = temp_pos.valueAtTime(t, true);
                  v.pop();
                  if (t >= 0 && t < cdur) {
                    times.push(t);
                    vals.push(v);
                  }
                }
                arr.push([times, vals, name, "3d", sl.name, id, sl.index]);
              }
            }
            temp_null.remove();
            null3d.remove();
          }
        }
        return arr;
      }
      function Reduce_Vertices(val) {
        var ver = val.vertices;
        var delta = ver.length - max_ver_length;
        var angs = [];
        var angles = [];
        for (var av = 0; av < ver.length; av += 1) {
          var v = ver[av];
          var vx = v[0];
          var vy = v[1];
          if (av == 0) {
            var ovx = ver[ver.length - 1][0];
            var ovy = ver[ver.length - 1][1];
            var oc = ver[ver.length - 2];
            var odx = ovx - oc[0];
            var ody = ovy - oc[1];
            var lasta = -1 * ((Math.atan2(odx, ody) * 180) / Math.PI - 180);
            var c = ver[ver.length - 1];
          }
          if (av > 0) {
            var lasta = angs[angs.length - 1];
            var c = ver[av - 1];
          }
          var d = Math.sqrt(Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2));
          var dx = vx - c[0];
          var dy = vy - c[1];
          var a = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
          var dif = Math.abs(a - lasta);
          angs.push(a);
          if (lasta >= 270 && lasta < 360 && a >= 0 && a < 90) {
            dif = 360 - lasta + a;
          } else {
            if (a >= 270 && a < 360 && lasta >= 0 && lasta < 90) {
              dif = 360 - a + lasta;
            }
          }
          angles[av] = [av, a, d, dif];
        }
        angles.sort(function (a, b) {
          return b[3] > a[3];
        });
        angles.splice(max_ver_length - 1, delta);
        angles.sort(function (a, b) {
          return b[0] < a[0];
        });
        var refs = [];
        for (var av = 0; av < angles.length; av += 1) {
          refs.push(angles[av][0]);
        }
        return refs;
      }
      function Get_Mask_Data(m, mcenter, type, multi, id) {
        var cdur = app.project.activeItem.duration;
        ct = app.project.activeItem.time;
        var s = m.property("ADBE Mask Shape");
        var fd = app.project.activeItem.frameDuration;
        var fps = 1 / fd;
        var chk = true;
        mks_tracks = [];
        var times = [];
        var cvals = [];
        var name = "#MASK " + m.name + " #Mid";
        if (s.numKeys > 0) {
          for (var ak = 0; ak < s.numKeys; ak += 1) {
            var t = s.keyTime(ak + 1);
            if (t < 0 && t + fd > 0) {
              t = 0;
            }
            if (t >= 0 && t < cdur) {
              times.push(t);
              var v = s.keyValue(ak + 1);
              var ver = v.vertices;
              var c = Get_Polygon_Centroid(ver);
              cvals.push(c);
            }
          }
          for (var ak = 0; ak < s.numKeys; ak += 1) {
            var t = s.keyTime(ak + 1);
            if (t < 0 && t + fd > 0) {
              t = 0;
            }
            times.push(t);
            var v = s.keyValue(ak + 1);
            var ver = v.vertices;
            if (ak == 0) {
              var vref = v.vertices.length;
            }
            if (v.vertices.length != vref) {
              chk = false;
              break;
            }
          }
          if (chk) {
            if (
              vref > max_ver_length &&
              type != "crop" &&
              multi === undefined
            ) {
              var vat = s.valueAtTime(ct, true);
              var refs = Reduce_Vertices(vat);
            } else {
              var refs = [];
            }
            for (var av = 0; av < vref; av += 1) {
              if (
                refs.length == 0 ||
                (refs.length > 0 && refs.indexOf(av) > -1)
              ) {
                var name = "#MASK " + m.name + " #V" + av + 1;
                var times = [];
                var vals = [];
                var tin = [];
                var tout = [];
                for (var ak = 0; ak < s.numKeys; ak += 1) {
                  var t = s.keyTime(ak + 1);
                  if (t < 0 && t + fd > 0) {
                    t = 0;
                  }
                  var val = s.keyValue(ak + 1);
                  var v = val.vertices[av];
                  var ti = val.inTangents[av];
                  var to = val.outTangents[av];
                  if (t >= 0 && t < cdur) {
                    times.push(t);
                    vals.push(v);
                    tin.push(ti);
                    tout.push(to);
                  }
                }
                mks_tracks.push([
                  times,
                  vals,
                  name,
                  "mask",
                  s,
                  id,
                  tin,
                  tout,
                  true,
                ]);
              }
            }
          } else {
            var target_window = new Window("dialog");
            target_window.text = "Perspective Masks";
            var points_txt = target_window.add(
              "staticText",
              undefined,
              "Is the selected mask tracked in Skew or Perspective mode? If NO, mask won\'t be rebuilt.",
            );
            var confirm_grp = target_window.add("group");
            confirm_grp.alignment = "row";
            var ok_bt = confirm_grp.add("button", undefined, "Yes");
            ok_bt.alignment = ["center", "bottom"];
            var cancel_bt = confirm_grp.add("button", undefined, "No");
            cancel_bt.alignment = ["center", "bottom"];
            ok_bt.onClick = function () {
              app.beginUndoGroup("Reduce Perspective Mask");
              var mks = m.parentProperty;
              var msel = [];
              for (var am = 1; am <= mks.numProperties; am += 1) {
                var mk = mks.property(am);
                if (mk.selected) {
                  msel.push(mk);
                }
              }
              s = Convert_To_Editable_Mask(m);
              m.rotoBezier = false;
              var vlen = s.keyValue(1).vertices.length;
              for (var av = 0; av < vlen; av += 1) {
                var name = "#MASK Persp #V" + av + 1;
                var vals = [];
                var times = [];
                var tin = [];
                var tout = [];
                for (var ak = 1; ak <= s.numKeys; ak += 1) {
                  var t = s.keyTime(ak);
                  var v = s.keyValue(ak);
                  var vts = v.vertices[av];
                  var ti = v.inTangents[av];
                  var to = v.outTangents[av];
                  times.push(t);
                  vals.push(vts);
                  tin.push(ti);
                  tout.push(to);
                }
                mks_tracks.push([
                  times,
                  vals,
                  name,
                  "mask",
                  s,
                  id,
                  tin,
                  tout,
                  true,
                ]);
              }
              for (var am = 0; am < msel.length; am += 1) {
                var mk = msel[am];
                mk.selected = true;
              }
              app.endUndoGroup();
              target_window.close();
            };
            cancel_bt.onClick = function () {
              target_window.close();
            };
            target_window.show();
          }
        }
        return mks_tracks;
      }
      function Reduce_Perspective_Vertices(s, cvals, pmode) {
        var fd = app.project.activeItem.frameDuration;
        var fps = 1 / fd;
        var tracks = [];
        var times = [];
        var vals = [];
        var verts = [];
        var tis = [];
        var tos = [];
        var st = s.keyTime(1);
        var et = s.keyTime(s.numKeys);
        var klen = (et - st) * fps + 1;
        for (var ak = 0; ak < klen; ak += 1) {
          var t = st + ak * fd;
          times.push(t);
          var v = s.valueAtTime(t, true);
          verts.push(v.vertices);
          tis.push(v.inTangents);
          tos.push(v.outTangents);
        }
        if (pmode) {
          function Get_Angles(ref_ver, ctr) {
            var angles = [];
            for (var aa = 0; aa < ref_ver.length; aa += 1) {
              var vx = ref_ver[aa][0];
              var vy = ref_ver[aa][1];
              var d = Math.sqrt(
                Math.pow(vx - ctr[0], 2) + Math.pow(vy - ctr[1], 2),
              );
              var dx = vx - ctr[0];
              var dy = vy - ctr[1];
              var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
              angles.push([aa, angle, d]);
            }
            return angles;
          }
          var vlen = [];
          for (var ak = 0; ak < verts.length; ak += 1) {
            if (ak == 0) {
              var akr = ak;
            } else {
              var olen = verts[ak - 1].length;
              var len = verts[ak].length;
              if (len < olen) {
                akr = ak;
              }
            }
          }
          var arefs = [];
          var selvts = [];
          var tin = [];
          var tout = [];
          for (var ak = akr; ak >= 0; ak--) {
            arefs[ak] = [];
            if (ak == akr) {
              selvts[akr] = verts[akr];
              tin[ak] = tis[akr];
              tout[ak] = tos[akr];
              for (var av = 0; av < verts[ak].length; av += 1) {
                arefs[ak][av] = av;
              }
            } else {
              var ovts = selvts[ak + 1];
              var vts = verts[ak];
              var oas = Get_Angles(ovts, cvals[ak + 1]);
              var as = Get_Angles(vts, cvals[ak]);
              var svts = [];
              var sti = [];
              var sto = [];
              for (var av = 0; av < oas.length; av += 1) {
                var aa = oas[av];
                var a = aa[1];
                var ov = ovts[av];
                var adifs = [];
                var vdifs = [];
                for (var av2 = 0; av2 < as.length; av2 += 1) {
                  var v = vts[av2];
                  var vd = Math.sqrt(
                    Math.pow(v[0] - ov[0], 2) + Math.pow(v[1] - ov[1], 2),
                  );
                  vdifs.push([vd, av2]);
                  var aa2 = as[av2];
                  var ref = aa2[0];
                  var a2 = aa2[1];
                  var d = Math.abs(a - a2);
                  adifs.push([d, ref]);
                }
                var aref = adifs.sort(function (a, b) {
                  return b[0] < a[0];
                })[0][1];
                var vref = vdifs.sort(function (a, b) {
                  return b[0] < a[0];
                })[0][1];
                if (aref != vref) {
                  aref = vref;
                }
                if (verts[ak].length == verts[ak + 1].length) {
                  aref = arefs[ak + 1][av];
                  svts.push(vts[aref]);
                  sti.push(tis[ak][aref]);
                  sto.push(tos[ak][aref]);
                } else {
                  svts.push(vts[aref]);
                  sti.push(tis[ak][aref]);
                  sto.push(tos[ak][aref]);
                }
                arefs[ak][av] = aref;
              }
              selvts[ak] = svts;
              tin[ak] = sti;
              tout[ak] = sto;
            }
          }
          for (var ak = akr; ak < verts.length; ak++) {
            arefs[ak] = [];
            if (ak == akr) {
              selvts[akr] = verts[akr];
              tin[ak] = tis[akr];
              tout[ak] = tos[akr];
              for (var av = 0; av < verts[ak].length; av += 1) {
                arefs[ak][av] = av;
              }
            } else {
              var ovts = selvts[selvts.length - 1];
              var oas = Get_Angles(ovts, cvals[ak - 1]);
              var vts = verts[ak];
              var as = Get_Angles(vts, cvals[ak]);
              var svts = [];
              var sti = [];
              var sto = [];
              for (var av = 0; av < oas.length; av += 1) {
                var aa = oas[av];
                var a = aa[1];
                var ov = ovts[av];
                var adifs = [];
                var vdifs = [];
                for (var av2 = 0; av2 < as.length; av2 += 1) {
                  var v = vts[av2];
                  var vd = Math.sqrt(
                    Math.pow(v[0] - ov[0], 2) + Math.pow(v[1] - ov[1], 2),
                  );
                  vdifs.push([vd, av2]);
                  var aa2 = as[av2];
                  var ref = aa2[0];
                  var a2 = aa2[1];
                  var d = Math.abs(a2 - a);
                  adifs.push([d, ref]);
                }
                var aref = adifs.sort(function (a, b) {
                  return b[0] < a[0];
                })[0][1];
                var vref = vdifs.sort(function (a, b) {
                  return b[0] < a[0];
                })[0][1];
                if (aref != vref) {
                  aref = vref;
                }
                if (verts[ak].length == verts[ak - 1].length) {
                  aref = arefs[ak - 1][av];
                  svts.push(vts[aref]);
                  sti.push(tis[ak][aref]);
                  sto.push(tos[ak][aref]);
                } else {
                  svts.push(vts[aref]);
                  sti.push(tis[ak][aref]);
                  sto.push(tos[ak][aref]);
                }
                arefs[ak][av] = aref;
              }
              selvts[ak] = svts;
              tin[ak] = sti;
              tout[ak] = sto;
            }
          }
        }
        if (pmode !== true) {
          cvals = [];
          for (var ak = 0; ak < verts.length; ak += 1) {
            var xmin = verts[ak].sort(function (a, b) {
              return b[0] < a[0];
            })[0][0];
            var xmax = verts[ak].sort(function (a, b) {
              return b[0] > a[0];
            })[0][0];
            var ymin = verts[ak].sort(function (a, b) {
              return b[1] < a[1];
            })[0][1];
            var ymax = verts[ak].sort(function (a, b) {
              return b[1] > a[1];
            })[0][1];
            var cx = (xmin + xmax) / 2;
            var cy = (ymin + ymax) / 2;
            var c = [cx, cy];
            cvals.push(c);
          }
          var selvts = [];
          for (var ak = 0; ak < times.length; ak += 1) {
            selvts[ak] = [];
            selvts[ak].push(cvals[ak]);
          }
        }
        return [times, selvts, tin, tout];
      }
      function _Load_00_Get_Data(mcenter, type, fill) {
        fdata = [];
        var cdur = app.project.activeItem.duration;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        var dur = app.project.activeItem.duration;
        var factor = cw / 60;
        var fd = app.project.activeItem.frameDuration;
        var fps = 1 / fd;
        var lrs = app.project.activeItem.layers;
        var mode = "all";
        var el = 0;
        var id = 0;
        var mks_tracks = [];
        for (var aa = 0; aa < lrs.length; aa += 1) {
          var lr = lrs[aa + 1];
          var masks = lr.property("ADBE Mask Parade");
          if (masks && masks.numProperties > 0) {
            for (var am = 0; am < masks.numProperties; am += 1) {
              el++;
              var m = masks.property(am + 1);
              if (m.selected || masks.selected) {
                id++;
                var s = m.property(1);
                var mdata = Get_Mask_Data(m, mcenter, type, "mask", id);
                mks_tracks = mks_tracks.concat(mdata);
              }
            }
          }
        }
        var tracks = [];
        for (var aa = 0; aa < lrs.length; aa += 1) {
          var lr = lrs[aa + 1];
          var trackers = lr.property("ADBE MTrackers");
          if (trackers && trackers.numProperties > 0) {
            for (var atr = 0; atr < trackers.numProperties; atr += 1) {
              var tracker = lr.property("ADBE MTrackers").property(atr + 1);
              el++;
              for (var at = 0; at < tracker.numProperties; at += 1) {
                var trk = tracker.property(at + 1);
                if (
                  tracker.selected ||
                  (tracker.selected === false && trk.selected)
                ) {
                  var p = trk.property("ADBE MTracker Pt Attach Pt");
                  var name = "#TRK " + tracker.name + " - " + trk.name;
                  var times = [];
                  var vals = [];
                  if (p.numKeys > 0) {
                    id++;
                    for (var ak = 0; ak < p.numKeys; ak += 1) {
                      var t = p.keyTime(ak + 1);
                      if (t < 0 && t + fd > 0) {
                        t = 0;
                      }
                      var v = p.keyValue(ak + 1);
                      if (t >= 0 && t < cdur) {
                        times.push(t);
                        vals.push(v);
                      }
                    }
                    tracks.push([times, vals, name, "trk", p, id]);
                  }
                }
              }
            }
          }
        }
        var nulls = [];
        for (var aa = 0; aa < lrs.length; aa += 1) {
          var lr = lrs[aa + 1];
          if (lr.threeDLayer === false) {
            if (lr.selected) {
              var p = lr.transform.position;
              var times = [];
              var vals = [];
              if (p.numKeys > 0) {
                id++;
                var st = p.keyTime(1);
                var et = p.keyTime(p.numKeys);
                var klen = (et - st) * fps + 1;
                for (var ak = 0; ak < klen; ak += 1) {
                  var t = st + ak * fd;
                  if (t < 0 && t + fd > 0) {
                    t = 0;
                  }
                  var v = p.valueAtTime(t, true);
                  v = [v[0], v[1]];
                  if (t >= 0 && t < cdur) {
                    times.push(t);
                    vals.push(v);
                  }
                }
                var name = "#2D " + lr.name;
                nulls.push([times, vals, name, "2d", p, id]);
              }
            }
          }
        }
        var face = [];
        var ofx = [];
        var mocha = [];
        for (var aa = 0; aa < lrs.length; aa += 1) {
          var lr = lrs[aa + 1];
          var fxs = lr.effect;
          if (lr.effect && fxs.numProperties > 0) {
            for (var af = 1; af <= fxs.numProperties; af += 1) {
              var fx = fxs.property(af);
              if (fx.selected) {
                if (fx.matchName == "Pseudo/ADBE Animal Head66") {
                  id++;
                  for (var ap = 1; ap <= fx.numProperties; ap += 1) {
                    var pr = fx.property(ap);
                    if (ap >= 9 && pr.numKeys > 0) {
                      var chk = false;
                      var times = [];
                      var vals = [];
                      var name = "#FACE " + ap + " " + lr.name;
                      var st = pr.keyTime(1);
                      var et = pr.keyTime(pr.numKeys);
                      var klen = (et - st) * fps + 1;
                      for (var ak = 0; ak < klen; ak += 1) {
                        if (ak == 0) {
                          var v = pr.keyValue(ak + 1);
                          if (v.length == 2 && v instanceof Array) {
                            chk = true;
                          }
                        }
                        var t = st + ak * fd;
                        if (t < 0 && t + fd > 0) {
                          t = 0;
                        }
                        var v = pr.valueAtTime(t, true);
                        if (t >= 0 && t < cdur) {
                          times.push(t);
                          vals.push(v);
                        }
                        if (chk === false) {
                          break;
                        }
                      }
                      if (chk) {
                        face.push([times, vals, name, "face", pr, id]);
                      }
                    }
                  }
                } else {
                  if (
                    fx.matchName == "mochaAECC" ||
                    fx.matchName == "mochaProAE"
                  ) {
                    id++;
                    for (var ap = 2; ap <= 6; ap += 1) {
                      if (fx.matchName == "mochaAECC") {
                        var pr = fx.property("mochaAECC-234" + ap);
                      } else {
                        var pr = fx.property("mochaProAE-234" + ap);
                      }
                      var times = [];
                      var vals = [];
                      var name = "#MOCHA " + ap + " " + lr.name;
                      if (pr.numKeys > 0) {
                        var st = pr.keyTime(1);
                        var et = pr.keyTime(pr.numKeys);
                        var klen = (et - st) * fps + 1;
                        for (var ak = 0; ak < klen; ak += 1) {
                          var t = st + ak * fd;
                          if (t < 0 && t + fd > 0) {
                            t = 0;
                          }
                          var v = pr.valueAtTime(t, true);
                          if (t >= 0 && t < cdur) {
                            times.push(t);
                            vals.push(v);
                          }
                        }
                        mocha.push([times, vals, name, "mocha", pr, id]);
                      }
                    }
                  } else {
                    id++;
                    for (var ap = 1; ap <= fx.numProperties; ap += 1) {
                      var pr = fx.property(ap);
                      if (pr.propertyValueType !== undefined) {
                        var eot = pr.propertyValueType.toString();
                        eot = parseFloat(eot.slice(-2));
                      } else {
                        var eot = 12;
                      }
                      if (pr.canVaryOverTime && pr.numKeys > 0 && pr.selected) {
                        var times = [];
                        var vals = [];
                        var name = "#FX " + ap + " " + lr.name;
                        if (eot == 15) {
                          var st = pr.keyTime(1);
                          var et = pr.keyTime(pr.numKeys);
                          var klen = (et - st) * fps + 1;
                          for (var ak = 0; ak < klen; ak += 1) {
                            var t = st + ak * fd;
                            if (t < 0 && t + fd > 0) {
                              t = 0;
                            }
                            var v = pr.valueAtTime(t, true);
                            if (t >= 0 && t < cdur) {
                              times.push(t);
                              vals.push(v);
                            }
                            if (chk === false) {
                              break;
                            }
                          }
                          ofx.push([times, vals, name, "ofx", pr, id]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        var td_tracks = [];
        var tdc = 0;
        var cam = 0;
        var selcam = 0;
        for (var aa = 0; aa < lrs.length; aa += 1) {
          var lr = lrs[aa + 1];
          if (lr.selected && lr.threeDLayer) {
            tdc++;
          }
          if (lr instanceof CameraLayer) {
            cam++;
            if (lr.selected) {
              selcam++;
            }
          }
        }
        if (tdc > 0 && cam == 1) {
          app.beginUndoGroup("Get Data");
          td_tracks = Get_3D_Multi_Layers_Data();
          app.endUndoGroup();
          if (td_tracks.length > 0) {
            app.executeCommand(16);
          }
        } else {
          if (tdc > 0 && cam == 0) {
            alert(
              "3D layers selected, but no 3D camera is present in the comp. Please generate 1 3D camera and try again.",
            );
          } else {
            if (tdc > 0 && cam > 1) {
              if (selcam == 1) {
                app.beginUndoGroup("Get Data");
                td_tracks = Get_3D_Multi_Layers_Data();
                app.endUndoGroup();
                if (td_tracks.length > 0) {
                  app.executeCommand(16);
                }
              } else {
                alert(
                  "3D layers selected, but multiple 3D cameras are present in the comp. Please select only 1 3D camera and try again.",
                );
              }
            }
          }
        }
        fdata = fdata.concat(mks_tracks);
        fdata = fdata.concat(tracks);
        fdata = fdata.concat(nulls);
        fdata = fdata.concat(face);
        fdata = fdata.concat(mocha);
        fdata = fdata.concat(ofx);
        fdata = fdata.concat(td_tracks);
        if (fill !== true && fdata.length > 0) {
          var all_times = [];
          for (var ad = 0; ad < fdata.length; ad += 1) {
            var ts = fdata[ad][0];
            var len = ts.length;
            var st = ts[0];
            var et = ts[ts.length - 1];
            all_times.push([st, et]);
          }
          var minst = all_times.sort(function (a, b) {
            return b[0] < a[0];
          })[0][0];
          var maxst = all_times.sort(function (a, b) {
            return b[0] > a[0];
          })[0][0];
          var minet = all_times.sort(function (a, b) {
            return b[1] < a[1];
          })[0][1];
          var maxet = all_times.sort(function (a, b) {
            return b[1] > a[1];
          })[0][1];
          if (minst != maxst || minet != maxet) {
            fdata = [];
            alert(
              "Error: in order for ReTrack to work properly all the tracked data keyframes must start and end at the same times.",
            );
          }
        }
      }
      function _Load_Check_Missing_Data() {
        var abs_dif = false;
        for (var ad = 0; ad < fdata.length; ad += 1) {
          var ts = fdata[ad][0];
          if (ad == 0) {
            flen = ts.length;
          } else {
            if (ts.length != flen) {
              abs_dif = true;
            }
          }
        }
        return abs_dif;
      }
      function _Load_01_Extend_Points_Data(type) {
        if (fdata.length > 0) {
          function Chk_Tangents(ti) {
            var chk = false;
            for (var ak = 0; ak < ti.length; ak += 1) {
              var tiv = ti[ak];
              if (tiv[0] != 0 || tiv[1] != 0) {
                chk = true;
              }
            }
            return chk;
          }
          fps = 1 / app.project.activeItem.frameDuration;
          var fd = app.project.activeItem.frameDuration;
          var etimes = [];
          var all_times = [];
          var abs_dif = false;
          for (var ad = 0; ad < fdata.length; ad += 1) {
            var ts = fdata[ad][0];
            if (ad == 0) {
              flen = ts.length;
            } else {
              if (ts.length != flen) {
                abs_dif = true;
              }
            }
            etimes[ad] = [];
            var len = ts.length;
            var st = ts[0];
            var et = ts[ts.length - 1];
            all_times.push([st, et]);
          }
          var minst = all_times.sort(function (a, b) {
            return b[0] < a[0];
          })[0][0];
          var maxst = all_times.sort(function (a, b) {
            return b[0] > a[0];
          })[0][0];
          var minet = all_times.sort(function (a, b) {
            return b[1] < a[1];
          })[0][1];
          var maxet = all_times.sort(function (a, b) {
            return b[1] > a[1];
          })[0][1];
          var abs_len = (maxet - minst) * fps;
          var tins = [];
          var touts = [];
          var ctans = [];
          for (var ad = 0; ad < fdata.length; ad += 1) {
            var ts = fdata[ad][0];
            if (ts.length < abs_len + 1) {
              var ttype = fdata[ad][3];
              if (ttype == "mask") {
                var vs = fdata[ad][1];
                var ti = fdata[ad][6];
                var to = fdata[ad][7];
                var id = fdata[ad][5];
                var tanchk = Chk_Tangents(ti);
                if (tanchk) {
                  var intn = [];
                  var outtn = [];
                  for (var ak = 0; ak < vs.length; ak += 1) {
                    intn.push(vs[ak] + ti[ak]);
                    outtn.push(vs[ak] + to[ak]);
                  }
                  var ttin = fdata[ad].slice(fdata[ad]);
                  ttin[1] = intn;
                  ttin[3] = "tin";
                  ttin[8] = ad;
                  ttin.push(ad);
                  tins.push(ttin);
                  var ttout = fdata[ad].slice(fdata[ad]);
                  ttout[1] = outtn;
                  ttout[3] = "tout";
                  ttout[8] = ad;
                  ttout.push(ad);
                  touts.push(ttout);
                }
              }
            }
          }
          if (tins.length > 0) {
            var elen = fdata.length;
            for (var ad = 0; ad < tins.length; ad += 1) {
              etimes[elen + ad] = [];
            }
            var elen = fdata.length + tins.length;
            for (var ad = 0; ad < touts.length; ad += 1) {
              etimes[elen + ad] = [];
            }
            fdata = fdata.concat(tins);
            fdata = fdata.concat(touts);
          }
          var hdata = [];
          for (var ad = 0; ad < fdata.length; ad += 1) {
            var ts = fdata[ad][0];
            hdata[ad] = fdata[ad].slice(fdata[ad]);
            hdata[ad].unshift(ad);
            hdata[ad].unshift(ts.length);
          }
          var sort = [];
          hdata.sort(function (a, b) {
            return b[0] > a[0];
          });
          for (var ad = 0; ad < hdata.length; ad += 1) {
            sort.push(hdata[ad][1]);
            hdata[ad].shift();
            hdata[ad].shift();
          }
          if (minst != maxst || minet != maxet || abs_dif) {
            function getCommon(a) {
              var result = a[0].slice();
              var found = false;
              var i = result.length;
              while (i--) {
                mem = result[i];
                for (var j = 1, jLen = a.length; j < jLen; j++) {
                  arr = a[j];
                  found = false;
                  var k = arr.length;
                  while (k-- && !found) {
                    if (mem == arr[k]) {
                      found = true;
                    }
                  }
                  if (!found) {
                    result.splice(i, 1);
                    break;
                  }
                }
              }
              return result;
            }
            function Find_Forward(am, ast, aet, akst, aket, bidir) {
              etimes[ad].push(ast, aet);
              var st = ast;
              var et = aet;
              if (bidir) {
                var len = Math.round(et * fps) - Math.round(st * fps) - 1;
              } else {
                var len = Math.round(et * fps) - Math.round(st * fps);
              }
              for (var ak = 1; ak <= len; ak += 1) {
                if (ak == 1) {
                  var ov = hdata[ad][1][akst];
                  var ot = ast;
                } else {
                  var ot = forwardt[forwardt.length - 1];
                  var ov = forwardv[forwardv.length - 1];
                }
                ov = [ov[0], ov[1]];
                var t = st + fd * ak;
                var data = [];
                var krefs = [];
                var ndata = [[], []];
                ndata[1][0] = [];
                ndata[1][1] = [];
                for (var ad2 = 0; ad2 < hdata.length; ad2 += 1) {
                  if (ad2 != ad) {
                    var ts2 = hdata[ad2][0];
                    var vs2 = hdata[ad2][1];
                    var st2 = ts2[0];
                    var et2 = ts2[ts2.length - 1];
                    if (
                      Math.round(t * 1000) / 1000 >=
                        Math.round(st2 * 1000) / 1000 &&
                      Math.round(t * 1000) / 1000 <=
                        Math.round(et2 * 1000) / 1000
                    ) {
                      for (var ak2 = 0; ak2 < ts2.length; ak2 += 1) {
                        var t2 = ts2[ak2];
                        if (
                          Math.round(ot * 1000) / 1000 ==
                            Math.round(t2 * 1000) / 1000 &&
                          Math.round(t * 1000) / 1000 ==
                            Math.round(ts2[ak2 + 1] * 1000) / 1000
                        ) {
                          var ov2 = [vs2[ak2][0], vs2[ak2][1]];
                          var v2 = [vs2[ak2 + 1][0], vs2[ak2 + 1][1]];
                          ndata[0] = [0, 1];
                          ndata[1][0].push(ov2);
                          ndata[1][1].push(v2);
                          krefs.push(ak2);
                          data.push(hdata[ad2]);
                          break;
                        }
                      }
                    }
                  }
                }
                if (ndata[1][0].length == 0) {
                  break;
                }
                if (ndata[1][0].length > 0) {
                  var ref_ver = ndata[1][0].slice(ndata[1][0]);
                  var sort_ver = ndata[1][0].slice(ndata[1][0]);
                  var cen_ver = ndata[1][0].slice(ndata[1][0]);
                  var xmin = sort_ver.sort(function (a, b) {
                    return b[0] < a[0];
                  })[0][0];
                  var xmax = sort_ver.sort(function (a, b) {
                    return b[0] > a[0];
                  })[0][0];
                  var ymin = sort_ver.sort(function (a, b) {
                    return b[1] < a[1];
                  })[0][1];
                  var ymax = sort_ver.sort(function (a, b) {
                    return b[1] > a[1];
                  })[0][1];
                  var bb = [xmin, xmax, ymin, ymax];
                  var refs = [];
                  if (type == "tri" || type == "multi2tri") {
                    if (data.length >= 3) {
                      refs = Get_3Refs(ov, ndata, bb);
                      if (refs.length < 3) {
                        refs = Get_Neaerst_3Refs_By_Angle(ov, ndata, bb, 0);
                      }
                      var corns = [];
                      for (var ac = 0; ac < refs.length; ac += 1) {
                        corns[ac] = [];
                        corns[ac][0] = [];
                        var rf = refs[ac];
                        corns[ac][0] = data[rf][1][krefs[rf]];
                        corns[ac][1] = data[rf][1][krefs[rf] + 1];
                      }
                      if (refs.length == 3) {
                        var v = Point_Affine_Interpolation(ov, corns, 0)[1];
                        if (type == "multi2tri") {
                          type = "multi";
                        }
                      } else {
                        if (type == "multi2tri") {
                          type = "multi2close";
                        } else {
                          type = "tri2close";
                        }
                      }
                    } else {
                      type = "tri2close";
                    }
                  }
                  if (
                    type == "closest" ||
                    type == "close" ||
                    type == "multi2close" ||
                    type == "tri2close"
                  ) {
                    function Get_Angles(ctr) {
                      var angles = [];
                      for (var aa = 0; aa < ref_ver.length; aa += 1) {
                        var vx = ref_ver[aa][0];
                        var vy = ref_ver[aa][1];
                        var d = Math.sqrt(
                          Math.pow(vx - ctr[0], 2) + Math.pow(vy - ctr[1], 2),
                        );
                        var dx = vx - ctr[0];
                        var dy = vy - ctr[1];
                        var angle =
                          -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
                        angles.push([aa, angle, d, [vx, vy]]);
                      }
                      return angles;
                    }
                    function Get_Closest_Refs() {
                      var angles = Get_Angles(ov);
                      angles.sort(function (a, b) {
                        return b[2] < a[2];
                      });
                      var ref1 = angles[0][0];
                      var ref1v = ref_ver[ref1];
                      var angles2 = Get_Angles(ref1v);
                      angles2.sort(function (a, b) {
                        return b[2] < a[2];
                      });
                      for (var aa = 0; aa < angles2.length; aa += 1) {
                        var rrx0 = Math.round(ref1v[0] * 10) / 10;
                        var rry0 = Math.round(ref1v[1] * 10) / 10;
                        var rr0 = [rrx0, rry0].toString();
                        var rrx = Math.round(angles2[aa][3][0] * 10) / 10;
                        var rry = Math.round(angles2[aa][3][1] * 10) / 10;
                        var rr = [rrx, rry].toString();
                        if (rr0 != rr) {
                          var ref2 = angles2[aa][0];
                          var ref2v = ref_ver[ref2];
                          break;
                        }
                      }
                      return [ref1, ref2];
                    }
                    if (data.length >= 2 && type != "closest") {
                      refs = Get_Closest_Refs();
                      var corns = [];
                      for (var ac = 0; ac < refs.length; ac += 1) {
                        corns[ac] = [[], []];
                        corns[ac][1][0] = [];
                        var rf = refs[ac];
                        corns[ac][1][0] = data[rf][1][krefs[rf]];
                        corns[ac][1][1] = data[rf][1][krefs[rf] + 1];
                      }
                      var v = Closest_Transformation(
                        ov,
                        [0, 1],
                        [0, 1],
                        0,
                        corns,
                      )[1];
                      if (type == "multi2close") {
                        type = "multi";
                      }
                      if (type == "tri2close") {
                        type = "tri";
                      }
                    }
                    if (data.length == 1 || type == "closest") {
                      var angles = Get_Angles(ov);
                      angles.sort(function (a, b) {
                        return b[2] < a[2];
                      });
                      var ref = angles[0][0];
                      if (stref === undefined) {
                        var stref = ref;
                      }
                      var chk = false;
                      for (var ag = 0; ag < angles.length; ag += 1) {
                        var tref = angles[ag][0];
                        if (tref == stref) {
                          chk = true;
                          break;
                        }
                      }
                      if (chk) {
                        var fref = stref;
                      } else {
                        var fref = ref;
                        stref = ref;
                      }
                      var nrefv = data[fref][1][krefs[fref] + 1];
                      var crefv = data[fref][1][krefs[fref]];
                      var dist = nrefv - crefv;
                      var v = ov + dist;
                    }
                  }
                  forwardt.push(t);
                  forwardv.push(v);
                }
                forwarr[am] = [forwardt, forwardv];
              }
            }
            function Find_Backward(am, ast, aet, akst, aket, bidir) {
              if (bidir !== true) {
                etimes[ad].push(ast, aet);
              }
              var st = ast;
              var et = aet;
              if (bidir) {
                var len = Math.round(et * fps) - Math.round(st * fps);
                var cnt = 0;
                var f = 1;
              } else {
                var len = Math.round(et * fps) - Math.round(st * fps);
                var cnt = 0;
                var f = 0;
              }
              for (var ak = len - 1; ak >= f; ak--) {
                cnt++;
                if (ak == len - 1) {
                  var nv = hdata[ad][1][aket];
                  var nt = aet;
                } else {
                  var nt = backt[backt.length - 1];
                  var nv = backv[backv.length - 1];
                }
                nv = [nv[0], nv[1]];
                var t = et - fd * cnt;
                if (Math.round(et * fps) == Math.round(fd * cnt * fps)) {
                  t = 0;
                }
                var data = [];
                var krefs = [];
                var ndata = [[], []];
                ndata[1][0] = [];
                ndata[1][1] = [];
                for (var ad2 = 0; ad2 < hdata.length; ad2 += 1) {
                  if (ad2 != ad) {
                    var ts2 = hdata[ad2][0];
                    var vs2 = hdata[ad2][1];
                    var st2 = ts2[0];
                    var et2 = ts2[ts2.length - 1];
                    if (
                      Math.round(t * 1000) / 1000 >=
                        Math.round(st2 * 1000) / 1000 &&
                      Math.round(t * 1000) / 1000 <=
                        Math.round(et2 * 1000) / 1000
                    ) {
                      for (var ak2 = ts2.length - 1; ak2 >= 0; ak2--) {
                        var t2 = ts2[ak2];
                        if (
                          Math.round(nt * 1000) / 1000 ===
                            Math.round(t2 * 1000) / 1000 &&
                          Math.round(t * 1000) / 1000 ===
                            Math.round(ts2[ak2 - 1] * 1000) / 1000
                        ) {
                          var nv2 = [vs2[ak2][0], vs2[ak2][1]];
                          var v2 = [vs2[ak2 - 1][0], vs2[ak2 - 1][1]];
                          ndata[0] = [0, 1];
                          ndata[1][0].push(nv2);
                          ndata[1][1].push(v2);
                          krefs.push(ak2);
                          data.push(hdata[ad2]);
                          break;
                        }
                      }
                    }
                  }
                }
                if (ndata[1][0].length == 0) {
                  break;
                }
                if (ndata[1][0].length > 0) {
                  var ref_ver = ndata[1][0].slice(ndata[1][0]);
                  var sort_ver = ndata[1][0].slice(ndata[1][0]);
                  var cen_ver = ndata[1][0].slice(ndata[1][0]);
                  var xmin = sort_ver.sort(function (a, b) {
                    return b[0] < a[0];
                  })[0][0];
                  var xmax = sort_ver.sort(function (a, b) {
                    return b[0] > a[0];
                  })[0][0];
                  var ymin = sort_ver.sort(function (a, b) {
                    return b[1] < a[1];
                  })[0][1];
                  var ymax = sort_ver.sort(function (a, b) {
                    return b[1] > a[1];
                  })[0][1];
                  var bb = [xmin, xmax, ymin, ymax];
                  var refs = [];
                  if (type == "tri" || type == "multi2tri") {
                    if (data.length >= 3) {
                      refs = Get_3Refs(nv, ndata, bb);
                      if (refs.length < 3) {
                        refs = Get_Neaerst_3Refs_By_Angle(nv, ndata, bb, 0);
                      }
                      var corns = [];
                      for (var ac = 0; ac < refs.length; ac += 1) {
                        corns[ac] = [];
                        corns[ac][0] = [];
                        var rf = refs[ac];
                        corns[ac][0] = data[rf][1][krefs[rf]];
                        corns[ac][1] = data[rf][1][krefs[rf] - 1];
                      }
                      if (refs.length == 3) {
                        var v = Point_Affine_Interpolation(nv, corns, 0)[1];
                        if (type == "multi2tri") {
                          type = "multi";
                        }
                      } else {
                        if (type == "multi2tri") {
                          type = "multi2close";
                        } else {
                          type = "tri2close";
                        }
                      }
                    } else {
                      type = "tri2close";
                    }
                  }
                  if (
                    type == "closest" ||
                    type == "close" ||
                    type == "multi2close" ||
                    type == "tri2close"
                  ) {
                    function Get_Angles(ctr) {
                      var angles = [];
                      for (var aa = 0; aa < ref_ver.length; aa += 1) {
                        var vx = ref_ver[aa][0];
                        var vy = ref_ver[aa][1];
                        var d = Math.sqrt(
                          Math.pow(vx - ctr[0], 2) + Math.pow(vy - ctr[1], 2),
                        );
                        var dx = vx - ctr[0];
                        var dy = vy - ctr[1];
                        var angle =
                          -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
                        angles.push([aa, angle, d, [vx, vy]]);
                      }
                      return angles;
                    }
                    function Get_Closest_Refs() {
                      var angles = Get_Angles(nv);
                      angles.sort(function (a, b) {
                        return b[2] < a[2];
                      });
                      var ref1 = angles[0][0];
                      var ref1v = ref_ver[ref1];
                      var angles2 = Get_Angles(ref1v);
                      angles2.sort(function (a, b) {
                        return b[2] < a[2];
                      });
                      for (var aa = 0; aa < angles2.length; aa += 1) {
                        var rrx0 = Math.round(ref1v[0] * 10) / 10;
                        var rry0 = Math.round(ref1v[1] * 10) / 10;
                        var rr0 = [rrx0, rry0].toString();
                        var rrx = Math.round(angles2[aa][3][0] * 10) / 10;
                        var rry = Math.round(angles2[aa][3][1] * 10) / 10;
                        var rr = [rrx, rry].toString();
                        if (rr0 != rr) {
                          var ref2 = angles2[aa][0];
                          var ref2v = ref_ver[ref2];
                          break;
                        }
                      }
                      return [ref1, ref2];
                    }
                    if (data.length >= 2 && type != "closest") {
                      refs = Get_Closest_Refs();
                      if (refs.length == 2) {
                        var corns = [];
                        for (var ac = 0; ac < refs.length; ac += 1) {
                          corns[ac] = [[], []];
                          corns[ac][1][0] = [];
                          var rf = refs[ac];
                          corns[ac][1][0] = data[rf][1][krefs[rf]];
                          corns[ac][1][1] = data[rf][1][krefs[rf] - 1];
                        }
                        var v = Closest_Transformation(
                          nv,
                          [0, 1],
                          [0, 1],
                          0,
                          corns,
                        )[1];
                      } else {
                        if (refs.length == 1) {
                          type = "closest";
                        }
                      }
                    }
                    if (data.length == 1 || type == "closest") {
                      var angles = Get_Angles(nv);
                      angles.sort(function (a, b) {
                        return b[2] < a[2];
                      });
                      var ref = angles[0][0];
                      if (etref === undefined) {
                        var etref = ref;
                      }
                      var chk = false;
                      for (var ag = 0; ag < angles.length; ag += 1) {
                        var tref = angles[ag][0];
                        if (tref == etref) {
                          chk = true;
                          break;
                        }
                      }
                      if (chk) {
                        var fref = etref;
                      } else {
                        var fref = ref;
                        etref = ref;
                      }
                      var nrefv = data[fref][1][krefs[fref] - 1];
                      var crefv = data[fref][1][krefs[fref]];
                      var dist = nrefv - crefv;
                      var v = nv + dist;
                    }
                  }
                  backt.push(t);
                  backv.push(v);
                }
                backarr[am] = [backt, backv];
              }
            }
            function Find_First_Val(ast, aet, pt, nt, v0) {
              var dists = [];
              for (var ad2 = 0; ad2 < hdata.length; ad2 += 1) {
                if (ad2 != ad) {
                  var ts2 = hdata[ad2][0];
                  var vs2 = hdata[ad2][1];
                  var aev2 = false;
                  var nv2 = false;
                  for (var ak2 = 0; ak2 < ts2.length; ak2 += 1) {
                    var t2 = ts2[ak2];
                    if (
                      parseInt(t2 * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      aev2 = hdata[ad2][1][ak2];
                    }
                    if (
                      parseInt(t2 * 1000) / 1000 ==
                      parseInt(nt * 1000) / 1000
                    ) {
                      var nt2 = nt;
                      nv2 = hdata[ad2][1][ak2];
                      break;
                    }
                  }
                  if (aev2 && nv2) {
                    var ds = Math.sqrt(
                      Math.pow(v0[0] - nv2[0], 2) + Math.pow(v0[1] - nv2[1], 2),
                    );
                    dists.push([aev2, nv2, nt2, ds, ad2]);
                  }
                }
              }
              if (dists.length > 0) {
                var dist = dists.sort(function (a, b) {
                  return b[3] < a[3];
                })[0];
                var aev2 = dist[0];
                var nv2 = dist[1];
                var nt2 = dist[2];
                var delta = nv2 - aev2;
                var v = v0 - delta;
              } else {
                for (var ak2 = ts.length - 1; ak2 >= 0; ak2--) {
                  var t2 = ts[ak2];
                  if (
                    parseInt(t2 * 1000) / 1000 ==
                    parseInt(nt * 1000) / 1000
                  ) {
                    var nv2 = hdata[ad][1][ak2];
                  }
                  if (
                    parseInt(t2 * 1000) / 1000 ==
                    parseInt(pt * 1000) / 1000
                  ) {
                    var pv2 = hdata[ad][1][ak2];
                    break;
                  }
                }
                var all = parseInt(nt * fps - pt * fps);
                var par = parseInt(aet * fps - pt * fps);
                var vx = pv2[0] + ((nv2[0] - pv2[0]) / all) * par;
                var vy = pv2[1] + ((nv2[1] - pv2[1]) / all) * par;
                var v = [vx, vy];
              }
              return v;
            }
            function Find_Last_Val(ast, aet, pt, nt, v0) {
              var dists = [];
              for (var ad2 = 0; ad2 < hdata.length; ad2 += 1) {
                if (ad2 != ad) {
                  var ts2 = hdata[ad2][0];
                  var asv2 = false;
                  var pv2 = false;
                  for (var ak2 = ts2.length - 1; ak2 >= 0; ak2--) {
                    var t2 = ts2[ak2];
                    if (
                      parseInt(t2 * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      asv2 = hdata[ad2][1][ak2];
                    }
                    if (
                      parseInt(t2 * 1000) / 1000 ==
                      parseInt(pt * 1000) / 1000
                    ) {
                      var pt2 = pt;
                      pv2 = hdata[ad2][1][ak2];
                    }
                  }
                  if (asv2 && pv2) {
                    var ds = Math.sqrt(
                      Math.pow(v0[0] - pv2[0], 2) + Math.pow(v0[1] - pv2[1], 2),
                    );
                    dists.push([asv2, pv2, pt2, ds, ad2]);
                  }
                }
              }
              if (dists.length > 0) {
                var dist = dists.sort(function (a, b) {
                  return b[3] < a[3];
                })[0];
                var asv2 = dist[0];
                var pv2 = dist[1];
                var pt2 = dist[2];
                var delta = asv2 - pv2;
                var v = v0 + delta;
              } else {
                for (var ak2 = ts.length - 1; ak2 >= 0; ak2--) {
                  var t2 = ts[ak2];
                  if (
                    parseInt(t2 * 1000) / 1000 ==
                    parseInt(nt * 1000) / 1000
                  ) {
                    var nv2 = hdata[ad][1][ak2];
                  }
                  if (
                    parseInt(t2 * 1000) / 1000 ==
                    parseInt(pt * 1000) / 1000
                  ) {
                    var pv2 = hdata[ad][1][ak2];
                    break;
                  }
                }
                var all = parseInt(nt * fps - pt * fps);
                var par = parseInt(aet * fps - pt * fps);
                var vx = pv2[0] + ((nv2[0] - pv2[0]) / all) * par;
                var vy = pv2[1] + ((nv2[1] - pv2[1]) / all) * par;
                var v = [vx, vy];
              }
              return v;
            }
            var miss = [];
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              miss[ad] = [];
              for (var ak = 0; ak < abs_len; ak += 1) {
                var t = minst + fd * ak;
                var chk = false;
                for (var ak2 = 0; ak2 < ts.length; ak2 += 1) {
                  var t2 = ts[ak2];
                  if (parseInt(t * 1000) / 1000 == parseInt(t2 * 1000) / 1000) {
                    chk = true;
                    break;
                  }
                }
                if (chk !== true) {
                  miss[ad].push(t);
                }
              }
            }
            var missing = getCommon(miss);
            var miss_len = missing.length;
            var missint = [];
            var cnt = 0;
            for (var ak = 0; ak < missing.length; ak += 1) {
              var t = missing[ak];
              if (ak == 0) {
                missint[cnt] = [];
                missint[cnt].push(t);
              }
              if (ak > 0) {
                var ot = missing[ak - 1];
                var tfd = t - fd;
                if (parseInt(ot * 1000) / 1000 != parseInt(tfd * 1000) / 1000) {
                  cnt++;
                  missint[cnt] = [];
                }
                missint[cnt].push(t);
              }
            }
            var missing = [];
            for (var am = 0; am < missint.length; am += 1) {
              var st = missint[am][0];
              var et = missint[am][missint[am].length - 1];
              missing.push([st, et]);
            }
            var full_len = Math.ceil(abs_len + 1) - miss_len;
            var states = [];
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              states[ad] = [];
              for (var ak = 0; ak < abs_len; ak += 1) {
                var t = minst + fd * ak;
                var chk = false;
                for (var ak2 = 0; ak2 < ts.length; ak2 += 1) {
                  var t2 = ts[ak2];
                  if (parseInt(t * 1000) / 1000 == parseInt(t2 * 1000) / 1000) {
                    chk = true;
                    break;
                  }
                }
                states[ad].push([t, chk]);
              }
            }
            var slides = [];
            for (var ad = 0; ad < states.length; ad += 1) {
              slides[ad] = [];
              var trk = states[ad];
              for (var ak = 0; ak < trk.length; ak += 1) {
                var t = trk[ak][0];
                var state = trk[ak][1];
                if (ak > 0) {
                  ot = trk[ak - 1][0];
                  ostate = trk[ak - 1][1];
                  if (state != ostate) {
                    if (ostate === false && state) {
                      var chk = false;
                      for (var ad2 = 0; ad2 < states.length; ad2 += 1) {
                        if (ad != ad2) {
                          var trk2 = states[ad2];
                          var state2 = trk2[ak][1];
                          if (state2) {
                            chk = true;
                          }
                        }
                      }
                      if (chk === false) {
                        slides[ad].push([t, ot]);
                      }
                    } else {
                      var chk = false;
                      for (var ad2 = 0; ad2 < states.length; ad2 += 1) {
                        if (ad != ad2) {
                          var trk2 = states[ad2];
                          var ostate2 = trk2[ak - 1][1];
                          if (ostate2) {
                            chk = true;
                          }
                        }
                      }
                      if (chk === false) {
                        slides[ad].push([ot, t]);
                      }
                    }
                  }
                }
              }
            }
            var primes = [];
            for (var ad = 0; ad < slides.length; ad += 1) {
              primes[ad] = [];
              for (var am = 0; am < slides[ad].length; am += 1) {
                var slide = slides[ad][am];
                var holet = slide[1];
                var chk = false;
                for (var mt = 0; mt < missing.length; mt += 1) {
                  var mst = missing[mt][0];
                  var met = missing[mt][1];
                  if (
                    parseInt(holet * 1000) / 1000 >=
                      parseInt(mst * 1000) / 1000 &&
                    parseInt(holet * 1000) / 1000 <= parseInt(met * 1000) / 1000
                  ) {
                    chk = true;
                    break;
                  }
                }
                if (chk === false) {
                  primes[ad].push(slide);
                }
              }
            }
            for (var ad = 0; ad < primes.length; ad += 1) {
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              for (var am = primes[ad].length - 1; am >= 0; am--) {
                var prime = primes[ad][am];
                var rt = prime[0];
                var ht = prime[1];
                for (var ak = 0; ak < ts.length; ak += 1) {
                  var t = ts[ak];
                  if (parseInt(t * 1000) / 1000 == parseInt(rt * 1000) / 1000) {
                    var rak = ak;
                    break;
                  }
                }
                var nak = rak + 1;
                var pak = rak - 1;
                if (parseInt(t * 1000) / 1000 > parseInt(ht * 1000) / 1000) {
                  var pt = rt - fd;
                  var v = vs[rak];
                  var nv = vs[nak];
                  var d = nv - v;
                  var pv = v - d;
                  hdata[ad][0].splice(pak, 0, pt);
                  hdata[ad][1].splice(pak, 0, pv);
                }
                if (parseInt(t * 1000) / 1000 < parseInt(ht * 1000) / 1000) {
                  var nt = rt + fd;
                  var v = vs[rak];
                  var pv = vs[pak];
                  var d = v - pv;
                  var nv = v + d;
                  hdata[ad][0].splice(nak, 0, nt);
                  hdata[ad][1].splice(nak, 0, nv);
                }
              }
            }
            if (minst != maxst || minet != maxet) {
              for (var ad = 0; ad < hdata.length; ad += 1) {
                var backarr = [];
                var ts = hdata[ad][0];
                var vs = hdata[ad][1];
                if (ts.length != full_len) {
                  var ast = minst;
                  var aet = ts[0];
                  var stcnt = 0;
                  var etcnt = 0;
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 >=
                      parseInt(ast * 1000) / 1000
                    ) {
                      stcnt++;
                      if (stcnt == 1) {
                        var akst = ak;
                      }
                    }
                    if (
                      parseInt(t * 1000) / 1000 >=
                      parseInt(aet * 1000) / 1000
                    ) {
                      etcnt++;
                      if (etcnt == 1) {
                        var aket = ak;
                      }
                    }
                  }
                  backarr[0] = [];
                  var backt = [];
                  var backv = [];
                  Find_Backward(0, ast, aet, akst, aket, false);
                  if (backarr[0].length > 0) {
                    var ftimes = backarr[0][0];
                    ftimes.reverse();
                    var finalvals = backarr[0][1];
                    finalvals.reverse();
                    var temp = hdata[ad][0].slice(0, akst);
                    var temp2 = hdata[ad][0].slice(akst);
                    hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                    var temp = hdata[ad][1].slice(0, akst);
                    var temp2 = hdata[ad][1].slice(akst);
                    hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                  }
                }
              }
              for (var ad = 0; ad < hdata.length; ad += 1) {
                var forwarr = [];
                var ts = hdata[ad][0];
                var vs = hdata[ad][1];
                if (ts.length != full_len) {
                  var ast = ts[ts.length - 1];
                  var aet = maxet;
                  var stcnt = 0;
                  var etcnt = 0;
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 >=
                      parseInt(ast * 1000) / 1000
                    ) {
                      stcnt++;
                      if (stcnt == 1) {
                        var akst = ak;
                      }
                    }
                    if (
                      parseInt(t * 1000) / 1000 >=
                      parseInt(aet * 1000) / 1000
                    ) {
                      etcnt++;
                      if (etcnt == 1) {
                        var aket = ak;
                      }
                    }
                  }
                  forwarr[0] = [];
                  var forwardt = [];
                  var forwardv = [];
                  Find_Forward(0, ast, aet, akst, aket, false);
                  if (forwarr[0].length > 0) {
                    var ftimes = forwarr[0][0];
                    var finalvals = forwarr[0][1];
                    var temp = hdata[ad][0].slice(0, akst + 1);
                    var temp2 = hdata[ad][0].slice(akst + 1);
                    hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                    var temp = hdata[ad][1].slice(0, akst + 1);
                    var temp2 = hdata[ad][1].slice(akst + 1);
                    hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                  }
                }
              }
            }
            var empty = [];
            var halffw = [];
            var halfbw = [];
            var bidir = [];
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              var len = ts.length;
              var st = ts[0];
              var et = ts[ts.length - 1];
              var chk = true;
              var mstarr = [];
              var metarr = [];
              var typearr = [];
              var kstarr = [];
              var ketarr = [];
              var adref = ad;
              if (ts.length != full_len) {
                function Check_Key(t) {
                  var chk = false;
                  for (var ak2 = 0; ak2 < ts.length; ak2 += 1) {
                    var t2 = ts[ak2];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(t2 * 1000) / 1000
                    ) {
                      chk = true;
                      break;
                    }
                  }
                  return chk;
                }
                var amc = 0;
                var ints = [];
                if (missing.length > 0) {
                  var cnt = 0;
                  for (var am = 0; am < missing.length; am += 1) {
                    var mst = missing[am][0];
                    var met = missing[am][1];
                    for (var ak = 0; ak <= abs_len; ak += 1) {
                      var t = minst + fd * ak;
                      if (
                        am == 0 &&
                        parseInt(t * 1000) / 1000 < parseInt(mst * 1000) / 1000
                      ) {
                        if (
                          parseInt(t * 1000) / 1000 ==
                          parseInt(minst * 1000) / 1000
                        ) {
                          ints[am] = [];
                        }
                        var chk = Check_Key(t);
                        ints[am].push([t, chk]);
                      } else {
                        if (
                          am == missing.length - 1 &&
                          parseInt(t * 1000) / 1000 >
                            parseInt(met * 1000) / 1000
                        ) {
                          if (
                            parseInt(t * 1000) / 1000 ==
                            parseInt((met + fd) * 1000) / 1000
                          ) {
                            cnt++;
                            ints[cnt] = [];
                          }
                          var chk = Check_Key(t);
                          ints[cnt].push([t, chk]);
                        } else {
                          if (
                            am < missing.length - 1 &&
                            parseInt(t * 1000) / 1000 >
                              parseInt(missing[0][1] * 1000) / 1000 &&
                            parseInt(t * 1000) / 1000 <
                              parseInt(missing[missing.length - 1][0] * 1000) /
                                1000
                          ) {
                            if (
                              parseInt(t * 1000) / 1000 >
                                parseInt(missing[am][1] * 1000) / 1000 &&
                              parseInt(t * 1000) / 1000 <
                                parseInt(missing[am + 1][0] * 1000) / 1000
                            ) {
                              if (
                                parseInt(t * 1000) / 1000 ==
                                parseInt((missing[am][1] + fd) * 1000) / 1000
                              ) {
                                cnt++;
                                ints[cnt] = [];
                              }
                              var chk = Check_Key(t);
                              ints[cnt].push([t, chk]);
                            }
                          }
                        }
                      }
                    }
                  }
                } else {
                  var am = 0;
                  ints[am] = [];
                  for (var ak = 0; ak <= abs_len; ak += 1) {
                    var t = minst + fd * ak;
                    var chk = Check_Key(t);
                    ints[am].push([t, chk]);
                  }
                }
                var ints2 = [];
                var cnt = 0;
                for (var am = 0; am < ints.length; am += 1) {
                  ints2[am + cnt] = [];
                  for (var ak = 0; ak < ints[am].length; ak += 1) {
                    var t = ints[am][ak][0];
                    var chk = ints[am][ak][1];
                    if (ak == 0) {
                      var ot = t;
                      ints2[am + cnt].push([t, chk]);
                    } else {
                      ot = ints[am][ak - 1][0];
                      if (
                        parseInt(t * 1000) / 1000 !=
                        parseInt((ot + fd) * 1000) / 1000
                      ) {
                        cnt++;
                        ints2[am + cnt] = [];
                      }
                      ints2[am + cnt].push([t, chk]);
                    }
                  }
                }
                for (var am = 0; am < ints2.length; am += 1) {
                  var oneint = ints2[am];
                  var ecnt = 0;
                  var st = oneint[0][0];
                  var et = oneint[oneint.length - 1][0];
                  for (var ak = 0; ak < oneint.length; ak += 1) {
                    var t = oneint[ak][0];
                    var chk = oneint[ak][1];
                    if (chk) {
                      ecnt++;
                    }
                  }
                  if (ecnt == 0) {
                    mstarr.push(st);
                    metarr.push(et);
                    typearr.push("empty");
                  } else {
                    var first = false;
                    var stl = null;
                    for (var ak = 0; ak < oneint.length; ak += 1) {
                      var t = oneint[ak][0];
                      var chk = oneint[ak][1];
                      if (ak == 0) {
                        var ot = t;
                        var ochk = chk;
                        if (chk !== true) {
                          mstarr.push(t);
                          first = true;
                        }
                      } else {
                        if (ochk != chk) {
                          if (first) {
                            metarr.push(t);
                            typearr.push("halfbw");
                            stl = t;
                          }
                          break;
                        }
                        var ot = t;
                        var ochk = chk;
                      }
                    }
                    var etl = null;
                    var last = false;
                    for (var ak = oneint.length - 1; ak >= 0; ak--) {
                      var t = oneint[ak][0];
                      var chk = oneint[ak][1];
                      if (ak == oneint.length - 1) {
                        var ot = nt;
                        var nchk = chk;
                        if (chk !== true) {
                          metarr.push(t);
                          last = true;
                        }
                      } else {
                        if (nchk != chk) {
                          if (last) {
                            mstarr.push(t);
                            typearr.push("halffw");
                            etl = t;
                          }
                          break;
                        }
                      }
                    }
                    if (stl === null) {
                      stl = 0;
                    }
                    if (etl === null) {
                      etl = oneint[oneint.length - 1][0];
                    }
                    for (var ak = 0; ak < oneint.length; ak += 1) {
                      var t = oneint[ak][0];
                      var chk = oneint[ak][1];
                      if (
                        parseInt(t * 1000) / 1000 >=
                          parseInt(stl * 1000) / 1000 &&
                        parseInt(t * 1000) / 1000 <= parseInt(etl * 1000) / 1000
                      ) {
                        if (ak == 0) {
                          var ot = t;
                          var ochk = chk;
                        }
                        if (ak > 0) {
                          if (chk != ochk && chk !== true) {
                            if (mstarr.length == metarr.length) {
                              mstarr.push(ot);
                            }
                          }
                          if (chk != ochk && chk) {
                            if (mstarr.length > metarr.length) {
                              metarr.push(t);
                              typearr.push("bidir");
                            }
                          }
                          var ot = t;
                          var ochk = chk;
                        }
                      }
                    }
                  }
                }
                halffw[ad] = [];
                halfbw[ad] = [];
                bidir[ad] = [];
                empty[ad] = [];
                for (var am = 0; am < mstarr.length; am += 1) {
                  var st = mstarr[am];
                  var et = metarr[am];
                  var itype = typearr[am];
                  var mid = parseInt(st * fps + ((et - st) * fps) / 2) / fps;
                  if (itype == "bidir") {
                    for (var ak2 = 0; ak2 < ts.length; ak2 += 1) {
                      var t2 = ts[ak2];
                      if (
                        parseInt(st * 1000) / 1000 ==
                        parseInt(t2 * 1000) / 1000
                      ) {
                        var akst = ak2;
                      }
                      if (
                        parseInt(et * 1000) / 1000 ==
                        parseInt(t2 * 1000) / 1000
                      ) {
                        var aket = ak2;
                      }
                    }
                    bidir[ad].push([st, et, akst, aket, mid]);
                  }
                  if (itype == "halffw") {
                    halffw[ad].push([st, et, mid]);
                  }
                  if (itype == "halfbw") {
                    halfbw[ad].push([st, et, mid]);
                  }
                  if (itype == "empty") {
                    empty[ad].push([st, et, mid]);
                  }
                }
              }
            }
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var backarr = [];
              var forwarr = [];
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              if (ts.length != full_len) {
                for (var am = bidir[ad].length - 1; am >= 0; am--) {
                  var trk = bidir[ad][am];
                  var ast = trk[0];
                  var aet = trk[1];
                  var akst = trk[2];
                  var aket = trk[3];
                  for (var ak = 0; ak < hdata[ad][0].length; ak += 1) {
                    var t = hdata[ad][0][ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      var akst = ak;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      var aket = ak;
                      break;
                    }
                  }
                  var mid = trk[4];
                  forwarr[am] = [];
                  var forwardt = [];
                  var forwardv = [];
                  Find_Forward(am, ast, aet, akst, aket, true);
                  var trk = bidir[ad][am];
                  var ast = trk[0];
                  var aet = trk[1];
                  var akst = trk[2];
                  var aket = trk[3];
                  for (var ak = 0; ak < hdata[ad][0].length; ak += 1) {
                    var t = hdata[ad][0][ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      var akst = ak;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      var aket = ak;
                      break;
                    }
                  }
                  var mid = trk[4];
                  var avet = hdata[ad][1][aket];
                  backarr[am] = [];
                  var backt = [];
                  var backv = [];
                  Find_Backward(am, ast, aet, akst, aket, true);
                  if (backarr && backarr[am] && backarr[am][0]) {
                    backarr[am][0].reverse();
                    backarr[am][1].reverse();
                  }
                  if (backarr[am].length > 0 && forwarr[am].length > 0) {
                    var trk = bidir[ad][am];
                    var ast = trk[0];
                    var aet = trk[1];
                    var finalvals = [];
                    var btimes = backarr[am][0];
                    var bvals = backarr[am][1];
                    var ftimes = forwarr[am][0];
                    var fvals = forwarr[am][1];
                    var midt = trk[4];
                    for (var ak = 0; ak < btimes.length; ak += 1) {
                      var t = btimes[ak];
                      if (
                        parseInt(t * 1000) / 1000 ==
                        parseInt(midt * 1000) / 1000
                      ) {
                        akref = ak;
                      }
                    }
                    var midv = (bvals[akref] + fvals[akref]) / 2;
                    var bdif = bvals[akref] - midv;
                    var bsteps = akref + 1;
                    var bstepv = bdif / bsteps;
                    var fdif = fvals[akref] - midv;
                    var fsteps = bvals.length - 1 - akref;
                    if (fsteps === 0) {
                      var fstepv = [0, 0];
                    } else {
                      var fstepv = fdif / fsteps;
                    }
                    for (var ak = 0; ak < bvals.length; ak += 1) {
                      finalvals[ak] = [];
                      var cmid = (bvals[ak] + fvals[ak]) / 2;
                      if (ak >= 0 && ak < akref) {
                        if (fdif[0] < 0) {
                          finalvals[ak][0] =
                            fvals[ak][0] +
                            ((cmid[0] - fvals[ak][0]) / fsteps) * (ak + 1);
                        } else {
                          finalvals[ak][0] =
                            fvals[ak][0] -
                            ((fvals[ak][0] - cmid[0]) / fsteps) * (ak + 1);
                        }
                        if (fdif[1] < 0) {
                          finalvals[ak][1] =
                            fvals[ak][1] +
                            ((cmid[1] - fvals[ak][1]) / fsteps) * (ak + 1);
                        } else {
                          finalvals[ak][1] =
                            fvals[ak][1] -
                            ((fvals[ak][1] - cmid[1]) / fsteps) * (ak + 1);
                        }
                      }
                      if (ak == akref) {
                        finalvals[ak] = cmid;
                      }
                      if (ak > akref && ak <= bvals.length) {
                        if (bdif[0] < 0) {
                          finalvals[ak][0] =
                            cmid[0] -
                            ((cmid[0] - bvals[ak][0]) / fsteps) * (ak - akref);
                        } else {
                          finalvals[ak][0] =
                            cmid[0] +
                            ((bvals[ak][0] - cmid[0]) / fsteps) * (ak - akref);
                        }
                        if (fdif[1] < 0) {
                          finalvals[ak][1] =
                            cmid[1] -
                            ((cmid[1] - bvals[ak][1]) / fsteps) * (ak - akref);
                        } else {
                          finalvals[ak][1] =
                            cmid[1] +
                            ((bvals[ak][1] - cmid[1]) / fsteps) * (ak - akref);
                        }
                      }
                    }
                    if (
                      parseInt(ftimes[0] * 1000) / 1000 >
                      parseInt(ftimes[ftimes.length - 1] * 1000) / 1000
                    ) {
                      ftimes.reverse();
                      finalvals.reverse();
                    }
                    var temp = hdata[ad][0].slice(0, akst + 1);
                    var temp2 = hdata[ad][0].slice(akst + 1);
                    hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                    var temp = hdata[ad][1].slice(0, akst + 1);
                    var temp2 = hdata[ad][1].slice(akst + 1);
                    hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                  }
                }
              }
            }
            var bidir = [];
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              bidir[ad] = [];
              if (ts.length != full_len && halffw[ad].length > 0) {
                for (var am = halffw[ad].length - 1; am >= 0; am--) {
                  var trk = halffw[ad][am];
                  var ast = trk[0];
                  var aet = trk[1];
                  var v0b = false;
                  var pak = false;
                  var pt = false;
                  for (var ak = ts.length - 1; ak >= 0; ak--) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      pt = t;
                      pak = ak;
                      v0b = hdata[ad][1][ak];
                      break;
                    }
                  }
                  var v0 = false;
                  var nak = false;
                  var nt = false;
                  var aket = false;
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 <=
                      parseInt(aet * 1000) / 1000
                    ) {
                      aket = ak + 1;
                    }
                    if (
                      parseInt(t * 1000) / 1000 >
                      parseInt(aet * 1000) / 1000
                    ) {
                      nt = t;
                      nak = ak;
                      v0 = hdata[ad][1][ak];
                      break;
                    }
                  }
                  if (nak === false) {
                    nak = aket;
                    v0 = v0b;
                    var v = Find_Last_Val(aet, aet, pt, nt, v0);
                  } else {
                    var ptdif = aet - ast;
                    var ntdif = nt - aet;
                    if (ntdif <= ptdif) {
                      var v = Find_First_Val(ast, aet, pt, nt, v0);
                    } else {
                      var v = Find_Last_Val(aet, aet, ast, nt, v0b);
                    }
                  }
                  var mid = parseInt(ast * fps + ((aet - ast) * fps) / 2) / fps;
                  hdata[ad][0].splice(nak, 0, aet);
                  hdata[ad][1].splice(nak, 0, v);
                  bidir[ad].push([ast, aet, mid]);
                }
              }
            }
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              if (ts.length != full_len && halfbw[ad].length) {
                for (am = halfbw[ad].length - 1; am >= 0; am--) {
                  var trk = halfbw[ad][halfbw[ad].length - 1];
                  var ast = trk[0];
                  var aet = trk[1];
                  var v0 = false;
                  var pak = false;
                  var pt = false;
                  for (var ak = ts.length - 1; ak >= 0; ak--) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 >=
                      parseInt(ast * 1000) / 1000
                    ) {
                      akst = ak - 1;
                    }
                    if (
                      parseInt(t * 1000) / 1000 <
                      parseInt(ast * 1000) / 1000
                    ) {
                      pt = t;
                      pak = ak;
                      v0 = hdata[ad][1][pak];
                      break;
                    }
                  }
                  var v = false;
                  var v0b = false;
                  var nak = false;
                  var nt = false;
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      nt = t;
                      v0b = hdata[ad][1][ak];
                      nak = ak;
                      break;
                    }
                  }
                  if (pak === false) {
                    pak = akst;
                    v0 = v0b;
                    v = Find_First_Val(ast, ast, pt, nt, v0);
                  } else {
                    var ptdif = aet - pt;
                    var ntdif = nt - aet;
                    if (ptdif <= ntdif) {
                      v = Find_Last_Val(ast, aet, pt, nt, v0);
                    } else {
                      v = Find_First_Val(ast, ast, pt, nt, v0b);
                    }
                  }
                  hdata[ad][0].splice(pak + 1, 0, ast);
                  hdata[ad][1].splice(pak + 1, 0, v);
                  var mid = parseInt(ast * fps + ((aet - ast) * fps) / 2) / fps;
                  bidir[ad].push([ast, aet, mid]);
                }
              }
            }
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var backarr = [];
              var forwarr = [];
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              if (ts.length != full_len) {
                for (var am = bidir[ad].length - 1; am >= 0; am--) {
                  var trk = bidir[ad][am];
                  var ast = trk[0];
                  var aet = trk[1];
                  for (var ak = 0; ak < hdata[ad][0].length; ak += 1) {
                    var t = hdata[ad][0][ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      var akst = ak;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      var aket = ak;
                      break;
                    }
                  }
                  var mid = trk[2];
                  forwarr[am] = [];
                  var forwardt = [];
                  var forwardv = [];
                  Find_Forward(am, ast, aet, akst, aket, true);
                  var trk = bidir[ad][am];
                  var ast = trk[0];
                  var aet = trk[1];
                  for (var ak = 0; ak < hdata[ad][0].length; ak += 1) {
                    var t = hdata[ad][0][ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      var akst = ak;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      var aket = ak;
                      break;
                    }
                  }
                  var mid = trk[2];
                  var avet = hdata[ad][1][aket];
                  backarr[am] = [];
                  var backt = [];
                  var backv = [];
                  Find_Backward(am, ast, aet, akst, aket, true);
                  if (backarr && backarr[am] && backarr[am][0]) {
                    backarr[am][0].reverse();
                    backarr[am][1].reverse();
                  }
                  if (backarr[am].length > 0 && forwarr[am].length > 0) {
                    var trk = bidir[ad][am];
                    var ast = trk[0];
                    var aet = trk[1];
                    for (var ak = 0; ak < hdata[ad][0].length; ak += 1) {
                      var t = hdata[ad][0][ak];
                      if (
                        parseInt(t * 1000) / 1000 ==
                        parseInt(ast * 1000) / 1000
                      ) {
                        var akst = ak;
                      }
                      if (
                        parseInt(t * 1000) / 1000 ==
                        parseInt(aet * 1000) / 1000
                      ) {
                        var aket = ak;
                        break;
                      }
                    }
                    var finalvals = [];
                    var btimes = backarr[am][0];
                    var bvals = backarr[am][1];
                    var ftimes = forwarr[am][0];
                    var fvals = forwarr[am][1];
                    var midt = trk[2];
                    for (var ak = 0; ak < btimes.length; ak += 1) {
                      var t = btimes[ak];
                      if (
                        parseInt(t * 1000) / 1000 ==
                        parseInt(midt * 1000) / 1000
                      ) {
                        akref = ak;
                      }
                    }
                    var midv = (bvals[akref] + fvals[akref]) / 2;
                    var bdif = bvals[akref] - midv;
                    var bsteps = akref + 1;
                    var bstepv = bdif / bsteps;
                    var fdif = fvals[akref] - midv;
                    var fsteps = bvals.length - 1 - akref;
                    if (fsteps === 0) {
                      var fstepv = [0, 0];
                    } else {
                      var fstepv = fdif / fsteps;
                    }
                    for (var ak = 0; ak < bvals.length; ak += 1) {
                      finalvals[ak] = [];
                      var cmid = (bvals[ak] + fvals[ak]) / 2;
                      if (ak >= 0 && ak < akref) {
                        if (fdif[0] < 0) {
                          finalvals[ak][0] =
                            fvals[ak][0] +
                            ((cmid[0] - fvals[ak][0]) / fsteps) * (ak + 1);
                        } else {
                          finalvals[ak][0] =
                            fvals[ak][0] -
                            ((fvals[ak][0] - cmid[0]) / fsteps) * (ak + 1);
                        }
                        if (fdif[1] < 0) {
                          finalvals[ak][1] =
                            fvals[ak][1] +
                            ((cmid[1] - fvals[ak][1]) / fsteps) * (ak + 1);
                        } else {
                          finalvals[ak][1] =
                            fvals[ak][1] -
                            ((fvals[ak][1] - cmid[1]) / fsteps) * (ak + 1);
                        }
                      }
                      if (ak == akref) {
                        finalvals[ak] = cmid;
                      }
                      if (ak > akref && ak <= bvals.length) {
                        if (bdif[0] < 0) {
                          finalvals[ak][0] =
                            cmid[0] -
                            ((cmid[0] - bvals[ak][0]) / fsteps) * (ak - akref);
                        } else {
                          finalvals[ak][0] =
                            cmid[0] +
                            ((bvals[ak][0] - cmid[0]) / fsteps) * (ak - akref);
                        }
                        if (fdif[1] < 0) {
                          finalvals[ak][1] =
                            cmid[1] -
                            ((cmid[1] - bvals[ak][1]) / fsteps) * (ak - akref);
                        } else {
                          finalvals[ak][1] =
                            cmid[1] +
                            ((bvals[ak][1] - cmid[1]) / fsteps) * (ak - akref);
                        }
                      }
                    }
                    if (
                      parseInt(ftimes[0] * 1000) / 1000 >
                      parseInt(ftimes[ftimes.length - 1] * 1000) / 1000
                    ) {
                      ftimes.reverse();
                      finalvals.reverse();
                    }
                    var temp = hdata[ad][0].slice(0, akst + 1);
                    var temp2 = hdata[ad][0].slice(akst + 1);
                    hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                    var temp = hdata[ad][1].slice(0, akst + 1);
                    var temp2 = hdata[ad][1].slice(akst + 1);
                    hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                  }
                }
              }
            }
            var firstbi = [];
            var lastbi = [];
            var midbi = [];
            for (var ad = 0; ad < hdata.length; ad += 1) {
              firstbi[ad] = [];
              lastbi[ad] = [];
              midbi[ad] = [];
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              if (empty && empty[ad]) {
                for (var am = empty[ad].length - 1; am >= 0; am--) {
                  var match = [];
                  var trk = empty[ad][am];
                  var ast = trk[0];
                  var aet = trk[1];
                  if (
                    parseInt(ast * 1000) / 1000 ==
                    parseInt(minst * 1000) / 1000
                  ) {
                    for (var ak = 0; ak < ts.length; ak += 1) {
                      var t = ts[ak];
                      if (
                        parseInt(t * 1000) / 1000 >
                        parseInt(aet * 1000) / 1000
                      ) {
                        var nt = t;
                        break;
                      }
                    }
                    firstbi[ad].push([ast, aet, nt]);
                  } else {
                    if (
                      parseInt(aet * 1000) / 1000 ==
                      parseInt(maxet * 1000) / 1000
                    ) {
                      for (var ak = ts.length - 1; ak >= 0; ak--) {
                        var t = ts[ak];
                        if (
                          parseInt(t * 1000) / 1000 <
                          parseInt(ast * 1000) / 1000
                        ) {
                          var pt = t;
                          break;
                        }
                      }
                      lastbi[ad].push([pt, ast, aet]);
                    } else {
                      for (var ak = ts.length - 1; ak >= 0; ak--) {
                        var t = ts[ak];
                        if (
                          parseInt(t * 1000) / 1000 <
                          parseInt(ast * 1000) / 1000
                        ) {
                          var pt = t;
                          break;
                        }
                      }
                      for (var ak = 0; ak <= ts.length; ak += 1) {
                        var t = ts[ak];
                        if (
                          parseInt(t * 1000) / 1000 >
                          parseInt(aet * 1000) / 1000
                        ) {
                          var nt = t;
                          break;
                        }
                      }
                      midbi[ad].push([pt, ast, aet, nt]);
                    }
                  }
                }
              }
            }
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              if (firstbi[ad].length > 0) {
                var forwarr = [];
                var aket = 0;
                var trk = firstbi[ad][0];
                var ast = trk[0];
                var aet = trk[1];
                var nt = trk[2];
                var nak = false;
                for (var ak = 0; ak < ts.length; ak += 1) {
                  var t = ts[ak];
                  if (
                    parseInt(t * 1000) / 1000 <=
                    parseInt(aet * 1000) / 1000
                  ) {
                    aket = ak + 1;
                  }
                  if (parseInt(t * 1000) / 1000 == parseInt(nt * 1000) / 1000) {
                    var nak = ak;
                    var v0 = hdata[ad][1][nak];
                  }
                }
                if (nak !== true) {
                  nak = aket;
                }
                var v = Find_First_Val(ast, aet, pt, nt, v0);
                hdata[ad][0].splice(nak, 0, aet);
                hdata[ad][1].splice(nak, 0, v);
                var akst = 0;
                backarr[0] = [];
                var backt = [];
                var backv = [];
                Find_Backward(0, ast, aet, akst, aket, false);
                if (backarr[0].length) {
                  var ftimes = backarr[0][0];
                  ftimes.reverse();
                  var finalvals = backarr[0][1];
                  finalvals.reverse();
                  var temp = hdata[ad][0].slice(0, akst);
                  var temp2 = hdata[ad][0].slice(akst);
                  hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                  var temp = hdata[ad][1].slice(0, akst);
                  var temp2 = hdata[ad][1].slice(akst);
                  hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                }
              }
            }
            for (var ad = 0; ad < hdata.length; ad += 1) {
              var ts = hdata[ad][0];
              var vs = hdata[ad][1];
              if (lastbi[ad].length > 0) {
                var backarr = [];
                var aket = 0;
                var trk = lastbi[ad][0];
                var pt = trk[0];
                var ast = trk[1];
                var aet = trk[2];
                var pak = false;
                for (var ak = ts.length - 1; ak >= 0; ak--) {
                  var t = ts[ak];
                  if (
                    parseInt(t * 1000) / 1000 >=
                    parseInt(ast * 1000) / 1000
                  ) {
                    akst = ak - 1;
                  }
                  if (parseInt(t * 1000) / 1000 == parseInt(pt * 1000) / 1000) {
                    var pak = ak;
                    var v0 = hdata[ad][1][pak];
                  }
                }
                if (pak !== true) {
                  pak = akst;
                }
                var v = Find_Last_Val(ast, aet, pt, nt, v0);
                hdata[ad][0].splice(pak, 0, ast);
                hdata[ad][1].splice(pak, 0, v);
                var aket = ts.length - 1;
                forwarr[0] = [];
                var forwardt = [];
                var forwardv = [];
                Find_Forward(0, ast, aet, akst, aket, false);
                if (forwarr[0].length) {
                  var ftimes = forwarr[0][0];
                  var finalvals = forwarr[0][1];
                  var temp = hdata[ad][0].slice(0, akst + 1);
                  var temp2 = hdata[ad][0].slice(akst + 1);
                  hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                  var temp = hdata[ad][1].slice(0, akst + 1);
                  var temp2 = hdata[ad][1].slice(akst + 1);
                  hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                }
              }
            }
            for (var ad = 0; ad < hdata.length; ad += 1) {
              if (midbi[ad].length > 0) {
                var backarr = [];
                var forwarr = [];
                var ts = hdata[ad][0];
                var vs = hdata[ad][1];
                for (var am = midbi[ad].length - 1; am >= 0; am--) {
                  var trk = midbi[ad][am];
                  var pt = trk[0];
                  var ast = trk[1];
                  var aet = trk[2];
                  var nt = trk[3];
                  var mid = parseInt(ast * fps + ((aet - ast) * fps) / 2) / fps;
                  var v0 = [];
                  var pak = false;
                  var akst = false;
                  for (var ak = ts.length - 1; ak >= 0; ak--) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 >=
                      parseInt(ast * 1000) / 1000
                    ) {
                      akst = ak - 1;
                    }
                    if (
                      parseInt(t * 1000) / 1000 <
                      parseInt(ast * 1000) / 1000
                    ) {
                      pak = ak;
                    }
                    if (akst && pak) {
                      break;
                    }
                  }
                  if (pak !== true) {
                    pak = akst;
                  }
                  v0 = vs[pak];
                  var v = Find_Last_Val(ast, aet, pt, nt, v0);
                  hdata[ad][0].splice(pak, 0, ast);
                  hdata[ad][1].splice(pak, 0, v);
                  var v0 = [];
                  var nak = false;
                  var aket = false;
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var t = ts[ak];
                    if (
                      parseInt(t * 1000) / 1000 <=
                      parseInt(aet * 1000) / 1000
                    ) {
                      aket = ak + 1;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(nt * 1000) / 1000
                    ) {
                      nak = ak;
                    }
                    if (aket && nak) {
                      break;
                    }
                  }
                  if (nak !== true) {
                    nak = aket;
                  }
                  var v0 = hdata[ad][1][nak];
                  var v = Find_First_Val(ast, aet, pt, nt, v0);
                  hdata[ad][0].splice(nak, 0, aet);
                  hdata[ad][1].splice(nak, 0, v);
                  var aket = 0;
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var t = hdata[ad][0][ak];
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(ast * 1000) / 1000
                    ) {
                      akst = ak;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(aet * 1000) / 1000
                    ) {
                      aket = ak;
                    }
                  }
                  forwarr[am] = [];
                  var forwardt = [];
                  var forwardv = [];
                  Find_Forward(am, ast, aet, akst, aket, true);
                  backarr[am] = [];
                  var backt = [];
                  var backv = [];
                  Find_Backward(am, ast, aet, akst, aket, true);
                  if (backarr && backarr[am] && backarr[am][0]) {
                    backarr[am][0].reverse();
                    backarr[am][1].reverse();
                  }
                  if (backarr[am].length > 0 && forwarr[am].length > 0) {
                    var finalvals = [];
                    var btimes = backarr[am][0];
                    var bvals = backarr[am][1];
                    var ftimes = forwarr[am][0];
                    var fvals = forwarr[am][1];
                    var midt = mid;
                    for (var ak = 0; ak < btimes.length; ak += 1) {
                      var t = btimes[ak];
                      if (
                        parseInt(t * 1000) / 1000 ==
                        parseInt(midt * 1000) / 1000
                      ) {
                        akref = ak;
                      }
                    }
                    var midv = (bvals[akref] + fvals[akref]) / 2;
                    var bdif = bvals[akref] - midv;
                    var bsteps = akref + 1;
                    var bstepv = bdif / bsteps;
                    var fdif = fvals[akref] - midv;
                    var fsteps = bvals.length - 1 - akref;
                    if (fsteps === 0) {
                      var fstepv = [0, 0];
                    } else {
                      var fstepv = fdif / fsteps;
                    }
                    for (var ak = 0; ak < bvals.length; ak += 1) {
                      finalvals[ak] = [];
                      var cmid = (bvals[ak] + fvals[ak]) / 2;
                      if (ak >= 0 && ak < akref) {
                        if (fdif[0] < 0) {
                          finalvals[ak][0] =
                            fvals[ak][0] +
                            ((cmid[0] - fvals[ak][0]) / fsteps) * (ak + 1);
                        } else {
                          finalvals[ak][0] =
                            fvals[ak][0] -
                            ((fvals[ak][0] - cmid[0]) / fsteps) * (ak + 1);
                        }
                        if (fdif[1] < 0) {
                          finalvals[ak][1] =
                            fvals[ak][1] +
                            ((cmid[1] - fvals[ak][1]) / fsteps) * (ak + 1);
                        } else {
                          finalvals[ak][1] =
                            fvals[ak][1] -
                            ((fvals[ak][1] - cmid[1]) / fsteps) * (ak + 1);
                        }
                      }
                      if (ak == akref) {
                        finalvals[ak] = cmid;
                      }
                      if (ak > akref && ak <= bvals.length) {
                        if (bdif[0] < 0) {
                          finalvals[ak][0] =
                            cmid[0] -
                            ((cmid[0] - bvals[ak][0]) / fsteps) * (ak - akref);
                        } else {
                          finalvals[ak][0] =
                            cmid[0] +
                            ((bvals[ak][0] - cmid[0]) / fsteps) * (ak - akref);
                        }
                        if (fdif[1] < 0) {
                          finalvals[ak][1] =
                            cmid[1] -
                            ((cmid[1] - bvals[ak][1]) / fsteps) * (ak - akref);
                        } else {
                          finalvals[ak][1] =
                            cmid[1] +
                            ((bvals[ak][1] - cmid[1]) / fsteps) * (ak - akref);
                        }
                      }
                    }
                    var temp = hdata[ad][0].slice(0, akst + 1);
                    var temp2 = hdata[ad][0].slice(akst + 1);
                    hdata[ad][0] = temp.concat(ftimes).concat(temp2);
                    var temp = hdata[ad][1].slice(0, akst + 1);
                    var temp2 = hdata[ad][1].slice(akst + 1);
                    hdata[ad][1] = temp.concat(finalvals).concat(temp2);
                  }
                }
              }
            }
          }
          var ftimes = [];
          for (var ad = 0; ad < etimes.length; ad += 1) {
            ftimes[sort[ad]] = etimes[ad];
            ftimes[sort[ad]].sort(function (a, b) {
              return b < a;
            });
            for (var ak = 0; ak < ftimes[sort[ad]].length; ak += 1) {
              var t = ftimes[sort[ad]][ak];
            }
          }
          var gtimes = [];
          for (var ad = 0; ad < ftimes.length; ad += 1) {
            gtimes[ad] = [];
            var fad = ftimes[ad];
            for (var ak = 0; ak < fad.length; ak += 1) {
              var t = fad[ak];
              var tchk = false;
              for (var ak2 = 0; ak2 < gtimes[ad].length; ak2 += 1) {
                var t2 = gtimes[ad][ak2];
                if (parseInt(t * 1000) / 1000 == parseInt(t2 * 1000) / 1000) {
                  tchk = true;
                }
              }
              if (tchk === false) {
                gtimes[ad].push(t);
              }
            }
          }
          for (var ad = 0; ad < hdata.length; ad += 1) {
            hdata[ad].unshift(sort[ad]);
          }
          hdata.sort(function (a, b) {
            return b[0] < a[0];
          });
          for (var ad = 0; ad < hdata.length; ad += 1) {
            hdata[ad].shift();
          }
          for (var ad = 0; ad < hdata.length; ad += 1) {
            fdata[ad] = hdata[ad].slice(hdata[ad]);
          }
          var len = hdata.length;
          if (ftimes.length > len) {
            for (var ad = ftimes.length - 1; ad >= 0; ad--) {
              ftimes.pop();
              if (ftimes.length == len) {
                break;
              }
            }
          }
          fdata = hdata.slice(hdata);
          var tins = [];
          var touts = [];
          for (var ad = fdata.length - 1; ad >= 0; ad--) {
            var trk = fdata[ad];
            var ttype = trk[3];
            if (ttype == "tout") {
              touts.push(trk);
              fdata.splice(ad, 1);
            }
            if (ttype == "tin") {
              tins.push(trk);
              fdata.splice(ad, 1);
            }
          }
          tins.reverse();
          touts.reverse();
          for (var ad = 0; ad < fdata.length; ad += 1) {
            var trk = fdata[ad];
            var ttype = trk[3];
            var vs = trk[1];
            if (ttype == "mask") {
              var mchk = false;
              for (var at = 0; at < tins.length; at += 1) {
                var tin = tins[at];
                var tout = touts[at];
                var match = tin[8];
                if (ad == match) {
                  mchk = true;
                  var ti = tin[1];
                  var to = tout[1];
                  var intn = [];
                  var outtn = [];
                  for (var ak = 0; ak < vs.length; ak += 1) {
                    intn.push(ti[ak] - vs[ak]);
                    outtn.push(to[ak] - vs[ak]);
                  }
                  trk[6] = intn;
                  trk[7] = outtn;
                }
              }
              if (mchk === false) {
                var intn = [];
                var outtn = [];
                for (var ak = 0; ak < vs.length; ak += 1) {
                  intn.push([0, 0]);
                  outtn.push([0, 0]);
                }
                trk[6] = intn;
                trk[7] = outtn;
              }
            }
          }
          return gtimes;
        }
      }
      function _Crop_00_Window() {
        function Track() {
          main.layer("Selected Masks").locked = false;
          main.layer("Selected Masks").remove();
          var masks = bg.property("ADBE Mask Parade");
          var tdata = [];
          if (main.selectedLayers.length > 0) {
            var data2 = [];
            for (var ap = 0; ap < main.layers.length; ap += 1) {
              var lr = main.layer(ap + 1);
              var suf = lr.name.slice(0, 9);
              var name = lr.name.slice(9);
              var num = Number(name);
              if (suf.toString() == "RT Track " && isNaN(num) === false) {
                if (lr.selected) {
                  data2.push(fdata[num]);
                }
              }
            }
            data = data2.slice(data2);
          } else {
            data = fdata.slice(fdata);
          }
          var mks = [];
          for (var am = 0; am < masks.numProperties; am += 1) {
            var m = masks.property(am + 1);
            var s = m.property("ADBE Mask Shape");
            var v = s.value;
            if (mselarr.indexOf(am + 1) > -1) {
              mks.push([v, true]);
            } else {
              mks.push([v, false]);
            }
          }
          var times = fdata[0][0].slice(fdata[0][0]);
          var mks1 = [mks[0].slice(mks[0])];
          var mks2 = [mks[1].slice(mks[1])];
          var xmks = _Retrack_01_Convert_To_Data(mks1, "crop", false);
          var xrefs = xmks[4];
          var xdata = [];
          xdata[0] = data[xrefs[0]];
          xdata[1] = data[xrefs[1]];
          data = xdata.slice(xdata);
          var xcmks = _Retrack_01_Convert_To_Data(mks2, "tri", false);
          var carr = xcmks[0][0][0];
          data = fdata.slice(fdata);
          closed = true;
          wi.close();
          var croprefs = xmks[4].slice(xmks[4]);
          bg.source.remove();
          Remove();
          Reselect(sel);
          _Crop_01_Set_Crop(croprefs, carr);
        }
        function Switch_Circles(rbg, sw) {
          for (var ae = rbg.effect.numProperties; ae > 0; ae--) {
            var fx = rbg.effect.property(ae);
            if (fx.matchName == "ADBE Circle") {
              if (sw) {
                fx.enabled = true;
              } else {
                fx.enabled = false;
              }
            }
          }
        }
        function Remove_Circles(rbg, selection) {
          if (selection) {
            var opa = 100;
          } else {
            var opa = 0;
          }
          for (var ae = rbg.effect.numProperties; ae > 0; ae--) {
            var fx = rbg.effect.property(ae);
            if (fx.matchName == "ADBE Circle") {
              var opacity = fx.property("ADBE Circle-0011").value;
              if (opacity.toString() == opa.toString()) {
                fx.remove();
              }
            }
          }
        }
        function Select() {
          var masks = bg.property("ADBE Mask Parade");
          if (
            (main.selectedLayers.length == 1 &&
              main.selectedLayers[0] == bg &&
              masks.numProperties > 0) ||
            (main.selectedLayers.length == 0 && masks.numProperties > 0)
          ) {
            bg.effect.property(1).enabled = true;
            var cnt = 0;
            for (var am = 1; am <= masks.numProperties; am += 1) {
              var m = masks.property(am);
              var s = m.property(1);
              if (m.selected) {
                cnt++;
              }
            }
            for (var am = 1; am <= masks.numProperties; am += 1) {
              var m = masks.property(am);
              var s = m.property(1);
              if (m.selected) {
                mselarr.push(am);
                if (s.value.vertices.length == 1) {
                  Circle(am, true, times);
                }
              } else {
                if (s.value.vertices.length == 1 && cnt > 0) {
                  Circle(am, false, times);
                }
              }
            }
            if (cnt == 0) {
              for (var am = 1; am <= masks.numProperties; am += 1) {
                var m = masks.property(am);
                var s = m.property(1);
                mselarr.push(am);
                if (s.value.vertices.length == 1) {
                  Circle(am, true, times);
                }
              }
            }
            var bgsel = bg.duplicate();
            bg.effect.property(1).enabled = false;
            Switch_Circles(bg, false);
            bgsel.name = "Selected Masks";
            bgsel.opacity.setValue(50);
            Remove_Circles(bg, true);
            for (var am = bgsel.mask.numProperties; am > 0; am--) {
              var m = bgsel.mask.property(am);
              if (mselarr.indexOf(am) == -1) {
                m.remove();
              }
            }
            Remove_Circles(bgsel, false);
            bgsel.effect
              .property(1)
              .property("ADBE Stroke-0002")
              .setValue(mk_color);
            bgsel.effect.property(1).property("ADBE Stroke-0007").setValue(2);
            var smkrs = bgsel.property("Marker");
            if (smkrs.numKeys > 0) {
              smkrs.removeKey(1);
            }
            var mkrs = bg.property("Marker");
            if (mkrs.numKeys > 0) {
              mkrs.removeKey(1);
            }
            var mt = main.time;
            var mrk = new MarkerValue("");
            mkrs.setValueAtTime(mt, mrk);
            bgsel.selected = false;
            bgsel.locked = true;
            bg.selected = false;
            bg.locked = true;
          }
        }
        function Remove() {
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            var suf = lr.name.slice(0, 9);
            var name = lr.name.slice(9);
            var num = Number(name);
            if (suf.toString() == "RT Track " && isNaN(num) === false) {
              lr.source.remove();
            }
          }
        }
        var sel = Get_Selection();
        var act = app.project.activeItem.time;
        fps = 1 / app.project.activeItem.frameDuration;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var factor = cw / 60;
        var ratio = parseInt(cw / 200);
        var dur = app.project.activeItem.duration;
        var main = app.project.activeItem;
        var times = fdata[0][0].slice(fdata[0][0]);
        var mselarr = [];
        var closed = false;
        var multi = false;
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (parseInt(times[at] * 1000) / 1000 == parseInt(ct * 1000) / 1000) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var sl = main.selectedLayers[0];
        var ind = sl.index;
        var mcnt = 0;
        var masks = sl.property("ADBE Mask Parade");
        for (var am = 1; am <= masks.numProperties; am += 1) {
          var m = masks.property(am);
          if (m.selected) {
            mcnt++;
            var s = m.property(1);
            var ftime = s.keyTime(1);
          }
        }
        if (mcnt == 1) {
          var maskdif = ftime - sl.inPoint;
        }
        app.beginUndoGroup("Create Helpers");
        if (act < ftime) {
          app.project.activeItem.time = ftime;
        }
        var locked = [];
        for (var ap = 1; ap <= main.layers.length; ap += 1) {
          main.layer(ap).locked = true;
          locked.push(ap);
        }
        var vari = false;
        for (var ap = 0; ap < fdata.length; ap += 1) {
          var dtype = fdata[ap][3];
          if (dtype == "2d" || dtype == "3d") {
            vari = true;
            break;
          }
        }
        var mks = [];
        var el = -1;
        var cnt = -1;
        for (var ap = fdata.length - 1; ap >= 0; ap--) {
          var times = fdata[ap][0].slice(fdata[ap][0]);
          var tdata = fdata[ap][1].slice(fdata[ap][1]);
          var name = "RT Track " + ap;
          if (fdata[ap].length == 4) {
            if (el == -1) {
              cnt++;
              var oel = fdata[ap][3];
              mks[cnt] = [];
            }
            el = fdata[ap][3];
            if (el == oel) {
              mks[cnt].push(fdata[ap][1]);
            } else {
              oel = el;
              cnt++;
              mks[cnt] = [];
              mks[cnt].push(fdata[ap][1]);
            }
          }
          var nc = [pt_color[0], pt_color[1], pt_color[2]];
          var nn = app.project.activeItem.layers.addSolid(
            nc,
            name,
            pt_size_value,
            pt_size_value,
            1,
            5,
          );
          nn.inPoint = 0;
          nn.outPoint = times[times.length - 1] + 1 / fps;
          nn.transform.position.setValuesAtTimes(times, tdata);
        }
        var bg = app.project.activeItem.layers.addSolid(
          [0, 0, 0],
          "Draw masks on this layer.",
          cw,
          ch,
          1,
          dur,
        );
        bg.transform.opacity.setValue(40);
        var stroke = bg
          .property("ADBE Effect Parade")
          .addProperty("ADBE Stroke");
        stroke.property("ADBE Stroke-0010").setValue(1);
        stroke.property("ADBE Stroke-0002").setValue([0, 0, 1, 1]);
        stroke.property("ADBE Stroke-0003").setValue(sk_size_value);
        stroke.property("ADBE Stroke-0004").setValue(0.94);
        stroke.property("ADBE Stroke-0005").setValue(1);
        stroke.property("ADBE Stroke-0006").setValue(15);
        stroke.property("ADBE Stroke-0007").setValue(1);
        stroke.name = "TT Stroke";
        stroke.enabled = false;
        app.endUndoGroup();
        var info_txt = "";
        var wi = new Window("palette");
        wi.text = "Retrack";
        wi.add("group");
        wi.alignment = ["fill", "top"];
        wi.frameLocation = track_fr;
        var info_grp = wi.add("group");
        info_grp.alignment = ["fill", "top"];
        info_grp.size = [160, 50];
        var info_txt = info_grp.add("statictext", undefined, "", {
          multiline: true,
        });
        info_txt.alignment = ["fill", "top"];
        info_txt.size = [10, 52];
        var exp_grp_x = wi.add("group");
        exp_grp_x.alignment = "row";
        var info_txt_x = exp_grp_x.add("statictext", undefined, "Expand X:   ");
        info_txt_x.size = [50, 25];
        var exp_txt_x = exp_grp_x.add("edittext", undefined, "20");
        exp_txt_x.size = [40, 25];
        var exp_grp_y = wi.add("group");
        exp_grp_y.alignment = "row";
        var info_txt_y = exp_grp_y.add("statictext", undefined, "Expand Y:   ");
        info_txt_y.size = [50, 25];
        var exp_txt_y = exp_grp_y.add("edittext", undefined, "20");
        exp_txt_y.size = [40, 25];
        exp_txt_x.active = true;
        var track_grp = wi.add("group");
        track_grp.orientation = "column";
        track_grp.alignment = ["fill", "top"];
        track_sub_grp = track_grp.add("group");
        track_sub_grp.orientation = "row";
        track_sub_grp.alignment = ["fill", "top"];
        crop_line_bt = track_sub_grp.add("button", undefined, "Line");
        crop_line_bt.alignment = ["fill", "top"];
        crop_line_bt.size = [28, 24];
        crop_anc_bt = track_sub_grp.add("button", undefined, "Crop");
        crop_anc_bt.alignment = ["fill", "top"];
        crop_anc_bt.size = [38, 24];
        crop_anc_bt.enabled = false;
        wi.text = "Crop";
        info_txt.text = "Draw a 2 points horizital mask from left to right.";
        var xexpd = parseInt(exp_txt_x.text);
        var yexpd = parseInt(exp_txt_y.text);
        crop_exp_x = xexpd;
        crop_exp_y = yexpd;
        app.beginUndoGroup("Generate Crop Masks");
        var xr = [];
        var yr = [];
        for (var av = 0; av < fdata.length; av += 1) {
          var v = fdata[av][1][akr];
          xr.push(v[0]);
          yr.push(v[1]);
        }
        var minx = Math.min.apply(null, xr);
        var maxx = Math.max.apply(null, xr);
        var miny = Math.min.apply(null, yr);
        var maxy = Math.max.apply(null, yr);
        var v1 = [minx + (maxx - minx) * 0.25, miny + (maxy - miny) * 0.5];
        var v2 = [minx + (maxx - minx) * 0.75, miny + (maxy - miny) * 0.5];
        var ver = [v1, v2];
        var mks = bg.mask;
        var m1 = mks.addProperty("ADBE Mask Atom");
        m1.maskMode = MaskMode.NONE;
        var s = m1.property(1);
        var val = s.value;
        val.vertices = ver;
        val.inTangents = [
          [0, 0],
          [0, 0],
        ];
        val.outTangents = [
          [0, 0],
          [0, 0],
        ];
        s.setValue(val);
        m1 = mks.property(1);
        m1.selected = true;
        Select();
        var bgsel = main.layer(1);
        bgsel.opacity.setValue(80);
        bgsel.locked = false;
        bgsel.selected = true;
        app.endUndoGroup();
        crop_line_bt.onClick = function () {
          app.beginUndoGroup("Generate Center");
          var bgsel = main.layer(1);
          var masks = bgsel.property("ADBE Mask Parade");
          if (
            (main.selectedLayers.length == 1 && masks.numProperties == 1) ||
            (main.selectedLayers.length == 0 && masks.numProperties == 1)
          ) {
            var cnt = 0;
            for (var am = 1; am <= masks.numProperties; am += 1) {
              var m = masks.property(am);
              var s = m.property(1);
              if (m.selected) {
                cnt = cnt + s.value.vertices.length;
                m.selected = false;
              }
              m.locked = true;
            }
            crop_line_bt.enabled = false;
            crop_anc_bt.enabled = true;
            info_txt.text =
              "Draw a 1 point mask for virtual anchor point and click on TRACK button to proceed.";
            var xr = [];
            var yr = [];
            for (var av = 0; av < fdata.length; av += 1) {
              var v = fdata[av][1][akr];
              xr.push(v[0]);
              yr.push(v[1]);
            }
            var minx = Math.min.apply(null, xr);
            var maxx = Math.max.apply(null, xr);
            var miny = Math.min.apply(null, yr);
            var maxy = Math.max.apply(null, yr);
            var v1 = [minx + (maxx - minx) * 0.5, miny + (maxy - miny) * 0.25];
            var v1 = [(maxx + minx) / 2, (maxy + miny) / 2];
            var circle = bgsel
              .property("ADBE Effect Parade")
              .addProperty("ADBE Circle");
            var opa = 100;
            var size = parseInt(sk_size_value);
            circle.property("ADBE Circle-0010").setValue([0, 0, 1]);
            circle.property("ADBE Circle-0002").setValue(size * 2);
            circle.property("ADBE Circle-0012").setValue(2);
            circle.property("ADBE Circle-0011").setValue(opa);
            circle.name = "Center Circle";
            circle.property("ADBE Circle-0001").setValue(v1);
            circle.selected = true;
          }
          app.endUndoGroup();
        };
        crop_anc_bt.onClick = function () {
          app.beginUndoGroup("Generate Crop Clone");
          var tct = app.project.activeItem.time - maskdif;
          if (tct < 0) {
            tct = 0;
          }
          app.project.activeItem.time = tct;
          for (
            var as = 1;
            as <= app.project.activeItem.layers.length;
            as += 1
          ) {
            var alr = app.project.activeItem.layer(as);
            var lock = false;
            if (alr.locked) {
              alr.locked = false;
              lock = true;
            }
            alr.startTime = alr.startTime - maskdif;
            if (lock) {
              alr.locked = true;
            }
          }
          for (var ad = 0; ad < fdata.length; ad += 1) {
            var ts = fdata[ad][0];
            for (var ak = 0; ak < ts.length; ak += 1) {
              ts[ak] = ts[ak] - maskdif;
            }
          }
          var bgsel = main.layer(1);
          var masks = bgsel.property("ADBE Mask Parade");
          var circle = bgsel.effect.property(2);
          var ver = [circle.property("ADBE Circle-0001").value];
          var m2 = masks.addProperty("ADBE Mask Atom");
          var s = m2.property(1);
          var val = s.value;
          val.vertices = ver;
          val.inTangents = [[0, 0]];
          val.outTangents = [[0, 0]];
          s.setValue(val);
          var cnt = 0;
          for (var am = 1; am <= masks.numProperties; am += 1) {
            var m = masks.property(am);
            var s = m.property(1);
            cnt = cnt + s.value.vertices.length;
            mselarr.push(am);
            m.selected = false;
            m.locked = false;
          }
          if (cnt == 3) {
            bg.locked = false;
            bg.remove();
            bg = bgsel.duplicate();
            Track();
            for (
              var as = 1;
              as <= app.project.activeItem.layers.length;
              as += 1
            ) {
              var alr = app.project.activeItem.layer(as);
              var lock = false;
              if (alr.locked) {
                alr.locked = false;
              }
              alr.startTime = alr.startTime + maskdif;
            }
            app.project.activeItem.time = act;
          } else {
            mselarr = [];
            crop_line_bt.enabled = true;
            crop_anc_bt.enabled = false;
            for (am = masks.numProperties; am > 0; am--) {
              var m = masks.property(am);
              m.remove();
            }
            alert("Please draw 2 masks following the instructions.");
          }
          app.endUndoGroup();
        };
        wi.onClose = function () {
          track_fr = wi.frameLocation;
          if (closed === false) {
            try {
              bg.source;
            } catch (e) {
            } finally {
              app.beginUndoGroup("Cancel Retrack");
              Remove();
              bg.source.remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              Reselect(sel);
              app.endUndoGroup();
            }
          }
        };
        wi.show();
      }
      function _Crop_01_Set_Crop(crefs, carr) {
        if (data.length > 0) {
          var xexpd = crop_exp_x;
          var yexpd = crop_exp_y;
          var main = app.project.activeItem;
          fps = 1 / app.project.activeItem.frameDuration;
          var fd = app.project.activeItem.frameDuration;
          ct = app.project.activeItem.time;
          var cw = app.project.activeItem.width;
          var ch = app.project.activeItem.height;
          var ratio = parseInt(cw / 100);
          var dur = app.project.activeItem.duration;
          var sl = app.project.activeItem.selectedLayers[0];
          var cname = sl.name;
          var slind = sl.index;
          var ctdif = ct - sl.inPoint;
          var masks = sl.property("ADBE Mask Parade");
          var msel = [];
          for (var am = 0; am < masks.numProperties; am += 1) {
            var m = masks.property(am + 1);
            var o = m.property(3);
            var opaexp = o.expression;
            if (m.selected) {
              if (m.rotoBezier) {
                var roto = true;
              }
              msel.push(am + 1);
            }
          }
          if (msel.length == 1) {
            var times = data[0][0];
            var tchk = false;
            for (var at = 0; at < times.length; at += 1) {
              if (times[at].toString() == ct.toString()) {
                var akr = at;
                tchk = true;
                break;
              }
            }
            if (tchk !== true) {
              akr = 0;
            }
            var intan = [];
            var outtan = [];
            var introt = [];
            var outrot = [];
            var s = m.property(1);
            for (var ak = 0; ak < s.numKeys; ak += 1) {
              var v = s.keyValue(ak + 1);
              var tin = v.inTangents;
              var tout = v.outTangents;
              intan.push(tin);
              outtan.push(tout);
            }
            var dupli = sl.duplicate();
            dupli.locked = false;
            dupli.name = sl.name;
            sl.selected = false;
            dupli.enabled = false;
            dupli.selected = true;
            var masks = dupli.mask;
            for (var am = masks.numProperties - 1; am >= 0; am--) {
              var m = masks.property(am + 1);
              if (am + 1 !== msel[0]) {
                m.remove();
              }
            }
            var fxs = dupli.property("ADBE Effect Parade");
            for (var am = fxs.numProperties; am > 0; am--) {
              var fx = fxs.property(am);
              fx.remove();
            }
            var mks = dupli.mask;
            var mind = 1;
            var m = mks.property(1);
            m.selected;
            m.maskMode = MaskMode.NONE;
            var s = m.property("ADBE Mask Shape");
            var mv = [];
            var ver = [];
            for (var ak = 0; ak < times.length; ak += 1) {
              var v = s.value;
              var ver = [];
              for (var av = 0; av < data.length; av += 1) {
                ver[av] = data[av][1][ak];
              }
              v.vertices = ver;
              v.inTangents = intan[ak];
              v.outTangents = outtan[ak];
              mv.push(v);
            }
            if (roto) {
              m.selected = true;
              var cchk = false;
              for (var ax = 0; ax < rotobezier.length; ax += 1) {
                if (eval('app.findMenuCommandId("' + rotobezier[ax] + '");')) {
                  eval(
                    'app.executeCommand(app.findMenuCommandId("' +
                      rotobezier[ax] +
                      '"));',
                  );
                  cchk = true;
                  break;
                }
              }
              if (cchk === false) {
                alert(
                  "Sorry: language not supported. Please install After Effects english version.",
                );
              }
              m.selected = false;
            }
            var p1 = data[crefs[0]][1].slice(data[crefs[0]][1]);
            var p2 = data[crefs[1]][1].slice(data[crefs[1]][1]);
            var mkc = carr[akr];
            if (crefs.length > 0) {
              var refs = crefs;
              var p1 = data[crefs[0]][1].slice(data[crefs[0]][1]);
              var p2 = data[crefs[1]][1].slice(data[crefs[1]][1]);
            } else {
              var ula = [];
              var ura = [];
              var bla = [];
              var bra = [];
              var dists = [];
              for (var av = 0; av < data.length; av += 1) {
                var c = carr[akr];
                var v = data[av][1][akr];
                var d = Math.sqrt(
                  Math.pow(v[0] - c[0], 2) + Math.pow(v[1] - c[1], 2),
                );
                var dx = v[0] - c[0];
                var dy = v[1] - c[1];
                var ang = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
                if (ang >= 0 && ang < 90) {
                  ura.push([av, ang, d]);
                }
                if (ang >= 90 && ang < 180) {
                  bra.push([av, ang, d]);
                }
                if (ang >= 180 && ang < 270) {
                  bla.push([av, ang, d]);
                }
                if (ang >= 270 && ang < 360) {
                  ula.push([av, ang, d]);
                }
              }
              var ulr = ula.sort(function (a, b) {
                return b[2] > a[2];
              })[0][0];
              var urr = ura.sort(function (a, b) {
                return b[2] > a[2];
              })[0][0];
              var blr = bla.sort(function (a, b) {
                return b[2] > a[2];
              })[0][0];
              var brr = bra.sort(function (a, b) {
                return b[2] > a[2];
              })[0][0];
              var dtop = [
                Math.abs(data[ulr][1][akr][0] - data[urr][1][akr][0]),
                Math.abs(data[ulr][1][akr][1] - data[urr][1][akr][1]),
              ];
              var dbot = [
                Math.abs(data[blr][1][akr][0] - data[brr][1][akr][0]),
                Math.abs(data[blr][1][akr][1] - data[brr][1][akr][1]),
              ];
              if (dtop <= dbot) {
                var p1 = data[blr][1].slice(data[blr][1]);
                var p2 = data[brr][1].slice(data[brr][1]);
                var refs = [blr, brr];
              } else {
                var p1 = data[ulr][1].slice(data[ulr][1]);
                var p2 = data[urr][1].slice(data[urr][1]);
                var refs = [ulr, urr];
              }
            }
            for (var av = data.length - 1; av >= 0; av--) {
              var tn = app.project.activeItem.layers.addNull();
              tn.enabled = false;
              tn.moveAfter(dupli);
              tnp = tn.property("Position");
              tnp.setValuesAtTimes(times, data[av][1]);
              tn.parent = dupli;
            }
            var srot = [];
            var r0 =
              (Math.atan2(p2[akr][1] - p1[akr][1], p2[akr][0] - p1[akr][0]) *
                180) /
              Math.PI;
            for (var ak = 0; ak < times.length; ak += 1) {
              var r =
                (Math.atan2(p2[ak][1] - p1[ak][1], p2[ak][0] - p1[ak][0]) *
                  180) /
                Math.PI;
              var rotd = r0 - r;
              srot.push(rotd);
            }
            for (var ak = 0; ak < times.length; ak += 1) {
              if (crefs.length > 0) {
              }
            }
            dupli.transform
              .property("ADBE Rotate Z")
              .setValuesAtTimes(times, srot);
            var ssca = [];
            var s0 = Math.sqrt(
              Math.pow(p2[akr][0] - p1[akr][0], 2) +
                Math.pow(p2[akr][1] - p1[akr][1], 2),
            );
            for (var ak = 0; ak < times.length; ak += 1) {
              var s = Math.sqrt(
                Math.pow(p2[ak][0] - p1[ak][0], 2) +
                  Math.pow(p2[ak][1] - p1[ak][1], 2),
              );
              var sdx = (Math.abs(s0) / Math.abs(s)) * 100;
              var sdy = sdx;
              var sd = [sdx, sdy];
              ssca.push(sd);
            }
            dupli.transform.scale.setValuesAtTimes(times, ssca);
            var difs = [];
            var sanc = [];
            var spos = [];
            var pos0 = carr[akr];
            for (var ak = 0; ak < times.length; ak += 1) {
              var dif = carr[ak] - pos0;
              difs.push(dif);
              var ancd = pos0 + dif;
              sanc.push(ancd);
              var posd = pos0 - dif;
              spos.push(posd);
            }
            dupli.transform.anchorPoint.setValuesAtTimes(times, sanc);
            var gn = app.project.activeItem.layers.addNull();
            gn.enabled = false;
            gn.moveToEnd();
            gnp = gn.property("Position");
            var marr = [];
            for (var av = 0; av < data.length; av += 1) {
              marr[av] = [];
              var tn = app.project.activeItem.layer(dupli.index + av + 1);
              gnp.expression =
                "L = thisComp.layer(" + tn.index + ");L.toWorld(L.anchorPoint)";
              for (var ak = 0; ak < times.length; ak += 1) {
                var t = times[ak];
                var v = gnp.valueAtTime(t, false);
                v.pop();
                marr[av].push(v);
              }
            }
            gn.source.remove();
            var bbak = [];
            var vx = [];
            var vy = [];
            xyakr = [];
            for (var ak = 0; ak < times.length; ak += 1) {
              var vx0 = [];
              var vy0 = [];
              for (var av = 0; av < data.length; av += 1) {
                var tnv = marr[av][ak];
                vx.push(tnv[0] - xexpd);
                vy.push(tnv[1] + xexpd);
                vx0.push(tnv[0] - yexpd);
                vy0.push(tnv[1] + yexpd);
              }
              var min_x = Math.min.apply(null, vx0) - xexpd;
              var max_x = Math.max.apply(null, vx0) + xexpd;
              var min_y = Math.min.apply(null, vy0) - yexpd;
              var max_y = Math.max.apply(null, vy0) + yexpd;
              var xd = Math.abs(max_x - min_x);
              var yd = Math.abs(max_y - min_y);
              var bb = [min_x, max_x, min_y, max_y];
              bbak.push([xd, yd, bb, ak]);
            }
            var min_x = Math.min.apply(null, vx) - xexpd;
            var max_x = Math.max.apply(null, vx) + xexpd;
            var min_y = Math.min.apply(null, vy) - yexpd;
            var max_y = Math.max.apply(null, vy) + yexpd;
            var bb = [min_x, max_x, min_y, max_y];
            var nbbx = [];
            var nbby = [];
            for (var av = 0; av < data.length; av += 1) {
              var tn = app.project.activeItem.layer(dupli.index + av + 1);
              var np = tn.position.keyValue(akr + 1);
              nbbx.push(np[0]);
              nbby.push(np[1]);
            }
            var minx = Math.min.apply(null, nbbx);
            var maxx = Math.max.apply(null, nbbx);
            var miny = Math.min.apply(null, nbby);
            var maxy = Math.max.apply(null, nbby);
            var xlen = maxx - minx;
            var arx = (mkc[0] - minx) / xlen;
            var ylen = maxy - miny;
            var ary = (mkc[1] - miny) / ylen;
            var cw = app.project.activeItem.width;
            var ch = app.project.activeItem.height;
            var pw = max_x - min_x;
            var ph = max_y - min_y;
            var cnw = Math.round(pw);
            var cnh = Math.round(ph);
            var cwd = cnw - pw;
            var chd = cnh - ph;
            var cdif = [cwd / 2, chd / 2];
            var main_comp = app.project.activeItem;
            var sl = main_comp.layer(slind);
            var slst = sl.startTime;
            var slip = sl.inPoint;
            var slop = sl.outPoint;
            if (times[0] > slip) {
              sl.inPoint = slip = times[0];
            }
            if (times[times.length - 1] < slop) {
              sl.outPoint = slop =
                times[times.length - 1] + app.project.activeItem.frameDuration;
            }
            var indexes = [slind];
            for (var av = 1; av <= data.length; av += 1) {
              indexes.push(slind + av);
            }
            main_comp.layers.precompose(indexes, "CR_LK_", true);
            var sl = app.project.activeItem.selectedLayers[0];
            var sla = sl.transform.anchorPoint;
            var slp = sl.transform.position;
            var slr = sl.transform.property("ADBE Rotate Z");
            var sls = sl.transform.scale;
            var icomp = sl.source;
            var id = icomp.id;
            icomp.name = icomp.name + id;
            icomp.width = cnw;
            icomp.height = cnh;
            var rc = sl.source.layer(1);
            var rca = rc.transform.anchorPoint;
            var rcp = rc.transform.position;
            rc.inPoint = 0;
            rc.startTime = slst - slip;
            rc.outPoint = slop + slip;
            rc.enabled = true;
            sl.startTime = slip;
            sl.source.duration = slop - slip;
            for (var an = 1; an <= data.length; an += 1) {
              var tn = icomp.layer(1 + an);
              var dif = tn.position.keyTime(1) - tn.inPoint;
              tn.startTime = tn.startTime - dif;
            }
            var slav = sla.value;
            var ax = cnw / 2 - cnw * arx;
            var ay = cnh / 2 - cnh * ary;
            var crdx = xexpd - xexpd * 2 * arx;
            var crdy = yexpd - yexpd * 2 * ary;
            var npx = slav[0] - ax + crdx;
            var npy = slav[1] - ay + crdy;
            var refv = [npx, npy];
            rcp.setValue(refv);
            sla.setValue(refv);
            slp.setValue(sanc[akr]);
            var vals = [];
            var a0 = sanc[akr];
            for (var ak = 0; ak < sanc.length; ak += 1) {
              var d = sanc[ak] - sanc[akr];
              vals.push(sanc[akr] + d);
            }
            slp.setValuesAtTimes(times, vals);
            var ssca = [];
            var s0 = Math.sqrt(
              Math.pow(p2[akr][0] - p1[akr][0], 2) +
                Math.pow(p2[akr][1] - p1[akr][1], 2),
            );
            for (var ak = 0; ak < times.length; ak += 1) {
              var s = Math.sqrt(
                Math.pow(p2[ak][0] - p1[ak][0], 2) +
                  Math.pow(p2[ak][1] - p1[ak][1], 2),
              );
              var sdx = (Math.abs(s) / Math.abs(s0)) * 100;
              var sdy = sdx;
              var sd = [sdx, sdy];
              ssca.push(sd);
            }
            sls.setValuesAtTimes(times, ssca);
            var rrot = [];
            for (var ak = 0; ak < srot.length; ak += 1) {
              var d = srot[ak] - srot[akr];
              rrot.push(srot[akr] - d);
            }
            slr.setValuesAtTimes(times, rrot);
            var ec = sl.source.layer(1);
            var em = ec.mask.property(1);
            var es = em.property(1);
            var gn = icomp.layers.addNull();
            gn.enabled = false;
            gn.moveToEnd();
            gnp = gn.property("Position");
            var marr = [];
            var intan = [];
            var outtan = [];
            for (var av = 0; av < data.length; av += 1) {
              marr[av] = [];
              intan[av] = [];
              outtan[av] = [];
              var tn = icomp.layer(ec.index + av + 1);
              gnp.expression =
                "L = thisComp.layer(" + tn.index + ");L.toWorld(L.anchorPoint)";
              for (var ak = 0; ak < times.length; ak += 1) {
                var t = times[ak];
                var v = gnp.valueAtTime(t, false);
                marr[av].push([v[0], v[1]]);
              }
            }
            var em = ec.mask.property(1);
            var es = em.property(1);
            var intan = [];
            var outtan = [];
            var en = icomp.layers.addNull();
            en.enabled = false;
            var enp = en.position;
            en.parent = ec;
            gnp.expression =
              "L = thisComp.layer(" + en.index + ");L.toWorld(L.anchorPoint)";
            for (var ak = 0; ak < es.numKeys; ak += 1) {
              var t = fd * ak;
              var ev = es.keyValue(ak + 1);
              intan[ak] = [];
              outtan[ak] = [];
              for (var av = 0; av < ev.vertices.length; av += 1) {
                var evr = ev.vertices[av];
                var evtin = ev.inTangents[av];
                var evtout = ev.outTangents[av];
                enp.setValue(evr);
                var evrt = [
                  gnp.valueAtTime(t, false)[0],
                  gnp.valueAtTime(t, false)[1],
                ];
                enp.setValue(evr + evtin);
                var vrv = [
                  gnp.valueAtTime(t, false)[0],
                  gnp.valueAtTime(t, false)[1],
                ];
                intan[ak].push(vrv - evrt);
                enp.setValue(evr + evtout);
                var vrv = [
                  gnp.valueAtTime(t, false)[0],
                  gnp.valueAtTime(t, false)[1],
                ];
                outtan[ak].push(vrv - evrt);
              }
            }
            en.source.remove();
            gn.source.remove();
            var bbak = [];
            var vx = [];
            var vy = [];
            for (var ak = 0; ak < times.length; ak += 1) {
              var vx0 = [];
              var vy0 = [];
              for (var av = 0; av < data.length; av += 1) {
                var tnv = marr[av][ak];
                vx.push(tnv[0]);
                vy.push(tnv[1]);
                vx0.push(tnv[0]);
                vy0.push(tnv[1]);
              }
              var min_x = Math.min.apply(null, vx0);
              var max_x = Math.max.apply(null, vx0);
              var min_y = Math.min.apply(null, vy0);
              var max_y = Math.max.apply(null, vy0);
              var xd = Math.abs(max_x - min_x);
              var yd = Math.abs(max_y - min_y);
              var bb = [min_x, max_x, min_y, max_y];
              bbak.push([xd, yd, bb, ak]);
            }
            var min_x = Math.min.apply(null, vx);
            var max_x = Math.max.apply(null, vx);
            var min_y = Math.min.apply(null, vy);
            var max_y = Math.max.apply(null, vy);
            var bb = [min_x, max_x, min_y, max_y];
            var m = sl
              .property("ADBE Mask Parade")
              .addProperty("ADBE Mask Atom");
            var s = m.property(1);
            var mvals = [];
            for (var ak = 0; ak < times.length; ak += 1) {
              var r = slr.valueAtTime(times[ak], true);
              var v = s.value;
              var ver = [];
              var fin = [];
              var fout = [];
              for (var av = 0; av < data.length; av += 1) {
                ver.push(marr[av][ak]);
                fin.push(intan[ak][av]);
                fout.push(outtan[ak][av]);
              }
              v.vertices = ver;
              v.inTangents = fin;
              v.outTangents = fout;
              mvals.push(v);
            }
            s.setValuesAtTimes(times, mvals);
            if (roto) {
              m.selected = true;
              var cchk = false;
              for (var ax = 0; ax < rotobezier.length; ax += 1) {
                if (eval('app.findMenuCommandId("' + rotobezier[ax] + '");')) {
                  eval(
                    'app.executeCommand(app.findMenuCommandId("' +
                      rotobezier[ax] +
                      '"));',
                  );
                  cchk = true;
                  break;
                }
              }
              if (cchk === false) {
                alert(
                  "Sorry: language not supported. Please install After Effects english version.",
                );
              }
              m.selected = false;
            }
            var sla = sl.anchorPoint;
            var isl = sl.source.layer(1);
            var imks = isl.mask;
            var im = imks.property(1);
            var ex = im.property(4);
            var anc_ref = sla.value;
            var exp = [xexpd, yexpd, ct, anc_ref];
            ex.expression = JSON.stringify(exp);
            ex.expressionEnabled = false;
            for (var av = data.length - 1; av >= 0; av--) {
              var tn = icomp.layer(ec.index + av + 1);
            }
            var fxs = sl.effect;
            var pfx = fxs.addProperty("ADBE Point Control");
            pfx.name = "OUT Anchor";
            var sfx = fxs.addProperty("ADBE Point Control");
            sfx.name = "OUT Scale";
            var rfx = fxs.addProperty("ADBE Angle Control");
            rfx.name = "OUT Rotation";
            var afx = fxs.property(1).property(1);
            afx.setValue([0, 0]);
            sl.anchorPoint.expression =
              'transform.anchorPoint - effect("OUT Anchor")("Point")';
            var sfx = fxs.property(2).property(1);
            sfx.setValue([100, 100]);
            sl.scale.expression =
              'transform.scale + effect("OUT Scale")("Point") - [100,100]';
            var rfx = fxs.property(3).property(1);
            rfx.setValue(0);
            sl.transform.property("ADBE Rotate Z").expression =
              'transform.rotation + effect("OUT Rotation")("Angle")';
            var fxs = sl.effect;
            var ipfx = fxs.addProperty("ADBE Point Control");
            ipfx.name = "IN Position";
            var isfx = fxs.addProperty("ADBE Point Control");
            isfx.name = "IN Scale";
            var irfx = fxs.addProperty("ADBE Angle Control");
            irfx.name = "IN Rotation";
            var ipfx = fxs.property(4).property(1);
            ipfx.setValue([0, 0]);
            isl.position.expression =
              'transform.position + comp("' +
              main.name +
              '").layer("' +
              sl.name +
              '").effect("IN Position")("Point")';
            var isfx = fxs.property(5).property(1);
            isfx.setValue([100, 100]);
            isl.scale.expression =
              'transform.scale + comp("' +
              main.name +
              '").layer("' +
              sl.name +
              '").effect("IN Scale")("Point") - [100,100]';
            var irfx = fxs.property(6).property(1);
            irfx.setValue(0);
            isl.transform.property("ADBE Rotate Z").expression =
              'transform.rotation + comp("' +
              main.name +
              '").layer("' +
              sl.name +
              '").effect("IN Rotation")("Angle")';
          }
        }
      }
      function _Crop_02_Edit_Crop() {
        function Crop(reset) {
          xexpd = parseInt(exp_txt_x.text);
          yexpd = parseInt(exp_txt_y.text);
          crop_exp_x = xexpd;
          crop_exp_y = yexpd;
          var ct = app.project.activeItem.time;
          fps = 1 / app.project.activeItem.frameDuration;
          var main = app.project.activeItem;
          var cw = main.width;
          var ch = main.height;
          var sl = main.selectedLayers[0];
          var ind = sl.index;
          var icomp = sl.source;
          var isl = icomp.layer(1);
          var fxs = sl.effect;
          if (reset) {
            for (var ap = 1; ap <= 6; ap += 1) {
              var fx = fxs.property(ap).property(1);
              for (var ak = fx.numKeys; ak > 0; ak--) {
                fx.removeKey(ak);
              }
            }
          }
          var ipfx = fxs.property(4).property(1);
          var ipfxvref = ipfx.valueAtTime(ct, true);
          var ipfxarr = [];
          if (ipfx.numKeys > 0) {
            for (var ak = 1; ak <= ipfx.numKeys; ak += 1) {
              ipfxarr.push(ipfx.keyValue(ak));
            }
          } else {
            var ipfxv = ipfx.value;
          }
          ipfx.expression = "[0,0]";
          var old_slav = sl.anchorPoint.value;
          var old_islpv = isl.position.valueAtTime(0, false);
          var old_slav = sl.anchorPoint.valueAtTime(0, false);
          var adif = old_slav - old_islpv;
          adif = [adif[0], adif[1]];
          var sfx = fxs.property(2).property(1);
          var sfxarr = [];
          if (sfx.numKeys > 0) {
            for (var ak = 1; ak <= sfx.numKeys; ak += 1) {
              sfxarr.push(sfx.keyValue(ak));
            }
          } else {
            var sfxv = sfx.value;
          }
          sfx.expression = "[100,100]";
          var afx = fxs.property(1).property(1);
          var afxarr = [];
          if (afx.numKeys > 0) {
            for (var ak = 1; ak <= afx.numKeys; ak += 1) {
              afxarr.push(afx.keyValue(ak));
            }
          } else {
            var afxv = afx.value;
          }
          afx.expression = "[0,0]";
          var rfx = fxs.property(3).property(1);
          var rfxarr = [];
          if (rfx.numKeys > 0) {
            for (var ak = 1; ak <= rfx.numKeys; ak += 1) {
              rfxarr.push(rfx.keyValue(ak));
            }
          } else {
            var rfxv = rfx.value;
          }
          rfx.expression = "0";
          var isfx = fxs.property(5).property(1);
          var isfxarr = [];
          if (isfx.numKeys > 0) {
            for (var ak = 1; ak <= isfx.numKeys; ak += 1) {
              isfxarr.push(isfx.keyValue(ak));
            }
          } else {
            var isfxv = isfx.value;
          }
          isfx.expression = "[100,100]";
          var irfx = fxs.property(6).property(1);
          var irfxarr = [];
          if (irfx.numKeys > 0) {
            for (var ak = 1; ak <= irfx.numKeys; ak += 1) {
              irfxarr.push(irfx.keyValue(ak));
            }
          } else {
            var irfxv = irfx.value;
          }
          rfx.expression = "0";
          var imks = isl.mask;
          var im = imks.property(1);
          var is = im.property(1);
          var ex = im.property(4);
          var res = eval(ex.expression);
          var xd = xexpd - res[0];
          var yd = yexpd - res[1];
          var anc_ref = res[3];
          sl.enabled = false;
          sl.selected = false;
          if (icomp.width - res[0] + xexpd < 20) {
            icomp.width = 20;
          } else {
            icomp.width = icomp.width - res[0] + xexpd;
          }
          if (icomp.height - res[1] + yexpd < 20) {
            icomp.height = 20;
          } else {
            icomp.height = icomp.height - res[1] + yexpd;
          }
          var ec = icomp.layer(1);
          var gn = icomp.layers.addNull();
          gn.enabled = false;
          gn.moveToEnd();
          gnp = gn.property("Position");
          isl.parent = gn;
          var gnpv = gnp.value;
          gnpv = gnpv + [xd / 2, yd / 2];
          gnp.setValue(gnpv);
          isl.parent = null;
          var marr = [];
          var len = is.value.vertices.length;
          for (var av = 0; av < len; av += 1) {
            marr[av] = [];
            var tn = icomp.layer(ec.index + av + 1);
            gnp.expression =
              "L = thisComp.layer(" + tn.index + ");L.toWorld(L.anchorPoint)";
            for (var ak = 0; ak < is.numKeys; ak += 1) {
              var t = is.keyTime(ak + 1);
              var v = gnp.valueAtTime(t, false);
              marr[av].push([v[0], v[1]]);
            }
          }
          var em = ec.mask.property(1);
          var es = em.property(1);
          var intan = [];
          var outtan = [];
          var en = icomp.layers.addNull();
          en.enabled = false;
          var enp = en.position;
          en.parent = ec;
          gnp.expression =
            "L = thisComp.layer(" + en.index + ");L.toWorld(L.anchorPoint)";
          for (var ak = 0; ak < es.numKeys; ak += 1) {
            var t = es.keyTime(ak + 1);
            var ev = es.keyValue(ak + 1);
            intan[ak] = [];
            outtan[ak] = [];
            for (var av = 0; av < ev.vertices.length; av += 1) {
              var evr = ev.vertices[av];
              var evtin = ev.inTangents[av];
              var evtout = ev.outTangents[av];
              enp.setValue(evr);
              var evrt = [
                gnp.valueAtTime(t, false)[0],
                gnp.valueAtTime(t, false)[1],
              ];
              enp.setValue(evr + evtin);
              var vrv = [
                gnp.valueAtTime(t, false)[0],
                gnp.valueAtTime(t, false)[1],
              ];
              intan[ak].push(vrv - evrt);
              enp.setValue(evr + evtout);
              var vrv = [
                gnp.valueAtTime(t, false)[0],
                gnp.valueAtTime(t, false)[1],
              ];
              outtan[ak].push(vrv - evrt);
            }
          }
          en.source.remove();
          gn.source.remove();
          var bbak = [];
          var vx = [];
          var vy = [];
          for (var ak = 0; ak < is.numKeys; ak += 1) {
            var vx0 = [];
            var vy0 = [];
            for (var av = 0; av < len; av += 1) {
              var tnv = marr[av][ak];
              vx.push(tnv[0]);
              vy.push(tnv[1]);
              vx0.push(tnv[0]);
              vy0.push(tnv[1]);
            }
            var min_x = Math.min.apply(null, vx0);
            var max_x = Math.max.apply(null, vx0);
            var min_y = Math.min.apply(null, vy0);
            var max_y = Math.max.apply(null, vy0);
            var xd = Math.abs(max_x - min_x);
            var yd = Math.abs(max_y - min_y);
            var bb = [min_x, max_x, min_y, max_y];
            bbak.push([xd, yd, bb, ak]);
          }
          var min_x = Math.min.apply(null, vx);
          var max_x = Math.max.apply(null, vx);
          var min_y = Math.min.apply(null, vy);
          var max_y = Math.max.apply(null, vy);
          var bb = [min_x, max_x, min_y, max_y];
          var m = sl.mask.property(1);
          var s = m.property(1);
          if (m.rotoBezier) {
            var roto = true;
          }
          var times = [];
          var mvals = [];
          for (var ak = 0; ak < s.numKeys; ak += 1) {
            var t = s.keyTime(ak + 1);
            times.push(t);
            var v = s.value;
            var ver = [];
            for (var av = 0; av < len; av += 1) {
              ver.push(marr[av][ak]);
            }
            v.vertices = ver;
            v.inTangents = intan[ak];
            v.outTangents = outtan[ak];
            mvals.push(v);
          }
          s.setValuesAtTimes(times, mvals);
          if (roto) {
            m.selected = true;
            var cchk = false;
            for (var ax = 0; ax < rotobezier.length; ax += 1) {
              if (eval('app.findMenuCommandId("' + rotobezier[ax] + '");')) {
                eval(
                  'app.executeCommand(app.findMenuCommandId("' +
                    rotobezier[ax] +
                    '"));',
                );
                cchk = true;
                break;
              }
            }
            if (cchk === false) {
              alert(
                "Sorry: language not supported. Please install After Effects english version.",
              );
            }
            m.selected = false;
          }
          var exp = [xexpd, yexpd, ct, anc_ref];
          ex.expression = JSON.stringify(exp);
          ex.expressionEnabled = false;
          var islp = isl.position;
          var islpv = islp.value;
          var sla = sl.anchorPoint;
          sla.setValue(islpv + adif);
          sl.enabled = true;
          sl.selected = true;
          var fxs = sl.effect;
          var sfx = fxs.property(2).property(1);
          sfx.expression = "";
          if (sfxarr.length > 0) {
            for (var ak = 0; ak < sfxarr.length; ak += 1) {
              sfx.setValueAtKey(ak + 1, sfxarr[ak]);
            }
          } else {
            sfx.setValue(sfxv);
          }
          var afx = fxs.property(1).property(1);
          afx.expression = "";
          if (afxarr.length > 0) {
            for (var ak = 0; ak < afxarr.length; ak += 1) {
              afx.setValueAtKey(ak + 1, afxarr[ak] - adif);
              if (ak == 0) {
                afx.setValueAtKey(ak + 1, [0, 0]);
              } else {
                afx.setValueAtKey(ak + 1, afxarr[ak] - afxarr[0]);
              }
            }
          } else {
            afx.setValue(afxv - adif);
            afx.setValue([0, 0]);
          }
          var rfx = fxs.property(3).property(1);
          rfx.expression = "";
          if (rfxarr.length > 0) {
            for (var ak = 0; ak < rfxarr.length; ak += 1) {
              rfx.setValueAtKey(ak + 1, rfxarr[ak]);
            }
          } else {
            rfx.setValue(rfxv);
          }
          var isfx = fxs.property(5).property(1);
          isfx.expression = "";
          if (isfxarr.length > 0) {
            for (var ak = 0; ak < isfxarr.length; ak += 1) {
              isfx.setValueAtKey(ak + 1, isfxarr[ak]);
            }
          } else {
            isfx.setValue(isfxv);
          }
          var ipfx = fxs.property(4).property(1);
          ipfx.expression = "";
          if (ipfxarr.length > 0) {
            for (var ak = 0; ak < ipfxarr.length; ak += 1) {
              ipfx.setValueAtKey(ak + 1, ipfxarr[ak]);
            }
          } else {
            ipfx.setValue(ipfxv);
          }
          var irfx = fxs.property(6).property(1);
          irfx.expression = "";
          if (irfxarr.length > 0) {
            for (var ak = 0; ak < irfxarr.length; ak += 1) {
              irfx.setValueAtKey(ak + 1, irfxarr[ak]);
            }
          } else {
            irfx.setValue(irfxv);
          }
          var main = app.project.activeItem;
          var sl = main.selectedLayers[0];
          sl.solo = true;
          var mks = sl.mask;
          var mk = mks.property(1);
          mk.maskMode = MaskMode.NONE;
        }
        var ewin = new Window("palette");
        ewin.text = "Edit Crop";
        ewin.size = [180, 180];
        var exp_grp_x = ewin.add("group");
        exp_grp_x.alignment = "row";
        var info_txt_x = exp_grp_x.add("statictext", undefined, "Expand X:   ");
        info_txt_x.size = [50, 25];
        var exp_txt_x = exp_grp_x.add("edittext", undefined, "20");
        exp_txt_x.size = [40, 25];
        var exp_grp_y = ewin.add("group");
        exp_grp_y.alignment = "row";
        var info_txt_y = exp_grp_y.add("statictext", undefined, "Expand Y:   ");
        info_txt_y.size = [50, 25];
        var exp_txt_y = exp_grp_y.add("edittext", undefined, "20");
        exp_txt_y.size = [40, 25];
        exp_txt_x.active = true;
        var crop_bt = ewin.add("button", undefined, "ReCrop");
        crop_bt.alignment = ["fill", "top"];
        var done_bt = ewin.add("button", undefined, "Done");
        done_bt.alignment = ["fill", "top"];
        var main = app.project.activeItem;
        var sl = main.selectedLayers[0];
        if (sl.solo) {
          var solo = true;
        } else {
          var solo = false;
          sl.solo = true;
        }
        var mks = sl.mask;
        var mk = mks.property(1);
        mk.maskMode = MaskMode.NONE;
        crop_bt.onClick = function () {
          app.beginUndoGroup("ReCrop");
          Crop(false);
          app.endUndoGroup();
        };
        done_bt.onClick = function () {
          app.beginUndoGroup("Finish ReCrop");
          var main = app.project.activeItem;
          var sl = main.selectedLayers[0];
          if (solo === false) {
            sl.solo = false;
          }
          var mks = sl.mask;
          var mk = mks.property(1);
          mk.maskMode = MaskMode.ADD;
          ewin.close();
          app.endUndoGroup();
        };
        ewin.show();
      }
      function Corners_01_Choose_Target(data, sel_tks) {
        var target_window = new Window("palette");
        target_window.text = "Selectt";
        var points_txt = target_window.add(
          "staticText",
          undefined,
          "Please Select 1 target 2D video layer and click ok:",
        );
        var ok_button = target_window.add("button", undefined, "OK");
        ok_button.alignment = ["center", "bottom"];
        for (var al = 0; al < app.project.activeItem.layers.length; al += 1) {
          var lr = app.project.activeItem.layers[al + 1];
          lr.selected = false;
        }
        ok_button.onClick = function () {
          if (
            app.project.activeItem.selectedLayers.length == 1 &&
            app.project.activeItem.selectedLayers[0] instanceof AVLayer &&
            app.project.activeItem.selectedLayers[0].threeDLayer === false
          ) {
            sl = app.project.activeItem.selectedLayers[0];
            slind = sl.index;
            app.beginUndoGroup("Generate Crop Clone");
            app.endUndoGroup();
            target_window.close();
          }
        };
        target_window.show();
      }
      function Check_AV(sl) {
        if (sl instanceof AVLayer || sl.source instanceof CompItem) {
          var rectime = app.project.activeItem.time;
          var main_comp = app.project.activeItem;
          var cfr = main_comp.frameRate;
          var lfr = sl.source.frameRate;
          var frr = cfr / lfr;
          var converted = false;
          if (cfr !== lfr) {
            app.beginUndoGroup("Conform Framerate Precompose");
            var mts = [];
            var mte = [];
            var msel = [];
            var masks = sl.property("ADBE Mask Parade");
            if (masks.numProperties > 0) {
              for (var am = 1; am <= masks.numProperties; am += 1) {
                var m = masks.property(am);
                if (m.selected) {
                  msel.push(true);
                } else {
                  msel.push(false);
                }
                var s = m.property("ADBE Mask Shape");
                mts.push(s.keyTime(1));
                mte.push(s.keyTime(s.numKeys));
              }
            }
            var tsel = [];
            var tts = [];
            var tte = [];
            var trackers = sl.property("ADBE MTrackers");
            if (trackers.numProperties > 0) {
              for (var am = 1; am <= trackers.numProperties; am += 1) {
                var tr = trackers.property(am);
                for (var at = 1; at <= tr.numProperties; at += 1) {
                  var pt = tr.property(at);
                  if (pt.selected) {
                    tsel.push(true);
                  } else {
                    tsel.push(false);
                  }
                  var fecen = pt.property("ADBE MTracker Pt Feature Center");
                  if (fecen.numKeys > 0) {
                    tts.push(fecen.keyTime(1));
                    tte.push(fecen.keyTime(fecen.numKeys));
                  }
                  var fecen = pt.property("ADBE MTracker Pt Feature Size");
                  if (fecen.numKeys > 0) {
                    tts.push(fecen.keyTime(1));
                    tte.push(fecen.keyTime(fecen.numKeys));
                  }
                  var fecen = pt.property("ADBE MTracker Pt Search Size");
                  if (fecen.numKeys > 0) {
                    tts.push(fecen.keyTime(1));
                    tte.push(fecen.keyTime(fecen.numKeys));
                  }
                  var fecen = pt.property("ADBE MTracker Pt Attach Pt");
                  if (fecen.numKeys > 0) {
                    tts.push(fecen.keyTime(1));
                    tte.push(fecen.keyTime(fecen.numKeys));
                  }
                }
              }
            }
            if (mts.length == 0) {
              mts = [ct];
            }
            if (mte.length == 0) {
              mte = [ct];
            }
            if (tts.length == 0) {
              tts = [ct];
            }
            if (tte.length == 0) {
              tte = [ct];
            }
            var fms = mts.sort(function (a, b) {
              return a > b;
            })[0];
            var ftk = tts.sort(function (a, b) {
              return a > b;
            })[0];
            var ft = [
              mts.sort(function (a, b) {
                return a > b;
              })[0],
              tts.sort(function (a, b) {
                return a > b;
              })[0],
            ].sort(function (a, b) {
              return a > b;
            })[0];
            var lt = [
              mte.sort(function (a, b) {
                return b > a;
              })[0],
              tte.sort(function (a, b) {
                return b > a;
              })[0],
            ].sort(function (a, b) {
              return b > a;
            })[0];
            var st = ft;
            var et = lt;
            var sl = main_comp.selectedLayers[0];
            sl = sl.duplicate();
            var slind = sl.index;
            var slst = sl.startTime;
            var slop = sl.endTime;
            var slip = sl.inPoint;
            var slop = sl.outPoint;
            main_comp.layers.precompose([sl.index], sl.name, true);
            var sl = app.project.activeItem.selectedLayers[0];
            var mid_comp = sl.source;
            var pc = mid_comp.layer(1);
            mid_comp.openInViewer();
            pc.selected = true;
            var masks = pc.property("ADBE Mask Parade");
            if (masks.numProperties > 0) {
              masks.selected = true;
              app.executeCommand(19);
              pc.selected = false;
              main_comp.openInViewer();
              sl.selected = true;
              main_comp.time = fms;
              app.executeCommand(20);
              var mks_arr = [];
              for (var am = 1; am <= masks.numProperties; am += 1) {
                mks_arr[am - 1] = [];
                var m = masks.property(am);
                var s = m.property("ADBE Mask Shape");
                mks_arr[am - 1] = [[], []];
                if (s.numKeys > 0) {
                  var aklen = Math.ceil(
                    (s.keyTime(s.numKeys) -
                      s.keyTime(1) +
                      mid_comp.frameDuration) *
                      fps,
                  );
                  for (var ak = 0; ak < aklen; ak += 1) {
                    var t = s.keyTime(1) + ak * main_comp.frameDuration;
                    mks_arr[am - 1][0].push(t);
                    var v = s.valueAtTime(t, true);
                    mks_arr[am - 1][1].push(v);
                  }
                }
              }
              var masks = sl.property("ADBE Mask Parade");
              for (var am = 1; am <= masks.numProperties; am += 1) {
                var m = masks.property(am);
                var s = m.property("ADBE Mask Shape");
                if (s.numKeys > 0) {
                  for (var ak = s.numKeys; ak > 0; ak--) {
                    s.removeKey(ak);
                  }
                  var t = mks_arr[am - 1][0];
                  var v = mks_arr[am - 1][1];
                  s.setValuesAtTimes(t, v);
                }
              }
              mid_comp.openInViewer();
              masks.selected = false;
            }
            var trackers = pc.property("ADBE MTrackers");
            if (trackers.numProperties > 0) {
              trackers.selected = true;
              app.executeCommand(19);
              pc.selected = false;
              main_comp.openInViewer();
              main_comp.time = ftk;
              sl.selected = true;
              main_comp.time = ftk;
              app.executeCommand(20);
              var tks_arr = [];
              var trackers = pc.property("ADBE MTrackers");
              for (var am = 1; am <= trackers.numProperties; am += 1) {
                tks_arr[am - 1] = [];
                var tr = trackers.property(am);
                for (var at = 1; at <= tr.numProperties; at += 1) {
                  tks_arr[am - 1][at - 1] = [];
                  var pt = tr.property(at);
                  var fecen = pt.property("ADBE MTracker Pt Feature Center");
                  tks_arr[am - 1][at - 1][0] = [[], []];
                  if (fecen.numKeys > 0) {
                    var aklen = Math.ceil(
                      (fecen.keyTime(fecen.numKeys) -
                        fecen.keyTime(1) +
                        mid_comp.frameDuration) *
                        fps,
                    );
                    for (var ak = 0; ak < aklen; ak += 1) {
                      var t = fecen.keyTime(1) + ak * main_comp.frameDuration;
                      tks_arr[am - 1][at - 1][0][0].push(t);
                      var v = fecen.valueAtTime(t, true);
                      tks_arr[am - 1][at - 1][0][1].push(v);
                    }
                  }
                  var fecen = pt.property("ADBE MTracker Pt Feature Size");
                  tks_arr[am - 1][at - 1][1] = [[], []];
                  if (fecen.numKeys > 0) {
                    var aklen = Math.ceil(
                      (fecen.keyTime(fecen.numKeys) -
                        fecen.keyTime(1) +
                        mid_comp.frameDuration) *
                        fps,
                    );
                    for (var ak = 0; ak < aklen; ak += 1) {
                      var t = fecen.keyTime(1) + ak * main_comp.frameDuration;
                      tks_arr[am - 1][at - 1][1][0].push(t);
                      var v = fecen.valueAtTime(t, true);
                      tks_arr[am - 1][at - 1][1][1].push(v);
                    }
                  }
                  var fecen = pt.property("ADBE MTracker Pt Search Size");
                  tks_arr[am - 1][at - 1][2] = [[], []];
                  if (fecen.numKeys > 0) {
                    var aklen = Math.ceil(
                      (fecen.keyTime(fecen.numKeys) -
                        fecen.keyTime(1) +
                        mid_comp.frameDuration) *
                        fps,
                    );
                    for (var ak = 0; ak < aklen; ak += 1) {
                      var t = fecen.keyTime(1) + ak * main_comp.frameDuration;
                      tks_arr[am - 1][at - 1][2][0].push(t);
                      var v = fecen.valueAtTime(t, true);
                      tks_arr[am - 1][at - 1][2][1].push(v);
                    }
                  }
                  var fecen = pt.property("ADBE MTracker Pt Attach Pt");
                  tks_arr[am - 1][at - 1][3] = [[], []];
                  if (fecen.numKeys > 0) {
                    var aklen = Math.ceil(
                      (fecen.keyTime(fecen.numKeys) -
                        fecen.keyTime(1) +
                        mid_comp.frameDuration) *
                        fps,
                    );
                    for (var ak = 0; ak < aklen; ak += 1) {
                      var t = fecen.keyTime(1) + ak * main_comp.frameDuration;
                      tks_arr[am - 1][at - 1][3][0].push(t);
                      var v = fecen.valueAtTime(t, true);
                      tks_arr[am - 1][at - 1][3][1].push(v);
                    }
                  }
                }
              }
              var trackers = sl.property("ADBE MTrackers");
              for (var am = 1; am <= trackers.numProperties; am += 1) {
                var tr = trackers.property(am);
                for (var at = 1; at <= tr.numProperties; at += 1) {
                  var pt = tr.property(at);
                  var fecen = pt.property("ADBE MTracker Pt Feature Center");
                  if (fecen.numKeys > 0) {
                    for (var ak = fecen.numKeys; ak > 0; ak--) {
                      fecen.removeKey(ak);
                    }
                    var t = tks_arr[am - 1][at - 1][0][0];
                    var v = tks_arr[am - 1][at - 1][0][1];
                    fecen.setValuesAtTimes(t, v);
                  }
                  var fecen = pt.property("ADBE MTracker Pt Feature Size");
                  if (fecen.numKeys > 0) {
                    for (var ak = fecen.numKeys; ak > 0; ak--) {
                      fecen.removeKey(ak);
                    }
                    var t = tks_arr[am - 1][at - 1][1][0];
                    var v = tks_arr[am - 1][at - 1][1][1];
                    fecen.setValuesAtTimes(t, v);
                  }
                  var fecen = pt.property("ADBE MTracker Pt Search Size");
                  if (fecen.numKeys > 0) {
                    for (var ak = fecen.numKeys; ak > 0; ak--) {
                      fecen.removeKey(ak);
                    }
                    var t = tks_arr[am - 1][at - 1][2][0];
                    var v = tks_arr[am - 1][at - 1][2][1];
                    fecen.setValuesAtTimes(t, v);
                  }
                  var fecen = pt.property("ADBE MTracker Pt Attach Pt");
                  if (fecen.numKeys > 0) {
                    for (var ak = fecen.numKeys; ak > 0; ak--) {
                      fecen.removeKey(ak);
                    }
                    var t = tks_arr[am - 1][at - 1][3][0];
                    var v = tks_arr[am - 1][at - 1][3][1];
                    fecen.setValuesAtTimes(t, v);
                  }
                }
              }
            }
            main_comp.openInViewer();
            sl.selected = true;
            var masks = sl.property("ADBE Mask Parade");
            for (var am = 1; am <= masks.numProperties; am += 1) {
              var m = masks.property(am);
              if (msel[am - 1] === true) {
                m.selected = true;
              } else {
                m.selected = false;
              }
            }
            var trackers = sl.property("ADBE MTrackers");
            for (var am = 1; am <= trackers.numProperties; am += 1) {
              var tr = trackers.property(am);
              for (var at = 1; at <= tr.numProperties; at += 1) {
                var pt = tr.property(at);
                if (tsel[at - 1] === true) {
                  pt.selected = true;
                } else {
                  pt.selected = false;
                }
              }
            }
            mid_comp.frameRate = cfr;
            main_comp.time = rectime;
            app.endUndoGroup();
            var converted = true;
          }
        } else {
          var converted = null;
          alert("Please select a video layer to proceed.");
        }
        return converted;
      }
      function _Multi_Pins_00_Set_Multi() {
        if (app.project.activeItem.selectedLayers.length == 1) {
          ct = app.project.activeItem.time;
          fps = 1 / app.project.activeItem.frameDuration;
          var cw = app.project.activeItem.width;
          var ch = app.project.activeItem.height;
          var ratio = parseInt(cw / 100);
          var dur = app.project.activeItem.duration;
          var sl = app.project.activeItem.selectedLayers[0];
          var sli = sl.index;
          var main_comp = app.project.activeItem;
          var exp = 1;
          var masks = sl.property("ADBE Mask Parade");
          var msel = [];
          var chk_len = true;
          for (var am = 0; am < masks.numProperties; am += 1) {
            var m = masks.property(am + 1);
            if (m.selected) {
              msel.push(am);
              var s = m.property(1);
              var v = s.value.vertices;
              if (v.length != 4) {
                chk_len = false;
                break;
              }
            }
          }
          if (msel.length > 1 && chk_len) {
            function Connect_Masks() {
              var marr = [];
              for (var am = 0; am < mks.length; am += 1) {
                marr[am] = [];
                var rverts = mks[am][akr].slice(mks[am][akr]);
                marr[am] = rverts;
              }
              var used = [];
              for (var am = 0; am < marr.length; am += 1) {
                used[am] = [];
                for (var av = 0; av < 4; av += 1) {
                  used[am].push([]);
                }
              }
              for (var am = 0; am < marr.length; am += 1) {
                var ver = marr[am];
                for (var av = 0; av < 4; av += 1) {
                  if (used[am][av].length == 0) {
                    var v1 = ver[av];
                    for (var am2 = 0; am2 < marr.length; am2 += 1) {
                      if (am2 != am) {
                        var rver = marr[am2];
                        for (var av2 = 0; av2 < 4; av2 += 1) {
                          var v2 = rver[av2];
                          var d2 = Math.sqrt(
                            Math.pow(v2[0] - v1[0], 2) +
                              Math.pow(v2[1] - v1[1], 2),
                          );
                          if (d2 <= multi_pins_max_dist) {
                            used[am][av] = [am, av];
                            if (used[am2][av2].length == 0) {
                              used[am2][av2] = [am, av];
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              for (var am = 0; am < marr.length; am += 1) {
                for (var av = 0; av < 4; av += 1) {
                  if (used[am][av].length == 0) {
                    used[am][av] = [am, av];
                  }
                }
              }
              for (var am = 0; am < mks.length; am += 1) {
                for (var ak = 0; ak < mks[am].length; ak += 1) {
                  var vers = mks[am][ak];
                  for (var av = 0; av < 4; av += 1) {
                    var ver = vers[av];
                    var mref = used[am][av][0];
                    var vref = used[am][av][1];
                    var m2 = mks[mref].slice(mks[mref]);
                    var vers2 = m2[ak];
                    var ver2 = vers2[vref];
                    vers[av] = ver2;
                  }
                }
              }
              var mks2 = [];
              for (var am = 0; am < mks.length; am += 1) {
                mks2[am] = [];
                var rverts = mks[am][akr].slice(mks[am][akr]);
                var def_ver = mks[am][akr].slice(mks[am][akr]);
                var c = Get_Polygon_Centroid(rverts);
                var angs = [];
                for (var av = 0; av < 4; av += 1) {
                  var vx = def_ver[av][0];
                  var vy = def_ver[av][1];
                  var d = Math.sqrt(
                    Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2),
                  );
                  var dx = vx - c[0];
                  var dy = vy - c[1];
                  var ang = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
                  angs[av] = [av, ang, d];
                }
                angs.sort(function (a, b) {
                  return b[1] < a[1];
                });
                var refs = [];
                for (var av = 0; av < 4; av += 1) {
                  refs.push(angs[av][0]);
                }
                for (var ak = 0; ak < mks[am].length; ak += 1) {
                  mks2[am][ak] = [];
                  for (var av = 0; av < 4; av += 1) {
                    mks2[am][ak][av] = mks[am][ak][refs[av]];
                  }
                }
              }
              mks = mks2.slice(mks2);
            }
            function Masks_Integer() {
              for (var am = 0; am < mks.length; am += 1) {
                var m = masks.property(am + 1);
                var s = m.property(1);
                var refv = mks[am][akr];
                var difs = [];
                for (var av = 0; av < refv.length; av += 1) {
                  var ver = refv[av];
                  var nver = [Math.round(ver[0]), Math.round(ver[1])];
                  var dif = ver - nver;
                  difs.push(dif);
                }
                var vals = [];
                for (var ak = 0; ak < mks[am].length; ak += 1) {
                  var v = s.keyValue(ak + 1);
                  var vers = mks[am][ak];
                  for (var av = 0; av < vers.length; av += 1) {
                    if (av == 0) {
                      vers[av] = vers[av] - difs[av] + [exp, -exp];
                    }
                    if (av == 1) {
                      vers[av] = vers[av] - difs[av] + [exp, exp];
                    }
                    if (av == 2) {
                      vers[av] = vers[av] - difs[av] + [-exp, exp];
                    }
                    if (av == 3) {
                      vers[av] = vers[av] - difs[av] + [-exp, -exp];
                    }
                  }
                }
              }
            }
            var temp = sl.duplicate();
            temp.name = "Temp";
            var fxs = temp.property("ADBE Effect Parade");
            masks = temp.property("ADBE Mask Parade");
            for (var af = fxs.numProperties; af > 0; af--) {
              fxs.property(af).remove();
            }
            for (var am = masks.numProperties - 1; am >= 0; am--) {
              var m = masks.property(am + 1);
              if (msel.indexOf(am) == -1) {
                m.remove();
              }
            }
            var times = [];
            var m = masks.property(1);
            var s = m.property(1);
            for (var ak = 0; ak < s.numKeys; ak += 1) {
              var t = s.keyTime(ak + 1);
              times.push(t);
            }
            var tchk = false;
            for (var at = 0; at < times.length; at += 1) {
              if (times[at].toString() == ct.toString()) {
                var akr = at;
                tchk = true;
                break;
              }
            }
            if (tchk !== true) {
              akr = 0;
            }
            sl.selected = false;
            var mks = [];
            for (var am = 0; am < masks.numProperties; am += 1) {
              mks[am] = [];
              var m = masks.property(am + 1);
              var s = m.property(1);
              var len = s.keyValue(1).vertices.length;
              for (var ak = 0; ak < s.numKeys; ak += 1) {
                var v = s.keyValue(ak + 1).vertices;
                mks[am].push(v);
              }
            }
            var masks = temp.property("ADBE Mask Parade");
            Connect_Masks();
            Masks_Integer();
            var marr = [];
            var pinsarr = [];
            var tinarr = [];
            var toutarr = [];
            for (var am = 0; am < mks.length; am += 1) {
              var m = masks.property(am + 1);
              var espan = m.property(4);
              espan.setValue(exp / 2);
              var dp = temp.duplicate();
              dp.name = "TT " + m.name;
              var s = m.property("ADBE Mask Shape");
              var v = s.value;
              var ref_ver = mks[am][akr].slice(mks[am][akr]);
              var rver = ref_ver.slice(ref_ver);
              var xmin = rver.sort(function (a, b) {
                return b[0] < a[0];
              })[0][0];
              var xmax = rver.sort(function (a, b) {
                return b[0] > a[0];
              })[0][0];
              var ymin = rver.sort(function (a, b) {
                return b[1] < a[1];
              })[0][1];
              var ymax = rver.sort(function (a, b) {
                return b[1] > a[1];
              })[0][1];
              var bb = [xmin, xmax, ymin, ymax];
              var pw = Math.round(xmax - xmin);
              var ph = Math.round(ymax - ymin);
              var cwd = pw;
              var chd = ph;
              var slst = dp.startTime;
              var slip = dp.inPoint;
              var slop = dp.outPoint;
              if (times[0] > slip) {
                dp.inPoint = slip = times[0];
              }
              if (times[times.length - 1] < slop) {
                dp.outPoint = slop =
                  times[times.length - 1] +
                  app.project.activeItem.frameDuration;
              }
              main_comp.layers.precompose([dp.index], "TT_MULTI_CROP_", true);
              var sl = app.project.activeItem.selectedLayers[0];
              var mid_comp = sl.source;
              if (am == 0) {
                var id = mid_comp.id;
              }
              mid_comp.name = mid_comp.name + id;
              if (pw == 0) {
                pw = 1;
                sl.opacity.setValue(0);
              }
              if (ph == 0) {
                ph = 1;
                sl.opacity.setValue(0);
              }
              mid_comp.width = pw;
              mid_comp.height = ph;
              var pc = mid_comp.layer(1);
              pc.inPoint = 0;
              pc.startTime = slst - slip;
              pc.outPoint = slop + slip;
              sl.startTime = slip;
              sl.source.duration = slop - slip;
              var cc = [cw / 2, ch / 2];
              var ncc = [(xmin + xmax) / 2, (ymin + ymax) / 2];
              var cdif = cc - ncc;
              var slp = sl.transform.position;
              var slpv = slp.value;
              slpv = slpv - cdif;
              slp.setValue(slpv);
              var sla = sl.transform.anchorPoint;
              var slav = sla.value;
              var pcp = pc.transform.position;
              var pcpv = pcp.value;
              pcpv = cc - slpv + slav;
              pcp.setValue(pcpv);
              marr.push([bb, slpv, slav, pcpv, m.name]);
              var vdata = [];
              vdata[0] = times;
              vdata[1] = [];
              for (var ak = 0; ak < mks[am].length; ak += 1) {
                var vals = [];
                for (var av = 0; av < ref_ver.length; av += 1) {
                  var v = mks[am][ak][av];
                  vals.push(v);
                }
                vdata[1].push(vals);
              }
              var vrefs = Get_Refs_With_Closest(vdata);
              var vpins = [];
              for (var ac = 0; ac < 4; ac += 1) {
                var vref = vrefs[ac];
                vpins[ac] = [];
                for (var ak = 0; ak < mks[am].length; ak += 1) {
                  var v = mks[am][ak][vref];
                  v = v - cc + cdif + [mid_comp.width / 2, mid_comp.height / 2];
                  vpins[ac].push(v);
                }
              }
              pinsarr.push(vpins);
              var tin = [];
              var tout = [];
              for (var ac = 0; ac < 4; ac += 1) {
                tin[ac] = [];
                tout[ac] = [];
                for (var ak = 0; ak < vpins[ac].length; ak += 1) {
                  if (ac == 0) {
                    var v = vpins[0][ak];
                    var vi = vpins[2][ak];
                    var vid = vi - v;
                    var vir = [vid[0] / 3, vid[1] / 3];
                    tin[ac].push(v + vir);
                    var vo = vpins[1][ak];
                    var vod = vo - v;
                    var vor = [vod[0] / 3, vod[1] / 3];
                    tout[ac].push(v + vor);
                  }
                  if (ac == 1) {
                    var v = vpins[1][ak];
                    var vi = vpins[0][ak];
                    var vid = vi - v;
                    var vir = [vid[0] / 3, vid[1] / 3];
                    tin[ac].push(v + vir);
                    var vo = vpins[3][ak];
                    var vod = vo - v;
                    var vor = [vod[0] / 3, vod[1] / 3];
                    tout[ac].push(v + vor);
                  }
                  if (ac == 2) {
                    var v = vpins[2][ak];
                    var vi = vpins[3][ak];
                    var vid = vi - v;
                    var vir = [vid[0] / 3, vid[1] / 3];
                    tin[ac].push(v + vir);
                    var vo = vpins[0][ak];
                    var vod = vo - v;
                    var vor = [vod[0] / 3, vod[1] / 3];
                    tout[ac].push(v + vor);
                  }
                  if (ac == 3) {
                    var v = vpins[3][ak];
                    var vi = vpins[1][ak];
                    var vid = vi - v;
                    var vir = [vid[0] / 3, vid[1] / 3];
                    tin[ac].push(v + vir);
                    var vo = vpins[2][ak];
                    var vod = vo - v;
                    var vor = [vod[0] / 3, vod[1] / 3];
                    tout[ac].push(v + vor);
                  }
                }
              }
              tinarr.push(tin);
              toutarr.push(tout);
              var adlr = mid_comp.layers.addSolid(
                [1, 1, 1],
                "AL",
                pw,
                ph,
                1,
                mid_comp.duration,
              );
              adlr.adjustmentLayer = true;
              var cfx = adlr
                .property("ADBE Effect Parade")
                .addProperty("CC Power Pin");
              cfx.name = "TT Pins";
              cfx
                .property("CC Power Pin-0002")
                .setValuesAtTimes(times, vpins[0]);
              cfx
                .property("CC Power Pin-0003")
                .setValuesAtTimes(times, vpins[1]);
              cfx
                .property("CC Power Pin-0004")
                .setValuesAtTimes(times, vpins[2]);
              cfx
                .property("CC Power Pin-0005")
                .setValuesAtTimes(times, vpins[3]);
              cfx.property("CC Power Pin-0006").setValue(0);
              cfx.property("CC Power Pin-0007").setValue(1);
              var cfx = adlr
                .property("ADBE Effect Parade")
                .addProperty("ADBE BEZMESH");
              cfx.name = "TT Bezier";
              cfx.property("ADBE BEZMESH-0001").setValue(vpins[0][akr]);
              cfx.property("ADBE BEZMESH-0002").setValue(tout[0][akr]);
              cfx.property("ADBE BEZMESH-0003").setValue(tin[1][akr]);
              cfx.property("ADBE BEZMESH-0004").setValue(vpins[1][akr]);
              cfx.property("ADBE BEZMESH-0005").setValue(tout[1][akr]);
              cfx.property("ADBE BEZMESH-0006").setValue(tin[3][akr]);
              cfx.property("ADBE BEZMESH-0010").setValue(vpins[2][akr]);
              cfx.property("ADBE BEZMESH-0011").setValue(tout[2][akr]);
              cfx.property("ADBE BEZMESH-0012").setValue(tin[0][akr]);
              cfx.property("ADBE BEZMESH-0007").setValue(vpins[3][akr]);
              cfx.property("ADBE BEZMESH-0008").setValue(tout[3][akr]);
              cfx.property("ADBE BEZMESH-0009").setValue(tin[2][akr]);
              cfx.property("ADBE BEZMESH-0014").setValue(10);
            }
            var temp = app.project.activeItem.layer(mks.length + sli);
            temp.remove();
            var indarr = [];
            var cnt = -1;
            for (var aa = 0; aa < msel.length; aa += 1) {
              cnt++;
              indarr.push(sl.index - cnt);
            }
            main_comp.layers.precompose(
              indarr,
              "TT_MULTI_CROPPED_CONT_" + id,
              true,
            );
            sl = main_comp.selectedLayers[0];
            main_comp.layers.precompose(
              [sl.index],
              "TT_MULTI_STAB_CONT_" + id,
              true,
            );
            sl = main_comp.selectedLayers[0];
            var container = sl.source;
            var temp = main_comp.layer(sl.index + 1);
            temp.remove();
            var cnt = 0;
            var sl = main_comp.selectedLayers[0];
            var sli = sl.index;
            for (var ap = 0; ap < pinsarr.length; ap += 1) {
              var vpins = pinsarr[ap];
              var tin = tinarr[ap];
              var tout = toutarr[ap];
              var sl = main_comp.layer(sli + cnt);
              cnt++;
              var dp = sl.duplicate();
              var xmin = marr[ap][0][0];
              var xmax = marr[ap][0][1];
              var ymin = marr[ap][0][2];
              var ymax = marr[ap][0][3];
              var slpv = marr[ap][1];
              var slav = marr[ap][2];
              var pcpv = marr[ap][3];
              var name = marr[ap][4];
              var ind = dp.index;
              main_comp.layers.precompose([ind], "TT_MULTI_STAB_" + id, true);
              var sl = main_comp.selectedLayers[0];
              var mid_comp = sl.source;
              var cpw = Math.round(xmax - xmin);
              var cph = Math.round(ymax - ymin);
              if (cpw == 0) {
                cpw = 1;
                sl.opacity.setValue(0);
              }
              if (cph == 0) {
                cph = 1;
                sl.opacity.setValue(0);
              }
              mid_comp.width = cpw;
              mid_comp.height = cph;
              var slp = sl.transform.position;
              slp.setValue(slpv);
              var pc = mid_comp.layer(1);
              var pca = pc.transform.anchorPoint;
              pca.setValue([cw / 2, ch / 2]);
              var pcp = pc.transform.position;
              pcp.setValue(pcpv);
              var cfx = sl
                .property("ADBE Effect Parade")
                .addProperty("CC Power Pin");
              cfx.name = "TT Pins";
              cfx.property("CC Power Pin-0002").setValue(vpins[0][akr]);
              cfx.property("CC Power Pin-0003").setValue(vpins[1][akr]);
              cfx.property("CC Power Pin-0004").setValue(vpins[2][akr]);
              cfx.property("CC Power Pin-0005").setValue(vpins[3][akr]);
              cfx.property("CC Power Pin-0006").setValue(0);
              cfx.property("CC Power Pin-0007").setValue(1);
              var cfx = sl
                .property("ADBE Effect Parade")
                .addProperty("ADBE BEZMESH");
              cfx.name = "TT Bezier";
              cfx
                .property("ADBE BEZMESH-0001")
                .setValuesAtTimes(times, vpins[0]);
              cfx
                .property("ADBE BEZMESH-0002")
                .setValuesAtTimes(times, tout[0]);
              cfx.property("ADBE BEZMESH-0003").setValuesAtTimes(times, tin[1]);
              cfx
                .property("ADBE BEZMESH-0004")
                .setValuesAtTimes(times, vpins[1]);
              cfx
                .property("ADBE BEZMESH-0005")
                .setValuesAtTimes(times, tout[1]);
              cfx.property("ADBE BEZMESH-0006").setValuesAtTimes(times, tin[3]);
              cfx
                .property("ADBE BEZMESH-0010")
                .setValuesAtTimes(times, vpins[2]);
              cfx
                .property("ADBE BEZMESH-0011")
                .setValuesAtTimes(times, tout[2]);
              cfx.property("ADBE BEZMESH-0012").setValuesAtTimes(times, tin[0]);
              cfx
                .property("ADBE BEZMESH-0007")
                .setValuesAtTimes(times, vpins[3]);
              cfx
                .property("ADBE BEZMESH-0008")
                .setValuesAtTimes(times, tout[3]);
              cfx.property("ADBE BEZMESH-0009").setValuesAtTimes(times, tin[2]);
              cfx.property("ADBE BEZMESH-0014").setValue(10);
            }
            var temp = main_comp.layer(sl.index + 1);
            temp.remove();
            main_comp.layers.precompose(indarr, "TT_MULTI_" + id, true);
            container.openInViewer();
          } else {
            alert(
              "Please select more than 1 tracked mask to proceed. All the selected masks must be a 4 corners masks.",
            );
          }
        }
      }
      function _Pins_01_Reset_Pins() {
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        var dur = app.project.activeItem.duration;
        var factor = cw / 60;
        var sl = app.project.activeItem.selectedLayers[0];
        var size = [sl.width, sl.height];
        sl.enabled = false;
        var ori_lr = (ori_pin = null);
        var main_pin = sl
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin");
        var mid_comp = sl.source;
        for (var al = 1; al <= mid_comp.layers.length; al += 1) {
          var mid_lr = mid_comp.layer(al);
          if (mid_lr.source instanceof CompItem) {
            var ori_comp = mid_lr.source;
            var gen_lr = ori_comp.layer(1);
            if (gen_lr.property("ADBE Effect Parade").numProperties > 0) {
              var gen_fx = gen_lr.property("ADBE Effect Parade").property(1);
              if (gen_fx.name == "Corners Clone Pin") {
                var ori_lr = gen_lr;
                var ori_pin = gen_fx;
                app.beginUndoGroup("Reset Pins Clone");
                var times = [];
                for (
                  var ak = 0;
                  ak < ori_pin.property("CC Power Pin-0002").numKeys;
                  ak += 1
                ) {
                  if (ak == 0) {
                    var ft = ori_pin
                      .property("CC Power Pin-0002")
                      .keyTime(ak + 1);
                  }
                  var t = ft + ak * ori_comp.frameDuration;
                  times.push(t);
                }
                for (var ac = 0; ac < 4; ac += 1) {
                  var cp = ori_lr.effect.property(ac + 2).property(1);
                  ncorners = [];
                  for (var cc = 0; cc < cp.numKeys; cc += 1) {
                    ncorners.push(cp.keyValue(cc + 1));
                  }
                  ori_pin
                    .property("CC Power Pin-000" + ac + 2)
                    .setValuesAtTimes(times, ncorners);
                  main_pin
                    .property("CC Power Pin-000" + ac + 2)
                    .setValuesAtTimes(times, ncorners);
                }
                sl.enabled = true;
                main_pin.selected = true;
                app.endUndoGroup();
                break;
              }
            }
          }
        }
      }
      function _Pins_01_Edit_Pins() {
        fps = 1 / app.project.activeItem.frameDuration;
        ct = app.project.activeItem.time;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        var dur = app.project.activeItem.duration;
        var factor = cw / 60;
        var sl = app.project.activeItem.selectedLayers[0];
        var size = [sl.width, sl.height];
        sl.enabled = false;
        var ori_lr = (ori_pin = null);
        var main_pin = sl
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin");
        var mid_comp = sl.source;
        for (var al = 1; al <= mid_comp.layers.length; al += 1) {
          var mid_lr = mid_comp.layer(al);
          if (mid_lr.source instanceof CompItem) {
            var ori_comp = mid_lr.source;
            var gen_lr = ori_comp.layer(1);
            if (gen_lr.property("ADBE Effect Parade").numProperties > 0) {
              var gen_fx = gen_lr.property("ADBE Effect Parade").property(1);
              if (gen_fx.name == "Corners Clone Pin") {
                var ori_lr = gen_lr;
                var ori_pin = gen_fx;
              }
            }
          }
        }
        main_pin.selected = true;
        var sp = sl.inPoint;
        var ep = sl.outPoint;
        var act = (ct = app.project.activeItem.time);
        if (act < sp) {
          app.project.activeItem.time = sp;
          ct = act = sp;
        } else {
          if (act > ep) {
            app.project.activeItem.time =
              ep - app.project.activeItem.frameDuration;
            ct = act = ep - app.project.activeItem.frameDuration;
          }
        }
        var target_window = new Window("palette");
        target_window.text = "Corners Edit";
        var points_txt = target_window.add(
          "staticText",
          undefined,
          "Edit corners and click Ok.",
        );
        var confirm_grp = target_window.add("group");
        confirm_grp.alignment = "row";
        var ok_bt = confirm_grp.add("button", undefined, "Ok");
        ok_bt.alignment = ["center", "bottom"];
        var cancel_bt = confirm_grp.add("button", undefined, "Cncel");
        cancel_bt.alignment = ["center", "bottom"];
        ok_bt.onClick = function () {
          if (app.project.activeItem.selectedLayers.length > 0) {
            target_window.close();
            if (ori_lr !== null && ori_pin !== null) {
              var main_pin = sl
                .property("ADBE Effect Parade")
                .property("Corners Clone Pin");
              if (main_pin.property("CC Power Pin-0006").value == 0) {
                var persp = false;
              }
              var len = ori_pin.property("CC Power Pin-0002").numKeys;
              var times = [];
              for (var at = 0; at < len; at += 1) {
                times[at] = sp + at * app.project.activeItem.frameDuration;
              }
              var cf = (act - sp) * fps;
              var corners = [];
              var ncorners = [];
              for (var ac = 0; ac < 4; ac += 1) {
                var cp = ori_lr.effect.property(ac + 2).property(1);
                corners[ac] = [];
                for (var cc = 0; cc < cp.numKeys; cc += 1) {
                  corners[ac].push(cp.keyValue(cc + 1));
                }
              }
              for (var ac = 0; ac < 4; ac += 1) {
                var newp = main_pin
                  .property("CC Power Pin-000" + ac + 2)
                  .valueAtTime(ct, true);
                ncorners[ac] = Point_Perspective_Interpolation(
                  newp,
                  corners,
                  cf,
                );
              }
              var ori_times = times.slice(times);
              for (var at = 0; at < ori_times.length; at += 1) {
                ori_times[at] = ori_times[at] - sp;
              }
              app.beginUndoGroup("Edit Pins Clone");
              for (var ac = 0; ac < 4; ac += 1) {
                for (
                  var ak = ori_pin.property(
                    "CC Power Pin-000" + ac + 2,
                  ).numKeys;
                  ak > 0;
                  ak--
                ) {
                  ori_pin.property("CC Power Pin-000" + ac + 2).removeKey(ak);
                }
                ori_pin
                  .property("CC Power Pin-000" + ac + 2)
                  .setValuesAtTimes(ori_times, ncorners[ac]);
                main_pin
                  .property("CC Power Pin-000" + ac + 2)
                  .setValuesAtTimes(times, ncorners[ac]);
              }
              sl.enabled = true;
              main_pin.selected = true;
              app.endUndoGroup();
            }
            sl.selected = true;
          }
        };
        cancel_bt.onClick = function () {
          app.executeCommand(16);
          target_window.close();
          sl.selected = true;
        };
        target_window.show();
      }
      function _Pins_01_Remove_Pins() {
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        var dur = app.project.activeItem.duration;
        var factor = cw / 60;
        var sl = app.project.activeItem.selectedLayers[0];
        var size = [sl.width, sl.height];
        var found = false;
        var ori_lr = (ori_pin = null);
        var main_pin = sl
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin");
        var mid_comp = sl.source;
        for (var al = 1; al <= mid_comp.layers.length; al += 1) {
          var mid_lr = mid_comp.layer(al);
          if (mid_lr.source instanceof CompItem) {
            var ori_comp = mid_lr.source;
            var gen_lr = ori_comp.layer(1);
            if (gen_lr.property("ADBE Effect Parade").numProperties > 0) {
              var gen_fx = gen_lr.property("ADBE Effect Parade").property(1);
              if (gen_fx.name == "Corners Clone Pin") {
                found = true;
                break;
              }
            }
          }
        }
        if (found) {
          app.beginUndoGroup("Delete Pins Clone");
          ori_comp.remove();
          mid_comp.remove();
          app.endUndoGroup();
        }
      }
      function Remove_Clones(type) {
        var main_comp = app.project.activeItem;
        var cw = main_comp.width;
        var ch = main_comp.height;
        var sl = main_comp.selectedLayers[0];
        var ind = sl.index;
        if (type == "crop") {
          var id = sl.source.name.slice(6);
          app.beginUndoGroup("Remove Crop");
        } else {
          if (type == "pins") {
            var id = sl.source.name.slice(8);
            app.beginUndoGroup("Remove Pins");
          } else {
            if (type == "multi") {
              var id = sl.source.name.slice(9);
              app.beginUndoGroup("Remove Multi Warp");
            } else {
              if (type == "puppet") {
                var id = sl.source.name.slice(8);
                app.beginUndoGroup("Remove Puppet Warp");
              } else {
                if (type == "corners") {
                  var id = sl.source.name.slice(8);
                  app.beginUndoGroup("Remove Corners Pins");
                }
              }
            }
          }
        }
        for (var ac = app.project.items.length; ac > 0; ac--) {
          var item = app.project.items[ac];
          if (item.name.indexOf(id) > -1) {
            if (type == "corners") {
              for (var ag = item.layers.length; ag > 0; ag--) {
                var checker = item.layers[ag];
                if (checker.name == "Retrack Pin Solid") {
                  checker.source.remove();
                }
              }
            }
            if (type == "crop") {
              for (var ag = item.layers.length; ag > 0; ag--) {
                var checker = item.layers[ag];
                if (checker.nullLayer) {
                  checker.source.remove();
                }
              }
            }
            item.remove();
          }
        }
        app.endUndoGroup();
      }
      function Duplicate_Clones(type) {
        function Replace_Expressions(comp, oid, nid) {
          for (var ac = 1; ac <= comp.layers.length; ac += 1) {
            var item = comp.layer(ac);
            if (item.effect.numProperties > 0) {
              for (var ae = 1; ae <= item.effect.numProperties; ae += 1) {
                var fx = item.effect.property(ae);
                for (var af = 1; af <= fx.numProperties; af += 1) {
                  var prop = fx.property(af);
                  if (prop.canSetExpression) {
                    var expr = prop.expression;
                    if (expr.length > 0) {
                      var nexpr = expr.replace(oid, nid);
                      prop.expression = nexpr;
                    }
                  }
                }
              }
            }
            var tr = item.transform;
            for (var at = 1; at <= 12; at += 1) {
              var prop = tr.property(at);
              var expr = prop.expression;
              if (expr.length > 0) {
                var nexpr = expr.replace(oid, nid);
                prop.expression = nexpr;
              }
            }
            if (item.source instanceof CompItem) {
              Replace_Expressions(item.source, oid, nid);
            }
          }
        }
        var main_comp = app.project.activeItem;
        var cw = main_comp.width;
        var ch = main_comp.height;
        var sl = main_comp.selectedLayers[0];
        var ind = sl.index;
        if (type == "pins") {
          var id = sl.source.name.slice(8);
        } else {
          if (type == "crop") {
            var id = sl.source.name.slice(6);
          } else {
            if (type == "multi") {
              var id = sl.source.name.slice(9);
            }
          }
        }
        app.beginUndoGroup("Duplicate");
        sl.duplicate();
        var dupli = main_comp.layer(ind);
        var cdupli = dupli.source.duplicate();
        cdupli.name = sl.source.name;
        var nid = cdupli.id;
        var rep = true;
        if (type == "crop") {
          cdupli.name = "CR_LK_" + nid;
        } else {
          if (type == "pins") {
            cdupli.name = "RE_PINS_" + nid;
          } else {
            if (type == "multi") {
              cdupli.name = "TT_MULTI_" + nid;
            } else {
              if (type == "puppet") {
                cdupli.name = "RE_WARP_" + nid;
              } else {
                if (type == "corners") {
                  var nid = cdupli.id;
                  cdupli.name = "RE_CORNERS_" + nid;
                  rep = false;
                }
              }
            }
          }
        }
        dupli.replaceSource(cdupli, false);
        if (rep) {
          function Replace_Items(comp, oid, nid) {
            for (var ac = 1; ac <= comp.layers.length; ac += 1) {
              var item = comp.layer(ac);
              if (item.source instanceof CompItem) {
                var itn = item.source.name;
                if (itn.indexOf(oid) > -1) {
                  var cditem = item.source.duplicate();
                  cditem.name = itn;
                  var cdname = itn.replace(oid, nid);
                  cditem.name = cdname;
                  item.replaceSource(cditem, false);
                  Replace_Items(cditem, oid, nid);
                }
              }
            }
          }
          Replace_Items(cdupli, id, nid);
        }
        var tr = dupli.transform;
        for (var ac = 1; ac <= 12; ac += 1) {
          var prop = tr.property(ac);
          var expr = prop.expression;
          if (expr.length > 0) {
            var nexpr = expr.replace(id, nid);
            prop.expression = nexpr;
          }
        }
        Replace_Expressions(cdupli, id, nid);
        sl.selected = false;
        dupli.selected = true;
        app.endUndoGroup();
      }
      function _Settings() {
        var swin = new Window("dialog");
        swin.text = "Settings";
        swin.size = [300, 250];
        var logo_bt = swin.add("iconbutton", undefined, logo_image);
        logo_bt.alignment = ["fill", "fill"];
        var help_pnl = swin.add("panel", undefined, "Help");
        help_pnl.alignment = ["fill", "bottom"];
        help_pnl.orientation = "column";
        help_bt = help_pnl.add("button", undefined, "Help");
        help_bt.alignment = ["left", "bottom"];
        var cont_pnl = swin.add("panel");
        if (ui_type != "crop") {
          var red_grp = cont_pnl.add("group");
          red_grp.orientation = "row";
          red_grp.alignment = ["left", "top"];
          var red_info_txt = red_grp.add(
            "statictext",
            undefined,
            "Retrack: reduce mask vertices to",
          );
          red_info_txt.alignment = ["fill", "top"];
          var red_txt = red_grp.add("edittext", undefined, max_ver_length);
          red_txt.size = [40, 20];
        }
        if (ui_type == "all") {
          var close_grp = cont_pnl.add("group");
          close_grp.orientation = "row";
          close_grp.alignment = ["left", "top"];
          var close_info_txt = close_grp.add(
            "statictext",
            undefined,
            "Multi Pins: merge points closer than",
          );
          close_info_txt.alignment = ["fill", "top"];
          var close_txt = close_grp.add(
            "edittext",
            undefined,
            multi_pins_max_dist,
          );
          close_txt.size = [40, 20];
          var crop_grp = cont_pnl.add("group");
          crop_grp.orientation = "row";
          crop_grp.alignment = ["left", "top"];
        }
        help_bt.onClick = function () {
          RT_Set.helpUI();
        };
        logo_bt.onClick = function () {
          if ($.os.indexOf("Windows") != -1) {
            system.callSystem("explorer " + af_settings.scriptURL);
          } else {
            system.callSystem("open " + af_settings.scriptURL);
          }
        };
        if (ui_type != "crop") {
          red_txt.onChange = function () {
            max_ver_length = parseInt(red_txt.text);
            if (parseInt(red_txt.text) < 4) {
              red_txt.text = "4";
              max_ver_length = 4;
            }
            if (isTrial && parseInt(red_txt.text) > 8) {
              red_txt.text = "8";
              max_ver_length = 8;
              alert(
                "Sorry, only 8 vertices per mask are allowed in trial mode.",
              );
            }
            if (ui_type == "all") {
              multi_pins_max_dist = parseInt(close_txt.text);
            }
          };
        }
        swin.show();
      }
      function Corners_Precompose(times, corners) {
        var mtimes = [];
        var mkeys = [];
        var sl = app.project.activeItem.selectedLayers[0];
        sl.selected = true;
        sl.enabled = false;
        var ip = sl.inPoint;
        var op = sl.outPoint;
        var mind = 0;
        var masks = sl.property("ADBE Mask Parade");
        for (var am = masks.numProperties; am > 0; am--) {
          var m = masks.property(am);
          m.remove();
        }
        var trackers = sl.property("ADBE MTrackers");
        for (var at = trackers.numProperties; at > 0; at--) {
          var tr = trackers.property(at);
          tr.remove();
        }
        var fxs = sl.property("ADBE Effect Parade");
        for (var at = fxs.numProperties; at > 0; at--) {
          var fx = fxs.property(at);
          if (fx.name !== "Corners Clone Pin") {
            fx.remove();
          }
        }
        var cp = sl
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin");
        for (var ac = 0; ac < 4; ac += 1) {
          var pin = cp.property("CC Power Pin-000" + ac + 2);
          for (var ak = pin.numKeys; ak > 0; ak--) {
            var t = pin.keyTime(ak);
            if (t < ip || t >= op) {
              pin.removeKey(ak);
              corners[ac].splice(ak - 1, 1);
              if (ac == 0) {
                times.splice(ak - 1, 1);
              }
            }
          }
        }
        cp.selected = true;
        sl
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin").selected = true;
        app.executeCommand(19);
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var main_comp = app.project.activeItem;
        var slst = sl.startTime;
        var slip = sl.inPoint;
        var slop = sl.outPoint;
        if (times[0] > slip) {
          sl.inPoint = slip = times[0];
        }
        if (times[times.length - 1] < slop) {
          sl.outPoint = slop =
            times[times.length - 1] + app.project.activeItem.frameDuration;
        }
        main_comp.layers.precompose([sl.index], "RE_PINS_", true);
        var sl = app.project.activeItem.selectedLayers[0];
        var mid_comp = sl.source;
        var id = mid_comp.id;
        mid_comp.name = mid_comp.name + id;
        mid_comp.width = cw;
        mid_comp.height = ch;
        var pc = sl.source.layer(1);
        pc.inPoint = 0;
        pc.startTime = slst - slip;
        pc.outPoint = slop + slip;
        sl.startTime = slip;
        sl.source.duration = slop - slip;
        var mid_comp = sl.source;
        var mid_lr = mid_comp.layer(1);
        mid_comp.layers.precompose([mid_lr.index], "RE_PINS_ORI_" + id, true);
        var ori_comp = mid_comp.layer(1).source;
        var ori_lr = ori_comp.layer(1);
        var orip = ori_lr
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin");
        orip.property("CC Power Pin-0007").setValue(1);
        app.project.activeItem.time = times[0];
        app.executeCommand(20);
        var cp = sl
          .property("ADBE Effect Parade")
          .property("Corners Clone Pin");
        app.project.activeItem.time = ct;
        for (var ac = 1; ac <= 4; ac += 1) {
          var cc = ori_lr.effect.addProperty("ADBE Point Control");
          cc.name = "C" + ac;
          var cc = ori_lr.effect.property(ac + 1).property(1);
          cc.setValuesAtTimes(times, corners[ac - 1]);
        }
        sl.enabled = true;
      }
      function _Pins_00_Set_Pins(persp) {
        ct = app.project.activeItem.time;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        var dur = app.project.activeItem.duration;
        var sl = app.project.activeItem.selectedLayers[0];
        var len = fdata.length;
        if (len == 4) {
          var new_data = fdata.slice(fdata);
          var ndata = [];
          var times = (ndata[0] = new_data[0][0]);
          ndata[1] = [];
          for (var ak = 0; ak < times.length; ak += 1) {
            ndata[1][ak] = [];
            for (var av = 0; av < new_data.length; av += 1) {
              ndata[1][ak][av] = new_data[av][1][ak];
            }
          }
          var refs = Get_Refs_With_Closest(ndata);
          var corners = [];
          corners[0] = new_data[refs[0]][1];
          corners[1] = new_data[refs[1]][1];
          corners[2] = new_data[refs[2]][1];
          corners[3] = new_data[refs[3]][1];
          var cfx = sl
            .property("ADBE Effect Parade")
            .addProperty("CC Power Pin");
          cfx.name = "Corners Clone Pin";
          cfx.property("CC Power Pin-0002").setValuesAtTimes(times, corners[0]);
          cfx.property("CC Power Pin-0003").setValuesAtTimes(times, corners[1]);
          cfx.property("CC Power Pin-0004").setValuesAtTimes(times, corners[2]);
          cfx.property("CC Power Pin-0005").setValuesAtTimes(times, corners[3]);
          if (persp !== true) {
            cfx.property("CC Power Pin-0006").setValue(0);
          }
          Corners_Precompose(times, corners);
        } else {
          alert("Please select 1 tracked 4 points mask to proceed.");
        }
      }
      function Reorder_Vertices(tdata) {
        var times = tdata[0][0];
        ct = app.project.activeItem.time;
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ref_ver = [];
        for (var av = 0; av < tdata.length; av += 1) {
          ref_ver[av] = tdata[av][1][akr];
        }
        var def_ver = ref_ver.slice(ref_ver);
        for (var av = 0; av < ref_ver.length; av += 1) {
          var xmin = ref_ver.sort(function (a, b) {
            return b[0] < a[0];
          })[0][0];
          var xmax = ref_ver.sort(function (a, b) {
            return b[0] > a[0];
          })[0][0];
          var ymin = ref_ver.sort(function (a, b) {
            return b[1] < a[1];
          })[0][1];
          var ymax = ref_ver.sort(function (a, b) {
            return b[1] > a[1];
          })[0][1];
          var cx = (xmin + xmax) / 2;
          var cy = (ymin + ymax) / 2;
          var c = [cx, cy];
        }
        var angles = [];
        for (var av = 0; av < def_ver.length; av += 1) {
          var vx = def_ver[av][0];
          var vy = def_ver[av][1];
          var d = Math.sqrt(Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2));
          var dx = vx - c[0];
          var dy = vy - c[1];
          var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
          angles[av] = [av, angle, d];
        }
        angles.sort(function (a, b) {
          return b[1] < a[1];
        });
        var ndata = [];
        var pts = [];
        for (var av = 0; av < angles.length; av += 1) {
          var avref = angles[av][0];
          ndata[av] = tdata[avref];
        }
        return ndata;
      }
      function Get_Selection() {
        var lrs = app.project.activeItem.selectedLayers;
        var sel = [];
        for (var aa = 0; aa < lrs.length; aa += 1) {
          var lr = lrs[aa];
          var ind = lr.index;
          if (lr.selected) {
            sel[aa] = [];
            sel[aa][0] = ind;
            sel[aa][1] = [];
            sel[aa][2] = [];
            var masks = lr.property("ADBE Mask Parade");
            if (masks) {
              for (var am = 0; am < masks.numProperties; am += 1) {
                var m = masks.property(am + 1);
                if (m.selected) {
                  sel[aa][1].push(am + 1);
                }
              }
            }
            var trackers = lr.property("ADBE MTrackers");
            if (trackers && trackers.numProperties > 0) {
              for (var atr = 0; atr < trackers.numProperties; atr += 1) {
                var tracker = lr.property("ADBE MTrackers").property(atr + 1);
                for (var at = 0; at < tracker.numProperties; at += 1) {
                  sel[aa][2][atr] = [];
                  var trk = tracker.property(at + 1);
                  if (trk.selected) {
                    sel[aa][2][atr].push(at + 1);
                  }
                }
              }
            }
          }
        }
        return sel;
      }
      function Reselect(sel) {
        for (var aa = 0; aa < sel.length; aa += 1) {
          var ind = sel[aa][0];
          var mks = sel[aa][1];
          var trks = sel[aa][2];
          var lr = app.project.activeItem.layer(ind);
          lr.selected = true;
          if (mks.length > 0) {
            var masks = lr.property("ADBE Mask Parade");
            if (masks.numProperties > 0) {
              for (var am = 0; am < mks.length; am += 1) {
                var m = masks.property(mks[am]);
                if (m) {
                  m.selected = true;
                }
              }
            }
          }
          if (trks.length > 0) {
            var trackers = lr.property("ADBE MTrackers");
            for (var atr = 0; atr < trks.length; atr += 1) {
              var trk = trks[atr];
              if (trk.length > 0) {
                var tracker = trackers.property(atr + 1);
                for (var at = 0; at < trk.length; at += 1) {
                  var tr = trk[at];
                  var track = tracker.property(tr);
                  track.selected = true;
                }
              }
            }
          }
        }
      }
      function _Retrack_01_Convert_To_Data(mks, type, quad) {
        function Get_Angles(ctr) {
          var angles = [];
          for (var aa = 0; aa < ref_ver.length; aa += 1) {
            var vx = ref_ver[aa][0];
            var vy = ref_ver[aa][1];
            var d = Math.sqrt(
              Math.pow(vx - ctr[0], 2) + Math.pow(vy - ctr[1], 2),
            );
            var dx = vx - ctr[0];
            var dy = vy - ctr[1];
            var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
            angles.push([aa, angle, d, [vx, vy]]);
          }
          return angles;
        }
        var crefs = [];
        ct = app.project.activeItem.time;
        var times = data[0][0];
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ndata = [];
        var times = (ndata[0] = data[0][0].slice(data[0][0]));
        ndata[1] = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          ndata[1][ak] = [];
          for (var av = 0; av < data.length; av += 1) {
            ndata[1][ak][av] = data[av][1][ak];
          }
        }
        var ref_ver = ndata[1][akr].slice(ndata[1][akr]);
        var sort_ver = ndata[1][akr].slice(ndata[1][akr]);
        var cen_ver = ndata[1][akr].slice(ndata[1][akr]);
        var xmin = sort_ver.sort(function (a, b) {
          return b[0] < a[0];
        })[0][0];
        var xmax = sort_ver.sort(function (a, b) {
          return b[0] > a[0];
        })[0][0];
        var ymin = sort_ver.sort(function (a, b) {
          return b[1] < a[1];
        })[0][1];
        var ymax = sort_ver.sort(function (a, b) {
          return b[1] > a[1];
        })[0][1];
        var bb = [xmin, xmax, ymin, ymax];
        var cx = (xmin + xmax) / 2;
        var cy = (ymin + ymax) / 2;
        var c = [cx, cy];
        var frefs = [];
        var xver = [];
        var xtin = [];
        var xtout = [];
        var msl = [];
        var cls = [];
        for (var am = 0; am < mks.length; am += 1) {
          xver[am] = [];
          xtin[am] = [];
          xtout[am] = [];
          msl[am] = mks[am][1];
          if (quad) {
            msl[am] = true;
          }
          var mv = mks[am][0];
          if (mks[am][1]) {
            var ver = mv.vertices;
            var intn = [];
            var outtn = [];
            for (var av = 0; av < ver.length; av += 1) {
              intn.push(ver[av] + mv.inTangents[av]);
              outtn.push(ver[av] + mv.outTangents[av]);
            }
            crop_refs = [];
            for (var av = 0; av < ver.length; av += 1) {
              var refs = [];
              for (var ax = 0; ax < 3; ax += 1) {
                if (ax == 0) {
                  var v = ver[av];
                } else {
                  if (ax == 1) {
                    var v = intn[av];
                  } else {
                    if (ax == 2) {
                      var v = outtn[av];
                    }
                  }
                }
                if (type == "crop") {
                  var angles = Get_Angles(v);
                  angles.sort(function (a, b) {
                    return b[2] < a[2];
                  });
                  refs = [angles[0][0]];
                  var refpt = data[refs[0]];
                  var newp = [];
                  for (var ak = 0; ak < times.length; ak += 1) {
                    newp.push(refpt[1][ak]);
                  }
                  if (ax == 0) {
                    crefs.push([angles[0][0]]);
                    xver[am].push(newp);
                  }
                }
                if (type == "multi") {
                  if (data.length >= 4) {
                    if (refs.length == 0) {
                      refs = Get_4Refs_With_Votes_And_Closest(
                        v,
                        ndata,
                        bb,
                        akr,
                      );
                    }
                    var corns = [];
                    for (var ac = 0; ac < refs.length; ac += 1) {
                      corns.push(data[refs[ac]][1]);
                    }
                    if (refs.length == 4) {
                      var newp = Point_Perspective_Interpolation(v, corns, akr);
                      if (ax == 0) {
                        crefs.push(refs[0]);
                        xver[am].push(newp);
                      }
                    } else {
                      if (refs.length == 3) {
                        type = "multi2tri";
                      } else {
                        type = "multi2close";
                      }
                    }
                  } else {
                    if (data.length == 3) {
                      type = "multi2tri";
                    } else {
                      type = "multi2close";
                    }
                  }
                }
                if (type == "tri" || type == "multi2tri") {
                  if (data.length >= 3) {
                    if (ax == 0) {
                      refs = Get_3Refs(v, ndata, bb);
                      if (refs.length < 3) {
                        refs = Get_Neaerst_3Refs_By_Angle(v, ndata, bb, akr);
                      }
                    }
                    var corns = [];
                    for (var ac = 0; ac < refs.length; ac += 1) {
                      corns.push(data[refs[ac]][1]);
                    }
                    if (refs.length == 3) {
                      var newp = Point_Affine_Interpolation(v, corns, akr);
                      if (ax == 0) {
                        crefs.push(refs[0]);
                        xver[am].push(newp);
                      }
                      if (type == "multi2tri") {
                        type = "multi";
                      }
                    } else {
                      if (type == "multi2tri") {
                        type = "multi2close";
                      } else {
                        type = "tri2close";
                      }
                    }
                  } else {
                    type = "tri2close";
                  }
                }
                if (
                  type == "close" ||
                  type == "multi2close" ||
                  type == "tri2close"
                ) {
                  function Get_Closest_Refs() {
                    var angles = Get_Angles(v);
                    angles.sort(function (a, b) {
                      return b[2] < a[2];
                    });
                    var ref1 = angles[0][0];
                    var ref1v = ref_ver[ref1];
                    var angles2 = Get_Angles(ref1v);
                    angles2.sort(function (a, b) {
                      return b[2] < a[2];
                    });
                    for (var aa = 0; aa < angles2.length; aa += 1) {
                      var rrx0 = parseInt(ref1v[0] * 10) / 10;
                      var rry0 = parseInt(ref1v[1] * 10) / 10;
                      var rr0 = [rrx0, rry0].toString();
                      var rrx = parseInt(angles2[aa][3][0] * 10) / 10;
                      var rry = parseInt(angles2[aa][3][1] * 10) / 10;
                      var rr = [rrx, rry].toString();
                      if (rr0 != rr) {
                        var ref2 = angles2[aa][0];
                        var ref2v = ref_ver[ref2];
                        break;
                      }
                    }
                    return [ref1, ref2];
                  }
                  if (data.length >= 2) {
                    refs = Get_Closest_Refs();
                    var newp = Closest_Transformation(v, refs, times, akr);
                    if (ax == 0) {
                      crefs.push([refs[0]]);
                      xver[am].push(newp);
                    }
                    if (type == "multi2close") {
                      type = "multi";
                    }
                    if (type == "tri2close") {
                      type = "tri";
                    }
                  }
                  if (data.length == 1) {
                    var angles = Get_Angles(v);
                    angles.sort(function (a, b) {
                      return b[2] < a[2];
                    });
                    var ref = angles[0][0];
                    var refpt = data[ref];
                    var newp = [];
                    if (ax == 0) {
                      var dist = refpt[1][akr] - ver[av];
                    }
                    if (ax == 1) {
                      var dist = refpt[1][akr] - intn[av];
                    }
                    if (ax == 2) {
                      var dist = refpt[1][akr] - outtn[av];
                    }
                    for (var ak = 0; ak < times.length; ak += 1) {
                      newp.push(refpt[1][ak] - dist);
                    }
                    if (ax == 0) {
                      crefs.push([ref]);
                      xver[am].push(newp);
                    }
                  }
                }
                if (ax == 1 || ax == 2) {
                  var nv = xver[am][xver[am].length - 1];
                  for (var ak = 0; ak < nv.length; ak += 1) {
                    newp[ak] = newp[ak] - nv[ak];
                  }
                }
                if (ax == 1) {
                  xtin[am].push(newp);
                }
                if (ax == 2) {
                  xtout[am].push(newp);
                }
              }
            }
          }
          cls.push(mv.closed);
        }
        return [xver, xtin, xtout, cls, crefs, msl];
      }
      function Point_Affine_Interpolation(v, pins, akr) {
        function Get_ST(p, p0, p1, p2) {
          Area =
            0.5 *
            (-p1[1] * p2[0] +
              p0[1] * (-p1[0] + p2[0]) +
              p0[0] * (p1[1] - p2[1]) +
              p1[0] * p2[1]);
          s =
            (1 / (2 * Area)) *
            (p0[1] * p2[0] -
              p0[0] * p2[1] +
              (p2[1] - p0[1]) * p[0] +
              (p0[0] - p2[0]) * p[1]);
          t =
            (1 / (2 * Area)) *
            (p0[0] * p1[1] -
              p0[1] * p1[0] +
              (p0[1] - p1[1]) * p[0] +
              (p1[0] - p0[0]) * p[1]);
          return [s, t];
        }
        var p0 = pins[0][akr];
        var p1 = pins[1][akr];
        var p2 = pins[2][akr];
        var p = v;
        var res = Get_ST(p, p0, p1, p2);
        var s = res[0];
        var t = res[1];
        var vals = [];
        for (var ak = 0; ak < pins[0].length; ak += 1) {
          var p0 = pins[0][ak];
          var p1 = pins[1][ak];
          var p2 = pins[2][ak];
          px = p0[0] + (p1[0] - p0[0]) * s + (p2[0] - p0[0]) * t;
          py = p0[1] + (p1[1] - p0[1]) * s + (p2[1] - p0[1]) * t;
          pp = [px, py];
          vals.push(pp);
        }
        return vals;
      }
      function Closest_Transformation(v, refs, times, akr, data2) {
        ct = app.project.activeItem.time;
        if (data2) {
          data = data2.slice(data2);
        }
        var p10 = data[refs[0]][1][akr].slice(data[refs[0]][1][akr]);
        var p20 = data[refs[1]][1][akr].slice(data[refs[1]][1][akr]);
        var d0 = p20 - p10;
        var pr0 = -1 * ((Math.atan2(d0[0], d0[1]) * 180) / Math.PI - 180);
        var pd0 = Math.sqrt(
          Math.pow(p20[0] - p10[0], 2) + Math.pow(p20[1] - p10[1], 2),
        );
        var vd = v - p10;
        var vals = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          function Rotate(cx, cy, vd, angle, s) {
            var radians = (Math.PI / 180) * angle;
            var cos = Math.cos(radians);
            var sin = Math.sin(radians);
            var nx = cos * vd[0] * s + sin * vd[1] * s + cx;
            var ny = cos * vd[1] * s - sin * vd[0] * s + cy;
            return [nx, ny];
          }
          var p1 = data[refs[0]][1][ak].slice(data[refs[0]][1][ak]);
          var p2 = data[refs[1]][1][ak].slice(data[refs[1]][1][ak]);
          var d = p2 - p1;
          var pr = -1 * ((Math.atan2(d[0], d[1]) * 180) / Math.PI - 180);
          var pd = Math.sqrt(
            Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2),
          );
          var rot = pr0 - pr;
          var s = pd / pd0;
          var cx = p1[0];
          var cy = p1[1];
          var x = v[0];
          var y = v[1];
          var nv = Rotate(cx, cy, vd, rot, s);
          vals.push(nv);
        }
        return vals;
      }
      function Get_Refs_With_Closest(data) {
        var times = data[0];
        var ver_arr = data[1];
        ct = app.project.activeItem.time;
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ref_ver = ver_arr[akr].slice(ver_arr[akr]);
        var def_ver = ver_arr[akr].slice(ver_arr[akr]);
        var c = Get_Polygon_Centroid(ref_ver);
        var angles = [];
        for (var av = 0; av < def_ver.length; av += 1) {
          var vx = def_ver[av][0];
          var vy = def_ver[av][1];
          var d = Math.sqrt(Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2));
          var dx = vx - c[0];
          var dy = vy - c[1];
          var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
          angles[av] = [av, angle, d];
        }
        angles.sort(function (a, b) {
          return b[1] < a[1];
        });
        if (angles.length == 4) {
          var ur = angles[0][0];
          var br = angles[1][0];
          var bl = angles[2][0];
          var ul = angles[3][0];
        } else {
          function Unbusy_angles() {
            var rest = [];
            for (var av = 0; av < angles.length; av += 1) {
              var a = angles[av];
              var c = false;
              for (var ar = 0; ar < refs.length; ar += 1) {
                if (a[0] == refs[ar]) {
                  c = true;
                  break;
                }
              }
              if (c == false) {
                rest.push(a);
              }
            }
            return rest;
          }
          function Find_closest(tempa, sec) {
            var sadif = [];
            for (var av = 0; av < tempa.length; av += 1) {
              var dif = Math.abs(tempa[av][1] - sec[0]);
              sadif.push([tempa[av][0], dif]);
            }
            var sbdif = [];
            for (var av = 0; av < tempa.length; av += 1) {
              var dif = Math.abs(sec[1] - tempa[av][1]);
              sbdif.push([tempa[av][0], dif]);
            }
            var sar = sadif.sort(function (a, b) {
              return b[1] < a[1];
            })[0];
            var sbr = sbdif.sort(function (a, b) {
              return b[1] < a[1];
            })[0];
            var min = [sar, sbr].sort(function (a, b) {
              return b[1] < a[1];
            })[0];
            return min[0];
          }
          var uls = [];
          var urs = [];
          var brs = [];
          var bls = [];
          for (var av = 0; av < angles.length; av += 1) {
            var a = angles[av];
            if (a[1] > 0 && a[1] <= 90) {
              urs.push(a);
            } else {
              if (a[1] > 90 && a[1] <= 180) {
                brs.push(a);
              } else {
                if (a[1] > 180 && a[1] <= 270) {
                  bls.push(a);
                } else {
                  if (a[1] > 270 && a[1] < 360) {
                    uls.push(a);
                  }
                }
              }
            }
          }
          var ul = (ur = bl = br = null);
          if (uls.length > 0) {
            ul = uls.sort(function (a, b) {
              return b[2] > a[2];
            })[0][0];
          }
          if (urs.length > 0) {
            ur = urs.sort(function (a, b) {
              return b[2] > a[2];
            })[0][0];
          }
          if (bls.length > 0) {
            bl = bls.sort(function (a, b) {
              return b[2] > a[2];
            })[0][0];
          }
          if (brs.length > 0) {
            br = brs.sort(function (a, b) {
              return b[2] > a[2];
            })[0][0];
          }
          var refs = [ul, ur, bl, br];
          if (ul === null) {
            var rest = Unbusy_angles();
            ul = Find_closest(rest, [270, 360]);
          }
          if (ur === null) {
            var rest = Unbusy_angles();
            ur = Find_closest(rest, [360, 90]);
          }
          if (bl === null) {
            var rest = Unbusy_angles();
            bl = Find_closest(rest, [180, 270]);
          }
          if (br === null) {
            var rest = Unbusy_angles();
            br = Find_closest(rest, [90, 180]);
          }
        }
        return [ul, ur, bl, br];
      }
      function Get_4Refs_With_Votes_And_Closest(c, ndata, bb, akr) {
        var times = ndata[0];
        var ver_arr = ndata[1];
        ct = app.project.activeItem.time;
        var ref_ver = ver_arr[akr].slice(ver_arr[akr]);
        var def_ver = ver_arr[akr].slice(ver_arr[akr]);
        var minx = bb[0];
        var maxx = bb[1];
        var miny = bb[2];
        var maxy = bb[3];
        var bbc = [(minx + maxx) / 2, (miny + maxy) / 2];
        var urbb = [maxx, miny];
        var brbb = [maxx, maxy];
        var blbb = [minx, maxy];
        var ulbb = [minx, miny];
        var urbb45 = [maxx, (miny + maxy) / 2];
        var brbb45 = [(minx + maxx) / 2, maxy];
        var blbb45 = [minx, (miny + maxy) / 2];
        var ulbb45 = [(minx + maxx) / 2, miny];
        if (def_ver.length == 4) {
          c = bbc;
        }
        var angles = [];
        for (var av = 0; av < def_ver.length; av += 1) {
          var vx = def_ver[av][0];
          var vy = def_ver[av][1];
          var d = Math.sqrt(Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2));
          var dx = vx - c[0];
          var dy = vy - c[1];
          var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
          angles[av] = [av, angle, d];
        }
        angles.sort(function (a, b) {
          return b[1] < a[1];
        });
        if (def_ver.length == 4) {
          var ur = angles[0][0];
          var br = angles[1][0];
          var bl = angles[2][0];
          var ul = angles[3][0];
          var refs = [ul, ur, bl, br];
        } else {
          function Votes(cor, a, mina, maxa) {
            var maxd = Math.sqrt(
              Math.pow(cor[0] - c[0], 2) + Math.pow(cor[1] - c[1], 2),
            );
            var dvote = ((maxd - a[2]) * 100) / maxd;
            var mida = (mina + maxa) / 2;
            var adif = Math.abs(a[1] - mida);
            var avote = ((45 - adif) * 100) / 45;
            avote = avote * trk_ratio;
            return [dvote, avote];
          }
          if (angles.length > 4) {
            function Get_Refs(as) {
              var ulc = [];
              var urc = [];
              var brc = [];
              var blc = [];
              var cnt = 0;
              for (var av = 0; av < angles.length; av += 1) {
                var a = angles[av];
                if (a[1] >= 0 + as && a[1] < 90 + as) {
                  if (urc.length == 0) {
                    cnt++;
                  }
                  if (as == 0) {
                    var votes = Votes(urbb, a, 0 + as, 90 + as);
                  } else {
                    var votes = Votes(urbb45, a, 0 + as, 90 + as);
                  }
                  var mid = (votes[0] + votes[1]) / 2 / 200;
                  a[3] = mid;
                  urc.push(a);
                }
                if (a[1] >= 90 + as && a[1] < 180 + as) {
                  if (brc.length == 0) {
                    cnt++;
                  }
                  if (as == 0) {
                    var votes = Votes(brbb, a, 90 + as, 180 + as);
                  } else {
                    var votes = Votes(brbb45, a, 90 + as, 180 + as);
                  }
                  var mid = (votes[0] + votes[1]) / 2 / 200;
                  a[3] = mid;
                  brc.push(a);
                }
                if (a[1] >= 180 + as && a[1] < 270 + as) {
                  if (blc.length == 0) {
                    cnt++;
                  }
                  if (as == 0) {
                    var votes = Votes(blbb, a, 180 + as, 270 + as);
                  } else {
                    var votes = Votes(blbb45, a, 180 + as, 270 + as);
                  }
                  var mid = (votes[0] + votes[1]) / 2 / 200;
                  a[3] = mid;
                  blc.push(a);
                }
                if (
                  (as == 0 && a[1] >= 270 && a[1] < 360) ||
                  (as == 45 && a[1] >= 315 && a[1] < 360) ||
                  (as == 45 && a[1] >= 0 && a[1] < 45)
                ) {
                  if (ulc.length == 0) {
                    cnt++;
                  }
                  if (as == 0) {
                    var votes = Votes(ulbb, a, 270, 360);
                  } else {
                    if (a[1] < 45) {
                      a[1] = a[1] + 360;
                    }
                    if (as == 0) {
                      var votes = Votes(ulbb, a, 315, 405);
                    } else {
                      var votes = Votes(ulbb45, a, 315, 405);
                    }
                  }
                  var mid = (votes[0] + votes[1]) / 2 / 200;
                  a[3] = mid;
                  ulc.push(a);
                }
              }
              return [ulc, urc, blc, brc, cnt];
            }
            var arrs = Get_Refs(0);
            var cnt = arrs[4];
            if (cnt < 4) {
              var arrs = Get_Refs(45);
            }
            cnt = arrs[4];
            var ulc = arrs[0];
            var urc = arrs[1];
            var blc = arrs[2];
            var brc = arrs[3];
          }
          if (cnt == 4) {
            var ul = (ur = bl = br = null);
            ulc.sort(function (a, b) {
              return b[3] > a[3];
            });
            urc.sort(function (a, b) {
              return b[3] > a[3];
            });
            blc.sort(function (a, b) {
              return b[3] > a[3];
            });
            brc.sort(function (a, b) {
              return b[3] > a[3];
            });
            var refs = [ulc[0][0], urc[0][0], blc[0][0], brc[0][0]];
          } else {
            if (cnt <= 3) {
              var refs = [];
              if (ulc.length > 0) {
                ulc.sort(function (a, b) {
                  return b[3] > a[3];
                });
                refs.push(ulc[0][0]);
              }
              if (urc.length > 0) {
                urc.sort(function (a, b) {
                  return b[3] > a[3];
                });
                refs.push(urc[0][0]);
              }
              if (blc.length > 0) {
                blc.sort(function (a, b) {
                  return b[3] > a[3];
                });
                refs.push(blc[0][0]);
              }
              if (brc.length > 0) {
                brc.sort(function (a, b) {
                  return b[3] > a[3];
                });
                refs.push(brc[0][0]);
              }
            }
          }
        }
        return refs;
      }
      function Point_To_Line(x, y, x1, y1, x2, y2) {
        var A = x - x1;
        var B = y - y1;
        var C = x2 - x1;
        var D = y2 - y1;
        var dot = A * C + B * D;
        var len_sq = C * C + D * D;
        var param = -1;
        if (len_sq != 0) {
          param = dot / len_sq;
        }
        if (param < 0) {
          xx = x1;
          yy = y1;
        } else {
          if (param > 1) {
            xx = x2;
            yy = y2;
          } else {
            xx = x1 + param * C;
            yy = y1 + param * D;
          }
        }
        var dx = x - xx;
        var dy = y - yy;
        return Math.sqrt(dx * dx + dy * dy);
      }
      function Get_Neaerst_3Refs_By_Angle(c, ndata, bb, akr) {
        var times = ndata[0];
        var ver_arr = ndata[1];
        ct = app.project.activeItem.time;
        var ref_ver = ver_arr[akr].slice(ver_arr[akr]);
        var def_ver = ver_arr[akr].slice(ver_arr[akr]);
        var minx = bb[0];
        var maxx = bb[1];
        var miny = bb[2];
        var maxy = bb[3];
        var bbc = [(minx + maxx) / 2, (miny + maxy) / 2];
        var dists = [];
        for (var av = 0; av < ref_ver.length; av += 1) {
          var vx = ref_ver[av][0];
          var vy = ref_ver[av][1];
          var d = Math.sqrt(Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2));
          dists.push([av, d, [vx, vy]]);
        }
        dists.sort(function (a, b) {
          return b[1] < a[1];
        });
        var ref1 = dists[0][0];
        var pt1 = ref_ver[ref1];
        var p1x = parseInt(pt1[0] * 10) / 10;
        var p1y = parseInt(pt1[1] * 10) / 10;
        for (var ad = 1; ad < dists.length; ad += 1) {
          var ref2 = dists[ad][0];
          var pt2 = ref_ver[ref2];
          var d = Math.sqrt(
            Math.pow(pt2[0] - pt1[0], 2) + Math.pow(pt2[1] - pt1[1], 2),
          );
          if (d >= retrack_min_side * 3) {
            var refs = [ref1, ref2];
            var p2x = parseInt(pt2[0] * 10) / 10;
            var p2y = parseInt(pt2[1] * 10) / 10;
            var mid = [(pt1[0] + pt2[0]) / 2, (pt1[1] + pt2[1]) / 2];
            break;
          }
        }
        var refs = [ref1, ref2];
        for (var ad = 2; ad < dists.length; ad += 1) {
          var tref3 = dists[ad][0];
          var pt3 = ref_ver[tref3];
          var p3x = parseInt(pt3[0] * 10) / 10;
          var p3y = parseInt(pt3[1] * 10) / 10;
          if (
            [p3x, p3y].toString() != [p1x, p1y].toString() &&
            [p3x, p3y].toString() != [p2x, p2y].toString()
          ) {
            var cc = Get_Polygon_Centroid([pt1, pt2, pt3]);
            var d1 = Point_To_Line(
              cc[0],
              cc[1],
              pt1[0],
              pt1[1],
              pt2[0],
              pt2[1],
            );
            var d2 = Point_To_Line(
              cc[0],
              cc[1],
              pt1[0],
              pt1[1],
              pt3[0],
              pt3[1],
            );
            var d3 = Point_To_Line(
              cc[0],
              cc[1],
              pt2[0],
              pt2[1],
              pt3[0],
              pt3[1],
            );
            if (
              d1 >= retrack_min_side &&
              d2 >= retrack_min_side &&
              d3 >= retrack_min_side
            ) {
              var ref3 = tref3;
              refs = [ref1, ref2, ref3];
              break;
            }
          }
        }
        return refs;
      }
      function Refs_BB_Chk(refs, ref_ver, bb) {
        chk = false;
        if (refs.length == 3) {
          var pt1 = ref_ver[refs[0]];
          var pt2 = ref_ver[refs[1]];
          var pt3 = ref_ver[refs[2]];
          var v1 = pt1;
          var mid1 = [(p2[0] + p3[0]) / 2, (p2[1] + p3[1]) / 2];
          retrack_min_side;
        }
        var bbox = [];
        var by = [];
        for (var ar = 0; ar < refs.length; ar += 1) {
          var v = ref_ver[refs[ar]];
          bbox.push(v);
        }
        var minx = bbox.sort(function (a, b) {
          return b[0] < a[0];
        })[0][0];
        var maxx = bbox.sort(function (a, b) {
          return b[0] > a[0];
        })[0][0];
        var miny = bbox.sort(function (a, b) {
          return b[1] < a[1];
        })[0][1];
        var maxy = bbox.sort(function (a, b) {
          return b[1] > a[1];
        })[0][1];
        if (
          maxx - minx >= retrack_min_side &&
          maxy - miny >= retrack_min_side
        ) {
          chk = true;
        }
        return chk;
      }
      function Get_3Refs(c, ndata, bb) {
        var times = ndata[0];
        var ver_arr = ndata[1];
        ct = app.project.activeItem.time;
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ref_ver = ver_arr[akr].slice(ver_arr[akr]);
        var def_ver = ver_arr[akr].slice(ver_arr[akr]);
        if (def_ver.length == 3) {
        }
        var angles = [];
        for (var av = 0; av < def_ver.length; av += 1) {
          var vx = def_ver[av][0];
          var vy = def_ver[av][1];
          var d = Math.sqrt(Math.pow(vx - c[0], 2) + Math.pow(vy - c[1], 2));
          var dx = vx - c[0];
          var dy = vy - c[1];
          var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
          angles[av] = [av, angle, d];
        }
        angles.sort(function (a, b) {
          return b[2] < a[2];
        });
        if (def_ver.length == 3) {
          var p1 = angles[0][0];
          var p2 = angles[1][0];
          var p3 = angles[2][0];
          var refs = [p1, p2, p3];
        }
        if (def_ver.length > 3) {
          function Get_Refs(as) {
            var cnt = 0;
            var cnt = 0;
            for (var av = 0; av < angles.length; av += 1) {
              var a = angles[av];
              if (av == 0) {
                var ang1 = a[1];
                r1 = a[0];
                cnt++;
              } else {
                if (cnt == 1) {
                  var ang2 = a[1];
                  var adif12 = Math.abs(ang2 - ang1);
                  if (adif12 > 180) {
                    adif12 = 360 - adif12;
                  }
                  if (adif12 >= 30 && adif12 <= 120) {
                    r2 = a[0];
                    cnt++;
                    var mid = (ang1 + ang2) / 2;
                    if (mid >= 360) {
                      mid = mid - 360;
                    }
                  }
                }
                if (cnt == 2) {
                  var m1 = mid - 135;
                  var m2 = mid + 135;
                  if (m1 < 0) {
                    m1 = m1 + 360;
                  }
                  if (m2 >= 360) {
                    m2 = m2 - 360;
                  }
                  if (m1 > m2) {
                    var mt = m1;
                    m1 = m2;
                    m2 = mt;
                  }
                  for (var av2 = 0; av2 < angles.length; av2 += 1) {
                    var a2 = angles[av];
                    var xr = a2[0];
                    if (xr != r1 && xr != r2) {
                      var ang3 = a2[1];
                      if (mid >= m1 && mid <= m2) {
                        if (
                          (ang3 >= m2 && ang3 < 360) ||
                          (ang3 >= 0 && ang3 <= m1)
                        ) {
                          r3 = a2[0];
                          cnt++;
                          break;
                        }
                      } else {
                        if (ang3 >= m1 && ang3 <= m2) {
                          r3 = a2[0];
                          cnt++;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
            if (cnt == 3) {
              var refs = [r1, r2, r3];
            } else {
              var refs = [];
            }
            return refs;
          }
          var refs = Get_Refs();
        }
        if (def_ver.length < 3) {
          var refs = [];
          for (var ar = 0; ar < angles.length; ar += 1) {
            refs.push(angles[ar][0]);
          }
        }
        return refs;
      }
      function Get_Area_Refs(c, ndata, angles, bb) {
        var times = ndata[0];
        var ver_arr = ndata[1];
        ct = app.project.activeItem.time;
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ref_ver = ver_arr[akr].slice(ver_arr[akr]);
        var def_ver = ver_arr[akr].slice(ver_arr[akr]);
        var minx = bb[0];
        var maxx = bb[1];
        var miny = bb[2];
        var maxy = bb[3];
        angles.sort(function (a, b) {
          return b[1] < a[1];
        });
        var ulc = [];
        var urc = [];
        var brc = [];
        var blc = [];
        if (angles.length >= 4) {
          for (var av = 0; av < angles.length; av += 1) {
            var a = angles[av];
            var p = a[3];
            if (a[1] >= 0 && a[1] < 90) {
              var dr = [maxx, miny];
              var d = Math.sqrt(
                Math.pow(dr[0] - p[0], 2) + Math.pow(dr[1] - p[1], 2),
              );
              a[4] = d;
              urc.push(a);
            } else {
              if (a[1] >= 90 && a[1] < 180) {
                var dr = [maxx, maxy];
                var d = Math.sqrt(
                  Math.pow(dr[0] - p[0], 2) + Math.pow(dr[1] - p[1], 2),
                );
                a[4] = d;
                brc.push(a);
              } else {
                if (a[1] >= 180 && a[1] < 270) {
                  var dr = [minx, maxy];
                  var d = Math.sqrt(
                    Math.pow(dr[0] - p[0], 2) + Math.pow(dr[1] - p[1], 2),
                  );
                  a[4] = d;
                  blc.push(a);
                } else {
                  if (a[1] >= 270 && a[1] < 360) {
                    var dr = [minx, miny];
                    var d = Math.sqrt(
                      Math.pow(dr[0] - p[0], 2) + Math.pow(dr[1] - p[1], 2),
                    );
                    a[4] = d;
                    ulc.push(a);
                  }
                }
              }
            }
          }
        }
        ulc.sort(function (a, b) {
          return b[4] < a[4];
        });
        urc.sort(function (a, b) {
          return b[4] < a[4];
        });
        blc.sort(function (a, b) {
          return b[4] < a[4];
        });
        brc.sort(function (a, b) {
          return b[4] < a[4];
        });
        var refs = [ulc[0][0], urc[0][0], blc[0][0], brc[0][0]];
        return refs;
      }
      function _Retrack_02_Set_Mask(sl, xmks, times) {
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var factor = cw / 60;
        var nmks = xmks[0].slice(xmks[0]);
        var ntin = xmks[1].slice(xmks[1]);
        var ntout = xmks[2].slice(xmks[2]);
        var cls = xmks[3].slice(xmks[3]);
        var msl = xmks[5].slice(xmks[5]);
        var masks = sl.property("ADBE Mask Parade");
        var mksel = [];
        for (var am = 0; am < msl.length; am += 1) {
          if (msl[am] === true) {
            var mk = nmks[am];
            var mtin = ntin[am];
            var mtout = ntout[am];
            var clsm = cls[am];
            var m = masks.property(am + 1);
            m.maskMode = MaskMode.NONE;
            var s = m.property("ADBE Mask Shape");
            var o = m.property(3);
            var vals = [];
            for (var ak = 0; ak < mk[0].length; ak += 1) {
              var v = s.value;
              var verts = [];
              var tin = [];
              var tout = [];
              for (var av = 0; av < mk.length; av += 1) {
                verts[av] = [mk[av][ak][0], mk[av][ak][1]];
                tin[av] = [mtin[av][ak][0], mtin[av][ak][1]];
                tout[av] = [mtout[av][ak][0], mtout[av][ak][1]];
              }
              v.vertices = verts;
              v.inTangents = tin;
              v.outTangents = tout;
              v.closed = clsm;
              vals.push(v);
            }
            s.setValuesAtTimes(times, vals);
            var marr = [];
            for (var av = 0; av < mk.length; av += 1) {
              marr[av] = [];
              marr[av][0] = [];
              marr[av][1] = [];
              marr[av][2] = [];
              for (var ak = 0; ak < mk[0].length; ak += 1) {
                marr[av][0].push([
                  Math.round(mk[av][ak][0] * 1000) / 1000,
                  Math.round(mk[av][ak][1] * 1000) / 1000,
                ]);
                marr[av][1].push([
                  Math.round(mtin[av][ak][0] * 1000) / 1000,
                  Math.round(mtin[av][ak][1] * 1000) / 1000,
                ]);
                marr[av][2].push([
                  Math.round(mtout[av][ak][0] * 1000) / 1000,
                  Math.round(mtout[av][ak][1] * 1000) / 1000,
                ]);
              }
            }
          }
        }
        for (var am = 0; am < mksel.length; am += 1) {
          var m = masks.property(am + 1);
          if (msl[am]) {
            m.selected = true;
          }
        }
      }
      function _Retrack_00_Window(type) {
        function colorpicker(result_color) {
          var hexToRGB = function (hex) {
            var r = hex >> 16;
            var g = (hex >> 8) & 255;
            var b = hex & 255;
            return [r, g, b];
          };
          var color_decimal = $.colorPicker();
          if (color_decimal < 0) {
            return null;
          }
          var color_hexadecimal = color_decimal.toString(16);
          var color_rgb = hexToRGB(parseInt(color_hexadecimal, 16));
          var result_color = [
            color_rgb[0] / 255,
            color_rgb[1] / 255,
            color_rgb[2] / 255,
          ];
          return result_color;
        }
        function Change_Pt_Size(pt_size_value) {
          var v = parseInt(pt_size_value);
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            var suf = lr.name.slice(0, 9);
            var name = lr.name.slice(9);
            var num = Number(name);
            if (suf.toString() == "RT Track " && isNaN(num) === false) {
              lr.source.width = v;
              lr.source.height = v;
            }
          }
        }
        function Change_Sk_Size(sk_size_value) {
          var v = parseInt(sk_size_value);
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            if (lr.name == "Selected Masks") {
              lr.effect.property(1).property("ADBE Stroke-0003").setValue(v);
              for (var ae = lr.effect.numProperties; ae > 0; ae--) {
                var fx = lr.effect.property(ae);
                if (fx.matchName == "ADBE Circle") {
                  fx.property("ADBE Circle-0002").setValue(v);
                }
              }
            }
            if (lr.name == "Draw masks on this layer.") {
              lr.effect.property(1).property("ADBE Stroke-0003").setValue(v);
              for (var ae = lr.effect.numProperties; ae > 0; ae--) {
                var fx = lr.effect.property(ae);
                if (fx.matchName == "ADBE Circle") {
                  fx.property("ADBE Circle-0002").setValue(v);
                }
              }
            }
          }
        }
        function Change_bg_opa(bg_opa_value) {
          var v = parseInt(bg_opa_value);
          bg.opacity.setValue(v);
        }
        function Circle(am, selected, times) {
          if (selected) {
            var opa = 100;
            var rbg = main.layer(1);
          } else {
            var opa = 0;
            var rbg = bg;
          }
          var m = rbg.mask.property(am);
          var s = m.property(1);
          var size = parseInt(sk_size_value);
          var circle = rbg
            .property("ADBE Effect Parade")
            .addProperty("ADBE Circle");
          circle.property("ADBE Circle-0010").setValue(mk_color);
          circle.property("ADBE Circle-0002").setValue(size);
          circle.property("ADBE Circle-0012").setValue(2);
          circle.property("ADBE Circle-0011").setValue(opa);
          circle.name = "TT Mask Circle " + am;
          if (s.numKeys > 0) {
            var vals = [];
            for (var ak = 1; ak <= s.numKeys; ak += 1) {
              var v = s.keyValue(ak).vertices[0];
              vals.push(v);
            }
            circle.property("ADBE Circle-0001").setValuesAtTimes(times, vals);
          } else {
            var p = s.value.vertices[0];
            circle.property("ADBE Circle-0001").setValue(p);
          }
        }
        function Remove_Circles(rbg, selection) {
          if (selection) {
            var opa = 100;
          } else {
            var opa = 0;
          }
          for (var ae = rbg.effect.numProperties; ae > 0; ae--) {
            var fx = rbg.effect.property(ae);
            if (fx.matchName == "ADBE Circle") {
              var opacity = fx.property("ADBE Circle-0011").value;
              if (opacity.toString() == opa.toString()) {
                fx.remove();
              }
            }
          }
        }
        function Switch_Circles(rbg, sw) {
          for (var ae = rbg.effect.numProperties; ae > 0; ae--) {
            var fx = rbg.effect.property(ae);
            if (fx.matchName == "ADBE Circle") {
              if (sw) {
                fx.enabled = true;
              } else {
                fx.enabled = false;
              }
            }
          }
        }
        function Track() {
          main.layer("Selected Masks").locked = false;
          main.layer("Selected Masks").remove();
          var masks = bg.property("ADBE Mask Parade");
          var tdata = [];
          if (main.selectedLayers.length > 0) {
            var data2 = [];
            for (var ap = 0; ap < main.layers.length; ap += 1) {
              var lr = main.layer(ap + 1);
              var suf = lr.name.slice(0, 9);
              var name = lr.name.slice(9);
              var num = Number(name);
              if (suf.toString() == "RT Track " && isNaN(num) === false) {
                if (lr.selected) {
                  data2.push(fdata[num]);
                }
              }
            }
            data = data2.slice(data2);
          } else {
            data = fdata.slice(fdata);
          }
          type = "tri";
          var mks = [];
          for (var am = 0; am < masks.numProperties; am += 1) {
            var m = masks.property(am + 1);
            var s = m.property("ADBE Mask Shape");
            var v = s.value;
            if (mselarr.indexOf(am + 1) > -1) {
              mks.push([v, true]);
            } else {
              mks.push([v, false]);
            }
          }
          var xmks = _Retrack_01_Convert_To_Data(mks, type, false);
          var times = fdata[0][0].slice(fdata[0][0]);
          app.beginUndoGroup("Set Mask Animation To New Layer");
          _Retrack_02_Set_Mask(bg, xmks, times);
          for (var am = 0; am < masks.numProperties; am += 1) {
            var m = masks.property(am + 1);
            m.maskMode = MaskMode.NONE;
          }
          bg.effect.property(1).enabled = true;
          Switch_Circles(bg, true);
          var bgsel = bg.duplicate();
          bg.effect.property(1).enabled = false;
          Switch_Circles(bg, false);
          bgsel.locked = false;
          for (var am = bgsel.mask.numProperties; am > 0; am--) {
            var m = bgsel.mask.property(am);
            if (mselarr.indexOf(am) == -1) {
              m.remove();
            }
          }
          bgsel.effect
            .property(1)
            .property("ADBE Stroke-0002")
            .setValue(mk_color);
          bgsel.effect.property(1).property("ADBE Stroke-0007").setValue(2);
          bgsel.name = "Selected Masks";
          var smkrs = bgsel.property("Marker");
          smkrs.removeKey(1);
          Remove_Circles(bg, true);
          Remove_Circles(bgsel, false);
          for (var am = 1; am <= bgsel.mask.numProperties; am += 1) {
            var m = bgsel.mask.property(am);
            var s = m.property(1);
            if (s.value.vertices.length == 1) {
              Circle(am, true, times);
            }
          }
          bgsel.opacity.setValue(100);
          bgsel.selected = false;
          bgsel.locked = true;
          bg.selected = false;
          app.endUndoGroup();
        }
        function Select() {
          set_pnl.enabled = false;
          var masks = bg.property("ADBE Mask Parade");
          if (
            (main.selectedLayers.length == 1 &&
              main.selectedLayers[0] == bg &&
              masks.numProperties > 0) ||
            (main.selectedLayers.length == 0 && masks.numProperties > 0)
          ) {
            app.beginUndoGroup("Select masks to ReTrack");
            bg.effect.property(1).enabled = true;
            var cnt = 0;
            for (var am = 1; am <= masks.numProperties; am += 1) {
              var m = masks.property(am);
              var s = m.property(1);
              if (m.selected) {
                cnt++;
              }
            }
            for (var am = 1; am <= masks.numProperties; am += 1) {
              var m = masks.property(am);
              var s = m.property(1);
              if (m.selected) {
                mselarr.push(am);
                if (s.value.vertices.length == 1) {
                  Circle(am, true, times);
                }
              } else {
                if (s.value.vertices.length == 1 && cnt > 0) {
                  Circle(am, false, times);
                }
              }
            }
            if (cnt == 0) {
              for (var am = 1; am <= masks.numProperties; am += 1) {
                var m = masks.property(am);
                var s = m.property(1);
                mselarr.push(am);
                if (s.value.vertices.length == 1) {
                  Circle(am, true, times);
                }
              }
            }
            var bgsel = bg.duplicate();
            bg.effect.property(1).enabled = false;
            Switch_Circles(bg, false);
            bgsel.name = "Selected Masks";
            bgsel.opacity.setValue(50);
            Remove_Circles(bg, true);
            for (var am = bgsel.mask.numProperties; am > 0; am--) {
              var m = bgsel.mask.property(am);
              if (mselarr.indexOf(am) == -1) {
                m.remove();
              }
            }
            Remove_Circles(bgsel, false);
            bgsel.effect
              .property(1)
              .property("ADBE Stroke-0002")
              .setValue(mk_color);
            bgsel.effect.property(1).property("ADBE Stroke-0007").setValue(2);
            var smkrs = bgsel.property("Marker");
            if (smkrs.numKeys > 0) {
              smkrs.removeKey(1);
            }
            var mkrs = bg.property("Marker");
            if (mkrs.numKeys > 0) {
              mkrs.removeKey(1);
            }
            var mt = main.time;
            var mrk = new MarkerValue("");
            mkrs.setValueAtTime(mt, mrk);
            bgsel.selected = false;
            bgsel.locked = true;
            bg.selected = false;
            bg.locked = true;
            select_bt.enabled = false;
            track_bt.enabled = true;
            done_bt.enabled = true;
            convert_bt.enabled = false;
            app.endUndoGroup();
            info_txt.text =
              "Select points and click ReTrack. Don\'t select to use all points. Click Done when track is fine.";
          }
        }
        function Remove() {
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            var suf = lr.name.slice(0, 9);
            var name = lr.name.slice(9);
            var num = Number(name);
            if (suf.toString() == "RT Track " && isNaN(num) === false) {
              lr.source.remove();
            }
          }
        }
        var sel = Get_Selection();
        ct = app.project.activeItem.time;
        fps = 1 / app.project.activeItem.frameDuration;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var factor = cw / 60;
        var ratio = parseInt(cw / 200);
        var dur = app.project.activeItem.duration;
        var main = app.project.activeItem;
        var times = fdata[0][0].slice(fdata[0][0]);
        var mselarr = [];
        var closed = false;
        var multi = false;
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var sl = main.selectedLayers[0];
        var ind = sl.index;
        if (times.length >= 4) {
          var miss_in_value = (miss_out_value = 4);
        } else {
          var miss_in_value = (miss_out_value = times.length);
        }
        var maxmissing = times.length;
        app.beginUndoGroup("Create Helpers");
        var locked = [];
        for (var ap = 1; ap <= main.layers.length; ap += 1) {
          if (main.layer(ap).threeDLayer) {
            main.layer(ap).enabled = false;
          }
          main.layer(ap).locked = true;
          locked.push(ap);
        }
        var vari = false;
        for (var ap = 0; ap < fdata.length; ap += 1) {
          var dtype = fdata[ap][3];
          if (dtype == "2d" || dtype == "3d") {
            vari = true;
            break;
          }
        }
        var mks = [];
        var el = -1;
        var cnt = -1;
        for (var ap = fdata.length - 1; ap >= 0; ap--) {
          var times = fdata[ap][0].slice(fdata[ap][0]);
          var tdata = fdata[ap][1].slice(fdata[ap][1]);
          var name = "RT Track " + ap;
          var dtype = fdata[ap][3];
          if (fdata[ap].length == 4) {
            if (el == -1) {
              cnt++;
              var oel = fdata[ap][3];
              mks[cnt] = [];
            }
            el = fdata[ap][3];
            if (el == oel) {
              mks[cnt].push(fdata[ap][1]);
            } else {
              oel = el;
              cnt++;
              mks[cnt] = [];
              mks[cnt].push(fdata[ap][1]);
            }
          }
          var nc = [pt_color[0], pt_color[1], pt_color[2]];
          var nn = app.project.activeItem.layers.addSolid(
            nc,
            name,
            pt_size_value,
            pt_size_value,
            1,
            5,
          );
          nn.startTime = times[0];
          nn.outPoint = times[times.length - 1] + 1 / fps;
          nn.transform.position.setValuesAtTimes(times, tdata);
          if (dtype == "mask" && fdata[ap][8] == false) {
            nn.position.expression =
              "smooth(width = .2, samples = 5, t = time)";
            for (var ak = 0; ak < times.length; ak += 1) {
              var vl = nn.position.valueAtTime(times[ak], false);
              tdata[ak] = vl;
            }
            nn.transform.position.setValuesAtTimes(times, tdata);
            fdata[ap][1] = tdata.slice(tdata);
          }
        }
        var bg = app.project.activeItem.layers.addSolid(
          [0, 0, 0],
          "Draw masks on this layer.",
          cw,
          ch,
          1,
          dur,
        );
        bg.transform.opacity.setValue(40);
        var stroke = bg
          .property("ADBE Effect Parade")
          .addProperty("ADBE Stroke");
        stroke.property("ADBE Stroke-0010").setValue(1);
        stroke.property("ADBE Stroke-0002").setValue([0, 0, 1, 1]);
        stroke.property("ADBE Stroke-0003").setValue(sk_size_value);
        stroke.property("ADBE Stroke-0004").setValue(0.94);
        stroke.property("ADBE Stroke-0005").setValue(1);
        stroke.property("ADBE Stroke-0006").setValue(15);
        stroke.property("ADBE Stroke-0007").setValue(1);
        stroke.name = "TT Stroke";
        stroke.enabled = false;
        app.endUndoGroup();
        var info_txt = "";
        var wi = new Window("palette");
        wi.text = "Retrack";
        wi.add("group");
        wi.alignment = ["fill", "top"];
        wi.frameLocation = track_fr;
        wi.maximumSize.width = 230;
        var info_grp = wi.add("group");
        info_grp.alignment = ["fill", "top"];
        var info_txt = info_grp.add("statictext", undefined, "", {
          multiline: true,
        });
        info_txt.alignment = ["fill", "top"];
        info_txt.size = [10, 52];
        var points_pnl = wi.add("panel");
        points_pnl.alignment = ["fill", "top"];
        var points_grp = points_pnl.add("group");
        points_grp.orientation = "row";
        points_grp.alignment = ["fill", "top"];
        var pt_txt = points_grp.add("statictext", undefined, "Points");
        pt_txt.alignment = ["left", "top"];
        pt_txt.size = [35, 20];
        var pt_color_bt = points_grp.add("iconbutton", undefined, undefined, {
          name: "pt_color_bt",
          style: "toolbutton",
        });
        pt_color_bt.alignment = ["left", "top"];
        pt_color_bt.size = [20, 20];
        pt_color_bt.fillBrush = pt_color_bt.graphics.newBrush(
          pt_color_bt.graphics.BrushType.SOLID_COLOR,
          pt_color,
        );
        pt_color_bt.onDraw = customDraw;
        var mk_txt = points_grp.add("statictext", undefined, "Masks");
        mk_txt.alignment = ["right", "top"];
        mk_txt.size = [35, 20];
        var mk_color_bt = points_grp.add("iconbutton", undefined, undefined, {
          name: "mk_color_bt",
          style: "toolbutton",
        });
        mk_color_bt.alignment = ["right", "top"];
        mk_color_bt.size = [20, 20];
        mk_color_bt.fillBrush = mk_color_bt.graphics.newBrush(
          mk_color_bt.graphics.BrushType.SOLID_COLOR,
          mk_color,
        );
        mk_color_bt.onDraw = customDraw;
        var pt_size_grp = points_pnl.add("group");
        pt_size_grp.orientation = "row";
        pt_size_grp.alignment = ["fill", "top"];
        pt_size_txt = pt_size_grp.add("statictext", undefined, "Pts");
        pt_size_txt.alignment = ["left", "top"];
        pt_size_txt.size = [20, 20];
        pt_size_slider = pt_size_grp.add("slider");
        pt_size_slider.alignment = ["fill", "top"];
        pt_size_slider.minvalue = 3;
        pt_size_slider.maxvalue = 30;
        pt_size_val = pt_size_grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        pt_size_val.alignment = ["right", "top"];
        pt_size_val.size = [25, 20];
        pt_size_slider.value = pt_size_value;
        pt_size_val.text = pt_size_value;
        var sk_size_grp = points_pnl.add("group");
        sk_size_grp.orientation = "row";
        sk_size_grp.alignment = ["fill", "top"];
        sk_size_txt = sk_size_grp.add("statictext", undefined, "Mks");
        sk_size_txt.alignment = ["left", "top"];
        sk_size_txt.size = [20, 20];
        sk_size_slider = sk_size_grp.add("slider");
        sk_size_slider.alignment = ["fill", "top"];
        sk_size_slider.minvalue = 3;
        sk_size_slider.maxvalue = 30;
        sk_size_val = sk_size_grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        sk_size_val.alignment = ["right", "top"];
        sk_size_val.size = [25, 20];
        sk_size_slider.value = sk_size_value;
        sk_size_val.text = sk_size_value;
        var bg_opa_grp = points_pnl.add("group");
        bg_opa_grp.orientation = "row";
        bg_opa_grp.alignment = ["fill", "top"];
        bg_opa_txt = bg_opa_grp.add("statictext", undefined, "Opa");
        bg_opa_txt.alignment = ["left", "top"];
        bg_opa_txt.size = [20, 20];
        bg_opa_slider = bg_opa_grp.add("slider");
        bg_opa_slider.alignment = ["fill", "top"];
        bg_opa_slider.minvalue = 30;
        bg_opa_slider.maxvalue = 70;
        bg_opa_val = bg_opa_grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        bg_opa_val.alignment = ["right", "top"];
        bg_opa_val.size = [25, 20];
        bg_opa_slider.value = bg_opa_value;
        bg_opa_val.text = bg_opa_value;
        var track_grp = wi.add("panel", undefined, "Retrack");
        track_grp.orientation = "column";
        track_grp.alignment = ["fill", "top"];
        track_sub_grp = track_grp.add("group");
        track_sub_grp.orientation = "row";
        track_sub_grp.alignment = ["fill", "top"];
        select_bt = track_sub_grp.add("button", undefined, "Select");
        select_bt.alignment = ["fill", "top"];
        select_bt.size = [44, 24];
        track_bt = track_sub_grp.add("button", undefined, "ReTrack");
        track_bt.alignment = ["fill", "top"];
        track_bt.enabled = false;
        track_bt.size = [48, 24];
        done_bt = track_sub_grp.add("button", undefined, "Done");
        done_bt.alignment = ["fill", "top"];
        done_bt.enabled = false;
        done_bt.size = [34, 24];
        var convert_grp = wi.add("panel", undefined, "Convert");
        convert_grp.orientation = "row";
        convert_grp.alignment = ["fill", "top"];
        choose_bt = convert_grp.add("button", undefined, "Choose");
        choose_bt.alignment = ["fill", "top"];
        choose_bt.enabled = true;
        choose_bt.size = [48, 24];
        convert_bt = convert_grp.add("button", undefined, "Convert");
        convert_bt.alignment = ["fill", "top"];
        convert_bt.enabled = false;
        convert_bt.size = [48, 24];
        var set_pnl = wi.add("panel");
        set_pnl.orientation = "column";
        set_pnl.alignment = ["fill", "top"];
        var track_grp = set_pnl.add("group");
        track_grp.orientation = "column";
        track_grp.alignment = ["fill", "top"];
        var set_txt = track_grp.add("statictext", undefined, "", {
          multiline: true,
        });
        set_txt.alignment = ["fill", "top"];
        set_txt.size = [140, 16];
        set_txt.text = "At least 1 retracked mask";
        var set_drop = track_grp.add("dropdownlist", undefined, [
          "Masks",
          "Corner Pin",
          "Transform Null",
          "Effects Properties",
          "Tracker Points",
          "Nulls",
          "3D Nulls",
        ]);
        set_drop.alignment = ["fill", "top"];
        set_drop.size = [80, 20];
        set_drop.selection = 0;
        set_grp = set_pnl.add("group");
        set_grp.orientation = "row";
        set_grp.alignment = ["fill", "top"];
        var set_bt = set_grp.add("button", undefined, "Set");
        set_bt.alignment = ["fill", "top"];
        set_bt.size = [80, 24];
        var new_chk = set_pnl.add("checkbox", undefined, "Set on a new layer");
        new_chk.alignment = ["center", "top"];
        new_chk.size = [120, 16];
        new_chk.value = true;
        set_pnl.enabled = false;
        info_txt.text = "Draw and select masks to track.";
        pt_color_bt.onClick = function () {
          app.beginUndoGroup("Set New Points Color");
          pt_color = colorpicker();
          if (pt_color === null) {
            return;
          }
          pt_color_bt.fillBrush = pt_color_bt.graphics.newBrush(
            pt_color_bt.graphics.BrushType.SOLID_COLOR,
            pt_color,
          );
          this.notify("onDraw");
          bg.color = pt_color;
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            var suf = lr.name.slice(0, 9);
            var name = lr.name.slice(9);
            var num = Number(name);
            if (suf.toString() == "RT Track " && isNaN(num) === false) {
              lr.source.mainSource.color = pt_color;
            }
          }
          app.endUndoGroup();
        };
        mk_color_bt.onClick = function () {
          app.beginUndoGroup("Set New Masks Color");
          mk_color = colorpicker();
          if (mk_color === null) {
            return;
          }
          mk_color_bt.fillBrush = mk_color_bt.graphics.newBrush(
            mk_color_bt.graphics.BrushType.SOLID_COLOR,
            mk_color,
          );
          this.notify("onDraw");
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            if (lr.name == "Selected Masks") {
              lr.effect
                .property(1)
                .property("ADBE Stroke-0002")
                .setValue(mk_color);
              for (var ae = lr.effect.numProperties; ae > 0; ae--) {
                var fx = lr.effect.property(ae);
                if (fx.matchName == "ADBE Circle") {
                  fx.property("ADBE Circle-0010").setValue(mk_color);
                }
              }
            }
            if (lr.name == "Draw masks on this layer.") {
              lr.effect
                .property(1)
                .property("ADBE Stroke-0002")
                .setValue(mk_color);
              for (var ae = lr.effect.numProperties; ae > 0; ae--) {
                var fx = lr.effect.property(ae);
                if (fx.matchName == "ADBE Circle") {
                  fx.property("ADBE Circle-0010").setValue(mk_color);
                }
              }
              if (lr.mask.numProperties > 0) {
                for (var am3 = 1; am3 <= lr.mask.numProperties; am3 += 1) {
                  var mk3 = lr.mask.property(am3);
                  mk3.color = mk_color;
                }
              }
            }
          }
          app.endUndoGroup();
        };
        pt_size_slider.onChanging = function () {
          pt_size_val.text = parseInt(pt_size_slider.value);
        };
        pt_size_slider.onChange = function () {
          app.beginUndoGroup("Set New Points Size");
          pt_size_value = parseInt(pt_size_slider.value);
          Change_Pt_Size(pt_size_slider.value);
          app.endUndoGroup();
        };
        pt_size_val.onChange = function () {
          app.beginUndoGroup("Set New Points Size");
          pt_size_value = parseInt(parseFloat(pt_size_val.text));
          if (pt_size_value < 3) {
            pt_size_value = 3;
          }
          if (pt_size_value > 30) {
            pt_size_value = 30;
          }
          pt_size_slider.value = pt_size_value;
          pt_size_val.text = pt_size_value;
          Change_Pt_Size(pt_size_value);
          app.endUndoGroup();
        };
        sk_size_slider.onChanging = function () {
          sk_size_val.text = parseInt(sk_size_slider.value);
        };
        sk_size_slider.onChange = function () {
          app.beginUndoGroup("Set New Masks Size");
          sk_size_value = parseInt(sk_size_slider.value);
          Change_Sk_Size(sk_size_slider.value);
          app.endUndoGroup();
        };
        sk_size_val.onChange = function () {
          app.beginUndoGroup("Set New Masks Size");
          sk_size_value = parseInt(parseFloat(sk_size_val.text));
          if (sk_size_value < 3) {
            sk_size_value = 3;
          }
          if (sk_size_value > 30) {
            sk_size_value = 30;
          }
          sk_size_slider.value = sk_size_value;
          sk_size_val.text = sk_size_value;
          Change_Sk_Size(sk_size_value);
          app.endUndoGroup();
        };
        bg_opa_slider.onChanging = function () {
          bg_opa_val.text = parseInt(bg_opa_slider.value);
        };
        bg_opa_slider.onChange = function () {
          app.beginUndoGroup("Set New Background Opacity");
          bg_opa_value = parseInt(bg_opa_slider.value);
          Change_bg_opa(bg_opa_slider.value);
          app.endUndoGroup();
        };
        bg_opa_val.onChange = function () {
          app.beginUndoGroup("Set New Background Opacity");
          bg_opa_value = parseInt(parseFloat(bg_opa_val.text));
          if (bg_opa_value < 30) {
            bg_opa_value = 30;
          }
          if (bg_opa_value > 70) {
            bg_opa_value = 70;
          }
          bg_opa_slider.value = bg_opa_value;
          bg_opa_val.text = bg_opa_value;
          Change_bg_opa(bg_opa_value);
          app.endUndoGroup();
        };
        set_drop.onChange = function () {
          if (set_drop.selection.text == "Corner Pin") {
            set_txt.text = "4 points retracked mask";
            new_chk.text = "Create checker";
          } else {
            new_chk.text = "Set on a new layer";
          }
          if (set_drop.selection.text == "Masks") {
            set_txt.text = "At least 1 retracked mask";
          }
          if (set_drop.selection.text == "Transform Null") {
            set_txt.text = "2 points retracked mask";
          }
          if (set_drop.selection.text == "Effect Property") {
            set_txt.text = "1 point retracked mask";
          }
          if (set_drop.selection.text == "Tracker Points") {
            set_txt.text = "At least 1 retracked mask";
          }
          if (set_drop.selection.text == "Nulls") {
            set_txt.text = "At least 1 retracked mask";
          }
        };
        select_bt.onClick = function () {
          Select();
        };
        track_bt.onClick = function () {
          Track();
        };
        done_bt.onClick = function () {
          set_pnl.enabled = true;
          info_txt.text = "Select masks or Draw new masks or Set a new output.";
          app.beginUndoGroup("Tracking Done");
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = 0; ap < main.layers.length; ap += 1) {
            var lr = main.layer(ap + 1);
            if (lr.selected) {
              lr.selected = false;
            }
          }
          for (var ap = 0; ap < locked.length; ap += 1) {
            main.layer(locked[ap]).locked = false;
          }
          select_bt.enabled = true;
          track_bt.enabled = false;
          done_bt.enabled = false;
          convert_bt.enabled = true;
          bg.locked = false;
          bg.selected = true;
          bg.effect.property(1).enabled = false;
          for (var ae = bg.effect.numProperties; ae > 0; ae--) {
            if (ae > 1) {
              var fx = bg.effect.property(ae);
              fx.remove();
            }
          }
          mselarr = [];
          app.endUndoGroup();
        };
        choose_bt.onClick = function () {
          var mks = bg.mask;
          for (var am = mks.numProperties; am > 0; am--) {
            var mk = mks.property(am);
            mk.remove();
          }
          choose_bt.text = "Rechoose";
          bg.enabled = false;
          bg.locked = true;
          convert_bt.enabled = true;
          info_txt.text =
            "Select Points to convert. \nNo selection = all selected. \nThen click on Convert button.";
          select_bt.enabled = false;
        };
        convert_bt.onClick = function () {
          var sdata = fdata.slice(fdata);
          var data2 = [];
          for (var ap = 0; ap < main.layers.length; ap += 1) {
            var lr = main.layer(ap + 1);
            var suf = lr.name.slice(0, 9);
            var name = lr.name.slice(9);
            var num = Number(name);
            if (suf.toString() == "RT Track " && isNaN(num) === false) {
              if (lr.selected) {
                data2.push(sdata[num]);
              }
            }
          }
          sdata = data2.slice(data2);
          if (data2.length == 0) {
            sdata = fdata.slice(fdata);
          }
          set_pnl.enabled = true;
          info_txt.text = "Set a new output or Choose again.";
          app.beginUndoGroup("Convert Tracked Data");
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = 0; ap < main.layers.length; ap += 1) {
            var lr = main.layer(ap + 1);
            if (lr.selected) {
              lr.selected = false;
            }
          }
          for (var ap = 0; ap < locked.length; ap += 1) {
            main.layer(locked[ap]).locked = false;
          }
          bg.locked = false;
          bg.selected = true;
          bg.effect.property(1).enabled = false;
          for (var ae = bg.effect.numProperties; ae > 0; ae--) {
            if (ae > 1) {
              var fx = bg.effect.property(ae);
              fx.remove();
            }
          }
          var mks = bg.mask;
          var m1 = mks.addProperty("ADBE Mask Atom");
          m1.maskMode = MaskMode.NONE;
          var s = m1.property(1);
          var val = s.value;
          val.vertices = [
            [0, 0],
            [1, 1],
          ];
          val.inTangents = [
            [0, 0],
            [0, 0],
          ];
          val.outTangents = [
            [0, 0],
            [0, 0],
          ];
          s.setValue(val);
          m1 = mks.property(1);
          var tchk = false;
          for (var at = 0; at < times.length; at += 1) {
            if (times[at].toString() == ct.toString()) {
              var akr = at;
              tchk = true;
              break;
            }
          }
          if (tchk !== true) {
            akr = 0;
          }
          var cv = [];
          for (var at = 0; at < sdata.length; at += 1) {
            cv.push(sdata[at][1][akr]);
          }
          var c = Get_Polygon_Centroid(cv);
          var angles = [];
          for (var at = 0; at < sdata.length; at += 1) {
            var vx = sdata[at][1][akr][0];
            var vy = sdata[at][1][akr][1];
            var dx = vx - c[0];
            var dy = vy - c[1];
            var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
            angles.push([at, angle]);
          }
          angles.sort(function (a, b) {
            return b[1] < a[1];
          });
          var cdata = [];
          for (var at = 0; at < angles.length; at += 1) {
            var ref = angles[at][0];
            cdata[at] = sdata[ref].slice(sdata[ref]);
          }
          var vals = [];
          for (var ak = 0; ak < cdata[0][0].length; ak += 1) {
            var ver = [];
            var tin = [];
            var tout = [];
            for (var ad = 0; ad < cdata.length; ad += 1) {
              var ts = cdata[ad][0];
              var vs = cdata[ad][1];
              var t = ts[ak];
              var v = [vs[ak][0], vs[ak][1]];
              ver.push(v);
              tin.push([0, 0]);
              tout.push([0, 0]);
            }
            var val = s.value;
            val.vertices = ver;
            val.inTangents = tin;
            val.outTangents = tout;
            vals.push(val);
          }
          s.setValuesAtTimes(cdata[0][0], vals);
          m1.selected = false;
          data = cdata.slice(cdata);
          set_drop.selection = 5;
          app.endUndoGroup();
        };
        set_bt.onClick = function () {
          function Convert_Mks_Data(bgms, multi) {
            var mks_tracks = [];
            if (bgms && bgms.numProperties > 0) {
              for (var am = 0; am < bgms.numProperties; am += 1) {
                var m = bgms.property(am + 1);
                var mdata = Get_Mask_Data(m, false, type, multi);
                mks_tracks = mks_tracks.concat(mdata);
              }
            }
            return mks_tracks;
          }
          if (data.length > 0) {
            var times = data[0][0];
            var bgms = bg.property("ADBE Mask Parade");
            var nump = bgms.numProperties;
            if (set_drop.selection.text == "Masks") {
              app.beginUndoGroup("Set Tracked Data");
              bg.locked = false;
              if (main.selectedLayers.length > 1) {
                for (var am = main.selectedLayers.length - 1; am >= 0; am--) {
                  main.selectedLayers[am].selected = false;
                }
              }
              main.openInViewer();
              bg.selected = true;
              for (var am = nump; am > 0; am--) {
                bg.mask.property(am).selected = true;
              }
              if (nump > 0) {
                app.executeCommand(19);
              }
              Remove();
              bg.source.remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              if (nump > 0) {
                if (vari) {
                  Target_Layer(new_chk.value, times);
                } else {
                  if (new_chk.value) {
                    var dupli = sl.duplicate();
                    sl.selected = false;
                    var masks = dupli.property("ADBE Mask Parade");
                    if (masks && masks.numProperties > 0) {
                      for (var am = masks.numProperties; am > 0; am--) {
                        var m = masks.property(am);
                        m.remove();
                      }
                    }
                  } else {
                    var dupli = sl;
                  }
                  dupli.selected = true;
                  ct = app.project.activeItem.time;
                  var stt = times[0];
                  if (stt < 0) {
                    stt = 0;
                  }
                  app.project.activeItem.time = stt;
                  app.executeCommand(20);
                  app.project.activeItem.time = ct;
                  var ssl = app.project.activeItem.selectedLayers[0];
                  var mk = ssl.mask;
                  for (var am = 1; am <= mk.numProperties; am += 1) {
                    var m = mk.property(am);
                    m.name = "ReTrack " + m.name;
                  }
                }
              } else {
                Reselect(sel);
              }
              closed = true;
              wi.close();
            }
            if (set_drop.selection.text == "Corner Pin") {
              app.beginUndoGroup("Set New Retracked Elements");
              var mdatas = [];
              for (var am = 0; am < bgms.numProperties; am += 1) {
                var m = bgms.property(am + 1);
                var mdata = Get_Mask_Data(m, false, type, multi);
                if (
                  bgms.property(am + 1).property(1).value.vertices.length == 4
                ) {
                  mdatas.push(mdata);
                }
              }
              if (mdatas.length == nump) {
                Remove();
                bg.source.remove();
                for (var ap = 0; ap < locked.length; ap += 1) {
                  main.layer(locked[ap]).locked = false;
                }
                for (var am = 0; am < mdatas.length; am += 1) {
                  var mdata = mdatas[am];
                  var times = mdata[0][0];
                  var tchk = false;
                  for (var at = 0; at < times.length; at += 1) {
                    if (times[at].toString() == ct.toString()) {
                      var akr = at;
                      tchk = true;
                      break;
                    }
                  }
                  if (tchk !== true) {
                    akr = 0;
                  }
                  var cv = [];
                  for (var at = 0; at < mdata.length; at += 1) {
                    cv.push(mdata[at][1][akr]);
                  }
                  var c = Get_Polygon_Centroid(cv);
                  var angles = [];
                  for (var at = 0; at < mdata.length; at += 1) {
                    var vx = mdata[at][1][akr][0];
                    var vy = mdata[at][1][akr][1];
                    var dx = vx - c[0];
                    var dy = vy - c[1];
                    var angle =
                      -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
                    angles.push([at, angle]);
                  }
                  angles.sort(function (a, b) {
                    return b[1] < a[1];
                  });
                  var cdata = [];
                  for (var at = 0; at < angles.length; at += 1) {
                    var ref = angles[at][0];
                    cdata[at] = mdata[ref][1].slice(mdata[ref][1]);
                  }
                  var dr =
                    times[times.length - 1] -
                    times[0] +
                    app.project.activeItem.frameDuration;
                  var ts = app.project.activeItem.layers.addSolid(
                    [1, 1, 1],
                    "Retrack Pin Solid",
                    cw,
                    ch,
                    1,
                    dr,
                  );
                  ts.moveBefore(sl);
                  var ind = ts.index;
                  main.layers.precompose([ind], "RE_CORNERS_ ", true);
                  var ts = app.project.activeItem.layer(ind);
                  var id = ts.source.id;
                  ts.source.name = ts.source.name + id;
                  var til = ts.source.layer(1);
                  til.startTime = times[0];
                  if (set_drop.selection.text == "Corner Pin") {
                    var fx = til.effect;
                    fx.addProperty("ADBE Checkerboard");
                    var checker = fx.property(1);
                    checker.property("ADBE Checkerboard-0002").setValue(3);
                    checker
                      .property("ADBE Checkerboard-0004")
                      .setValue(parseInt(cw / 8));
                    checker
                      .property("ADBE Checkerboard-0005")
                      .setValue(parseInt(ch / 8));
                  } else {
                    til.source.remove();
                  }
                  var cfx = ts
                    .property("ADBE Effect Parade")
                    .addProperty("CC Power Pin");
                  cfx.name = "ReTrack Pin";
                  cfx
                    .property("CC Power Pin-0002")
                    .setValuesAtTimes(times, cdata[3]);
                  cfx
                    .property("CC Power Pin-0003")
                    .setValuesAtTimes(times, cdata[0]);
                  cfx
                    .property("CC Power Pin-0004")
                    .setValuesAtTimes(times, cdata[2]);
                  cfx
                    .property("CC Power Pin-0005")
                    .setValuesAtTimes(times, cdata[1]);
                  cfx.selected = true;
                }
                closed = true;
                wi.close();
              } else {
                alert(
                  "To generate corner pin please draw and retrack a 4 points mask.",
                );
              }
            }
            if (set_drop.selection.text == "Transform Null") {
              app.beginUndoGroup("Set New Retracked Elements");
              var mdata = Convert_Mks_Data(bgms);
              if (mdata.length == 2) {
                function Transform_Null(sl, mdata) {
                  var times = mdata[0][0];
                  var tchk = false;
                  for (var at = 0; at < times.length; at += 1) {
                    if (times[at].toString() == ct.toString()) {
                      var akr = at;
                      tchk = true;
                      break;
                    }
                  }
                  if (tchk !== true) {
                    akr = 0;
                  }
                  var anc = [];
                  var pos = [];
                  var sca = [];
                  var rot = [];
                  var p1 = mdata[0][1];
                  var p2 = mdata[1][1];
                  var pos0 = p1[akr];
                  var d0 = p2[akr] - p1[akr];
                  var r0 =
                    -1 * ((Math.atan2(d0[0], d0[1]) * 180) / Math.PI - 180);
                  var ds0 = Math.sqrt(
                    Math.pow(p2[akr][0] - p1[akr][0], 2) +
                      Math.pow(p2[akr][1] - p1[akr][1], 2),
                  );
                  for (var ak = 0; ak < times.length; ak += 1) {
                    var d = p2[ak] - p1[ak];
                    var ds = Math.sqrt(
                      Math.pow(p2[ak][0] - p1[ak][0], 2) +
                        Math.pow(p2[ak][1] - p1[ak][1], 2),
                    );
                    var ancd = pos0 + (p1[ak] - pos0);
                    anc.push(ancd);
                    var posd = [
                      (p1[ak][0] + p2[ak][0]) / 2,
                      (p1[ak][1] + p2[ak][1]) / 2,
                    ];
                    pos.push(posd);
                    var sdx = (Math.abs(ds) / Math.abs(ds0)) * 100;
                    var sdy = sdx;
                    var sd = [sdx, sdy];
                    sca.push(sd);
                    var r = (Math.atan2(d[0], d[1]) * 180) / Math.PI - 180;
                    var rotd = (r0 + r) * -1;
                    rot.push(rotd);
                  }
                  var tn = app.project.activeItem.layers.addNull();
                  tn.moveBefore(sl);
                  tn.source.width = 100;
                  tn.source.height = 100;
                  tn.name = "ReTrack Transform Null";
                  tn.source.name = "TN";
                  var a = tn.anchorPoint;
                  var p = tn.position;
                  var s = tn.scale;
                  var r = tn.rotation;
                  p.setValuesAtTimes(times, pos);
                  s.setValuesAtTimes(times, sca);
                  r.setValuesAtTimes(times, rot);
                  tn.selected = true;
                }
                Remove();
                bg.source.remove();
                for (var ap = 0; ap < locked.length; ap += 1) {
                  main.layer(locked[ap]).locked = false;
                }
                Transform_Null(sl, mdata);
                closed = true;
                wi.close();
              } else {
                alert("To transform please draw and retrack a 2 points mask");
              }
            }
            if (set_drop.selection.text == "Effects Properties") {
              app.beginUndoGroup("Set New Retracked Elements");
              var mdata = Convert_Mks_Data(bgms, true);
              Remove();
              bg.source.remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              closed = true;
              wi.close();
              var target_window = new Window("palette");
              target_window.text = "Target Property";
              var points_radio = target_window.add(
                "staticText",
                undefined,
                "Please select target 2D effects properties",
              );
              var ok_button = target_window.add("button", undefined, "OK");
              ok_button.alignment = ["center", "bottom"];
              for (
                var al = 0;
                al < app.project.activeItem.layers.length;
                al += 1
              ) {
                var lr = app.project.activeItem.layers[al + 1];
                lr.selected = false;
              }
              ok_button.onClick = function () {
                if (
                  app.project.activeItem.selectedLayers.length == 1 &&
                  app.project.activeItem.selectedLayers[0] instanceof AVLayer &&
                  app.project.activeItem.selectedLayers[0].threeDLayer === false
                ) {
                  sl = app.project.activeItem.selectedLayers[0];
                  var fxs = sl.effect;
                  var prs = [];
                  var cnt = 0;
                  for (var af = 1; af <= fxs.numProperties; af += 1) {
                    var fx = fxs.property(af);
                    if (fx.selected) {
                      cnt++;
                      for (var ap = 1; ap <= fx.numProperties; ap += 1) {
                        var pr = fx.property(ap);
                        if (pr.propertyValueType !== undefined) {
                          var eot = pr.propertyValueType.toString();
                          eot = parseFloat(eot.slice(-2));
                        } else {
                          var eot = 12;
                        }
                        if (pr.canVaryOverTime && pr.selected && eot == 15) {
                          tpr = pr;
                          prs.push(tpr);
                        }
                      }
                    }
                  }
                  if (mdata.length == prs.length) {
                    for (var ap = 0; ap < prs.length; ap += 1) {
                      var pr = prs[ap];
                      pr.setValuesAtTimes(times, mdata[ap][1]);
                    }
                    target_window.close();
                  } else {
                    alert(
                      "Please select only effects XY properties. One for each mask tracked point.",
                    );
                  }
                }
              };
              target_window.show();
            }
            if (set_drop.selection.text == "Tracker Points") {
              app.beginUndoGroup("Set New Retracked Elements");
              var mdata = Convert_Mks_Data(bgms, true);
              Remove();
              bg.source.remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              if (new_chk.value) {
                var dupli = sl.duplicate();
                dupli.name = sl.name + " duplicate";
              } else {
                var dupli = sl;
              }
              var trackers = dupli.property("ADBE MTrackers");
              var tracker = dupli
                .property("ADBE MTrackers")
                .addProperty("ADBE MTracker");
              tracker.name = "ReTrack " + trackers.numProperties + 1;
              tracker.selected = true;
              for (var at = 0; at < mdata.length; at += 1) {
                var times = mdata[at][0];
                var vals = mdata[at][1];
                var new_point = tracker.addProperty("ADBE MTracker Pt");
                new_point
                  .property("ADBE MTracker Pt Feature Size")
                  .setValue([cw / (factor * 2), cw / (factor * 2)]);
                new_point
                  .property("ADBE MTracker Pt Search Size")
                  .setValue([cw / factor, ch / factor]);
                new_point.name = "Track Point " + tracker.numProperties + 1;
                new_point
                  .property("ADBE MTracker Pt Attach Pt")
                  .setValuesAtTimes(times, vals);
                new_point
                  .property("ADBE MTracker Pt Feature Center")
                  .setValuesAtTimes(times, vals);
              }
              tracker.selected = true;
              dupli.openInViewer();
              closed = true;
              wi.close();
            }
            if (set_drop.selection.text == "Nulls") {
              app.beginUndoGroup("Set New Retracked Elements");
              var mdata = Convert_Mks_Data(bgms, true);
              Remove();
              bg.source.remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              for (var at = 0; at < mdata.length; at += 1) {
                var times = mdata[at][0];
                var vals = mdata[at][1];
                var tn = app.project.activeItem.layers.addNull();
                tn.moveBefore(sl);
                tn.source.width = 20;
                tn.source.height = 20;
                tn.name = "ReTrack Null " + at + 1;
                tn.source.name = "ReTrack Null " + at + 1;
                var tnp = tn.property("Position");
                tnp.setValuesAtTimes(times, vals);
              }
              for (var at = 0; at < mdata.length; at += 1) {
                var n = (app.project.activeItem.layer(
                  sl.index - 1 - at,
                ).selected = true);
              }
              closed = true;
              wi.close();
            }
            if (set_drop.selection.text == "3D Nulls") {
              var chk3d = true;
              for (var at = 0; at < data.length; at += 1) {
                if (data[at][3] != "3d") {
                  chk3d = false;
                  break;
                }
              }
              var chkcam = 0;
              for (var ap = 1; ap <= main.layers.length; ap += 1) {
                if (main.layer(ap) instanceof CameraLayer) {
                  cind = main.layer(ap).index - 1 - data.length;
                  chkcam++;
                }
              }
              if (chk3d && chkcam == 1) {
                app.beginUndoGroup("Set New Retracked Elements");
                var mdata = Convert_Mks_Data(bgms, true);
                Remove();
                bg.source.remove();
                for (var ap = 0; ap < locked.length; ap += 1) {
                  main.layer(locked[ap]).locked = false;
                }
                for (var at = 0; at < data.length; at += 1) {
                  if (data[at][6]) {
                    var ind = data[at][6];
                    var lr = main.layers[ind];
                    lr.selected = true;
                  }
                }
                var lrefs = [];
                for (var at = 0; at < data.length; at += 1) {
                  var svals = data[at][1];
                  for (var av = 0; av < mdata.length; av += 1) {
                    var vals = mdata[av][1];
                    var ts = mdata[av][0];
                    var vchk = true;
                    for (var ak = 0; ak < svals.length; ak += 1) {
                      var t = ts[ak];
                      if (t >= 0 && t < dur) {
                        var v = vals[ak];
                        var sv = svals[ak];
                        var d = Math.sqrt(
                          Math.pow(v[0] - sv[0], 2) + Math.pow(v[1] - sv[1], 2),
                        );
                        if (d > 10) {
                          vchk = false;
                          break;
                        }
                      }
                    }
                    if (vchk) {
                      lrefs.push(data[at]);
                    }
                  }
                }
                for (var ap = 1; ap <= main.layers.length; ap += 1) {
                  if (main.layer(ap) instanceof CameraLayer) {
                    cind = main.layer(ap).index;
                  }
                }
                var atime = main.time;
                main.time = 0;
                var cam = main.layers[cind];
                var exp =
                  "p0 = thisComp.layer(" +
                  cind +
                  ").transform.position.valueAtTime(0);\np = thisComp.layer(" +
                  cind +
                  ").transform.position.valueAtTime(time);\nd = p-p0;\ntransform.position-d";
                var earr = [];
                for (var al = 0; al < lrefs.length; al += 1) {
                  earr[al] = [[], []];
                  if (lrefs[al][6]) {
                    var lind = lrefs[al][6];
                    var lr = main.layers[lind];
                    lr.position.expression = exp;
                    lr.position.selected = true;
                    for (var ak = 0; ak < lrefs[al][0].length; ak += 1) {
                      var tt = lrefs[al][0][ak];
                      var vv = lr.position.valueAtTime(tt, false);
                      earr[al][0].push(tt);
                      earr[al][1].push(vv);
                    }
                    lr.position.expression = "";
                    lr.position.selected = false;
                  }
                }
                cam.position.expression = "thisProperty.valueAtTime(0)";
                main.time = atime;
                for (var at = 0; at < earr.length; at += 1) {
                  var ts = earr[at][0];
                  var vs = earr[at][1];
                  var tn = app.project.activeItem.layers.addNull();
                  tn.threeDLayer = true;
                  tn.moveBefore(sl);
                  tn.source.width = 20;
                  tn.source.height = 20;
                  tn.name = "RT 3D Null " + at + 1;
                  tn.source.name = "RT 3D Null " + at + 1;
                  var tnp = tn.property("Position");
                  tnp.setValuesAtTimes(ts, vs);
                }
                for (var at = 0; at < earr.length; at += 1) {
                  var n = (app.project.activeItem.layer(
                    sl.index - 1 - at,
                  ).selected = true);
                }
                closed = true;
                wi.close();
              } else {
                alert(
                  "Please retrack only 3D layers and make sure 1 camera is present in the composition",
                );
              }
            }
            for (var ap = 1; ap <= main.layers.length; ap += 1) {
              if (main.layer(ap).threeDLayer) {
                main.layer(ap).enabled = true;
              }
            }
            app.endUndoGroup();
          }
        };
        wi.onClose = function () {
          track_fr = wi.frameLocation;
          if (closed === false) {
            try {
              bg;
            } catch (e) {
            } finally {
              app.beginUndoGroup("Cancel Retrack");
              Remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                if (main.layer(ap + 1).name == "Draw masks on this layer.") {
                  main.layer(ap + 1).source.remove();
                }
              }
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              for (var ap = 1; ap <= main.layers.length; ap += 1) {
                if (main.layer(ap).threeDLayer) {
                  main.layer(ap).enabled = true;
                }
              }
              Reselect(sel);
              app.endUndoGroup();
            }
          }
        };
        wi.show();
      }
      function Target_Layer(newl, times) {
        var target_window = new Window("palette");
        target_window.text = "Target Layer";
        var points_radio = target_window.add(
          "staticText",
          undefined,
          "Please Select 1 target 2D video layer and click ok.",
        );
        var ok_button = target_window.add("button", undefined, "OK");
        ok_button.alignment = ["center", "bottom"];
        for (var al = 0; al < app.project.activeItem.layers.length; al += 1) {
          var lr = app.project.activeItem.layers[al + 1];
          lr.selected = false;
        }
        ok_button.onClick = function () {
          if (
            app.project.activeItem.selectedLayers.length == 1 &&
            app.project.activeItem.selectedLayers[0] instanceof AVLayer &&
            app.project.activeItem.selectedLayers[0].threeDLayer === false
          ) {
            sl = app.project.activeItem.selectedLayers[0];
            if (newl) {
              var dupli = sl.duplicate();
              sl.selected = false;
              var masks = dupli.property("ADBE Mask Parade");
              if (masks && masks.numProperties > 0) {
                for (var am = masks.numProperties; am > 0; am--) {
                  var m = masks.property(am);
                  m.remove();
                }
              }
            } else {
              var dupli = sl;
            }
            dupli.selected = true;
            ct = app.project.activeItem.time;
            app.project.activeItem.time = times[0];
            app.executeCommand(20);
            app.project.activeItem.time = ct;
            target_window.close();
          }
        };
        target_window.show();
      }
      function _Quadrilateral_00_Set_Quadrilaterals() {
        function Set_Grid(rows, cols) {
          if (bg.mask.numProperties == 0) {
            var minx = sort_ver.sort(function (a, b) {
              return b[0] < a[0];
            })[0][0];
            var maxx = sort_ver.sort(function (a, b) {
              return b[0] > a[0];
            })[0][0];
            var miny = sort_ver.sort(function (a, b) {
              return b[1] < a[1];
            })[0][1];
            var maxy = sort_ver.sort(function (a, b) {
              return b[1] > a[1];
            })[0][1];
            var m = bg.mask.addProperty("ADBE Mask Atom");
            var s = m.property(1);
            var v = s.value;
            var ver = [];
            ver[0] = [minx, miny];
            ver[1] = [maxx, miny];
            ver[2] = [maxx, maxy];
            ver[3] = [minx, maxy];
            v.vertices = ver;
            s.setValue(v);
            m.selected = true;
          }
          if (bg.mask.numProperties > 0) {
            var inds = [];
            for (var am = 0; am < bg.mask.numProperties; am += 1) {
              var m = bg.mask.property(am + 1);
              if (m.selected) {
                schk = true;
                inds.push(am + 1);
              }
            }
            for (var am = inds.length - 1; am >= 0; am--) {
              var m = bg.mask.property(inds[am]);
              if (schk) {
                var ver = m.property(1).value.vertices;
                var top = ver[1] - ver[0];
                var bot = ver[2] - ver[3];
                var topd = [top[0] / cols, top[1] / cols];
                var botd = [bot[0] / cols, bot[1] / cols];
                var mks = [];
                for (var ac = 0; ac < cols; ac += 1) {
                  var v = [[], [], [], []];
                  v[0] = ver[0] + [topd[0] * ac, topd[1] * ac];
                  v[1] = ver[0] + [topd[0] * (ac + 1), topd[1] * (ac + 1)];
                  v[3] = ver[3] + [botd[0] * ac, botd[1] * ac];
                  v[2] = ver[3] + [botd[0] * (ac + 1), botd[1] * (ac + 1)];
                  mks.push(v);
                }
                for (var am2 = 0; am2 < mks.length; am2 += 1) {
                  var ver = mks[am2];
                  var left = ver[3] - ver[0];
                  var right = ver[2] - ver[1];
                  var leftd = [left[0] / rows, left[1] / rows];
                  var rightd = [right[0] / rows, right[1] / rows];
                  for (var ar = 0; ar < rows; ar += 1) {
                    var v = [[], [], [], []];
                    v[0] = ver[0] + [leftd[0] * ar, leftd[1] * ar];
                    v[3] = ver[0] + [leftd[0] * (ar + 1), leftd[1] * (ar + 1)];
                    v[1] = ver[1] + [rightd[0] * ar, rightd[1] * ar];
                    v[2] =
                      ver[1] + [rightd[0] * (ar + 1), rightd[1] * (ar + 1)];
                    var m2 = bg.mask.addProperty("ADBE Mask Atom");
                    m2.color = [1, 1, 0];
                    m2.maskMode = MaskMode.NONE;
                    var s2 = m2.property(1);
                    var vl = s2.value;
                    vl.vertices = v;
                    s2.setValue(vl);
                  }
                }
              }
            }
          }
          for (var am = inds.length - 1; am >= 0; am--) {
            var m = bg.mask.property(inds[am]);
            m.remove();
          }
          bg.selected = true;
        }
        function Find_Masks(ver, mode, msel) {
          if (mode == "rows") {
            var left = [
              [parseInt(ver[0][0]), parseInt(ver[0][1])],
              [parseInt(ver[3][0]), parseInt(ver[3][1])],
            ];
            var right = [
              [parseInt(ver[1][0]), parseInt(ver[1][1])],
              [parseInt(ver[2][0]), parseInt(ver[2][1])],
            ];
          }
          if (mode == "cols") {
            var top = [
              [parseInt(ver[0][0]), parseInt(ver[0][1])],
              [parseInt(ver[1][0]), parseInt(ver[1][1])],
            ];
            var bot = [
              [parseInt(ver[3][0]), parseInt(ver[3][1])],
              [parseInt(ver[2][0]), parseInt(ver[2][1])],
            ];
          }
          for (var am2 = 0; am2 < bg.mask.numProperties; am2 += 1) {
            var m = bg.mask.property(am2 + 1);
            var s = m.property(1);
            var ver2 = s.value.vertices;
            if (mode == "rows") {
              var left2 = [
                [parseInt(ver2[0][0]), parseInt(ver2[0][1])],
                [parseInt(ver2[3][0]), parseInt(ver2[3][1])],
              ];
              var right2 = [
                [parseInt(ver2[1][0]), parseInt(ver2[1][1])],
                [parseInt(ver2[2][0]), parseInt(ver2[2][1])],
              ];
              if (
                left.toString() == right2.toString() ||
                right.toString() == left2.toString()
              ) {
                if (msel.indexOf(am2) == -1) {
                  msel.push(am2);
                  msel = Find_Masks(ver2, mode, msel);
                }
              }
            }
            if (mode == "cols") {
              var top2 = [
                [parseInt(ver2[0][0]), parseInt(ver2[0][1])],
                [parseInt(ver2[1][0]), parseInt(ver2[1][1])],
              ];
              var bot2 = [
                [parseInt(ver2[3][0]), parseInt(ver2[3][1])],
                [parseInt(ver2[2][0]), parseInt(ver2[2][1])],
              ];
              if (
                top.toString() == bot2.toString() ||
                bot.toString() == top2.toString()
              ) {
                if (msel.indexOf(am2) == -1) {
                  msel.push(am2);
                  msel = Find_Masks(ver2, mode, msel);
                }
              }
            }
          }
          return msel;
        }
        function Remove() {
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            var suf = lr.name.slice(0, 9);
            var name = lr.name.slice(9);
            var num = Number(name);
            if (suf.toString() == "RT Track " && isNaN(num) === false) {
              lr.remove();
            }
          }
        }
        function Common_Vertices() {
          var vsel = [];
          for (var am = 0; am < mselarr.length; am += 1) {
            var m = bg.mask.property(mselarr[am]);
            var ver = m.property(1).valueAtTime(ct, true).vertices;
            for (var av = 0; av < 4; av += 1) {
              var v = ver[av];
              var vchk = false;
              for (var av2 = 0; av2 < vsel.length; av2 += 1) {
                var v2 = vsel[av2];
                if (v.toString() == v2.toString()) {
                  vchk = true;
                  break;
                }
              }
              if (vchk === false) {
                vsel.push(v);
              }
            }
          }
          return vsel;
        }
        var sel = Get_Selection();
        var near = 1;
        ct = app.project.activeItem.time;
        fps = 1 / app.project.activeItem.frameDuration;
        var main = app.project.activeItem;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 200);
        var dur = app.project.activeItem.duration;
        var sl = app.project.activeItem.selectedLayers[0];
        var ind = sl.index;
        var mselarr = [];
        var times = fdata[0][0];
        var vari = false;
        for (var ap = 0; ap < fdata.length; ap += 1) {
          var dtype = fdata[ap][3];
          if (dtype == "2d" || dtype == "3d") {
            vari = true;
            break;
          }
        }
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ndata = [];
        var times = (ndata[0] = fdata[0][0]);
        ndata[1] = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          ndata[1][ak] = [];
          for (var av = 0; av < fdata.length; av += 1) {
            ndata[1][ak][av] = fdata[av][1][ak];
          }
        }
        var ref_ver = ndata[1][akr].slice(ndata[1][akr]);
        var sort_ver = ndata[1][akr].slice(ndata[1][akr]);
        app.beginUndoGroup("Generate Helpers");
        var locked = [];
        for (var ap = 1; ap <= main.layers.length; ap += 1) {
          main.layer(ap).locked = true;
          locked.push(ap);
        }
        var mks = [];
        var el = -1;
        var cnt = -1;
        for (var ap = fdata.length - 1; ap >= 0; ap--) {
          var times = fdata[ap][0];
          var tdata = fdata[ap][1];
          var name = "RT Track " + ap;
          if (fdata[ap].length == 4) {
            if (el == -1) {
              cnt++;
              var oel = fdata[ap][3];
              mks[cnt] = [];
            }
            el = fdata[ap][3];
            if (el == oel) {
              mks[cnt].push(fdata[ap][1]);
            } else {
              oel = el;
              cnt++;
              mks[cnt] = [];
              mks[cnt].push(fdata[ap][1]);
            }
          }
          var nn = app.project.activeItem.layers.addSolid(
            [1, 1, 1],
            name,
            10,
            10,
            1,
            5,
          );
          nn.inPoint = 0;
          nn.outPoint = times[times.length - 1] + 1 / fps;
          nn.transform.position.setValuesAtTimes(times, tdata);
        }
        var bg = app.project.activeItem.layers.addSolid(
          [0, 0, 0],
          "Draw square masks on this layer.",
          cw,
          ch,
          1,
          dur,
        );
        bg.transform.opacity.setValue(40);
        bg.position.expression = JSON.stringify([cw / 2, ch / 2]);
        var size = Math.sqrt(cw * ch) / 1000;
        if (size < 1) {
          size = 1;
        }
        var stroke = bg
          .property("ADBE Effect Parade")
          .addProperty("ADBE Stroke");
        stroke.property("ADBE Stroke-0010").setValue(1);
        stroke.property("ADBE Stroke-0002").setValue([1, 1, 1]);
        stroke.property("ADBE Stroke-0003").setValue(size);
        stroke.property("ADBE Stroke-0004").setValue(0.94);
        stroke.property("ADBE Stroke-0005").setValue(1);
        stroke.property("ADBE Stroke-0006").setValue(15);
        stroke.property("ADBE Stroke-0007").setValue(1);
        stroke.name = "TT Stroke";
        app.endUndoGroup();
        var schk = false;
        var ewin = new Window("palette");
        ewin.text = "Quadrilateral Window";
        var sub_pnl = ewin.add("panel");
        sub_pnl.orientation = "column";
        sub_pnl.alignment = ["fill", "top"];
        var grid_bt = sub_pnl.add("button", undefined, "Grid!");
        grid_bt.alignment = ["fill", "top"];
        var exp_grp = sub_pnl.add("group");
        exp_grp.orientation = "row";
        exp_grp.alignment = ["fill", "top"];
        var row_txt = exp_grp.add("statictext", undefined, "Rows:");
        row_txt.alignment = ["left", "top"];
        var row_etxt = exp_grp.add("edittext", undefined, "2");
        row_etxt.alignment = ["left", "top"];
        row_etxt.size = [40, 25];
        var col_txt = exp_grp.add("statictext", undefined, "Columns:");
        col_txt.alignment = ["right", "top"];
        var col_etxt = exp_grp.add("edittext", undefined, "2");
        col_etxt.alignment = ["right", "top"];
        col_etxt.size = [40, 25];
        row_etxt.active = true;
        var grid_pnl = sub_pnl.add("group");
        grid_pnl.orientation = "row";
        grid_pnl.alignment = ["fill", "top"];
        var rsub_bt = grid_pnl.add("button", undefined, "R");
        rsub_bt.alignment = ["fill", "top"];
        rsub_bt.enabled = false;
        var csub_bt = grid_pnl.add("button", undefined, "C");
        csub_bt.alignment = ["fill", "top"];
        csub_bt.enabled = false;
        var track_grp = ewin.add("group");
        track_grp.orientation = "row";
        track_grp.alignment = ["fill", "top"];
        var select_bt = track_grp.add("button", undefined, "Select");
        select_bt.alignment = ["center", "top"];
        select_bt.enabled = false;
        var track_bt = track_grp.add("button", undefined, "ReTrack");
        track_bt.alignment = ["center", "top"];
        track_bt.enabled = false;
        var done_bt = track_grp.add("button", undefined, "Done");
        done_bt.alignment = ["center", "top"];
        done_bt.enabled = false;
        var new_grp = ewin.add("group");
        new_grp.orientation = "column";
        new_grp.alignment = ["fill", "top"];
        new_grp.enabled = false;
        var set_bt = new_grp.add("button", undefined, "Set");
        set_bt.alignment = ["fill", "top"];
        set_bt.size = [40, 25];
        var new_chk = new_grp.add(
          "checkbox",
          undefined,
          "Set masks on new layer",
        );
        new_chk.alignment = ["center", "top"];
        new_chk.value = true;
        ewin.show();
        rsub_bt.onClick = function () {
          var r = parseInt(row_etxt.text);
          var c = 1;
          var mode = "rows";
          var msel = [];
          app.beginUndoGroup("Subdivide Masks Rows");
          var mks = [];
          for (var am = 0; am < bg.mask.numProperties; am += 1) {
            var m = bg.mask.property(am + 1);
            if (m.selected) {
              var v = m.property(1).value;
              mks.push([am, v.vertices]);
              msel.push(am);
              m.selected = false;
            }
          }
          for (var am = 0; am < mks.length; am += 1) {
            var ver = mks[am][1];
            msel = Find_Masks(ver, mode, msel);
          }
          for (var am = 0; am < msel.length; am += 1) {
            var m = bg.mask.property(msel[am] + 1);
            m.selected = true;
          }
          Set_Grid(r, c);
          app.endUndoGroup();
        };
        csub_bt.onClick = function () {
          var r = 1;
          var c = parseInt(col_etxt.text);
          var mode = "cols";
          var msel = [];
          app.beginUndoGroup("Subdivide Masks Columns");
          var mks = [];
          for (var am = 0; am < bg.mask.numProperties; am += 1) {
            var m = bg.mask.property(am + 1);
            if (m.selected) {
              var v = m.property(1).value;
              mks.push([am, v.vertices]);
              msel.push(am);
              m.selected = false;
            }
          }
          for (var am = 0; am < mks.length; am += 1) {
            var ver = mks[am][1];
            msel = Find_Masks(ver, mode, msel);
          }
          for (var am = 0; am < msel.length; am += 1) {
            var m = bg.mask.property(msel[am] + 1);
            m.selected = true;
          }
          Set_Grid(r, c);
          app.endUndoGroup();
        };
        grid_bt.onClick = function () {
          var r = parseInt(row_etxt.text);
          var c = parseInt(col_etxt.text);
          grid_bt.enabled = false;
          select_bt.enabled = true;
          rsub_bt.enabled = true;
          csub_bt.enabled = true;
          new_grp.enabled = true;
          app.beginUndoGroup("Add Masks Grid");
          Set_Grid(r, c);
          app.endUndoGroup();
        };
        select_bt.onClick = function () {
          if (main.selectedLayers[0] == bg && bg.mask.numProperties > 0) {
            var schk = false;
            for (var am = 1; am <= bg.mask.numProperties; am += 1) {
              var m = bg.mask.property(am);
              if (m.selected) {
                var schk = true;
                break;
              }
            }
            mselarr = [];
            app.beginUndoGroup("Select Masks To ReTrack");
            if (main.layer(1).name == "Selected Masks") {
              main.layer(1).locked = false;
              main.layer(1).remove();
            }
            if (schk) {
              for (var am = 1; am <= bg.mask.numProperties; am += 1) {
                var m = bg.mask.property(am);
                if (m.selected) {
                  mselarr.push(am);
                }
              }
            } else {
              for (var am = 1; am <= bg.mask.numProperties; am += 1) {
                var m = bg.mask.property(am);
                mselarr.push(am);
              }
            }
            var bgsel = bg.duplicate();
            for (var am = bgsel.mask.numProperties; am > 0; am--) {
              var m = bgsel.mask.property(am);
              if (mselarr.indexOf(am) == -1) {
                m.remove();
              }
            }
            bgsel.effect
              .property(1)
              .property("ADBE Stroke-0002")
              .setValue([1, 1, 0]);
            bgsel.effect.property(1).property("ADBE Stroke-0007").setValue(2);
            bgsel.name = "Selected Masks";
            bgsel.selected = false;
            bgsel.locked = true;
            bg.selected = false;
            bg.locked = true;
            select_bt.enabled = false;
            track_bt.enabled = true;
            done_bt.enabled = true;
            app.endUndoGroup();
          }
        };
        track_bt.onClick = function () {
          main.layer("Selected Masks").locked = false;
          main.layer("Selected Masks").remove();
          if (main.selectedLayers.length > 0) {
            var data2 = [];
            for (var ap = 0; ap < main.layers.length; ap += 1) {
              var lr = main.layer(ap + 1);
              var suf = lr.name.slice(0, 9);
              var name = lr.name.slice(9);
              var num = Number(name);
              if (suf.toString() == "RT Track " && isNaN(num) === false) {
                data2.push(fdata[num]);
              }
            }
            data = data2.slice(data2);
          } else {
            data = fdata.slice(fdata);
          }
          type = "tri";
          var vsel = Common_Vertices();
          app.beginUndoGroup("Track Quadrilaterals");
          var m = bg.mask.addProperty("ADBE Mask Atom");
          m.selected;
          m.maskMode = MaskMode.NONE;
          var s = m.property("ADBE Mask Shape");
          var v = s.value;
          var ver = [];
          var tin = [];
          var tout = [];
          for (var av = 0; av < vsel.length; av += 1) {
            ver[av] = vsel[av];
            tin.push([0, 0]);
            tout.push([0, 0]);
          }
          v.vertices = ver;
          v.inTangents = tin;
          v.outTangents = tout;
          s.setValue(v);
          m.selected = true;
          var mks = [];
          for (var am = 0; am < bg.mask.numProperties; am += 1) {
            var mk = bg.mask.property(am + 1);
            if (mk.selected) {
              mks.push([v, true]);
            } else {
              mks.push([v, false]);
            }
          }
          var xmks = _Retrack_01_Convert_To_Data(mks, type, false);
          _Retrack_02_Set_Mask(bg, xmks);
          var verts = [];
          for (var ak = 0; ak < s.numKeys; ak += 1) {
            var ver = s.keyValue(ak + 1).vertices;
            for (var av = 0; av < ver.length; av += 1) {
              if (ak == 0) {
                verts[av] = [];
              }
              verts[av][ak] = ver[av];
            }
          }
          m.remove();
          var mcom = [];
          for (var am = 0; am < bg.mask.numProperties; am += 1) {
            mcom[am] = [];
            var m = bg.mask.property(am + 1);
            var s = m.property(1);
            var val = s.valueAtTime(ct, true);
            var ver = val.vertices;
            for (var av = 0; av < 4; av += 1) {
              var v = ver[av];
              var vchk = false;
              for (var av2 = 0; av2 < verts.length; av2 += 1) {
                var v2 = verts[av2][akr];
                if (v.toString() == v2.toString()) {
                  var vref = verts[av2];
                  vchk = true;
                  break;
                }
              }
              if (vchk) {
                mcom[am][av] = vref;
              } else {
                mcom[am][av] = false;
              }
            }
          }
          for (var am = 0; am < bg.mask.numProperties; am += 1) {
            var m = bg.mask.property(am + 1);
            var s = m.property(1);
            var mvals = [];
            for (var ak = 0; ak < times.length; ak += 1) {
              var val = s.valueAtTime(times[ak], true);
              var ver = [];
              var tin = [];
              var tout = [];
              var vert = val.vertices;
              for (var av = 0; av < 4; av += 1) {
                if (mcom[am][av] !== false) {
                  ver[av] = mcom[am][av][ak];
                  tin.push([0, 0]);
                  tout.push([0, 0]);
                } else {
                  ver[av] = vert[av];
                  tin.push([0, 0]);
                  tout.push([0, 0]);
                }
              }
              val.vertices = ver;
              val.inTangents = tin;
              val.outTangents = tout;
              mvals.push(val);
            }
            s.setValuesAtTimes(times, mvals);
          }
          var bgsel = bg.duplicate();
          bgsel.locked = false;
          for (var am = bgsel.mask.numProperties; am > 0; am--) {
            var m = bgsel.mask.property(am);
            if (mselarr.indexOf(am) == -1) {
              m.remove();
            }
          }
          bgsel.effect
            .property(1)
            .property("ADBE Stroke-0002")
            .setValue([1, 1, 0]);
          bgsel.effect.property(1).property("ADBE Stroke-0007").setValue(2);
          bgsel.name = "Selected Masks";
          bgsel.selected = false;
          bgsel.locked = true;
          bg.selected = false;
          app.endUndoGroup();
        };
        done_bt.onClick = function () {
          app.beginUndoGroup("Track Quadrilaterals Confirm");
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = 0; ap < main.layers.length; ap += 1) {
            var lr = main.layer(ap + 1);
            if (lr.selected) {
              lr.selected = false;
            }
          }
          mselarr = [];
          select_bt.enabled = true;
          track_bt.enabled = false;
          done_bt.enabled = false;
          bg.locked = false;
          bg.selected = true;
          app.endUndoGroup();
        };
        set_bt.onClick = function () {
          if (data.length > 0) {
            ewin.close();
            main.openInViewer();
            var sell = main.layer(1);
            if (sell.source.name == "Draw square masks on this layer.") {
              app.beginUndoGroup("Remove Helpers");
              bg.selected = true;
              var mlen = bg.mask.numProperties;
              for (var am = bg.mask.numProperties; am > 0; am--) {
                var m = bg.mask.property(am);
                m.selected = true;
              }
              app.executeCommand(19);
              Remove();
              bg.source.remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              app.endUndoGroup();
              if (mlen > 0) {
                function Complete_Multi() {
                  if (new_chk.value) {
                    var dp = sl.duplicate();
                    sl.selected = false;
                    dp.selected = true;
                    for (var am = dp.mask.numProperties; am > 0; am--) {
                      var m = dp.mask.property(am);
                      m.remove();
                    }
                  } else {
                    var dp = sl;
                  }
                  app.project.activeItem.time = times[0];
                  app.executeCommand(20);
                  app.project.activeItem.time = ct;
                }
                if (vari) {
                  var target_window = new Window("palette");
                  target_window.text = "Target Layer";
                  var points_radio = target_window.add(
                    "staticText",
                    undefined,
                    "Please Select 1 target 2D video layer and click ok.",
                  );
                  var ok_button = target_window.add("button", undefined, "OK");
                  ok_button.alignment = ["center", "bottom"];
                  for (
                    var al = 0;
                    al < app.project.activeItem.layers.length;
                    al += 1
                  ) {
                    var lr = app.project.activeItem.layers[al + 1];
                    lr.selected = false;
                  }
                  ok_button.onClick = function () {
                    if (
                      app.project.activeItem.selectedLayers.length == 1 &&
                      app.project.activeItem.selectedLayers[0] instanceof
                        AVLayer &&
                      app.project.activeItem.selectedLayers[0].threeDLayer ===
                        false
                    ) {
                      app.beginUndoGroup("Set Quadrilaterals");
                      sl = app.project.activeItem.selectedLayers[0];
                      sl.selected = true;
                      target_window.close();
                      Complete_Multi();
                      _Multi_Pins_00_Set_Multi();
                      app.endUndoGroup();
                    }
                  };
                  target_window.show();
                } else {
                  app.beginUndoGroup("Set Quadrilaterals");
                  var sl = app.project.activeItem.layer(ind);
                  sl.selected = true;
                  Complete_Multi();
                  _Multi_Pins_00_Set_Multi();
                  app.endUndoGroup();
                }
              } else {
                var sl = app.project.activeItem.layer(ind);
                app.beginUndoGroup("Set Quadrilaterals");
                sl.selected = true;
                _Multi_Pins_00_Set_Multi();
                app.endUndoGroup();
              }
            }
          }
        };
        ewin.onClose = function () {
          var sell = main.layer(1);
          if (sell.source.name == "Draw square masks on this layer.") {
            app.beginUndoGroup("Remove Helpers");
            bg.selected = true;
            var mlen = bg.mask.numProperties;
            for (var am = bg.mask.numProperties; am > 0; am--) {
              var m = bg.mask.property(am);
              m.selected = true;
            }
            app.executeCommand(19);
            Remove();
            bg.source.remove();
            for (var ap = 0; ap < locked.length; ap += 1) {
              main.layer(locked[ap]).locked = false;
            }
            for (var ap = 0; ap < locked.length; ap += 1) {
              main.layer(locked[ap]).locked = false;
            }
            Reselect(sel);
            app.endUndoGroup();
          }
        };
      }
      function _Puppet_Warp_00_Set_Puppet() {
        function Remove() {
          if (main.layer(1).name == "Selected Masks") {
            main.layer(1).locked = false;
            main.layer(1).remove();
          }
          for (var ap = main.layers.length; ap > 0; ap--) {
            var lr = main.layer(ap);
            var suf = lr.name.slice(0, 7);
            var name = lr.name.slice(7);
            var num = Number(name);
            if (suf.toString() == "RP Pin " && isNaN(num) === false) {
              lr.source.remove();
            }
          }
        }
        var near = 1;
        var sel = Get_Selection();
        ct = app.project.activeItem.time;
        fps = 1 / app.project.activeItem.frameDuration;
        var main = app.project.activeItem;
        var times = fdata[0][0].slice(fdata[0][0]);
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 200);
        var dur = app.project.activeItem.duration;
        var sl = app.project.activeItem.selectedLayers[0];
        var ind = sl.index;
        var pselarr = [];
        var closed = false;
        var times = fdata[0][0];
        var vari = false;
        for (var ap = 0; ap < fdata.length; ap += 1) {
          var dtype = fdata[ap][3];
          if (dtype == "2d" || dtype == "3d") {
            vari = true;
            break;
          }
        }
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        var ndata = [];
        var times = (ndata[0] = fdata[0][0]);
        ndata[1] = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          ndata[1][ak] = [];
          for (var av = 0; av < fdata.length; av += 1) {
            ndata[1][ak][av] = fdata[av][1][ak];
          }
        }
        var ref_ver = ndata[1][akr].slice(ndata[1][akr]);
        var sort_ver = ndata[1][akr].slice(ndata[1][akr]);
        app.beginUndoGroup("BG Layer");
        var locked = [];
        for (var ap = 1; ap <= main.layers.length; ap += 1) {
          main.layer(ap).locked = true;
          locked.push(ap);
        }
        var mks = [];
        var el = -1;
        var cnt = -1;
        for (var ap = fdata.length - 1; ap >= 0; ap--) {
          var times = fdata[ap][0];
          var tdata = fdata[ap][1];
          var name = "RP Pin " + ap;
          if (fdata[ap].length == 4) {
            if (el == -1) {
              cnt++;
              var oel = fdata[ap][3];
              mks[cnt] = [];
            }
            el = fdata[ap][3];
            if (el == oel) {
              mks[cnt].push(fdata[ap][1]);
            } else {
              oel = el;
              cnt++;
              mks[cnt] = [];
              mks[cnt].push(fdata[ap][1]);
            }
          }
          var nn = app.project.activeItem.layers.addSolid(
            [1, 1, 1],
            name,
            10,
            10,
            1,
            5,
          );
          nn.inPoint = 0;
          nn.outPoint = times[times.length - 1] + 1 / fps;
          nn.transform.position.setValuesAtTimes(times, tdata);
        }
        var bg = app.project.activeItem.layers.addSolid(
          [0, 0, 0],
          "Draw puppet pins on this layer.",
          cw,
          ch,
          1,
          dur,
        );
        bg.transform.opacity.setValue(30);
        app.endUndoGroup();
        var schk = false;
        var ewin = new Window("palette");
        ewin.text = "Warp Window";
        var info_grp = ewin.add("group");
        info_grp.alignment = ["fill", "top"];
        var info_txt = info_grp.add("statictext", undefined, "", {
          multiline: true,
        });
        info_txt.alignment = ["fill", "top"];
        info_txt.size = [10, 52];
        info_txt.text = "Draw puppet pins and click on the Track button.";
        var track_grp = ewin.add("group");
        track_grp.orientation = "row";
        track_grp.alignment = ["fill", "top"];
        track_grp.size = [150, 30];
        var track_bt = track_grp.add("button", undefined, "Track");
        track_bt.alignment = ["center", "top"];
        track_bt.maximumSize = [70, 25];
        track_bt.enabled = true;
        var type_grp = ewin.add("group");
        type_grp.orientation = "row";
        type_grp.alignment = ["fill", "top"];
        type_grp.maximumSize = [100, 20];
        tri_rd = type_grp.add("radiobutton", undefined, "Tri");
        tri_rd.alignment = ["fill", "top"];
        tri_rd.size = [35, 20];
        quad_rd = type_grp.add("radiobutton", undefined, "Quad");
        quad_rd.alignment = ["fill", "top"];
        quad_rd.size = [45, 20];
        tri_rd.value = true;
        var warp_bt = ewin.add("button", undefined, "Warp");
        warp_bt.alignment = ["fill", "top"];
        warp_bt.enabled = false;
        ewin.show();
        track_bt.onClick = function () {
          var puppet = false;
          var fxs = bg.property("ADBE Effect Parade");
          for (var ap = 1; ap <= fxs.numProperties; ap += 1) {
            var fx = fxs.property(ap);
            if (fx.matchName == "ADBE FreePin3") {
              puppet = fx;
            }
          }
          if (puppet !== false) {
            deform = puppet
              .property("ADBE FreePin3 ARAP Group")
              .property("ADBE FreePin3 Mesh Group")
              .property("ADBE FreePin3 Mesh Atom")
              .property("ADBE FreePin3 PosPins");
            app.beginUndoGroup("Track Puppet Pins");
            for (var ap = 1; ap <= deform.numProperties; ap += 1) {
              var p = deform.property(ap);
              pselarr.push(ap);
            }
            puppet = bg.property("ADBE Effect Parade").property(1);
            deform = puppet
              .property("ADBE FreePin3 ARAP Group")
              .property("ADBE FreePin3 Mesh Group")
              .property("ADBE FreePin3 Mesh Atom")
              .property("ADBE FreePin3 PosPins");
            var mkrs = bg.property("Marker");
            if (mkrs.numKeys > 0) {
              mkrs.removeKey(1);
            }
            var mt = main.time;
            tracktime = main.time;
            var mrk = new MarkerValue("");
            mkrs.setValueAtTime(mt, mrk);
            bg.selected = false;
            bg.locked = true;
            track_bt.enabled = true;
            if (main.selectedLayers.length > 0) {
              var data2 = [];
              for (var ap = 0; ap < main.layers.length; ap += 1) {
                var lr = main.layer(ap + 1);
                var name = lr.name;
                if (
                  lr.selected &&
                  name != "Draw puppet pins on this layer." &&
                  lr.locked === false
                ) {
                  var num = Number(name);
                  if (isNaN(num) === false) {
                    data2.push(fdata[num]);
                  }
                }
              }
              data = data2.slice(data2);
            } else {
              data = fdata.slice(fdata);
            }
            if (tri_rd.value) {
              type = "tri";
            }
            if (quad_rd.value) {
              type = "multi";
            }
            var masks = bg.property("ADBE Mask Parade");
            for (var am = masks.numProperties; am > 0; am--) {
              var ms = masks.property(am);
              ms.remove();
            }
            var puppet = bg
              .property("ADBE Effect Parade")
              .property("ADBE FreePin3");
            puppet.enabled = false;
            var deform = puppet
              .property("ADBE FreePin3 ARAP Group")
              .property("ADBE FreePin3 Mesh Group")
              .property("ADBE FreePin3 Mesh Atom")
              .property("ADBE FreePin3 PosPins");
            if (deform.numProperties) {
              var m = masks.addProperty("ADBE Mask Atom");
              m.selected;
              m.maskMode = MaskMode.NONE;
              var s = m.property("ADBE Mask Shape");
              var v = s.value;
              var ver = [];
              var tin = [];
              var tout = [];
              for (var av = 0; av < deform.numProperties; av += 1) {
                var p = deform.property(av + 1).property("Position");
                var pv = p.value;
                ver[av] = pv;
                tin.push([0, 0]);
                tout.push([0, 0]);
              }
              v.vertices = ver;
              v.inTangents = tin;
              v.outTangents = tout;
              s.setValue(v);
              var mks = [];
              mks.push([v, true]);
              m.selected = true;
              var xmks = _Retrack_01_Convert_To_Data(mks, type, true);
              _Retrack_02_Set_Mask(bg, xmks, times);
              var pts = [];
              for (var ak = 0; ak < s.numKeys; ak += 1) {
                var v = s.keyValue(ak + 1);
                for (var av = 0; av < v.vertices.length; av += 1) {
                  if (ak == 0) {
                    pts[av] = [];
                  }
                  var pv = v.vertices[av];
                  pts[av][ak] = pv;
                }
              }
              for (var av = 0; av < deform.numProperties; av += 1) {
                var p = deform.property(av + 1).property("Position");
                if (pselarr.indexOf(av + 1) > -1) {
                  p.setValuesAtTimes(times, pts[av]);
                }
              }
            }
            for (var ap = 0; ap < main.layers.length; ap += 1) {
              var lr = main.layer(ap + 1);
              if (lr.selected) {
                lr.selected = false;
              }
            }
            mselarr = [];
            bg.locked = false;
            for (var af = bg.effect.numProperties; af > 0; af--) {
              if (af > 1) {
                bg.effect.property(af).remove();
              }
            }
            bg.selected = true;
            for (var am = bg.mask.numProperties; am > 0; am--) {
              var m = bg.mask.property(am);
              m.remove();
            }
            bg.effect.property(1).selected = true;
            warp_bt.enabled = true;
            app.endUndoGroup();
          }
        };
        warp_bt.onClick = function () {
          main.openInViewer();
          if (main.selectedLayers.length > 0) {
            var sell = main.layer(1);
            var puppet = false;
            var fxs = bg.property("ADBE Effect Parade");
            for (var ap = 1; ap <= fxs.numProperties; ap += 1) {
              var fx = fxs.property(ap);
              if (fx.matchName == "ADBE FreePin3") {
                puppet = fx;
              }
            }
            if (puppet !== false) {
              if (sell.source.name == "Draw puppet pins on this layer.") {
                function Complete() {
                  var dp = sl.duplicate();
                  var mlen = dp.mask.numProperties;
                  for (var am = mlen; am > 0; am--) {
                    var m = dp.mask.property(am);
                    m.locked = false;
                    m.remove();
                  }
                  for (var am = dp.effect.numProperties; am > 0; am--) {
                    var fx = dp.effect.property(am);
                    fx.remove();
                  }
                  sl.selected = false;
                  dp.selected = true;
                  dp.timeRemapEnabled = true;
                  var trem = dp.property("ADBE Time Remapping");
                  trem.setValueAtTime(ct, ct);
                  for (var ak = trem.numKeys; ak > 0; ak--) {
                    var t = trem.keyTime(ak);
                    if (t.toString() != ct.toString()) {
                      trem.removeKey(ak);
                    }
                  }
                  main.layers.precompose([dp.index], "RE_WARP_", true);
                  dp = main.selectedLayers[0];
                  var mid = dp.source;
                  var id = mid.id;
                  mid.name = mid.name + id;
                  var pc = mid.layer(1);
                  pc.guideLayer = true;
                  app.project.activeItem.time = times[0];
                  app.executeCommand(20);
                  app.project.activeItem.time = ct;
                  var mkrs = dp.property("Marker");
                  var mrk = new MarkerValue("");
                  mkrs.setValueAtTime(tracktime, mrk);
                }
                app.beginUndoGroup("Set Warp");
                for (var al = fdata.length; al > 0; al--) {
                  var lr = main.layer(al + 1);
                  lr.source.remove();
                }
                bg.selected = true;
                var mlen = bg.mask.numProperties;
                for (var am = mlen; am > 0; am--) {
                  var m = bg.mask.property(am);
                  m.remove();
                }
                var puppet = bg
                  .property("ADBE Effect Parade")
                  .property("ADBE FreePin3");
                puppet.selected = false;
                puppet.selected = true;
                puppet.enabled = true;
                app.executeCommand(19);
                bg.source.remove();
                for (var ap = 0; ap < locked.length; ap += 1) {
                  main.layer(locked[ap]).locked = false;
                }
                if (vari) {
                  var target_window = new Window("palette");
                  target_window.text = "Target Layer";
                  var points_radio = target_window.add(
                    "staticText",
                    undefined,
                    "Please Select 1 target 2D video layer and click ok.",
                  );
                  var ok_button = target_window.add("button", undefined, "OK");
                  ok_button.alignment = ["center", "bottom"];
                  for (
                    var al = 0;
                    al < app.project.activeItem.layers.length;
                    al += 1
                  ) {
                    var lr = app.project.activeItem.layers[al + 1];
                    lr.selected = false;
                  }
                  ok_button.onClick = function () {
                    if (
                      app.project.activeItem.selectedLayers.length == 1 &&
                      app.project.activeItem.selectedLayers[0] instanceof
                        AVLayer &&
                      app.project.activeItem.selectedLayers[0].threeDLayer ===
                        false
                    ) {
                      sl = app.project.activeItem.selectedLayers[0];
                      target_window.close();
                      Complete();
                    }
                  };
                  target_window.show();
                } else {
                  Complete();
                }
                closed = true;
                ewin.close();
                app.endUndoGroup();
              }
            }
          }
        };
        ewin.onClose = function () {
          track_fr = ewin.frameLocation;
          if (closed === false) {
            try {
              bg;
            } catch (e) {
            } finally {
              app.beginUndoGroup("Cancel Retrack");
              Remove();
              for (var ap = 0; ap < locked.length; ap += 1) {
                if (
                  main.layer(ap + 1).name == "Draw puppet pins on this layer."
                ) {
                  main.layer(ap + 1).source.remove();
                }
              }
              for (var ap = 0; ap < locked.length; ap += 1) {
                main.layer(locked[ap]).locked = false;
              }
              Reselect(sel);
              app.endUndoGroup();
            }
          }
        };
      }
      function _Triangulate_00_Get_Triangles() {
        ct = app.project.activeItem.time;
        fps = 1 / app.project.activeItem.frameDuration;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 200);
        var dur = app.project.activeItem.duration;
        var sl = app.project.activeItem.selectedLayers[0];
        var times = data[0][0];
        var tchk = false;
        for (var at = 0; at < times.length; at += 1) {
          if (times[at].toString() == ct.toString()) {
            var akr = at;
            tchk = true;
            break;
          }
        }
        if (tchk !== true) {
          akr = 0;
        }
        app.beginUndoGroup("Triangulate");
        var ndata = [];
        var times = (ndata[0] = data[0][0]);
        ndata[1] = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          ndata[1][ak] = [];
          for (var av = 0; av < data.length; av += 1) {
            ndata[1][ak][av] = data[av][1][ak];
          }
        }
        var ref_ver = ndata[1][akr].slice(ndata[1][akr]);
        var raw_tri = Triangulate(ref_ver);
        var len = raw_tri.length / 3;
        var c = -1;
        var ac = -1;
        var tdata = [];
        for (var ar = 0; ar < raw_tri.length; ar += 1) {
          c++;
          if (c == 0) {
            ac++;
            tdata[ac] = [];
          }
          if (c >= 0 && c <= 2) {
            var ref = raw_tri[ar];
            tdata[ac][c] = data[ref][1];
          }
          if (c == 2) {
            c = -1;
          }
        }
        for (var ar = 0; ar < tdata.length; ar += 1) {
          var tr = tdata[ar];
          var p1 = tdata[ar][0][akr];
          var p2 = tdata[ar][1][akr];
          var p3 = tdata[ar][2][akr];
          var d1 = Math.sqrt(
            Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2),
          );
          var d2 = Math.sqrt(
            Math.pow(p2[0] - p3[0], 2) + Math.pow(p2[1] - p3[1], 2),
          );
          var d3 = Math.sqrt(
            Math.pow(p3[0] - p1[0], 2) + Math.pow(p3[1] - p1[1], 2),
          );
          var dists = [];
          dists = [
            [0, 1, d1],
            [1, 2, d2],
            [2, 0, d3],
          ];
          var maxref = dists.sort(function (a, b) {
            return b[1] > a[1];
          })[0];
          var refs = [maxref[0], maxref[1]];
          var p4arr = [];
          for (var ak = 0; ak < times.length; ak += 1) {
            var p1 = tdata[ar][refs[0]][ak];
            var p2 = tdata[ar][refs[1]][ak];
            var p4 = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
            p4arr.push(p4);
          }
          tdata[ar].splice(2, 0, p4arr);
        }
        var dp = sl.duplicate();
        sl.selected = false;
        dp.selected = true;
        var mks = dp.property("ADBE Mask Parade");
        for (var am = mks.numProperties; am > 0; am--) {
          mks.property(am).remove();
        }
        for (var ar = 0; ar < tdata.length; ar += 1) {
          var mvals = [];
          var m = mks.addProperty("ADBE Mask Atom");
          m.maskMode = MaskMode.ADD;
          var s = m.property(1);
          for (var ak = 0; ak < times.length; ak += 1) {
            var vdata = [];
            for (var av = 0; av < 4; av += 1) {
              vdata[av] = tdata[ar][av][ak];
            }
            var v = s.value;
            v.vertices = vdata;
            mvals.push(v);
          }
          s.setValuesAtTimes(times, mvals);
        }
        app.endUndoGroup();
      }
      function _Auto_Rebuild_00_Get_Data() {
        var cdur = app.project.activeItem.duration;
        ct = app.project.activeItem.time;
        var fd = app.project.activeItem.frameDuration;
        fps = 1 / fd;
        var all_times = [];
        var abs_dif = false;
        for (var ad = 0; ad < fdata.length; ad += 1) {
          var ts = fdata[ad][0];
          if (ad == 0) {
            flen = ts.length;
          } else {
            if (ts.length != flen) {
              abs_dif = true;
            }
          }
          var len = ts.length;
          var st = ts[0];
          var et = ts[ts.length - 1];
          all_times.push([st, et]);
        }
        var minst = all_times.sort(function (a, b) {
          return b[0] < a[0];
        })[0][0];
        var maxst = all_times.sort(function (a, b) {
          return b[0] > a[0];
        })[0][0];
        var minet = all_times.sort(function (a, b) {
          return b[1] < a[1];
        })[0][1];
        var maxet = all_times.sort(function (a, b) {
          return b[1] > a[1];
        })[0][1];
        var abs_len = (maxet - minst) * fps;
        var multi = true;
        var cnt = 0;
        var cnt2 = 0;
        var cnt3 = 0;
        for (var ad = 0; ad < fdata.length; ad += 1) {
          var type = fdata[ad][3];
          if (type == "mocha") {
            cnt++;
          }
          if (type == "face") {
            cnt2++;
          }
          if (type == "mask") {
            cnt3++;
            var s = fdata[ad][4];
            var v = s.value.vertices;
          }
        }
        if (cnt == 5 && cnt == fdata.length) {
          multi = false;
        }
        if (cnt2 == 68 && cnt2 == fdata.length) {
          multi = false;
        }
        if (cnt3 > 0 && v.length == fdata.length) {
          multi = false;
        }
        if (fdata.length == 1) {
          multi == false;
        }
        if (multi) {
          if (minst != maxst || minet != maxet || abs_dif) {
            var fcnt = 0;
            var target_window = new Window("palette");
            target_window.text = "Auto Rebuild";
            var points_txt = target_window.add(
              "staticText",
              undefined,
              "Please choose the rebuild method.",
              { multiline: true },
            );
            points_txt.alignment = ["fill", "fill"];
            var method_grp = target_window.add("group");
            method_grp.alignment = "row";
            var linear_rd = method_grp.add(
              "radiobutton",
              undefined,
              "Position",
            );
            linear_rd.alignment = ["center", "bottom"];
            var tri_rd = method_grp.add(
              "radiobutton",
              undefined,
              "Perspective",
            );
            tri_rd.alignment = ["center", "bottom"];
            linear_rd.value = true;
            var fill_grp = target_window.add("group");
            fill_grp.alignment = "row";
            var fill_bt = fill_grp.add("button", undefined, "Rebuild");
            fill_bt.alignment = ["fill", "bottom"];
            fill_bt.onClick = function () {
              function Extend_Mask(s) {
                var dur = app.project.activeItem.duration;
                var fd = app.project.activeItem.frameDuration;
                var ft = s.keyTime(1);
                var lt = s.keyTime(s.numKeys);
                var gd = s.propertyDepth;
                var sls = s.propertyGroup(gd);
                var ip = sls.inPoint;
                var op = sls.outPoint;
                var len = parseInt((op - ip) * fps);
                var leng = s.keyValue(1).vertices.length;
                var marr = [];
                var vars = [];
                var id = [];
                var off = false;
                for (var ak = 0; ak < len; ak += 1) {
                  narr = [];
                  narr[0] = [];
                  narr[1] = [];
                  narr[2] = [];
                  var t = ip + ak * fd;
                  var exist = false;
                  for (var ak2 = 0; ak2 < s.numKeys; ak2 += 1) {
                    var rt = s.keyTime(ak2 + 1);
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(rt * 1000) / 1000
                    ) {
                      exist = true;
                      break;
                    }
                  }
                  if (exist) {
                    id.push(1);
                    if (off) {
                      off = false;
                      vars.push(ak + 1);
                    }
                  }
                  if (exist !== true) {
                    id.push(0);
                    if (off !== true) {
                      off = true;
                      if (ak > 0) {
                        vars.push(ak);
                      }
                    }
                  }
                  var vl = s.valueAtTime(t, true);
                  for (var av = 0; av < leng; av += 1) {
                    var v = vl.vertices[av];
                    v = [
                      Math.round(v[0] * 1000) / 1000,
                      Math.round(v[1] * 1000) / 1000,
                    ];
                    narr[0].push(v);
                    var it = vl.inTangents[av];
                    it = [
                      Math.round(it[0] * 1000) / 1000,
                      Math.round(it[1] * 1000) / 1000,
                    ];
                    narr[1].push(it);
                    var ot = vl.outTangents[av];
                    ot = [
                      Math.round(ot[0] * 1000) / 1000,
                      Math.round(ot[1] * 1000) / 1000,
                    ];
                    narr[2].push(ot);
                  }
                  marr.push(narr);
                  vl.vertices = narr[0];
                  vl.inTangents = narr[1];
                  vl.outTangents = narr[2];
                  s.setValueAtTime(t, vl);
                }
                var fak = s.nearestKeyIndex(ft);
                var lak = s.nearestKeyIndex(lt);
                if (vars.length == 0) {
                  vars = [fak, lak];
                }
                return [marr, vars, id];
              }
              function Extend_2D(p) {
                var eot = p.propertyValueType.toString();
                eot = parseFloat(eot.slice(-2));
                var gd = p.propertyDepth;
                var sls = p.propertyGroup(gd);
                var ip = sls.inPoint;
                var op = sls.outPoint;
                var len = parseInt((op - ip) * fps);
                var vars = [];
                var ft = p.keyTime(1);
                var lt = p.keyTime(p.numKeys);
                var marr = [];
                var id = [];
                var off = false;
                for (var ak = 0; ak < len; ak += 1) {
                  var t = ip + ak * fd;
                  var exist = false;
                  for (var ak2 = 0; ak2 < p.numKeys; ak2 += 1) {
                    var rt = p.keyTime(ak2 + 1);
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(rt * 1000) / 1000
                    ) {
                      exist = true;
                      break;
                    }
                  }
                  var v = p.valueAtTime(t, true);
                  if (eot == 17) {
                    v = Math.round(v * 1000) / 1000;
                  }
                  if (eot == 15) {
                    v = [
                      Math.round(v[0] * 1000) / 1000,
                      Math.round(v[1] * 1000) / 1000,
                    ];
                  }
                  if (eot == 13) {
                    v = [
                      Math.round(v[0] * 1000) / 1000,
                      Math.round(v[1] * 1000) / 1000,
                      Math.round(v[2] * 1000) / 1000,
                    ];
                  }
                  marr.push(v);
                  if (exist) {
                    id.push(1);
                    if (off) {
                      off = false;
                      vars.push(ak + 1);
                    }
                  }
                  if (exist !== true) {
                    id.push(0);
                    if (off !== true) {
                      off = true;
                      if (ak > 0) {
                        vars.push(ak);
                      }
                    }
                    p.setValueAtTime(t, v);
                  }
                }
                var fak = p.nearestKeyIndex(ft);
                var lak = p.nearestKeyIndex(lt);
                if (vars.length == 0) {
                  vars = [fak, lak];
                }
                return [marr, vars, id];
              }
              function getCommon(a) {
                var seen = {};
                var out = [];
                var len = a.length;
                var j = 0;
                for (var i = 0; i < len; i += 1) {
                  var item = a[i];
                  if (seen[item] !== 1) {
                    seen[item] = 1;
                    out[j++] = item;
                  }
                }
                return out;
              }
              fcnt++;
              if (tri_rd.value) {
                var rtype = "tri";
              }
              if (linear_rd.value) {
                rtype = "closest";
              }
              if (fcnt > 1) {
                app.executeCommand(16);
                fdata = [];
                _Load_00_Get_Data(true, "retrack", true);
              }
              app.beginUndoGroup("Auto Rebuild Keyframes");
              var gtimes = _Load_01_Extend_Points_Data(rtype);
              for (var ad = 0; ad < fdata.length; ad += 1) {
                var vs = fdata[ad][1];
                for (var ak = 0; ak < vs.length; ak += 1) {
                  var v = vs[ak];
                }
              }
              var els = [];
              var ads = [];
              var cnt = 0;
              for (var ad = 0; ad < fdata.length; ad += 1) {
                if (ad == 0) {
                  var oid = fdata[ad][5];
                  els[0] = [];
                  ads[0] = [];
                  els[0].push(fdata[ad]);
                  ads[0] = ad;
                } else {
                  id = fdata[ad][5];
                  if (id === oid) {
                    els[cnt].push(fdata[ad]);
                    ads[cnt] = ad;
                  } else {
                    cnt++;
                    els[cnt] = [];
                    els[cnt].push(fdata[ad]);
                    oid = id;
                    ads[cnt] = ad;
                  }
                }
              }
              for (var ae = 0; ae < els.length; ae += 1) {
                var el = els[ae];
                var rad = ads[ae];
                if (el[0][3] == "mask") {
                  var ts = el[0][0];
                  var s = el[0][4];
                  var vals = [];
                  for (var ak = 0; ak < ts.length; ak += 1) {
                    var ver = [];
                    var tin = [];
                    var tout = [];
                    for (var ad = 0; ad < el.length; ad += 1) {
                      var vs = el[ad][1];
                      var tins = el[ad][6];
                      var touts = el[ad][7];
                      var t = ts[ak];
                      var v = vs[ak];
                      var ti = tins[ak];
                      var to = touts[ak];
                      ver.push(v);
                      tin.push(ti);
                      tout.push(to);
                    }
                    var val = s.value;
                    val.vertices = ver;
                    val.inTangents = tin;
                    val.outTangents = tout;
                    vals.push(val);
                  }
                  s.setValuesAtTimes(ts, vals);
                  var res = Extend_Mask(s);
                  var tkeys = [];
                  for (var ak = 0; ak < gtimes[rad].length; ak += 1) {
                    var t = gtimes[rad][ak];
                    var k = s.nearestKeyIndex(t);
                    tkeys.push(k);
                  }
                  res[1] = res[1].concat(tkeys);
                  var gkeys = [];
                  for (var ak = 0; ak < res[1].length; ak += 1) {
                    var k = res[1][ak];
                    var kchk = false;
                    for (var ak2 = 0; ak2 < gkeys.length; ak2 += 1) {
                      var k2 = gkeys[ak2];
                      if (k == k2) {
                        kchk = true;
                      }
                    }
                    if (kchk === false) {
                      gkeys.push(k);
                    }
                  }
                  res[1] = gkeys;
                  res[1].sort(function (a, b) {
                    return b < a;
                  });
                  var o = s.parentProperty.property(3);
                  o.expression = JSON.stringify(
                    [res[0], res[1], res[1], res[2]],
                    undefined,
                    "",
                  );
                  o.expressionEnabled = false;
                }
              }
              var pars = [];
              for (var ad = 0; ad < fdata.length; ad += 1) {
                var typ = fdata[ad][3];
                if (typ != "mask") {
                  var ts = fdata[ad][0];
                  var vs = fdata[ad][1];
                  var p = fdata[ad][4];
                  var gt = gtimes[ad];
                  p.setValuesAtTimes(ts, vs);
                  if (ad == 0) {
                    pars[0] = [];
                    pars[0].push([p, gt, ad]);
                  } else {
                    var oldp = fdata[ad - 1][4];
                    if (p.parentProperty == oldp.parentProperty) {
                      pars[pars.length - 1].push([p, gt, ad]);
                    } else {
                      pars[pars.length] = [];
                      pars[pars.length - 1].push([p, gt, ad]);
                    }
                  }
                }
              }
              var ckeys = [];
              var ads = [];
              for (var ap = 0; ap < pars.length; ap += 1) {
                ckeys[ap] = [];
                ads[ap] = [];
                var keys = [];
                for (var pp = 0; pp < pars[ap].length; pp += 1) {
                  var p = pars[ap][pp][0];
                  var vts = pars[ap][pp][1];
                  var ad = pars[ap][pp][2];
                  for (var at = 0; at < vts.length; at += 1) {
                    var vt = vts[at];
                    var vk = p.nearestKeyIndex(vt);
                    ckeys[ap].push(vk);
                  }
                  ads[ap].push(ad);
                }
              }
              var pkeys = [];
              for (var ap = 0; ap < ckeys.length; ap += 1) {
                pkeys[ap] = [];
                var keys = ckeys[ap];
                var comm = getCommon(keys);
                comm.sort();
                pkeys[ap] = comm;
              }
              var zkeys = [];
              for (var ap = 0; ap < ads.length; ap += 1) {
                var cad = ads[ap];
                var keys = pkeys[ap];
                for (var ao = 0; ao < cad.length; ao += 1) {
                  var ad = cad[ao];
                  zkeys[ad] = keys;
                }
              }
              var gkeys = [];
              for (var ad = 0; ad < fdata.length; ad += 1) {
                gkeys[ad] = [];
                var p = fdata[ad][4];
                var ts = fdata[ad][0];
                var vs = fdata[ad][1];
                var type = fdata[ad][3];
                if (type != "3d" && type != "mask") {
                  p.setValuesAtTimes(ts, vs);
                  var res = Extend_2D(p);
                  if (type == "trk") {
                    var pr = p.propertyGroup();
                    var p2 = pr.property("ADBE MTracker Pt Feature Center");
                    p2.setValuesAtTimes(ts, vs);
                    Extend_2D(p2);
                  }
                  var tkeys = zkeys[ad];
                  res[1] = res[1].concat(tkeys);
                  var gkeys = [];
                  for (var ak = 0; ak < res[1].length; ak += 1) {
                    var k = res[1][ak];
                    var kchk = false;
                    for (var ak2 = 0; ak2 < gkeys.length; ak2 += 1) {
                      var k2 = gkeys[ak2];
                      if (k == k2) {
                        kchk = true;
                      }
                    }
                    if (kchk === false) {
                      gkeys.push(k);
                    }
                  }
                  res[1] = gkeys;
                  res[1].sort(function (a, b) {
                    return b < a;
                  });
                  p.expression = JSON.stringify(
                    [res[0], res[1], res[1], res[2]],
                    undefined,
                    "",
                  );
                  p.expressionEnabled = false;
                }
              }
              app.endUndoGroup();
            };
            target_window.show();
          }
        }
      }
      function _Tracked_2D_00_Format_Editable_2D(sls, sl, ltype, pr) {
        function Extend_2D(p) {
          var vars = [];
          var ft = sls.inPoint;
          if (ft < 0) {
            ft = 0;
          }
          var lt = sls.outPoint - fd;
          if (lt >= cdur) {
            lt = cdur - fd;
          }
          var ip = p.keyTime(1);
          var op = p.keyTime(p.numKeys);
          var len = parseInt((op - ip) * fps) + 1;
          var marr = [];
          var id = [];
          var off = false;
          for (var ak = 0; ak < len; ak += 1) {
            var t = ip + ak * fd;
            if (t > Number.EPSILON === true) {
            }
            var exist = false;
            for (var ak2 = 0; ak2 < p.numKeys; ak2 += 1) {
              var rt = p.keyTime(ak2 + 1);
              if (rt > Number.EPSILON === true) {
                rt = 0;
              }
              if (parseInt(t * 1000) / 1000 == parseInt(rt * 1000) / 1000) {
                exist = true;
                break;
              }
            }
            if (exist) {
              id.push(1);
              if (off) {
                off = false;
                vars.push(p.nearestKeyIndex(t));
              }
            }
            if (exist !== true) {
              id.push(0);
              if (off !== true) {
                off = true;
                if (ak > 0) {
                  vars.push(p.nearestKeyIndex(t));
                }
              }
            }
            var v = p.valueAtTime(t, true);
            if (
              ltype == "corners" ||
              ltype == "puppet" ||
              ltype == "mocha" ||
              ltype == "mochapro"
            ) {
              v = [
                Math.round(v[0] * 1000) / 1000,
                Math.round(v[1] * 1000) / 1000,
              ];
            } else {
              if (eot == 17) {
                v = Math.round(v * 1000) / 1000;
              }
              if (eot == 15) {
                v = [
                  Math.round(v[0] * 1000) / 1000,
                  Math.round(v[1] * 1000) / 1000,
                ];
              }
              if (eot == 13) {
                v = [
                  Math.round(v[0] * 1000) / 1000,
                  Math.round(v[1] * 1000) / 1000,
                  Math.round(v[2] * 1000) / 1000,
                ];
              }
            }
            marr.push(v);
            p.setValueAtTime(t, v);
          }
          var fak = p.nearestKeyIndex(ft);
          var lak = p.nearestKeyIndex(lt);
          if (vars.length == 0) {
            vars = [fak, lak];
          }
          return [marr, vars, id];
        }
        var cdur = app.project.activeItem.duration;
        ct = app.project.activeItem.time;
        var fd = app.project.activeItem.frameDuration;
        fps = 1 / fd;
        if (ltype == "fx") {
          var p = pr;
        }
        if (ltype == "trans") {
          var p = pr;
        }
        if (ltype == "track") {
          var trk = sl;
          var p = trk.property("ADBE MTracker Pt Attach Pt");
        }
        if (ltype == "puppet") {
          var p = sl;
          var o = sl;
        }
        if (
          ltype != "corners" &&
          ltype != "mocha" &&
          ltype != "mochapro" &&
          p.propertyValueType !== undefined
        ) {
          var eot = p.propertyValueType.toString();
          eot = parseFloat(eot.slice(-2));
        } else {
          var eot = 12;
        }
        if (ltype == "corners") {
          for (var ap = 0; ap < 4; ap += 1) {
            var p = pr.property(ap + 1);
            if (p.expression.length == 0) {
              var res = Extend_2D(p);
              p.expression = JSON.stringify(
                [res[0], res[1], res[1], res[2]],
                undefined,
                "",
              );
              p.expressionEnabled = false;
            }
          }
        } else {
          if (ltype == "puppet") {
            var deform = sl;
            for (var av = 0; av < deform.numProperties; av += 1) {
              var pp = deform.property(av + 1);
              var p = pp.property("ADBE FreePin3 PosPin Position");
              if (p.expression.length == 0) {
                var res = Extend_2D(p);
                p.expression = JSON.stringify(
                  [res[0], res[1], res[1], res[2]],
                  undefined,
                  "",
                );
                p.expressionEnabled = false;
              }
            }
          } else {
            if (ltype == "mocha" || ltype == "mochapro") {
              for (var ap = 2; ap <= 6; ap += 1) {
                if (ltype == "mocha") {
                  var p = pr.property("mochaAECC-234" + ap);
                } else {
                  var p = pr.property("mochaProAE-234" + ap);
                }
                if (p.expression.length == 0) {
                  var res = Extend_2D(p);
                  p.expression = JSON.stringify(
                    [res[0], res[1], res[1], res[2]],
                    undefined,
                    "",
                  );
                  p.expressionEnabled = false;
                }
              }
            } else {
              if (p.numKeys > 0) {
                if (p.expression.length == 0) {
                  var res = Extend_2D(p);
                  if (ltype == "track") {
                    var p2 = p
                      .propertyGroup()
                      .property("ADBE MTracker Pt Feature Center");
                    Extend_2D(p2);
                  }
                  p.expression = JSON.stringify(
                    [res[0], res[1], res[1], res[2]],
                    undefined,
                    "",
                  );
                  p.expressionEnabled = false;
                }
              }
            }
          }
        }
      }
      function _Tracked_2D_01_Edit_2D_Window(sls, elm, ltype, pr) {
        function Load_Markers() {
          if (ltype == "fx") {
            p = pr;
          }
          if (ltype == "trans") {
            var p = pr;
          }
          if (ltype == "puppet") {
            var p = elm.property(1).property("ADBE FreePin3 PosPin Position");
          }
          if (ltype == "track") {
            p = elm.property("ADBE MTracker Pt Attach Pt");
          }
          if (ltype == "corners") {
            p = pr.property(1);
          }
          if (ltype == "mocha") {
            p = pr.property("mochaAECC-2342");
          }
          if (ltype == "mochapro") {
            p = pr.property("mochaProAE-2342");
          }
          if (p.expression.length > 0) {
            var exp = p.expression;
            var res = eval(exp);
            var vars = res[1];
            var akarr = [];
            if (vars.length > 0) {
              var mrk = new MarkerValue("");
              for (var ak = 0; ak < vars.length; ak += 1) {
                var k = vars[ak];
                var tim = p.keyTime(k);
                sls.property("Marker").setValueAtTime(tim, mrk);
              }
            }
          }
        }
        function Set_2D(set) {
          ct = app.project.activeItem.time;
          var nind = p.nearestKeyIndex(ct);
          var kt = p.keyTime(nind);
          if (ct == kt) {
            function Write_Data(iak, oak) {
              var times = [];
              var vals = [];
              for (var ak = iak; ak <= oak; ak++) {
                var t = p.keyTime(ak);
                times.push(t);
                var v = nver[ak - 1];
                vals.push(v);
              }
              p.setValuesAtTimes(times, vals);
              if (ltype == "track") {
                p2.setValuesAtTimes(times, vals);
              }
            }
            if (p.expression.length > 0) {
              var exp = p.expression;
              var res = eval(exp);
              var marr = res[0];
              var vars = res[1];
              var orivars = res[2];
              var id = res[3];
            }
            if (set) {
              if (vars.length > 0) {
                var chk = false;
                for (var ak = 0; ak < vars.length; ak += 1) {
                  var vak = vars[ak];
                  var cur_k = p.nearestKeyIndex(ct);
                  if (vak.toString() == cur_k.toString()) {
                    vars[ak] = cur_k;
                    chk = true;
                    break;
                  }
                }
                if (chk === false) {
                  vars.push(cur_k);
                  var mrk = new MarkerValue("");
                  sls.property("Marker").setValueAtTime(ct, mrk);
                }
              } else {
                var cur_k = p.nearestKeyIndex(ct);
                vars.push(cur_k);
                var mrk = new MarkerValue("");
                sls.property("Marker").setValueAtTime(ct, mrk);
              }
            }
            vars.sort(function (a, b) {
              return b < a;
            });
            p.expression = JSON.stringify(
              [marr, vars, orivars, id],
              undefined,
              "",
            );
            p.expressionEnabled = false;
            var nver = [];
            if (vars.length > 1) {
              nver = [];
              for (var akv = 0; akv < vars.length; akv += 1) {
                if (akv + 1 <= vars.length - 1) {
                  var vart0 = vars[akv];
                  var varak0 = Math.round(vart0 * fps);
                  var vart1 = vars[akv + 1];
                  var varak1 = Math.round(vart1 * fps);
                  var varak0 = vars[akv];
                  var varak1 = vars[akv + 1];
                  if (varak1 > lastak) {
                    varak1 = lastak;
                  }
                  var steps = varak1 - varak0;
                  if (akv == 0) {
                    var iak = varak0;
                  }
                  if (akv + 1 == vars.length - 1) {
                    var oak = varak1;
                  }
                  var v0 = p.keyValue(varak0);
                  var mver0 = v0;
                  var v1 = p.keyValue(varak1);
                  var mver1 = v1;
                  for (var ak = varak0; ak <= varak1; ak++) {
                    var mul = ak - varak0;
                    var ver = marr[ak - 1];
                    var verd0 = mver0 - marr[varak0 - 1];
                    var verd1 = mver1 - marr[varak1 - 1];
                    var vdif = ((verd1 - verd0) / steps) * mul;
                    if (steps == 0 || mul == 0) {
                      vdif = [0, 0];
                    }
                    nver[ak - 1] = ver + verd0 + vdif;
                  }
                }
              }
              Write_Data(iak, oak);
            }
            nver = [];
            if (vars.length == 0) {
              var varak0 = p.nearestKeyIndex(ct);
            } else {
              var varak0 = vars[0];
            }
            var v = p.keyValue(varak0);
            var mver = v;
            for (var ak = 1; ak <= varak0; ak += 1) {
              var ver = marr[ak - 1];
              var verd = mver - marr[varak0 - 1];
              nver[ak - 1] = ver + verd;
            }
            var iak = 1;
            var oak = varak0;
            Write_Data(iak, oak);
            nver = [];
            if (vars.length == 0) {
              var varakF = p.nearestKeyIndex(ct);
            } else {
              var varakF = vars[vars.length - 1];
            }
            if (varakF > lastak) {
              varakF = lastak;
            }
            var v = p.keyValue(varakF);
            var mver = v;
            var slen = p.numKeys;
            if (slen > lastak) {
              slen = lastak;
            }
            for (var ak = varakF; ak <= slen; ak++) {
              var ver = marr[ak - 1];
              var verd = mver - marr[varakF - 1];
              nver[ak - 1] = ver + verd;
            }
            var iak = varakF;
            var oak = slen;
            Write_Data(iak, oak);
            p.selected = true;
            if (ltype == "trans" || ltype == "corners") {
              p.selected = false;
            }
          }
        }
        ct = app.project.activeItem.time;
        var fd = app.project.activeItem.frameDuration;
        fps = 1 / fd;
        var slk = (sls.outPoint - sls.inPoint) * fps;
        var slkt = sls.outPoint - sls.inPoint;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        if (ltype == "fx") {
          var p = pr;
        }
        if (ltype == "trans") {
          var p = pr;
        }
        if (ltype == "puppet") {
          var p = elm.property(1).property("ADBE FreePin3 PosPin Position");
        }
        if (ltype == "track") {
          var trk = elm;
          var p = trk.property("ADBE MTracker Pt Attach Pt");
          var p2 = trk.property("ADBE MTracker Pt Feature Center");
        }
        if (ltype == "corners") {
          var p = pr.property(1);
        }
        if (ltype == "mocha") {
          var p = pr.property("mochaAECC-2342");
        }
        if (ltype == "mochapro") {
          var p = pr.property("mochaProAE-2342");
        }
        if (
          ltype != "corners" &&
          ltype != "mocha" &&
          ltype != "mochapro" &&
          p.propertyValueType !== undefined
        ) {
          var eot = p.propertyValueType.toString();
          eot = parseFloat(eot.slice(-2));
        } else {
          var eot = 12;
        }
        var last_time = app.project.activeItem.duration - fd;
        var lastak = p.nearestKeyIndex(last_time);
        if (p.expression.length > 0) {
          var exp = p.expression;
          var res = eval(exp);
          var marr = res[0];
          var vars = res[1];
          var orivars = res[2];
          var id = res[3];
        }
        if (ltype == "trans") {
          p.selected = false;
        }
        var target_window = new Window("palette");
        target_window.text = "Select";
        target_window.frameLocation = edit_fr;
        var set_bt = target_window.add("button", undefined, "Set");
        set_bt.alignment = ["center", "bottom"];
        set_bt.maximumSize = [60, 22];
        set_bt.helpTip =
          "Set a virtual key. Add a virtual key to the tracked property.";
        var del_bt = target_window.add("button", undefined, "Delete");
        del_bt.alignment = ["center", "bottom"];
        del_bt.maximumSize = [60, 22];
        del_bt.helpTip =
          "Delete a virtual key. In order to work the time bar must be moved to the virtual key frame.";
        var reset_bt = target_window.add("button", undefined, "Reset");
        reset_bt.alignment = ["center", "bottom"];
        reset_bt.maximumSize = [60, 22];
        reset_bt.helpTip =
          "Reset: remove all the virtual keys and get back to the original state.";
        var bake_bt = target_window.add("button", undefined, "Bake");
        bake_bt.alignment = ["center", "bottom"];
        bake_bt.maximumSize = [60, 22];
        bake_bt.helpTip =
          "Bake: bake keyframes and clean edit data on the property.";
        var pr = pr;
        bake_bt.onClick = function () {
          app.beginUndoGroup("Bake 2D Keys");
          if (ltype == "corners") {
            for (var ap = 0; ap < 4; ap += 1) {
              p = pr.property(ap + 1);
              if (p.expression.length > 0) {
                p.expression = "";
              }
            }
            pr.selected = true;
          } else {
            if (ltype == "mocha") {
              for (var ap = 2; ap <= 6; ap += 1) {
                p = pr.property("mochaAECC-234" + ap);
                if (p.expression.length > 0) {
                  p.expression = "";
                }
              }
              pr.selected = true;
            } else {
              if (ltype == "mochapro") {
                for (var ap = 2; ap <= 6; ap += 1) {
                  p = pr.property("mochaProAE-234" + ap);
                  if (p.expression.length > 0) {
                    p.expression = "";
                  }
                }
                pr.selected = true;
              } else {
                if (ltype == "puppet") {
                  pr = elm;
                  for (var av = 0; av < elm.numProperties; av += 1) {
                    var pp = elm.property(av + 1);
                    p = pp.property("ADBE FreePin3 PosPin Position");
                    if (p.expression.length > 0) {
                      p.expression = "";
                    }
                    p.selected = false;
                  }
                } else {
                  if (p.expression.length > 0) {
                    p.expression = "";
                  }
                }
              }
            }
          }
          var mkr = sls.property("Marker");
          for (var ak = mkr.numKeys; ak > 0; ak--) {
            var mk = mkr.removeKey(ak);
          }
          app.endUndoGroup();
        };
        set_bt.onClick = function () {
          app.beginUndoGroup("Set 2D Keys");
          if (ltype == "corners") {
            for (var ap = 0; ap < 4; ap += 1) {
              p = pr.property(ap + 1);
              Set_2D(true, p);
            }
            pr.selected = true;
          } else {
            if (ltype == "mocha") {
              for (var ap = 2; ap <= 6; ap += 1) {
                p = pr.property("mochaAECC-234" + ap);
                Set_2D(true, p);
              }
              pr.selected = true;
            } else {
              if (ltype == "mochapro") {
                for (var ap = 2; ap <= 6; ap += 1) {
                  p = pr.property("mochaProAE-234" + ap);
                  Set_2D(true, p);
                }
                pr.selected = true;
              } else {
                if (ltype == "puppet") {
                  pr = elm;
                  for (var av = 0; av < elm.numProperties; av += 1) {
                    var pp = elm.property(av + 1);
                    p = pp.property("ADBE FreePin3 PosPin Position");
                    Set_2D(true, p);
                    p.selected = false;
                  }
                } else {
                  Set_2D(true);
                }
              }
            }
          }
          app.endUndoGroup();
        };
        reset_bt.onClick = function () {
          function Reset_2D() {
            if (p.expression.length > 0) {
              var exp = p.expression;
              var res = eval(exp);
              var marr = res[0];
              var vars = [];
              var orivars = res[2];
              var id = res[3];
            }
            p.expression = JSON.stringify(
              [marr, orivars, orivars, id],
              undefined,
              "",
            );
            p.expressionEnabled = false;
            var mkr = sls.property("Marker");
            for (var ak = mkr.numKeys; ak > 0; ak--) {
              var mk = mkr.removeKey(ak);
            }
            Load_Markers();
            var times = [];
            var vals = [];
            var slen = p.numKeys;
            if (slen > lastak) {
              slen = lastak;
            }
            for (var ak = 0; ak < slen; ak += 1) {
              var t = p.keyTime(ak + 1);
              times.push(t);
              var v = marr[ak];
              vals.push(v);
            }
            p.setValuesAtTimes(times, vals);
            if (ltype == "track") {
              p2.setValuesAtTimes(times, vals);
            }
          }
          app.beginUndoGroup("Reset Property");
          if (ltype == "corners") {
            for (var ap = 0; ap < 4; ap += 1) {
              p = pr.property(ap + 1);
              Reset_2D();
            }
            pr.selected = true;
          } else {
            if (ltype == "mocha") {
              for (var ap = 2; ap <= 6; ap += 1) {
                p = pr.property("mochaAECC-234" + ap);
                Reset_2D();
              }
              pr.selected = true;
            } else {
              if (ltype == "mochapro") {
                for (var ap = 2; ap <= 6; ap += 1) {
                  p = pr.property("mochaProAE-234" + ap);
                  Reset_2D();
                }
                pr.selected = true;
              } else {
                if (ltype == "puppet") {
                  pr = elm;
                  for (var av = 0; av < elm.numProperties; av += 1) {
                    var pp = elm.property(av + 1);
                    p = pp.property("ADBE FreePin3 PosPin Position");
                    Reset_2D();
                    p.selected = false;
                  }
                  pr.selected = true;
                } else {
                  Reset_2D();
                }
              }
            }
          }
          app.endUndoGroup();
        };
        del_bt.onClick = function () {
          function Remove_2D() {
            if (p.expression.length > 0) {
              var exp = p.expression;
              var res = eval(exp);
              var marr = res[0];
              var vars = res[1];
              var orivars = res[2];
              var id = res[3];
            }
            ct = app.project.activeItem.time;
            var vars2 = [];
            var mkr = sls.property("Marker");
            for (var ak = 0; ak < vars.length; ak += 1) {
              var cur_k = p.nearestKeyIndex(ct);
              if (vars[ak].toString() != cur_k.toString()) {
                vars2.push(vars[ak]);
              }
            }
            p.expression = JSON.stringify(
              [marr, vars2, orivars, id],
              undefined,
              "",
            );
            p.expressionEnabled = false;
            for (var ak = mkr.numKeys; ak > 0; ak--) {
              var mk = mkr.removeKey(ak);
            }
            Load_Markers();
            Set_2D(false, p, p2);
          }
          app.beginUndoGroup("Delete 2D Key");
          if (ltype == "corners") {
            for (var ap = 0; ap < 4; ap += 1) {
              p = pr.property(ap + 1);
              Remove_2D(p);
            }
            pr.selected = true;
          } else {
            if (ltype == "mocha") {
              for (var ap = 2; ap <= 6; ap += 1) {
                p = pr.property("mochaAECC-234" + ap);
                Remove_2D(p);
              }
              pr.selected = true;
            } else {
              if (ltype == "mochapro") {
                for (var ap = 2; ap <= 6; ap += 1) {
                  p = pr.property("mochaProAE-234" + ap);
                  Remove_2D(p);
                }
                pr.selected = true;
              } else {
                if (ltype == "puppet") {
                  pr = elm;
                  for (var av = 0; av < elm.numProperties; av += 1) {
                    var pp = elm.property(av + 1);
                    p = pp.property("ADBE FreePin3 PosPin Position");
                    Remove_2D(p);
                    p.selected = false;
                  }
                } else {
                  Remove_2D(p, p2);
                }
              }
            }
          }
          app.endUndoGroup();
        };
        target_window.onClose = function () {
          edit_fr = target_window.frameLocation;
          try {
            mkr;
          } catch (e) {
          } finally {
            var mkr = sls.property("Marker");
            app.beginUndoGroup("Remove Markers On Close");
            for (var ak = mkr.numKeys; ak > 0; ak--) {
              var mk = mkr.removeKey(ak);
            }
            pr.selected = true;
            app.endUndoGroup();
          }
        };
        Load_Markers();
        target_window.show();
      }
      function Convert_To_Editable_Mask(m) {
        function Get_Angles(ref_ver, ctr) {
          var angles = [];
          for (var aa = 0; aa < ref_ver.length; aa += 1) {
            var vx = ref_ver[aa][0];
            var vy = ref_ver[aa][1];
            var d = Math.sqrt(
              Math.pow(vx - ctr[0], 2) + Math.pow(vy - ctr[1], 2),
            );
            var dx = vx - ctr[0];
            var dy = vy - ctr[1];
            var angle = -1 * ((Math.atan2(dx, dy) * 180) / Math.PI - 180);
            angles.push([aa, angle, d]);
          }
          return angles;
        }
        var fd = app.project.activeItem.frameDuration;
        var fps = 1 / fd;
        var tracks = [];
        var times = [];
        var vals = [];
        var order = [];
        var verts = [];
        var s = m.property(1);
        var cvals = [];
        for (var ak = 0; ak < s.numKeys; ak += 1) {
          var t = s.keyTime(ak + 1);
          times.push(t);
          var v = s.keyValue(ak + 1);
          var ver = v.vertices;
          verts.push(v.vertices);
          var c = Get_Polygon_Centroid(ver);
          cvals.push(c);
          order.push([ver.length, ak, t, v]);
        }
        var vlen = [];
        for (var ak = 0; ak < verts.length; ak += 1) {
          if (ak == 0) {
            var akr = ak;
          } else {
            var olen = verts[ak - 1].length;
            var len = verts[ak].length;
            if (len < olen) {
              akr = ak;
            }
          }
        }
        var arefs = [];
        var selvts = [];
        var tin = [];
        var tout = [];
        for (var ak = akr; ak >= 0; ak--) {
          arefs[ak] = [];
          if (ak == akr) {
            selvts[akr] = verts[akr];
            for (var av = 0; av < verts[ak].length; av += 1) {
              arefs[ak][av] = av;
            }
          } else {
            var ovts = selvts[ak + 1];
            var vts = verts[ak];
            var oas = Get_Angles(ovts, cvals[ak + 1]);
            var as = Get_Angles(vts, cvals[ak]);
            var svts = [];
            for (var av = 0; av < oas.length; av += 1) {
              var aa = oas[av];
              var a = aa[1];
              var ov = ovts[av];
              var adifs = [];
              var vdifs = [];
              for (var av2 = 0; av2 < as.length; av2 += 1) {
                var v = vts[av2];
                var vd = Math.sqrt(
                  Math.pow(v[0] - ov[0], 2) + Math.pow(v[1] - ov[1], 2),
                );
                vdifs.push([vd, av2]);
                var aa2 = as[av2];
                var ref = aa2[0];
                var a2 = aa2[1];
                var d = Math.abs(a - a2);
                adifs.push([d, ref]);
              }
              var aref = adifs.sort(function (a, b) {
                return b[0] < a[0];
              })[0][1];
              var vref = vdifs.sort(function (a, b) {
                return b[0] < a[0];
              })[0][1];
              if (aref != vref) {
                aref = vref;
              }
              if (verts[ak].length == verts[ak + 1].length) {
                aref = arefs[ak + 1][av];
                svts.push(vts[aref]);
              } else {
                svts.push(vts[aref]);
              }
              arefs[ak][av] = aref;
            }
            selvts[ak] = svts;
          }
        }
        for (var ak = akr; ak < verts.length; ak++) {
          arefs[ak] = [];
          if (ak == akr) {
            selvts[akr] = verts[akr];
            for (var av = 0; av < verts[ak].length; av += 1) {
              arefs[ak][av] = av;
            }
          } else {
            var ovts = selvts[selvts.length - 1];
            var oas = Get_Angles(ovts, cvals[ak - 1]);
            var vts = verts[ak];
            var as = Get_Angles(vts, cvals[ak]);
            var svts = [];
            for (var av = 0; av < oas.length; av += 1) {
              var aa = oas[av];
              var a = aa[1];
              var ov = ovts[av];
              var adifs = [];
              var vdifs = [];
              for (var av2 = 0; av2 < as.length; av2 += 1) {
                var v = vts[av2];
                var vd = Math.sqrt(
                  Math.pow(v[0] - ov[0], 2) + Math.pow(v[1] - ov[1], 2),
                );
                vdifs.push([vd, av2]);
                var aa2 = as[av2];
                var ref = aa2[0];
                var a2 = aa2[1];
                var d = Math.abs(a - a2);
                adifs.push([d, ref]);
              }
              var aref = adifs.sort(function (a, b) {
                return b[0] < a[0];
              })[0][1];
              var vref = vdifs.sort(function (a, b) {
                return b[0] < a[0];
              })[0][1];
              if (aref != vref) {
                aref = vref;
              }
              if (verts[ak].length == verts[ak - 1].length) {
                aref = arefs[ak - 1][av];
                svts.push(vts[aref]);
              } else {
                svts.push(vts[aref]);
              }
              arefs[ak][av] = aref;
            }
            selvts[ak] = svts;
          }
        }
        for (var ak = s.numKeys; ak > 0; ak--) {
          s.removeKey(ak);
        }
        m.rotoBezier = true;
        var mv = [];
        var ver = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          var v = s.value;
          v.vertices = selvts[ak];
          mv.push(v);
        }
        s.setValuesAtTimes(times, mv);
        s.selected = true;
        return s;
      }
      function _Tracked_Masks_00_Format_Editable_Masks(sl, m) {
        var okedit = false;
        var cdur = app.project.activeItem.duration;
        ct = app.project.activeItem.time;
        var fd = app.project.activeItem.frameDuration;
        fps = 1 / fd;
        var s = m.property(1);
        var o = m.property(3);
        if (o.expression.length == 0) {
          okedit = true;
          var ip = s.keyTime(1);
          var op = s.keyTime(s.numKeys);
          var len = parseInt((op - ip) * fps) + 1;
          var pchk = true;
          if (s.numKeys > 0) {
            var leng = s.keyValue(1).vertices.length;
            var marr = [];
            var times = [];
            for (var ak = 0; ak < len; ak += 1) {
              var t = ak * fd;
              var vl = s.valueAtTime(t, true);
              if (ak == 0) {
                var slen = vl.vertices.length;
              }
              var vlen = vl.vertices.length;
              if (vlen != slen) {
                pchk = false;
                break;
              }
            }
            if (pchk !== true) {
              var state = "none";
              var target_window = new Window("dialog");
              target_window.text = "Perspective Masks";
              target_window.size = [300, 130];
              target_window.alignment = ["fill", "top"];
              var points_txt = target_window.add(
                "staticText",
                undefined,
                "Is the selected mask is tracked in Skew or Perspective mode? If NO, mask can\'t be edited.",
                { multiline: true },
              );
              points_txt.alignment = ["fill", "top"];
              points_txtsize = [300, 100];
              var confirm_grp = target_window.add("group");
              confirm_grp.orientation = "row";
              confirm_grp.alignment = ["center", "bottom"];
              var ok_bt = confirm_grp.add("button", undefined, "Yes");
              ok_bt.alignment = ["center", "bottom"];
              var cancel_bt = confirm_grp.add("button", undefined, "No");
              cancel_bt.alignment = ["center", "bottom"];
              ok_bt.onClick = function () {
                pchk = true;
                s = Convert_To_Editable_Mask(m);
                m.rotoBezier = false;
                target_window.close();
              };
              cancel_bt.onClick = function () {
                target_window.close();
              };
              target_window.show();
            }
            if (pchk) {
              function Extend_Mask(s) {
                var dur = app.project.activeItem.duration;
                var fd = app.project.activeItem.frameDuration;
                var ft = s.keyTime(1);
                var lt = s.keyTime(s.numKeys);
                var ft = sl.inPoint;
                if (ft < 0) {
                  ft = 0;
                }
                var lt = sl.outPoint - fd;
                if (lt >= cdur) {
                  lt = cdur - fd;
                }
                var marr = [];
                var vars = [];
                var id = [];
                var off = false;
                for (var ak = 0; ak < len; ak += 1) {
                  narr = [];
                  narr[0] = [];
                  narr[1] = [];
                  narr[2] = [];
                  var t = ip + ak * fd;
                  var exist = false;
                  for (var ak2 = 0; ak2 < s.numKeys; ak2 += 1) {
                    var rt = s.keyTime(ak2 + 1);
                    if (rt > Number.EPSILON === true) {
                      rt = 0;
                    }
                    if (
                      parseInt(t * 1000) / 1000 ==
                      parseInt(rt * 1000) / 1000
                    ) {
                      exist = true;
                      break;
                    }
                  }
                  if (exist) {
                    id.push(1);
                    if (off) {
                      off = false;
                    }
                  }
                  if (exist !== true) {
                    id.push(0);
                    if (off !== true) {
                      off = true;
                      if (ak > 0) {
                      }
                    }
                  }
                  var vl = s.valueAtTime(t, true);
                  for (var av = 0; av < vl.vertices.length; av += 1) {
                    var v = vl.vertices[av];
                    v = [
                      Math.round(v[0] * 1000) / 1000,
                      Math.round(v[1] * 1000) / 1000,
                    ];
                    narr[0].push(v);
                    var it = vl.inTangents[av];
                    it = [
                      Math.round(it[0] * 1000) / 1000,
                      Math.round(it[1] * 1000) / 1000,
                    ];
                    narr[1].push(it);
                    var ot = vl.outTangents[av];
                    ot = [
                      Math.round(ot[0] * 1000) / 1000,
                      Math.round(ot[1] * 1000) / 1000,
                    ];
                    narr[2].push(ot);
                  }
                  marr.push(narr);
                  vl.vertices = narr[0];
                  vl.inTangents = narr[1];
                  vl.outTangents = narr[2];
                  s.setValueAtTime(t, vl);
                }
                var fak = s.nearestKeyIndex(ft);
                var lak = s.nearestKeyIndex(lt);
                if (vars.length == 0) {
                  vars = [fak, lak];
                }
                return [marr, vars, id];
              }
              var res = Extend_Mask(s);
            }
          }
          if (pchk) {
            o.expression = JSON.stringify(
              [res[0], res[1], res[1], res[2]],
              undefined,
              "",
            );
          } else {
            o.expression = "";
          }
          o.expressionEnabled = false;
        }
        return okedit;
      }
      function _Tracked_Masks_01_Edit_Masks_Window(sl, m) {
        ct = app.project.activeItem.time;
        var fd = app.project.activeItem.frameDuration;
        fps = 1 / fd;
        var cw = app.project.activeItem.width;
        var ch = app.project.activeItem.height;
        var ratio = parseInt(cw / 100);
        var sl = app.project.activeItem.selectedLayers[0];
        var s = m.property(1);
        var o = m.property(3);
        var last_time = app.project.activeItem.duration - fd;
        var lastak = s.nearestKeyIndex(last_time);
        if (o.expression.length > 0) {
          function Load_Markers() {
            if (o.expression.length > 0) {
              var exp = o.expression;
              var res = eval(exp);
              var vars = res[1];
              var akarr = [];
              if (vars.length > 0) {
                var mrk = new MarkerValue("");
                for (var ak = 0; ak < vars.length; ak += 1) {
                  var k = vars[ak];
                  var tim = s.keyTime(k);
                  sl.property("Marker").setValueAtTime(tim, mrk);
                }
              }
            }
          }
          function Set_Mask(set) {
            ct = app.project.activeItem.time;
            sl = app.project.activeItem.selectedLayers[0];
            s = m.property(1);
            var nind = s.nearestKeyIndex(ct);
            var kt = s.keyTime(nind);
            if (ct == kt) {
              function Write_Mask_Data(iak, oak) {
                var times = [];
                var vals = [];
                for (var ak = iak; ak <= oak; ak++) {
                  var t = s.keyTime(ak);
                  times.push(t);
                  var v = s.keyValue(ak);
                  v.vertices = nver[ak - 1];
                  v.inTangents = ntin[ak - 1];
                  v.outTangents = ntout[ak - 1];
                  vals.push(v);
                }
                s.setValuesAtTimes(times, vals);
              }
              if (o.expression.length > 0) {
                var exp = o.expression;
                var res = eval(exp);
                var marr = res[0];
                var vars = res[1];
                var orivarl = res[2];
                var id = res[3];
              }
              var k = s.numKeys;
              var pd = parseInt((sl.outPoint - sl.inPoint) * fps);
              if (set) {
                if (vars.length > 0) {
                  var chk = false;
                  for (var ak = 0; ak < vars.length; ak += 1) {
                    var vak = vars[ak];
                    var cur_k = s.nearestKeyIndex(ct);
                    if (vak.toString() == cur_k.toString()) {
                      vars[ak] = cur_k;
                      chk = true;
                      break;
                    }
                  }
                  if (chk === false) {
                    vars.push(cur_k);
                    var mrk = new MarkerValue("");
                    sl.property("Marker").setValueAtTime(ct, mrk);
                  }
                } else {
                  var cur_k = s.nearestKeyIndex(ct);
                  vars.push(cur_k);
                  var mrk = new MarkerValue("");
                  sl.property("Marker").setValueAtTime(ct, mrk);
                }
              }
              vars.sort(function (a, b) {
                return b < a;
              });
              o.expression = JSON.stringify(
                [marr, vars, orivars, id],
                undefined,
                "",
              );
              o.expressionEnabled = false;
              var nver = [];
              var ntin = [];
              var ntout = [];
              if (vars.length > 1) {
                nver = [];
                ntin = [];
                ntout = [];
                for (var akv = 0; akv < vars.length; akv += 1) {
                  if (akv + 1 <= vars.length - 1) {
                    var vart0 = vars[akv];
                    var vart1 = vars[akv + 1];
                    var varak0 = vars[akv];
                    var varak1 = vars[akv + 1];
                    if (varak1 > lastak) {
                      varak1 = lastak;
                    }
                    var steps = varak1 - varak0;
                    if (akv == 0) {
                      var iak = varak0;
                    }
                    if (akv + 1 == vars.length - 1) {
                      var oak = varak1;
                    }
                    var v0 = s.keyValue(varak0);
                    var mver0 = v0.vertices;
                    var mit0 = v0.inTangents;
                    var mot0 = v0.outTangents;
                    var v1 = s.keyValue(varak1);
                    var mver1 = v1.vertices;
                    var mit1 = v1.inTangents;
                    var mot1 = v1.outTangents;
                    for (var ak = varak0; ak <= varak1; ak++) {
                      var mul = ak - varak0;
                      var ver = marr[ak - 1][0];
                      var tin = marr[ak - 1][1];
                      var tout = marr[ak - 1][2];
                      nver[ak - 1] = [];
                      ntin[ak - 1] = [];
                      ntout[ak - 1] = [];
                      for (var av = 0; av < ver.length; av += 1) {
                        var verd0 = mver0[av] - marr[varak0 - 1][0][av];
                        var itd0 = mit0[av] - marr[varak0 - 1][1][av];
                        var otd0 = mot0[av] - marr[varak0 - 1][2][av];
                        var verd1 = mver1[av] - marr[varak1 - 1][0][av];
                        var itd1 = mit1[av] - marr[varak1 - 1][1][av];
                        var otd1 = mot1[av] - marr[varak1 - 1][2][av];
                        var vdif = [
                          ((verd1[0] - verd0[0]) / steps) * mul,
                          ((verd1[1] - verd0[1]) / steps) * mul,
                        ];
                        var itdif = [
                          ((itd1[0] - itd0[0]) / steps) * mul,
                          ((itd1[1] - itd0[1]) / steps) * mul,
                        ];
                        var otdif = [
                          ((otd1[0] - otd0[0]) / steps) * mul,
                          ((otd1[1] - otd0[1]) / steps) * mul,
                        ];
                        if (steps == 0 || mul == 0) {
                          vdif = [0, 0];
                          itdif = [0, 0];
                          otdif = [0, 0];
                        }
                        nver[ak - 1].push(ver[av] + verd0 + vdif);
                        ntin[ak - 1].push(tin[av] + itd0 + itdif);
                        ntout[ak - 1].push(tout[av] + otd0 + otdif);
                      }
                    }
                  }
                }
                Write_Mask_Data(iak, oak);
              }
              nver = [];
              ntin = [];
              ntout = [];
              if (vars.length == 0) {
                var varak0 = s.nearestKeyIndex(ct);
              } else {
                var varak0 = vars[0];
              }
              var v = s.keyValue(varak0);
              var mver = v.vertices;
              var mit = v.inTangents;
              var mot = v.outTangents;
              for (var ak = 1; ak <= varak0; ak += 1) {
                var ver = marr[ak - 1][0];
                var tin = marr[ak - 1][1];
                var tout = marr[ak - 1][2];
                nver[ak - 1] = [];
                ntin[ak - 1] = [];
                ntout[ak - 1] = [];
                for (var av = 0; av < ver.length; av += 1) {
                  var verd = mver[av] - marr[varak0 - 1][0][av];
                  var itd = mit[av] - marr[varak0 - 1][1][av];
                  var otd = mot[av] - marr[varak0 - 1][2][av];
                  nver[ak - 1].push(ver[av] + verd);
                  ntin[ak - 1].push(tin[av] + itd);
                  ntout[ak - 1].push(tout[av] + otd);
                }
              }
              var iak = 1;
              var oak = varak0;
              Write_Mask_Data(iak, oak);
              nver = [];
              ntin = [];
              ntout = [];
              if (vars.length == 0) {
                var varakF = s.nearestKeyIndex(ct);
              } else {
                var varakF = vars[vars.length - 1];
              }
              if (varakF > lastak) {
                varakF = lastak;
              }
              var v = s.keyValue(varakF);
              var mver = v.vertices;
              var mit = v.inTangents;
              var mot = v.outTangents;
              var slen = s.numKeys;
              if (slen > lastak) {
                slen = lastak;
              }
              slen = marr.length;
              for (var ak = varakF; ak <= slen; ak++) {
                var ver = marr[ak - 1][0];
                var tin = marr[ak - 1][1];
                var tout = marr[ak - 1][2];
                nver[ak - 1] = [];
                ntin[ak - 1] = [];
                ntout[ak - 1] = [];
                for (var av = 0; av < ver.length; av += 1) {
                  var verd = mver[av] - marr[varakF - 1][0][av];
                  var itd = mit[av] - marr[varakF - 1][1][av];
                  var otd = mot[av] - marr[varakF - 1][2][av];
                  nver[ak - 1].push(ver[av] + verd);
                  ntin[ak - 1].push(tin[av] + itd);
                  ntout[ak - 1].push(tout[av] + otd);
                }
              }
              var iak = varakF;
              var oak = slen;
              Write_Mask_Data(iak, oak);
            }
          }
          if (o.expression.length > 0) {
            var exp = o.expression;
            var res = eval(exp);
            var marr = res[0];
            var vars = res[1];
            var orivars = res[2];
            var id = res[3];
          }
          var slk = (sl.outPoint - sl.inPoint) * fps;
          var slkt = sl.outPoint - sl.inPoint;
          if (Number(s.numKeys) < Number(slk)) {
          }
          var target_window = new Window("palette");
          target_window.text = "Select";
          var set_bt = target_window.add("button", undefined, "Set");
          set_bt.alignment = ["center", "bottom"];
          set_bt.size = [60, 22];
          set_bt.helpTip =
            "Set a virtual key. Add a virtual key to the tracked property.";
          var del_bt = target_window.add("button", undefined, "Delete");
          del_bt.alignment = ["center", "bottom"];
          del_bt.size = [60, 22];
          del_bt.helpTip =
            "Delete a virtual key. In order to work the time bar must be moved to the virtual key frame.";
          var reset_bt = target_window.add("button", undefined, "Reset");
          reset_bt.alignment = ["center", "bottom"];
          reset_bt.size = [60, 22];
          reset_bt.helpTip =
            "Reset: remove all the virtual keys and get back to the original state.";
          var bake_bt = target_window.add("button", undefined, "Bake");
          bake_bt.alignment = ["center", "bottom"];
          bake_bt.size = [60, 22];
          bake_bt.helpTip = "Bake: bake keys and clean edit data on mask.";
          set_bt.onClick = function () {
            app.beginUndoGroup("Set Mask Keys");
            Set_Mask(true);
            app.endUndoGroup();
          };
          bake_bt.onClick = function () {
            app.beginUndoGroup("Bake Mask Data");
            if (o.expression.length > 0) {
              o.expression = "";
            }
            var mkr = sl.property("Marker");
            for (var ak = mkr.numKeys; ak > 0; ak--) {
              var mk = mkr.removeKey(ak);
            }
            app.endUndoGroup();
          };
          reset_bt.onClick = function () {
            app.beginUndoGroup("Reset Mask Key");
            sl = app.project.activeItem.selectedLayers[0];
            s = m.property(1);
            if (o.expression.length > 0) {
              var exp = o.expression;
              var res = eval(exp);
              var marr = res[0];
              var vars = [];
              var orivars = res[2];
              var id = res[3];
            }
            o.expression = JSON.stringify(
              [marr, orivars, orivars, id],
              undefined,
              "",
            );
            o.expressionEnabled = false;
            var mkr = sl.property("Marker");
            for (var ak = mkr.numKeys; ak > 0; ak--) {
              var mk = mkr.removeKey(ak);
            }
            Load_Markers();
            var times = [];
            var vals = [];
            var slen = s.numKeys;
            if (slen > lastak) {
              slen = lastak;
            }
            slen = marr.length;
            for (var ak = 0; ak < slen; ak += 1) {
              var t = s.keyTime(ak + 1);
              times.push(t);
              var v = s.keyValue(ak + 1);
              v.vertices = marr[ak][0];
              v.inTangents = marr[ak][1];
              v.outTangents = marr[ak][2];
              vals.push(v);
            }
            s.setValuesAtTimes(times, vals);
            m.selected = true;
            app.endUndoGroup();
          };
          del_bt.onClick = function () {
            app.beginUndoGroup("Delete Mask Key");
            sl = app.project.activeItem.selectedLayers[0];
            s = m.property(1);
            if (o.expression.length > 0) {
              var exp = o.expression;
              var res = eval(exp);
              var marr = res[0];
              var vars = res[1];
              var orivars = res[2];
              var id = res[3];
            }
            var ct = app.project.activeItem.time;
            var vars2 = [];
            var mkr = sl.property("Marker");
            for (var ak = 0; ak < vars.length; ak += 1) {
              var cur_k = s.nearestKeyIndex(ct);
              if (vars[ak].toString() != cur_k.toString()) {
                vars2.push(vars[ak]);
              }
            }
            o.expression = JSON.stringify(
              [marr, vars2, orivars, id],
              undefined,
              "",
            );
            o.expressionEnabled = false;
            for (var ak = mkr.numKeys; ak > 0; ak--) {
              var mk = mkr.removeKey(ak);
            }
            Load_Markers();
            Set_Mask(false);
            m.selected = true;
            app.endUndoGroup();
          };
          target_window.onClose = function () {
            edit_fr = target_window.frameLocation;
            if (app.project.activeItem.selectedLayers.length > 0) {
              var sl = app.project.activeItem.selectedLayers[0];
              var mkr = sl.property("Marker");
              s = m.property(1);
              app.beginUndoGroup("Remove Markers On Close");
              for (var ak = mkr.numKeys; ak > 0; ak--) {
                var mk = mkr.removeKey(ak);
              }
              app.endUndoGroup();
              m.selected = true;
            }
          };
          Load_Markers();
          target_window.show();
        }
      }
      function _Layer_Type() {
        var ltype = false;
        var mks = [];
        var sl = app.project.activeItem.selectedLayers[0];
        var fxs = sl.effect;
        var cnt = 0;
        if (sl.source instanceof CompItem) {
          var name = sl.name;
          if (name.slice(0, 6) == "CR_LK_") {
            var mc = 0;
            for (var am = 0; am < sl.mask.numProperties; am += 1) {
              var m = sl.mask.property(am + 1);
              if (m.selected) {
                mc++;
              }
            }
            if (mc != 1 || ui_type == "crop") {
              ltype = "crop";
              cnt = 1;
            }
          }
          if (ltype === false) {
            for (var al = 1; al <= sl.source.layers.length; al += 1) {
              var midc = sl.source.layer(al);
              if (midc.source instanceof CompItem) {
                if (midc.effect.numProperties == 2) {
                  if (
                    midc.effect.property(1).matchName == "CC Power Pin" &&
                    midc.effect.property(2).matchName == "ADBE BEZMESH"
                  ) {
                    ltype = "multi";
                    cnt = 1;
                    break;
                  }
                }
                if (ltype != "multi") {
                  for (var ag = 1; ag <= midc.source.layers.length; ag += 1) {
                    var oril = midc.source.layer(ag);
                    if (oril.property("ADBE Effect Parade").numProperties > 0) {
                      for (
                        var ae = 1;
                        ae <= oril.property("ADBE Effect Parade").numProperties;
                        ae += 1
                      ) {
                        var fx = oril
                          .property("ADBE Effect Parade")
                          .property(ae);
                        if (
                          fx.name === "Corners Clone Pin" ||
                          fx.matchName === "CC Power Pin"
                        ) {
                          var e = fx.property("CC Power Pin-0002").expression;
                          ltype = "pins";
                          cnt = 1;
                        }
                        if (ltype == "pins") {
                          break;
                        }
                      }
                    }
                    if (ltype == "pins") {
                      break;
                    }
                  }
                }
              }
              var name = sl.name;
              if (name.slice(0, 8) == "RE_WARP_") {
                if (sl.source instanceof CompItem) {
                  for (var ae = 0; ae < sl.effect.numProperties; ae += 1) {
                    if (
                      sl.effect.property(ae + 1).matchName == "ADBE FreePin3"
                    ) {
                      ltype = "puppet";
                      var puppet = sl
                        .property("ADBE Effect Parade")
                        .property("ADBE FreePin3");
                      var deform = puppet
                        .property("ADBE FreePin3 ARAP Group")
                        .property("ADBE FreePin3 Mesh Group")
                        .property("ADBE FreePin3 Mesh Atom")
                        .property("ADBE FreePin3 PosPins");
                      if (deform.numProperties) {
                        var chk = 0;
                        var res = null;
                        for (var av = 0; av < deform.numProperties; av += 1) {
                          var p = deform.property(av + 1);
                          var pp = p.property("ADBE FreePin3 PosPin Position");
                          if (pp.numKeys > 1) {
                            chk++;
                          }
                        }
                        if (chk > 0) {
                          res = deform;
                          cnt = 1;
                          break;
                        }
                      }
                    }
                  }
                }
              }
              if (ltype == "pins" || ltype == "multi" || ltype == "puppet") {
                break;
              }
            }
          }
        }
        if (ltype === false) {
          var name = sl.name;
          if (fxs.numProperties > 0) {
            for (var af = 1; af <= fxs.numProperties; af += 1) {
              var fx = fxs.property(af);
              if (
                fx.matchName == "CC Power Pin" ||
                fx.matchName == "ADBE Corner Pin"
              ) {
                ltype = "corners";
                var res = fx;
                cnt++;
              }
            }
          }
        }
        if (ltype === false) {
          for (var ae = 1; ae <= fxs.numProperties; ae += 1) {
            var fx = sl.effect.property(ae);
            if (fx.selected) {
              if (fx.matchName == "mochaAECC") {
                ltype = "mocha";
                var res = fx;
                cnt++;
              }
              if (fx.matchName == "mochaProAE") {
                ltype = "mochapro";
                var res = fx;
                cnt++;
              }
            }
          }
        }
        if (ltype === false) {
          for (var ae = 1; ae <= fxs.numProperties; ae += 1) {
            var fx = sl.effect.property(ae);
            if (fx.selected) {
              for (var ap = 1; ap <= fx.numProperties; ap += 1) {
                var pr = fx.property(ap);
                if (pr.propertyValueType !== undefined) {
                  var eot = pr.propertyValueType.toString();
                  eot = parseFloat(eot.slice(-2));
                } else {
                  var eot = 12;
                }
                if (
                  pr.canVaryOverTime &&
                  pr.numKeys > 0 &&
                  pr.selected &&
                  eot == 15
                ) {
                  ltype = "fx";
                  var res = pr;
                  cnt++;
                }
              }
            }
          }
        }
        if (ltype === false) {
          for (var ap = 1; ap <= 12; ap += 1) {
            var pr = sl.transform.property(ap);
            if (pr.selected) {
              ltype = "trans";
              cnt++;
              var res = pr;
            }
          }
        }
        if (ltype === false) {
          var masks = sl.property("ADBE Mask Parade");
          if (masks && masks.numProperties > 0) {
            for (var am = 0; am < masks.numProperties; am += 1) {
              var m = masks.property(am + 1);
              if (m.selected) {
                var s = m.property(1);
                if (s.numKeys > 1) {
                  mks.push(am + 1);
                  ltype = "mask";
                  cnt++;
                  var res = m;
                }
              }
            }
          }
        }
        if (ltype === false) {
          var trackers = sl.property("ADBE MTrackers");
          if (trackers && trackers.numProperties > 0) {
            for (var atr = 0; atr < trackers.numProperties; atr += 1) {
              var tracker = sl.property("ADBE MTrackers").property(atr + 1);
              for (var at = 0; at < tracker.numProperties; at += 1) {
                var trk = tracker.property(at + 1);
                if (trk.selected) {
                  var p = trk.property("ADBE MTracker Pt Attach Pt");
                  if (p.numKeys > 1) {
                    ltype = "track";
                    cnt++;
                    var res = trk;
                  }
                }
              }
            }
          }
        }
        if (cnt != 1) {
          ltype = false;
        }
        return [ltype, res, cnt];
      }
      function _Listeners() {
        if (ui_type == "all") {
          generate_bt.onClick = function Listener_Generate_Button() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length > 0
            ) {
              fps = 1 / app.project.activeItem.frameDuration;
              ct = app.project.activeItem.time;
              if (generate_drop.selection.text == "Retrack") {
                _Load_00_Get_Data(true, "retrack");
                if (fdata.length > 0) {
                  _Retrack_00_Window("retrack");
                }
              }
              if (generate_drop.selection.text == "Rebuild") {
                _Load_00_Get_Data(true, "retrack", true);
                if (fdata.length > 0) {
                  _Auto_Rebuild_00_Get_Data();
                }
              }
              if (generate_drop.selection.text == "Crop") {
                if (app.project.activeItem.selectedLayers.length == 1) {
                  function Mchk() {
                    var chk = true;
                    if (fdata.length == 0) {
                      chk = false;
                    }
                    for (var at = 0; at < fdata.length; at += 1) {
                      if (fdata[at][3] != "mask") {
                        chk = false;
                        break;
                      }
                    }
                    return chk;
                  }
                  _Load_00_Get_Data(false, "crop");
                  var chk = Mchk();
                  if (chk) {
                    _Crop_00_Window("crop");
                  } else {
                    alert("Please select 1 tracked mask to proceed.");
                  }
                }
              }
              if (
                generate_drop.selection.text == "Pins Bilinear" ||
                generate_drop.selection.text == "Pins Perspective"
              ) {
                if (app.project.activeItem.selectedLayers.length == 1) {
                  _Load_00_Get_Data(false, "pins");
                  var chk = true;
                  for (var at = 0; at < fdata.length; at += 1) {
                    if (fdata[at][3] != "mask") {
                      chk = false;
                      break;
                    }
                  }
                  if (chk) {
                    app.beginUndoGroup("Generate Pins Clone");
                    if (generate_drop.selection == 2) {
                      _Pins_00_Set_Pins(false);
                    } else {
                      _Pins_00_Set_Pins(true);
                    }
                    app.endUndoGroup();
                  } else {
                    alert("Please select 1 tracked 4 points mask to proceed.");
                  }
                }
              }
              if (generate_drop.selection.text == "Multi Pins") {
                _Load_00_Get_Data(true, "retrack");
                if (fdata.length > 3) {
                  _Quadrilateral_00_Set_Quadrilaterals();
                }
              }
              if (generate_drop.selection.text == "Puppet Warp") {
                _Load_00_Get_Data(true, "retrack");
                if (fdata.length > 3) {
                  _Puppet_Warp_00_Set_Puppet();
                }
              }
            }
          };
        }
        if (ui_type == "track") {
          track_bt.onClick = function Listener_Generate_Button() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length > 0
            ) {
              tr_cnt++;
              if (isTrial !== true || (isTrial && tr_cnt <= 15)) {
                fps = 1 / app.project.activeItem.frameDuration;
                ct = app.project.activeItem.time;
                _Load_00_Get_Data(true, "retrack");
                if (fdata.length > 0) {
                  _Retrack_00_Window("retrack");
                }
              } else {
                alert(
                  "Sorry, trial mode is limited to 15 maximum operations. Please close the script and open it again to reset the counter.",
                );
              }
            }
          };
          fill_bt.onClick = function Listener_Fill_Button() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length > 0
            ) {
              tr_cnt++;
              if (isTrial !== true || (isTrial && tr_cnt <= 15)) {
                _Load_00_Get_Data(true, "retrack", true);
                if (fdata.length > 0) {
                  _Auto_Rebuild_00_Get_Data();
                }
              }
            }
          };
        }
        if (ui_type == "warp") {
          warp_bt.onClick = function Listener_Warp_Button() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length > 0
            ) {
              tr_cnt++;
              if (isTrial !== true || (isTrial && tr_cnt <= 15)) {
                fps = 1 / app.project.activeItem.frameDuration;
                ct = app.project.activeItem.time;
                _Load_00_Get_Data(true, "retrack");
                if (fdata.length > 0) {
                  _Puppet_Warp_00_Set_Puppet();
                }
              } else {
                alert(
                  "Sorry, trial mode is limited to 15 maximum operations. Please close the script and open it again to reset the counter.",
                );
              }
            }
          };
        }
        if (ui_type == "crop") {
          track_bt.onClick = function Listener_Generate_Button() {
            if (app.project.activeItem.selectedLayers.length == 1) {
              function Mchk() {
                var chk = true;
                if (fdata.length == 0) {
                  chk = false;
                }
                for (var at = 0; at < fdata.length; at += 1) {
                  if (fdata[at][3] != "mask") {
                    chk = false;
                    break;
                  }
                }
                return chk;
              }
              _Load_00_Get_Data(false, "crop");
              var chk = Mchk();
              if (chk) {
                _Crop_00_Window();
              } else {
                alert("Please select 1 tracked mask to proceed.");
              }
            }
          };
        }
        edit_bt.onClick = function _Listeners_Edit() {
          if (
            app.project &&
            app.project.activeItem &&
            app.project.activeItem.selectedLayers.length == 1
          ) {
            tr_cnt++;
            if (isTrial !== true || (isTrial && tr_cnt <= 15)) {
              var res = _Layer_Type();
              var ltype = res[0];
              if (ltype == "pins") {
                _Pins_01_Edit_Pins();
              } else {
                if (ltype == "crop") {
                  _Crop_02_Edit_Crop();
                } else {
                  var sl = app.project.activeItem.selectedLayers[0];
                  var masks = sl.property("ADBE Mask Parade");
                  var mks = res[1];
                  app.beginUndoGroup("Format Mask for Edit");
                  if (ltype == "mask") {
                    var m = res[1];
                    var o = m.property(3);
                    if (o.expression == "") {
                      var ok = _Tracked_Masks_00_Format_Editable_Masks(sl, m);
                    }
                    if (ok) {
                      _Tracked_Masks_01_Edit_Masks_Window(sl, m);
                    }
                  }
                  if (ltype == "fx") {
                    var o = res[1];
                    if (o.expression == "") {
                      _Tracked_2D_00_Format_Editable_2D(sl, sl, ltype, o);
                    }
                    _Tracked_2D_01_Edit_2D_Window(sl, sl, ltype, o);
                  }
                  if (ltype == "corners") {
                    var o = res[1];
                    if (o.property(1).expression == "") {
                      _Tracked_2D_00_Format_Editable_2D(sl, sl, ltype, o);
                    }
                    _Tracked_2D_01_Edit_2D_Window(sl, sl, ltype, o);
                  }
                  if (ltype == "mocha" || ltype == "mochapro") {
                    var o = res[1];
                    if (o.property(1).expression == "") {
                      _Tracked_2D_00_Format_Editable_2D(sl, sl, ltype, o);
                    }
                    _Tracked_2D_01_Edit_2D_Window(sl, sl, ltype, o);
                  }
                  if (ltype == "trans") {
                    var o = res[1];
                    if (o.expression == "") {
                      _Tracked_2D_00_Format_Editable_2D(sl, sl, ltype, o);
                    }
                    _Tracked_2D_01_Edit_2D_Window(sl, sl, ltype, o);
                  }
                  if (ltype == "puppet") {
                    var pp = res[1];
                    var o = res[1].property(1).property("Position");
                    if (o.expression == "") {
                      _Tracked_2D_00_Format_Editable_2D(sl, pp, ltype);
                    }
                    _Tracked_2D_01_Edit_2D_Window(sl, pp, ltype, pp);
                  }
                  if (ltype == "track") {
                    var trk = res[1];
                    sl.openInViewer();
                    var o = trk.property("ADBE MTracker Pt Attach Pt");
                    if (o.expression == "") {
                      _Tracked_2D_00_Format_Editable_2D(sl, trk, ltype);
                    }
                    _Tracked_2D_01_Edit_2D_Window(sl, trk, ltype, trk);
                  }
                  app.endUndoGroup();
                }
              }
              if (ltype === false) {
                alert(
                  "Please select: 1 tracked mask, or 1 tracked layer transoformation property, or 1 mocha effect, or 1 corner pin effect, or 1 retracked effect property, or 1 tracked motion tracker point to proceed.",
                );
              }
            } else {
              alert(
                "Sorry, trial mode is limited to 15 maximum operations. Please close the script and open it again to reset the counter.",
              );
            }
          }
        };
        if (ui_type == "all") {
          reset_bt.onClick = function Listener_Reset() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length == 1
            ) {
              var res = _Layer_Type();
              var ltype = res[0];
              var mks = res[1];
              if (ltype == "pins") {
                _Pins_01_Reset_Pins();
              } else {
                if (ltype == "crop") {
                  _Crop_03_Reset_Crop();
                }
              }
            }
          };
        }
        if (ui_type == "all" || ui_type == "crop") {
          remove_bt.onClick = function Listener_Remove() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length == 1
            ) {
              var res = _Layer_Type();
              var ltype = res[0];
              var mks = res[1];
              Remove_Clones(ltype);
            }
          };
        }
        if (ui_type == "all" || ui_type == "crop") {
          dupli_bt.onClick = function Listener_Duplicate() {
            if (
              app.project &&
              app.project.activeItem &&
              app.project.activeItem.selectedLayers.length == 1
            ) {
              var res = _Layer_Type();
              var ltype = res[0];
              var mks = res[1];
              Duplicate_Clones(ltype);
            }
          };
        }
        settings_bt.onClick = function Listener_Settings() {
          _Settings();
        };
      }
      var script_name = "ReTrack";
      var data = [];
      var fdata = [];
      var tr_cnt = 0;
      var trk_ratio = 75;
      var clonetype = false;
      if (isTrial) {
        var max_ver_length = 8;
      } else {
        var max_ver_length = 20;
      }
      var multi_pins_max_dist = 12;
      var retrack_min_side = 20;
      var crop_exp_x = 20;
      var crop_exp_y = 20;
      var crop_line = true;
      var pt_color = [1, 1, 1, 1];
      var mk_color = [1, 1, 0, 1];
      var pt_size_value = 10;
      var bg_opa_value = 40;
      var sk_size_value = 5;
      var track_fr = [600, 400];
      var edit_fr = [800, 400];
      var convert = [];
      convert[0] = "Convert Expression to Keyframes";
      convert[1] = "Expression in Keyframes umwandeln";
      convert[2] = "Convertir expresi\xf3n en fotogramas clave";
      convert[3] = "Convertir l\'expression en images cl\xe9s";
      convert[4] = "Converti espressione in fotogrammi chiave";
      convert[5] =
        "\u30a8\u30af\u30b9\u30d7\u30ec\u30c3\u30b7\u30e7\u30f3\u3092\u30ad\u30fc\u30d5\u30ec\u30fc\u30e0\u306b\u5909\u63db";
      convert[6] =
        "\ud45c\ud604\uc2dd\uc744 \ud0a4\ud504\ub808\uc784\uc73c\ub85c \ubcc0\ud658";
      convert[7] = "Converter express\xe3o em quadros-chave";
      convert[8] =
        "\u041f\u0440\u0435\u043e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u0442\u044c \u0432\u044b\u0440\u0430\u0436\u0435\u043d\u0438\u0435 \u0432 \u043a\u043b\u044e\u0447\u0435\u0432\u044b\u0435 \u043a\u0430\u0434\u0440\u044b";
      convert[9] =
        "\u5c06\u8868\u8fbe\u5f0f\u8f6c\u6362\u4e3a\u5173\u952e\u5e27";
      var rotobezier = [];
      rotobezier[0] = "RotoBezier";
      rotobezier[1] = "RotoB\xe9zier";
      rotobezier[2] = "RotoB\xe9zier";
      rotobezier[3] = "RotoB\xe9zier";
      rotobezier[4] = "RotoB\xe9zier";
      rotobezier[5] = "\u30ed\u30c8\u30d9\u30b8\u30a7";
      rotobezier[6] = "\ub85c\ud1a0\ubca0\uc9c0\uc5b4";
      rotobezier[7] = "RotoB\xe9zier";
      rotobezier[8] = "RotoBezier";
      rotobezier[9] = "RotoBezier";
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
      if (typeof Array.prototype.indexOf != "function") {
        Array.prototype.indexOf = function (el) {
          for (var i = 0; i < this.length; i += 1) {
            if (el === this[i]) {
              return i;
            }
          }
          return -1;
        };
      }
      if (typeof Array.prototype.dupliOf != "function") {
        Array.prototype.dupliOf = function (el) {
          var c = 0;
          for (var i = 0; i < this.length; i += 1) {
            if (el === this[i]) {
              c++;
            }
          }
          return c;
        };
      }
      icons_arr = [];
      icons_arr[0] = __BLOB__BLOB_000514__;
      icons_arr[0] = __BLOB__BLOB_000515__;
      icons_arr[1] = __BLOB__BLOB_000516__;
      icons_arr[2] = __BLOB__BLOB_000517__;
      icons_arr[2] = __BLOB__BLOB_000518__;
      icons_arr[3] = __BLOB__BLOB_000519__;
      icons_arr[4] = __BLOB__BLOB_000520__;
      icons_arr[5] = __BLOB__BLOB_000521__;
      icons_arr[6] = __BLOB__BLOB_000522__;
      icons_arr[7] = __BLOB__BLOB_000523__;
      icons_arr[8] = __BLOB__BLOB_000524__;
      icons_arr[9] = __BLOB__BLOB_000525__;
      icons_arr[10] = __BLOB__BLOB_000526__;
      icons_arr[11] = __BLOB__BLOB_000527__;
      icons_arr[12] = __BLOB__BLOB_000528__;
      var track_image = ScriptUI.newImage(icons_arr[0]);
      var settings_image = ScriptUI.newImage(icons_arr[1]);
      var edit_image = ScriptUI.newImage(icons_arr[2]);
      var reset_image = ScriptUI.newImage(icons_arr[3]);
      var dupli_image = ScriptUI.newImage(icons_arr[4]);
      var remove_image = ScriptUI.newImage(icons_arr[5]);
      var mask_image = ScriptUI.newImage(icons_arr[2]);
      var logo_image = ScriptUI.newImage(icons_arr[6]);
      var crop_image = ScriptUI.newImage(icons_arr[7]);
      var crop_edit_image = ScriptUI.newImage(icons_arr[8]);
      var warp_image = ScriptUI.newImage(icons_arr[9]);
      var warp_edit_image = ScriptUI.newImage(icons_arr[10]);
      var rebuild_image = ScriptUI.newImage(icons_arr[11]);
      if (ui_type == "crop") {
        logo_image = ScriptUI.newImage(icons_arr[12]);
      }
      var mainPalette =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", af_settings.scriptName, undefined, {
              resizeable: true,
            });
      if (mainPalette == null) {
        return;
      }
      mainPalette.minimumSize.height = 55;
      mainPalette.alignChildren = ["fill", "fill"];
      mainPalette.margins = 5;
      mainPalette.spacing = 2;
      var content = mainPalette.add("group");
      content.alignChildren = ["fill", "fill"];
      content.orientation = "column";
      content.margins = 5;
      content.spacing = 2;
      var edit_grp = content.add("group");
      edit_grp.alignment = ["fill", "top"];
      edit_grp.orientation = "row";
      if (ui_type == "track") {
        var track_bt = edit_grp.add("iconbutton", undefined, track_image);
        track_bt.alignment = ["fill", "top"];
        track_bt.size = [25, 25];
        track_bt.helpTip =
          "ReTrack using selected tracked items:\n\nMasks\nTrackers\nFace Track Points Effect\nMocha Tracking Data\n3D Camera Tracking Layers\n2D Tracked Layers";
        var fill_bt = edit_grp.add("iconbutton", undefined, rebuild_image);
        fill_bt.alignment = ["fill", "top"];
        fill_bt.size = [25, 25];
        fill_bt.helpTip =
          "Auto-rebuild tracked items missing keyframes:\n\nMasks\nTrackers\nFace Track Points Effect\nMocha Tracking Data\n3D Camera Tracking Layers\n2D Tracked Layers";
        var edit_bt = edit_grp.add("iconbutton", undefined, edit_image);
        edit_bt.alignment = ["fill", "top"];
        edit_bt.size = [25, 25];
        edit_bt.helpTip =
          "Edit selected tracked items:\n\n1 Mask\n1 Tracker Point\n1 Corner Pin Effect\nMocha Tracking Data\n1 Effect Property\n1 Layer Transform Property";
      }
      if (ui_type == "crop") {
        var track_bt = edit_grp.add("iconbutton", undefined, crop_image);
        track_bt.alignment = ["fill", "top"];
        track_bt.size = [25, 25];
        track_bt.helpTip =
          "Crop & Lock: select a tracked mask to generate a cropped clone.";
        var edit_bt = edit_grp.add("iconbutton", undefined, crop_edit_image);
        edit_bt.alignment = ["fill", "top"];
        edit_bt.size = [25, 25];
        edit_bt.helpTip = "Edit selected Cropped Clone.";
        var dupli_bt = edit_grp.add("iconbutton", undefined, dupli_image);
        dupli_bt.alignment = ["fill", "top"];
        dupli_bt.size = [25, 25];
        dupli_bt.helpTip = "Duplicate cropped clone.";
        var remove_bt = edit_grp.add("iconbutton", undefined, remove_image);
        remove_bt.alignment = ["fill", "top"];
        remove_bt.size = [25, 25];
        remove_bt.helpTip = "Remove cropped clone.";
      }
      if (ui_type == "warp") {
        var warp_bt = edit_grp.add("iconbutton", undefined, warp_image);
        warp_bt.alignment = ["fill", "top"];
        warp_bt.size = [25, 25];
        warp_bt.helpTip =
          "ReWarp using selected tracked items:\n\nMasks\nTrackers\nFace Track Points Effect\nMocha Tracking Data\n3D Camera Tracking Layers\n2D Tracked Layers";
        var edit_bt = edit_grp.add("iconbutton", undefined, warp_edit_image);
        edit_bt.alignment = ["fill", "top"];
        edit_bt.size = [25, 25];
        edit_bt.helpTip = "Edit selected Warp Comp";
      }
      if (ui_type == "all") {
        var edit_bt = edit_grp.add("iconbutton", undefined, edit_image);
        edit_bt.alignment = ["fill", "top"];
        edit_bt.size = [25, 25];
        edit_bt.helpTip =
          "Edit selected tracked items:\n\n1 Mask\n1 Tracker Point\n1 Corner Pin Effect\nMocha Tracking Data\n1 Effect Property\n1 Layer Transform Property";
        var dupli_bt = edit_grp.add("iconbutton", undefined, dupli_image);
        dupli_bt.alignment = ["fill", "top"];
        dupli_bt.size = [25, 25];
        dupli_bt.helpTip = "Duplicate clone.";
        var reset_bt = edit_grp.add("iconbutton", undefined, reset_image);
        reset_bt.alignment = ["fill", "top"];
        reset_bt.size = [25, 25];
        reset_bt.helpTip = "Reset clone.";
        var remove_bt = edit_grp.add("iconbutton", undefined, remove_image);
        remove_bt.alignment = ["fill", "top"];
        remove_bt.size = [25, 25];
        remove_bt.helpTip = "Remove clone.";
      }
      var settings_bt = edit_grp.add("iconbutton", undefined, settings_image);
      settings_bt.alignment = ["fill", "top"];
      settings_bt.size = [25, 25];
      settings_bt.helpTip = "Settings.";
      if (ui_type == "all") {
        var margin_grp2 = content.add("group", undefined, "");
        margin_grp2.orientation = "row";
        margin_grp2.alignment = ["left", "top"];
        margin_grp2.minimumSize.height = 15;
        var generate_grp = content.add("group");
        generate_grp.alignment = ["fill", "top"];
        generate_grp.orientation = "row";
        var generate_drop = generate_grp.add("dropdownlist", undefined, [
          "Retrack",
          "Rebuild",
          "Crop",
          "Pins Bilinear",
          "Pins Perspective",
          "Multi Pins",
          "Puppet Warp",
        ]);
        generate_drop.orientation = "column";
        generate_drop.alignment = ["left", "top"];
        generate_drop.size = [105, 25];
        var generate_bt = generate_grp.add(
          "iconbutton",
          undefined,
          track_image,
        );
        generate_bt.alignment = ["right", "top"];
        generate_bt.size = [70, 25];
        generate_bt.orientation = "column";
        generate_bt.helpTip = "Set retracked items";
        generate_drop.selection = 0;
      }
      _Listeners();
      mainPalette.layout.layout(true);
      mainPalette.layout.resize();
      mainPalette.onResizing = mainPalette.onResize = function () {
        mainPalette.layout.resize();
      };
      if (!(mainPalette instanceof Panel)) {
        mainPalette.show();
      }
    }
    var ui_type = "track";
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
                "\'], \r                   alignChildren: [\'fill\',\'fill\'], \r                    txt: EditText {properties:{multiline:true, readonly:true}}, \r\t\t\t\t} \r                prefsGrp: Group {\r                       alignment: [\'fill\',\'bottom\'], \r                       alignChildren: [\'left\',\'center\'], \r                       orientation: \'row\', \r                       doUpdateCheck: Checkbox {text:\'" +
                strVersionCheck +
                "\', alignment: [\'left\',\'center\']} \r                       checkNow: Button {text:\'" +
                strCheckNow +
                "\', preferredSize:[150,20], alignment: [\'left\',\'center\']} \r                       }\r\t\t\tokGrp: Group { \r                alignment: [\'fill\',\'bottom\'], \r                alignChildren: [\'fill\',\'center\'], \r                 supportBtn: Button {text:\'" +
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
            doUpdateCheckNow();
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
          i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
            /%v/,
            t.version,
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
            var o = versionCheck(strSKU, true);
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
                    null != i &&
                      0 == compare(l, i) &&
                      n <= s &&
                      newVersionUI(o))
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
      function versionCheck(e, t) {
        var i = extComms(
          "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
            e +
            t
            ? "&latest=1"
            : "" + parseFloat(app.version) < 12
              ? "&clip_length=200"
              : "&clip_length=300",
        );
        if (null == i || "" == i) {
          return null;
        }
        try {
          if (null == (i = JSONify(i, "parse"))) {
            return null;
          }
        } catch (e) {
          return null;
        }
        return "ok" != i.status
          ? null
          : t
            ? {
                date: i.latest.release_date,
                detail: i.latest.detail,
                header: strVersionRev
                  .replace(/%a/, i.version)
                  .replace(/%b/, "")
                  .replace(/%c/, i.latest.release_date),
                version: i.version,
              }
            : { version: i.version };
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
                licErrors[locale][checkErrorCode(licenseValidity.result)]
                  .detail +
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
        var d =
          strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
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
        var e = isServerConfigured(licenseValidity)
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
          app.executeCommand(2359),
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
      var licensingVersion = "3.0.32";
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
      var remindMeLaterDays = 7;
      var doUpdateCheck = true;
      var updateCheckInterval = 7;
      var maxUIButtons = 3;
      var licV = 2;
      if ($.os.indexOf("Mac") != -1) {
        mx = __BLOB__BLOB_000529__;
      } else {
        wx = __BLOB__BLOB_000530__;
      }
      if ($.os.indexOf("Mac") != -1) {
        mx1 = __BLOB__BLOB_000531__;
      } else {
        wx1 = __BLOB__BLOB_000532__;
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
        en: "CGPERSIA",
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
            title: "CGPERSIA",
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
      var prefsNextTimeVersionCheckedStatus =
        strHeader + "_NextTimeVersionCheckedStatus";
      var prefsDoUpdateCheck = strHeader + "_doUpdateCheck";
      haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
        (doUpdateCheck = !(
          "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
        ));
      ScriptUI.environment.keyboardState.shiftKey &&
        ScriptUI.environment.keyboardState.altKey &&
        ((doUpdateCheck = false),
        saveSettings(prefsSectionName, prefsDoUpdateCheck, false));
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
    var helptxt =
      "ReTrack is a motion tracking generator and editor. Load any kind of tracking data in order to create new tracked items, or edit tracked data faster thanks to virtual keyframes.\n\nTRACK BUTTON\nThe Track button open the tracking assistant and generate the Tracked Points cloud.\nThe Select button load the drawed masks to retrack.\nThe ReTrack button track the loaded masks by using the selected Tracked Points.\nThe Done button enable the output section.\nThe Set button set the chosen output type.\n\nAUTO REBUILD BUTTON\nThe Auto Rebuild button open the Rebuild Window.\nThe Position method need at least 2 tracked items, and works best on simple horizontal and vertical motion.\nThe Perspective method need at least 3 tracked items, and works best on perspective and rotational motion.\nThe Rebuild button fill the missing keyframes.\n\nEDIT BUTTON\nThe Edit button open the Edit Window.\nThe Set button set a new virtual key on selected item property.\nThe Remove button remove the virtual key corresponding to the time bar on selected item property.\nThe Reset button reset the tracking on the selected item property.\nThe Bake button freeze the keyframes current state on the selected item property and make the item ready for a new edit.\n\nSETTINGS BUTTON\nThe Settings button open the settings window.\n\nTRIAL LIMITATIONS\nTrial mode is limited to 15 track / edit operations.\nOnly 8 vertices per mask are allowed in the settings panel.";
    var af_settings = {
      betaExpirationDate: new Date("Dec 1, 2017"),
      betaStartDate: new Date("Nov 1, 2017"),
      betaSupportEmail: "http://aescripts.com/contact",
      helpButtons: [],
      helpText: helptxt,
      offerBeta: false,
      offerTrial: true,
      privateNumber: 7945358561387336,
      productSKU: "MSNR2-SUL",
      scriptAuthor: "Marco Sanasi",
      scriptName: "ReTrack 2",
      scriptURL: "http://aescripts.com/retrack/",
      scriptVersion: "2.0.7",
    };
    var af = new a(af_settings);
    var RT_Set = new a(af_settings);
    if (RT_Set.c()) {
      var isTrial = af.t();
      ReTrack(thisObj);
    }
  }
}
ms_ReTrack_Global(this);
