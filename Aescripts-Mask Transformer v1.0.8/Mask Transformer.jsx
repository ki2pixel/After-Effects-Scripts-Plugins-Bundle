/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function ms_Mask_Transformer_Global(thisObj) {
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
    function Mask_Transformer(thisObj) {
      function Clear_Console() {
        var bt = new BridgeTalk();
        bt.target = "estoolkit-4.0";
        bt.body =
          function () {
            app.clc();
          }.toSource() + "()";
        bt.send(5);
      }
      function Get_New_Id() {
        var layers = app.project.activeItem.layers;
        var collect_ids = [];
        for (var al = 0; al < layers.length; al += 1) {
          lr = layers[al + 1];
          ind = lr.index;
          var masks = lr.property("ADBE Mask Parade");
          if (masks !== null && masks.numProperties > 0) {
            for (var am = 0; am < masks.numProperties; am += 1) {
              mask = masks.property(am + 1);
              id = Number(mask.name.split(" ID #")[1]);
              if (id) {
                collect_ids.push(id);
              }
            }
          }
        }
        if (collect_ids.length > 0) {
          var new_id =
            collect_ids.sort(function (a, b) {
              return b - a;
            })[0] + 1;
        } else {
          var new_id = 1;
        }
        return new_id;
      }
      function Check_Duplicates() {
        var layers = app.project.activeItem.layers;
        var al = layers.length;
        while (al > 0) {
          lr = layers[al];
          ind = lr.index;
          for (var lc = 1; lc <= layers.length; lc += 1) {
            ld = layers[lc];
            if (lr.name == ld.name && lr.index > ld.index) {
              var masks = lr.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = 0; am < masks.numProperties; am += 1) {
                  mask = masks.property(am + 1);
                  shape = mask.property(1);
                  if (shape.expression.length > 0) {
                    var mask_id = Number(mask.name.split(" ID #")[1]);
                    var t_masks = ld.property("ADBE Mask Parade");
                    for (var at = 0; at < t_masks.numProperties; at += 1) {
                      t_mask = t_masks.property(at + 1);
                      t_shape = t_mask.property(1);
                      if (t_shape.expression.length > 0) {
                        t_mask_id = Number(t_mask.name.split(" ID #")[1]);
                        if (mask_id == t_mask_id) {
                          var new_id = Get_New_Id();
                          t_mask.name =
                            t_mask.name.split(" ID #")[0].toString() +
                            " ID #" +
                            new_id;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          al--;
        }
      }
      function Set_Layer_Transform(pr, selected_layer) {
        var trans = selected_layer.property("ADBE Transform Group");
        for (var at = 0; at < 12; at += 1) {
          prop = trans.property(at + 1);
          if (prop.canSetExpression) {
            if (pr[at].keys.length > 0) {
              var keys_array = pr[at].keys;
              Add_Keys(prop, keys_array);
            } else {
              prop.setValue(pr[at].val);
            }
            if (pr[at].exp.length > 0) {
              prop.expression = pr[at].exp;
            }
          }
        }
      }
      function Set_Mask(pr, selected_layer, am) {
        var mask = selected_layer.property("ADBE Mask Parade").property(am);
        var mask_shape = mask.property("ADBE Mask Shape");
        var mm = pr.mode.toString();
        mm = parseFloat(mm.slice(-2));
        if (mm == 12) {
          mask.maskMode = MaskMode.NONE;
        }
        if (mm == 13) {
          mask.maskMode = MaskMode.ADD;
        }
        if (mm == 14) {
          mask.maskMode = MaskMode.SUBTRACT;
        }
        if (mm == 15) {
          mask.maskMode = MaskMode.INTERSECT;
        }
        if (mm == 16) {
          mask.maskMode = MaskMode.LIGHTEN;
        }
        if (mm == 17) {
          mask.maskMode = MaskMode.DARKEN;
        }
        if (mm == 18) {
          mask.maskMode = MaskMode.DIFFERENCE;
        }
        if (pr.keys == false) {
          var mask_value = mask_shape.value;
          mask_value.vertices = pr.val.vertices;
          mask_value.inTangents = pr.val.inTangents;
          mask_value.outTangents = pr.val.outTangents;
          key_value = mask_value;
          mask_shape.setValue(key_value);
        } else {
          var keys = pr.keys;
          Add_Keys(mask_shape, keys);
        }
        if (pr.exp.length > 0) {
          mask_shape.expression = pr.exp;
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
          var key_value = prop.keyValue(ak);
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
      function Get_Layer_Transform(selected_layer) {
        var cur_time = app.project.activeItem.time;
        var mask = selected_layer.property("ADBE Mask Parade").property(1);
        var shape = mask.property(1);
        var transformations = selected_layer.property("ADBE Transform Group");
        var trans = [];
        for (var ap = 0; ap < 12; ap += 1) {
          trans[ap] = {};
          prop = transformations.property(ap + 1);
          if (prop.canSetExpression) {
            if (prop.numKeys > 0) {
              trans[ap].keys = {};
              trans[ap].keys = Get_Key_Data(prop);
              trans[ap].val = false;
            } else {
              trans[ap].val = prop.value;
              trans[ap].keys = false;
            }
            trans[ap].exp = prop.expression;
          } else {
            trans[ap] = false;
          }
        }
        return trans;
      }
      function Get_Mask_Data(selected_layer, m_index) {
        var mask = selected_layer
          .property("ADBE Mask Parade")
          .property(m_index);
        var shape = mask.property(1);
        var pr = {};
        pr.mode = mask.maskMode;
        if (shape.numKeys > 0) {
          pr.keys = Get_Key_Data(shape);
          pr.val = false;
        } else {
          pr.val = shape.value;
          pr.keys = false;
        }
        pr.exp = shape.expression;
        return pr;
      }
      function Initialize_Mask(sl, m_index) {
        var mask = sl.property("ADBE Mask Parade").property(m_index);
        var shape = mask.property(1);
        var new_id = Get_New_Id();
        mask.name = mask.name + " - ID #" + new_id;
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
      function Clear_Layer_Properties(selected_layer) {
        if (selected_layer.isTrackMatte || selected_layer.hasTrackMatte) {
          selected_layer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
        }
        var cur_time = app.project.activeItem.time;
        var trans = selected_layer.property("ADBE Transform Group");
        for (var ap = 0; ap < 12; ap += 1) {
          var prop = trans.property(ap + 1);
          if (prop.canSetExpression) {
            if (prop.numKeys > 0) {
              var vat = prop.valueAtTime(cur_time, true);
              for (var ak = prop.numKeys; ak > 0; ak--) {
                prop.removeKey(ak);
              }
              prop.setValue(vat);
            }
            if (prop.expression.length > 0) {
              prop.expressionEnabled = false;
              prop.expression = "";
            }
          }
        }
      }
      function Dimensions_Check(sl, ori_lr, first, last) {
        var comp = app.project.activeItem;
        var a_ref = [sl.width / 2, sl.height / 2];
        var p_ref = [comp.width / 2, comp.height / 2];
        var s_ref = [100, 100, 100];
        var frames_per_sec = 1 / app.project.activeItem.frameDuration;
        var last_frame = (last - first) * frames_per_sec + 1;
        var ori_ok = (sl_ok = true);
        var bad_sl = [];
        var bad_ori = [];
        var p_mod = (a_mod = s_mod = false);
        for (var ap = 1; ap <= 12; ap += 1) {
          var prop = ori_lr.property("ADBE Transform Group").property(ap);
          if (prop.canSetExpression) {
            for (var ak = 0; ak < last_frame; ak += 1) {
              var t = first + ak * app.project.activeItem.frameDuration;
              var v = prop.valueAtTime(t, true);
              if (ap == 1) {
                bad_ori[ap] = true;
                if (v[2] != 0) {
                  ori_ok = false;
                  bad_ori[ap] = false;
                }
                if (v[0] != a_ref[0] || v[1] != a_ref[1]) {
                  a_mod = true;
                }
              }
              if (ap == 2) {
                bad_ori[ap] = true;
                if (v[2] != 0) {
                  ori_ok = false;
                  bad_ori[ap] = false;
                }
                if (v[0] != p_ref[0] || v[1] != p_ref[1]) {
                  p_mod = true;
                }
              }
              if (ap == 6) {
                if (v[0] != s_ref[0] || v[1] != s_ref[1] || v[2] != s_ref[2]) {
                  s_mod = true;
                }
              }
              if (ap == 7) {
                bad_ori[ap - 1] = true;
                bad_ori[ap] = true;
                if (v[0] != 0) {
                  ori_ok = false;
                  bad_ori[ap - 1] = false;
                  break;
                }
                if (v[1] != 0) {
                  ori_ok = false;
                  bad_ori[ap] = false;
                  break;
                }
              }
              if (ap == 8) {
                bad_ori[ap] = true;
                if (v != 0) {
                  ori_ok = false;
                  bad_ori[ap] = false;
                  break;
                }
              }
              if (ap == 9) {
                bad_ori[ap] = true;
                if (v != 0) {
                  ori_ok = false;
                  bad_ori[ap] = false;
                  break;
                }
              }
            }
          }
        }
        for (var ap = 1; ap <= 12; ap += 1) {
          var prop = sl.property("ADBE Transform Group").property(ap);
          if (prop.canSetExpression) {
            for (var ak = 0; ak < last_frame; ak += 1) {
              var t = first + ak * app.project.activeItem.frameDuration;
              var v = prop.valueAtTime(t, false);
              if (ap == 1) {
                bad_sl[ap] = true;
                if (v[2] != 0) {
                  sl_ok = false;
                  bad_sl[ap] = false;
                  break;
                }
              }
              if (ap == 2) {
                bad_sl[ap] = true;
                if (v[2] != 0) {
                  sl_ok = false;
                  bad_sl[ap] = false;
                  break;
                }
              }
              if (ap == 7) {
                bad_sl[ap - 1] = true;
                bad_sl[ap] = true;
                if (v[0] != 0) {
                  sl_ok = false;
                  bad_sl[ap - 1] = false;
                  break;
                }
                if (v[1] != 0) {
                  sl_ok = false;
                  bad_sl[ap] = false;
                  break;
                }
              }
              if (ap == 8) {
                bad_sl[ap] = true;
                if (v != 0) {
                  sl_ok = false;
                  bad_sl[ap] = false;
                  break;
                }
              }
              if (ap == 9) {
                bad_sl[ap] = true;
                if (v != 0) {
                  sl_ok = false;
                  bad_sl[ap] = false;
                  break;
                }
              }
            }
          }
        }
        var arr = [bad_ori, bad_sl, ori_ok, sl_ok, a_mod, p_mod, s_mod];
        return arr;
      }
      function Get_Data(selected_layer, action) {
        var cur_time = app.project.activeItem.time;
        var pr = {};
        pr.name = selected_layer.name;
        pr.comp_data = {};
        pr.comp_data.width = app.project.activeItem.width;
        pr.comp_data.height = app.project.activeItem.height;
        pr.comp_data.duration = app.project.activeItem.duration;
        pr.comp_data.frame_duration = app.project.activeItem.frameDuration;
        pr.comp_data.renderer = app.project.activeItem.renderer;
        pr.attr = {};
        if (
          selected_layer instanceof TextLayer ||
          selected_layer instanceof ShapeLayer
        ) {
          pr.attr.width = parseInt(
            selected_layer.sourceRectAtTime(0, true).width,
          );
        } else {
          pr.attr.width = selected_layer.width;
        }
        if (
          selected_layer instanceof TextLayer ||
          selected_layer instanceof ShapeLayer
        ) {
          pr.attr.height = parseInt(
            selected_layer.sourceRectAtTime(0, true).height,
          );
        } else {
          pr.attr.height = selected_layer.height;
        }
        pr.attr.three_d = selected_layer.threeDLayer;
        if (selected_layer.canSetCollapseTransformation) {
          pr.attr.can_collapse_tr = true;
          if (selected_layer.collapseTransformation) {
            pr.attr.collapse_tr = true;
          } else {
            pr.attr.collapse_tr = false;
          }
        } else {
          pr.attr.can_collapse_tr = false;
          pr.attr.collapse_tr = false;
        }
        pr.attr.motion = selected_layer.motionBlur;
        if (selected_layer.frameBlending) {
          pr.attr.frame_bl = true;
          pr.attr.frame_bl_type = selected_layer.frameBlendingType;
        } else {
          pr.attr.frame_bl = false;
        }
        pr.attr.adjust = selected_layer.adjustmentLayer;
        pr.attr.auto_orient_type = selected_layer.autoOrient;
        pr.attr.is_track_matte = selected_layer.isTrackMatte;
        pr.attr.has_track_matte = selected_layer.hasTrackMatte;
        pr.attr.track_matte_type = selected_layer.trackMatteType;
        pr.attr.stretch = selected_layer.stretch;
        pr.attr.blending = selected_layer.blendingMode;
        pr.attr.can_time_remap = selected_layer.canSetTimeRemapEnabled;
        pr.attr.time_remap = selected_layer.timeRemapEnabled;
        pr.attr.time_remap_keys = {};
        pr.attr.time_remap_exp = {};
        if (pr.attr.can_time_remap && pr.attr.time_remap) {
          var time_remap = selected_layer.property("ADBE Time Remapping");
          pr.attr.time_remap_keys = Get_Key_Data(time_remap);
          if (time_remap.expression.length > 0) {
            pr.attr.time_remap_exp = time_remap.expression;
          } else {
            pr.attr.time_remap_exp = "";
          }
        } else {
          pr.attr.time_remap_keys = false;
          pr.attr.time_remap_exp = "";
        }
        var transformations = selected_layer.property("ADBE Transform Group");
        pr.trans = [];
        var start_pos = [];
        for (var ap = 0; ap < 12; ap += 1) {
          pr.trans[ap] = {};
          if (ap == 1) {
            prop = transformations.property(ap + 1);
            if (prop.dimensionsSeparated) {
              var sep = true;
              pr.trans[ap].sep = true;
              if (action == "apply" || action == "convert") {
                start_pos[0] = transformations
                  .property(3)
                  .valueAtTime(cur_time, true);
                start_pos[1] = transformations
                  .property(4)
                  .valueAtTime(cur_time, true);
                if (selected_layer.threeDLayer) {
                  start_pos[2] = transformations
                    .property(5)
                    .valueAtTime(cur_time, true);
                }
                apply_start_pos.push(start_pos);
              }
            } else {
              var sep = false;
              pr.trans[ap].sep = false;
              if (action == "apply" || action == "convert") {
                apply_start_pos.push(
                  transformations.property(2).valueAtTime(cur_time, true),
                );
              }
            }
          }
          prop = transformations.property(ap + 1);
          pr.trans[ap].keys = {};
          pr.trans[ap].val;
          if (prop.canSetExpression) {
            if (prop.numKeys > 0) {
              if (ap > 0 && ap < 5) {
                if (sep) {
                  if (ap != 1) {
                    var prop_keys = Get_Key_Data(prop);
                    pr.trans[ap].keys = prop_keys;
                    pr.trans[ap].val = false;
                  }
                } else {
                  var prop_keys = Get_Key_Data(prop);
                  pr.trans[ap].keys = prop_keys;
                  pr.trans[ap].val = false;
                }
              } else {
                var prop_keys = Get_Key_Data(prop);
                pr.trans[ap].keys = prop_keys;
                pr.trans[ap].val = false;
              }
            } else {
              pr.trans[ap].keys = false;
              pr.trans[ap].val = prop.valueAtTime(cur_time, true);
            }
            pr.trans[ap].exp = "";
            var prop_exp = prop.expression;
            if (prop_exp.length > 0) {
              pr.trans[ap].exp = prop_exp;
            }
          } else {
            pr.trans[ap].keys = false;
            pr.trans[ap].val = false;
            pr.trans[ap].exp = "";
          }
        }
        pr.trans[11].keys = pr.trans[11].val = false;
        if (pr.trans[1].sep == false) {
          pr.trans[2].keys =
            pr.trans[2].val =
            pr.trans[3].keys =
            pr.trans[3].val =
            pr.trans[4].keys =
            pr.trans[4].val =
              false;
        }
        if (pr.attr.three_d == false) {
          pr.trans[6].keys =
            pr.trans[6].val =
            pr.trans[7].keys =
            pr.trans[7].val =
            pr.trans[8].keys =
            pr.trans[8].val =
              false;
        }
        pr.masks = [];
        var masks = selected_layer.property("ADBE Mask Parade");
        if (masks.numProperties > 0) {
          for (var am = 0; am < masks.numProperties; am += 1) {
            var mask = masks.property(am + 1);
            pr.masks[am] = {};
            pr.masks[am].name = mask.name;
            pr.masks[am].color = mask.color;
            pr.masks[am].closed = mask.closed;
            pr.masks[am].mode = mask.maskMode;
            pr.masks[am].inverted = mask.inverted;
            pr.masks[am].roto = mask.rotoBezier;
            pr.masks[am].motion = mask.maskMotionBlur;
            pr.masks[am].locked = mask.locked;
            pr.masks[am].keyable = [];
            for (var ap = 0; ap < 4; ap += 1) {
              prop = mask.property(ap + 1);
              pr.masks[am].keyable[ap] = {};
              if (prop.numKeys > 0) {
                var prop_keys = Get_Key_Data(prop);
                pr.masks[am].keyable[ap].keys = prop_keys;
                pr.masks[am].keyable[ap].val = false;
              } else {
                pr.masks[am].keyable[ap].val = prop.value;
                pr.masks[am].keyable[ap].keys = false;
              }
              if (prop.canSetExpression && prop.expressionEnabled) {
                var prop_exp = prop.expression;
              }
              pr.masks[am].keyable[ap].exp = prop_exp;
            }
          }
        }
        return pr;
      }
      function Clear_Layers_All(lr, restore_arr) {
        function Clear_Layer(selected_layer) {
          var layer = Get_Data(selected_layer, "clear");
          selected_layer.locked = false;
          selected_layer.parent = null;
          var was_2d = false;
          if (selected_layer.threeDLayer == false) {
            selected_layer.threeDLayer = true;
            was_2d = true;
          }
          var trans = selected_layer.property("ADBE Transform Group");
          var sep = trans.property(2).dimensionsSeparated;
          for (var ap = 0; ap < trans.numProperties; ap += 1) {
            var prop = trans.property(ap + 1);
            if (prop.numKeys > 0) {
              var vat = prop.valueAtTime(cur_time, true);
              if (ap > 0 && ap < 5) {
                if (sep) {
                  if (ap != 1) {
                    for (var ak = prop.numKeys; ak > 0; ak--) {
                      prop.removeKey(ak);
                    }
                    prop.setValue(vat);
                  }
                } else {
                  for (var ak = prop.numKeys; ak > 0; ak--) {
                    prop.removeKey(ak);
                  }
                  prop.setValue(vat);
                }
              } else {
                for (var ak = prop.numKeys; ak > 0; ak--) {
                  prop.removeKey(ak);
                }
                prop.setValue(vat);
              }
            }
            if (prop.expression.length > 0) {
              prop.expressionEnabled = false;
              prop.expression = "";
            }
          }
          if (was_2d) {
            selected_layer.threeDLayer = false;
          }
          var masks = selected_layer.property("ADBE Mask Parade");
          for (var am = masks.numProperties; am > 0; am--) {
            var mask = masks.property(am);
            mask.remove();
          }
          selected_layer.selected = true;
          if (layer.attr.three_d) {
            selected_layer.threeDLayer = true;
          } else {
            selected_layer.threeDLayer = false;
          }
          if (
            selected_layer.canSetTimeRemapEnabled &&
            selected_layer.timeRemapEnabled
          ) {
            prop = selected_layer.property("ADBE Time Remapping");
            if (prop.numKeys > 0) {
              for (var ak = prop.numKeys; ak >= 1; ak--) {
                prop.removeKey(ak);
              }
            }
            if (prop.expression.length > 0) {
              prop.expression = "";
            }
          }
          selected_layer.stretch = 100;
          selected_layer.autoOrient = AutoOrientType.NO_AUTO_ORIENT;
          selected_layer.adjustmentLayer = false;
          selected_layer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
          if (selected_layer.source instanceof CompItem) {
            if (
              selected_layer.source.layer(1) instanceof TextLayer ||
              selected_layer.source.layer(1) instanceof ShapeLayer
            ) {
              selected_layer.collapseTransformation = true;
            }
          }
        }
        function Reset_Trans(selected_layer) {
          if (selected_layer.threeDLayer) {
            selected_layer.transform.scale.setValue([100, 100]);
            selected_layer.transform.xRotation.setValue(0);
            selected_layer.transform.yRotation.setValue(0);
            selected_layer.transform.zRotation.setValue(0);
            selected_layer.transform.orientation.setValue([0, 0, 0]);
            selected_layer.transform.opacity.setValue(100);
          } else {
            selected_layer.transform.scale.setValue([100, 100, 100]);
            selected_layer.transform.rotation.setValue(0);
            selected_layer.transform.opacity.setValue(100);
          }
        }
        var lr_sel = [];
        var cur_time = app.project.activeItem.time;
        if (lr != null) {
          lr_sel.push(lr.index);
          Clear_Layer(lr);
          Reset_Trans(lr);
        } else {
          var sel_layers = app.project.activeItem.selectedLayers;
          for (var al = 0; al < sel_layers.length; al += 1) {
            var lr = sel_layers[al];
            lr_sel.push(lr.index);
            Clear_Layer(lr);
          }
        }
        for (var cc = 0; cc < lr_sel.length; cc += 1) {
          var index = lr_sel[cc];
          var lr = app.project.activeItem.layers[index];
          lr.selected = true;
        }
      }
      function Find_First_Time(group_arr, length) {
        var first_time_ar = [];
        var check = 0;
        for (var at = 0; at < length; at += 1) {
          if (group_arr[at].keys) {
            check++;
            for (var ak = 0; ak < group_arr[at].keys.length; ak += 1) {
              var time = group_arr[at].keys[ak].time;
              first_time_ar.push(time);
            }
          }
        }
        if (check > 0) {
          var first_key_time = first_time_ar.sort(function (a, b) {
            return a - b;
          })[0];
          var last_key_time = first_time_ar.sort(function (a, b) {
            return b - a;
          })[0];
          return [first_key_time, last_key_time];
        } else {
          return null;
        }
      }
      function Set_Data(pr, reset_array, mode, action, selected_layer, al) {
        var clear = false;
        var start_time = app.project.activeItem.time;
        var sel_layers = app.project.activeItem.selectedLayers;
        var active_comp = app.project.activeItem;
        var sl_name = selected_layer.name;
        var trans = selected_layer.property("ADBE Transform Group");
        if (mode == "set") {
          arr = pr;
        } else {
          if (mode == "reset") {
            arr = reset_array[al];
          }
        }
        selected_layer.threeDLayer = arr.attr.three_d;
        if (
          selected_layer.threeDLayer == false &&
          sl_name.indexOf("*Mirror*") > -1
        ) {
          selected_layer.threeDLayer = true;
        }
        if (selected_layer.canSetCollapseTransformation) {
          selected_layer.collapseTransformation = arr.attr.collapse_tr;
        }
        if (
          selected_layer instanceof AVLayer &&
          selected_layer.source instanceof CompItem &&
          selected_layer.source.numLayers == 1
        ) {
          inside_layer = selected_layer.source.layer(1);
          if (
            inside_layer instanceof TextLayer ||
            inside_layer instanceof ShapeLayer
          ) {
            if (selected_layer.canSetCollapseTransformation) {
              selected_layer.collapseTransformation = arr.attr.collapse_tr;
            } else {
              selected_layer.collapseTransformation = false;
            }
          }
        }
        selected_layer.motionBlur = arr.attr.motion;
        if (arr.attr.frame_bl) {
          selected_layer.frameBlending = true;
          selected_layer.frameBlendingType = arr.attr.frame_bl_type;
        }
        selected_layer.adjustmentLayer = arr.attr.adjust;
        var aot = arr.attr.auto_orient_type.toString();
        aot = parseFloat(aot.slice(-2));
        if (aot == 12) {
          selected_layer.autoOrient = AutoOrientType.NO_AUTO_ORIENT;
        }
        if (aot == 13) {
          selected_layer.autoOrient = AutoOrientType.ALONG_PATH;
        }
        if (aot == 14) {
          selected_layer.autoOrient =
            AutoOrientType.CAMERA_OR_POINT_OF_INTEREST;
        }
        if (aot == 15) {
          selected_layer.autoOrient = AutoOrientType.CHARACTERS_TOWARD_CAMERA;
        }
        if (arr.attr.has_track_matte) {
          var tm = arr.attr.track_matte_type.toString();
          tm = parseFloat(tm.slice(-2));
          if (tm == 12) {
            selected_layer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
          }
          if (tm == 13) {
            selected_layer.trackMatteType = TrackMatteType.ALPHA;
          }
          if (tm == 14) {
            selected_layer.trackMatteType = TrackMatteType.ALPHA_INVERTED;
          }
          if (tm == 15) {
            selected_layer.trackMatteType = TrackMatteType.LUMA;
          }
          if (tm == 16) {
            selected_layer.trackMatteType = TrackMatteType.LUMA_INVERTED;
          }
        }
        selected_layer.stretch = arr.attr.stretch;
        var bm = arr.attr.blending.toString();
        bm = parseFloat(bm.slice(-2));
        if (bm == 12) {
          selected_layer.blendingMode = BlendingMode.NORMAL;
        }
        if (bm == 13) {
          selected_layer.blendingMode = BlendingMode.DISSOLVE;
        }
        if (bm == 14) {
          selected_layer.blendingMode = BlendingMode.DANCING_DISSOLVE;
        }
        if (bm == 15) {
          selected_layer.blendingMode = BlendingMode.DARKEN;
        }
        if (bm == 16) {
          selected_layer.blendingMode = BlendingMode.MULTIPLY;
        }
        if (bm == 18) {
          selected_layer.blendingMode = BlendingMode.COLOR_BURN;
        }
        if (bm == 19) {
          selected_layer.blendingMode = BlendingMode.CLASSIC_COLOR_BURN;
        }
        if (bm == 17) {
          selected_layer.blendingMode = BlendingMode.LINEAR_BURN;
        }
        if (bm == 47) {
          selected_layer.blendingMode = BlendingMode.DARKER_COLOR;
        }
        if (bm == 20) {
          selected_layer.blendingMode = BlendingMode.ADD;
        }
        if (bm == 21) {
          selected_layer.blendingMode = BlendingMode.LIGHTEN;
        }
        if (bm == 22) {
          selected_layer.blendingMode = BlendingMode.SCREEN;
        }
        if (bm == 24) {
          selected_layer.blendingMode = BlendingMode.COLOR_DODGE;
        }
        if (bm == 25) {
          selected_layer.blendingMode = BlendingMode.CLASSIC_COLOR_DODGE;
        }
        if (bm == 23) {
          selected_layer.blendingMode = BlendingMode.LINEAR_DODGE;
        }
        if (bm == 46) {
          selected_layer.blendingMode = BlendingMode.LIGHTER_COLOR;
        }
        if (bm == 26) {
          selected_layer.blendingMode = BlendingMode.OVERLAY;
        }
        if (bm == 27) {
          selected_layer.blendingMode = BlendingMode.SOFT_LIGHT;
        }
        if (bm == 28) {
          selected_layer.blendingMode = BlendingMode.HARD_LIGHT;
        }
        if (bm == 29) {
          selected_layer.blendingMode = BlendingMode.LINEAR_LIGHT;
        }
        if (bm == 30) {
          selected_layer.blendingMode = BlendingMode.VIVID_LIGHT;
        }
        if (bm == 31) {
          selected_layer.blendingMode = BlendingMode.PIN_LIGHT;
        }
        if (bm == 32) {
          selected_layer.blendingMode = BlendingMode.HARD_MIX;
        }
        if (bm == 33) {
          selected_layer.blendingMode = BlendingMode.DIFFERENCE;
        }
        if (bm == 34) {
          selected_layer.blendingMode = BlendingMode.CLASSIC_DIFFERENCE;
        }
        if (bm == 35) {
          selected_layer.blendingMode = BlendingMode.EXCLUSION;
        }
        if (bm == 48) {
          selected_layer.blendingMode = BlendingMode.SUBTRACT;
        }
        if (bm == 36) {
          selected_layer.blendingMode = BlendingMode.HUE;
        }
        if (bm == 37) {
          selected_layer.blendingMode = BlendingMode.SATURATION;
        }
        if (bm == 38) {
          selected_layer.blendingMode = BlendingMode.COLOR;
        }
        if (bm == 39) {
          selected_layer.blendingMode = BlendingMode.LUMINOSITY;
        }
        if (bm == 40) {
          selected_layer.blendingMode = BlendingMode.STENCIL_ALPHA;
        }
        if (bm == 41) {
          selected_layer.blendingMode = BlendingMode.STENCIL_LUMA;
        }
        if (bm == 42) {
          selected_layer.blendingMode = BlendingMode.SILHOUETE_ALPHA;
        }
        if (bm == 43) {
          selected_layer.blendingMode = BlendingMode.SILHOUETTE_LUMA;
        }
        if (bm == 44) {
          selected_layer.blendingMode = BlendingMode.ALPHA_ADD;
        }
        if (bm == 45) {
          selected_layer.blendingMode = BlendingMode.LUMINESCENT_PREMUL;
        }
        if (
          arr.attr.can_time_remap &&
          arr.attr.time_remap &&
          selected_layer.canSetTimeRemapEnabled
        ) {
          selected_layer.timeRemapEnabled = true;
          prop = selected_layer.property("ADBE Time Remapping");
          prop.setValueAtTime(-10, 0);
          prop.removeKey(3);
          prop.removeKey(2);
          var keys_array = arr.attr.time_remap_keys;
          var time_diff = keys_array[0].time - start_time;
          Add_Keys(prop, keys_array, time_diff);
          prop.removeKey(1);
          if (arr.attr.time_remap_exp.length > 0) {
            prop.expression = arr.attr.time_remap_exp;
          }
        }
        var first_times = [];
        if (mode == "set") {
          var layer_time_diff = Find_First_Time(arr.trans, 12);
          if (layer_time_diff == null) {
            layer_time_diff = 0;
          } else {
            layer_time_diff = layer_time_diff[0];
          }
        } else {
          if (mode == "reset") {
            var layer_time_diff = 0;
          }
        }
        if (mode == "set") {
          var masks_times = [];
          for (var am = 0; am < arr.masks.length; am += 1) {
            var mask_t = Find_First_Time(arr.masks[am].keyable, 4);
            if (mask_t != null) {
              masks_times.push([0]);
            }
          }
          var masks_time_diff = Math.min.apply(null, masks_times);
        } else {
          if (mode == "reset") {
            var masks_time_diff = 0;
          }
        }
        var lower_time = Math.min.apply(null, [
          masks_time_diff,
          layer_time_diff,
        ]);
        var time_diff = lower_time - start_time;
        var trans = selected_layer.property("ADBE Transform Group");
        if (arr.trans[1].sep) {
          trans.property(2).dimensionsSeparated = true;
        } else {
          trans.property(2).dimensionsSeparated = false;
        }
        for (var at = 0; at < 12; at += 1) {
          prop = trans.property(at + 1);
          if (arr.trans[at].keys.length <= 0) {
            if (prop.canSetExpression) {
              if (at == 1) {
                if (arr.trans[1].sep == false) {
                  prop.setValue(arr.trans[at].val);
                }
              } else {
                if (arr.trans[at].val != false || arr.trans[at].val === 0) {
                  prop.setValue(arr.trans[at].val);
                }
              }
            }
          } else {
            var keys_array = arr.trans[at].keys;
            if (prop.canVaryOverTime) {
              if (at == 1) {
                if (arr.trans[1].sep == false) {
                  Add_Keys(prop, keys_array, time_diff);
                }
              } else {
                Add_Keys(prop, keys_array, time_diff);
              }
            }
          }
          if (arr.trans[at].exp.length > 0) {
            prop.expression = arr.trans[at].exp;
          } else {
            if (prop.canSetExpression) {
              prop.expression = "";
            }
          }
        }
        var masks = selected_layer.property("ADBE Mask Parade");
        if (masks !== null) {
          if (
            selected_layer instanceof TextLayer ||
            selected_layer instanceof ShapeLayer
          ) {
            var layer_w = selected_layer.sourceRectAtTime(0, true).width;
            var layer_h = selected_layer.sourceRectAtTime(0, true).height;
          } else {
            var layer_w = selected_layer.source.width;
            var layer_h = selected_layer.source.height;
          }
          var pr_layer_w = arr.attr.width;
          var pr_layer_h = arr.attr.height;
          var ratio = [layer_w / pr_layer_w, layer_h / pr_layer_h];
          for (var am = 0; am < arr.masks.length; am += 1) {
            var mask = masks.addProperty("Mask");
            var mask_shape = mask.property("ADBE Mask Shape");
            mask.name = arr.masks[am].name;
            mask.color = arr.masks[am].color;
            mask.closed = arr.masks[am].closed;
            var mm = arr.masks[am].mode.toString();
            mm = parseFloat(mm.slice(-2));
            if (mm == 12) {
              mask.maskMode = MaskMode.NONE;
            }
            if (mm == 13) {
              mask.maskMode = MaskMode.ADD;
            }
            if (mm == 14) {
              mask.maskMode = MaskMode.SUBTRACT;
            }
            if (mm == 15) {
              mask.maskMode = MaskMode.INTERSECT;
            }
            if (mm == 16) {
              mask.maskMode = MaskMode.LIGHTEN;
            }
            if (mm == 17) {
              mask.maskMode = MaskMode.DARKEN;
            }
            if (mm == 18) {
              mask.maskMode = MaskMode.DIFFERENCE;
            }
            mask.inverted = arr.masks[am].inverted;
            mask.rotoBezier = arr.masks[am].roto;
            var mb = arr.masks[am].motion.toString();
            mb = parseFloat(mb.slice(-2));
            if (mb == 12) {
              mask.maskMotionBlur = MaskMotionBlur.SAME_AS_LAYER;
            }
            if (mb == 13) {
              mask.maskMotionBlur = MaskMotionBlur.ON;
            }
            if (mb == 14) {
              mask.maskMotionBlur = MaskMotionBlur.OFF;
            }
            mask.locked = arr.masks[am].locked;
            for (var ap = 0; ap < 4; ap += 1) {
              prop = mask.property(ap + 1);
              if (arr.masks[am].keyable[ap].keys == false) {
                if (prop.matchName == "ADBE Mask Shape") {
                  var mask_value = prop.value;
                  mask_value.vertices = arr.masks[am].keyable[ap].val.vertices;
                  mask_value.inTangents =
                    arr.masks[am].keyable[ap].val.inTangents;
                  mask_value.outTangents =
                    arr.masks[am].keyable[ap].val.outTangents;
                  key_value = mask_value;
                  prop.setValue(key_value);
                } else {
                  prop.setValue(arr.masks[am].keyable[ap].val);
                }
              } else {
                var keys = arr.masks[am].keyable[ap].keys;
                Add_Keys(prop, keys, time_diff);
              }
            }
          }
        }
        if (mode == "set" && action == "apply") {
          var old_anc = old_anchors[al];
          var new_anc = selected_layer
            .property("ADBE Transform Group")
            .property(1)
            .valueAtTime(start_time, true);
          if (selected_layer.threeDLayer) {
            if (old_anc.length == 2) {
              old_anc[2] = new_anc[2];
              anc_dif = old_anc - new_anc;
            }
          } else {
            if (old_anc.length == 3) {
              old_anc.pop();
            }
          }
          var anc_dif = old_anc - new_anc;
          if (arr.trans[1].sep) {
          } else {
            var pos = selected_layer
              .property("ADBE Transform Group")
              .property(2);
            if (arr.trans[1].keys) {
              for (var ak = 0; ak < arr.trans[1].keys.length; ak += 1) {
                var key_time = arr.trans[1].keys[ak].time;
                var key_value = arr.trans[1].keys[ak].value - anc_dif;
                pos.setValueAtTime(key_time, key_value);
              }
            } else {
              var value = arr.trans[1].val - anc_dif;
              pos.setValue(value);
            }
          }
        }
      }
      function Set_Comp_Shape(selected_layer) {
        var w = parseInt(selected_layer.sourceRectAtTime(0, true).width);
        var h = parseInt(selected_layer.sourceRectAtTime(0, true).height);
        var dur = app.project.activeItem.duration;
        var three_d = selected_layer.threeDLayer;
        var curr_time = (new_time = app.project.activeItem.time);
        var temp_arr = Get_Data(selected_layer, "temp");
        Clear_Layers_All(selected_layer);
        var anc = selected_layer.property("ADBE Transform Group").property(1);
        var pos = selected_layer.property("ADBE Transform Group").property(2);
        if (anc.numKeys > 0) {
          new_time = anc.keyTime(1);
          app.project.activeItem.time = new_time;
        }
        var old_anc_value = anc.valueAtTime(new_time, true);
        app.executeCommand(
          app.findMenuCommandId("Center Anchor Point in Layer Content"),
        );
        var y_dif = h / 2 + anc.value[1];
        var centered_anc_value = anc.valueAtTime(new_time, true);
        var anc_delta = old_anc_value - centered_anc_value;
        var effects = selected_layer.property("ADBE Effect Parade");
        var fx_length = effects.numProperties;
        if (fx_length > 0) {
          selected_layer.selected = false;
          for (var ae = 0; ae < effects.numProperties; ae += 1) {
            var fx = effects.property(ae + 1);
            fx.selected = true;
          }
          app.executeCommand(app.findMenuCommandId("Cut"));
        }
        var index = selected_layer.index;
        var name = selected_layer.name;
        var pos = selected_layer
          .property("ADBE Transform Group")
          .property(2).value;
        app.project.activeItem.layers.precompose([index], name, true);
        var precomp = app.project.activeItem.layer(index);
        precomp.collapseTransformation = true;
        precomp.source.width = parseInt(w);
        precomp.source.height = parseInt(h);
        if (fx_length > 0) {
          precomp.selected = true;
          app.executeCommand(app.findMenuCommandId("Paste"));
        }
        precomp.source
          .layer(1)
          .property("ADBE Transform Group")
          .property(2)
          .setValue([parseInt(w) / 2, parseInt(h) / 2]);
        precomp.property("ADBE Transform Group").property(2).setValue(pos);
        if (three_d) {
          precomp.threeDLayer = true;
        }
        var new_solid_anc_value = [w / 2, h / 2];
        if (three_d) {
          new_solid_anc_value = [w / 2, h / 2, 0];
        }
        Set_Data(temp_arr, temp_arr, "set", "temp", precomp);
        anc = precomp.property("ADBE Transform Group").property(1);
        pos = precomp.property("ADBE Transform Group").property(2);
        if (anc.numKeys > 0) {
          for (var ak = 0; ak < anc.numKeys; ak += 1) {
            var key_time = anc.keyTime(ak + 1);
            var key_value = anc.valueAtTime(key_time, true);
            var new_key_value =
              new_solid_anc_value - centered_anc_value + key_value;
            anc.setValueAtTime(key_time, new_key_value);
          }
        } else {
          var key_value = anc.value;
          var new_key_value =
            new_solid_anc_value - centered_anc_value + key_value;
          anc.setValue(new_key_value);
        }
        var masks = precomp.property("ADBE Mask Parade");
        if (masks !== null && masks.numProperties > 0) {
          for (var am = 0; am < masks.numProperties; am += 1) {
            var mask = masks.property(am + 1);
            var shape = mask.property(1);
            if (shape.numKeys > 0) {
              for (var ak = 0; ak < shape.numKeys; ak += 1) {
                var key_time = shape.keyTime(ak + 1);
                var key_value = shape.valueAtTime(key_time, true);
                var vertices = key_value.vertices;
                var vert = [];
                for (var av = 0; av < vertices.length; av += 1) {
                  vert[av] = [];
                  vert[av][0] =
                    new_solid_anc_value[0] -
                    centered_anc_value[0] +
                    vertices[av][0];
                  vert[av][1] =
                    new_solid_anc_value[1] -
                    centered_anc_value[1] +
                    vertices[av][1];
                }
                key_value.vertices = vert;
                shape.setValueAtTime(key_time, key_value);
              }
            } else {
              var key_value = shape.value;
              var vertices = key_value.vertices;
              var vert = [];
              for (var av = 0; av < vertices.length; av += 1) {
                vert[av] = [];
                vert[av][0] =
                  new_solid_anc_value[0] -
                  centered_anc_value[0] +
                  vertices[av][0];
                vert[av][1] =
                  new_solid_anc_value[1] -
                  centered_anc_value[1] +
                  vertices[av][1];
              }
              key_value.vertices = vert;
              shape.setValue(key_value);
            }
          }
        }
        precomp.collapseTransformation = false;
        var pw = precomp.width;
        if (anc.numKeys > 0) {
          for (var ak = 1; ak <= anc.numKeys; ak += 1) {
            var cur_anc = anc.keyValue(ak);
            var distance_x = pw / 2 - cur_anc[0];
            if (ak <= 1) {
              var ref_distance = distance_x;
              closer_anc = cur_anc;
            } else {
              if (distance_x < ref_distance) {
                ref_distance = distance_x;
                closer_anc = cur_anc;
              }
            }
          }
        } else {
          var closer_anc = anc.value;
        }
        var closer_x = closer_anc[0];
        if (closer_x < 0) {
          var x_dif = closer_x;
        } else {
          if (closer_x > pw) {
            var x_dif = closer_x - pw;
          } else {
            x_dif = 0;
          }
        }
        for (var ap = 1; ap <= 2; ap += 1) {
          if (ap == 1) {
            var prop = anc;
          } else {
            var prop = pos;
          }
          if (prop.numKeys > 0) {
            for (var ak = 1; ak <= prop.numKeys; ak += 1) {
              var key_value = prop.keyValue(ak);
              var cur_key_x = key_value[0] - x_dif;
              var cur_key_y = key_value[1] + y_dif;
              prop.setValueAtKey(ak, [cur_key_x, cur_key_y, key_value[2]]);
            }
          } else {
            var value = prop.value;
            var cur_x = value[0] - x_dif;
            var cur_y = value[1] + y_dif;
            prop.setValue([cur_x, cur_y, value[2]]);
          }
        }
        return precomp;
      }
      function Create_Edit_Helper(ori_lr, mask_ind, arr) {
        var cur_time = app.project.activeItem.time;
        app.project.activeItem.time = 0;
        var comp_w = app.project.activeItem.width;
        var comp_h = app.project.activeItem.height;
        var chosen_mask = ori_lr
          .property("ADBE Mask Parade")
          .property(mask_ind);
        var mask_name = chosen_mask.name;
        var sid = mask_name.split(" ID #")[1];
        var shape = chosen_mask.property(1);
        var lr_dupli = ori_lr.duplicate();
        if (ori_lr.threeDLayer) {
          lr_dupli.threeDLayer = true;
        }
        var d_ind = lr_dupli.index;
        Clear_Layer_Properties(lr_dupli);
        var masks = lr_dupli.property("ADBE Mask Parade");
        if (masks !== null && masks.numProperties > 0) {
          for (var am = masks.numProperties; am >= 1; am--) {
            var mask = masks.property(am);
            if (mask.name != mask_name) {
              mask.remove();
            }
          }
        }
        if (lr_dupli instanceof TextLayer || lr_dupli instanceof ShapeLayer) {
          lr_dupli = Set_Comp_Shape(lr_dupli);
        }
        var stroke = lr_dupli
          .property("ADBE Effect Parade")
          .addProperty("ADBE Stroke");
        stroke.property("ADBE Stroke-0010").setValue(1);
        stroke.property("ADBE Stroke-0003").setValue(2);
        stroke.property("ADBE Stroke-0004").setValue(0.94);
        stroke.property("ADBE Stroke-0005").setValue(1);
        stroke.property("ADBE Stroke-0006").setValue(10);
        stroke.property("ADBE Stroke-0007").setValue(2);
        if (
          ori_lr instanceof TextLayer != true &&
          ori_lr instanceof ShapeLayer != true
        ) {
          app.project.activeItem.layers.precompose(
            [d_ind],
            lr_dupli.name,
            false,
          );
        }
        var sl = app.project.activeItem.layers[d_ind];
        sl.name = mask_name;
        sl.moveToBeginning();
        sl.collapseTransformation = true;
        var masks = sl.property("ADBE Mask Parade");
        if (masks !== null) {
          var mask = masks.property(1);
          sl.source.name = sl.source.name + " - " + mask.name;
          mask.name = mask.name.split(" - ID #")[0].toString();
          var shape = mask.property(1);
          if (arr.length > 0 && arr[0] != null && arr[1] != null) {
            for (var ap = 1; ap <= 4; ap += 1) {
              var prop = mask.property(ap);
              prop.expression = "";
              for (var ak = prop.numKeys; ak > 0; ak--) {
                prop.removeKey(ak);
              }
            }
          }
        }
        sl.parent = ori_lr;
        app.project.activeItem.time = cur_time;
        if (arr.length > 0 && arr[0] != null && arr[1] != null) {
          Set_Layer_Transform(arr[0], sl);
          Set_Mask(arr[1], sl, 1);
        }
        if (ori_lr.threeDLayer) {
          sl.transform.anchorPoint.expression = "[value[0],value[1],0]";
          sl.transform.position.expression = "[value[0],value[1],0]";
          sl.transform.orientation.expression = "[0,0,value[2]]";
          sl.transform.xRotation.expression = "0";
          sl.transform.yRotation.expression = "0";
        }
        return lr_dupli;
      }
      function Mask_Duplicates(amask, mid, max_id) {
        for (var aa = 1; aa <= app.project.items.length; aa += 1) {
          var pc = app.project.items[aa];
          if (pc instanceof CompItem) {
            for (var ac = 1; ac <= pc.layers.length; ac += 1) {
              var lr = pc.layers[ac];
              var masks = lr.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = 0; am < masks.numProperties; am += 1) {
                  var mask = masks.property(am + 1);
                  if (mask != amask) {
                    var id = mask.name.split(" ID #")[1];
                    if (id) {
                      if (id == mid) {
                        var new_id = Number(max_id) + 1;
                        mask.name = mask.name.split(" ID #")[0].toString();
                        mask.name = mask.name + " ID #" + new_id;
                        max_id = new_id;
                        for (var cl = 1; cl <= pc.layers.length; cl += 1) {
                          var al = pc.layers[cl];
                          if (
                            al instanceof TextLayer ||
                            al instanceof ShapeLayer
                          ) {
                            var lid = al.name.split(" ID #")[1];
                          } else {
                            var lid = al.source.name.split(" ID #")[1];
                          }
                          if (lid) {
                            if (id == lid) {
                              al.source.name = al.source.name
                                .split(" ID #")[0]
                                .toString();
                              al.source.name =
                                al.source.name + " ID #" + new_id;
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
        return max_id;
      }
      function Check_Id_Duplicates() {
        var max_id = 0;
        for (var aa = 1; aa <= app.project.items.length; aa += 1) {
          var pc = app.project.items[aa];
          if (pc instanceof CompItem) {
            for (var ac = 1; ac <= pc.layers.length; ac += 1) {
              var lr = pc.layers[ac];
              var masks = lr.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = 0; am < masks.numProperties; am += 1) {
                  var mask = masks.property(am + 1);
                  var id = mask.name.split(" ID #")[1];
                  if (id) {
                    if (id > max_id) {
                      max_id = id;
                    }
                  }
                }
              }
            }
          }
        }
        for (var aa = 1; aa <= app.project.items.length; aa += 1) {
          var pc = app.project.items[aa];
          if (pc instanceof CompItem) {
            for (var ac = 1; ac <= pc.layers.length; ac += 1) {
              var lr = pc.layers[ac];
              var masks = lr.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = 0; am < masks.numProperties; am += 1) {
                  var mask = masks.property(am + 1);
                  var id = mask.name.split(" ID #")[1];
                  if (id) {
                    max_id = Mask_Duplicates(mask, id, max_id);
                  }
                }
              }
            }
          }
        }
        return max_id;
      }
      function Edit_Masks() {
        var cur_time = app.project.activeItem.time;
        app.project.activeItem.time = 0;
        var id_arr = [];
        if (app.project && app.project.activeItem) {
          var sel_layers = app.project.activeItem.selectedLayers;
          for (var al = sel_layers.length - 1; al >= 0; al--) {
            sl = sel_layers[al];
            ind = sl.index;
            edit_sel[al] = [];
            edit_sel[al][0] = ind;
            edit_sel[al][1] = [];
            var masks = sl.property("ADBE Mask Parade");
            if (masks !== null && masks.numProperties > 0) {
              for (var am = 1; am <= masks.numProperties; am += 1) {
                var mask = masks.property(am);
                if (mask.selected) {
                  edit_sel[al][1].push(am);
                }
              }
            }
          }
          var lr_count = 0;
          for (var al = 0; al < edit_sel.length; al += 1) {
            ind = edit_sel[al][0] + lr_count;
            sl = app.project.activeItem.layers[ind];
            var masks = sl.property("ADBE Mask Parade");
            if (masks !== null && masks.numProperties > 0) {
              for (var am = 0; am < edit_sel[al][1].length; am += 1) {
                var first_time = false;
                mask_ind = edit_sel[al][1][am];
                mask = masks.property(mask_ind);
                shape = mask.property(1);
                var id = mask.name.split(" ID #")[1];
                if (!id) {
                  first_time = true;
                  Initialize_Mask(sl, mask_ind);
                  id = mask.name.split(" ID #")[1];
                }
                id_arr.push(id);
                if (first_time) {
                  var arr = [];
                  if (mask.property(4).expression == "") {
                    arr[2] = Get_Mask_Data(sl, mask_ind);
                    mask.property(4).expression =
                      "/*\n" + JSON.stringify(arr) + "*/\nvalue";
                    mask.maskMode = MaskMode.NONE;
                  }
                } else {
                  var arr_extract = mask
                    .property(4)
                    .expression.split("/*")
                    .pop()
                    .split("*/")
                    .shift();
                  var arr = eval(JSON.parse(JSON.stringify(arr_extract)));
                  mask.maskMode = MaskMode.NONE;
                }
                if (sl.parent !== null) {
                  var par = sl.parent;
                  sl.parent = null;
                } else {
                  var par = null;
                }
                new_null = Create_Edit_Helper(sl, mask_ind, arr);
                new_null.moveBefore(sl);
                sl.parent = par;
                if (sl.threeDLayer != true) {
                  new_null.parent = sl;
                }
                sl.selected = false;
              }
            }
          }
          var layers = app.project.activeItem.layers;
          for (var sid = 0; sid < id_arr.length; sid += 1) {
            var aid = id_arr[sid];
            for (var ac = 1; ac <= layers.length; ac += 1) {
              var lr = app.project.activeItem.layers[ac];
              if (lr instanceof TextLayer || lr instanceof ShapeLayer) {
                var id = lr.name.split(" ID #")[1];
              } else {
                var id = lr.source.name.split(" ID #")[1];
              }
              if (id) {
                if (id == aid) {
                  lr.selected = true;
                }
              }
            }
          }
        }
        app.project.activeItem.time = cur_time;
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
      function Find_Times(sl, ori) {
        var cur_time = app.project.activeItem.time;
        var fps = 1 / app.project.activeItem.frameDuration;
        var trans = sl.transform;
        var mask = sl.property("ADBE Mask Parade").property(1);
        var times_ar = [];
        var length = 1;
        if (ori) {
          length = 0;
        }
        for (var aa = 0; aa <= length; aa += 1) {
          if (aa == 0) {
            var prop_grp = trans;
          } else {
            var prop_grp = mask;
          }
          for (var ap = 0; ap < prop_grp.numProperties; ap += 1) {
            var prop = prop_grp.property(ap + 1);
            if (prop.numKeys > 0) {
              for (var ak = 0; ak < prop.numKeys; ak += 1) {
                var time = prop.keyTime(ak + 1);
                times_ar.push(time);
              }
            }
          }
        }
        if (times_ar.length > 1) {
          var first_key_time = times_ar.sort(function (a, b) {
            return a - b;
          })[0];
          var last_key_time = times_ar.sort(function (a, b) {
            return b - a;
          })[0];
          return [first_key_time, last_key_time];
        } else {
          var first_key_time = false;
          var last_key_time = false;
          return false;
        }
      }
      function Check_Tangents(helper, master_null, factor) {
        function Fix_Tangents(val, index) {
          var times = [];
          for (var ak = 0; ak <= val.vertices.length; ak += 1) {
            times.push(ak * app.project.activeItem.frameDuration);
            if (ak == val.vertices.length) {
              times[times.length - 1] = factor;
            }
          }
          var verts = val.vertices;
          var inTan = val.inTangents;
          var outTan = val.outTangents;
          var numVerts = verts.length;
          if (val.closed) {
            verts.push(verts[0]);
            inTan.push(inTan[0]);
            outTan.push(outTan[0]);
            numVerts++;
          }
          for (var ak = 0; ak < numVerts; ak += 1) {
            inTan[ak][2] = outTan[ak][2] = 0;
          }
          t_pos.setValuesAtTimes(times, verts);
          for (idx, ak = 0; ak < numVerts; ak++) {
            idx = t_pos.nearestKeyIndex(times[ak]);
            t_pos.setSpatialTangentsAtKey(idx, inTan[ak], outTan[ak]);
          }
          for (var ak = 1; ak <= t_pos.numKeys; ak += 1) {
            t_pos.setRovingAtKey(ak, true);
          }
          for (var ak = 1; ak <= t_pos.numKeys; ak += 1) {
            t_pos.setRovingAtKey(ak, false);
          }
          var to_add = [];
          for (var ak = 1; ak <= t_pos.numKeys; ak += 1) {
            if (ak < t_pos.numKeys) {
              var ist = t_pos.keyInSpatialTangent(ak + 1);
              var ost = t_pos.keyOutSpatialTangent(ak);
              if (
                ist[0] != 0 ||
                ist[1] != 0 ||
                ist[2] != 0 ||
                ost[0] != 0 ||
                ost[1] != 0 ||
                ost[2] != 0
              ) {
                var ct = t_pos.keyTime(ak);
                var nt = t_pos.keyTime(ak + 1);
                var dt = nt - ct;
                var last_frame = (nt - ct) * fps + 1;
                var ax = [];
                var ay = [];
                var refs = [];
                for (var at = 0; at < last_frame; at += 1) {
                  var time = ct + at * app.project.activeItem.frameDuration;
                  var val = t_pos.valueAtTime(time, true);
                  ax.push(val[0]);
                  ay.push(val[1]);
                  refs.push([time, val, Math.abs(val[0]) * Math.abs(val[1])]);
                }
                var ref = refs.sort(function (a, b) {
                  return b[2] > a[2];
                })[0];
                to_add.push(ref);
              }
            }
          }
          for (var ak = 0; ak < to_add.length; ak += 1) {
            var time = to_add[ak][0];
            var val = to_add[ak][1];
            t_pos.setValueAtTime(time, val);
          }
          var ver = [];
          var tin = [];
          var tout = [];
          if (shape.numKeys) {
            var val = shape.keyValue(index);
          } else {
            var val = shape.value;
          }
          for (var ak = 1; ak <= t_pos.numKeys; ak += 1) {
            ver[ak - 1] = [t_pos.keyValue(ak)[0], t_pos.keyValue(ak)[1]];
            tin[ak - 1] = [
              t_pos.keyInSpatialTangent(ak)[0],
              t_pos.keyInSpatialTangent(ak)[1],
            ];
            tout[ak - 1] = [
              t_pos.keyOutSpatialTangent(ak)[0],
              t_pos.keyOutSpatialTangent(ak)[1],
            ];
          }
          val.vertices = ver;
          val.inTangents = tin;
          val.outTangents = tout;
          return val;
        }
        var fps = 1 / app.project.activeItem.frameDuration;
        var t_pos = master_null.transform.position;
        var shape = helper.mask(1).property(1);
        if (shape.numKeys > 0) {
          for (var amk = 1; amk <= shape.numKeys; amk += 1) {
            var val = shape.keyValue(amk);
            for (var ak = t_pos.numKeys; ak > 0; ak--) {
              t_pos.removeKey(ak);
            }
            var fixed_val = Fix_Tangents(val, amk);
            shape.setValueAtKey(amk, fixed_val);
          }
        } else {
          var val = shape.value;
          for (var ak = t_pos.numKeys; ak > 0; ak--) {
            t_pos.removeKey(ak);
          }
          var fixed_val = Fix_Tangents(val);
          shape.setValue(fixed_val);
        }
        for (var ak = t_pos.numKeys; ak > 0; ak--) {
          t_pos.removeKey(ak);
        }
        master_null.selected = false;
      }
      function Apply_Mask_Transformations(sl, ori_lr, mask_ind) {
        var ol_3d = false;
        if (ori_lr.threeDLayer) {
          ol_3d = true;
        } else {
          ori_lr.locked = false;
          ori_lr.threeDLayer = true;
        }
        var comp = app.project.activeItem;
        var w = comp.width;
        var h = comp.height;
        ori_lr.transform.anchorPoint.expression =
          "[" + ori_lr.width / 2 + "," + ori_lr.height / 2 + ",0]";
        ori_lr.transform.position.expression =
          "[" + w / 2 + "," + h / 2 + ", 0]";
        ori_lr.transform.scale.expression = "[100,100,100]";
        ori_lr.transform.xRotation.expression = "0";
        ori_lr.transform.yRotation.expression = "0";
        ori_lr.transform.zRotation.expression = "0";
        ori_lr.transform.orientation.expression = "[0,0,0]";
        var cur_time = app.project.activeItem.time;
        app.project.activeItem.time = 0;
        var times = Find_Times(sl);
        var ori_times = Find_Times(ori_lr);
        var first = times[0];
        var last = times[1];
        var ori_first = ori_times[0];
        var ori_last = ori_times[1];
        if (times === false) {
          first = cur_time;
          last = cur_time;
        }
        if (ori_times === false) {
          ori_first = cur_time;
          ori_last = cur_time;
        }
        var frames_per_sec = 1 / app.project.activeItem.frameDuration;
        var last_frame = (last - first) * frames_per_sec + 1;
        var comp = app.project.activeItem;
        var w = comp.width;
        var h = comp.height;
        var anc = sl.transform.anchorPoint;
        var pos = sl.transform.position;
        var sca = sl.transform.scale;
        var ori = sl.transform.orientation;
        var x_rot = sl.transform.xRotation;
        var y_rot = sl.transform.yRotation;
        var z_rot = sl.transform.zRotation;
        var ori_anc = ori_lr.transform.anchorPoint;
        var ori_pos = ori_lr.transform.position;
        var ori_sca = ori_lr.transform.scale;
        var ori_rot = ori_lr.transform.rotation;
        var ori_ori = ori_lr.transform.orientation;
        var ori_x_rot = ori_lr.transform.xRotation;
        var ori_y_rot = ori_lr.transform.yRotation;
        var ori_z_rot = ori_lr.transform.zRotation;
        var shape = sl.property("ADBE Mask Parade").property(1).property(1);
        var ori_shape = ori_lr
          .property("ADBE Mask Parade")
          .property(mask_ind)
          .property(1);
        var apply_ok = true;
        var checked = Dimensions_Check(sl, ori_lr, first, last);
        var bad_ori = checked[0];
        var bad_sl = checked[1];
        var ori_ok = checked[2];
        var sl_ok = checked[3];
        if (sl_ok != true && ori_ok != true) {
          apply_ok = false;
        }
        var apply_ok = true;
        sl.parent = null;
        var master_null = app.project.activeItem.layers.addNull();
        master_null.enabled = false;
        var master_pos = master_null.transform.position;
        var factor = 2;
        var tan_ver = [];
        var times = [];
        var sl_ver = [];
        var ver_arr = [];
        var ver_dif = [];
        var vert = shape.value.vertices;
        var values_t = [];
        var ver_arr_t = [];
        var mask_vertex_0 = [];
        var temp_ver_arr = [];
        var anc_value_0 = anc.valueAtTime(0, false);
        var pos_value_0 = pos.valueAtTime(0, false);
        var ori_anc_value_0 = ori_anc.valueAtTime(0, false);
        var ori_pos_value_0 = ori_pos.valueAtTime(0, false);
        var max_ver = [];
        for (var ak = 0; ak < last_frame; ak += 1) {
          var time = first + ak * app.project.activeItem.frameDuration;
          var value = shape.valueAtTime(time, false);
          var ver = value.vertices;
          max_ver.push(ver.length);
        }
        var min_ver = Math.min.apply(null, max_ver);
        var ver_length = Math.max.apply(null, max_ver);
        for (var av = 0; av < ver_length; av += 1) {
          tan_ver[av] = [];
          sl_ver[av] = [];
          ver_arr[av] = [];
          ver_dif[av] = [];
          for (var ak = 0; ak < last_frame; ak += 1) {
            var time = first + ak * app.project.activeItem.frameDuration;
            if (av == 0) {
              times.push(time);
            }
            var value = shape.valueAtTime(time, false);
            var ori_value = ori_shape.valueAtTime(time, false);
            var ver = value.vertices;
            if (av < max_ver[ak]) {
              sl_ver[av][ak] = ver[av];
              ver_arr[av][ak] =
                ver[av] +
                [pos_value_0[0], pos_value_0[1]] -
                [anc_value_0[0], anc_value_0[1]];
              if (ver.length <= max_ver[0]) {
                ver_dif[av][ak] = ver_arr[av][ak] - ver_arr[av][0];
              } else {
                for (var zk = 0; zk < max_ver.length; zk += 1) {
                  if (av < max_ver[zk]) {
                    birth = zk;
                    break;
                  }
                }
                ver_dif[av][ak] = ver_arr[av][ak] - ver_arr[av][birth];
              }
            }
          }
          temp_ver_arr[av] = [];
          var vnull = app.project.activeItem.layers.addNull();
          vnull.enabled = false;
          vnull.moveAfter(master_null);
          if (ori_lr.threeDLayer) {
            vnull.threeDLayer = true;
          }
          vnull.source.width = 10;
          vnull.source.height = 10;
          var v_pos = vnull.transform.position;
          vnull.parent = sl;
          var values = [];
          var tms = [];
          for (var ak = 0; ak < last_frame; ak += 1) {
            if (av < max_ver[ak]) {
              if (shape.valueAtTime(times[ak], true).vertices[av]) {
                tms.push(times[ak]);
                key_value = shape.valueAtTime(times[ak], true).vertices[av];
                values.push(key_value);
              }
            }
          }
          v_pos.setValuesAtTimes(tms, values);
          sl.parent = ori_lr;
          master_pos.expression = "L = thisComp.layer(2);L.toComp([0,0,0]);";
          var temp_ver = [];
          for (var ak = 0; ak < last_frame; ak += 1) {
            if (av < max_ver[ak]) {
              key_time = times[ak];
              temp_key = master_pos.valueAtTime(key_time, false);
              final_key =
                temp_key +
                (ori_anc.valueAtTime(key_time, false) - ori_anc_value_0);
              final_key =
                final_key -
                (ori_pos.valueAtTime(key_time, false) - ori_pos_value_0);
              temp_ver.push(final_key);
            }
          }
          sl.parent = null;
          master_pos.expression = "";
          master_pos.expressionEnabled = false;
          master_pos.setValuesAtTimes(tms, temp_ver);
          master_null.parent = ori_lr;
          for (var ak = 0; ak < last_frame; ak += 1) {
            if (av < max_ver[ak]) {
              ver_arr[av][ak] = master_pos.valueAtTime(times[ak], false);
              tan_ver[av][ak] = ver_arr[av][ak];
              master_pos.removeKey(1);
            }
          }
          master_null.parent = null;
          vnull.source.remove();
        }
        var target_shape = ori_lr
          .property("ADBE Mask Parade")
          .property(mask_ind)
          .property(1);
        var final_values = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          var final_ver = [];
          for (var av = 0; av < ver_arr.length; av += 1) {
            if (av < max_ver[ak]) {
              final_ver[av] = [ver_arr[av][ak][0], ver_arr[av][ak][1]];
            }
          }
          var target_value = target_shape.value;
          target_value.vertices = final_ver;
          final_values.push(target_value);
        }
        target_shape.setValuesAtTimes(times, final_values);
        sl.parent = ori_lr;
        var tin_arr = [];
        var tout_arr = [];
        var tan_tin = [];
        var tan_tout = [];
        var vertex = [];
        var temp_tin = [];
        var temp_tout = [];
        for (var av = 0; av < ver_arr.length; av += 1) {
          tin_arr[av] = [];
          tout_arr[av] = [];
          tan_tin[av] = [];
          tan_tout[av] = [];
          vertex[av] = [];
          temp_tin[av] = [];
          temp_tout[av] = [];
          var vnull = app.project.activeItem.layers.addNull();
          vnull.enabled = false;
          vnull.moveAfter(master_null);
          if (ori_lr.threeDLayer) {
            vnull.threeDLayer = true;
          }
          vnull.source.width = 10;
          vnull.source.height = 10;
          var v_pos = vnull.transform.position;
          vnull.parent = sl;
          for (var ak = 0; ak < times.length; ak += 1) {
            if (av < max_ver[ak]) {
              v_pos.setValueAtTime(times[ak], tan_ver[av][ak]);
            }
          }
          master_pos.expression = "L = thisComp.layer(2);L.toComp([0,0,0]);";
          for (var ak = 0; ak < ver_arr[av].length; ak += 1) {
            if (av < max_ver[ak]) {
              if (shape.valueAtTime(times[ak], true).vertices[av]) {
                temp_key = master_pos.valueAtTime(times[ak], false);
                vertex[av][ak] = temp_key;
              }
            }
          }
          for (var ak = 0; ak < times.length; ak += 1) {
            if (av < max_ver[ak]) {
              if (
                shape.valueAtTime(times[ak], true).inTangents[av] &&
                shape.valueAtTime(times[ak], true).outTangents[av]
              ) {
                var tin = shape.valueAtTime(times[ak], true).inTangents[av];
                var tout = shape.valueAtTime(times[ak], true).outTangents[av];
                tan_tin[av][ak] = tin + tan_ver[av][ak];
                tan_tout[av][ak] = tout + tan_ver[av][ak];
              }
            }
          }
          for (var ak = 0; ak < times.length; ak += 1) {
            if (av < max_ver[ak] && tan_tin[av][ak]) {
              v_pos.setValueAtTime(times[ak], tan_tin[av][ak]);
            }
          }
          master_pos.expression = "L = thisComp.layer(2);L.toComp([0,0,0]);";
          for (var ak = 0; ak < ver_arr[av].length; ak += 1) {
            if (av < max_ver[ak] && ver_arr[av]) {
              temp_key = master_pos.valueAtTime(times[ak], false);
              temp_tin[av][ak] = temp_key;
            }
          }
          for (var ak = 0; ak < times.length; ak += 1) {
            if (av < max_ver[ak] && tan_tout[av][ak]) {
              v_pos.setValueAtTime(times[ak], tan_tout[av][ak]);
            }
          }
          master_pos.expression = "L = thisComp.layer(2);L.toComp([0,0,0]);";
          for (var ak = 0; ak < ver_arr[av].length; ak += 1) {
            if (av < max_ver[ak] && ver_arr[av]) {
              temp_key = master_pos.valueAtTime(times[ak], false);
              temp_tout[av][ak] = temp_key;
            }
          }
          for (var ak = 0; ak < times.length; ak += 1) {
            if (av < max_ver[ak]) {
              if (vertex[av][ak] && temp_tin[av][ak] && temp_tout[av][ak]) {
                tin_arr[av][ak] = temp_tin[av][ak] - vertex[av][ak];
                tout_arr[av][ak] = temp_tout[av][ak] - vertex[av][ak];
              }
            }
          }
          vnull.source.remove();
        }
        master_null.remove();
        var target_shape = ori_lr
          .property("ADBE Mask Parade")
          .property(mask_ind)
          .property(1);
        var final_values = [];
        for (var ak = 0; ak < times.length; ak += 1) {
          var target_value = target_shape.valueAtTime(times[ak], true);
          var final_ver = [];
          var final_tin = [];
          var final_tout = [];
          for (var av = 0; av < ver_arr.length; av += 1) {
            if (av < max_ver[ak] && tin_arr[av][ak] && tout_arr[av][ak]) {
              final_tin[av] = [tin_arr[av][ak][0], tin_arr[av][ak][1]];
              final_tout[av] = [tout_arr[av][ak][0], tout_arr[av][ak][1]];
            }
          }
          target_value.inTangents = final_tin;
          target_value.outTangents = final_tout;
          final_values.push(target_value);
        }
        for (var ak = target_shape.numKeys; ak > 0; ak--) {
          target_shape.removeKey(ak);
        }
        target_shape.setValuesAtTimes(times, final_values);
        if (last == 0) {
          target_shape.removeKey(1);
        }
        ori_lr.transform.anchorPoint.expression = "";
        ori_lr.transform.position.expression = "";
        ori_lr.transform.scale.expression = "";
        if (ori_lr.threeDLayer) {
          ori_lr.transform.xRotation.expression = "";
          ori_lr.transform.yRotation.expression = "";
          ori_lr.transform.zRotation.expression = "";
          ori_lr.transform.orientation.expression = "";
        }
        if (ol_3d != true) {
          ori_lr.threeDLayer = false;
        }
        app.project.activeItem.time = cur_time;
        return apply_ok;
      }
      function Apply_Masks() {
        if (app.project && app.project.activeItem) {
          var ct = app.project.activeItem.time;
          app.project.activeItem.time = 0;
          var limit = false;
          var sel = Select_Layers();
          var apply_ok = true;
          var count = -1;
          var ori_layers_sel = [];
          var m_sel = [];
          for (var al = sel.length - 1; al >= 0; al--) {
            var ind = sel[al];
            var sl = app.project.activeItem.layers[ind];
            if (sl instanceof TextLayer || sl instanceof ShapeLayer) {
              var sl_name = sl.name;
            } else {
              var sl_name = sl.source.name;
            }
            var parent = sl.parent;
            var par_par = false;
            if (parent.parent !== null) {
              par_par = parent.parent;
              parent.parent = null;
            }
            var id = sl_name.split(" ID #")[1];
            if (id) {
              var arr = [];
              arr[0] = Get_Layer_Transform(sl);
              arr[1] = Get_Mask_Data(sl, 1);
              var layers = app.project.activeItem.layers;
              for (var as = 1; as <= layers.length; as += 1) {
                var cl = layers[as];
                var masks = cl.property("ADBE Mask Parade");
                if (masks !== null && masks.numProperties > 0) {
                  for (var am = 1; am <= masks.numProperties; am += 1) {
                    var mask = masks.property(am);
                    if (id == mask.name.split(" ID #")[1]) {
                      count++;
                      var ori_ind = cl.index - sel.length + count;
                      ori_layers_sel.push(ori_ind);
                      var arr_extract = mask
                        .property(4)
                        .expression.split("/*")
                        .pop()
                        .split("*/")
                        .shift();
                      arr[2] = eval(JSON.parse(JSON.stringify(arr_extract)))[2];
                      var opa_exp =
                        "/*\n" + JSON.stringify(arr) + "\n*/\nvalue";
                      mask.property(4).expression = opa_exp;
                      m_sel.push(sl.name);
                      apply_ok = Apply_Mask_Transformations(sl, cl, am);
                      sl.source.remove();
                    }
                  }
                }
              }
            }
            if (apply_ok == false) {
              break;
            }
            if (par_par !== false) {
              parent.parent = par_par;
            }
          }
          if (apply_ok) {
            var ms = [];
            for (var al = app.project.activeItem.layers.length; al > 0; al--) {
              var lr = app.project.activeItem.layers[al];
              var ind = lr.index;
              var masks = lr.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                ms.push([ind, []]);
                for (var am = masks.numProperties; am > 0; am--) {
                  var mask = masks.property(am);
                  for (var ar = 0; ar < m_sel.length; ar += 1) {
                    var hlp_name = m_sel[ar];
                    if (mask.name == hlp_name) {
                      ms[ms.length - 1][1].push(am);
                      break;
                    }
                  }
                }
              }
            }
          }
          if (apply_ok) {
            for (var sl = 0; sl < ms.length; sl += 1) {
              var lr_ind = ms[sl][0];
              var lr = app.project.activeItem.layers[lr_ind];
              lr.locked = false;
              if (ms[sl][1].length > 0) {
                var masks = lr.property("ADBE Mask Parade");
                if (masks !== null && masks.numProperties > 0) {
                  for (var am = 0; am < ms[sl][1].length; am += 1) {
                    var m_ind = ms[sl][1][am];
                    var mask = masks.property(m_ind);
                    mask.selected = true;
                    var arr_extract = mask
                      .property(4)
                      .expression.split("/*")
                      .pop()
                      .split("*/")
                      .shift();
                    var pr = eval(JSON.parse(JSON.stringify(arr_extract)))[2];
                    var mm = pr.mode.toString();
                    mm = parseFloat(mm.slice(-2));
                    if (mm == 12) {
                      mask.maskMode = MaskMode.NONE;
                    }
                    if (mm == 13) {
                      mask.maskMode = MaskMode.ADD;
                    }
                    if (mm == 14) {
                      mask.maskMode = MaskMode.SUBTRACT;
                    }
                    if (mm == 15) {
                      mask.maskMode = MaskMode.INTERSECT;
                    }
                    if (mm == 16) {
                      mask.maskMode = MaskMode.LIGHTEN;
                    }
                    if (mm == 17) {
                      mask.maskMode = MaskMode.DARKEN;
                    }
                    if (mm == 18) {
                      mask.maskMode = MaskMode.DIFFERENCE;
                    }
                  }
                }
              }
            }
          }
          if (limit) {
            alert("In trial mode is applied only 1 helper at a time.");
          }
          app.project.activeItem.time = ct;
          return apply_ok;
        }
      }
      function Remove_Masks() {
        if (app.project && app.project.activeItem) {
          var ms = [];
          var m_sel = [];
          var sel = Select_Layers();
          for (var al = sel.length - 1; al >= 0; al--) {
            var ind = sel[al];
            var sl = app.project.activeItem.layers[ind];
            var sl_name = sl.name;
            var sl_id = sl_name.split(" ID #")[1];
            if (sl_id) {
              sl.source.remove();
            }
            var brk = false;
            for (
              var ee = 1;
              ee <= app.project.activeItem.layers.length;
              ee += 1
            ) {
              var ol = app.project.activeItem.layers[ee];
              var masks = ol.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = masks.numProperties; am > 0; am--) {
                  var mask = masks.property(am);
                  var id = mask.name.split(" ID #")[1];
                  if (id && id == sl_id) {
                    m_sel.push([sl_name, false]);
                    ol.locked = false;
                    var arr_extract = mask
                      .property(4)
                      .expression.split("/*")
                      .pop()
                      .split("*/")
                      .shift();
                    var pr = eval(JSON.parse(JSON.stringify(arr_extract)))[2];
                    var mm = pr.mode.toString();
                    mm = parseFloat(mm.slice(-2));
                    if (mm == 12) {
                      mask.maskMode = MaskMode.NONE;
                    }
                    if (mm == 13) {
                      mask.maskMode = MaskMode.ADD;
                    }
                    if (mm == 14) {
                      mask.maskMode = MaskMode.SUBTRACT;
                    }
                    if (mm == 15) {
                      mask.maskMode = MaskMode.INTERSECT;
                    }
                    if (mm == 16) {
                      mask.maskMode = MaskMode.LIGHTEN;
                    }
                    if (mm == 17) {
                      mask.maskMode = MaskMode.DARKEN;
                    }
                    if (mm == 18) {
                      mask.maskMode = MaskMode.DIFFERENCE;
                    }
                    brk = true;
                    break;
                  }
                }
              }
              if (brk) {
                break;
              }
            }
          }
          var sel = Select_Layers();
          var apply_ok = true;
          for (var al = 0; al < sel.length; al += 1) {
            var ind = sel[al];
            var sl = app.project.activeItem.layers[ind];
            if (sl.selected) {
              var masks = sl.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = masks.numProperties; am > 0; am--) {
                  var mask = masks.property(am);
                  if (mask.selected) {
                    var id = mask.name.split(" ID #")[1];
                    if (id) {
                      m_sel.push([mask.name, true]);
                    }
                  }
                }
              }
            }
          }
          for (var am = 0; am < m_sel.length; am += 1) {
            var m_id = m_sel[am][0].toString().split(" ID #")[1];
            var msk_ok = m_sel[am][1];
            for (var al = app.project.activeItem.layers.length; al > 0; al--) {
              var lr = app.project.activeItem.layers[al];
              var lr_name = lr.name;
              var id = lr_name.split(" ID #")[1];
              if (id == m_id && msk_ok) {
                lr.source.remove();
                break;
              }
            }
          }
          for (var al = app.project.activeItem.layers.length; al > 0; al--) {
            var lr = app.project.activeItem.layers[al];
            var ind = lr.index;
            var masks = lr.property("ADBE Mask Parade");
            if (masks !== null && masks.numProperties > 0) {
              ms.push([ind, []]);
              for (var am = masks.numProperties; am > 0; am--) {
                var mask = masks.property(am);
                for (var ar = 0; ar < m_sel.length; ar += 1) {
                  var hlp_id = m_sel[ar][0].split(" ID #")[1];
                  var id = mask.name.split(" ID #")[1];
                  if (id == hlp_id) {
                    ms[ms.length - 1][1].push(am);
                    break;
                  }
                }
              }
            }
          }
          for (var ar = 0; ar < m_sel.length; ar += 1) {
            if (m_sel[ar][1]) {
              var hlp_name = m_sel[ar][0];
              for (
                var al = app.project.activeItem.layers.length;
                al > 0;
                al--
              ) {
                var lr = app.project.activeItem.layers[al];
                var masks = lr.property("ADBE Mask Parade");
                if (masks !== null && masks.numProperties > 0) {
                  for (var am = masks.numProperties; am > 0; am--) {
                    var mask = masks.property(am);
                    if (mask.name == hlp_name) {
                      var id = mask.name.split(" ID #")[1];
                      mask.name = mask.name.split(" - ID #")[0];
                      if (id) {
                        var arr_extract = mask
                          .property(4)
                          .expression.split("/*")
                          .pop()
                          .split("*/")
                          .shift();
                        if (arr_extract) {
                          var arr = eval(arr_extract);
                          if (arr[2]) {
                            for (var ap = 1; ap <= 4; ap += 1) {
                              var prop = mask.property(ap);
                              prop.expression = "";
                              for (var ak = prop.numKeys; ak > 0; ak--) {
                                prop.removeKey(ak);
                              }
                            }
                            Set_Mask(arr[2], lr, am);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          for (var sl = 0; sl < ms.length; sl += 1) {
            var lr_ind = ms[sl][0];
            var lr = app.project.activeItem.layers[lr_ind];
            if (ms[sl][1].length > 0) {
              var masks = lr.property("ADBE Mask Parade");
              if (masks !== null && masks.numProperties > 0) {
                for (var am = 0; am < ms[sl][1].length; am += 1) {
                  var m_ind = ms[sl][1][am];
                  var mask = masks.property(m_ind);
                  mask.selected = true;
                }
              }
            }
          }
        }
      }
      function Settings() {
        settings_window = new Window("palette");
        settings_window.orientation = "column";
        var logo_image = ScriptUI.newImage(icons_array[4]);
        var logo_icon = settings_window.add(
          "iconbutton",
          undefined,
          logo_image,
        );
        logo_icon.size = [210, 100];
        var help_pnl = settings_window.add("panel", undefined, "Help");
        help_pnl.alignment = ["fill", "bottom"];
        help_pnl.orientation = "column";
        help_bt = help_pnl.add("button", undefined, "Help");
        help_bt.alignment = ["left", "bottom"];
        help_bt.onClick = function () {
          MT_Set.helpUI();
        };
        logo_icon.onClick = function () {
          if ($.os.indexOf("Windows") != -1) {
            system.callSystem("explorer " + mt_url);
          } else {
            system.callSystem("open " + mt_url);
          }
        };
        settings_window.show();
      }
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
      var script_name = "Mask Transform 1.0";
      var mt_url = "https://aescripts.com/mask-transformer/";
      var edit_mode = false;
      var edit_sel = [];
      icons_array = [
        __BLOB__BLOB_000380__,
        __BLOB__BLOB_000381__,
        __BLOB__BLOB_000382__,
        __BLOB__BLOB_000383__,
        __BLOB__BLOB_000384__,
      ];
      var mainPalette =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", script_name, undefined, { resizeable: true });
      if (mainPalette == null) {
        return;
      }
      mainPalette.minimumSize = [140, 60];
      mainPalette.alignChildren = ["left", "fill"];
      mainPalette.margins = 5;
      mainPalette.spacing = 2;
      var edit_img = ScriptUI.newImage(icons_array[0]);
      var apply_img = ScriptUI.newImage(icons_array[1]);
      var reset_img = ScriptUI.newImage(icons_array[2]);
      var settings_img = ScriptUI.newImage(icons_array[3]);
      var bottom_buttons_Grp = mainPalette.add("group");
      bottom_buttons_Grp.alignment = ["fill", "fill"];
      bottom_buttons_Grp.orientation = "row";
      bottom_buttons_Grp.alignChildren = ["fill", "fill"];
      var edit_Bt = bottom_buttons_Grp.add("iconbutton", undefined, edit_img);
      edit_Bt.alignment = ["fill", "fill"];
      edit_Bt.helpTip = "EDIT the selected masks.";
      var apply_Bt = bottom_buttons_Grp.add("iconbutton", undefined, apply_img);
      apply_Bt.alignment = ["fill", "fill"];
      apply_Bt.helpTip = "APPLY transformations to masks helpers.";
      var remove_Bt = bottom_buttons_Grp.add(
        "iconbutton",
        undefined,
        reset_img,
      );
      remove_Bt.alignment = ["fill", "fill"];
      remove_Bt.helpTip = "REMOVE helper masks and reset original masks.";
      var settings_Bt = bottom_buttons_Grp.add(
        "iconbutton",
        undefined,
        settings_img,
      );
      settings_Bt.alignment = ["fill", "fill"];
      settings_Bt.helpTip = "Settings.";
      var cnt = 0;
      var err = "trial mode is limited to 10 edit - apply - remove operations.";
      edit_Bt.onClick = function Edit_Listener() {
        cnt++;
        if (isTrial && cnt > 10) {
          alert(err);
        } else {
          app.beginUndoGroup("Edit Masks");
          Edit_Masks();
          Check_Id_Duplicates();
          app.endUndoGroup();
        }
      };
      apply_Bt.onClick = function Apply_Listener() {
        cnt++;
        if (isTrial && cnt > 10) {
          alert(err);
        } else {
          app.beginUndoGroup("Apply Masks Transformations");
          Check_Id_Duplicates();
          apply_ok = Apply_Masks();
          app.endUndoGroup();
          if (apply_ok == false) {
            app.executeCommand(16);
          }
        }
      };
      remove_Bt.onClick = function Remove_Listener() {
        cnt++;
        if (isTrial && cnt > 10) {
          alert(err);
        } else {
          app.beginUndoGroup("Remove Masks Transformations");
          Check_Id_Duplicates();
          Remove_Masks();
          app.endUndoGroup();
        }
      };
      settings_Bt.onClick = function Settings_Listener() {
        app.beginUndoGroup("Reove Masks Transformations");
        Check_Id_Duplicates();
        Settings();
        app.endUndoGroup();
      };
      mainPalette.layout.layout(true);
      mainPalette.layout.resize();
      mainPalette.onResizing = mainPalette.onResize = function () {
        mainPalette.layout.resize();
      };
      if (!(mainPalette instanceof Panel)) {
        mainPalette.show();
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
            t.version +
              "\n" +
              strCurrentVersion.replace(/%v/, strScriptVersion),
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
          (Folder("/Volumes/Private").exists ||
            Folder("/Volumes/private").exists)
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
                  i = !removeLic();
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
      var wx = __BLOB__BLOB_000385__;
      var mx = __BLOB__BLOB_000386__;
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
      helpButtons: [],
      helpText:
        "Mask Transformer adds real 2D transformations to masks, through helper layers.\n\n- Edit button: generate an helper for each selected mask.\n\n- Apply button: apply the selected helpers transformations to the corresponding masks.\n\n- Remove button: remove the selected helper without applying the helper transformations, or reset the selected original masks.\n\n- Settings button: open the settings window.",
      offerBeta: false,
      offerTrial: true,
      privateNumber: 6935658513480291,
      productSKU: "MSNMT-SUL",
      scriptAuthor: "Marco Sanasi",
      scriptName: "Mask Transformer",
      scriptURL: "http://aescripts.com/mask-transformer/",
      scriptVersion: "1.0.8",
    };
    var af = new a(af_settings);
    var MT_Set = new a(af_settings);
    if (MT_Set.c()) {
      var isTrial = af.t();
      Mask_Transformer(thisObj);
    }
  }
}
ms_Mask_Transformer_Global(this);
