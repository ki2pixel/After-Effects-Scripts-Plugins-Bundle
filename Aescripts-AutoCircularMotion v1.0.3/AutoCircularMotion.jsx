/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function ADA_AutoCircularMotion(thisObj) {
  function AutoCircularMotion_Main(thisObj) {
    function CheckUI_ACM(UIObject) {
      if (UIObject instanceof Panel) {
        mainUI_ACM = UIObject;
      } else {
        mainUI_ACM = new Window(
          "palette",
          "AutoCircularMotion",
          [0, 0, 200, 240],
          { resizeable: true },
        );
      }
      return mainUI_ACM;
    }
    function MakePrimitive_ACM() {
      if (app_version >= 9) {
        function CRemoveListRefresh(tar, re, res, resname, shiki) {
          res = [];
          resname = [];
          if (app.project.activeItem == "[object CompItem]") {
            Clogc.text = "Refreshing\u2026";
            comp = app.project.activeItem;
            var ddd = app.project.activeItem.layers;
            var arukana = 0;
            var target3 = app.project.activeItem.selectedLayers[0];
            var ddd = app.project.activeItem.layers;
            for (var i = 1; i <= ddd.length; i += 1) {
              if (CMlang) {
                var swaycontgengo = "ACM\u5236\u5fa1";
              } else {
                var swaycontgengo = "CircularControl";
              }
              if (ddd[i].comment.indexOf(swaycontgengo) != -1) {
                res.push(ddd[i]);
                resname.push(ddd[i].name + "  [" + comp.name + "]");
                arukana += 1;
                Clogc.text =
                  "CircularControl\u30ec\u30a4\u30e4\u30fc\u691c\u7d22\u4e2d\u30fb\u30fb\u30fb\n" +
                  i +
                  "\u500b\u767a\u898b";
              }
            }
            if (target3 != null) {
              if (CMlang) {
                var swaycontgengo = "ACM\u5236\u5fa1";
              } else {
                var swaycontgengo = "CircularControl";
              }
              if (target3.comment.indexOf(swaycontgengo) != -1) {
                for (var i = 0; i <= arukana - 1; i += 1) {
                  if (target3.index == res[i].index) {
                    target3 = i;
                  }
                }
              } else {
                target3 = 0;
              }
            } else {
              target3 = 0;
            }
            if (arukana) {
              var primList_Cir = resname;
              for (var i = 0; i < re.children.length; i += 1) {
                if (re.children[i].type == "dropdownlist") {
                  re.remove(i);
                }
              }
              tar = re.add("dropdownlist", [10, 10, 180, 30], primList_Cir);
              tar.items[0].selected = true;
              tar.onChange = (function () {
                selectedIndex = tar.selection.index;
                if (selectedIndex == -1) {
                  tar.selection = 0;
                  if (shiki == "moto") {
                    selectedIndexMOTO = 0;
                  }
                  if (shiki == "saki") {
                    selectedIndexSAKI = 0;
                  }
                } else {
                  if (shiki == "moto") {
                    selectedIndexMOTO = selectedIndex;
                  }
                  if (shiki == "saki") {
                    selectedIndexSAKI = selectedIndex;
                  }
                }
              })();
              if (CMlang) {
                var Ccopysousugengo =
                  "\u30b3\u30d4\u30fc\u5143Refresh\u5b8c\u4e86";
              } else {
                var Ccopysousugengo = "Copy source refresh complete";
              }
              if (CMlang) {
                var CPastesousugengo =
                  "\u30da\u30fc\u30b9\u30c8\u5148Refresh\u5b8c\u4e86";
              } else {
                var CPastesousugengo = "Paste destination refresh complete";
              }
              if (shiki == "moto") {
                Clogc.text = Ccopysousugengo;
              }
              if (shiki == "saki") {
                Clogc.text = CPastesousugengo;
              }
              tar.items[target3].selected = true;
              if (shiki == "moto") {
                CirselLys_Cir = res;
              }
              if (shiki == "saki") {
                CirselLys2_Cir = res;
              }
            } else {
              if (CMlang) {
                var Ccopyyureseigyogengo =
                  "Refresh\u51e6\u7406\u4e2d\u30fb\u30fb\u30fb\n\u30a8\u30e9\u30fc\uff1aACM\u5236\u5fa1\u30ec\u30a4\u30e4\u30fc\u304c\u3042\u308a\u307e\u305b\u3093";
              } else {
                var Ccopyyureseigyogengo =
                  "Refreshing\u2026\nError: There is no [CircularControl] layer";
              }
              Clogc.text = Ccopyyureseigyogengo;
            }
          } else {
            if (CMlang) {
              var Cconponaigengo =
                "Refresh\u51e6\u7406\u4e2d\u30fb\u30fb\u30fb\n\u30a8\u30e9\u30fc\uff1a\u30b3\u30f3\u30dd\u3092\u958b\u3044\u3066\u304f\u3060\u3055\u3044";
            } else {
              var Cconponaigengo =
                "Refreshing\u2026\nError: Please open a composition";
            }
            Clogc.text = Cconponaigengo;
          }
        }
        function Crefapply(res, res2) {
          moto = res[selectedIndexMOTO];
          if (res2) {
            saki = res2[selectedIndexSAKI];
          } else {
            saki = res[selectedIndexSAKI];
          }
          if (CMlang) {
            if (moto.name == saki.name) {
              var shouldAdd = confirm(
                "\u78ba\u8a8d\n" +
                  moto.name +
                  "\u3068" +
                  saki.name +
                  "\u304c\n\u540c\u3058\u30ec\u30a4\u30e4\u30fc\u306e\u53ef\u80fd\u6027\u304c\u3042\u308a\u307e\u3059\u304c\u3001\u9069\u7528\u3057\u307e\u3059\u304b\uff1f",
              );
            } else {
              var shouldAdd = confirm(
                "\u78ba\u8a8d\n" +
                  moto.name +
                  "\u306e\u30a8\u30d5\u30a7\u30af\u30c8\u306e\u5024\u3092\n" +
                  saki.name +
                  "\u306b\u53cd\u6620\u3057\u307e\u3059\u304b\uff1f",
              );
            }
          } else {
            if (moto.name == saki.name) {
              var shouldAdd = confirm(
                "Please confirm,\n" +
                  moto.name +
                  " and " +
                  saki.name +
                  " could share the same layer, would you like to apply? ",
              );
            } else {
              var shouldAdd = confirm(
                "Please confirm, \ndo you wish to reflect the " +
                  moto.name +
                  " effect value to " +
                  saki.name +
                  "? ",
              );
            }
          }
          if (shouldAdd == true) {
            var eee = "";
            var errda = false;
            var copeyValue = [];
            psname = "ACM";
            psname2 = "ACM_Particular";
            copeyValue.push((fx1name = "Pendulum ON"));
            copeyValue.push((fx2name = "Angle(Pendulum only)"));
            copeyValue.push((fx6name = "Speed(XYZ)"));
            copeyValue.push((fx7name = "Scale XY"));
            copeyValue.push((fx9name = "Scale  Z"));
            copeyValue.push((fx10name = "Shift"));
            copeyValue.push((fx101name = "Position XY"));
            copeyValue.push((fx103name = "Position  Z"));
            copeyValue.push((fx104name = "Rotation XY"));
            copeyValue.push((fx106name = "Rotation  Z"));
            copeyValue.push((fx107name = "Speed XY"));
            copeyValue.push((fx108name = "Speed Z"));
            copeyValue.push((fx110name = "Scale(xy)"));
            copeyValue.push((fx111name = "Offset_XY"));
            copeyValue.push((fx113name = "Offset__Z"));
            copeyValue.push((fx11name = "Offset"));
            copeyValue.push((fx12name = "Decay(Scale)"));
            copeyValue.push((fx14name = "Position_XY"));
            copeyValue.push((fx15name = "Position__Z"));
            copeyValue.push((fx1611name = "FollowTarget_X"));
            copeyValue.push((fx1612name = "FollowTarget_Y"));
            copeyValue.push((fx1613name = "FollowTarget_Z"));
            copeyValue.push((fx162name = "Target"));
            copeyValue.push((fx163name = "AutoRotation_X"));
            copeyValue.push((fx164name = "AutoRotation_Y"));
            copeyValue.push((fx165name = "AutoRotation_Z"));
            copeyValue.push((fx1651name = "ReverseRotation"));
            copeyValue.push((fx166name = "Scale_XY(%)"));
            copeyValue.push((fx167name = "Scale__Z"));
            copeyValue.push((fx168name = "Opacity(0~100)"));
            copeyValue.push((fx169name = "Anchorpoint_XY"));
            copeyValue.push((fx170name = "Anchorpoint__Z"));
            copeyValue.push((fx171name = "RotationX"));
            copeyValue.push((fx172name = "RotationY"));
            copeyValue.push((fx173name = "RotationZ"));
            copeyValue.push((fx23name = "Bounce_X"));
            copeyValue.push((fx24name = "Bounce_Y"));
            copeyValue.push((fx25name = "Bounce_Z"));
            var flag = false;
            for (var i = 0; i < copeyValue.length; i += 1) {
              flag = false;
              try {
                var a = moto.effect.property(psname).property(copeyValue[i]);
              } catch (e) {
                var a = moto.effect.property(psname2).property(copeyValue[i]);
              }
              try {
                var b = saki.effect.property(psname).property(copeyValue[i]);
              } catch (e) {
                var b = saki.effect.property(psname2).property(copeyValue[i]);
              }
              try {
                a.value;
                flag = true;
              } catch (e) {
                flag = false;
              }
              try {
                b.value;
                flag = true;
              } catch (e) {
                flag = false;
              }
              if (flag) {
                keyframecopy(a, b);
              }
            }
            if (errda) {
              if (CMlang) {
                Clogc.text =
                  "\u4e00\u90e8\u306e\u30a8\u30d5\u30a7\u30af\u30c8\u3092\u9664\u304dCopy\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f";
                alert(
                  "Effect Error:" +
                    eee +
                    "\u304c\u3042\u308a\u307e\u305b\u3093",
                );
              } else {
                Clogc.text = "Copying is complete.";
                alert("Error:\nThere is no " + eee + " effect. ");
              }
            } else {
              if (CMlang) {
                Clogc.text = "Copy\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f";
              } else {
                Clogc.text = "Copy completed";
              }
            }
          } else {
            if (CMlang) {
              Clogc.text =
                "\u30ad\u30e3\u30f3\u30bb\u30eb\u3057\u307e\u3057\u305f";
            } else {
              Clogc.text = "Canceled";
            }
          }
        }
        if (!(mainUI_ACM instanceof Panel)) {
          mainUI_ACM.center();
          mainUI_ACM.show();
        }
        CMlang = false;
        var langda = app.isoLanguage;
        if (langda == "ja_JP") {
          CMlang = true;
        }
        primList_Cir = ["Not selected"];
        CirselLys2_Cir = new Array();
        CirselLys_Cir = new Array();
        CirselLysname = new Array();
        CirselLys2name = new Array();
        ACMtype = [
          "Circular(Default)",
          "Pendulum",
          "Ellipse",
          "Cylinder",
          "Chaos",
          "Wave",
          "DNA",
          "Vortex",
          "Bound ball",
          "Line",
        ];
        var Cgroup1 = mainUI_ACM.add("group", [0, 0, 200, 240], "undefined");
        var AutoCircularMotion = Cgroup1.add(
          "panel",
          [5, 5, 190, 230],
          "AutoCircularMotin_v1.03",
        );
        var Text01 = AutoCircularMotion.add(
          "statictext",
          [5, 18, 45, 38],
          "Type",
          { multiline: true },
        );
        var CircularType = AutoCircularMotion.add(
          "dropdownlist",
          [35, 15, 174, 35],
          ACMtype,
        );
        CirTyoeNum = 0;
        CircularType.selection = 0;
        CircularType.notify("onChange");
        if (CMlang) {
          var CCCheckA =
            "\u30ec\u30a4\u30e4\u30fc\u3092\u4e2d\u592e\u306b\u914d\u7f6e";
        } else {
          var CCCheckA = "Place the layer in the center.";
        }
        if (CMlang) {
          var CCCheckB =
            "\u30a2\u30f3\u30ab\u30fc\u30dd\u30a4\u30f3\u30c8\u3092\u4e2d\u5fc3\u306b\u8a2d\u5b9a";
        } else {
          var CCCheckB = "Anchor point in the center.";
        }
        CmCheck1fla = true;
        CmCheck2fla = true;
        var CmCheck1 = AutoCircularMotion.add(
          "checkbox",
          [5, 45, 185, 65],
          CCCheckA,
        );
        CmCheck1.value = 1;
        var CmCheck2 = AutoCircularMotion.add(
          "checkbox",
          [5, 65, 185, 85],
          CCCheckB,
        );
        CmCheck2.value = 1;
        CmCheck1.onClick = function () {
          CmCheck1fla = !CmCheck1fla;
        };
        CmCheck2.onClick = function () {
          CmCheck2fla = !CmCheck2fla;
        };
        var Cdelete = AutoCircularMotion.add(
          "button",
          [5, 85, 55, 110],
          "Delete",
        );
        var Ccopy = AutoCircularMotion.add(
          "button",
          [55, 85, 115, 110],
          "Copy tool",
        );
        var Coptions = AutoCircularMotion.add(
          "button",
          [115, 85, 175, 110],
          "Options",
        );
        var Capply = AutoCircularMotion.add(
          "button",
          [5, 115, 175, 155],
          "Apply",
        );
        Clog = AutoCircularMotion.add("edittext", [3, 160, 178, 205], "", {
          borderless: 1,
          enterKeySignalsOnChange: 0,
          multiline: 1,
          noecho: 0,
          readonly: 0,
        });
        Clog.text = registration;
        CircularType.onChange = function () {
          CirTyoeNum = CircularType.selection.index;
        };
        Ccheck1fla = false;
        Ccheck2fla = false;
        Ccheck3fla = false;
        Coptions.onClick = function () {
          try {
            if (CMlang) {
              var CoptiongengoA =
                "\u30ab\u30e1\u30e9\u306b\u5411\u304b\u3063\u3066\u65b9\u5411\u3092\u8a2d\u5b9a";
            } else {
              var CoptiongengoA = "Orient towards camera";
            }
            if (CMlang) {
              var CoptiongengoB =
                "\u30ec\u30a4\u30e4\u30fc\u304c\u30ab\u30e1\u30e9\u3092\u898b\u7d9a\u3051\u308b\u3088\u3046\u306b\u306a\u308a\u307e\u3059";
            } else {
              var CoptiongengoB = "Orient Towards Camera";
            }
            if (CMlang) {
              var CoptiongengoC =
                "\u30d1\u30b9\u306b\u6cbf\u3063\u3066\u65b9\u5411\u3092\u8a2d\u5b9a";
            } else {
              var CoptiongengoC = "Orient Along Path";
            }
            if (CMlang) {
              var CoptiongengoD =
                "\u30ec\u30a4\u30e4\u30fc\u304c\u30d1\u30b9\u306b\u6cbf\u3063\u3066\u5411\u304d\u3092\u5909\u3048\u307e\u3059";
            } else {
              var CoptiongengoD = "Orient Along Path";
            }
            if (CMlang) {
              var CoptiongengoE =
                "\u767b\u9332\u3055\u308c\u3066\u3044\u308b\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u30ea\u30bb\u30c3\u30c8\u3057\u307e\u3059\u3002";
            } else {
              var CoptiongengoE = "Resets a registered license.";
            }
            var a = "\'";
            Cpowin = new Window("palette", "ACM_Options", [0, 0, 285, 190], {
              resizeable: true,
            });
            COptionPanel = Cpowin.add(
              "panel",
              [10, 10, 270, 115],
              "AutoCircularMotion Options",
            );
            Ccheck1 = COptionPanel.add(
              "checkbox",
              [15, 15, 245, 35],
              CoptiongengoA,
            );
            if (Ccheck1fla) {
              Ccheck1.value = 1;
            }
            Ccheck1.helpTip = CoptiongengoB;
            Ccheck2 = COptionPanel.add(
              "checkbox",
              [15, 35, 245, 55],
              CoptiongengoC,
            );
            if (Ccheck2fla) {
              Ccheck2.value = 1;
            }
            Ccheck2.helpTip = CoptiongengoD;
            ClosedCir = COptionPanel.add("button", [15, 57, 240, 82], "Closed");
            Cop_keiko = Cpowin.add("statictext", [10, 117, 270, 157], "", {
              multiline: true,
            });
            Cop_keiko.text = registration;
            if (!isTrial) {
              LicenceResetCir = Cpowin.add("button", [15, 162, 100, 182], "?");
            }
            Cpowin.center();
            Cpowin.show();
            LicenceResetCir.onClick = function () {
              kjahsndf45545as6df46afsd54dasd_settings.helpUI();
            };
            ClosedCir.onClick = function () {
              Cpowin.close();
            };
            Ccheck1.onClick = function () {
              Ccheck1fla = !Ccheck1fla;
              if (Ccheck2.value == 1) {
                Ccheck2.value = 0;
                Ccheck2fla = 0;
              }
            };
            Ccheck2.onClick = function () {
              Ccheck2fla = !Ccheck2fla;
              if (Ccheck1.value == 1) {
                Ccheck1.value = 0;
                Ccheck1fla = 0;
              }
            };
          } catch (e) {
            alert(e);
          }
        };
        Ccopy.onClick = function () {
          if (CMlang) {
            var CcopygengoA = "\u30b3\u30d4\u30fc\u5143";
          } else {
            var CcopygengoA = "Copy source";
          }
          if (CMlang) {
            var CcopygengoB = "\u30da\u30fc\u30b9\u30c8\u5148";
          } else {
            var CcopygengoB = "Paste destination";
          }
          if (CMlang) {
            var CcopygengoC =
              "\u30b3\u30d4\u30fc\u5143\u3068\u306a\u308bACM\u5236\u5fa1\u30ec\u30a4\u30e4\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044";
          } else {
            var CcopygengoC =
              "Please select a [CircularControl] layer to be the copy source";
          }
          if (CMlang) {
            var CcopygengoD =
              "\u30b3\u30d4\u30fc\u5143\u306e\u4e00\u89a7\u3092\u66f4\u65b0\u3057\u307e\u3059";
          } else {
            var CcopygengoD = "Refresh copy source summary";
          }
          if (CMlang) {
            var CcopygengoE =
              "\u30da\u30fc\u30b9\u30c8\u5148\u3068\u306a\u308bACM\u5236\u5fa1\u30ec\u30a4\u30e4\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044";
          } else {
            var CcopygengoE =
              "Please select a sway control layer to be the paste destination";
          }
          if (CMlang) {
            var CcopygengoF =
              "\u30da\u30fc\u30b9\u30c8\u5148\u306e\u4e00\u89a7\u3092\u66f4\u65b0\u3057\u307e\u3059";
          } else {
            var CcopygengoF = "Refresh paste destination summary";
          }
          if (CMlang) {
            var CcopygengoG = "\u5b9f\u884c";
          } else {
            var CcopygengoG = "Apply";
          }
          CopyCirwindow = new Window("palette", "ACM_Copy", [10, 0, 245, 220]);
          var Circular_c_pane = CopyCirwindow.add(
            "panel",
            [10, 10, 225, 185],
            "AutoCircularMotionCopy",
          );
          panel_create_Cir = Circular_c_pane.add(
            "panel",
            [10, 10, 200, 80],
            CcopygengoA,
          );
          var dropdown_primitive_Cir = panel_create_Cir.add(
            "dropdownlist",
            [10, 10, 180, 30],
            primList_Cir,
          );
          dropdown_primitive_Cir.helpTip = CcopygengoC;
          var Reload1_Cir = panel_create_Cir.add(
            "button",
            [10, 35, 80, 55],
            "Refresh",
          );
          var window_Confirmation2 = panel_create_Cir.add(
            "button",
            [80, 35, 108, 55],
            "?",
          );
          Reload1_Cir.helpTip = CcopygengoD;
          panel_remove_Cir = Circular_c_pane.add(
            "panel",
            [10, 85, 200, 155],
            CcopygengoB,
          );
          var dropdown_remove_Cir = panel_remove_Cir.add(
            "dropdownlist",
            [10, 10, 180, 30],
            primList_Cir,
          );
          dropdown_remove_Cir.helpTip = CcopygengoE;
          apply_primitive2_Cir = panel_remove_Cir.add(
            "button",
            [80, 35, 180, 55],
            CcopygengoG,
          );
          var Reload2_Cir = panel_remove_Cir.add(
            "button",
            [10, 35, 80, 55],
            "Refresh",
          );
          Reload2_Cir.helpTip = "Refresh paste destination summary";
          Clogc = CopyCirwindow.add("statictext", [10, 187, 220, 400], "", {
            multiline: true,
          });
          CopyCirwindow.center();
          CopyCirwindow.show();
          dropdown_primitive_Cir.selection = 0;
          dropdown_primitive_Cir.notify("onChange");
          dropdown_remove_Cir.selection = 0;
          dropdown_remove_Cir.notify("onChange");
          window_Confirmation2.onClick = function () {
            if (help_obj1obj instanceof Panel) {
              help_obj1obj.close();
            } else {
              if (CMlang) {
                help_obj1obj = new Window(
                  "palette",
                  "[AutoCircularMotionCopy]Help",
                  [200, 150, 620, 200],
                );
                help_obj = help_obj1obj.add(
                  "statictext",
                  [15, 10, 1080, 380],
                  "ACM\u5236\u5fa1\u306e\u5024\u3092\u5225\u306eACM\u5236\u5fa1\u3078\u30b3\u30d4\u30fc\u51fa\u6765\u308b\u30c4\u30fc\u30eb\u3067\u3059\n\u30b3\u30d4\u30fc\u5143\u3068\u30da\u30fc\u30b9\u30c8\u5148\u3092\u9078\u629e\u3057\u3001\u5b9f\u884c\u30dc\u30bf\u30f3\u3092\u62bc\u3057\u3066\u304f\u3060\u3055\u3044",
                  { multiline: true },
                );
              } else {
                help_obj1obj = new Window(
                  "palette",
                  "[AutoCircularMotionCopy]Help",
                  [200, 150, 620, 200],
                );
                help_obj = help_obj1obj.add(
                  "statictext",
                  [15, 10, 1080, 380],
                  "A tool to copy the [CircularControl] value to another [CircularControl] \nSelect the copy source and paste destination, then click the apply button",
                  { multiline: true },
                );
              }
              help_obj1obj.show();
              help_obj1obj.center();
            }
          };
          Reload1_Cir.onClick = function () {
            try {
              CRemoveListRefresh(
                dropdown_primitive_Cir,
                panel_create_Cir,
                CirselLys_Cir,
                CirselLysname,
                "moto",
              );
            } catch (e) {
              alert(e);
            }
          };
          Reload2_Cir.onClick = function () {
            CRemoveListRefresh(
              dropdown_remove_Cir,
              panel_remove_Cir,
              CirselLys2_Cir,
              CirselLys2name,
              "saki",
            );
          };
          apply_primitive2_Cir.onClick = function () {
            app.beginUndoGroup("AutoCircularMotionCopy");
            Crefapply(CirselLys_Cir, CirselLys2_Cir);
            app.endUndoGroup();
          };
        };
        Capply.onClick = function () {
          app.beginUndoGroup("AutoCircularMotion");
          try {
            AutoCM();
          } catch (e) {
            alert(e);
          }
          app.endUndoGroup();
        };
        Cdelete.onClick = function () {
          app.beginUndoGroup("AutoCircularMotion_Delete");
          try {
            CMDelete();
          } catch (e) {
            alert(e);
          }
          app.endUndoGroup();
        };
        ccflag9_Cm = true;
        ccflag10_Cm = false;
        ccflag3_Cm = false;
        ccflag5_Cm = false;
        ccflag7_Cm = true;
      }
    }
    function AutoCM() {
      if (app.project.activeItem instanceof CompItem == false) {
        if (CMlang) {
          var nocompgengo =
            "\u30a8\u30e9\u30fc:\u30b3\u30f3\u30dd\u304c\u958b\u304b\u308c\u3066\u3044\u307e\u305b\u3093";
        } else {
          var nocompgengo = "Error: The composition cannot be opened";
        }
        Clog.text = nocompgengo;
        return;
      }
      AutoCMMain();
    }
    function AutoCMMain() {
      if (kjahsndf45545as6df46afsd54dasd_settings.s() == false) {
        isTrial = true;
      }
      if (isTrial) {
        if (!ACMTaikenNameCheck()) {
          return;
        }
      }
      Pflag = false;
      speedflag = true;
      var seiflag = true;
      angle_acm = true;
      bobon = 0;
      flag = false;
      noda = 0;
      bone_acm = 0;
      buttonbone_acmType = false;
      coins = [];
      var keys = 0;
      pinname = 1;
      parent_obj = [];
      ControlFlag_acm = true;
      calques = app.project.activeItem.selectedLayers;
      if (CMlang) {
        var nolayergengoA =
          "\u30a8\u30e9\u30fc:\u30ec\u30a4\u30e4\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044";
      } else {
        var nolayergengoA = "Error: Please select a layer";
      }
      if (calques.length == 0) {
        Clog.text = nolayergengoA;
        return;
      }
      for (var i = 0; i < calques.length; i += 1) {
        if (CMlang) {
          var circontgengo = "ACM\u5236\u5fa1";
        } else {
          var circontgengo = "CircularControl";
        }
        if (CMlang) {
          var nocirlayer =
            "\u30a8\u30e9\u30fc:\u65e2\u306b\u9069\u7528\u6e08\u307f\u3067\u3059";
        } else {
          var nocirlayer = "Error: It is already been applied";
        }
        if (calques[i].name.indexOf(circontgengo) != -1) {
          Clog.text = nocirlayer;
          continue;
        }
        if (CMlang) {
          var circontgengoA =
            "\u30a8\u30e9\u30fc:\u30ec\u30a4\u30e4\u30fc\u306b\u30ad\u30fc\u30d5\u30ec\u30fc\u30e0\u304c\u3042\u308b\u306e\u3067\u9069\u7528\u3067\u304d\u307e\u305b\u3093";
        } else {
          var circontgengoA =
            "Error: You can not apply because there is a key frame to the layer";
        }
        keys = calques[i]
          .property("ADBE Transform Group")
          .property("ADBE Position").numKeys;
        if (keys != 0) {
          Clog.text = circontgengoA;
          continue;
        }
        if (CMlang) {
          var circontgengoB =
            "\u30a8\u30e9\u30fc:\u65e2\u306b\u9069\u7528\u6e08\u307f\u3067\u3059";
        } else {
          var circontgengoB = "Error: It is already been applied";
        }
        ACMcom = calques[i].comment;
        if (ACMcom.indexOf("ACM") != -1) {
          Clog.text = circontgengoB;
          continue;
        }
        calque = calques[i];
        coins.push(calque);
      }
      var FFXFolderNameACM = "AutoCircularMotion_ffx";
      var FFXffxNameACM = "ACM.ffx";
      var FFXffxNameACMPar = "ACM_ Particular.ffx";
      if (
        ApplyFFX(
          getPathToFFXFolder(FFXFolderNameACM),
          FFXffxNameACM,
          0,
          "InstallCheck",
        ) == false
      ) {
        return;
      }
      if (
        ApplyFFX(
          getPathToFFXFolder(FFXFolderNameACM),
          FFXffxNameACMPar,
          0,
          "InstallCheck",
        ) == false
      ) {
        return;
      }
      if (coins.length == 0) {
        return;
      }
      coins.reverse();
      CMNum();
      var clen = coins.length;
      if (kjahsndf45545as6df46afsd54dasd_settings.s() == false) {
        isTrial = true;
      }
      if (isTrial) {
        if (clen > 4) {
          if (CMlang) {
            var ACMtriallayergengoB =
              "\u4f53\u9a13\u7248\u3067\u306f\u30ec\u30a4\u30e4\u30fc\u3078\u306e\u9069\u7528\u53ef\u80fd\u6570\u306f4\u3064\u307e\u3067\u3067\u3059\u3002\u30ec\u30a4\u30e4\u30fc\u6570\u3092\u6e1b\u3089\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
          } else {
            var ACMtriallayergengoB =
              "The trial is limited to 4 layers. Please deselect some layers. The full version does not have any limits.";
          }
          alert(ACMtriallayergengoB);
          return;
        }
      }
      for (var j = 0; j < coins.length; j += 1) {
        bone_acm = coins[j];
        CMNameCheck(bone_acm);
        CM_DD("CircularControl");
        if (pin == false) {
          ufe = app.project.activeItem.layers.addSolid(
            [0, 0, 0],
            "CircularControl",
            eval(20),
            eval(20),
            app.project.activeItem.pixelAspect,
          );
          ufe.remove();
        }
        CMSearch("CircularControl");
        if (ControlFlag_acm) {
          ControlObj_acm = comp.layers.add(acobj);
          ControlObj_acm.name = CMSearchNameCheck(calque);
          ControlObj_acm.guideLayer = true;
          ControlObj_acm("opacity").setValue(0);
          ControlObj_acm.comment += "AutoCircularMotionMODE,";
          ControlObj_acm.comment += ControlObj_acm.name + ",";
          if (Pflag != false) {
            ControlObj_acm.threeDLayer = true;
          }
          var cohe = comp.height / 2;
          var cowi = comp.width / 2;
          ControlFlag_acm = false;
        }
        ControlObj_acm.property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([cowi, cohe, 0]);
        parent_obj.push(bone_acm);
      }
      flag2 = false;
      alignObj_acm = [];
      var Ename = "tc Particular";
      var Pname1 = "tc Particular-0003";
      var Pname2 = "tc Particular-0004";
      if (parent_obj.length == 1 && parent_obj[0] instanceof ShapeLayer) {
        Shapede(parent_obj[0]);
      }
      if (parent_obj.length == 1) {
        var ParEF = EffectsExpda(parent_obj[0], Ename, Pname1, Pname2);
      }
      CMexo(ControlObj_acm);
      for (var i = 0; i < calques.length; i += 1) {
        alignObj_acm.push(calques[i].index);
      }
      alignObj_acm = Math.min.apply(null, alignObj_acm);
      ControlObj_acm.moveBefore(comp.layer(alignObj_acm));
      for (var i = 0; i < parent_obj.length; i += 1) {
        var dex = parent_obj[i].index;
        parent_obj[i].shy = true;
        if (parent_obj[i].name.indexOf("          ") == -1) {
          parent_obj[i].name = "          " + parent_obj[i].name;
          if (parent_obj[i] instanceof LightLayer && Ccheck3fla) {
            parent_obj[i].name = "Emitter";
            CMNameCheck(parent_obj[i]);
          }
          if (Pflag != false) {
            parent_obj[i].comment = "ACM Layer";
          }
          parent_obj[i].moveAfter(ControlObj_acm);
        }
        parent_obj[i].enabled = false;
        if (Pflag == false) {
          if (
            parent_obj[i] instanceof ShapeLayer ||
            parent_obj[i] instanceof TextLayer
          ) {
            if (CmCheck1fla == true) {
              var sca = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Scale").value;
              var le = parent_obj[i].sourceRectAtTime(0, true).left;
              var top = parent_obj[i].sourceRectAtTime(0, true).top;
              var he = parent_obj[i].sourceRectAtTime(0, true).height;
              var wh = parent_obj[i].sourceRectAtTime(0, true).width;
              var an = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Anchor Point").value;
              parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Position")
                .setValue([cowi, cohe, 0]);
              if (CmCheck2fla) {
                parent_obj[i]
                  .property("ADBE Transform Group")
                  .property("ADBE Anchor Point")
                  .setValue([le + wh / 2, top + he / 2, an[2]]);
              }
            } else {
              var sca = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Scale").value;
              var le = parent_obj[i].sourceRectAtTime(0, true).left;
              var top = parent_obj[i].sourceRectAtTime(0, true).top;
              var he = parent_obj[i].sourceRectAtTime(0, true).height;
              var wh = parent_obj[i].sourceRectAtTime(0, true).width;
              var pos = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Position").value;
              var an = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Anchor Point").value;
              if (CmCheck2fla) {
                parent_obj[i]
                  .property("ADBE Transform Group")
                  .property("ADBE Anchor Point")
                  .setValue([le + wh / 2, top + he / 2, an[2]]);
              }
              if (parent_obj[i] instanceof TextLayer == false) {
                parent_obj[i]
                  .property("ADBE Transform Group")
                  .property("ADBE Position")
                  .setValue([
                    pos[0] + le + wh / 2,
                    pos[1] + top + he / 2,
                    pos[2],
                  ]);
              }
            }
          }
          if (parent_obj[i] instanceof AVLayer) {
            if (CmCheck1fla == true) {
              parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Position")
                .setValue([cowi, cohe, 0]);
              if (CmCheck2fla) {
                parent_obj[i]
                  .property("ADBE Transform Group")
                  .property("ADBE Anchor Point")
                  .setValue([
                    parent_obj[i].width / 2,
                    parent_obj[i].height / 2,
                    0,
                  ]);
              }
            } else {
              var sca = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Scale").value;
              var pos = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Position").value;
              var an = parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Anchor Point").value;
              if (CmCheck2fla) {
                parent_obj[i]
                  .property("ADBE Transform Group")
                  .property("ADBE Anchor Point")
                  .setValue([
                    parent_obj[i].width / 2,
                    parent_obj[i].height / 2,
                    0,
                  ]);
              }
              parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Position")
                .setValue([
                  pos[0] + an[0] * -1 + parent_obj[i].width / 2,
                  pos[1] + an[1] * -1 + parent_obj[i].height / 2,
                  0,
                ]);
            }
          }
          if (
            parent_obj[i] instanceof LightLayer ||
            parent_obj[i] instanceof CameraLayer
          ) {
            if (CmCheck1fla == true) {
              parent_obj[i]
                .property("ADBE Transform Group")
                .property("ADBE Position")
                .setValue([cowi, cohe, 0]);
            }
          }
        }
        if (Pflag == false) {
          parent_obj[i].parent = comp.layer(ControlObj_acm.index);
        }
        ControlObj_acm.comment += parent_obj[i].name + ",";
      }
      kotei = dex;
      if (!ccflag5_Cm) {
        CMexoend(ControlObj_acm);
      }
      ControlObj_acm.selected = true;
      comp.layer(kotei).selected = false;
      calque.selected = false;
      for (var i = 0; i < parent_obj.length; i += 1) {
        var dex = parent_obj[i].index;
        CMxp(parent_obj[i], parent_obj.length, ControlObj_acm, seiflag, ParEF);
      }
      for (var i = 0; i < parent_obj.length; i += 1) {
        parent_obj[i].enabled = true;
        if (calque instanceof LightLayer == false && Ccheck1fla) {
          parent_obj[i].autoOrient = AutoOrientType.CAMERA_OR_POINT_OF_INTEREST;
        }
        if (calque instanceof LightLayer == false && Ccheck2fla) {
          parent_obj[i].autoOrient = AutoOrientType.ALONG_PATH;
        }
      }
      if (CMlang) {
        var autoCMkanryougengo = "AutoCircularMotion\u5b8c\u4e86";
      } else {
        var autoCMkanryougengo = "AutoCircularMotion completed";
      }
      Clog.text = autoCMkanryougengo;
    }
    function CMNameCheck(lname) {
      var newnum = 0;
      var hikaku = "";
      var complength = app.project.activeItem.numLayers;
      var comp = app.project.activeItem;
      for (var i = 1; i < complength + 1; i += 1) {
        if (lname.index != i) {
          if (comp.layer(i).name == lname.name + hikaku) {
            newnum += 1;
            i = 0;
            hikaku = "_" + parseInt(newnum);
          }
        }
      }
      lname.name += hikaku;
    }
    function CMNum() {
      kazeoffset = 1;
      var complength = app.project.activeItem.numLayers;
      var comp = app.project.activeItem;
      for (var i = 1; i < complength + 1; i += 1) {
        if (CMlang) {
          var CMcontgengo = "ACM\u5236\u5fa1";
        } else {
          var CMcontgengo = "CircularControl";
        }
        if (comp.layer(i).comment.indexOf(CMcontgengo) != -1) {
          kazeoffset += 1;
        }
      }
      if (kazeoffset == 0) {
        kazeoffset = 1;
      }
    }
    function ACMTaikenNameCheck() {
      var newnum = 0;
      var hikaku = "";
      if (CMlang) {
        ACMTaikenNameCheckgengoA = "ACM\u5236\u5fa1";
      } else {
        ACMTaikenNameCheckgengoA = "CircularControl";
      }
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (app.project.item(i) instanceof CompItem) {
          for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
            if (
              app.project
                .item(i)
                .layer(j)
                .comment.indexOf(ACMTaikenNameCheckgengoA) > 0
            ) {
              newnum += 1;
              hikaku = parseInt(newnum);
            }
          }
        }
        if (hikaku > 0) {
          if (CMlang) {
            alert(
              "\u4f53\u9a13\u7248\u3067\u306f\u3053\u308c\u4ee5\u4e0a\u4f5c\u6210\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093",
            );
          } else {
            alert(
              "You can not create any more.The full version does not have any limits.",
            );
          }
          return false;
        }
      }
      return true;
    }
    function CMSearchNameCheck(lname) {
      var newnum = 0;
      Hika_acm = 1;
      var complength = app.project.activeItem.numLayers;
      var comp = app.project.activeItem;
      for (var i = 1; i < complength + 1; i += 1) {
        if (lname.index != i) {
          if (CMlang) {
            var CircularControlgengoda = "[ACM\u5236\u5fa1]";
          } else {
            var CircularControlgengoda = "[CircularControl]";
          }
          if (
            comp.layer(i).name ==
            CircularControlgengoda + Hika_acm + "]_" + lname.name
          ) {
            newnum += 1;
            i = 0;
            Hika_acm = parseInt(newnum);
          }
        }
      }
      var CMnamedayo = CircularControlgengoda + Hika_acm + "]_" + lname.name;
      return CMnamedayo;
    }
    function CMexo(target) {
      var FFXFolderNameACM = "AutoCircularMotion_ffx";
      var FFXffxNameACM = "ACM.ffx";
      var FFXffxNameACMPar = "ACM_ Particular.ffx";
      if (Pflag == false) {
        ApplyFFX(
          getPathToFFXFolder(FFXFolderNameACM),
          FFXffxNameACM,
          target,
          "apply",
        );
        psname = "ACM";
        CFX = target.effect(psname);
      } else {
        ApplyFFX(
          getPathToFFXFolder(FFXFolderNameACM),
          FFXffxNameACMPar,
          target,
          "apply",
        );
        psname = "ACM_Particular";
        CFX = target.effect(psname);
      }
      fx1name = "Pendulum ON";
      fx2name = "Angle(Pendulum only)";
      fx6name = "Speed(XYZ)";
      fx7name = "Scale XY";
      fx9name = "Scale  Z";
      fx10name = "Shift";
      fx101name = "Position XY";
      fx103name = "Position  Z";
      fx104name = "Rotation XY";
      fx106name = "Rotation  Z";
      fx107name = "Speed XY";
      fx108name = "Speed Z";
      fx110name = "Scale(xy)";
      fx111name = "Offset_XY";
      fx113name = "Offset__Z";
      fx11name = "Offset";
      fx12name = "Decay(Scale)";
      fx14name = "Position_XY";
      fx15name = "Position__Z";
      fx1611name = "FollowTarget_X";
      fx1612name = "FollowTarget_Y";
      fx1613name = "FollowTarget_Z";
      fx162name = "Target";
      fx163name = "AutoRotation_X";
      fx164name = "AutoRotation_Y";
      fx165name = "AutoRotation_Z";
      fx1651name = "ReverseRotation";
      fx166name = "Scale_XY(%)";
      fx167name = "Scale__Z";
      fx168name = "Opacity(0~100)";
      fx169name = "Anchorpoint_XY";
      fx170name = "Anchorpoint__Z";
      fx171name = "RotationX";
      fx172name = "RotationY";
      fx173name = "RotationZ";
      fx23name = "Bounce_X";
      fx24name = "Bounce_Y";
      fx25name = "Bounce_Z";
      ControlFlag_acm = false;
    }
    function CMexoend(target) {
      var ccohe = comp.height / 2;
      var ccowi = comp.width / 2;
      if (Pflag == false) {
        CFX.property(fx166name).setValue([100, 100]);
        CFX.property(fx167name).setValue(100);
        if (ACMtype[CirTyoeNum] == "Circular(Default)") {
          CFX.property(fx7name).setValue([ccohe * 0.8, ccohe * 0.8]);
          CFX.property(fx9name).setValue(0);
        }
        if (ACMtype[CirTyoeNum] == "Pendulum") {
          CFX.property(fx1name).setValue(1);
          CFX.property(fx7name).setValue([ccowi / 2, ccowi / 2]);
          CFX.property(fx9name).setValue(0);
        }
        if (ACMtype[CirTyoeNum] == "Ellipse") {
          CFX.property(fx7name).setValue([ccowi / 1.5, ccowi / 4]);
          CFX.property(fx9name).setValue(-ccowi);
        }
        if (ACMtype[CirTyoeNum] == "Cylinder") {
          CFX.property(fx7name).setValue([ccohe * 0.8, 0]);
          CFX.property(fx9name).setValue(ccohe * 0.8);
          CFX.property(fx1611name).setValue(1);
          CFX.property(fx1612name).setValue(1);
          CFX.property(fx1613name).setValue(1);
        }
        if (ACMtype[CirTyoeNum] == "Chaos") {
          CFX.property(fx7name).setValue([ccohe * 0.5, ccohe * 0.5]);
          CFX.property(fx9name).setValue(ccohe * 0.5);
          CFX.property(fx10name).setValue(250);
          CFX.property(fx111name).setValue([1000, 1500]);
          CFX.property(fx113name).setValue(250);
          CFX.property(fx110name).setValue(60);
        }
        if (ACMtype[CirTyoeNum] == "Wave") {
          CFX.property(fx7name).setValue([0, ccohe * 0.3]);
          CFX.property(fx9name).setValue(0);
          CFX.property(fx10name).setValue(560);
          CFX.property(fx101name).setValue([500, 0]);
        }
        if (ACMtype[CirTyoeNum] == "DNA") {
          CFX.property(fx7name).setValue([0, ccohe * 0.3]);
          CFX.property(fx9name).setValue(100);
          CFX.property(fx10name).setValue(360);
          CFX.property(fx101name).setValue([700, 0]);
        }
        if (ACMtype[CirTyoeNum] == "Vortex") {
          CFX.property(fx6name).setValue(100);
          CFX.property(fx7name).setValue([0, 0]);
          CFX.property(fx9name).setValue(0);
          CFX.property(fx10name).setValue(30);
          CFX.property(fx110name).setValue(ccohe * 0.2);
          CFX.property(fx103name).setValue(ccohe * -0.5);
        }
        if (ACMtype[CirTyoeNum] == "Bound ball") {
          CFX.property(fx6name).setValue(110);
          CFX.property(fx7name).setValue([0, ccohe]);
          CFX.property(fx9name).setValue(0);
          CFX.property(fx12name).setValue(-300);
          CFX.property(fx24name).setValue(1);
        }
        if (ACMtype[CirTyoeNum] == "Line") {
          CFX.property(fx7name).setValue([ccohe * 0.2, ccohe * 0.2]);
          CFX.property(fx9name).setValue(0);
          CFX.property(fx166name).setValue([5, ccowi * 4]);
          CFX.property(fx172name).setValue(90);
          CFX.property(fx1611name).setValue(1);
          CFX.property(fx1612name).setValue(1);
          CFX.property(fx1613name).setValue(1);
        }
      } else {
        CFX.property(fx6name).setValue(100);
        CFX.property(fx7name).setValue([ccohe * 0.8, ccohe * 0.8]);
        CFX.property(fx9name).setValue(0);
      }
    }
    function CMxp(target, tnum, seiobj, seiflag, ParEF) {
      var a = "\'";
      if (target.threeDLayer != true && Pflag == false) {
        target.threeDLayer = true;
      } else {
        target.threeDLayer = false;
      }
      if (flag == false) {
        nodahan = parent_obj.length + 1;
      }
      if (!ccflag3_Cm) {
        noda++;
      } else {
        nodahan -= 1;
        noda = nodahan;
      }
      if (flag == false && ccflag10_Cm) {
        ramnum = random_num(nodahan);
      }
      if (ccflag10_Cm) {
        noda = ramnum[0];
        ramnum.splice(0, 1);
      }
      if (!ccflag7_Cm) {
        noda = 0;
      }
      if (CirTyoeNum == 300) {
        var atoms =
          "if(" +
          noda +
          "% 2 == 0){;\n" +
          "    rangexy[0]=-rangexy[0];\n" +
          "    rangexy[1]=-rangexy[1];\n" +
          "    rangez=-rangez;\n" +
          "     displacementXYZ =-displacementXYZ;\n" +
          "     displacementXYZ =-displacementXYZ;\n" +
          "     displacementZ =-displacementZ};\n";
      } else {
        var atoms = "";
      }
      if (
        (ACMtype[CirTyoeNum] == "Chaos" ||
          (ACMtype[CirTyoeNum] == "Wave") | (ACMtype[CirTyoeNum] == "DNA")) &&
        Pflag == false
      ) {
        var Cang = 0;
      } else {
        var Cang = ((360 / tnum) * 100 * Math.PI) / 180;
      }
      if (ACMtype[CirTyoeNum] == "DNA" && Pflag == false) {
        var Dna =
          "\t    z=rangez*(Math.sin(splagZ*displacementXYZ * Math.PI  * stime+offsetZ))*Math.exp(ttx*decay);\n";
      } else {
        var Dna =
          "\t    z=rangez*(Math.cos(splagZ*displacementXYZ * Math.PI  * stime+offsetZ))*Math.exp(ttx*decay);\n";
      }
      try {
        if (seiflag == true && Pflag == false) {
          seiobj.effect.property(psname).property(fx10name).expression =
            "value+" + Cang;
          seiflag = false;
        }
      } catch (e) {}
      if (speedflag) {
        FX = ControlObj_acm.effect.addProperty("ADBE Slider Control");
        if (CMlang) {
          FX.name = "ACM_speedXYZ(\u524a\u9664\u7981\u6b62)";
        } else {
          FX.name = "ACM_speedXYZ[delete prohibited]";
        }
        speedXYZname = FX.name;
        FX = ControlObj_acm.effect
          .property(speedXYZname)
          .property("ADBE Slider Control-0001");
        targetName = ControlObj_acm.name;
        var fps = app.project.activeItem.frameRate;
        FX.expression =
          "sp=0;\ntry{nKey1 = thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx6name +
          a +
          ").nearestKey(0)}catch(e){nKey1=" +
          a +
          "null" +
          a +
          ";};\n" +
          "if (nKey1 != " +
          a +
          "null" +
          a +
          ") {\n" +
          "i = 0;\n" +
          "while( i-0.01+inPoint <= time){\n" +
          "\tsp  += (thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx6name +
          a +
          ").valueAtTime(i+inPoint)/" +
          fps +
          ")*-0.02;\n" +
          "\ti += 1/" +
          fps +
          ";\n" +
          "};\n" +
          "sp+= thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx6name +
          a +
          ")*0.02*1/" +
          fps +
          ";\n" +
          "Math.floor( sp*1000)/1000;\n" +
          "}else{\n" +
          "sp= thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx6name +
          a +
          ")*-0.02*(time-inPoint);\n" +
          "};\n";
        speedflag = false;
      }
      if (Pflag) {
        FX = ControlObj_acm.effect.addProperty("ADBE Point3D Control");
        if (CMlang) {
          FX.name = "ACM_Position(\u524a\u9664\u7981\u6b62)";
        } else {
          FX.name = "ACM_Position[delete prohibited]";
        }
        POSXYZname = FX.name;
        FX = ControlObj_acm.effect
          .property(POSXYZname)
          .property("ADBE Point3D Control-0001");
        targetName = ControlObj_acm.name;
        FX.expression =
          "var no=" +
          noda +
          ";\n" +
          "huriko=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx1name +
          a +
          ");\n" +
          "bounceX=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx23name +
          a +
          ");\n" +
          "bounceY=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx24name +
          a +
          ");\n" +
          "bounceZ=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx25name +
          a +
          ");\n" +
          "rangexy=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx7name +
          a +
          ");\n" +
          "rangez=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx9name +
          a +
          ");\n" +
          "angle=degreesToRadians(180+thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx2name +
          a +
          ")*-1);\n" +
          "offset=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx11name +
          a +
          ")*0.01;\n" +
          "decay=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx12name +
          a +
          ")*0.01;\n" +
          "displacementXYZ=thisComp.layer(" +
          a +
          targetName +
          a +
          ").effect(" +
          a +
          speedXYZname +
          a +
          ")" +
          "(" +
          a +
          "ADBE Slider Control-0001" +
          a +
          ");\n" +
          "splagXY=[1,1]+no*thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx107name +
          a +
          ")*0.001;\n" +
          "splagZ=1+no*thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx108name +
          a +
          ")*0.001;\n" +
          "gtime=0;\n" +
          "try{nKey =thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx12name +
          a +
          ").nearestKey(0);\n" +
          "if(time >= nKey.time ) {gtime=time-nKey.time}else{gtime=time-nKey.time;if(gtime<0){decay=0}}}catch(e){gtime=time;nKey=" +
          a +
          "NaN" +
          a +
          "};\n" +
          "if(nKey==" +
          a +
          "NaN" +
          a +
          "){ttx=time-thisLayer.inPoint}else{ttx=gtime};\n" +
          atoms +
          "stime=1;\n" +
          "range=100;\n" +
          "offsetXY=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx111name +
          a +
          ")*0.001;\n" +
          "offsetZ=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx113name +
          a +
          ")*0.001;\n" +
          "offsetXY[0]=offset+(offsetXY[0]*no);\n" +
          "offsetXY[1]=offset+(offsetXY[1]*no);\n" +
          "offsetZ=offset+(offsetZ*no);\n" +
          "decayspeed=(Math.abs(decay))*0.2;\n" +
          "displacementXYZ=displacementXYZ*Math.exp(ttx*decayspeed);\n" +
          "if(huriko==true){\n" +
          "\t\tx=(Math.sin(splagXY[0]*displacementXYZ *Math.PI * stime+offsetXY[0]))*Math.exp(ttx*decay);\n" +
          "\t\ty=(Math.sin(splagXY[1]*displacementXYZ *Math.PI* stime+offsetXY[1]))*Math.exp(ttx*decay);\n" +
          "\t\tz=(Math.sin(splagZ*displacementXYZ * Math.PI * stime+offsetZ))*Math.exp(ttx*decay);\n" +
          "\ttry{[rangexy[0]*(Math.sin(x*(range*0.01)+angle))+value[0],rangexy[1]*(Math.cos(y*(range*0.01)+angle))+value[1],rangez*Math.cos(z*(range*0.01)+angle)+value[2]]}catch( e ){[rangexy[0]*(Math.sin(x*(range*0.01)+angle))+value[0],rangexy[1]*(Math.cos(y*(range*0.01)+angle))+value[1]]}\n" +
          "}else{\n" +
          "\t\tx=rangexy[0]*(Math.sin(splagXY[0]*displacementXYZ * Math.PI  * stime+offsetXY[0]))*Math.exp(ttx*decay);\n" +
          "\t    if(bounceX!=false){x=Math.abs(x)}\n" +
          "\t\ty=rangexy[1]*(Math.cos(splagXY[1]*displacementXYZ * Math.PI  * stime+offsetXY[1]))*Math.exp(ttx*decay);\n" +
          "   \tif(bounceY!=false){y=Math.abs(y)*-1}\n" +
          Dna +
          "\t\tif(bounceZ!=false){z=Math.abs(z)}\n" +
          "\ttry{[x+value[0],y+value[1],z+value[2]]}catch(e){[x+value[0],y+value[1]]}\n" +
          "}\n";
        ParEF[0].expression =
          "//AutoCircularMotion_Particular_Mode;\nepos=thisComp.layer(" +
          a +
          targetName +
          a +
          ").effect(" +
          a +
          POSXYZname +
          a +
          ")" +
          "(" +
          a +
          "ADBE Point3D Control-0001" +
          a +
          ");\n" +
          "pos = thisComp.layer(" +
          a +
          targetName +
          a +
          ").toWorld(thisComp.layer(" +
          a +
          targetName +
          a +
          ").anchorPoint);\n" +
          "[epos[0]+pos[0],epos[1]+pos[1]]";
        ParEF[1].expression =
          "//AutoCircularMotion_Particular_Mode;\nepos=thisComp.layer(" +
          a +
          targetName +
          a +
          ").effect(" +
          a +
          POSXYZname +
          a +
          ")" +
          "(" +
          a +
          "ADBE Point3D Control-0001" +
          a +
          ");\n" +
          "try{pos = thisComp.layer(" +
          a +
          targetName +
          a +
          ").toWorld(thisComp.layer(" +
          a +
          targetName +
          a +
          ").anchorPoint);pos=pos[2];}catch(e){pos=0;};\n" +
          "epos[2]+pos";
      }
      if (Pflag == false) {
        try {
          target.xRotation.expression =
            "no=" +
            noda +
            ";\n" +
            "lag=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx104name +
            a +
            ")*0.1;\n" +
            "rotax=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx171name +
            a +
            ");\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx1651name +
            a +
            ")==1){r=1}else{r=-1};\n" +
            "rota=lag[0]*no;\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx163name +
            a +
            ")==1){\n" +
            "cycle=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx6name +
            a +
            ")*0.01;\n" +
            "gtime=0;\n" +
            "try{nKey =thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx12name +
            a +
            ").nearestKey(0);\n" +
            "if(time >= nKey.time ) {gtime=time-nKey.time}else{gtime=time-nKey.time;if(gtime<0){decay=0}}}catch(e){gtime=time;nKey=" +
            a +
            "NaN" +
            a +
            "};\n" +
            "if(nKey==" +
            a +
            "NaN" +
            a +
            "){ttx=time-thisLayer.inPoint}else{ttx=gtime};\n" +
            "cycle= cycle*Math.exp(ttx*thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx12name +
            a +
            ")*0.01);\n" +
            "if(cycle==0){ttx=1;cycle=1};\n" +
            "baseTime=ttx%(1/cycle);\n" +
            "min=0;\n" +
            "max=360*r;\n" +
            "UP=linear(baseTime, 0, (1/cycle), min, max);\n" +
            "Down= linear(baseTime, (1/cycle), cycle, max, min);\n" +
            "(baseTime < (1/cycle))? UP+value+rota+rotax : Down+value+rota+rotax;}else{\n" +
            "value+rota+rotax;\n" +
            "}\n";
          target.yRotation.expression =
            "no=" +
            noda +
            ";\n" +
            "lag=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx104name +
            a +
            ")*0.1;\n" +
            "rotay=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx172name +
            a +
            ");\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx1651name +
            a +
            ")==1){r=1}else{r=-1};\n" +
            "rota=lag[1]*no;\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx164name +
            a +
            ")==1){\n" +
            "cycle=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx6name +
            a +
            ")*0.01;\n" +
            "gtime=0;\n" +
            "try{nKey =thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx12name +
            a +
            ").nearestKey(0);\n" +
            "if(time >= nKey.time ) {gtime=time-nKey.time}else{gtime=time-nKey.time;if(gtime<0){decay=0}}}catch(e){gtime=time;nKey=" +
            a +
            "NaN" +
            a +
            "};\n" +
            "if(nKey==" +
            a +
            "NaN" +
            a +
            "){ttx=time-thisLayer.inPoint}else{ttx=gtime};\n" +
            "cycle= cycle*Math.exp(ttx*thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx12name +
            a +
            ")*0.01);\n" +
            "if(cycle==0){ttx=1;cycle=1};\n" +
            "baseTime=ttx%(1/cycle);\n" +
            "min=0;\n" +
            "max=360*r;\n" +
            "UP=linear(baseTime, 0, (1/cycle), min, max);\n" +
            "Down= linear(baseTime, (1/cycle), cycle, max, min);\n" +
            "(baseTime < (1/cycle))? UP+value+rota+rotay : Down+value+rota+rotay;}else{\n" +
            "value+rota+rotay;\n" +
            "}\n";
          target.zRotation.expression =
            "no=" +
            noda +
            ";\n" +
            "lag=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx106name +
            a +
            ")*0.1;\n" +
            "rotaz=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx173name +
            a +
            ");\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx1651name +
            a +
            ")==1){r=1}else{r=-1};\n" +
            "rota=lag*no;\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx165name +
            a +
            ")==1){\n" +
            "cycle=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx6name +
            a +
            ")*0.01;\n" +
            "gtime=0;\n" +
            "try{nKey =thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx12name +
            a +
            ").nearestKey(0);\n" +
            "if(time >= nKey.time ) {gtime=time-nKey.time}else{gtime=time-nKey.time;if(gtime<0){decay=0}}}catch(e){gtime=time;nKey=" +
            a +
            "NaN" +
            a +
            "};\n" +
            "if(nKey==" +
            a +
            "NaN" +
            a +
            "){ttx=time-thisLayer.inPoint}else{ttx=gtime};\n" +
            "cycle= cycle*Math.exp(ttx*thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx12name +
            a +
            ")*0.01);\n" +
            "if(cycle==0){ttx=1;cycle=1};\n" +
            "baseTime=ttx%(1/cycle);\n" +
            "min=0;\n" +
            "max=360*r;\n" +
            "UP=linear(baseTime, 0, (1/cycle), min, max);\n" +
            "Down= linear(baseTime, (1/cycle), cycle, max, min);\n" +
            "(baseTime < (1/cycle))? UP+value+rota+rotaz : Down+value+rota+rotaz;}else{\n" +
            "value+rota+rotaz;\n" +
            "}\n";
        } catch (e) {}
        try {
          target.Orientation.expression =
            "a=[0,0,0];\no=[0,0,0];\ntry{tr=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx162name +
            a +
            ");}catch(e){tr=0;}\n" +
            "if(tr!=0){try{if(this.parent){o=lookAt(position+this.parent.position,tr.position)}else{o=lookAt(position,tr.position)};}catch(e){\n" +
            "o=lookAt(position,tr.position)}};\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx1611name +
            a +
            ")==1){a[0]=o[0];\n" +
            "}\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx1612name +
            a +
            ")==1){a[1]=o[1];\n" +
            "}\n" +
            "if(thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx1613name +
            a +
            ")==1){a[2]=o[2];\n" +
            "}\n" +
            "a+value";
        } catch (e) {}
        if (
          target instanceof AVLayer ||
          target instanceof ShapeLayer ||
          target instanceof TextLayer
        ) {
          target.anchorPoint.expression =
            "a=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx169name +
            a +
            ");\n" +
            "b=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx170name +
            a +
            ");\n" +
            "try{[a[0]+value[0],a[1]+value[1],b+value[2]]}catch(e){[a[0]+value[0],a[1]+value[1]]}";
          target.scale.expression =
            "a=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx166name +
            a +
            ")*0.01;\n" +
            "b=thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx167name +
            a +
            ")*0.01;\n" +
            "try{[a[0]*value[0],a[1]*value[1],b*value[2]]}catch(e){[a[0]*value[0],a[1]*value[1]]}";
          target.opacity.expression =
            "thisComp.layer(" +
            a +
            ControlObj_acm.name +
            a +
            ").effect(" +
            a +
            psname +
            a +
            ")(" +
            a +
            fx168name +
            a +
            ");\n";
        }
        target.position.expression =
          "var no=" +
          noda +
          ";\n" +
          "huriko=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx1name +
          a +
          ");\n" +
          "bounceX=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx23name +
          a +
          ");\n" +
          "bounceY=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx24name +
          a +
          ");\n" +
          "bounceZ=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx25name +
          a +
          ");\n" +
          "rangexy=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx7name +
          a +
          ");\n" +
          "rangez=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx9name +
          a +
          ");\n" +
          "angle=degreesToRadians(180+thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx2name +
          a +
          ")*-1);\n" +
          "offset=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx11name +
          a +
          ")*0.01;\n" +
          "lag=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx10name +
          a +
          ")*0.01;\n" +
          "lagren=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx110name +
          a +
          ")*0.1;\n" +
          "lposxy=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx101name +
          a +
          ")*0.1;\n" +
          "lposz=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx103name +
          a +
          ")*0.1;\n" +
          "decay=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx12name +
          a +
          ")*0.01;\n" +
          "displacementXYZ=thisComp.layer(" +
          a +
          targetName +
          a +
          ").effect(" +
          a +
          speedXYZname +
          a +
          ")" +
          "(" +
          a +
          "ADBE Slider Control-0001" +
          a +
          ");\n" +
          "splagXY=[1,1]+no*thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx107name +
          a +
          ")*0.0001;\n" +
          "splagZ=1+no*thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx108name +
          a +
          ")*0.0001;\n" +
          "gtime=0;\n" +
          "try{nKey =thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx12name +
          a +
          ").nearestKey(0);\n" +
          "if(time >= nKey.time ) {gtime=time-nKey.time}else{gtime=time-nKey.time;if(gtime<0){decay=0}}}catch(e){gtime=time;nKey=" +
          a +
          "NaN" +
          a +
          "};\n" +
          "if(nKey==" +
          a +
          "NaN" +
          a +
          "){ttx=time-thisLayer.inPoint}else{ttx=gtime};\n" +
          "posxy=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx14name +
          a +
          ");\n" +
          "posz=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx15name +
          a +
          ");\n" +
          atoms +
          "stime=1;\n" +
          "range=100;\n" +
          "offset+=lag*no;\n" +
          "lagx=lposxy[0]*no;\n" +
          "lagy=lposxy[1]*no;\n" +
          "lagz=lposz*no;\n" +
          "offsetXY=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx111name +
          a +
          ")*0.001;\n" +
          "offsetZ=thisComp.layer(" +
          a +
          ControlObj_acm.name +
          a +
          ").effect(" +
          a +
          psname +
          a +
          ")(" +
          a +
          fx113name +
          a +
          ")*0.001;\n" +
          "offsetXY[0]=offset+(offsetXY[0]*no);\n" +
          "offsetXY[1]=offset+(offsetXY[1]*no);\n" +
          "offsetZ=offset+(offsetZ*no);\n" +
          "decayspeed=(Math.abs(decay))*0.2;\n" +
          "displacementXYZ=displacementXYZ*Math.exp(ttx*decayspeed);\n" +
          "rangexy+=[lagren*no,lagren*no];\n" +
          "if(huriko==true){\n" +
          "\t\tx=(Math.sin(splagXY[0]*displacementXYZ *Math.PI * stime+offsetXY[0]))*Math.exp(ttx*decay);\n" +
          "\t\ty=(Math.sin(splagXY[1]*displacementXYZ *Math.PI* stime+offsetXY[1]))*Math.exp(ttx*decay);\n" +
          "\t\tz=(Math.sin(splagZ*displacementXYZ * Math.PI * stime+offsetZ))*Math.exp(ttx*decay);\n" +
          "\ttry{[rangexy[0]*(Math.sin(x*(range*0.01)+angle))+value[0]+posxy[0]+lagx,rangexy[1]*(Math.cos(y*(range*0.01)+angle))+value[1]+posxy[1]+lagy,rangez*Math.cos(z*(range*0.01)+angle)+value[2]+posz+lagz]}catch( e ){[rangexy[0]*(Math.sin(x*(range*0.01)+angle))+value[0]+posxy[0]+lagx,rangexy[1]*(Math.cos(y*(range*0.01)+angle))+value[1]+posxy[1]+lagy]}\n" +
          "}else{\n" +
          "\t\tx=rangexy[0]*(Math.sin(splagXY[0]*displacementXYZ * Math.PI  * stime+offsetXY[0]))*Math.exp(ttx*decay);\n" +
          "\t    if(bounceX!=false){x=Math.abs(x)}\n" +
          "\t\ty=rangexy[1]*(Math.cos(splagXY[1]*displacementXYZ * Math.PI  * stime+offsetXY[1]))*Math.exp(ttx*decay);\n" +
          "   \tif(bounceY!=false){y=Math.abs(y)*-1}\n" +
          Dna +
          "\t\tif(bounceZ!=false){z=Math.abs(z)}\n" +
          "\ttry{[x+value[0]+posxy[0]+lagx,y+value[1]+posxy[1]+lagy,z+value[2]+posz+lagz]}catch(e){[x+value[0]+posxy[0]+lagx,y+value[1]+posxy[1]+lagy]}\n" +
          "}\n";
      }
      flag = true;
    }
    function pscheck(cap) {
      try {
        pfx = cap.effect.addProperty("AutoCircularMotion");
        pfx.remove();
        pins = true;
      } catch (e) {
        pins = false;
      }
    }
    function CMDelete() {
      var angle_acm = true;
      var bobon = 0;
      var flag = false;
      var noda = 0;
      var buttonbone_acmType = false;
      var pinname = 1;
      var parent_obj = [];
      var ControlFlag_acm = true;
      var delter = [];
      if (app.project.activeItem instanceof CompItem == false) {
        if (CMlang) {
          var nocompgengo =
            "\u30a8\u30e9\u30fc:\u30b3\u30f3\u30dd\u3092\u958b\u3044\u3066\u304f\u3060\u3055\u3044";
        } else {
          var nocompgengo = "Error: The composition cannot be opened.";
        }
        Clog.text = nocompgengo;
        return;
      }
      var calques = app.project.activeItem.selectedLayers;
      if (CMlang) {
        var CircularControleragengoda =
          "\u30a8\u30e9\u30fc:[ACM\u5236\u5fa1]\u30ec\u30a4\u30e4\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044";
      } else {
        var CircularControleragengoda =
          "Error: please select a [CircularControl] layer";
      }
      if (CMlang) {
        var CircularControlnameda = "ACM\u5236\u5fa1";
      } else {
        var CircularControlnameda = "CircularControl";
      }
      if (calques.length == 0) {
        Clog.text = CircularControleragengoda;
        return;
      }
      if (calques[0].name.indexOf(CircularControlnameda) == -1) {
        Clog.text = CircularControleragengoda;
        return;
      }
      if (calques[0].comment.indexOf(CircularControlnameda) == -1) {
        Clog.text = CircularControleragengoda;
        return;
      }
      try {
        var delter = calques[0].comment.split(",");
        calque = app.project.activeItem.layer(delter[0]);
      } catch (e) {
        Clog.text = CircularControleragengoda;
        return;
      }
      if (CMlang) {
        if (!calques[0].comment) {
          Clog.text =
            "\u30a8\u30e9\u30fc:[ACM\u5236\u5fa1]\u30ec\u30a4\u30e4\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044";
          return;
        }
        if (delter.length < 3) {
          Clog.text =
            "\u30a8\u30e9\u30fc:[ACM\u5236\u5fa1]\u30ec\u30a4\u30e4\u30fc\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044";
          return;
        }
      } else {
        if (!calques[0].comment) {
          Clog.text = "Error: please select a [CircularControl] layer";
          return;
        }
        if (delter.length < 3) {
          Clog.text = "Error: please select a [CircularControl] layer";
          return;
        }
      }
      if (delter[0] == "AutoCircularMotionMODE") {
        delter.splice(0, 1);
        var deldel = delter.length;
        var Ename = "tc Particular";
        var Pname1 = "tc Particular-0003";
        var Pname2 = "tc Particular-0004";
        for (var d = 1; d < delter.length - 1; d += 1) {
          app.project.activeItem.layer(delter[d]).enabled = false;
          app.project.activeItem.layer(delter[d]).locked = false;
          try {
            EffectsDelete(
              app.project.activeItem.layer(delter[d]),
              Ename,
              Pname1,
              Pname2,
            );
            app.project.activeItem.layer(delter[d]).threeDLayer = true;
          } catch (e) {}
          try {
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group")
              .property("ADBE Position").expressionEnabled = false;
          } catch (e) {}
          try {
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group")
              .property("ADBE Rotate Z").expressionEnabled = false;
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group")
              .property("ADBE Rotate X").expressionEnabled = false;
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group")
              .property("ADBE Rotate Y").expressionEnabled = false;
          } catch (e) {}
          try {
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group").scale.expressionEnabled = false;
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group").anchorPoint.expressionEnabled =
              false;
            app.project.activeItem
              .layer(delter[d])
              .property("ADBE Transform Group").opacity.expressionEnabled =
              false;
          } catch (e) {}
          app.project.activeItem.layer(delter[d]).threeDLayer = false;
        }
        calques[0].remove();
        for (var i = 1; i < delter.length - 1; i += 1) {
          app.project.activeItem.layer(delter[i]).locked = false;
          app.project.activeItem.layer(delter[i]).selected = false;
          try {
            app.project.activeItem.layer(delter[i]).threeDLayer = true;
          } catch (e) {}
          try {
            app.project.activeItem
              .layer(delter[i])
              .property("ADBE Transform Group")
              .property("ADBE Position").expression = "";
            app.project.activeItem
              .layer(delter[i])
              .property("ADBE Transform Group")
              .property("ADBE Rotate Z").expression = "";
            app.project.activeItem
              .layer(delter[i])
              .property("ADBE Transform Group")
              .property("ADBE Rotate X").expression = "";
            app.project.activeItem
              .layer(delter[i])
              .property("ADBE Transform Group")
              .property("ADBE Rotate Y").expression = "";
          } catch (e) {}
          app.project.activeItem.layer(delter[i]).comment = "";
          try {
            app.project.activeItem
              .layer(delter[i])
              .property("ADBE Transform Group").Orientation.expression = "";
          } catch (e) {}
          try {
            if (
              app.project.activeItem.layer(delter[i]) instanceof AVLayer ||
              app.project.activeItem.layer(delter[i]) instanceof ShapeLayer ||
              app.project.activeItem.layer(delter[i]) instanceof TextLayer
            ) {
              app.project.activeItem
                .layer(delter[i])
                .property("ADBE Transform Group").scale.expression = "";
              app.project.activeItem
                .layer(delter[i])
                .property("ADBE Transform Group").anchorPoint.expression = "";
              app.project.activeItem
                .layer(delter[i])
                .property("ADBE Transform Group").opacity.expression = "";
            }
          } catch (e) {}
        }
        app.project.activeItem.layer(delter[1]).selected = true;
        for (var i = 1; i < delter.length - 1; i += 1) {
          app.project.activeItem.layer(delter[i]).threeDLayer = false;
          app.project.activeItem.layer(delter[i]).enabled = true;
          if (
            app.project.activeItem
              .layer(delter[i])
              .name.indexOf("          ") != -1
          ) {
            var spasedel = app.project.activeItem
              .layer(delter[i])
              .name.indexOf("          ");
            app.project.activeItem.layer(delter[i]).name =
              app.project.activeItem.layer(delter[i]).name.slice(spasedel + 10);
          }
        }
      }
      if (CMlang) {
        Clog.text = "\u524a\u9664\u5b8c\u4e86";
      } else {
        Clog.text = "Deletion complete";
      }
    }
    function CMSearch(kabCM) {
      ata_acm = 0;
      comp = app.project.activeItem;
      pnum = app.project.numItems;
      pnum += 1;
      for (var i = 1; i < pnum; i += 1) {
        var target = app.project.item(i);
        if (target.name == kabCM) {
          acobj = target;
        }
      }
    }
    function CM_DD(kabCM) {
      ppinflag = true;
      ata_acm = 0;
      comp = app.project.activeItem;
      pnum = app.project.numItems;
      pnum += 1;
      for (var i = 1; i < pnum; i += 1) {
        var target = app.project.item(i);
        if (target.name == kabCM) {
          acobj = target;
          if (!ccflag9_Cm && ppinflag) {
            bone_acm = comp.layers.add(acobj);
          }
          ppinflag = false;
          ata_acm += 1;
        }
      }
      if (ata_acm == 0) {
        pin = false;
      } else {
        pin = true;
      }
    }
    function CMPseudoEffectInstaller(pAutoCM) {
      function skipInstall() {
        backValue = false;
        if (parseFloat(app.version).toFixed(1) >= 12.1) {
          backValue = true;
        }
        return backValue;
      }
      function isNetworkAccessAllowed() {
        securitySetting = app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        );
        if (!securitySetting) {
          alert(
            'Please set preference "Allow Scripts to Write Files and Access Network". \n \nWindows:   After Effects  > Edit > Preferences > General \n \nMac:   After Effects > Preferences > General   ',
            "Installation Warning",
          );
        }
        return securitySetting;
      }
      function checkOS() {
        if ($.os.indexOf("Windows") > -1) {
          appFolderPath = new Folder(Folder.appPackage).fsName.toString();
          cmd = 'cmd /c attrib -r /S /D "' + appFolderPath + '"';
          system.callSystem(cmd);
          cmd =
            'cmd /c attrib -r /S /D "' +
            appFolderPath +
            "\\" +
            'PresetEffects.xml"';
          appFolderPath = appFolderPath + "\\";
          system.callSystem(cmd);
        } else {
          appFolderPath =
            new Folder(Folder.appPackage.absoluteURI).fsName.toString() +
            "/Contents/Resources/";
          cmd = 'chmod u+rw  "' + appFolderPath + 'PresetEffects.xml"';
          system.callSystem(cmd);
        }
        return appFolderPath;
      }
      function on_CMdeinst_click() {
        if ($.os.indexOf("Windows") > -1) {
          appFolderPath =
            new Folder(Folder.appPackage).fsName.toString() + "\\";
        } else {
          appFolderPath =
            new Folder(Folder.appPackage.absoluteURI).fsName.toString() +
            "/Contents/Resources/";
        }
        AEPath = appFolderPath;
        tempFile = new File(AEPath + "temp.xml");
        tempFileIsOK = tempFile.open("w", "TEXT", "????");
        XMLFile = new File(AEPath + "PresetEffects.xml");
        XMLFileIsOK = XMLFile.open("r", "TEXT", "????");
        writeOk = 1;
        if (!tempFileIsOK) {
          if (CMlang) {
            alert(
              "\u3042\u306a\u305f\u306f\u3001\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3092\u884c\u3046\u305f\u3081\u306e\u5341\u5206\u306a\u6a29\u9650\u3092\u6301\u3063\u3066\u3044\u307e\u305b\u3093\u3002 \n\u7ba1\u7406\u8005\u30a2\u30ab\u30a6\u30f3\u30c8\u3067AE\u3092\u518d\u8d77\u52d5\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
              "\u30a8\u30e9\u30fc",
            );
          } else {
            alert(
              "You do not have sufficient privileges to complete this operation \nTry to restart AE under \'Administrator\' account",
              "Error",
            );
          }
          return "";
        }
        if (!XMLFileIsOK) {
          if (CMlang) {
            alert(
              "PresetEffects.xml\u3092\u8aad\u307f\u53d6\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
              "\u30a8\u30e9\u30fc",
            );
          } else {
            alert("Can\'t read PresetEffects.xml", "Error");
          }
          return "";
        }
        while (!XMLFile.eof) {
          curLine = XMLFile.readln();
          if (curLine.indexOf(decodeURIComponent(startInst)) != -1) {
            writeOk = 0;
          }
          if (curLine.indexOf(decodeURIComponent(endInst)) != -1) {
            writeOk = 1;
            continue;
          }
          if (writeOk == 1) {
            tempFile.writeln(curLine);
          }
        }
        if (tempFile.length != XMLFile.length && tempFile.length > 0) {
          XMLFile.close();
          tempFile.close();
          XMLFile.remove();
          tempFile.rename("PresetEffects.xml");
          if (CMlang) {
            alert(
              "\u64ec\u4f3c\u30a8\u30d5\u30a7\u30af\u30c8\u306e\u30a2\u30f3\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\u3002\nAfter Effects\u3092\u518d\u8d77\u52d5\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
            );
          } else {
            alert(
              "Removing AutoCircularMotion Pseudo Effect  complete\nPlease restart After Effects",
            );
          }
        } else {
          XMLFile.close();
          tempFile.close();
          tempFile.remove();
          if (CMlang) {
            alert(
              "\u30a2\u30f3\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3059\u308b\u3082\u306e\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
            );
          } else {
            alert("Nothing to remove");
          }
        }
      }
      function on_CMinst_click() {
        alreadyInst = 0;
        if (!isNetworkAccessAllowed()) {
          return "";
        }
        AEPath = checkOS();
        tempFile = new File(AEPath + "temp.xml");
        XMLFile = new File(AEPath + "PresetEffects.xml");
        XMLFileIsOK = XMLFile.open("r", "TEXT", "????");
        tempFileIsOK = tempFile.open("w", "TEXT", "????");
        if (!tempFileIsOK) {
          if (CMlang) {
            alert(
              "\u3042\u306a\u305f\u306f\u3001\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3092\u884c\u3046\u305f\u3081\u306e\u5341\u5206\u306a\u6a29\u9650\u3092\u6301\u3063\u3066\u3044\u307e\u305b\u3093\u3002 \n\u7ba1\u7406\u8005\u30a2\u30ab\u30a6\u30f3\u30c8\u3067AE\u3092\u518d\u8d77\u52d5\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
              "\u30a8\u30e9\u30fc",
            );
          } else {
            alert(
              "You do not have sufficient privileges to complete this installation \nTry to restart AE under \'Administrator\' account",
              "Installation Error",
            );
          }
          return "";
        }
        if (!XMLFileIsOK) {
          if (CMlang) {
            alert(
              "PresetEffects.xml\u3092\u8aad\u307f\u53d6\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u305b\u3093\u3067\u3057\u305f\u3002",
              "\u30a8\u30e9\u30fc",
            );
          } else {
            alert("Can\'t read PresetEffects.xml", "Installation Error");
          }
          return "";
        }
        while (!XMLFile.eof) {
          curLine = XMLFile.readln();
          if (curLine == decodeURIComponent(startInst)) {
            alreadyInst = 1;
          }
          if (curLine.indexOf("</Effects>") == -1) {
            tempFile.writeln(curLine);
          } else {
            break;
          }
        }
        tempFile.writeln(
          decodeURIComponent(
            startInst + "%0A" + all + "%0A" + endInst + "%0A%3C%2FEffects%3E",
          ),
        );
        if (alreadyInst == 1) {
          if (pAutoCM == 1) {
            if (CMlang) {
              alert(
                "\u65e2\u306b\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u6e08\u307f\u3067\u3059\u3002",
              );
            } else {
              alert("Already Installed.");
            }
            tempFile.close();
            tempFile.remove();
          } else {
            tempFile.close();
            XMLFile.close();
            tempFile.remove();
            on_CMdeinst_click();
          }
        } else {
          if (pAutoCM == 1) {
            XMLFile.close();
            tempFile.close();
            XMLFile.remove();
            tempFile.rename("PresetEffects.xml");
            if (CMlang) {
              alert(
                "\u64ec\u4f3c\u30a8\u30d5\u30a7\u30af\u30c8\u306e\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f\nAfter Effects\u3092\u518d\u8d77\u52d5\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
                "\u30b0\u30c3\u30c9\u30cb\u30e5\u30fc\u30b9\uff01",
              );
            } else {
              alert(
                "Installation complete\nPlease restart After Effects",
                "Good news",
              );
            }
          } else {
            if (CMlang) {
              alert(
                "\u64ec\u4f3c\u30a8\u30d5\u30a7\u30af\u30c8\u304c\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3055\u308c\u3066\u3044\u307e\u305b\u3093\u3002",
              );
            } else {
              alert("Pseudo effect has not been installed.");
            }
          }
        }
      }
      var all =
        "%3CEffect%20matchname%3D%22Pseudo%2F5e36uID%2FAutoCM%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoCM%3DAutoCM%22%3E%0A%20%20%20%20%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPendulum%3DPendulum%22%3E%0A%20%20%20%20%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FPendulumON%3DPendulum%20ON%22%20default%3D%22false%22%20%2F%3E%0A%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FAngle(Pendulumonly)%3DAngle(Pendulum%20only)%22%20default%3D%22180.0%22%20%2F%3E%0A%3C%2FGroup%3E%0A%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FSpeed_XY%3DSpeed%20XY%22%20default_x%3D%225%22%20default_y%3D%225%22%20%2F%3E%0A%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FSpeed__Z%3DSpeed%20%20Z%22%20default%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FScaleXY%3DScale%20XY%22%20default_x%3D%2212.5%22%20default_y%3D%2212.5%22%20%2F%3E%0A%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale_Z%3DScale%20%20Z%22%20default%3D%22250%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffset%3DOffset%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FDecay(Scale)%3DDecay(Scale)%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%220%22%20precision%3D%221%22%2F%3E%0A%20%20%20%20%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FLag_factor%3DLag%20factor%22%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FShift%3DShift%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%09%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffset_XY%3DOffset_XY%22%20default_x%3D%220%22%20default_y%3D%220%22%20%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffset__Z%3DOffset__Z%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale(xy)%3DScale(xy)%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%09%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FPositionXY%3DPosition%20XY%22%20default_x%3D%220%22%20default_y%3D%220%22%20%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FPositionZ%3DPosition%20%20Z%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%09%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationXY%3DRotation%20XY%22%20default_x%3D%220%22%20default_y%3D%220%22%20%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotation_Z%3DRotation%20%20Z%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%3C%2FGroup%3E%0A%20%20%20%20%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FTransform%3DTransform%22%3E%0A%20%20%20%20%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPosition%3DPosition%22%3E%0A%09%09%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FPosition_XY%3DPosition_XY%22%20default_x%3D%220%22%20default_y%3D%220%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FPosition__Z%3DPosition__Z%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%09%09%3C%2FGroup%3E%09%0A%20%20%20%20%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotation%3DRotation%22%3E%0A%20%20%20%20%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoOrientation%3DAutoOrientation%22%3E%0A%20%20%20%20%09%3CLayer%20name%3D%22%24%24%24%2FAE%2FPreset%2FTarget%3DTarget%22%20default_self%3D%22false%22%2F%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoOrient_X%3DAutoOrient_X%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoOrient_Y%3DAutoOrient_Y%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoOrient_Z%3DAutoOrient_Z%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoRotation_X%3DAutoRotation_X%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoRotation_Y%3DAutoRotation_Y%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FAutoRotation_Z%3DAutoRotation_Z%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FReverseRotation%3DReverseRotation%22%20default%3D%22false%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationX%3DRotationX%22%20default%3D%220.0%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationY%3DRotationY%22%20default%3D%220.0%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationZ%3DRotationZ%22%20default%3D%220.0%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%20%20%20%20%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%3E%0A%09%09%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale_XY(%25)%3DScale_XY(%25)%22%20default_x%3D%225%22%20default_y%3D%225%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale__Z%3DScale__Z%22%20default%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%20DISPLAY_PERCENT%3D%22true%22%2F%3E%0A%09%09%3C%2FGroup%3E%0A%20%20%20%20%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FOpacity%3DOpacity%22%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOpacity(0~100)%3DOpacity(0~100)%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%20%20%20%20%09%3C%2FGroup%3E%0A%20%20%20%20%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorpoint%3DAnchorpoint%22%3E%0A%09%09%3CPoint%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorpoint_XY%3DAnchorpoint_XY%22%20default_x%3D%220%22%20default_y%3D%220%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorpoint__Z%3DAnchorpoint__Z%22%20default%3D%220%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20precision%3D%221%22%2F%3E%0A%20%20%20%20%09%3C%2FGroup%3E%0A%0A%0A%3C%2FGroup%3E%0A%20%20%20%20%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBounce(CircularMotionOnry)%3DBounce(CircularMotionOnry)%22%3E%0A%20%20%20%20%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FBounce_X%3DBounce_X%22%20default%3D%22false%22%20%2F%3E%0A%20%20%20%20%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FBounce_Y%3DBounce_Y%22%20default%3D%22false%22%20%2F%3E%0A%20%20%20%20%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FBounce_Z%3DBounce_Z%22%20default%3D%22false%22%20%2F%3E%0A%3C%2FGroup%3E%0A%3C%2FEffect%3E";
      var instName = "AutoCM";
      clearInstName = decodeURIComponent(instName);
      startInst =
        encodeURIComponent("<!-- ") +
        instName +
        encodeURIComponent("_start -->");
      endInst =
        encodeURIComponent("<!-- ") + instName + encodeURIComponent("_end -->");
      on_CMinst_click();
    }
    function pscheck(cap) {
      try {
        pfx = cap.effect.addProperty("ACM");
        pfx.remove();
        pins = true;
      } catch (e) {
        pins = false;
      }
    }
    function ShapeSetValue(cont, pname, wi, hi) {
      pnum1 = cont.numProperties + 1;
      for (var i = 1; i < pnum1; i += 1) {
        if (cont.property(i).matchName == "ADBE Root Vectors Group") {
          pnum1 = cont.property(i);
          continue;
        }
      }
      pnum2 = pnum1.numProperties + 1;
      for (var j = 1; j < pnum2; j += 1) {
        slay = pnum1.property(j).property("ADBE Vector Transform Group");
        shapos = slay.property(pname).setValue([wi, hi]);
      }
    }
    function keyframecopy(smoto, efs) {
      try {
        var k = 1;
        var nkeys = efs.numKeys;
        if (smoto.numKeys > 0) {
          for (var j = 1; j < smoto.numKeys + 1; j += 1) {
            ACMkeys = [];
            efskeynum = efs.numKeys;
            ACMkeys.push(smoto.keyTime(j));
            ACMkeys.push(smoto.keyValue(j));
            var propertyType = smoto.propertyValueType;
            ACMkeys.push(propertyType);
            ACMkeys.push(
              smoto.isInterpolationTypeValid(KeyframeInterpolationType.LINEAR),
            );
            ACMkeys.push(
              smoto.isInterpolationTypeValid(KeyframeInterpolationType.BEZIER),
            );
            ACMkeys.push(
              smoto.isInterpolationTypeValid(KeyframeInterpolationType.HOLD),
            );
            ACMkeys.push(smoto.keyInInterpolationType(j));
            ACMkeys.push(smoto.keyOutInterpolationType(j));
            ACMkeys.push(smoto.keyInTemporalEase(j));
            ACMkeys.push(smoto.keyOutTemporalEase(j));
            ACMkeys.push(smoto.keyTemporalContinuous(j));
            ACMkeys.push(smoto.keyTemporalAutoBezier(j));
            if (
              propertyType == PropertyValueType.TwoD_SPATIAL ||
              propertyType == PropertyValueType.ThreeD_SPATIAL
            ) {
              ACMkeys.push(smoto.keyInSpatialTangent(j));
              ACMkeys.push(smoto.keyOutSpatialTangent(j));
              ACMkeys.push(smoto.keySpatialContinuous(j));
              ACMkeys.push(smoto.keySpatialAutoBezier(j));
              ACMkeys.push(smoto.keyRoving(j));
            }
            if (k != efs.numKeys && efs.numKeys > 0) {
              for (k; k < nkeys + 1; k++) {
                efs.removeKey(k);
                k++;
                break;
              }
            }
            var keyadd = efs.addKey(smoto.keyTime(j));
            efs.setValueAtKey(keyadd, smoto.keyValue(j));
            if (
              propertyType == PropertyValueType.TwoD_SPATIAL ||
              propertyType == PropertyValueType.ThreeD_SPATIAL
            ) {
              try {
                efs.setSpatialTangentsAtKey(keyadd, ACMkeys[12], ACMkeys[13]);
              } catch (e) {}
              try {
                efs.setSpatialContinuousAtKey(keyadd, ACMkeys[14]);
              } catch (e) {}
              try {
                efs.setSpatialAutoBezierAtKey(keyadd, ACMkeys[15]);
              } catch (e) {}
              try {
                efs.setRovingAtKey(keyadd, ACMkeys[16]);
              } catch (e) {}
            }
            if (
              propertyType == PropertyValueType.TwoD_SPATIAL ||
              propertyType == PropertyValueType.ThreeD_SPATIAL
            ) {
              try {
                efs.setTemporalEaseAtKey(keyadd, ACMkeys[8], ACMkeys[9]);
              } catch (e) {}
            }
            try {
              efs.setTemporalEaseAtKey(keyadd, ACMkeys[8], ACMkeys[9]);
            } catch (e) {}
            try {
              efs.setTemporalContinuousAtKey(keyadd, ACMkeys[10]);
            } catch (e) {}
            try {
              efs.setInterpolationTypeAtKey(keyadd, ACMkeys[6], ACMkeys[7]);
            } catch (e) {}
            try {
              efs.setSpatialTangentsAtKey(keyadd, ACMkeys[12], ACMkeys[13]);
            } catch (e) {}
          }
        } else {
          efs.setValue(smoto.value);
        }
      } catch (e) {
        alert(e);
      }
    }
    function Shapede(cont) {
      var pnum1 = cont.numProperties + 1;
      var safenum = 0;
      var flag = false;
      for (var i = 1; i < pnum1; i += 1) {
        if (cont.property(i).matchName == "ADBE Root Vectors Group") {
          if (cont.property(i).numProperties > 1) {
            if (parent_obj.length == 1 && parent_obj[0] instanceof ShapeLayer) {
              if (CMlang) {
                if (
                  confirm(
                    "\u30b7\u30a7\u30a4\u30d7\u30b0\u30eb\u30fc\u30d7\u3092\u5206\u89e3\u3057\u3066\u9069\u7528\u3057\u307e\u3059\u304b\uff1f ",
                    false,
                    "Please confirm",
                  )
                ) {
                  flag = true;
                } else {
                  return;
                }
              } else {
                if (
                  confirm(
                    "Apply by decomposing the shape group? ",
                    false,
                    "Please confirm",
                  )
                ) {
                  flag = true;
                } else {
                  return;
                }
              }
              cont.selected = false;
              cont.enabled = false;
              parent_obj = [];
              var pronum = 2;
              if (kjahsndf45545as6df46afsd54dasd_settings.s() == false) {
                isTrial = true;
              }
              if (isTrial) {
                if (cont.property(i).numProperties > 4) {
                  if (CMlang) {
                    var ACMtriallayergengoB =
                      "\u4f53\u9a13\u7248\u3067\u306f\u30ec\u30a4\u30e4\u30fc\u3078\u306e\u9069\u7528\u53ef\u80fd\u6570\u306f4\u3064\u307e\u3067\u3067\u3059\u3002";
                  } else {
                    var ACMtriallayergengoB =
                      "The trial is limited to 4 layers. The full version does not have any limits.";
                  }
                  alert(ACMtriallayergengoB);
                  pronum = 5;
                }
                pronum = cont.property(i).numProperties + 1;
              } else {
                pronum = cont.property(i).numProperties + 1;
              }
              for (var j = 1; j < pronum; j += 1) {
                var dcont = cont.duplicate();
                parent_obj.push(dcont);
                pnum1 = dcont.property(i);
                var pnum2 = pnum1.numProperties + 1;
                safenum += 1;
                var flag = true;
                for (var k = 1; k < pnum2; k += 1) {
                  if (flag) {
                    slay = pnum1.property(safenum);
                    dcont.name = slay.name;
                    slay.moveTo(1);
                    flag = false;
                  }
                  try {
                    slay = pnum1.property(2);
                    slay.remove();
                  } catch (e) {}
                }
              }
            }
          }
        }
      }
    }
    function getPathToFFXFolder(folname) {
      var folderObj = new File($.fileName).path + "/" + folname;
      return folderObj;
    }
    function ApplyFFX(ffxPath, ffxname, ApplyLayer, type) {
      var ffxfile = File(ffxPath + "/" + ffxname);
      try {
        if (!ffxfile.exists) {
          if (CMlang) {
            throw (
              "\u30a8\u30e9\u30fc: \'" +
              ffxname +
              "\' \u30d5\u30a1\u30a4\u30eb\u304c\u3042\u308a\u307e\u305b\u3093\u3002\n\n\u6b21\u306e\u30d1\u30b9\u3092\u53c2\u7167\u3057\u307e\u3057\u305f\u3002: \'" +
              ffxPath +
              "\'. \n\nACM\u30ac\u30a4\u30c9\u3092\u53c2\u7167\u3057\u518d\u5ea6\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3092\u884c\u3063\u3066\u304f\u3060\u3055\u3044\u3002"
            );
          } else {
            throw (
              "Error: \'" +
              ffxname +
              "\' File not found.\n\nI looked in here: \'" +
              ffxPath +
              "\'. \n\nPlease install again by referring to the ACM guide."
            );
          }
        }
      } catch (e) {
        alert(e);
        return false;
      }
      if (
        app.project.activeItem == null ||
        (app.project.activeItem != null &&
          !(app.project.activeItem instanceof CompItem))
      ) {
      } else {
        if (type == "apply") {
          ApplyLayer.applyPreset(ffxfile);
        }
      }
    }
    function EffectsExpda(cont, ename, pname1, pname2) {
      var pnum1 = cont.numProperties + 1;
      var slayout = [];
      for (var i = 1; i < pnum1; i += 1) {
        if (cont.property(i).matchName == "ADBE Effect Parade") {
          pnum1 = cont.property(i);
          continue;
        }
      }
      pnum2 = pnum1.numProperties + 1;
      for (var j = 1; j < pnum2; j += 1) {
        if (pnum1.property(j).matchName == ename) {
          slay = pnum1.property(j);
          Pflag = true;
          continue;
        }
      }
      if (Pflag == true) {
        slayout.push(slay.property(pname1));
        slayout.push(slay.property(pname2));
      } else {
        Pflag = false;
        return false;
      }
      if (CMlang) {
        if (
          confirm(
            "Particular\u306bACM\u3092\u9069\u7528\u3057\u307e\u3059\u304b\uff1f ",
            false,
            "Please confirm",
          )
        ) {
          return slayout;
        } else {
          Pflag = false;
          return false;
        }
      } else {
        if (
          confirm(
            "Are you sure you want to apply the ACM to Particular? ",
            false,
            "Please confirm",
          )
        ) {
          return slayout;
        } else {
          Pflag = false;
          return false;
        }
      }
    }
    function EffectsDelete(cont, ename, pname1, pname2) {
      var pnum1 = cont.numProperties + 1;
      var slayout = [];
      var flag = false;
      for (var i = 1; i < pnum1; i += 1) {
        if (cont.property(i).matchName == "ADBE Effect Parade") {
          pnum1 = cont.property(i);
          continue;
        }
      }
      pnum2 = pnum1.numProperties + 1;
      for (var j = 1; j < pnum2; j += 1) {
        if (pnum1.property(j).matchName == ename) {
          slay = pnum1.property(j);
          flag = true;
          continue;
        }
      }
      if (flag == true) {
        if (
          slay.property(pname1).expression.indexOf("AutoCircularMotion") != -1
        ) {
          slay.property(pname1).expression = "";
        }
        if (
          slay.property(pname2).expression.indexOf("AutoCircularMotion") != -1
        ) {
          slay.property(pname2).expression = "";
        }
      } else {
        flag = false;
        return;
      }
    }
    var registration =
      kjahsndf45545as6df46afsd54dasd_settings.getRegistration();
    var isTrial = kjahsndf45545as6df46afsd54dasd_settings.t();
    var mainUI_ACM = CheckUI_ACM(thisObj);
    var app_version = parseInt(app.version);
    MakePrimitive_ACM(app_version);
  }
  var kjahsndf45545as6df46afsd54dasd_settings = {
    helpButtons: [],
    helpText:
      "AutoCircularMotion allows you to easily express circular motions.\nNot to mention linking multiple layers and arranging their movements, you can also set up other motions, such as swinging and bouncing.\nHaving control over Z axis allows you to express the shallowness or depth of movements as well. \n\nHow to set up \n1. Select one or multiple layers. Click [ Apply ].\n2. Adjust using \'\'ACM control\'\', which will be automatically created.\n\nApplying to a shape group\nSelect a single shape layer which includes a shape group.\nThen click [Apply] to use this shape group to different layers.\n\nApplying to [ Trapcode Particular ]\nClick [ Apply ] after selecting a single layer which [ Trapcode Particular ] has been applied to.\nThis allows you to apply ACM to [ Trapcode Particular ].\nYou cannot use light or null layers, which \u203bACM has been applied to, as an emitter.\nPlease follow the instruction above to use them.",
    offerTrial: true,
    privateNumber: 7537362543078323,
    productSKU: "ADACM-SUL",
    scriptAuthor: "adascripts",
    scriptName: "AutoCircularMotion",
    scriptURL: "https://aescripts.com/autocircularmotion/",
    scriptVersion: "1.03",
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
      -1 != $.os.indexOf("Mac") && systemCall('chmod 757 "' + n.fsName + '"');
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
      if ("" == i || "" == t) {
        return false;
      }
      switch (e.result) {
        case -20:
          e.e = i;
          break;
        case -21:
          e.e = t;
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
        var i = retProp("^d", e);
        if (void 0 === i) {
          return void (e.result = -103);
        }
        var t = trialLengthDays - i;
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
        i.match(/@remote/i) ||
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
        isTimeLimited && (t += "\nLicense ends: " + f),
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
      return BridgeTalk.appName == bD("YWZ0ZXJlZmZlY3Rz");
    }
    function isPS() {
      return BridgeTalk.appName == bD("cGhvdG9zaG9w");
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
            systemCall(bD("Y2htb2QgNzU3IA==") + e.absoluteURI)),
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
    var licensingVersion = "3.0.40";
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
    var doUpdateCheck = true;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var wx = __BLOB__BLOB_000120__;
    var mx = __BLOB__BLOB_000121__;
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
          detail: "Die Lizenzdauer beginnt am ",
          title: "Die Lizenzdauer hat noch nicht begonnen (-20)",
        },
        "-21": {
          detail: "Lizenzlaufzeit endete am ",
          title: "Die Lizenzdauer ist abgelaufen (-21)",
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
  var kjahsndf45545as6df46afsd54dasd_settings = new a(
    kjahsndf45545as6df46afsd54dasd_settings,
  );
  if (kjahsndf45545as6df46afsd54dasd_settings.c()) {
    AutoCircularMotion_Main(thisObj);
  }
}
ADA_AutoCircularMotion(this);
