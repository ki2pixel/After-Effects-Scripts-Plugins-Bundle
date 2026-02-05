/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function mo_joysticksNsliders(thisObj) {
  function jsLaunch(thisObj) {
    function joyIcon() {
      var a = __BLOB__BLOB_000262__;
      return a;
    }
    function slideIcon() {
      var a = __BLOB__BLOB_000263__;
      return a;
    }
    function unKeyFlatIcon() {
      var a = __BLOB__BLOB_000264__;
      return a;
    }
    function keyAllIcon() {
      var a = __BLOB__BLOB_000265__;
      return a;
    }
    function reloadIcon() {
      var a = __BLOB__BLOB_000266__;
      return a;
    }
    function newJoyIcon() {
      var a = __BLOB__BLOB_000267__;
      return a;
    }
    function bindIconJfn() {
      var a = __BLOB__BLOB_000268__;
      return a;
    }
    function unbindIconJfn() {
      var a = __BLOB__BLOB_000269__;
      return a;
    }
    function updatePathJfn() {
      var a = __BLOB__BLOB_000270__;
      return a;
    }
    function easeBiasJfn() {
      var a = __BLOB__BLOB_000271__;
      return a;
    }
    function newSlideIcnfn() {
      var a = __BLOB__BLOB_000272__;
      return a;
    }
    function bindIconSfn() {
      var a = __BLOB__BLOB_000273__;
      return a;
    }
    function unbindIconSfn() {
      var a = __BLOB__BLOB_000274__;
      return a;
    }
    function updatePathSfn() {
      var a = __BLOB__BLOB_000275__;
      return a;
    }
    function mirrorShapefn() {
      var a = __BLOB__BLOB_000276__;
      return a;
    }
    function pasteOrIcnfn() {
      var a = __BLOB__BLOB_000277__;
      return a;
    }
    function rigChartfn() {
      var a = __BLOB__BLOB_000278__;
      return a;
    }
    function getUserDataFolder() {
      var c = Folder.userData;
      var a = Folder(c.toString() + "/Aescripts/JoysticksnSliders/1.6.5");
      if (!a.exists) {
        var b = a.create();
        if (!b) {
          makeAlert(
            "Error creating " +
              b.fsName +
              "\nPlease check the permissions for this folder:\n" +
              c +
              "\n\nA temp folder will be used instead",
          );
          a = Folder.temp;
        }
      }
      return a.toString();
    }
    function createResourceFile(c, b, a) {
      var d = new File(a + "/" + c);
      if (!File(d).exists) {
        if (!isSecurityPrefSet()) {
          makeAlert(
            'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
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
      }
      return d;
    }
    function isSecurityPrefSet() {
      var a = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return a == 1;
    }
    function myScript(c) {
      function a(h) {
        function p() {
          if (aeVersion === 12 || parseFloat(app.version) === 13) {
            var q = ", reloadBrutton: IconButton {preferredSize:[25,22]}";
          } else {
            q = "";
          }
          return q;
        }
        function o() {
          var q = Window.find("palette", "Joystick and Sliders Info");
          if (q !== null) {
            if (q.visible) {
              return;
            } else {
              var r = q.findElement("regitty");
              r.text = registration;
              q.show();
            }
          } else {
            reallyBuildHalp();
          }
        }
        function d() {
          var r =
            e.grp.mainTabs.joyTab.switchPanel.dropDGroup.templGrp.templateDrpDn;
          if (r.selection) {
            s = r.selection.index;
          } else {
            s = 0;
          }
          switchComps = [];
          repopulateSwitchList(switchComps);
          r.removeAll();
          for (var q = 0; q < switchComps.length; q += 1) {
            r.add("item", switchComps[q].name);
          }
          if (switchComps.length === 0) {
            r.add("item", "none available");
          }
          if (isValid(s) && s < switchComps.length) {
            r.selection = s;
          } else {
            r.selection = 0;
          }
        }
        function n(s) {
          var r = s;
          if (r.selection) {
            t = r.selection.index;
          } else {
            t = 0;
          }
          parComps = [];
          repopulateParCompList(parComps);
          r.removeAll();
          for (var q = 0; q < parComps.length; q += 1) {
            r.add("item", parComps[q].name);
          }
          if (parComps.length === 0) {
            r.add("item", "none available");
          }
          if (isValid(t) && t < parComps.length) {
            r.selection = t;
          } else {
            r.selection = 0;
          }
        }
        function m() {
          var r =
            e.grp.mainTabs.joyTab.switchPanel.dropDGroup.swJoyGrp.joyDrpDn;
          var s = r.selection.index;
          joyLyrs = [];
          repopulateJoystickList(joyLyrs);
          r.removeAll();
          for (var q = 0; q < joyLyrs.length; q += 1) {
            r.add("item", joyLyrs[q].name);
          }
          if (joyLyrs.length === 0) {
            r.add("item", "none available");
          }
          if (isValid(s)) {
            r.selection = s;
          } else {
            r.selection = 0;
          }
        }
        function j() {
          var r = e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop;
          if (r.selection) {
            s = r.selection.index;
          } else {
            s = 0;
          }
          joyLyrs = [];
          repopulateJoystickList(joyLyrs);
          r.removeAll();
          for (var q = 0; q < joyLyrs.length; q += 1) {
            r.add("item", joyLyrs[q].name);
          }
          if (joyLyrs.length === 0) {
            r.add("item", "none available");
          }
          if (isValid(s) && s < joyLyrs.length) {
            r.selection = s;
          } else {
            r.selection = 0;
          }
        }
        function k() {
          var r = e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop;
          if (r.selection) {
            s = r.selection.index;
          } else {
            s = 0;
          }
          slideLyrs = [];
          repopulateSliderList(slideLyrs);
          r.removeAll();
          for (var q = 0; q < slideLyrs.length; q += 1) {
            r.add("item", slideLyrs[q].name);
          }
          if (slideLyrs.length === 0) {
            r.add("item", "none available");
          }
          if (isValid(s) && s < slideLyrs.length) {
            r.selection = s;
          } else {
            r.selection = 0;
          }
        }
        var e =
          h instanceof Panel
            ? h
            : new Window("palette", "My window name", undefined, {
                resizeable: true,
              });
        var i =
          "header: Panel{orientation:\'row\',text:\'Setup\',margins:[0,15,0,0],\t                            originButton: IconButton{preferredSize: [65,23]},\t                            keyAllButton: IconButton{preferredSize: [50,23]}\t                            unKeyFlatButton: IconButton{preferredSize: [50,23]}" +
          p() +
          ",\t                            mirrorButn: IconButton{preferredSize:[28,21]},\t                            helpBrutton: Button{bounds:[0,0,23,18],text:\'?\'}}";
        var f =
          "group{orientation:\'column\', alignChildren:\'center\',\t                        mainTabs: Panel{type:\'tabbedpanel\', orientation:\'column\', alignChildren:[\'right\', \'fill\'],\t                            joyTab: Panel{type:\'tab\', text: \'Joysticks\',orientation:\'column\',\t                                joyImg: Image{preferredSize: [228,43]},\t                                " +
          i +
          "\t                                stickPnl: Panel{text: \'Joystick tools\', orientation:\'column\', margins:[28,10,28,5]\t                                    groupJ: Group{orientation:\'row\',\t                                        rigButn: IconButton{preferredSize:[100,23]},\t                                        upPath: IconButton{preferredSize:[43,23]},\t                                        easeBias: IconButton{preferredSize:[43,23]}\t                                    },\t                                    groupOne: Group{orientation:\'row\', alignment:[\'fill\',\'top\'],\t                                        existDrop: DropDownList{preferredSize:[100,23], properties:{items:[\'joystick layer\']}},\t                                        bindExist: IconButton{preferredSize:[43,23]},\t                                        reRigButn: IconButton{preferredSize:[43,23]}\t                                    }\t                                },\t                                switchPanel: Panel{text: \'Switch Templates\', orientation:\'column\', alignment:[\'fill\',\'top\'],margins:[4,10,4,10],\t                                    groupSw: Group{orientation:\'row\',\t                                        createGrpBtn: Button{bounds:[0,0,50,23],text:\'Create\'},\t                                        switchRig: IconButton{preferredSize:[43,23]},\t                                        switchUnrig: IconButton{preferredSize:[43,23]}\t                                    },\t                                    dropDGroup: Group{orientation:\'row\',\t                                        templGrp: Group{orientation:\'column\',\t                                            templTxt: StaticText{text:\'switch template\', justify:\'left\'},\t                                            templateDrpDn: DropDownList{properties:{items:[\'switch template\']}}\t                                        },\t                                        to: StaticText{text:\'to\'},\t                                        swJoyGrp: Group{orientation: \'column\',\t                                            joystTxt: StaticText{text:\'joystick layer\', justify:\'right\'},\t                                            joyDrpDn: DropDownList{properties:{items:[\'joystick layer\']}}\t                                        }\t                                    }\t                                },\t\t\t\t\t\t\t\t\tmovePanel: Panel{text:\'Move Joystick to Parent Comp\', orientation:\'column\',movePanelGrp2: Group{orientation: \'row\',\t                                    \tmoveToDropDn: DropDownList{properties:{items:[\'parent comps\']}},\t                                    \tmoveBtn: Button{bounds:[0,0,55,23],text:\'to Parent\'},\t\t\t\t\t\t\t\t\t\t\tchildBtn: Button{bounds:[0,0,55,23],text:\'to Child\'}\t\t\t\t\t\t\t\t\t\t}\t                                }\t                            },\t                            slideTab: Panel{type:\'tab\', text: \'Sliders\',orientation:\'column\',\t                                slideImg: Image{preferredSize: [228,43], Image: slideThing},\t                                " +
          i +
          "\t                                sliderPanel: Panel{text: \'Slider Tools\', orientation:\'column\', margins:[28,10,28,5],\t                                    groupS: Group{orientation:\'row\',alignment:[\'fill\',\'left\'],\t                                        rigButn : IconButton{preferredSize:[100,23]},\t                                        upPath: IconButton{preferredSize:[43,23]}\t                                    },\t                                    groupOne: Group{orientation:\'row\', alignment:[\'fill\',\'top\'],\t                                        existDrop: DropDownList{preferredSize:[100,23],properties:{items:[\'Slider layer\']}},\t                                        bindExist: IconButton{preferredSize:[43,23]},\t                                        reRigButn : IconButton{preferredSize:[43,23]},\t                                    },\t                                },\t                                slidUIpnl: Panel{text:\'UI Sliders\', orientation:\'row\', margins:[40,10,40,10],\t                                    createUIbutn: Button{bounds:[0,0,75,23], text:\'Create\'},\t                                    deleteUIbutn: Button{bounds:[0,0,75,23], text:\'Delete\'}\t                                },\t                                movePanel2: Panel{text:\'Move Slider to Parent Comp\', orientation:\'row\',\t                                    moveToDropDn: DropDownList{properties:{items:[\'parent comps\']}},\t                                    moveBtn: Button{bounds:[0,0,50,23],text:\'to Parent\'},\t                                    childBtn: Button{bounds:[0,0,55,23],text:\'to Child\'}\t                                }\t                            }\t                        }\t                    }";
        e.grp = e.add(f);
        e.layout.layout(true);
        e.grp.minimummSize = e.grp.size;
        e.grp.mainTabs.joyTab.switchPanel.dropDGroup.templGrp.templateDrpDn.selection = 0;
        e.grp.mainTabs.joyTab.switchPanel.dropDGroup.swJoyGrp.joyDrpDn.selection = 0;
        e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.selection = 0;
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn.selection = 0;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.selection = 0;
        e.grp.mainTabs.slideTab.movePanel2.moveToDropDn.selection = 0;
        e.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.image = newJoystickIcon;
        e.grp.mainTabs.joyTab.stickPnl.groupJ.upPath.image = updatePathJ;
        e.grp.mainTabs.joyTab.stickPnl.groupJ.easeBias.image = easeBiasJ;
        e.grp.mainTabs.joyTab.stickPnl.groupOne.bindExist.image = bindIconJ;
        e.grp.mainTabs.joyTab.stickPnl.groupOne.reRigButn.image = unbindIconJ;
        e.grp.mainTabs.joyTab.switchPanel.groupSw.switchRig.image = bindIconJ;
        e.grp.mainTabs.joyTab.switchPanel.groupSw.switchUnrig.image =
          unbindIconJ;
        e.grp.mainTabs.slideTab.sliderPanel.groupS.rigButn.image = newSlideIcn;
        e.grp.mainTabs.slideTab.sliderPanel.groupS.upPath.image = updatePathS;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.bindExist.image =
          bindIconS;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.reRigButn.image =
          unbindIconS;
        e.grp.mainTabs.joyTab.joyImg.image = joyThing;
        e.grp.mainTabs.slideTab.slideImg.image = slideThing;
        e.grp.mainTabs.joyTab.header.keyAllButton.image = keyAllThing;
        e.grp.mainTabs.slideTab.header.keyAllButton.image = keyAllThing;
        e.grp.mainTabs.joyTab.header.unKeyFlatButton.image = unKeyThing;
        e.grp.mainTabs.slideTab.header.unKeyFlatButton.image = unKeyThing;
        e.grp.mainTabs.joyTab.header.mirrorButn.image = mirrorShape;
        e.grp.mainTabs.slideTab.header.mirrorButn.image = mirrorShape;
        e.grp.mainTabs.joyTab.header.originButton.image = pasteOrIcn;
        e.grp.mainTabs.slideTab.header.originButton.image = pasteOrIcn;
        if (aeVersion === 12 || parseFloat(app.version) === 13) {
          e.grp.mainTabs.joyTab.header.reloadBrutton.image = reloadThing;
          e.grp.mainTabs.slideTab.header.reloadBrutton.image = reloadThing;
        }
        e.grp.mainTabs.joyTab.header.originButton.helpTip =
          joyTips.pasteOriginTip;
        e.grp.mainTabs.slideTab.header.originButton.helpTip =
          joyTips.pasteOriginTip;
        e.grp.mainTabs.joyTab.header.keyAllButton.helpTip = joyTips.keyAllTip;
        e.grp.mainTabs.slideTab.header.keyAllButton.helpTip = joyTips.keyAllTip;
        e.grp.mainTabs.joyTab.header.unKeyFlatButton.helpTip =
          joyTips.unKeyFlatTip;
        e.grp.mainTabs.slideTab.header.unKeyFlatButton.helpTip =
          joyTips.unKeyFlatTip;
        e.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.helpTip =
          joyTips.newJoyTip;
        e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.helpTip =
          joyTips.existDropTip;
        e.grp.mainTabs.joyTab.stickPnl.groupOne.bindExist.helpTip =
          joyTips.bindExistBt;
        e.grp.mainTabs.joyTab.stickPnl.groupOne.reRigButn.helpTip =
          joyTips.unbindTip;
        e.grp.mainTabs.joyTab.switchPanel.groupSw.createGrpBtn.helpTip =
          joyTips.switchCreateTip;
        e.grp.mainTabs.joyTab.switchPanel.dropDGroup.templGrp.templateDrpDn.helpTip =
          joyTips.switchTemplateTip;
        e.grp.mainTabs.joyTab.switchPanel.dropDGroup.swJoyGrp.joyDrpDn.helpTip =
          joyTips.switchJoyTip;
        e.grp.mainTabs.joyTab.switchPanel.groupSw.switchRig.helpTip =
          joyTips.switchBindTip;
        e.grp.mainTabs.joyTab.switchPanel.groupSw.switchUnrig.helpTip =
          joyTips.switchUnbindTip;
        e.grp.mainTabs.joyTab.stickPnl.groupJ.easeBias.helpTip =
          joyTips.easeBiasTip;
        e.grp.mainTabs.slideTab.sliderPanel.groupS.rigButn.helpTip =
          joyTips.sliderRigButnTip;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.helpTip =
          joyTips.sliderExistDropTip;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.bindExist.helpTip =
          joyTips.sliderExistButnTip;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.reRigButn.helpTip =
          joyTips.sliderUnbindTip;
        e.grp.mainTabs.slideTab.slidUIpnl.createUIbutn.helpTip =
          joyTips2.sliderUIcreateTip;
        e.grp.mainTabs.slideTab.slidUIpnl.deleteUIbutn.helpTip =
          joyTips2.sliderUIdeleteTip;
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn.helpTip =
          joyTips.sliderPClistTip;
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveBtn.helpTip =
          joyTips.sliderPCmoveTip;
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.childBtn.helpTip =
          joyTips.toChildTip;
        e.grp.mainTabs.slideTab.movePanel2.moveToDropDn.helpTip =
          joyTips.sliderPClistTip;
        e.grp.mainTabs.slideTab.movePanel2.moveBtn.helpTip =
          joyTips.sliderPCmoveTip;
        e.grp.mainTabs.slideTab.movePanel2.childBtn.helpTip =
          joyTips.toChildTip;
        e.grp.mainTabs.joyTab.header.helpBrutton.helpTip = joyTips.helpy;
        e.grp.mainTabs.slideTab.header.helpBrutton.helpTip = joyTips.helpy;
        e.grp.mainTabs.joyTab.stickPnl.groupJ.upPath.helpTip =
          joyTips.updatePathTip;
        e.grp.mainTabs.slideTab.sliderPanel.groupS.upPath.helpTip =
          joyTips.updatePathTip;
        e.grp.mainTabs.slideTab.header.mirrorButn.helpTip = joyTips.mirrorTip;
        e.grp.mainTabs.joyTab.header.mirrorButn.helpTip = joyTips.mirrorTip;
        if (aeVersion === 12 || parseFloat(app.version) === 13) {
          e.grp.mainTabs.joyTab.header.reloadBrutton.helpTip =
            joyTips.reloadAllDropDowns;
          e.grp.mainTabs.slideTab.header.reloadBrutton.helpTip =
            joyTips.reloadAllDropDowns;
        }
        e.grp.mainTabs.joyTab.header.helpBrutton.onClick = function g() {
          jnsaf.helpUI();
        };
        e.grp.mainTabs.slideTab.header.helpBrutton.onClick = function () {
          jnsaf.helpUI();
        };
        e.grp.mainTabs.joyTab.header.originButton.onClick = function () {
          originPaste();
        };
        e.grp.mainTabs.slideTab.header.originButton.onClick = function () {
          originPaste();
        };
        e.grp.mainTabs.joyTab.header.keyAllButton.onClick = keyAllTheThings;
        e.grp.mainTabs.slideTab.header.keyAllButton.onClick = keyAllTheThings;
        e.grp.mainTabs.joyTab.header.unKeyFlatButton.onClick = removeFlatProps;
        e.grp.mainTabs.slideTab.header.unKeyFlatButton.onClick =
          removeFlatProps;
        e.grp.mainTabs.joyTab.header.mirrorButn.onClick = mirrorFlipPaths;
        e.grp.mainTabs.slideTab.header.mirrorButn.onClick = mirrorFlipPaths;
        if (aeVersion === 12 || parseFloat(app.version) === 13) {
          e.grp.mainTabs.joyTab.header.reloadBrutton.onClick = function () {
            d();
            n(e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn);
            m();
            j();
          };
          e.grp.mainTabs.slideTab.header.reloadBrutton.onClick = function () {
            k();
            n(e.grp.mainTabs.slideTab.movePanel2.moveToDropDn);
          };
        }
        e.grp.mainTabs.joyTab.stickPnl.groupJ.rigButn.onClick = function () {
          joyRig("new");
          j();
        };
        e.grp.mainTabs.joyTab.stickPnl.groupJ.easeBias.onClick = function () {
          applyEaseBias();
        };
        e.grp.mainTabs.joyTab.stickPnl.groupOne.bindExist.onClick =
          function () {
            joyRig(
              "existing",
              e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.selection.index,
            );
          };
        e.grp.mainTabs.joyTab.stickPnl.groupJ.upPath.onClick = function () {
          updateP(
            e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.selection.index,
          );
        };
        e.grp.mainTabs.slideTab.sliderPanel.groupS.upPath.onClick =
          function () {
            updateSlideP(
              e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.selection
                .index,
            );
          };
        e.grp.mainTabs.joyTab.stickPnl.groupOne.reRigButn.onClick =
          function () {
            reRigJoy(
              e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.selection.index,
            );
          };
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveBtn.onClick =
          function () {
            if (masterPropsJoy) {
              stickMoveMasterProps(
                e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn
                  .selection.index,
              );
            } else {
              stickMove(
                e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn
                  .selection.index,
              );
            }
          };
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.childBtn.onClick =
          function () {
            joyChildMove();
          };
        e.grp.mainTabs.slideTab.movePanel2.childBtn.onClick = function () {
          slideChildMove();
        };
        e.grp.mainTabs.joyTab.switchPanel.groupSw.createGrpBtn.onClick =
          function l() {
            var r = prompt(
              "Please give your Switch template a unique name",
              "switchTemplate",
            );
            if (r !== null) {
              var q = app.project.items.addComp(r, 1000, 1000, 1, 1, 1);
              q.comment = "*Stemplate";
              d();
            }
          };
        e.grp.mainTabs.joyTab.switchPanel.dropDGroup.templGrp.templateDrpDn.onActivate =
          function () {
            d();
          };
        e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn.onActivate =
          function () {
            n(e.grp.mainTabs.joyTab.movePanel.movePanelGrp2.moveToDropDn);
          };
        e.grp.mainTabs.joyTab.switchPanel.dropDGroup.swJoyGrp.joyDrpDn.onActivate =
          function () {
            m();
          };
        e.grp.mainTabs.joyTab.stickPnl.groupOne.existDrop.onActivate =
          function () {
            j();
          };
        myScript.refreshJoystickies = j;
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.onActivate =
          function () {
            k();
          };
        myScript.refreshSlideNulls = k;
        e.grp.mainTabs.joyTab.switchPanel.groupSw.switchRig.onClick =
          function () {
            switchBind(
              e.grp.mainTabs.joyTab.switchPanel.dropDGroup.swJoyGrp.joyDrpDn
                .selection.index,
              e.grp.mainTabs.joyTab.switchPanel.dropDGroup.templGrp
                .templateDrpDn.selection.index,
            );
          };
        e.grp.mainTabs.joyTab.switchPanel.groupSw.switchUnrig.onClick =
          function () {
            unSwitch();
          };
        e.grp.mainTabs.slideTab.sliderPanel.groupS.rigButn.onClick =
          function () {
            sliderConnect(
              "new",
              e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.selection
                .index,
            );
            k();
          };
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.bindExist.onClick =
          function () {
            sliderConnect(
              "existing",
              e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.selection
                .index,
            );
          };
        e.grp.mainTabs.slideTab.sliderPanel.groupOne.reRigButn.onClick =
          function () {
            unBindSliders(
              e.grp.mainTabs.slideTab.sliderPanel.groupOne.existDrop.selection
                .index,
            );
          };
        e.grp.mainTabs.slideTab.movePanel2.moveToDropDn.onActivate =
          function () {
            n(e.grp.mainTabs.slideTab.movePanel2.moveToDropDn);
          };
        e.grp.mainTabs.slideTab.movePanel2.moveBtn.onClick = function () {
          moveSlider(
            e.grp.mainTabs.slideTab.movePanel2.moveToDropDn.selection.index,
          );
        };
        e.grp.mainTabs.slideTab.slidUIpnl.createUIbutn.onClick = function () {
          sliderUI();
        };
        e.grp.mainTabs.slideTab.slidUIpnl.deleteUIbutn.onClick = function () {
          deleteSliderUI();
        };
        return e;
      }
      uiWidth = 200;
      var b = a(c);
      if (b != null && b instanceof Window) {
        b.center();
        b.show();
      }
      b.addEventListener("mousedown", function (d) {
        if (d.altKey) {
          alted = true;
        } else {
          alted = false;
        }
      });
    }
    function originPaste() {
      var f = alted;
      var b = app.project.activeItem;
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var e = b.selectedLayers;
      if (e.length === 0) {
        makeAlert(
          "Select layers that contain consecutive keyframes starting at time 0.",
        );
        return;
      }
      app.beginUndoGroup("Paste Origin Pose");
      var e = b.selectedLayers;
      var d = qualifyingSliderProps(e, true);
      for (var a = 0; a < d.length; a += 1) {
        if (f === false) {
          var c = d[a].keyValue(1);
          d[a].setValueAtTime(b.time, c);
        } else {
          if (!hasKeyHere(d[a], b.time)) {
            var c = d[a].keyValue(1);
            d[a].setValueAtTime(b.time, c);
          }
        }
      }
      app.endUndoGroup();
    }
    function keyAllTheThings() {
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var g = app.project.activeItem.selectedLayers;
      if (!(g.length > 0)) {
        makeAlert("Select a layer to key all riggable properties.");
        return;
      }
      app.beginUndoGroup("Key all reggable properties.");
      var e = app.project.activeItem.time;
      for (var b = 0; b < g.length; b += 1) {
        var f = [];
        getAllProps(g[b], f);
        for (var c = 0; c < f.length; c += 1) {
          try {
            if (!alted) {
              f[c].addKey(e);
            } else {
              if (!hasKeyHere(f[c], e)) {
                f[c].addKey(e);
              }
            }
          } catch (d) {}
        }
      }
      app.endUndoGroup();
    }
    function mirrorFlipPaths() {
      function d(j, k) {
        var m = new Shape();
        var n = [];
        var i = [];
        var l = [];
        if (k === "x") {
          n.push(j.value.vertices[0]);
          i.push([j.value.inTangents[0][0] * -1, j.value.inTangents[0][1]]);
          l.push([j.value.outTangents[0][0] * -1, j.value.outTangents[0][1]]);
          for (var h = 1; h < j.value.vertices.length; h += 1) {
            n.push(b(j.value.vertices[0], j.value.vertices[h], "x"));
            i.push([j.value.inTangents[h][0] * -1, j.value.inTangents[h][1]]);
            l.push([j.value.outTangents[h][0] * -1, j.value.outTangents[h][1]]);
          }
        } else {
          n.push(j.value.vertices[0]);
          i.push([j.value.inTangents[0][0], j.value.inTangents[0][1] * -1]);
          l.push([j.value.outTangents[0][0], j.value.outTangents[0][1] * -1]);
          for (var h = 1; h < j.value.vertices.length; h += 1) {
            n.push(b(j.value.vertices[0], j.value.vertices[h], "y"));
            i.push([j.value.inTangents[h][0], j.value.inTangents[h][1] * -1]);
            l.push([j.value.outTangents[h][0], j.value.outTangents[h][1] * -1]);
          }
        }
        m.vertices = n;
        m.inTangents = i;
        m.outTangents = l;
        return m;
      }
      function b(i, h, j) {
        if (j == "x") {
          var k = [i[0] - (h[0] - i[0]), h[1]];
        } else {
          var k = [h[0], i[1] - (h[1] - i[1])];
        }
        return k;
      }
      function e(h) {
        var i = new Shape();
        i.vertices = f(h.vertices.reverse());
        i.inTangents = f(h.outTangents.reverse());
        i.outTangents = f(h.inTangents.reverse());
        i.closed = h.closed;
        return i;
      }
      function f(j) {
        var i = [];
        i.push(j[j.length - 1]);
        for (var h = 0; h < j.length - 1; h += 1) {
          i.push(j[h]);
        }
        return i;
      }
      var g = alted;
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var a = app.project.activeItem.selectedProperties;
      if (a.length > 0) {
        for (var c = 0; c < a.length; c += 1) {
          if (
            a[c] instanceof Property &&
            a[c].propertyValueType == PropertyValueType.SHAPE
          ) {
            if (g == false) {
              app.beginUndoGroup("PathFlip");
              a[c].setValueAtTime(app.project.activeItem.time, e(d(a[c], "x")));
              app.endUndoGroup();
            } else {
              app.beginUndoGroup("PathFlip");
              a[c].setValueAtTime(app.project.activeItem.time, e(d(a[c], "y")));
              app.endUndoGroup();
            }
          }
        }
      }
    }
    function removeFlatProps() {
      function c() {
        app.beginUndoGroup("Remove Flat Curves");
        var e = app.project.activeItem.selectedLayers;
        if (!(e.length > 0)) {
          makeAlert(
            "Select a layer to remove keyframes from properties that do not change.",
          );
          return;
        }
        for (var d = 0; d < e.length; d += 1) {
          b(e[d]);
        }
        app.endUndoGroup;
      }
      function b(f) {
        for (var d = 1; d <= f.numProperties; d += 1) {
          var g = f.property(d);
          if (
            g.propertyType == PropertyType.INDEXED_GROUP ||
            g.propertyType == PropertyType.NAMED_GROUP
          ) {
            b(g);
          } else {
            if (g.isTimeVarying && g.matchName != "ADBE Marker") {
              try {
                a(g);
              } catch (e) {
                alert(e.line.toString() + "\r" + e.toString());
              }
            }
          }
        }
      }
      function a(g) {
        if (g.numKeys == 1) {
          g.removeKey(1);
        } else {
          if (
            g.numKeys > 1 &&
            g.propertyValueType != PropertyValueType.CUSTOM_VALUE &&
            g.propertyValueType != PropertyValueType.NO_VALUE &&
            g.propertyValueType != PropertyValueType.SHAPE
          ) {
            var d = true;
            for (var f = 2; f <= g.numKeys; f += 1) {
              if (g.keyValue(f).toString() != g.keyValue(f - 1).toString()) {
                d = false;
              }
            }
            if (d == true) {
              for (var e = g.numKeys; e >= 1; e--) {
                g.removeKey(e);
              }
            }
          }
        }
      }
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      c();
    }
    function applyEaseBias() {
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var c = app.project.activeItem.selectedLayers;
      if (c.length > 0) {
        for (var a = 0; a < c.length; a += 1) {
          if (
            !hasEffect(c[a], "Pseudo/1k48264d77gIB") &&
            c[a].comment.indexOf("slider controller&%^*$%") == -1 &&
            c[a].comment.indexOf("joystick&%^*$%") == -1
          ) {
            try {
              c[a].applyPreset(joyEasePseudoPath);
            } catch (b) {}
          }
          if (c[a].comment.indexOf("joystick&%^*$%") != -1) {
            var d = confirm(
              "You have a joystick selected. Ease Bias is intended to be applied to the layers controlled by your joystick. Would you still like to apply Ease Bias to your joystick?",
            );
            if (d) {
              try {
                c[a].applyPreset(joyEasePseudoPath);
              } catch (b) {}
            }
          }
        }
      }
    }
    function switchBind(j, c) {
      if (joyLyrs.length === 0 || switchComps.length === 0) {
        makeAlert(
          "You need to set up a switch template and connect it to a joystick layer to bind.",
        );
        return;
      }
      if (!isValid(app.project.activeItem)) {
        makeAlert("No active composition.");
      }
      var g = app.project.activeItem;
      var b = joyLyrs[j];
      var a = switchComps[c];
      var f = [];
      for (var h = 1; h <= a.numLayers; h += 1) {
        f.push(a.layer(h).name);
      }
      var e = [
        "////// BEGIN SWITCH CODE //////",
        "function joySwitch(resultVal){",
        '   var theController = thisComp.layer("' + b.name + '")',
        '   var switchTemplate = comp("' + a.name + '");',
        '   var theLimit = theController("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001").value;',
        '   var positionRamp = theController("ADBE Transform Group")("ADBE Position").value*(1000/(theLimit*2))+([switchTemplate.width/2,switchTemplate.height/2,0]);',
        "   var switchItems = [];",
        "   for(var x = 1; x<=switchTemplate.numLayers; x++){",
        '       var separation = length(positionRamp, switchTemplate.layer(x)("ADBE Transform Group")("ADBE Position"));',
        "       var myItem = {myLayer: switchTemplate.layer(x), myDistance: separation};",
        "       switchItems.push(myItem);",
        "   }",
        "   switchItems.sort(function(a,b){",
        "                if(a.myDistance > b.myDistance){",
        "                    return 1;",
        "                }",
        "                if(a.myDistance < b.myDistance){",
        "                    return -1;",
        "                }",
        "                return 0;",
        "            });",
        "           if(switchItems[0].myLayer.name === thisLayer.name){",
        "                return resultVal;",
        "            }",
        "            else{",
        "                return 0;",
        "            }",
        "        }",
        "joySwitch(value);",
      ].join("\n");
      for (var d = 1; d <= g.numLayers; d += 1) {
        if (hasThis(g.layer(d).name, f)) {
          g.layer(d).property("ADBE Transform Group")(
            "ADBE Opacity",
          ).expression = e;
          g.layer(d).enabled = true;
        }
      }
    }
    function unSwitch() {
      if (!isValid(app.project.activeItem)) {
        makeAlert("No active composition.");
        return;
      }
      var d = app.project.activeItem.selectedLayers;
      var b = app.project.activeItem;
      if (d.length > 1) {
        makeAlert("To Unbind, select only your joystick layer.");
        return;
      } else {
        if (d.length === 0) {
          makeAlert(
            "please select only the joystick layer in your timeline that you\'d like to disconnect your switch layers from.",
          );
        }
      }
      joyLyr = null;
      for (var a = 1; a <= b.numLayers; a += 1) {
        var c = b.layer(a)("ADBE Transform Group")("ADBE Opacity").expression;
        if (c.indexOf("BEGIN SWITCH CODE") !== -1) {
          b.layer(a)("ADBE Transform Group")("ADBE Opacity").expression = "";
        }
      }
    }
    function joyChildMove() {
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var b = app.project.activeItem.selectedLayers;
      if (b.length === 1 && b[0].comment.indexOf("joystick&%^*$%") !== -1) {
        f = b[0];
      } else {
        makeAlert("Please select one joystick layer.");
        return;
      }
      var a = false;
      app.beginUndoGroup("Move to Child");
      for (var n = 1; n <= app.project.activeItem.numLayers; n += 1) {
        if (
          app.project.activeItem.layer(n).source instanceof CompItem &&
          a === false
        ) {
          chlCmp = app.project.activeItem.layer(n).source;
          for (var i = 1; i <= chlCmp.numLayers; i += 1) {
            if (chlCmp.layer(i).comment.indexOf("joystick&%^*$%") != -1) {
              if (
                chlCmp.layer(i)("ADBE Transform Group")("ADBE Position")
                  .dimensionsSeparated
              ) {
                isPosSeparated = chlCmp
                  .layer(i)("ADBE Transform Group")("ADBE Position_0")
                  .expression.indexOf(app.project.activeItem.name);
              } else {
                j = chlCmp
                  .layer(i)("ADBE Transform Group")("ADBE Position")
                  .expression.indexOf(app.project.activeItem.name);
              }
              if (
                (j || isPosSeparated) &&
                chlCmp.layer(i).source === f.source
              ) {
                m = chlCmp.layer(i);
                var p = m.name;
                var d = originLayer(m, "toChild", f);
                var t = d("ADBE Root Vectors Group")("ADBE Vector Group")(
                  "ADBE Vectors Group",
                )("ADBE Vector Shape - Rect")("ADBE Vector Rect Size");
                t.expression = "";
                c = app.project.activeItem.layer(n).startTime;
                var o = m.name;
                var u =
                  '/////BEGIN LIMIT CODE//////\n     temp = thisComp.layer("' +
                  o +
                  '")("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001")*2;\n       [temp,temp];';
                if (
                  m("ADBE Transform Group")("ADBE Position").dimensionsSeparated
                ) {
                  m("ADBE Transform Group")("ADBE Position_0").expression = "";
                  m("ADBE Transform Group")("ADBE Position_1").expression = "";
                } else {
                  m("ADBE Transform Group")("ADBE Position").expression = "";
                }
                if (hasEffect(m, "ADBE Fill")) {
                  m("ADBE Effect Parade")("ADBE Fill").remove();
                }
                m.name = p;
                t.expression = u;
                a = true;
                if (hasEffect(d, "ADBE Fill")) {
                  d("ADBE Effect Parade")("ADBE Fill").remove();
                }
              }
            }
          }
        }
      }
      if (a) {
        if (f("ADBE Transform Group")("ADBE Position").dimensionsSeparated) {
          g = collectKeyframes(f("ADBE Transform Group")("ADBE Position_0"));
          e = collectKeyframes(f("ADBE Transform Group")("ADBE Position_1"));
          if (g !== null) {
            for (var l = 0; l < g.length; l += 1) {
              g[l].curKeyTime = g[l].curKeyTime - c;
            }
            transferKeyframes(m("ADBE Transform Group")("ADBE Position_0"), g);
          } else {
            m("ADBE Transform Group")("ADBE Position_0").setValue(
              f("ADBE Transform Group")("ADBE Position_0").value,
            );
          }
          if (e !== null) {
            for (var l = 0; l < e.length; l += 1) {
              e[l].curKeyTime = e[l].curKeyTime - c;
            }
            transferKeyframes(m("ADBE Transform Group")("ADBE Position_1"), e);
          } else {
            m("ADBE Transform Group")("ADBE Position_1").setValue(
              f("ADBE Transform Group")("ADBE Position_1").value,
            );
          }
        } else {
          h = collectKeyframes(f("ADBE Transform Group")("ADBE Position"));
          if (h !== null) {
            for (var l = 0; l < h.length; l += 1) {
              h[l].curKeyTime = h[l].curKeyTime - c;
            }
            transferKeyframes(m("ADBE Transform Group")("ADBE Position"), h);
          } else {
            m("ADBE Transform Group")("ADBE Position").setValue(
              f("ADBE Transform Group")("ADBE Position").value,
            );
          }
        }
        m("ADBE Effect Parade")("joystickLimit")(
          "ADBE Slider Control-0001",
        ).expression = "";
        var k = f("ADBE Effect Parade")("ADBE Slider Control")(
          "ADBE Slider Control-0001",
        ).value;
        m("ADBE Effect Parade")("joystickLimit")(
          "ADBE Slider Control-0001",
        ).setValue(k);
        var r = originLayer(f);
        if (r.locked) {
          r.locked = false;
        }
        r.remove();
        f.remove();
      }
      app.endUndoGroup();
    }
    function slideChildMove() {
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var e = app.project.activeItem.selectedLayers;
      if (
        e.length === 1 &&
        e[0].comment.indexOf("slider controller&%^*$%") !== -1
      ) {
        f = e[0];
      } else {
        makeAlert("Please select one Slider Null.");
        return;
      }
      var s = [];
      var k = f("ADBE Effect Parade");
      for (var l = 1; l <= k.numProperties; l += 1) {
        if (k.property(l).matchName == "ADBE Slider Control") {
          if (
            k
              .property(l)("ADBE Slider Control-0001")
              .expression.indexOf("SLIDER_UI") !== -1
          ) {
            makeAlert(
              "One or more of your sliders are controlled by a UI Slider. Delete the UI sliders using the UI Sliders panel and try again.",
            );
            return;
          }
          var i = {
            slideAnim: collectKeyframes(
              k.property(l)("ADBE Slider Control-0001"),
            ),
            slideName: k.property(l).name,
          };
          s.push(i);
        }
      }
      var g = false;
      app.beginUndoGroup("Move to Child");
      for (var d = 1; d <= app.project.activeItem.numLayers; d += 1) {
        if (
          app.project.activeItem.layer(d).source instanceof CompItem &&
          g === false
        ) {
          p = app.project.activeItem.layer(d).source;
          for (var m = 1; m <= p.numLayers; m += 1) {
            if (
              p.layer(m).comment.indexOf("slider controller&%^*$%") != -1 &&
              p.layer(m).source === f.source
            ) {
              if (
                p
                  .layer(
                    m,
                  )("ADBE Effect Parade")("ADBE Slider Control")("ADBE Slider Control-0001")
                  .expression.indexOf(app.project.activeItem.name)
              ) {
                j = p.layer(m);
                h = app.project.activeItem.layer(d).startTime;
                g = true;
                var n = p.layer(m)("ADBE Effect Parade");
                for (var c = 1; c <= n.numProperties; c += 1) {
                  var b = n(c)("ADBE Slider Control-0001");
                  if (isValid(b)) {
                    b.expression = "";
                    if (s[c - 1].slideAnim !== null) {
                      for (var o = 0; o < s[c - 1].slideAnim.length; o += 1) {
                        s[c - 1].slideAnim[o].curKeyTime -= h;
                      }
                      transferKeyframes(b, s[c - 1].slideAnim);
                    } else {
                      removeKeyframes(b);
                      b.setValue(k(c)("ADBE Slider Control-0001").value);
                    }
                  }
                }
              }
            }
          }
        }
      }
      if (g) {
        f.remove();
      }
      app.endUndoGroup();
    }
    function stickMove(e) {
      if (isTrial) {
        makeAlert(
          "Moving controllers to the parent comp is not available in trial mode.",
        );
        return;
      }
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var h = app.project.activeItem.selectedLayers;
      if (h.length === 1 && h[0].comment.indexOf("joystick&%^*$%") !== -1) {
        k = h[0];
      } else {
        makeAlert("Please select one joystick layer.");
        return;
      }
      if (!(parComps.length > 0)) {
        makeAlert("This comp must be nested in another first.");
        return;
      }
      if (
        k("ADBE Transform Group")("ADBE Position").expression.indexOf(
          "valueAtTime(time+s)",
        ) != -1
      ) {
        makeAlert(
          "This joystick appears to have already been move to a parent comp.",
        );
        return;
      }
      var g = getCompInstances(app.project.activeItem, parComps[e]);
      if (nameConflictLayers(g)) {
        makeAlert(
          "There are multiple instances of this comp in the parent comp with the same name. Please make sure they have unique names before moving your controller to the parent comp.",
        );
        return;
      }
      if (nameConflict(k.name, parComps[e])) {
        makeAlert(
          ' a layer named "' +
            k.name +
            '" already exists in ' +
            parComps[e].name +
            ". Please rename your controller or your layer before moving it to avoid naming conflicts.",
        );
        return;
      }
      for (var A = 1; A <= parComps[e].numLayers; A += 1) {
        var j = parComps[e].layer(A);
        if (j instanceof CompItem && j.source === app.project.activeItem) {
          i = j.startTime;
        }
      }
      app.beginUndoGroup("MoveStick");
      var y = parComps[e].selectedLayers;
      for (var p = 0; p < y.length; p += 1) {
        y[p].selected = false;
      }
      var a = originLayer(k);
      var m = a("ADBE Root Vectors Group")("ADBE Vector Group")(
        "ADBE Vectors Group",
      )("ADBE Vector Shape - Rect")("ADBE Vector Rect Size");
      var t = m.expression;
      var s = m.expression.replace(
        "thisComp",
        'comp("' + parComps[e].name + '")',
      );
      m.expression = "";
      var b = a.parent;
      var z = false;
      if (a.locked) {
        a.locked = false;
        z = true;
      }
      a.parent = null;
      a.copyToComp(parComps[e]);
      a.parent = b;
      k.parent = null;
      var d = k.property("ADBE Effect Parade")("joystickLimit")(
        "ADBE Slider Control-0001",
      ).value;
      k.property("ADBE Effect Parade")("joystickLimit").remove();
      k.copyToComp(parComps[e]);
      k.parent = a;
      var w = k
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      w.name = "joystickLimit";
      var x = parComps[e]
        .layer(k.name)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      x.name = "joystickLimit";
      x("ADBE Slider Control-0001").setValue(d);
      parComps[e].layer(a.name)("ADBE Root Vectors Group")("ADBE Vector Group")(
        "ADBE Vectors Group",
      )("ADBE Vector Shape - Rect")("ADBE Vector Rect Size").expression = t;
      if (g[0]) {
        var c = g[0].name;
      } else {
        return;
      }
      var n = parComps[e].name;
      var f = [
        'var lyr = comp("' + n + '").layer("' + c + '")',
        "var s = lyr.startTime;",
        ' comp("' +
          n +
          '").layer("' +
          k.name +
          '")("ADBE Transform Group")("ADBE Position").valueAtTime(time+s)',
      ];
      if (
        k.property("ADBE Transform Group")("ADBE Position").dimensionsSeparated
      ) {
        f[2] =
          ' comp("' +
          n +
          '").layer("' +
          k.name +
          '")("ADBE Transform Group")("ADBE Position_0").valueAtTime(time+s)';
        k.property("ADBE Transform Group")("ADBE Position_0").expression =
          f.join("\n");
        f[2] =
          ' comp("' +
          n +
          '").layer("' +
          k.name +
          '")("ADBE Transform Group")("ADBE Position_1").valueAtTime(time+s)';
        k.property("ADBE Transform Group")("ADBE Position_1").expression =
          f.join("\n");
      } else {
        k.property("ADBE Transform Group")("ADBE Position").expression =
          f.join("\n");
      }
      m.expression = s;
      var l =
        'comp("' +
        parComps[e].name +
        '").layer("' +
        k.name +
        '")("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001")';
      k.property("ADBE Effect Parade")("joystickLimit")(
        "ADBE Slider Control-0001",
      ).expression = l;
      var p = [k, a];
      for (var v = 0; v < p.length; v += 1) {
        var q = p[v].property("ADBE Effect Parade").addProperty("ADBE Fill");
        q("ADBE Fill-0002").setValue([1, 0, 0]);
      }
      if (z) {
        a.locked = true;
      }
      parComps[e].layer(k.name).parent = parComps[e].layer(a.name);
      app.endUndoGroup();
    }
    function stickMoveMasterProps(c) {
      if (isTrial) {
        makeAlert(
          "Moving controllers to the parent comp is not available in trial mode.",
        );
        return;
      }
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var e = app.project.activeItem.selectedLayers;
      if (e.length === 1 && e[0].comment.indexOf("joystick&%^*$%") !== -1) {
        f = e[0];
      } else {
        makeAlert("Please select one joystick layer.");
        return;
      }
      if (!(parComps.length > 0)) {
        makeAlert("This comp must be nested in another first.");
        return;
      }
      var b = f.property("ADBE Transform Group")("ADBE Position");
      var d = f.containingComp;
      if (b.canAddToMotionGraphicsTemplate(d)) {
        b.addToMotionGraphicsTemplate(d);
      }
    }
    function updateSlideP(f) {
      myScript.refreshSlideNulls();
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var g = app.project.activeItem.selectedLayers;
      var b = [];
      var h = alted;
      if (!h) {
        if (
          g.length > 1 ||
          g.length === 0 ||
          (g[0].comment.indexOf("joystick&%^*$%") == -1 &&
            g[0].comment.indexOf("slider controller&%^*$%") == -1 &&
            !isUIsolid(g[0]))
        ) {
          if (slideLyrs === []) {
            makeAlert(
              "Please select a controller in your composition or select one from the dropdown list.",
            );
            return;
          } else {
            if (
              isValid(slideLyrs[f]) &&
              slideLyrs[f].containingComp == app.project.activeItem
            ) {
              i = slideLyrs[f];
            } else {
              makeAlert(
                "To update pathShapes, either select a controller from your timeline or from the dropdown menu.",
              );
              return;
            }
          }
        } else {
          i = g[0];
        }
        if (controllerUnchecked(i, b)) {
          if (i.comment.indexOf("joystick&%^*$%") != -1) {
            updatePathsForJoysticks(i, b);
          } else {
            if (i.comment.indexOf("slider controller&%^*$%") != -1) {
              updatePathsForSliders(i, b);
            } else {
              if (isUIsolid(i)) {
                var k = getMasterProp(i);
                var c = propWalker(k, 0);
                var e = c;
                updatePathsForSliders(e, b);
              }
            }
          }
        }
      } else {
        for (var j = 1; j <= app.project.activeItem.numLayers; j += 1) {
          i = app.project.activeItem.layer(j);
          if (controllerUnchecked(i, b)) {
            if (i.comment.indexOf("joystick&%^*$%") != -1) {
              updatePathsForJoysticks(i, b);
            } else {
              if (i.comment.indexOf("slider controller&%^*$%") != -1) {
                updatePathsForSliders(i, b);
              } else {
                if (isUIsolid(i)) {
                  var k = getMasterProp(i);
                  var c = propWalker(k, 0);
                  var e = c;
                  updatePathsForSliders(e, b);
                }
              }
            }
          }
        }
      }
    }
    function joyRig(a, T) {
      if (!isValid(app.project.activeItem)) {
        makeAlert("Please select some items you\'d like to rig.");
        return;
      }
      if (app.project.activeItem.selectedLayers.length === 0) {
        makeAlert(
          "Please select layers you would like controlled by your joystick controller.",
        );
        return;
      }
      if (!(joyLyrs.length > 0) && a == "existing") {
        makeAlert("There is no pre-existing joystick in this comp to bind to.");
        return;
      }
      app.beginUndoGroup("JoystickRig");
      var u = alted;
      if (u === false) {
        b = "solid";
      } else {
        b = "null";
      }
      var aa = app.project.activeItem;
      var G = app.project.activeItem.selectedLayers;
      var F = app.project.activeItem.selectedLayers;
      var o = app.project.activeItem.selectedProperties;
      var S = [];
      var r = [];
      var E = [];
      var l = returnValidSelectedProps(o);
      for (var M = 0; M < l.length; M += 1) {
        var H = propWalker(l[M], 0);
        G = arrayRemove(G, H);
      }
      for (var K = 0; K < G.length; K += 1) {
        var n = findValidProps(G[K]);
        for (var R = 0; R < n.length; R += 1) {
          S.push(n[R]);
        }
      }
      S = S.concat(l);
      if (S.length === 0) {
        makeAlert(
          "No properties in your selected layers are ready to be connected to a joystick. Each keyframe must be placed one frame apart.\nClick the help button \'?\' for more information about setting up your joystick rig.",
          rigChart,
        );
        return;
      }
      for (var Y = 0; Y < S.length; Y += 1) {
        if (S[Y].propertyValueType === PropertyValueType.SHAPE) {
          if (consistent_vertex_count(S[Y])) {
            r.push(S[Y]);
          } else {
            E.push(S[Y]);
          }
        }
      }
      if (E.length > 0) {
        var q = [
          "The following shape properties have inconsistent vertex counts across their keyframes.",
          "Path properties must have consistent vertex counts to bind properly.",
        ];
        for (var Z = 0; Z < E.length; Z += 1) {
          q.push(propWalker(E[Z], 0).name + "/" + E[Z].parentProperty.name);
        }
        q.push("These properties will not be bound.");
        q = q.join("\n");
        alert(q);
      }
      if (a === "new") {
        var L = [];
        makePrompt(
          "Please give your joystick controller a unique name",
          "JoyStkCtrl01",
          L,
        );
        var C = L[0];
        if (C !== null) {
          if (nameConflict(C, aa) || nameConflict(C + "Origin", aa)) {
            makeAlert(
              "Naming Conflict!\nPlease choose a different unique name that doesn\'t conflict with your existing layer names.",
            );
            return;
          }
          var B = aa.layers.addShape();
          B.name = C + " Origin";
          try {
            B.applyPreset(presetPath);
          } catch (X) {}
          B.guideLayer = true;
          var c =
            '/////BEGIN LIMIT CODE//////\n     temp = thisComp.layer("' +
            C +
            '")("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001")*2;\n       [temp,temp];';
          var J = B("ADBE Root Vectors Group")("ADBE Vector Group")(
            "ADBE Vectors Group",
          )("ADBE Vector Shape - Rect")("ADBE Vector Rect Size");
          if (b === "solid") {
            A = aa.layers.addSolid([1, 1, 1], C, 75, 75, 1);
          } else {
            A = aa.layers.addNull();
            A.name = C;
          }
          A.parent = B;
          A.guideLayer = true;
          A.comment = "joystick&%^*$%";
          A.property("ADBE Transform Group")("ADBE Scale").expression =
            "[100,100]";
          var f = A("ADBE Effect Parade").addProperty("ADBE Slider Control");
          f.name = "joystickLimit";
          f("ADBE Slider Control-0001").setValue(200);
          J.expression = c;
        } else {
          return;
        }
      } else {
        if (a === "existing") {
          A = joyLyrs[T];
          var C = A.name;
        } else {
          return;
        }
      }
      G = F;
      for (var K = 0; K < G.length; K += 1) {
        if (G[K].selectedProperties.length > 0) {
          d = returnValidSelectedProps(G[K].selectedProperties);
        } else {
          d = findValidProps(G[K]);
        }
        var s = [];
        var t = [];
        for (var D = 0; D < d.length; D += 1) {
          if (d[D].propertyValueType != PropertyValueType.SHAPE) {
            s.push(d[D]);
          } else {
            if (consistent_vertex_count(d[D])) {
              t.push(d[D]);
            }
          }
        }
        for (var M = 0; M < s.length; M += 1) {
          m = s[M].keyValue(1);
          k = s[M].keyValue(2);
          i = s[M].keyValue(3);
          h = s[M].keyValue(4);
          g = s[M].keyValue(5);
          var I = [
            "joystick(value);",
            "                    /////// BEGIN JOYSTICK CODE ///////",
            "                    function joystick(inputResult){",
            '                    var contrl = thisComp.layer("' +
              A.name +
              '");',
            '                    var myLimit = contrl("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001").value;',
            '                    var contrlCurVal = contrl("ADBE Transform Group")("ADBE Position").value;',
            "                    var resultVal;",
            "                    var key1 = [" + m.toString() + "];",
            "                    var key2 = [" + k.toString() + "];",
            "                    var key3 = [" + i.toString() + "];",
            "                    var key4 = [" + h.toString() + "];",
            "                    var key5 = [" + g.toString() + "];",
            "                if(contrlCurVal[0]>=0){",
            "                      resultVal = linear(contrlCurVal[0], 0, myLimit, key1, key2);",
            "                    }else{",
            "                      resultVal = linear(contrlCurVal[0], 0, myLimit*-1, key3, key1);",
            "                  }",
            "                    var resultAdd = 0;",
            "                    if(contrlCurVal[1]<=0){",
            "                      resultAdd = linear(contrlCurVal[1]*-1, 0, myLimit, key1, key4)- key1;",
            "                    }else{",
            "                      resultAdd = linear(contrlCurVal[1]*-1, 0, -myLimit, key5, key1)-key1;",
            "                    }",
            "                    return (resultVal+resultAdd)+(inputResult-key1);",
            "                  }",
          ].join("\n");
          var Q = [
            "/////// BEGIN JOYSTICK CODE ///////",
            "function joystick(inputResult){",
            "    var easeOverride_right = null;",
            "    var easeOverride_left =  null;",
            "    var easeOverride_up =    null;",
            "    var easeOverride_down =  null;",
            '\tvar contrl = thisComp.layer("' + A.name + '");',
            '\tvar myLimit = contrl("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001");',
            '\tvar contrlCurVal = contrl("ADBE Transform Group")("ADBE Position");',
            "\tvar resultVal;",
            "\tvar key1 = [" + m.toString() + "];",
            "\tvar key2 = [" + k.toString() + "];",
            "\tvar key3 = [" + i.toString() + "];",
            "\tvar key4 = [" + h.toString() + "];",
            "\tvar key5 = [" + g.toString() + "];",
            "    key1 = unArray(key1);",
            "    key2 = unArray(key2);",
            "    key3 = unArray(key3);",
            "    key4 = unArray(key4);",
            "    key5 = unArray(key5);",
            "\ttry{",
            '        if(!thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB").active){',
            '\t\t\tthrow ("inactive");',
            "        }",
            '\t\tslideR = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0001");',
            '\t\tslideL = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0002");',
            '\t\tslideU = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0003");',
            '\t\tslideD = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0004");',
            "\t}catch(err){",
            "\t\tslideR = 0;",
            "\t\tslideL = 0;",
            "\t\tslideU = 0;",
            "\t\tslideD = 0;",
            "\t}",
            "    if(easeOverride_right !== null && !isNaN(easeOverride_right)){",
            "        slideR = moClamp(easeOverride_right,-100,100);",
            "    }",
            "    if(easeOverride_left !== null && !isNaN(easeOverride_left)){",
            "        slideL = moClamp(easeOverride_left,-100,100);",
            "    }",
            "    if(easeOverride_up !== null && !isNaN(easeOverride_up)){",
            "        slideU = moClamp(easeOverride_up,-100,100);",
            "    }",
            "    if(easeOverride_down !== null && !isNaN(easeOverride_down)){",
            "        slideD = moClamp(easeOverride_down,-100,100);",
            "    }",
            "\tvar easeResultX,easeResultY;",
            "\tif(contrlCurVal[0]>=0){",
            "\t\tresultVal = linear(contrlCurVal[0], 0, myLimit, key1, key2);",
            "\t\tif(slideR !==0){",
            "\t\t\teaseResultX = easeSwitch(contrlCurVal[0], 0, myLimit, key1, key2,slideR);",
            "\t\t\tresultVal = linear(Math.abs(slideR),0,100, resultVal,easeResultX);",
            "\t\t}",
            "\t}else{",
            "\t\tresultVal = linear(-contrlCurVal[0], 0, myLimit, key1, key3);",
            "\t\tif(slideL !==0){",
            "\t\t\teaseResultX = easeSwitch(-contrlCurVal[0], 0, myLimit, key1, key3,slideL);",
            "\t\t\tresultVal = linear(Math.abs(slideL),0,100, resultVal,easeResultX);",
            "\t\t}",
            "\t}",
            "\tvar resultAdd = 0;",
            "\tif(contrlCurVal[1]<=0){",
            "\t\tresultAdd = linear(-contrlCurVal[1], 0, myLimit, key1, key4)- key1;",
            "\t\tif(slideU !==0){",
            "\t\t\teaseResultY = easeSwitch(-contrlCurVal[1], 0, myLimit, key1, key4,slideU)- key1;",
            "\t\t\tresultAdd = linear(Math.abs(slideU),0,100, resultAdd,easeResultY);",
            "\t\t}",
            "\t}else{",
            "\t\tresultAdd = linear(contrlCurVal[1], 0, myLimit, key1, key5)- key1;",
            "\t\tif(slideD!==0){",
            "\t\t\teaseResultY = easeSwitch(contrlCurVal[1], 0, myLimit, key1, key5,slideD)- key1;",
            "\t\t\tresultAdd = linear(Math.abs(slideD),0,100, resultAdd,easeResultY);",
            "\t\t}",
            "\t}",
            "\treturn (resultVal+resultAdd)+(inputResult-key1);",
            "}",
            "function cosEase(val,min1,max1,input1,input2){",
            "\tvar myCos = [];",
            "    if(input1 instanceof Array){",
            "        for(var x = 0; x < input1.length; x++){",
            "            myCos.push(getMeCos(val, min1,max1,input1[x],input2[x]));",
            "        }",
            "    }else{ myCos = getMeCos(val, min1,max1,input1,input2);",
            "\t}return myCos;",
            "\tfunction getMeCos(val,min1,max1,input1,input2){",
            "\t\tvar mapVal = moClamp(val/(max1-min1),0,1);",
            "\t\tvar c = input2 - input1;",
            "\t\tvar myCos2 = -c * Math.cos(mapVal * (Math.PI/2)) + c+ input1;",
            "\t\treturn myCos2;",
            "\t}",
            "}",
            "function sinEase(val,min1,max1,input1,input2){",
            "\tvar mySin = [];",
            "    if(input1 instanceof Array){",
            "        for(var x = 0; x < input1.length; x++){",
            "            mySin.push(getMeSin(val, min1,max1,input1[x],input2[x]));",
            "        }",
            "    }else{ mySin = getMeSin(val, min1,max1,input1,input2);",
            "\t}return mySin;",
            "\tfunction getMeSin(val,min1,max1,input1,input2){",
            "\t\tvar mapVal = moClamp(val/(max1-min1),0,1);",
            "\t\tvar c = input2 - input1;",
            "\t\tvar mySin2 = c * Math.sin(mapVal * (Math.PI/2)) + input1;",
            "\t\treturn mySin2;",
            "    }",
            "}",
            "function easeSwitch(val,min1,max1,input1,input2,morph){",
            "\tif(morph < 0){",
            "\t\treturn cosEase(val,min1,max1,input1,input2);",
            "\t}else{",
            "\t\treturn sinEase(val,min1,max1,input1,input2);",
            "\t}",
            "}",
            "function unArray(inKey){",
            "    if(inKey instanceof Array && inKey.length === 1){",
            "        return inKey[0];",
            "    }else{",
            "        return inKey;",
            "    }",
            "}",
            "function moClamp(a,b,c){",
            "\tif(!(a instanceof Array)){",
            "\t\treturn (Math.max(b, Math.min(c, a)));",
            "\t}else{",
            "\t\tvar aryHold = [];",
            "\t\tfor(var x = 0; x < a.length; x++){",
            "\t\t\taryHold.push(Math.max(b, Math.min(c, a[x])));",
            "\t\t}return aryHold;",
            "\t}",
            "}",
            "joystick(value);",
          ].join("\n");
          O = [
            "joystick(value);",
            "",
            "/////// BEGIN JOYSTICK CODE ///////",
            "function joystick(inputResult){",
            "    var easeOverride_right = null;",
            "    var easeOverride_left =  null;",
            "    var easeOverride_up =    null;",
            "    var easeOverride_down =  null;",
            '\tvar contrl = thisComp.layer("' + A.name + '");',
            '\tvar myLimit = contrl("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001");',
            '\tvar contrlCurVal = contrl("ADBE Transform Group")("ADBE Position");',
            "\tvar resultVal;",
            "\tvar key1 = [" + m.toString() + "];",
            "\tvar key2 = [" + k.toString() + "];",
            "\tvar key3 = [" + i.toString() + "];",
            "\tvar key4 = [" + h.toString() + "];",
            "\tvar key5 = [" + g.toString() + "];",
            "    key1 = unArray(key1);",
            "    key2 = unArray(key2);",
            "    key3 = unArray(key3);",
            "    key4 = unArray(key4);",
            "    key5 = unArray(key5);",
            "\ttry{",
            '        if(!thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB").active){',
            '\t\tthrow ("inactive");',
            "        }",
            '\t\tslideR = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0001");',
            '\t\tslideL = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0002");',
            '\t\tslideU = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0003");',
            '\t\tslideD = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0004");',
            "\t}catch(err){",
            "\t\tslideR = 0;",
            "\t\tslideL = 0;",
            "\t\tslideU = 0;",
            "\t\tslideD = 0;",
            "\t}",
            "   if(easeOverride_right !== null && !isNaN(easeOverride_right)){",
            "        slideR = moClamp(easeOverride_right,-100,100);",
            "    }",
            "    if(easeOverride_left !== null && !isNaN(easeOverride_left)){",
            "        slideL = moClamp(easeOverride_left,-100,100);",
            "    }",
            "    if(easeOverride_up !== null && !isNaN(easeOverride_up)){",
            "        slideU = moClamp(easeOverride_up,-100,100);",
            "    }",
            "    if(easeOverride_down !== null && !isNaN(easeOverride_down)){",
            "        slideD = moClamp(easeOverride_down,-100,100);",
            "    }",
            "\tvar easeResultX,easeResultY;",
            "\tif(contrlCurVal[0]>=0){",
            "\t\tresultVal = linear(contrlCurVal[0], 0, myLimit, key1, key2);",
            "\t\tif(slideR !==0){",
            "\t\t\teaseResultX = easeSwitch(contrlCurVal[0], 0, myLimit, key1, key2,slideR);",
            "\t\t\tresultVal = linear(Math.abs(slideR),0,100, resultVal,easeResultX);",
            "\t\t}",
            "\t}else{",
            "\t\tresultVal = linear(-contrlCurVal[0], 0, myLimit, key1, key3);",
            "\t\tif(slideL !==0){",
            "\t\t\teaseResultX = easeSwitch(-contrlCurVal[0], 0, myLimit, key1, key3,slideL);",
            "\t\t\tresultVal = linear(Math.abs(slideL),0,100, resultVal,easeResultX);",
            "\t\t}",
            "\t}",
            "\tvar resultAdd = 0;",
            "\tif(contrlCurVal[1]<=0){",
            "\t\tresultAdd = linear(-contrlCurVal[1], 0, myLimit, key1, key4)- key1;",
            "\t\tif(slideU !==0){",
            "\t\t\teaseResultY = easeSwitch(-contrlCurVal[1], 0, myLimit, key1, key4,slideU)- key1;",
            "\t\t\tresultAdd = linear(Math.abs(slideU),0,100, resultAdd,easeResultY);",
            "\t\t}",
            "\t}else{",
            "\t\tresultAdd = linear(contrlCurVal[1], 0, myLimit, key1, key5)- key1;",
            "\t\tif(slideD!==0){",
            "\t\t\teaseResultY = easeSwitch(contrlCurVal[1], 0, myLimit, key1, key5,slideD)- key1;",
            "\t\t\tresultAdd = linear(Math.abs(slideD),0,100, resultAdd,easeResultY);",
            "\t\t}",
            "\t}",
            "\treturn (resultVal+resultAdd)+(inputResult-key1);",
            "}",
            "function cosEase(val,min1,max1,input1,input2){",
            "\tvar myCos = [];",
            "    if(input1 instanceof Array){",
            "    for(var x = 0; x < input1.length; x++){",
            "        myCos.push(getMeCos(val, min1,max1,input1[x],input2[x]));",
            "        }",
            "    }else{ myCos = getMeCos(val, min1,max1,input1,input2);",
            "\t}return myCos;",
            "}",
            "function getMeCos(val,min1,max1,input1,input2){",
            "\tvar mapVal = moClamp(val/(max1-min1),0,1);",
            "\tvar c = input2 - input1;",
            "\tvar myCos2 = -c * Math.cos(mapVal * (Math.PI/2)) + c+ input1;",
            "\treturn myCos2;",
            "}",
            "function sinEase(val,min1,max1,input1,input2){",
            "\tvar mySin = [];",
            "    if(input1 instanceof Array){",
            "        for(var x = 0; x < input1.length; x++){",
            "            mySin.push(getMeSin(val, min1,max1,input1[x],input2[x]));",
            "}",
            "    }else{ mySin = getMeSin(val, min1,max1,input1,input2);",
            "}return mySin;",
            "}",
            "function getMeSin(val,min1,max1,input1,input2){",
            "\tvar mapVal = moClamp(val/(max1-min1),0,1);",
            "\tvar c = input2 - input1;",
            "\tvar mySin2 = c * Math.sin(mapVal * (Math.PI/2)) + input1;",
            "\treturn mySin2;",
            "}",
            "function easeSwitch(val,min1,max1,input1,input2,morph){",
            "\tif(morph < 0){",
            "\t\treturn cosEase(val,min1,max1,input1,input2);",
            "\t}else{",
            "\t\treturn sinEase(val,min1,max1,input1,input2);",
            "\t}",
            "}",
            "function unArray(inKey){",
            "    if(inKey instanceof Array && inKey.length === 1){",
            "        return inKey[0];",
            "    }else{",
            "        return inKey;",
            "    }",
            "}",
            "function moClamp(a,b,c){",
            "\tif(!(a instanceof Array)){",
            "\t\treturn (Math.max(b, Math.min(c, a)));",
            "\t}else{",
            "\t\tvar aryHold = [];",
            "\t\tfor(var x = 0; x < a.length; x++){",
            "\t\t\taryHold.push(Math.max(b, Math.min(c, a[x])));",
            "\t\t}return aryHold;",
            "\t}",
            "}",
          ].join("\n");
          if (aeVersion !== 11) {
            s[M].expression = Q;
          } else {
            s[M].expression = O;
          }
          if (s[M].matchName !== "ADBE Time Remapping") {
            for (var N = 0; N < 5; N += 1) {
              s[M].removeKey(1);
            }
            if (s[M].numKeys == 0) {
              s[M].setValue(m);
            }
          } else {
            for (var U = 5; U > 1; U += -1) {
              s[M].removeKey(U);
            }
          }
        }
        for (var W = 0; W < t.length; W += 1) {
          var w = t[W].parentProperty.rotoBezier;
          m = t[W].keyValue(1);
          k = t[W].keyValue(2);
          i = t[W].keyValue(3);
          h = t[W].keyValue(4);
          g = t[W].keyValue(5);
          var P = [
            "/////// BEGIN JOYSTICK SHAPE CODE  /////////",
            '                            var controllyThing = thisComp.layer("' +
              A.name +
              '");',
            "                            var key1 = " + maskKeyToString(m) + "",
            "                            var key2 = " + maskKeyToString(k) + "",
            "                            var key3 = " + maskKeyToString(i) + "",
            "                            var key4 = " + maskKeyToString(h) + "",
            "                            var key5 = " + maskKeyToString(g) + "",
            "                            " + rotoWrite(w) + "",
            "                          value;",
          ].join("\n");
          var V = [
            "/////// BEGIN JOYSTICK SHAPE CODE  /////////",
            'if(numKeys > 0 || typeof createPath === "undefined"){',
            "\tvalue;",
            "}else{",
            'var contrl = thisComp.layer("' + A.name + '");',
            'var myLimit = contrl("ADBE Effect Parade")("joystickLimit")("ADBE Slider Control-0001").value;',
            'var contrlCurVal = contrl("ADBE Transform Group")("ADBE Position").value;',
            "var key1 = " + maskKeyToString(m) + "",
            "var key2 = " + maskKeyToString(k, m) + "",
            "var key3 = " + maskKeyToString(i, m) + "",
            "var key4 = " + maskKeyToString(h, m) + "",
            "var key5 = " + maskKeyToString(g, m) + "",
            "" + rotoWrite(w) + "",
            "var bias = {};",
            "try{",
            'if(!thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB").active){',
            'throw ("inactive");',
            "}",
            'bias.slideR = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0001").value;',
            'bias.slideL = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0002").value;',
            'bias.slideU = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0003").value;',
            'bias.slideD = thisLayer("ADBE Effect Parade")("Pseudo/1k48264d77gIB")("Pseudo/1k48264d77gIB-0004").value;',
            "}catch(err){",
            "bias.slideR = 0;",
            "bias.slideL = 0;",
            "bias.slideU = 0;",
            "bias.slideD = 0;",
            "}",
            "//////////////",
            "function joystick(key1,key2,key3,key4,key5,bias,contrl){",
            "    var resultVal",
            "    key1 = unArray(key1);",
            "    key2 = unArray(key2);",
            "    key3 = unArray(key3);",
            "    key4 = unArray(key4);",
            "    key5 = unArray(key5);",
            "var easeResultX,easeResultY;",
            "if(contrlCurVal[0]>=0){",
            "\tif(key2 === null){resultVal = key1;}else{",
            "    \tresultVal = linear(contrlCurVal[0], 0, myLimit, key1, key2);",
            "    \tif(bias.slideR !==0){",
            "    \t    easeResultX = easeSwitch(contrlCurVal[0], 0, myLimit, key1, key2,bias.slideR);",
            "    \t    resultVal = linear(Math.abs(bias.slideR),0,100, resultVal,easeResultX);",
            "    \t}",
            "\t}",
            "}else{",
            "\tif(key3 === null){resultVal = key1;}else{",
            "    \tresultVal = linear(-contrlCurVal[0], 0, myLimit, key1, key3);",
            "    \tif(bias.slideL !==0){",
            "    \t   easeResultX = easeSwitch(0-contrlCurVal[0], 0, myLimit, key1, key3,bias.slideL);",
            "    \t    resultVal = linear(Math.abs(bias.slideL),0,100, resultVal,easeResultX);",
            "    \t}",
            "\t}",
            "}",
            "var resultAdd = 0;",
            "if(contrlCurVal[1]<=0){",
            "\tif(key4 === null){resultAdd = [0,0];}else{",
            "    \tresultAdd = linear(0-contrlCurVal[1], 0, myLimit, key1, key4)- key1;",
            "    \tif(bias.slideU !==0){",
            "        \teaseResultY = easeSwitch(-contrlCurVal[1], 0, myLimit, key1, key4,bias.slideU)- key1;",
            "        \tresultAdd = linear(Math.abs(bias.slideU),0,100, resultAdd,easeResultY);",
            "    \t}",
            "\t}",
            "}else{",
            "\tif(key5 === null){resultAdd = [0,0];}else{",
            "    \tresultAdd = linear(contrlCurVal[1], 0, myLimit, key1, key5)- key1;",
            "    \tif(bias.slideD!==0){",
            "    \t    easeResultY = easeSwitch(contrlCurVal[1], 0, myLimit, key1, key5,bias.slideD)- key1;",
            "    \t    resultAdd = linear(Math.abs(bias.slideD),0,100, resultAdd,easeResultY);",
            "    \t}",
            "\t}",
            "}",
            "return (resultVal+resultAdd);",
            "}",
            "function cosEase(val,min1,max1,input1,input2){",
            "var myCos = [];",
            "if(input1 instanceof Array){",
            "    for(var x = 0; x < input1.length; x++){",
            "        myCos.push(getMeCos(val, min1,max1,input1[x],input2[x]));",
            "    }",
            "}else{ myCos = getMeCos(val, min1,max1,input1,input2);",
            "}return myCos;",
            "function getMeCos(val,min1,max1,input1,input2){",
            "var mapVal = moClamp(val/(max1-min1),0,1);",
            "var c = input2 - input1;",
            "var myCos2 = -c * Math.cos(mapVal * (Math.PI/2)) + c+ input1;",
            "return myCos2;",
            "}",
            "}",
            "function sinEase(val,min1,max1,input1,input2){",
            "var mySin = [];",
            "if(input1 instanceof Array){",
            "    for(var x = 0; x < input1.length; x++){",
            "        mySin.push(getMeSin(val, min1,max1,input1[x],input2[x]));",
            "    }",
            "}else{ mySin = getMeSin(val, min1,max1,input1,input2);",
            "}return mySin;",
            "}",
            "function getMeSin(val,min1,max1,input1,input2){",
            "var mapVal = moClamp(val/(max1-min1),0,1);",
            "var c = input2 - input1;",
            "var mySin2 = c * Math.sin(mapVal * (Math.PI/2)) + input1;",
            "return mySin2;",
            "}",
            "function easeSwitch(val,min1,max1,input1,input2,morph){",
            "if(morph < 0){",
            "    return cosEase(val,min1,max1,input1,input2);",
            "}else{",
            "    return sinEase(val,min1,max1,input1,input2);",
            "}",
            "}",
            "function unArray(inKey){",
            "if(inKey instanceof Array && inKey.length === 1){",
            "    return inKey[0];",
            "}else{",
            "    return inKey;",
            "}",
            "}",
            "function moClamp(a,b,c){",
            "if(!(a instanceof Array)){",
            "    return (Math.max(b, Math.min(c, a)));",
            "}else{",
            "   var aryHold = [];",
            "   for(var x = 0; x < a.length; x++){",
            "       aryHold.push(Math.max(b, Math.min(c, a[x])));",
            "   }return aryHold;",
            "}",
            "}",
            "\tvar myPoints = [];",
            "\tvar myInTangents = [];",
            "\tvar myOutTangents = [];",
            "\tvar k1vl = key1.vertices.length;",
            "\tvar i = 0;",
            "\tfor(i = 0; i < k1vl; i++){",
            "    \tmyPoints.push(joystick(key1.vertices[i],key2.vertices[i],key3.vertices[i],key4.vertices[i],key5.vertices[i], bias , contrl));",
            "   \tmyInTangents.push(joystick(key1.inTangents[i],key2.inTangents[i],key3.inTangents[i],key4.inTangents[i],key5.inTangents[i], bias , contrl));",
            "\t\tmyOutTangents.push(joystick(key1.outTangents[i],key2.outTangents[i],key3.outTangents[i],key4.outTangents[i],key5.outTangents[i], bias , contrl));",
            "\t}",
            "\tcreatePath(myPoints, myInTangents, myOutTangents, key1.closed);",
            "}",
          ].join("\n");
          if (aeVersion >= 15) {
            t[W].expression = V;
          } else {
            t[W].expression = P;
          }
          for (var y = t[W].numKeys; y > 0; y--) {
            t[W].removeKey(y);
          }
        }
      }
      joyLyr = null;
      writeLn(S.length + " properties bound to " + C);
      app.endUndoGroup();
    }
    function reRigJoy(joyInd) {
      function unbindAllJoystickProps() {
        for (var n = 0; n < joystickProps.length; n += 1) {
          var propExp = joystickProps[n].expression;
          var ba = propExp.split("BEGIN JOYSTICK CODE");
          be = ba[1];
          var bo = be.split(/(\[|\])/gm);
          var DeezKeys = [
            stringToArray(bo[2]),
            stringToArray(bo[6]),
            stringToArray(bo[10]),
            stringToArray(bo[14]),
            stringToArray(bo[18]),
          ];
          var theDur = joyLyr.containingComp.frameDuration;
          for (var l = 0; l < 5; l += 1) {
            joystickProps[n].setValueAtTime(theDur * l, DeezKeys[l]);
          }
          joystickProps[n].expression = "";
        }
        for (var m = 0; m < joystickShapeProps.length; m += 1) {
          while (joystickShapeProps[m].numKeys >= 1) {
            joystickShapeProps[m].removeKey(joystickShapeProps[m].numKeys);
          }
          var propExp = joystickShapeProps[m].expression;
          var ba = propExp.split("var key1");
          be = ba[1];
          var bo = be.split(/(\{|\})/gm);
          eval("key1 = {" + bo[2] + "};");
          eval("key2 = {" + bo[6] + "};");
          eval("key3 = {" + bo[10] + "};");
          eval("key4 = {" + bo[14] + "};");
          eval("key5 = {" + bo[18] + "};");
          decompress(key2, key1);
          decompress(key3, key1);
          decompress(key4, key1);
          decompress(key5, key1);
          var keyArray = [key1, key2, key3, key4, key5];
          var theDur = joyLyr.containingComp.frameDuration;
          var joyPropValues = [];
          var joyPropTimes = [];
          for (var gg = 0; gg < keyArray.length; gg += 1) {
            joyPropTimes.push(theDur * gg);
            joyPropValues.push(convertObjectToShape(keyArray[gg]));
          }
          joystickShapeProps[m].setValuesAtTimes(joyPropTimes, joyPropValues);
          joystickShapeProps[m].expression = "";
        }
      }
      myScript.refreshJoystickies();
      var altPressed = alted;
      var clearId = app.findMenuCommandId("Clear");
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var lyrSelection = app.project.activeItem.selectedLayers;
      if (
        lyrSelection.length === 1 &&
        lyrSelection[0].comment.indexOf("joystick&%^*$%") != -1
      ) {
        joyLyr = lyrSelection[0];
      } else {
        if (lyrSelection.length >= 0) {
          if (joyLyrs === []) {
            makeAlert(
              "Please select a joystick in your composition or select one from the dropdown list.",
            );
            return;
          }
          if (
            isValid(joyLyrs[joyInd]) &&
            joyLyrs[joyInd].containingComp == app.project.activeItem
          ) {
            joyLyr = joyLyrs[joyInd];
          } else {
            makeAlert("Cannot find the joystick to unbind.");
            return;
          }
        }
      }
      app.beginUndoGroup("Unbind Joystick");
      var joystickProps = [];
      var joystickShapeProps = [];
      if (!altPressed) {
        for (var b = 1; b <= joyLyr.containingComp.numLayers; b += 1) {
          joystickProps = [];
          joystickShapeProps = [];
          var joystickPropsTemp = findJoystickProps(
            joyLyr.containingComp.layer(b),
            joyLyr,
          );
          for (var jkj = 0; jkj < joystickPropsTemp.length; jkj += 1) {
            if (
              joystickPropsTemp[jkj].propertyValueType !=
              PropertyValueType.SHAPE
            ) {
              joystickProps.push(joystickPropsTemp[jkj]);
            }
          }
          joystickShapeProps = findJoystickShapeProps(
            joyLyr.containingComp.layer(b),
            joyLyr,
          );
          unbindAllJoystickProps();
        }
      } else {
        for (var b = 0; b < lyrSelection.length; b += 1) {
          joystickProps = [];
          joystickShapeProps = [];
          if (lyrSelection[b].selectedProperties.length > 0) {
            joystickPropsTemp = returnJoystickProps(
              lyrSelection[b].selectedProperties,
              joyLyr,
            );
          } else {
            joystickPropsTemp = findJoystickProps(lyrSelection[b], joyLyr);
          }
          for (var jkj = 0; jkj < joystickPropsTemp.length; jkj += 1) {
            if (
              joystickPropsTemp[jkj].propertyValueType !=
              PropertyValueType.SHAPE
            ) {
              joystickProps.push(joystickPropsTemp[jkj]);
            }
          }
          var joystickShapeProps = findJoystickShapeProps(
            lyrSelection[b],
            joyLyr,
          );
          unbindAllJoystickProps();
        }
      }
      app.endUndoGroup();
    }
    function sliderConnect(f, o) {
      function B(a, t, c) {
        var s = "";
        for (var q = 1; q <= a("ADBE Effect Parade").numProperties; q += 1) {
          s += [
            "var contrlCurVal" +
              q +
              ' = contrl("ADBE Effect Parade")(' +
              q +
              ')("ADBE Slider Control-0001");',
            "",
          ].join("\n");
        }
        for (var j = 1; j <= t; j += 1) {
          s += ["var k" + j + "=[" + c.keyValue(j).toString() + "];", ""].join(
            "\n",
          );
        }
        for (var b = 1; b <= t; b += 1) {
          s += ["k" + b + "= unArray(k" + b + ");", ""].join("\n");
        }
        for (var e = 1; e <= t - 1; e += 1) {
          if (r === false) {
            if (e === 1) {
              s += [
                "if(contrlCurVal" + e + " > 0){",
                " var resultAdd" +
                  e +
                  " = linear(contrlCurVal" +
                  e +
                  ",0,100,k1,k" +
                  e +
                  1 +
                  ");}else if (contrlCurVal" +
                  e +
                  " < 0){var resultAdd" +
                  e +
                  " = k1+(-linear(-contrlCurVal" +
                  e +
                  ",0,100,k1,k" +
                  e +
                  1 +
                  ")+k1);}else{var resultAdd" +
                  e +
                  " = k1;}",
                "",
              ].join("\n");
            } else {
              s += [
                "if(contrlCurVal" + e + " > 0){",
                " var resultAdd" +
                  e +
                  " = linear(contrlCurVal" +
                  e +
                  ",0,100,k1,k" +
                  e +
                  1 +
                  ")-k1;}else if (contrlCurVal" +
                  e +
                  " < 0){var resultAdd" +
                  e +
                  " = k1-linear(-contrlCurVal" +
                  e +
                  ",0,100,k1,k" +
                  e +
                  1 +
                  ");}else{var resultAdd" +
                  e +
                  " = 0;}",
                "",
              ].join("\n");
            }
          } else {
            if (e === 1) {
              s +=
                "var resultAdd" +
                e +
                " = linear(contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ");\n";
            } else {
              s +=
                "var resultAdd" +
                e +
                " = linear(contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ")-k1;\n";
            }
          }
        }
        s += "var myResult = ";
        for (var e = 1; e <= t - 1; e += 1) {
          if (e === 1) {
            s += "resultAdd" + e;
          } else {
            s += "+resultAdd" + e;
          }
        }
        s += "+(inputValue-k1);\nreturn myResult;}";
        s += [
          "",
          "function unArray(inKey){",
          "    if(inKey instanceof Array && inKey.length === 1){",
          "     return inKey[0];",
          "      }else{",
          "        return inKey;",
          "     }",
          "  }",
        ].join("\n");
        return s;
      }
      function U(a, q, c) {
        var j = "";
        for (var b = 1; b <= q; b += 1) {
          j += "k" + b + "= unArray(k" + b + ");\n";
        }
        for (var e = 1; e <= q - 1; e += 1) {
          if (r === false) {
            if (e === 1) {
              j +=
                "if(k" +
                e +
                1 +
                " === null){var resultAdd" +
                e +
                " = k" +
                e +
                ";}else{\nif(contrlCurVal" +
                e +
                " >0){\n var resultAdd" +
                e +
                " = linear(contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ");}else if (contrlCurVal" +
                e +
                " < 0){var resultAdd" +
                e +
                " = k1+(-linear(0-contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ")+k1);} else{var resultAdd" +
                e +
                " = k1;}}\n";
            } else {
              j +=
                "if(k" +
                e +
                1 +
                " === null){var resultAdd" +
                e +
                " = [0,0];}else{\nif(contrlCurVal" +
                e +
                " >0){\n var resultAdd" +
                e +
                " = linear(contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ")-k1;}else if (contrlCurVal" +
                e +
                " < 0){var resultAdd" +
                e +
                " = k1-linear(0-contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ");} else{var resultAdd" +
                e +
                " = [0,0];}}\n";
            }
          } else {
            if (e === 1) {
              j +=
                "var resultAdd" +
                e +
                " = linear(contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ");\n";
            } else {
              j +=
                "var resultAdd" +
                e +
                " = linear(contrlCurVal" +
                e +
                ",0,100,k1,k" +
                e +
                1 +
                ")-k1;\n";
            }
          }
        }
        j += "var myResult = ";
        for (var e = 1; e <= q - 1; e += 1) {
          if (e === 1) {
            j += "resultAdd" + e;
          } else {
            j += "+resultAdd" + e;
          }
        }
        j += ";\nreturn myResult;}";
        j += [
          "\nfunction unArray(inKey){",
          "    if(inKey instanceof Array && inKey.length === 1){",
          "     return inKey[0];",
          "      }else{",
          "        return inKey;",
          "     }",
          " }",
        ].join("\n");
        return j;
      }
      function l(b, a) {
        var c = "slider(";
        for (var e = 0; e < b; e += 1) {
          c += "k" + e + 1 + "." + a + "[i]";
          if (e < b - 1) {
            c += ",";
          } else {
            c += ")";
          }
        }
        return c;
      }
      function d(a) {
        var b = "";
        for (var c = 0; c < a; c += 1) {
          b += "k" + c + 1;
          if (c < a - 1) {
            b += ",";
          }
        }
        return b;
      }
      function E(a, q, b) {
        var j = "";
        for (var e = 1; e <= a("ADBE Effect Parade").numProperties; e += 1) {
          j +=
            "var contrlCurVal" +
            e +
            ' = contrl("ADBE Effect Parade")(' +
            e +
            ')("ADBE Slider Control-0001").value;\n';
        }
        for (var c = 1; c <= q; c += 1) {
          if (c === 1) {
            j += "var k" + c + "=" + maskKeyToString(b.keyValue(c)) + "\n";
          } else {
            j +=
              "var k" +
              c +
              "=" +
              maskKeyToString(b.keyValue(c), b.keyValue(1)) +
              "\n";
          }
        }
        return j;
      }
      var aa = true;
      var r = alted;
      var v = "Please select some layers you\'d like to rig.";
      if (!isValid(app.project.activeItem)) {
        makeAlert(v);
        return;
      }
      app.beginUndoGroup("SliderRig");
      var X = app.project.activeItem;
      var H = X.selectedLayers;
      if (H.length === 0) {
        makeAlert(v);
        return;
      }
      var D = [];
      if (aa === "this should never return true") {
        for (var K = 0; K < H.length; K += 1) {
          for (var Z = 0; Z < H[K].selectedProperties.length; Z += 1) {
            var O = H[K].selectedProperties;
            if (
              O[Z] instanceof Property &&
              propTypeTest(O[Z]) &&
              O[Z].canSetExpression
            ) {
              D.push(O[Z]);
            }
          }
        }
      } else {
        sliderPropsTemp = qualifyingSliderProps(H);
      }
      var M = [];
      for (var Y = 0; Y < sliderPropsTemp.length; Y += 1) {
        var I = app.project.activeItem.frameDuration;
        var i = 0;
        for (var F = 1; F <= sliderPropsTemp[Y].numKeys; F += 1) {
          if (
            Math.round(sliderPropsTemp[Y].keyTime(F) * 1000) / 1000 ==
            Math.round((F * I - I) * 1000) / 1000
          ) {
            i++;
          }
        }
        M.push(i);
      }
      var u = M.sort();
      T = u[0];
      if (T < 2) {
        makeAlert(
          "You will need at least two keyframes on each of your selected properties to set up sliders.",
        );
        return;
      }
      if (isTrial && T > 5) {
        makeAlert(
          "The trial version of Joysticks \'n Sliders limits you to four sliders per slider Null. Please register for unlimited sliders. Reduce the number of pose keyframes to continue.",
        );
        T = 5;
        return;
      }
      var D = [];
      var p = [];
      var G = [];
      for (var P = 0; P < sliderPropsTemp.length; P += 1) {
        if (sliderPropsTemp[P].propertyValueType !== PropertyValueType.SHAPE) {
          D.push(sliderPropsTemp[P]);
        } else {
          if (consistent_vertex_count(sliderPropsTemp[P])) {
            p.push(sliderPropsTemp[P]);
          } else {
            G.push(sliderPropsTemp[P]);
          }
        }
      }
      if (G.length > 0) {
        var w = [
          "The following shape properties have inconsistent vertex counts across their keyframes.",
          "Path properties must have consistent vertex counts to bind properly.",
        ];
        for (var V = 0; V < G.length; V += 1) {
          w.push(propWalker(G[V], 0).name + "/" + G[V].parentProperty.name);
        }
        w.push("These properties will not be bound.");
        w = w.join("\n");
        alert(w);
      }
      if (D.length === 0 && p.length === 0) {
        return;
      }
      if (f === "new") {
        var y = [];
        makePrompt(
          "Please give your slider null a unique name",
          "SlideController",
          y,
        );
        k = y[0];
        if (k !== null) {
          if (nameConflict(k, X)) {
            makeAlert(
              "Naming Conflict!\nPlease choose a different unique name that doesn\'t conflict with your existing layer names.",
            );
            return;
          }
          h = X.layers.addNull();
          h.name = k;
          h.source.name = k;
          h.comment = "slider controller&%^*$%";
        } else {
          return;
        }
      } else {
        if (isValid(slideLyrs[o]) && slideLyrs.length > 0) {
          h = slideLyrs[o];
          k = h.name;
        } else {
          makeAlert("No existing slider nulls in this comp to connect to.");
          return;
        }
      }
      if (f === "new") {
        for (var W = 0; W < T - 1; W += 1) {
          h("ADBE Effect Parade").addProperty("ADBE Slider Control");
        }
      } else {
        if (f === "existing") {
          var Q = h("ADBE Effect Parade").numProperties;
          if (Q < T - 1) {
            var C = T - 1 - h("ADBE Effect Parade").numProperties;
            for (var R = 1; R <= C; R += 1) {
              h("ADBE Effect Parade").addProperty("ADBE Slider Control");
            }
          }
        }
      }
      for (var N = 0; N < D.length; N += 1) {
        var n =
          [
            "//////BEGIN SLIDER CODE//////",
            "function slider (inputValue){",
            'var contrl = thisComp.layer("' + k + '");',
          ].join("\n") +
          B(h, T, D[N]) +
          "\nslider(value);";
        var m = D[N].keyValue(1);
        D[N].expression = n;
        if (D[N].matchName !== "ADBE Time Remapping") {
          for (var S = T; S >= 1; S--) {
            D[N].removeKey(S);
          }
          if (D[N].numKeys == 0) {
            D[N].setValue(m);
          }
        } else {
          for (var S = D[N].numKeys; S >= 2; S--) {
            D[N].removeKey(S);
          }
          D[N].setValueAtKey(1, m);
        }
      }
      for (var L = 0; L < p.length; L += 1) {
        var A = p[L].numKeys;
        var z = p[L].parentProperty.rotoBezier;
        var n =
          '//////BEGIN SLIDER SHAPE CODE/////\n                            var contrl = thisComp.layer("' +
          k +
          '");\n                            ' +
          E(h, T, p[L]) +
          "\n                            " +
          rotoWrite(z) +
          "\n                            value;";
        var g =
          '//////BEGIN SLIDER SHAPE CODE/////\nif(numKeys > 0 || typeof createPath === "undefined"){\n    value;\n    }else{\nvar contrl = thisComp.layer("' +
          k +
          '");\n                            ' +
          E(h, T, p[L]) +
          "\n                            " +
          rotoWrite(z) +
          "\n            /////END SHAPE INFO/////\n";
        var J = [
          "function slider(" + d(T) + "){",
          U(h, T, p[L]),
          "\t\tvar myPoints = [];",
          "\t\tvar myInTangents = [];",
          "\t\tvar myOutTangents = [];",
          "\t\tvar k1vl = k1.vertices.length;",
          "\t\tvar i;",
          "\t\tfor(i = 0; i < k1vl; i++){",
          "\t\t\tmyPoints.push(" + l(T, "vertices") + ");",
          "\t\t\tmyInTangents.push(" + l(T, "inTangents") + ");",
          "\t\t\tmyOutTangents.push(" + l(T, "outTangents") + ");",
          "\t\t}",
          "\t\tcreatePath(myPoints, myInTangents, myOutTangents, k1.closed);",
          "}",
          "////////////",
        ].join("\n");
        if (aeVersion >= 15) {
          p[L].expression = g + J;
        } else {
          p[L].expression = g + J;
        }
        for (V = p[L].numKeys; V > 0; V--) {
          p[L].removeKey(V);
        }
        if (z) {
          p[L].parentProperty.rotoBezier = false;
        }
      }
      writeLn(D.length + p.length + " properties bound to " + k);
      app.endUndoGroup();
    }
    function unBindSliders(existSliderNull) {
      function unbindAllSliderProps() {
        for (var b = 0; b < sliderProps.length; b += 1) {
          var propExp = sliderProps[b].expression;
          var ba = propExp.split("BEGIN SLIDER CODE");
          var be3 = ba[1].split("unArray");
          var be4 = be3[0];
          var bo = be4.split(/(\[|\])/gm);
          var deezKeys = [];
          for (var c = 2; c < bo.length; c = c + 4) {
            deezKeys.push(stringToArray(bo[c]));
          }
          var theDur = app.project.activeItem.frameDuration;
          for (var d = 0; d < deezKeys.length; d += 1) {
            sliderProps[b].setValueAtTime(theDur * d, deezKeys[d]);
          }
          sliderProps[b].expression = "";
        }
        for (var c = 0; c < sliderShapeProps.length; c += 1) {
          while (sliderShapeProps[c].numKeys >= 1) {
            sliderShapeProps[c].removeKey(sliderShapeProps[c].numKeys);
          }
          var propExp = sliderShapeProps[c].expression;
          if (propExp.indexOf("END SHAPE INFO") != -1) {
            var propExpSplit = propExp.split("END SHAPE INFO");
            var ba = propExpSplit[0].split("var k1=");
            var bo = ba[1].split(/(\{|\})/gm);
          } else {
            var bo = propExp.split(/(\{|\})/gm);
          }
          var keyArray = [];
          var keyNm = 1;
          for (var d = 2; d < bo.length; d = d + 4) {
            keyArray.push(eval("key" + keyNm + "={" + bo[d] + "}"));
            keyNm++;
          }
          var theDur = slideLyr.containingComp.frameDuration;
          var slidePropValues = [];
          var slidePropTimes = [];
          for (var dd = 0; dd < keyArray.length; dd += 1) {
            decompress(keyArray[dd], keyArray[0]);
            slidePropTimes.push(theDur * dd);
            slidePropValues.push(convertObjectToShape(keyArray[dd]));
          }
          sliderShapeProps[c].setValuesAtTimes(slidePropTimes, slidePropValues);
          sliderShapeProps[c].expression = "";
        }
      }
      myScript.refreshSlideNulls();
      var altPressed = alted;
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var lyrSelection = app.project.activeItem.selectedLayers;
      if (
        lyrSelection.length === 1 &&
        lyrSelection[0].comment.indexOf("slider controller&%^*$%") != -1
      ) {
        slideLyr = lyrSelection[0];
      } else {
        if (lyrSelection.length >= 0) {
          if (slideLyrs === []) {
            makeAlert(
              "To unbind, please select an Slider Null in your composition or select one from the dropdown list.",
            );
            return;
          }
          if (
            isValid(slideLyrs[existSliderNull]) &&
            slideLyrs[existSliderNull].containingComp == app.project.activeItem
          ) {
            slideLyr = slideLyrs[existSliderNull];
          } else {
            makeAlert("Cannot find a Slider Null to unbind.");
            return;
          }
        }
      }
      app.beginUndoGroup("unBind sliders");
      var sliderProps = [];
      var sliderShapeProps = [];
      if (!altPressed) {
        for (var a = 1; a <= app.project.activeItem.numLayers; a += 1) {
          sliderProps = [];
          sliderShapeProps = [];
          var sliderPropsTemp = findSliderProps(
            app.project.activeItem.layer(a),
            slideLyr,
          );
          for (var p = 0; p < sliderPropsTemp.length; p += 1) {
            if (
              sliderPropsTemp[p].propertyValueType === PropertyValueType.SHAPE
            ) {
              sliderShapeProps.push(sliderPropsTemp[p]);
            } else {
              sliderProps.push(sliderPropsTemp[p]);
            }
          }
          unbindAllSliderProps();
        }
      } else {
        for (var a = 0; a < lyrSelection.length; a += 1) {
          sliderProps = [];
          sliderShapeProps = [];
          if (lyrSelection[a].selectedProperties.length > 0) {
            sliderPropsTemp = returnSliderProps(
              lyrSelection[a].selectedProperties,
              slideLyr,
            );
          } else {
            sliderPropsTemp = findSliderProps(lyrSelection[a], slideLyr);
          }
          for (var p = 0; p < sliderPropsTemp.length; p += 1) {
            if (
              sliderPropsTemp[p].propertyValueType === PropertyValueType.SHAPE
            ) {
              sliderShapeProps.push(sliderPropsTemp[p]);
            } else {
              sliderProps.push(sliderPropsTemp[p]);
            }
          }
          unbindAllSliderProps();
        }
      }
      app.endUndoGroup();
    }
    function moveSlider(e) {
      if (isTrial) {
        makeAlert(
          "Moving controllers to the parent comp is not available in trial mode.",
        );
        return;
      }
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var g = e;
      var i = app.project.activeItem.selectedLayers;
      if (
        i.length === 1 &&
        i[0].comment.indexOf("slider controller&%^*$%") !== -1
      ) {
        q = i[0];
      } else {
        makeAlert("Please select one slider null.");
        return;
      }
      if (parComps.length === 0) {
        makeAlert(
          "This comp must be nested in another to move your controller to a parent comp.",
        );
        return;
      }
      var h = getCompInstances(app.project.activeItem, parComps[g]);
      if (nameConflictLayers(h)) {
        makeAlert(
          "There are multiple instances of this comp in the parent comp with the same name. Please make sure they have unique names before moving your controller to the parent comp.",
        );
        return;
      }
      var p = [];
      var t = q("ADBE Effect Parade");
      for (var v = 1; v <= t.numProperties; v += 1) {
        if (t.property(v).matchName == "ADBE Slider Control") {
          if (
            t
              .property(v)("ADBE Slider Control-0001")
              .expression.indexOf("SLIDER_UI") !== -1
          ) {
            makeAlert(
              "One or more of your sliders are controlled by a UI Slider. Delete the UI sliders using the UI Sliders panel and try again.",
            );
            return;
          }
          var l = {
            slideAnim: collectKeyframes(
              t.property(v)("ADBE Slider Control-0001"),
            ),
            slideName: t.property(v).name,
          };
          if (l.slideAnim !== null) {
          }
          p.push(l);
        }
      }
      if (nameConflict(q.name, parComps[g])) {
        makeAlert(
          ' a layer named "' +
            q.name +
            '" already exists in ' +
            parComps[g].name +
            ". Please rename your controller or your layer before moving it to avoid naming conflicts.",
        );
        return;
      }
      for (var w = 1; w <= parComps[g].numLayers; w += 1) {
        var k = parComps[g].layer(w);
        if (
          k.source instanceof CompItem &&
          k.source === app.project.activeItem
        ) {
          j = k.startTime;
          c = k;
        }
      }
      app.beginUndoGroup("MoveSlider");
      j = c.startTime;
      var x = parComps[g].layers.addNull();
      var d = x.source;
      x.replaceSource(q.source, true);
      d.remove();
      x.name = q.name;
      x.comment += "slider controller&%^*$%";
      for (var u = 0; u < p.length; u += 1) {
        var r = x("ADBE Effect Parade").addProperty("ADBE Slider Control");
        r.name = p[u].slideName;
        if (p[u].slideAnim !== null) {
          for (var n = 0; n < p[u].slideAnim.length; n += 1) {
            p[u].slideAnim[n].curKeyTime += j;
          }
          transferKeyframes(r("ADBE Slider Control-0001"), p[u].slideAnim);
        } else {
          r("ADBE Slider Control-0001").setValue(
            t.property(u + 1)("ADBE Slider Control-0001").value,
          );
        }
        if (h[0]) {
          var f = h[0].name;
        } else {
          return;
        }
        var m = parComps[g].name;
        var o = [
          'var lyr = comp("' + m + '").layer("' + f + '")',
          "var s = lyr.startTime;",
          'comp("' +
            parComps[g].name +
            '").layer("' +
            x.name +
            '")("ADBE Effect Parade")(' +
            u +
            1 +
            ')("ADBE Slider Control-0001").valueAtTime(time+s);',
        ].join("\n");
        t.property(u + 1)("ADBE Slider Control-0001").expression = o;
      }
      app.endUndoGroup();
    }
    function sliderUI() {
      var r = app.project.activeItem;
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var x = r.selectedLayers;
      if (x.length === 0 || x.length > 1) {
        makeAlert(
          "Select some sliders from your Slider controller null or the null itself to make UI sliders.",
        );
        return;
      }
      app.beginUndoGroup("CreateUIslider");
      var D = x[0];
      var G = filterSliderProps(D);
      if (G === null) {
        return;
      }
      var w = spreadValues(G.length, r.height, 100);
      for (var C = 0; C < G.length; C += 1) {
        var j = G[C].parentProperty.name;
        if (
          nameConflict(j, r) ||
          nameConflict(j + " Origin", r) ||
          nameConflict(j + " label", r)
        ) {
          makeAlert(
            "Naming Conflict!\nLayers exist in your comp that conflict with your slider names. Please give them unique names before creating UI sliders.",
          );
          return;
        }
      }
      if (nameDupeArray(G)) {
        makeAlert(
          "Naming Conflict!\nThe sliders in your slider null must have unique names before being converted to UI sliders.",
        );
        return;
      }
      for (var E = 0; E < G.length; E += 1) {
        var j = G[E].parentProperty.name;
        var i = G[E].isTimeVarying;
        if (!i) {
          A = G[E].value;
        }
        var c = r.layers.addShape();
        c.name = j + " Origin";
        try {
          c.applyPreset(slideOriginPresetPath);
        } catch (h) {}
        var z = r.layers.addSolid([1, 1, 1], j, 75, 75, 1);
        z;
        try {
          z.applyPreset(slidePresetPath);
        } catch (h) {}
        z.collapseTransformation = true;
        if (!hasEffect(z, "Pseudo/fL3c11baf7UVr")) {
          try {
            z.applyPreset(slidePseudoPath);
          } catch (h) {}
        }
        var v = z.property("ADBE Mask Parade")(1);
        var s = z.property("ADBE Mask Parade")(2);
        if (s.maskMode !== MaskMode.INTERSECT) {
          s.moveTo(1);
        }
        z.property("ADBE Mask Parade")(1).locked = true;
        z.property("ADBE Mask Parade")(2).locked = true;
        z.parent = c;
        var u =
          'temp = thisComp.layer("' +
          j +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0002");\n                    [temp, -4.5];';
        var t =
          'temp = thisComp.layer("' +
          j +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0002");\n                    [temp, 100];';
        var q =
          'var a = thisComp.layer("' +
          j +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0005");\n                    if(a == true){2;}else{1;}';
        var p =
          'thisComp.layer("' +
          z.name +
          '")("ADBE Transform Group")("ADBE Position_0")';
        c.property("ADBE Root Vectors Group")(3)("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = u;
        c.property("ADBE Root Vectors Group")(4)("ADBE Vector Transform Group")(
          "ADBE Vector Scale",
        ).expression = t;
        c.property("ADBE Root Vectors Group")("ADBE Vector Filter - Repeater")(
          "ADBE Vector Repeater Copies",
        ).expression = q;
        var p =
          '//////// BEGIN SLIDER_UI CODE /////// \n var myLimit = thisComp.layer("' +
          z.name +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0002");\n                    var myMaster = thisComp.layer("' +
          z.name +
          '")("ADBE Transform Group")("ADBE Position_0");\n                    linear(myMaster, -myLimit, myLimit, -100,100);';
        c.property("ADBE Transform Group")("ADBE Position").setValue([
          250,
          w[E],
        ]);
        G[E].expression = p;
        var f = z.property("ADBE Transform Group")("ADBE Position_0");
        if (!i) {
          f.setValue(A);
        } else {
          var y = collectKeyframes(G[E]);
          transferKeyframes(f, y);
        }
        while (G[E].numKeys > 0) {
          G[E].removeKey(1);
        }
        z.guideLayer = true;
        c.guideLayer = true;
        z.property("ADBE Transform Group")("ADBE Rotate Z").expression = "0;";
        var o =
          'var a = thisLayer("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0004");\n  [a,a];';
        z.property("ADBE Transform Group")("ADBE Scale").expression = o;
        var n =
          'var a = thisComp.layer("' +
          z.name +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0001");\n if(a == true){-90;}else{0;}';
        c.property("ADBE Transform Group")("ADBE Rotate Z").expression = n;
        var m =
          'var a = thisComp.layer("' +
          z.name +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0003")*2;\n [a,a];';
        c.property("ADBE Transform Group")("ADBE Scale").expression = m;
        var l =
          'var theLimit=thisLayer("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0002").value;\n                var a=thisLayer("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0005").value;\n                if(a==true){\n                clamp(value,-theLimit,theLimit);\n            }else{clamp(value,0,theLimit);\n            }';
        z
          .property("ADBE Transform Group")("ADBE Position")
          .getSeparationFollower(0).expression = l;
        while (z.property("ADBE Effect Parade").numProperties > 1) {
          var e = z.property("ADBE Effect Parade");
          e.property(e.numProperties).remove();
        }
        var F = r.layers.addText(new TextDocument(j + " label"));
        F.parent = c;
        var g = F.property("ADBE Text Properties")("ADBE Text Document");
        var B = g.value;
        B.resetCharStyle();
        B.fontSize = 50;
        B.fillColor = [1, 1, 1];
        B.justification = ParagraphJustification.CENTER_JUSTIFY;
        B.font = "Verdana";
        B.text = j;
        g.setValue(B);
        F.name = j + " label";
        F.property("ADBE Transform Group")("ADBE Position").setValue([0, 23]);
        var k =
          'thisComp.layer("' +
          c.name +
          '")("ADBE Transform Group")("ADBE Rotate Z")*-1;';
        F.property("ADBE Transform Group")("ADBE Scale").expression =
          "[50,50];";
        F.property("ADBE Transform Group")("ADBE Rotate Z").expression = k;
        var d =
          'var x = thisComp.layer("' +
          j +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0001");\n                var a = thisComp.layer("' +
          j +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0002");\n                var b = thisComp.layer("' +
          j +
          '")("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")("Pseudo/fL3c11baf7UVr-0005");\n                if(x == false || b == false){value;}\n                else{[value[0]-(a+15), value[1]]}';
        F.property("ADBE Transform Group")("ADBE Position").expression = d;
        F.guideLayer = true;
      }
      app.endUndoGroup();
    }
    function deleteSliderUI() {
      var c = [];
      var i = app.project.activeItem;
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var l = i.selectedLayers;
      if (l.length === 0) {
        makeAlert("Select some of your Slider UI controllers to delete them");
        return;
      }
      app.beginUndoGroup("Delete UI sliders");
      for (var o = 0; o < l.length; o += 1) {
        if (isUIsolid(l[o]) && getMasterProp(l[o]) !== null) {
          var h = getMasterProp(l[o]);
          h.expression = "";
          var n =
            l[o].property("ADBE Effect Parade")("Pseudo/fL3c11baf7UVr")(
              "Pseudo/fL3c11baf7UVr-0002",
            ).value * 0.01;
          n = 1 / n;
          var d = l[o].property("ADBE Transform Group")("ADBE Position_0");
          d.expression = "";
          var p = collectKeyframes(d);
          if (p !== null) {
            for (var m = 0; m < p.length; m += 1) {
              p[m].curKeyValue *= n;
              if (
                p[m].inin != KeyframeInterpolationType.HOLD ||
                p[m].outin != KeyframeInterpolationType.HOLD
              ) {
                p[m].ie.speed *= n;
                p[m].oe.speed *= n;
              }
            }
            transferKeyframes(h, p);
          } else {
            h.setValue(d.value * n);
          }
          var k = l[o].parent;
          if (k !== null) {
            c.push(k);
          }
          for (var g = 1; g < i.numLayers; g += 1) {
            if (i.layer(g).parent === k && i.layer(g) !== l[o]) {
              c.push(i.layer(g));
            }
          }
          c.push(l[o]);
        }
      }
      for (var e = 0; e < c.length; e += 1) {
        c[e].remove();
      }
      app.endUndoGroup();
    }
    function updatePathsForJoysticks(lyrSelection, controllerPush) {
      controllerPush.push(lyrSelection);
      if (lyrSelection instanceof Array) {
        joyLyr = lyrSelection[0];
      } else {
        joyLyr = lyrSelection;
      }
      var joyLyrsInfoPack = findJoysticksInChildComps(joyLyr, "joystick");
      var joyLyrs = joyLyrsInfoPack.sticks;
      for (var zxz = 0; zxz < joyLyrs.length; zxz += 1) {
        joyLyr = joyLyrs[zxz];
        for (var b = 1; b <= joyLyr.containingComp.numLayers; b += 1) {
          if (joyLyr.containingComp.layer(b) != joyLyr) {
            var tempDoo = [];
            tempDoo.push(joyLyr.containingComp.layer(b));
            if (
              tempDoo[0].comment.indexOf("joystick&%^*$%") !== -1 &&
              findJoystickProps(tempDoo[0], joyLyr).length > 0 &&
              controllerUnchecked(tempDoo[0], controllerPush)
            ) {
              updatePathsForJoysticks(tempDoo, controllerPush);
            } else {
              if (
                tempDoo[0].comment.indexOf("slider controller&%^*$%") !== -1 &&
                findJoystickProps(tempDoo[0], joyLyr).length > 0 &&
                controllerUnchecked(tempDoo[0], controllerPush)
              ) {
                updatePathsForSliders(tempDoo, controllerPush);
              }
            }
          }
          var joyShapeProps = findJoystickShapeProps(
            joyLyr.containingComp.layer(b),
            joyLyr,
          );
          for (var n = 0; n < joyShapeProps.length; n += 1) {
            var theseTimes = [];
            var theseShapes = [];
            var propExp = joyShapeProps[n].expression;
            var ba = propExp.split("var key1");
            var be = ba[1];
            var bo = be.split(/(\{|\})/gm);
            eval("key1 = {" + bo[2] + "};");
            eval("key2 = {" + bo[6] + "};");
            eval("key3 = {" + bo[10] + "};");
            eval("key4 = {" + bo[14] + "};");
            eval("key5 = {" + bo[18] + "};");
            decompress(key2, key1);
            decompress(key3, key1);
            decompress(key4, key1);
            decompress(key5, key1);
            var wrkStart =
              joyLyrsInfoPack.offsets[joyLyrsInfoPack.offsets.length - 1];
            var wrkEnd = wrkStart + joyLyrsInfoPack.wrkDur;
            var myWatch = wrkStart;
            var joyLyrPosHolder = [];
            var morphValues = new Object();
            if (
              hasEffect(
                propWalker(joyShapeProps[n], 0),
                "Pseudo/1k48264d77gIB",
              ) &&
              propWalker(joyShapeProps[n], 0)("ADBE Effect Parade")(
                "Pseudo/1k48264d77gIB",
              ).enabled
            ) {
              var pseudoProp = propWalker(
                joyShapeProps[n],
                0,
              )("ADBE Effect Parade")("Pseudo/1k48264d77gIB");
              morphValues.slideR = pseudoProp(
                "Pseudo/1k48264d77gIB-0001",
              ).value;
              morphValues.slideL = pseudoProp(
                "Pseudo/1k48264d77gIB-0002",
              ).value;
              morphValues.slideU = pseudoProp(
                "Pseudo/1k48264d77gIB-0003",
              ).value;
              morphValues.slideD = pseudoProp(
                "Pseudo/1k48264d77gIB-0004",
              ).value;
            } else {
              morphValues.slideR = 0;
              morphValues.slideL = 0;
              morphValues.slideU = 0;
              morphValues.slideD = 0;
            }
            while (myWatch < wrkEnd) {
              var limitVal = joyLyr
                .property(
                  "ADBE Effect Parade",
                )("joystickLimit")("ADBE Slider Control-0001")
                .valueAtTime(myWatch, false);
              var stickPosVal = joyLyr
                .property("ADBE Transform Group")("ADBE Position")
                .valueAtTime(myWatch, false);
              if (stickPosVal.toString() == joyLyrPosHolder.toString()) {
                theseTimes.push(myWatch);
                theseShapes.push(shapeHolder);
                myWatch += joyLyr.containingComp.frameDuration;
              } else {
                var feathRadiiArray = [
                  key1.featherRadii,
                  key2.featherRadii,
                  key3.featherRadii,
                  key4.featherRadii,
                  key5.featherRadii,
                ];
                var theNewShape = new Shape();
                theNewShape.closed = key1.closed;
                theNewShape.vertices = joyShapeGroupRemap(
                  myWatch,
                  stickPosVal,
                  limitVal,
                  key1.vertices,
                  key2.vertices,
                  key3.vertices,
                  key4.vertices,
                  key5.vertices,
                  "vertices",
                  morphValues,
                );
                theNewShape.inTangents = joyShapeGroupRemap(
                  myWatch,
                  stickPosVal,
                  limitVal,
                  key1.inTangents,
                  key2.inTangents,
                  key3.inTangents,
                  key4.inTangents,
                  key5.inTangents,
                  "inTangents",
                  morphValues,
                );
                theNewShape.outTangents = joyShapeGroupRemap(
                  myWatch,
                  stickPosVal,
                  limitVal,
                  key1.outTangents,
                  key2.outTangents,
                  key3.outTangents,
                  key4.outTangents,
                  key5.outTangents,
                  "outTangents",
                  morphValues,
                );
                var segLocsHolder = joyShapeGroupRemap(
                  myWatch,
                  stickPosVal,
                  limitVal,
                  key1.featherSegLocs,
                  key2.featherSegLocs,
                  key3.featherSegLocs,
                  key4.featherSegLocs,
                  key5.featherSegLocs,
                  "featherSegLocs",
                  morphValues,
                );
                for (var b1 = 0; b1 < segLocsHolder.length; b1 += 1) {
                  segLocsHolder[b1] = Math.round(segLocsHolder[b1]);
                }
                theNewShape.featherSegLocs = moMax(segLocsHolder, 0);
                theNewShape.featherRelSegLocs = moClamp(
                  joyShapeGroupRemap(
                    myWatch,
                    stickPosVal,
                    limitVal,
                    key1.featherRelSegLocs,
                    key2.featherRelSegLocs,
                    key3.featherRelSegLocs,
                    key4.featherRelSegLocs,
                    key5.featherRelSegLocs,
                    "featherRelSegLocs",
                    morphValues,
                  ),
                  0,
                  1,
                );
                theNewShape.featherRadii = joyShapeGroupRemap(
                  myWatch,
                  stickPosVal,
                  limitVal,
                  key1.featherRadii,
                  key2.featherRadii,
                  key3.featherRadii,
                  key4.featherRadii,
                  key5.featherRadii,
                  "featherRadii",
                  morphValues,
                );
                theNewShape.featherInterps = key1.featherInterps;
                theNewShape.featherTensions = moClamp(
                  joyShapeGroupRemap(
                    myWatch,
                    stickPosVal,
                    limitVal,
                    key1.featherTensions,
                    key2.featherTensions,
                    key3.featherTensions,
                    key4.featherTensions,
                    key5.featherTensions,
                    "featherTensions",
                    morphValues,
                  ),
                  0,
                  1,
                );
                theNewShape.featherTypes = key1.featherTypes;
                theNewShape.featherRelCornerAngles = moClamp(
                  joyShapeGroupRemap(
                    myWatch,
                    stickPosVal,
                    limitVal,
                    key1.featherRelCornerAngles,
                    key2.featherRelCornerAngles,
                    key3.featherRelCornerAngles,
                    key4.featherRelCornerAngles,
                    key5.featherRelCornerAngles,
                    "featherRelCornerAngles",
                    morphValues,
                  ),
                  0,
                  100,
                );
                theseTimes.push(myWatch);
                theseShapes.push(theNewShape);
                shapeHolder = theNewShape;
                joyLyrPosHolder = stickPosVal;
                myWatch += joyLyr.containingComp.frameDuration;
              }
            }
            joyShapeProps[n].setValuesAtTimes(theseTimes, theseShapes);
            joyShapeProps[n].selected = false;
          }
        }
      }
    }
    function updateP(g) {
      myScript.refreshJoystickies();
      if (!isValid(app.project.activeItem)) {
        makeAlert("You will need an active composition to work in.");
        return;
      }
      var f = app.project.activeItem.selectedLayers;
      var b = [];
      var h = alted;
      if (!h) {
        if (
          f.length > 1 ||
          f.length === 0 ||
          (f[0].comment.indexOf("joystick&%^*$%") == -1 &&
            f[0].comment.indexOf("slider controller&%^*$%") == -1 &&
            !isUIsolid(f[0]))
        ) {
          if (joyLyrs === []) {
            makeAlert(
              "Please select a controller in your composition or select one from the dropdown list.",
            );
            return;
          } else {
            if (
              isValid(joyLyrs[g]) &&
              joyLyrs[g].containingComp == app.project.activeItem
            ) {
              i = joyLyrs[g];
            } else {
              makeAlert(
                "To update pathShapes, either select a controller from your timeline or from the dropdown menu.",
              );
            }
          }
        } else {
          i = f[0];
          if (!isValid(i)) {
            return;
          }
        }
        if (!isValid(i)) {
          return;
        }
        if (controllerUnchecked(i, b)) {
          if (i.comment.indexOf("joystick&%^*$%") != -1) {
            updatePathsForJoysticks(i, b);
          } else {
            if (i.comment.indexOf("slider controller&%^*$%") != -1) {
              updatePathsForSliders(i, b);
            } else {
              if (isUIsolid(i)) {
                var k = getMasterProp(i);
                var c = propWalker(k, 0);
                var e = c;
                updatePathsForSliders(e, b);
              }
            }
          }
        }
      } else {
        for (var j = 1; j <= app.project.activeItem.numLayers; j += 1) {
          i = app.project.activeItem.layer(j);
          if (controllerUnchecked(i, b)) {
            if (i.comment.indexOf("joystick&%^*$%") != -1) {
              updatePathsForJoysticks(i, b);
            } else {
              if (i.comment.indexOf("slider controller&%^*$%") != -1) {
                updatePathsForSliders(i, b);
              } else {
                if (isUIsolid(i)) {
                  var k = getMasterProp(i);
                  var c = propWalker(k, 0);
                  var e = c;
                  updatePathsForSliders(e, b);
                }
              }
            }
          }
        }
      }
    }
    function controllerUnchecked(c, b) {
      var a = true;
      if (b.length > 0) {
        for (var d = 0; d < b.length; d += 1) {
          if (b[d] == c) {
            a = false;
          }
        }
      }
      return a;
    }
    function getCompInstances(a, d) {
      var b = [];
      for (var c = 1; c <= d.numLayers; c += 1) {
        if (d.layer(c).source === a) {
          b.push(d.layer(c));
        }
      }
      return b;
    }
    function nameConflictLayers(e) {
      var b = false;
      for (var c = 0; c < e.length; c += 1) {
        var a = e[c].name;
        for (var f = 0; f < e.length; f += 1) {
          var d = e[0].name;
          if (f !== c && d == a) {
            b = true;
          }
        }
      }
      return b;
    }
    function updatePathsForSliders(lyrSelection, controllerPush) {
      if (lyrSelection instanceof Array) {
        slideLyr = lyrSelection[0];
      } else {
        slideLyr = lyrSelection;
      }
      controllerPush.push(slideLyr);
      var slideLyrsInfoPack = findJoysticksInChildComps(slideLyr, "slider");
      var slideLyrs = slideLyrsInfoPack.sticks;
      var slideLyrsCollection = [];
      for (var u = 0; u < slideLyrsInfoPack.offsets.length; u += 1) {
        slideLyrsCollection.push(slideLyrsInfoPack.offsets[u]);
      }
      for (var zxz = 0; zxz < slideLyrs.length; zxz += 1) {
        slideLyr = slideLyrs[zxz];
        for (var b = 1; b <= slideLyr.containingComp.numLayers; b += 1) {
          if (slideLyr.containingComp.layer(b) != slideLyr) {
            var tempDoo = [];
            tempDoo.push(slideLyr.containingComp.layer(b));
            if (
              tempDoo[0].comment.indexOf("joystick&%^*$%") !== -1 &&
              findSliderProps(tempDoo[0], slideLyr).length > 0 &&
              controllerUnchecked(tempDoo[0], controllerPush)
            ) {
              updatePathsForJoysticks(tempDoo, controllerPush);
            } else {
              if (
                tempDoo[0].comment.indexOf("slider controller&%^*$%") !== -1 &&
                findSliderProps(tempDoo[0], slideLyr).length > 0 &&
                controllerUnchecked(tempDoo[0], controllerPush)
              ) {
                updatePathsForSliders(tempDoo, controllerPush);
              }
            }
          }
          var slideShapeProps = findSliderShapeProps(
            slideLyr.containingComp.layer(b),
            slideLyr,
          );
          for (var n = 0; n < slideShapeProps.length; n += 1) {
            var theseTimes = [];
            var theseShapes = [];
            var propExp = slideShapeProps[n].expression;
            if (propExp.indexOf("END SHAPE INFO") != -1) {
              var propExpSplit = propExp.split("END SHAPE INFO");
              var ba = propExpSplit[0].split("var k1");
              var be = ba[1];
              var bo = be.split(/(\{|\})/gm);
            } else {
              var bo = propExp.split(/(\{|\})/gm);
            }
            var keyArray = [];
            var keyNm = 1;
            for (var d = 2; d < bo.length; d = d + 4) {
              var hh = eval("({" + bo[d] + "})");
              if (d !== 2) {
                decompress(hh, keyArray[0]);
              }
              keyArray.push(hh);
              keyNm++;
            }
            var wrkStart =
              slideLyrsInfoPack.offsets[slideLyrsInfoPack.offsets.length - 1];
            var wrkEnd = wrkStart + slideLyrsInfoPack.wrkDur;
            var myWatch = wrkStart;
            var slidePosHolder = [];
            var df = slideLyr("ADBE Effect Parade");
            while (myWatch < wrkEnd) {
              var slidePos = [];
              for (var f = 1; f <= df.numProperties; f += 1) {
                var slP = df.property(f)("ADBE Slider Control-0001");
                slidePos.push(slP.valueAtTime(myWatch, false));
              }
              if (slidePosHolder.toString() === slidePos.toString()) {
                theseTimes.push(myWatch);
                theseShapes.push(shapeHolder);
                myWatch += slideLyr.containingComp.frameDuration;
              } else {
                var feathRadiiArray = [];
                for (var a1 = 0; a1 < keyArray.length; a1 += 1) {
                  feathRadiiArray.push(keyArray[a1].featherRadii);
                }
                var theNewShape = new Shape();
                theNewShape.closed = keyArray[0].closed;
                theNewShape.vertices = slideShapeGroupRemap(
                  myWatch,
                  slidePos,
                  100,
                  keyArray,
                  "vertices",
                );
                theNewShape.inTangents = slideShapeGroupRemap(
                  myWatch,
                  slidePos,
                  100,
                  keyArray,
                  "inTangents",
                );
                theNewShape.outTangents = slideShapeGroupRemap(
                  myWatch,
                  slidePos,
                  100,
                  keyArray,
                  "outTangents",
                );
                theNewShape.featherSegLocs = moMax(
                  slideShapeGroupRemap(
                    myWatch,
                    slidePos,
                    100,
                    keyArray,
                    "featherSegLocs",
                  ),
                  0,
                );
                theNewShape.featherRelSegLocs = moClamp(
                  slideShapeGroupRemap(
                    myWatch,
                    slidePos,
                    100,
                    keyArray,
                    "featherRelSegLocs",
                  ),
                  0,
                  1,
                );
                theNewShape.featherRadii = slideShapeGroupRemap(
                  myWatch,
                  slidePos,
                  100,
                  keyArray,
                  "featherRadii",
                );
                theNewShape.featherInterps = keyArray[0].featherInterps;
                theNewShape.featherTensions = moClamp(
                  slideShapeGroupRemap(
                    myWatch,
                    slidePos,
                    100,
                    keyArray,
                    "featherTensions",
                  ),
                  0,
                  1,
                );
                theNewShape.featherRelCornerAngles = moClamp(
                  slideShapeGroupRemap(
                    myWatch,
                    slidePos,
                    100,
                    keyArray,
                    "featherRelCornerAngles",
                  ),
                  0,
                  100,
                );
                theNewShape.featherTypes = keyArray[0].featherTypes;
                theseTimes.push(myWatch);
                theseShapes.push(theNewShape);
                shapeHolder = theNewShape;
                slidePosHolder = slidePos;
                myWatch += slideLyr.containingComp.frameDuration;
              }
            }
            slideShapeProps[n].setValuesAtTimes(theseTimes, theseShapes);
            propWalker(slideShapeProps[n], 0).selected = false;
          }
        }
      }
    }
    function repopulateSwitchList(d) {
      var c = [];
      if (app.project.numItems === 0 || !isValid(app.project.activeItem)) {
        return;
      }
      for (var b = 1; b <= app.project.numItems; b += 1) {
        c.push(app.project.item(b));
      }
      for (var a = 0; a < c.length; a += 1) {
        if (c[a] instanceof CompItem) {
          if (
            c[a].width === 1000 &&
            c[a].height === 1000 &&
            c[a].comment.indexOf("Stemplate") !== -1
          ) {
            d.push(c[a]);
          }
        }
      }
    }
    function repopulateParCompList(d) {
      if (app.project.numItems == 0 || !isValid(app.project.activeItem)) {
        return;
      }
      var c = app.project.activeItem.usedIn;
      for (var b = 0; b < c.length; b += 1) {
        d.push(c[b]);
      }
    }
    function repopulateJoystickList(e) {
      var d = [];
      if (app.project.numItems === 0 || !isValid(app.project.activeItem)) {
        return;
      }
      for (var b = 1; b <= app.project.activeItem.numLayers; b += 1) {
        d.push(app.project.activeItem.layer(b));
      }
      var c = [];
      for (var a = 0; a < d.length; a += 1) {
        if (d[a].comment.indexOf("joystick&%^*$%") !== -1) {
          e.push(d[a]);
        }
      }
    }
    function repopulateSliderList(e) {
      var d = [];
      if (app.project.numItems === 0 || !isValid(app.project.activeItem)) {
        return;
      }
      for (var b = 1; b <= app.project.activeItem.numLayers; b += 1) {
        d.push(app.project.activeItem.layer(b));
      }
      var c = [];
      for (var a = 0; a < d.length; a += 1) {
        if (d[a].comment.indexOf("slider controller&%^*$%") !== -1) {
          e.push(d[a]);
        }
      }
    }
    function returnValidSelectedProps(b) {
      var d = [];
      for (var c = 0; c < b.length; c += 1) {
        var a = b[c];
        if (
          a instanceof Property &&
          propTypeTest(a) &&
          a.canSetExpression &&
          a.expression.indexOf("BEGIN JOYSTICK SHAPE CODE") == -1 &&
          a.expression.indexOf("SLIDER SHAPE CODE") == -1
        ) {
          if (
            a.numKeys >= 5 &&
            a.keyTime(1) === 0 &&
            Math.round(a.keyTime(2) * 100) ===
              Math.round(app.project.activeItem.frameDuration * 100) &&
            Math.round(a.keyTime(3) * 100) ===
              Math.round(2 * app.project.activeItem.frameDuration * 100) &&
            Math.round(a.keyTime(4) * 100) ===
              Math.round(3 * app.project.activeItem.frameDuration * 100) &&
            Math.round(a.keyTime(5) * 100) ===
              Math.round(4 * app.project.activeItem.frameDuration * 100)
          ) {
            d.push(a);
          }
        }
      }
      return d;
    }
    function findValidProps(b) {
      var a = [];
      validPropDig(b, a);
      return a;
    }
    function validPropDig(e, b) {
      for (var d = 1; d <= e.numProperties; d += 1) {
        var a = e.property(d);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          validPropDig(a, b);
        } else {
          if (
            a instanceof Property &&
            propTypeTest(a) &&
            a.canSetExpression &&
            a.expression.indexOf("BEGIN JOYSTICK SHAPE CODE") == -1 &&
            a.expression.indexOf("SLIDER SHAPE CODE") == -1
          ) {
            if (
              a.numKeys >= 5 &&
              a.keyTime(1) === 0 &&
              Math.round(a.keyTime(2) * 100) ===
                Math.round(app.project.activeItem.frameDuration * 100) &&
              Math.round(a.keyTime(3) * 100) ===
                Math.round(2 * app.project.activeItem.frameDuration * 100) &&
              Math.round(a.keyTime(4) * 100) ===
                Math.round(3 * app.project.activeItem.frameDuration * 100) &&
              Math.round(a.keyTime(5) * 100) ===
                Math.round(4 * app.project.activeItem.frameDuration * 100)
            ) {
              b.push(a);
            }
          }
        }
      }
    }
    function hasKeyHere(c, b) {
      for (var a = 1; a <= c.numKeys; a += 1) {
        if (c.keyTime(a) == b) {
          return true;
        }
      }
      return false;
    }
    function getAllProps(e, b) {
      for (var d = 1; d <= e.numProperties; d += 1) {
        var a = e.property(d);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          getAllProps(a, b);
        } else {
          if (
            a instanceof Property &&
            a.canSetExpression &&
            a.canVaryOverTime &&
            propTypeTest(a)
          ) {
            if (a.propertyValueType != PropertyValueType.SHAPE) {
              b.push(a);
            }
          }
        }
      }
    }
    function propTypeTest(a) {
      switch (a.propertyValueType) {
        case PropertyValueType.ThreeD_SPATIAL:
        case PropertyValueType.ThreeD:
        case PropertyValueType.TwoD_SPATIAL:
        case PropertyValueType.TwoD:
        case PropertyValueType.OneD:
        case PropertyValueType.COLOR:
        case PropertyValueType.SHAPE:
          return true;
        default:
          return false;
      }
    }
    function returnJoystickProps(d, e) {
      var c = [];
      for (var b = 0; b < d.length; b += 1) {
        var a = d[b];
        if (a instanceof Property && propTest2(a, e, "JOYSTICK CODE")) {
          c.push(a);
        }
      }
      return c;
    }
    function findJoystickProps(a, c) {
      var b = [];
      validJoyPropDig(a, b, c);
      return b;
    }
    function validJoyPropDig(f, c, b) {
      for (var e = 1; e <= f.numProperties; e += 1) {
        var a = f.property(e);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          validJoyPropDig(a, c, b);
        } else {
          if (a instanceof Property && propTest2(a, b, "JOYSTICK CODE")) {
            c.push(a);
          }
        }
      }
    }
    function findJoystickShapeProps(a, c) {
      var b = [];
      validJoyShapePropDig(a, b, c);
      return b;
    }
    function validJoyShapePropDig(f, c, b) {
      for (var e = 1; e <= f.numProperties; e += 1) {
        var a = f.property(e);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          validJoyShapePropDig(a, c, b);
        } else {
          if (a instanceof Property && propTest2(a, b, "JOYSTICK SHAPE CODE")) {
            c.push(a);
          }
        }
      }
    }
    function findSliderShapeProps(a, c) {
      var b = [];
      validSliderShapePropDig(a, b, c);
      return b;
    }
    function validSliderShapePropDig(f, c, b) {
      for (var e = 1; e <= f.numProperties; e += 1) {
        var a = f.property(e);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          validSliderShapePropDig(a, c, b);
        } else {
          if (a instanceof Property && propTest2(a, b, "SLIDER SHAPE CODE")) {
            c.push(a);
          }
        }
      }
    }
    function returnSliderProps(d, e) {
      var b = [];
      for (var c = 0; c < d.length; c += 1) {
        var a = d[c];
        if (
          a instanceof Property &&
          (propTest2(a, e, "SLIDER CODE") ||
            propTest2(a, e, "SLIDER SHAPE CODE"))
        ) {
          b.push(a);
        }
      }
      return b;
    }
    function findSliderProps(a, c) {
      var b = [];
      validSlidePropDig(a, b, c);
      return b;
    }
    function validSlidePropDig(f, c, b) {
      for (var e = 1; e <= f.numProperties; e += 1) {
        var a = f.property(e);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          validSlidePropDig(a, c, b);
        } else {
          if (
            a instanceof Property &&
            (propTest2(a, b, "SLIDER CODE") ||
              propTest2(a, b, "SLIDER SHAPE CODE"))
          ) {
            c.push(a);
          }
        }
      }
    }
    function qualifyingSliderProps(e, f) {
      var d = [];
      for (var b = 0; b < e.length; b += 1) {
        if (e[b].selectedProperties.length > 0) {
          for (var g = 0; g < e[b].selectedProperties.length; g += 1) {
            var a = e[b].selectedProperties[g];
            if (a instanceof Property) {
              if (
                f == true &&
                propTest4(a) &&
                propTypeTest(a) &&
                a.expression.indexOf("BEGIN JOYSTICK SHAPE CODE") == -1 &&
                a.expression.indexOf("SLIDER SHAPE CODE") == -1
              ) {
                d.push(a);
              } else {
                if (
                  propTest3(a) &&
                  propTypeTest(a) &&
                  a.expression.indexOf("BEGIN JOYSTICK SHAPE CODE") == -1 &&
                  a.expression.indexOf("SLIDER SHAPE CODE") == -1
                ) {
                  d.push(a);
                }
              }
            }
          }
        } else {
          qualifyingSliderPropsDig(e[b], d, f);
        }
      }
      return d;
    }
    function qualifyingSliderPropsDig(f, c, b) {
      for (var e = 1; e <= f.numProperties; e += 1) {
        var a = f.property(e);
        if (
          a.propertyType == PropertyType.INDEXED_GROUP ||
          a.propertyType == PropertyType.NAMED_GROUP
        ) {
          qualifyingSliderPropsDig(a, c, b);
        } else {
          if (a instanceof Property) {
            if (
              b == true &&
              propTest4(a) &&
              propTypeTest(a) &&
              a.expression.indexOf("BEGIN JOYSTICK SHAPE CODE") == -1 &&
              a.expression.indexOf("SLIDER SHAPE CODE") == -1
            ) {
              c.push(a);
            } else {
              if (
                propTest3(a) &&
                propTypeTest(a) &&
                a.expression.indexOf("BEGIN JOYSTICK SHAPE CODE") == -1 &&
                a.expression.indexOf("SLIDER SHAPE CODE") == -1
              ) {
                c.push(a);
              }
            }
          }
        }
      }
    }
    function propTest2(c, b, a) {
      if (c.canSetExpression) {
        if (
          c.expression.indexOf('"' + b.name + '"') !== -1 &&
          c.expression.indexOf(a) !== -1
        ) {
          return true;
        } else {
          return false;
        }
      }
      return false;
    }
    function propTest3(b) {
      if (b.canSetExpression && b.numKeys > 1) {
        if (b.keyTime(1) === 0) {
          var a = app.project.activeItem.frameDuration;
          if (b.keyTime(2) === a) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    function propTest4(a) {
      if (a.canSetExpression && a.numKeys > 0) {
        if (a.keyTime(1) === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    function stringToArray(daStr) {
      return eval("[" + daStr + "]");
    }
    function decompress(b, e) {
      var h = b.vertices.length;
      var g = b.inTangents.length;
      var d = b.outTangents.length;
      for (var c = 0; c < h; c += 1) {
        if (b.vertices[c][0] === null) {
          b.vertices[c] = e.vertices[c];
        }
      }
      for (var a = 0; a < g; a += 1) {
        if (b.inTangents[a][0] === null) {
          b.inTangents[a] = e.inTangents[a];
        }
      }
      for (var f = 0; f < d; f += 1) {
        if (b.outTangents[f][0] === null) {
          b.outTangents[f] = e.outTangents[f];
        }
      }
    }
    function hasThis(c, b) {
      for (var a = 0; a < b.length; a += 1) {
        if (b[a] == c) {
          return true;
        }
      }
      return false;
    }
    function arrayRemove(a, b) {
      var d = [];
      for (var c = 0; c < a.length; c += 1) {
        if (a[c] != b) {
          d.push(a[c]);
        }
      }
      return d;
    }
    function originLayer(f, d, g) {
      if (d == "toChild") {
        var c = f.containingComp;
        for (var b = 1; b <= c.numLayers; b += 1) {
          var e = [];
          getAllProps(c.layer(b), e);
          for (var h = 0; h < e.length; h += 1) {
            if (
              e[h].expression.indexOf("LIMIT CODE") !== -1 &&
              e[h].expression.indexOf(g.name) !== -1
            ) {
              return c.layer(b);
            }
          }
        }
      } else {
        var c = f.containingComp;
        for (var b = 1; b <= c.numLayers; b += 1) {
          var e = [];
          getAllProps(c.layer(b), e);
          for (var h = 0; h < e.length; h += 1) {
            if (
              e[h].expression.indexOf("LIMIT CODE") !== -1 &&
              e[h].expression.indexOf(f.name) !== -1
            ) {
              return c.layer(b);
            }
          }
        }
      }
    }
    function findJoysticksInChildComps(h, a) {
      var i = h.containingComp;
      var b = i.workAreaStart;
      var f = i.workAreaDuration;
      var d = [h];
      var e = [b];
      for (var g = 1; g <= i.numLayers; g += 1) {
        if (i.layer(g).source instanceof CompItem) {
          var c = i.layer(g).startTime;
          digForMoreControllers(i.layer(g).source, d, h, i, a, b, f, c, e);
        }
      }
      if (d.length > 1) {
        return { offsets: e, sticks: d, wrkDur: f };
      } else {
        return { offsets: [b], sticks: d, wrkDur: f };
      }
    }
    function digForMoreControllers(d, o, i, s, e, f, q, h, c) {
      var k = [];
      var g = [];
      var j = f - h;
      for (var p = 1; p <= d.numLayers; p += 1) {
        var r = false;
        if (e == "joystick") {
          n = d.layer(p).property("ADBE Transform Group")("ADBE Position");
        }
        if (
          d.layer(p).comment.indexOf("joystick&%^*$%") !== -1 &&
          e == "joystick"
        ) {
          r = true;
        }
        if (
          d.layer(p).comment.indexOf("slider controller&%^*$%") !== -1 &&
          e == "slider"
        ) {
          r = true;
          n = d.layer(p)("ADBE Effect Parade")(1)("ADBE Slider Control-0001");
        }
        if (
          r === true &&
          n.expression.indexOf('"' + i.name + '"') !== -1 &&
          n.expression.indexOf('"' + s.name + '"') !== -1
        ) {
          o.push(d.layer(p));
          k.push(d.layer(p));
          c.push(j);
        }
        if (d.layer(p).source instanceof CompItem) {
          g.push(d.layer(p));
        }
      }
      if (k.length > 0) {
        o.push(k[0]);
      }
      if (k.length > 0 && g.length > 0) {
        for (var m = 0; m < g.length; m += 1) {
          var l = g[m].startTime;
          digForMoreControllers(g[m].source, o, k[0], d, e, j, q, l, c);
        }
      }
    }
    function masterControllerClimb(f) {
      if (f.comment.indexOf("joystick&%^*$%") != -1) {
        var l = f.property("ADBE Transform Group")("ADBE Position").expression;
        if (l.length > 5 && l.indexOf('s = comp("') != -1) {
          var e = l.split(/"/gm);
          var i = e[1];
          var d = false;
          for (var j = 0; j < f.containingComp.usedIn.length; j += 1) {
            if (i == f.containingComp.usedIn[j].name) {
              c = f.containingComp.usedIn[j];
              d = true;
            }
          }
          if (d) {
            var k = false;
            for (var h = 1; h <= c.layer(h); h += 1) {
              if (c.layer(h).name == f.name) {
                g = c.layer(h);
                k = true;
              }
            }
            if (
              k &&
              g
                .property("ADBE Transform Group")("ADBE Position")
                .expression.indexOf('s = comp("') != -1
            ) {
              masterControllerClimb(g);
            } else {
              if (k) {
                return g;
              }
            }
          }
        } else {
          return f;
        }
      } else {
        if (f.comment.indexOf("slider controller&%^*$%") != -1) {
          var l = f.property("ADBE Effect Parade")("ADBE Slider Control")(
            "ADBE Slider Control-0001",
          ).expression;
          if (l.length > 5 && l.indexOf('s = comp("') != -1) {
            var e = l.split(/"/gm);
            var i = e[1];
            var d = false;
            for (var j = 0; j < f.containingComp.usedIn.length; j += 1) {
              if (i == f.containingComp.usedIn[j].name) {
                c = f.containingComp.usedIn[j];
                d = true;
              }
            }
            if (d) {
              var k = false;
              for (var h = 1; h <= c.layer(h); h += 1) {
                if (c.layer(h).name == f.name) {
                  g = c.layer(h);
                  k = true;
                }
              }
              if (
                k &&
                g
                  .property("ADBE Transform Group")("ADBE Position")
                  .expression.indexOf('s = comp("') != -1
              ) {
                masterControllerClimb(g);
              } else {
                if (k) {
                  return g;
                }
              }
            }
          } else {
            return f;
          }
        }
      }
    }
    function collectKeyframes(n) {
      if (n instanceof Property) {
        b = PropertyValueType.TwoD_SPATIAL;
        r = PropertyValueType.ThreeD_SPATIAL;
        s = new Array();
        h = n.numKeys;
        if (h > 0) {
          for (var p = 1; p <= h; p += 1) {
            u = n.keyTime(p);
            o = p;
            a = n.keyValue(p);
            t = n.keyInInterpolationType(o);
            g = n.keyOutInterpolationType(o);
            if (
              t == KeyframeInterpolationType.BEZIER &&
              g == KeyframeInterpolationType.BEZIER
            ) {
              v = n.keyTemporalAutoBezier(o);
              l = n.keyTemporalContinuous(o);
            }
            if (
              t != KeyframeInterpolationType.HOLD ||
              g != KeyframeInterpolationType.HOLD
            ) {
              k = n.keyInTemporalEase(o);
              m = n.keyOutTemporalEase(o);
            }
            if (n.propertyValueType == b || n.propertyValueType == r) {
              j = n.keySpatialAutoBezier(o);
              e = n.keySpatialContinuous(o);
              q = n.keyInSpatialTangent(o);
              c = n.keyOutSpatialTangent(o);
              f = n.keyRoving(o);
            }
            s[s.length] = {
              ab: v,
              cb: l,
              curKeyIndex: o,
              curKeyTime: u,
              curKeyValue: a,
              ie: k,
              inin: t,
              ist: q,
              oe: m,
              ost: c,
              outin: g,
              rov: f,
              sab: j,
              scb: e,
            };
          }
          return s;
        } else {
          return null;
        }
      }
    }
    function transferKeyframes(e, a) {
      try {
        if (e instanceof Property && a instanceof Array) {
          if (e.numKeys == 0) {
            keysAryLength = a.length;
            for (var b = 0; b < keysAryLength; b += 1) {
              g = e.addKey(a[b].curKeyTime);
              f = g;
              e.setValueAtKey(f, a[b].curKeyValue);
              e.setInterpolationTypeAtKey(f, a[b].inin, a[b].outin);
              if (
                a[b].inin == KeyframeInterpolationType.BEZIER &&
                a[b].outin == KeyframeInterpolationType.BEZIER &&
                a[b].cb
              ) {
                e.setTemporalContinuousAtKey(f, a[b].cb);
                e.setTemporalAutoBezierAtKey(f, a[b].ab);
              }
              if (
                a[b].inin != KeyframeInterpolationType.HOLD ||
                a[b].outin != KeyframeInterpolationType.HOLD
              ) {
                e.setTemporalEaseAtKey(f, a[b].ie, a[b].oe);
                e.setInterpolationTypeAtKey(f, a[b].inin, a[b].outin);
              }
              if (
                e.propertyValueType == PropertyValueType.TwoD_SPATIAL ||
                e.propertyValueType == PropertyValueType.ThreeD_SPATIAL
              ) {
                e.setSpatialContinuousAtKey(f, a[b].scb);
                e.setSpatialAutoBezierAtKey(f, a[b].sab);
                e.setSpatialTangentsAtKey(f, a[b].ist, a[b].ost);
                e.setRovingAtKey(f, a[b].rov);
              }
            }
            return true;
          } else {
            removeKeyframes(e);
            transferKeyframes(e, a);
            return true;
          }
        }
      } catch (d) {
        alert(d.line.toString() + "\r" + d.toString());
      }
    }
    function removeKeyframes(a) {
      if (a instanceof Property) {
        while (a.numKeys > 0) {
          a.removeKey(1);
        }
      }
    }
    function spreadValues(c, g, d) {
      var e = [];
      var b = Math.floor(c / 2);
      var f = g / 2 - b * d;
      for (var a = 1; a <= c; a += 1) {
        e.push(f);
        f = f + d;
      }
      return e;
    }
    function isUIsolid(a) {
      if (hasEffect(a, "Pseudo/fL3c11baf7UVr")) {
        return true;
      } else {
        return false;
      }
    }
    function hasEffect(c, d) {
      var b = c("ADBE Effect Parade");
      for (var a = 1; a <= b.numProperties; a += 1) {
        if (b.property(a).matchName == d) {
          return true;
        }
      }
      return false;
    }
    function getMasterProp(d) {
      var f = d.containingComp;
      for (var e = 1; e <= f.numLayers; e += 1) {
        if (f.layer(e) !== d) {
          var g = [];
          getAllProps(f.layer(e), g);
          for (var c = 0; c < g.length; c += 1) {
            if (propTest2(g[c], d, "SLIDER_UI")) {
              return g[c];
            }
          }
        }
      }
      return null;
    }
    function filterSliderProps(e) {
      var i = [];
      if (e.comment.indexOf("slider controller&%^*$%") == -1) {
        makeAlert(
          "Please select properties from your slider null if you have one.",
        );
        return null;
      } else {
        var h = e.selectedProperties;
        if (h.length > 0) {
          for (var f = 0; f < h.length; f += 1) {
            if (!hasThis(h[f], i)) {
              if (
                h[f].matchName === "ADBE Slider Control-0001" &&
                h[f].expression.indexOf("SLIDER_UI CODE") == -1
              ) {
                i.push(h[f]);
              } else {
                if (
                  h[f].matchName === "ADBE Slider Control" &&
                  !hasThis(h[f].property(1), i)
                ) {
                  if (
                    h[f].property(1).expression.indexOf("SLIDER_UI CODE") == -1
                  ) {
                    i.push(h[f].property(1));
                  }
                }
              }
            }
          }
        } else {
          var g = [];
          getAllProps(e, g);
          var d = [];
          for (var c = 0; c < g.length; c += 1) {
            if (
              g[c].matchName === "ADBE Slider Control-0001" &&
              g[c].expression.indexOf("SLIDER_UI CODE") == -1
            ) {
              d.push(g[c]);
            }
          }
          i = d;
        }
      }
      return i;
    }
    function maskKeyToString(c, a) {
      if (a) {
        var b = [
          "{",
          "closed: " + c.closed.toString() + ",",
          "vertices: [" +
            stringifyArray(compressArray(c.vertices, a.vertices)) +
            "],",
          "inTangents: [" +
            stringifyArray(compressArray(c.inTangents, a.inTangents)) +
            "],",
          "outTangents: [" +
            stringifyArray(compressArray(c.outTangents, a.outTangents)) +
            "],",
          "featherSegLocs: [" + c.featherSegLocs.toString() + "],",
          "featherRelSegLocs:[" + c.featherRelSegLocs.toString() + "],",
          "featherRadii:[" + c.featherRadii.toString() + "],",
          "featherInterps:[" + c.featherInterps.toString() + "],",
          "featherTensions:[" + c.featherTensions.toString() + "],",
          "featherTypes: [" + c.featherTypes.toString() + "],",
          "featherRelCornerAngles: [" + c.featherTypes.toString() + "]",
          "};",
        ].join("\n");
      } else {
        var b = [
          "{",
          "closed: " + c.closed.toString() + ",",
          "vertices: [" + stringifyArray(compressArray(c.vertices)) + "],",
          "inTangents: [" + stringifyArray(compressArray(c.inTangents)) + "],",
          "outTangents: [" +
            stringifyArray(compressArray(c.outTangents)) +
            "],",
          "featherSegLocs: [" + c.featherSegLocs.toString() + "],",
          "featherRelSegLocs:[" + c.featherRelSegLocs.toString() + "],",
          "featherRadii:[" + c.featherRadii.toString() + "],",
          "featherInterps:[" + c.featherInterps.toString() + "],",
          "featherTensions:[" + c.featherTensions.toString() + "],",
          "featherTypes: [" + c.featherTypes.toString() + "],",
          "featherRelCornerAngles: [" + c.featherTypes.toString() + "]",
          "};",
        ].join("\n");
      }
      return b;
    }
    function nameConflict(d, b) {
      if (!b) {
        return;
      }
      var c = b.numLayers;
      for (var a = 1; a <= c; a += 1) {
        if (b.layer(a).name === d) {
          return true;
        }
      }
      return false;
    }
    function nameDupeArray(c) {
      var b = [];
      for (var a = 0; a < c.length; a += 1) {
        b.push(c[a].parentProperty.name);
      }
      if (hasDuplicates(b)) {
        return true;
      } else {
        return false;
      }
    }
    function hasDuplicates(d) {
      var b = [];
      for (var a = 0; a < d.length; a += 1) {
        var c = d[a];
        if (aeqIndexOf(b, c) !== -1) {
          return true;
        }
        b.push(c);
      }
      return false;
    }
    function aeqIndexOf(b, d, e) {
      if (this === null) {
        throw new TypeError('"this" is null or not defined');
      }
      var f = Object(b);
      var a = f.length >>> 0;
      if (a === 0) {
        return -1;
      }
      var g = e || 0;
      if (Math.abs(g) === Infinity) {
        g = 0;
      }
      if (g >= a) {
        return -1;
      }
      c = Math.max(g >= 0 ? g : a - Math.abs(g), 0);
      while (c < a) {
        if (c in f && f[c] === d) {
          return c;
        }
        c++;
      }
      return -1;
    }
    function compressArray(c, g) {
      var f = [];
      for (var e = 0; e < c.length; e += 1) {
        var a = Math.round(c[e][0] * 10) * 0.1;
        var h = Math.round(c[e][1] * 10) * 0.1;
        if (g) {
          var b = Math.round(g[e][0] * 10) * 0.1;
          var d = Math.round(g[e][1] * 10) * 0.1;
          if (a === b && h === d) {
            f.push("null");
          } else {
            f.push([a, h]);
          }
        } else {
          f.push([a, h]);
        }
      }
      return f;
    }
    function compressValueOrArray(c, d) {
      if (d) {
        if (c instanceof Array) {
          var a = true;
          for (var b = 0; b < c.length; b += 1) {
            if (c[b] !== d[b]) {
              a = false;
            }
          }
          if (a) {
            return "null";
          } else {
            return c;
          }
        } else {
          if (c === d) {
            return "null";
          } else {
            return c;
          }
        }
      } else {
        return c;
      }
    }
    function stringifyArray(c) {
      var b = "";
      for (var a = 0; a < c.length; a += 1) {
        if (a === 0) {
          b += "[" + c[a].toString() + "]";
        } else {
          b += ",[" + c[a].toString() + "]";
        }
      }
      return b;
    }
    function propWalker(b, a) {
      while (b.propertyDepth > a) {
        b = b.parentProperty;
      }
      return b;
    }
    function joyShapeGroupRemap(d, b, f, a, n, e, r, l, m, c) {
      var k = [];
      if (a.length === 0) {
        var s = [];
        return s;
      } else {
        if (!(a[0] instanceof Array)) {
          for (var h = 0; h < a.length; h += 1) {
            if (m === "featherRadii") {
              var i = [a[h], n[h], e[h], r[h], l[h]];
            }
            if (b[0] >= 0) {
              q = linearAndSinEaseBlend(b[0], 0, f, a[h], n[h], c.slideR);
            } else {
              q = linearAndSinEaseBlend(b[0], 0, f * -1, a[h], e[h], c.slideL);
            }
            var j = 0;
            if (b[1] <= 0) {
              j =
                linearAndSinEaseBlend(b[1] * -1, 0, f, a[h], r[h], c.slideU) -
                a[h];
            } else {
              j =
                linearAndSinEaseBlend(b[1] * -1, 0, -f, a[h], l[h], c.slideD) -
                a[h];
            }
            var p = q + j;
            if (m === "featherRadii") {
              if (hasPositive(i)) {
                k.push(moMax(p, 0));
              } else {
                k.push(moMin(p, 0));
              }
            } else {
              if (!(m === "featherSegLocs")) {
                k.push(p);
              } else {
                k.push(Math.round(p));
              }
            }
          }
        } else {
          for (var h = 0; h < a.length; h += 1) {
            var o = [];
            for (var g = 0; g < a[h].length; g += 1) {
              if (b[0] >= 0) {
                q = linearAndSinEaseBlend(
                  b[0],
                  0,
                  f,
                  a[h][g],
                  n[h][g],
                  c.slideR,
                );
              } else {
                q = linearAndSinEaseBlend(
                  b[0],
                  0,
                  -f,
                  a[h][g],
                  e[h][g],
                  c.slideL,
                );
              }
              var j = 0;
              if (b[1] <= 0) {
                j =
                  linearAndSinEaseBlend(
                    b[1] * -1,
                    0,
                    f,
                    a[h][g],
                    r[h][g],
                    c.slideU,
                  ) - a[h][g];
              } else {
                j =
                  linearAndSinEaseBlend(
                    b[1] * -1,
                    0,
                    -f,
                    a[h][g],
                    l[h][g],
                    c.slideD,
                  ) - a[h][g];
              }
              var p = q + j;
              o.push(p);
            }
            k.push(o);
          }
        }
      }
      return k;
    }
    function slideShapeGroupRemap(
      inTime,
      slideValAry,
      limitVal,
      keyObjs,
      itmStr,
    ) {
      var returnArray = [];
      var assets = [];
      for (var x = 0; x < keyObjs.length; x += 1) {
        var ls = eval("keyObjs[x]." + itmStr);
        assets.push(ls);
      }
      if (assets[0].length === 0) {
        var blankReturn = [];
        return blankReturn;
      }
      for (var i = 0; i < assets[0].length; i += 1) {
        var resultAdds = [];
        if (!(assets[0][0] instanceof Array)) {
          var radVals = [];
          for (var o = 0; o < assets.length - 1; o += 1) {
            if (itmStr === "featherRadii") {
              radVals.push(assets[o][i]);
            }
            if (o === 0) {
              if (slideValAry[o] >= 0) {
                resultAdds.push(
                  myMap2(
                    moClamp(slideValAry[o], -100, 100),
                    0,
                    limitVal,
                    assets[o][i],
                    assets[o + 1][i],
                  ),
                );
              } else {
                resultAdds.push(
                  assets[o][i] +
                    -myMap2(
                      -moClamp(slideValAry[o], -100, 100),
                      0,
                      limitVal,
                      assets[o][i],
                      assets[o + 1][i],
                    ) +
                    assets[o][i],
                );
              }
            } else {
              if (slideValAry[o] >= 0) {
                resultAdds.push(
                  myMap2(
                    moClamp(slideValAry[o], -100, 100),
                    0,
                    limitVal,
                    assets[0][i],
                    assets[o + 1][i],
                  ) - assets[0][i],
                );
              } else {
                resultAdds.push(
                  assets[0][i] -
                    myMap2(
                      -moClamp(slideValAry[o], -100, 100),
                      0,
                      limitVal,
                      assets[0][i],
                      assets[o + 1][i],
                    ),
                );
              }
            }
          }
          var mySum = 0;
          for (var p = 0; p < resultAdds.length; p += 1) {
            mySum += resultAdds[p];
          }
          if (itmStr === "featherRadii") {
            if (hasPositive(radVals)) {
              returnArray.push(moMax(mySum, 0));
            } else {
              returnArray.push(moMin(mySum, 0));
            }
          } else {
            if (!(itmStr === "featherSegLocs")) {
              returnArray.push(mySum);
            } else {
              returnArray.push(Math.round(mySum));
            }
          }
        } else {
          var arHold = [];
          for (var k = 0; k < assets[0][0].length; k += 1) {
            resultAdds = [];
            for (var o = 0; o < assets.length - 1; o += 1) {
              if (o === 0) {
                if (moClamp(slideValAry[o], -100, 100) >= 0) {
                  resultAdds.push(
                    myMap2(
                      moClamp(slideValAry[o], -100, 100),
                      0,
                      limitVal,
                      assets[o][i][k],
                      assets[o + 1][i][k],
                    ),
                  );
                } else {
                  resultAdds.push(
                    assets[o][i][k] +
                      -myMap2(
                        -moClamp(slideValAry[o], -100, 100),
                        0,
                        limitVal,
                        assets[o][i][k],
                        assets[o + 1][i][k],
                      ) +
                      assets[o][i][k],
                  );
                }
              } else {
                if (slideValAry[o] >= 0) {
                  resultAdds.push(
                    myMap2(
                      moClamp(slideValAry[o], -100, 100),
                      0,
                      limitVal,
                      assets[0][i][k],
                      assets[o + 1][i][k],
                    ) - assets[0][i][k],
                  );
                } else {
                  resultAdds.push(
                    assets[0][i][k] -
                      myMap2(
                        -moClamp(slideValAry[o], -100, 100),
                        0,
                        limitVal,
                        assets[0][i][k],
                        assets[o + 1][i][k],
                      ),
                  );
                }
              }
            }
            var mySum = 0;
            for (var p = 0; p < resultAdds.length; p += 1) {
              mySum += resultAdds[p];
            }
            arHold.push(mySum);
          }
          returnArray.push(arHold);
        }
      }
      return returnArray;
    }
    function linearAndSinEaseBlend(g, f, d, c, b, e) {
      var h = myMap(g, f, d, c, b);
      if (e === 0) {
        return h;
      } else {
        var a = easeSwitch(g, f, d, c, b, e);
        return myMap(Math.abs(e), 0, 100, h, a);
      }
    }
    function myMap(b, i, g, d, c) {
      if (b >= 0) {
        var f = moClamp(b, i, g);
      } else {
        var f = moClamp(b, g, i);
      }
      var h = g - i;
      var j = f / h;
      if (c instanceof Array) {
      }
      var e = (c - d) * j + d;
      return e;
    }
    function cosEase(f, d, c, b, a) {
      function e(l, k, j, i, g) {
        var h = moClamp(l / (j - k), 0, 1);
        var n = g - i;
        var m = -n * Math.cos(h * (Math.PI / 2)) + n + i;
        return m;
      }
      myCos = e(f, d, c, b, a);
      return myCos;
    }
    function sinEase(g, f, e, b, a) {
      function c(n, l, k, j, h) {
        var i = moClamp(n / (k - l), 0, 1);
        var o = h - j;
        var m = o * Math.sin(i * (Math.PI / 2)) + j;
        return m;
      }
      var d = c(g, f, e, b, a);
      return d;
    }
    function easeSwitch(f, e, c, b, a, d) {
      if (d < 0) {
        return cosEase(f, e, c, b, a);
      } else {
        return sinEase(f, e, c, b, a);
      }
    }
    function myMap2(i, g, f, d, b) {
      var c = f - g;
      var e = i / c;
      var h = (b - d) * e + d;
      return h;
    }
    function moClamp(f, e, h) {
      if (!(f instanceof Array)) {
        return Math.max(e, Math.min(h, f));
      } else {
        var g = [];
        for (var d = 0; d < f.length; d += 1) {
          g.push(Math.max(e, Math.min(h, f[d])));
        }
        return g;
      }
    }
    function moMax(e, d) {
      if (!(e instanceof Array)) {
        return Math.max(e, d);
      } else {
        var f = [];
        for (var c = 0; c < e.length; c += 1) {
          f.push(Math.max(e[c], d));
        }
        return f;
      }
    }
    function moMin(e, d) {
      if (!(e instanceof Array)) {
        return Math.min(e, d);
      } else {
        var f = [];
        for (var c = 0; c < e.length; c += 1) {
          f.push(Math.min(e[c], d));
        }
        return f;
      }
    }
    function hasPositive(c) {
      isPos = true;
      for (var a = 0; a < c.length; a += 1) {
        if (!(c[a] instanceof Array)) {
          if (c[a] < 0) {
            isPos = false;
            break;
          }
        } else {
          for (var b = 0; b < c[a].length; b += 1) {
            if (c[a][b] < 0) {
              isPos = false;
              break;
            }
          }
        }
      }
      return isPos;
    }
    function convertObjectToShape(b) {
      var c = new Shape();
      c.closed = b.closed;
      c.vertices = b.vertices;
      c.inTangents = b.inTangents;
      c.outTangents = b.outTangents;
      c.featherRelSegLocs = b.featherRelSegLocs;
      c.featherSegLocs = b.featherSegLocs;
      c.featherRadii = b.featherRadii;
      c.featherTensions = b.featherTensions;
      c.featherRelCornerAngles = b.featherRelCornerAngles;
      c.featherTypes = b.featherTypes;
      c.featherInterps = b.featherInterps;
      return c;
    }
    function rotoWrite(b) {
      if (b) {
        a = "var rotoBezier = true;";
      } else {
        a = "var rotoBezier = false";
      }
      return a;
    }
    function makeAlert(e, d) {
      var b = new Window("dialog", "Joysticks \'n Sliders");
      var a = b.add("group");
      a.orientation = "column";
      a.add("statictext", undefined, e, { multiline: true });
      if (d !== undefined) {
        a.add("image", undefined, d);
      }
      var c = b.add("group");
      var f = c.add("button", undefined, "OK");
      b.show();
    }
    function makePrompt(i, c, d) {
      var e = c;
      d[0] = e;
      var h = new Window("dialog", i);
      var j = h.add("group");
      j.add("statictext", undefined, "Name:");
      var a = j.add("edittext", undefined, e);
      a.onChange = function () {
        e = a.text;
        d[0] = e;
      };
      a.characters = 20;
      a.active = true;
      var b = h.add("group");
      b.alignment = "right";
      var f = b.add("button", undefined, "Cancel");
      var g = b.add("button", undefined, "OK");
      f.onClick = function () {
        e = null;
        d[0] = e;
        h.close();
      };
      h.show();
    }
    function consistent_vertex_count(b) {
      var e = true;
      var a = 0;
      for (var d = 1; d <= b.numKeys; d += 1) {
        var c = b.keyValue(d);
        if (d === 1) {
          a = c.vertices.length;
        } else {
          if (c.vertices.length !== a) {
            e = false;
          }
        }
      }
      return e;
    }
    var joystickBaseBin = __BLOB__BLOB_000279__;
    var sliderWidgetBin = __BLOB__BLOB_000280__;
    var sliderOriginBaseBin = __BLOB__BLOB_000281__;
    var sliderOptionsBin = __BLOB__BLOB_000282__;
    var JoystickEaseBiasBin = __BLOB__BLOB_000283__;
    var isTrial = jnsaf.t();
    var version = "@@version";
    var aeVersion = Math.floor(parseFloat(app.version));
    var myDirectory = Folder.current;
    var userDataFolder = getUserDataFolder();
    var presetPath = createResourceFile(
      "JoystickBase.ffx",
      joystickBaseBin,
      userDataFolder,
    );
    var slidePresetPath = createResourceFile(
      "sliderWidget.ffx",
      sliderWidgetBin,
      userDataFolder,
    );
    var slideOriginPresetPath = createResourceFile(
      "sliderOriginBase.ffx",
      sliderOriginBaseBin,
      userDataFolder,
    );
    var slidePseudoPath = createResourceFile(
      "SliderOptions.ffx",
      sliderOptionsBin,
      userDataFolder,
    );
    var joyEasePseudoPath = createResourceFile(
      "JoystickEaseBias.ffx",
      JoystickEaseBiasBin,
      userDataFolder,
    );
    var joyLyr = null;
    var masterPropsJoy = false;
    var masterPropsSlide = false;
    var switchComps = [];
    var joyLyrs = [];
    var parComps = [];
    var slideLyrs = [];
    var uiWidth = 200;
    var alted = false;
    var joyTips = {
      bindExistBt:
        "Bind selected layers or properties to pre-existing joystick.",
      easeBiasTip:
        "Joystick Ease Bias. Applies the ease bias pseudo effect selected layers that are controlled by a joystick. change the values to adjust how your layers ease into their extreme poses.",
      existDropTip:
        "If you have already created a joystick in this comp, it will appear in this list. If you want your selected layers to be bound to a new joystick, choose Create new Joystick.",
      helpy: "Confused?? Click here.",
      keyAllTip:
        "This will key every riggable property in your selected layers.",
      mirrorTip:
        "PathFlipper: Mirrors the shape of a mask or path shape; useful for rigging paths. Flips horizontally by default, but filps vertically when (ALT) is held.",
      newJoyTip:
        "Create New Joystick: Selected layers must have poperties with five keyframes on the first five frames of your timeline, representing the Front, Right, Left, Up,and Down extremes. Hold down Alt to have your joystick represented as a Null instead of a guided Solid.",
      nullRadButnTip: "Joystick controller will be represented as a Null.",
      pasteOriginTip:
        "With layers selected, it will copy the key values from your origin pose to your current time. Hold Alt while pressing, and no existing keyframes will be overwritten.",
      reloadAllDropDowns:
        "Refreshes all of your dropdown lists in the current tab. Only present in version 12 of AE as lists won\'t update automatically when activated.",
      sliderExistButnTip:
        "Bind selected properties with sliders in the slider null selected in the drop down list.",
      sliderExistDropTip:
        "To rig your selected properties to an existing slider null, select your null here.",
      sliderNegTip:
        "If selected, negative slider values will produce inverted poses.",
      sliderPClistTip: "Select a parent composition that contains this one.",
      sliderPCmoveTip:
        "Connects your Slider Null to a duplicate in the parent composition. If your Slider Null is connected to UI Sliders, you must delete them first.",
      sliderRigButnTip:
        "Create new Slider null: With keyed layers selected, a null will be created to control the extremes assigned. Hold Alt to restrict the influence of your sliders to positive values and thus not allow inverse poses.",
      sliderUnbindTip:
        "Unbinds the properties currently connected to the selected slider null. Hold ALT to only unbind selected layers or properties.",
      solidRadButnTip: "Joystick controller will be represented as a Solid.",
      switchBindTip:
        "Connects the chosen switch template to your chosen joystick. Items in your template must exist in your current composition. No timeline selection required.",
      switchCreateTip:
        "Creates a square composition. Place the assets you would like to swap in this composition and space them out to indicate where they should swap in relation to the joystick\'s position.",
      switchJoyTip:
        "Choose the joystick you\'d like to connect your template to.",
      switchTemplateTip:
        "If your project has a switch template, it will appear here.",
      switchUnbindTip:
        "Disconnects your switch groups from your selected joystick.",
      toChildTip:
        "If your selected controller has been moved from a child comp, removes selected controller and gives control, including all animation, back to the child controller.",
      unKeyFlatTip:
        "This will remove keyframes on any riggable property that does not change.",
      unbindTip:
        "Unbinds all layers from the selected joystick controller and spits back out original extreme keyframes. Hold ALT to only unbind selected layers or properties.",
      updatePathTip:
        "Updates all rigged PathShape properties connected to the currently selected Joystick or Slider Null.",
    };
    var joyTips2 = {
      sliderUIcreateTip:
        "Select a Slider null and click to create interactive sliders in your composition window. Select individual slider effects if you don\'t want to create UIsliders for all. Any animation applied to your sliders will be transferred to your UIsliders.",
      sliderUIdeleteTip:
        "Select a UIslider and click to remove it from the composition. Any animation on the UIslider will be transferred back to the slider effect in the slider null.",
    };
    var joyThing = createResourceFile("joyIcn.png", joyIcon(), userDataFolder);
    var slideThing = createResourceFile(
      "slideIcn.png",
      slideIcon(),
      userDataFolder,
    );
    var unKeyThing = createResourceFile(
      "unKeyFlatIcon.png",
      unKeyFlatIcon(),
      userDataFolder,
    );
    var keyAllThing = createResourceFile(
      "keyAllIcon.png",
      keyAllIcon(),
      userDataFolder,
    );
    var reloadThing = createResourceFile(
      "reloadIcon.png",
      reloadIcon(),
      userDataFolder,
    );
    var newJoystickIcon = createResourceFile(
      "rewJoyIcon.png",
      newJoyIcon(),
      userDataFolder,
    );
    var bindIconJ = createResourceFile(
      "bindIconJ.png",
      bindIconJfn(),
      userDataFolder,
    );
    var unbindIconJ = createResourceFile(
      "unbindIconJ.png",
      unbindIconJfn(),
      userDataFolder,
    );
    var updatePathJ = createResourceFile(
      "updatePathJfn.png",
      updatePathJfn(),
      userDataFolder,
    );
    var easeBiasJ = createResourceFile(
      "easeBiasJfn.png",
      easeBiasJfn(),
      userDataFolder,
    );
    var newSlideIcn = createResourceFile(
      "newSlideIcnfn.png",
      newSlideIcnfn(),
      userDataFolder,
    );
    var bindIconS = createResourceFile(
      "bindIconSfn.png",
      bindIconSfn(),
      userDataFolder,
    );
    var unbindIconS = createResourceFile(
      "unbindIconSfn.png",
      unbindIconSfn(),
      userDataFolder,
    );
    var updatePathS = createResourceFile(
      "updatePathSfn.png",
      updatePathSfn(),
      userDataFolder,
    );
    var mirrorShape = createResourceFile(
      "mirrorShapefn.png",
      mirrorShapefn(),
      userDataFolder,
    );
    var pasteOrIcn = createResourceFile(
      "pasteOrIcnfn.png",
      pasteOrIcnfn(),
      userDataFolder,
    );
    var rigChart = createResourceFile(
      "rigChart.png",
      rigChartfn(),
      userDataFolder,
    );
    myScript(thisObj);
  }
  var helpStr = [
    "Create and Bind Joystick:",
    "",
    "Joystick creates a multi-directional controller that easily interpolates between an Origin pose and four extreme poses determined by the user.",
    "With as many properties and layers as you want, set your Origin, right, left, top, and bottom extremes. It is important that any property that you wish to bind to a joystick has a keyframe for each extreme whether it changes or not, and that your center pose begins at the start of the timeline, with your poses on each successive frame. All extremes should be based off of your Origin pose. Use Paste Origin Pose to help speed up your setup. You should end up with five successive keyframes on every property you wish to have controlled by your Joystick.",
    "",
    " Select all of your layers and Create new Joystick. A new joystick controller will appear. You can move it to interpolate between your extremes. You can change the range of the joystick controller by adjusting the joyStickLimit slider on your controller. If you would like to revise your rig, you may select your joystick, and click \u201cUnbind\u201d. This will spit your extreme keyframes back into your timeline. You can adjust or add assets as you wish. Then, by selecting your layers in the timeline, you can choose your joystick layer from the \u201cBind to Existing\u201d drop down menu. Click \u201cBind\u201d to rebind your properties to your joystick.",
    "",
    " Bound properties may still be animated and offset by the user.",
    "",
    " Switch Templates:",
    "",
    ' If you wish to have a layer\u2019s visibility toggled by a joystick, like swapping mouth packs or noses at different angles, you can use a Switch Template. Clicking "Create" makes a square composition. The composition represents the mapping of your joystick. Bring in any assets that you would like to swap and position them in the composition near where you would like to toggle their visibility. Back in your setup comp, make sure you have the same assets in your timeline with the same layer names. Select your switch template and joystick layer from the drop down menus and hit Bind. No timeline selection is necessary. Your assets\u2019 visibility will be toggled by whichever asset in your template the joystick controller is closest to. With your assets still bound, you can adjust their positions in the template comp, and their visibility will update dynamically.',
    "",
    " Move Joystick to Parent Comp.",
    "",
    ' If the asset you are rigging is nested in a less cluttered parent composition, you can move your joystick control to that composition. Select your joystick in the timeline, then find the parent composition from the drop down, and click \u201cto Parent\u201d. Your current joystick controller will turn red, indicating that it is being controlled from a parent layer. Do not delete this joystick, since it is still controlling your assets. Your joystick is now controlled by an identical joystick in your parent layer. Use this to control your rig. If you want to unbind and re-rig your assets, you must select the red joystick to bind and unbind your assets, not the one in the parent layer. Additionally, you can move your joystick controller back to its child composition by Clicking "to Child".',
    "",
    " Joystick EaseBias",
    "",
    "If you have a layer rigged to a joystick, you can select it and click the EaseBias button. This creates a pseudo effect that communicates with the expressions on your rigged properties. You can slide the influence of each direction between 100% and -100%. Use this to adjust how your elements distribute themselves as you animate between extremes. Subtle use of this feature can push the illusion of depth and parallax in your 2D head rigs.",
    "",
    "Create and bind Slider:",
    "",
    " Sliders are a little more complicated to use and set up than Joysticks, but they can be far more powerful. If four poses are not enough for your needs, sliders allow as many poses as you want, and you can mix them together in any way you wish. Their concept is similar to blend shapes or pose libraries in 3D rigging.",
    "",
    " Like Joysticks, you must first key in your Origin pose. Then, make your successive poses on the following frames. Again, it is extremely important that:",
    "",
    " * Every property you wish to have controlled by your sliders have a keyframe on every pose whether it changes or not.",
    " * Your Origin pose occurs on the first frame of your timeline.",
    " * Every successive pose occurs on the next timeline frame.",
    "",
    " Remember, every pose is recorded as its difference from your Origin pose, so make good use of that Paste Origin Pose button. When you are ready, select all layers involved, then click \'Create new Slider\'. A new null is created with a series of sliders, which we\'ll call it your Slider Null. Feel free to rename these with unique names. These sliders allow you to slide and mix poses. Your sliders are defined by their order in your Effects stack, so I don\u2019t recommend changing their order if you\u2019ve already begun animating. It is also important that your Slider null contain no extra effects. Similar to Joysticks, you can unbind and rebind your poses.",
    "",
    " UI Sliders",
    "",
    " If you select individual slider properties or your Slider Null as a layer, click \'Create\' to create UI representations of your sliders, much like a Joystick. You may now move these around to animate your rig. Any animation made on your sliders will be transferred to your UI Sliders. Do not delete your Slider Null, since your rig is still being driven by it. If you want to remove any of your UI Sliders, just select their arrows and click \'Delete\'. The UI arrows, sliders, and labels will be removed, and any animation will be applied back to the sliders in your Slider Null.",
    "Move Slider to Parent Comp",
    "",
    "Move Slider Null to Parent Comp",
    "",
    ' You can also move a Slider Null to a parent composition by selecting the null in the timeline, selecting the parent composition in the drop down and clicking \u201cto Parent\u201d. Your original null is still there and should not be deleted. Use the new null in the parent composition to control, and use the original null to unbind and re-bind your poses. If your Slider Null has UI Sliders, you will need to delete them before moving your null to the parent layer. You can recreate your UI Sliders in the parent comp from the new null that lives there. Slider nulls can also be moved back to their child comps by clicking "to Child" moving all of its animation back to the Slider Null in the child comp.',
    "",
    "If you are using CC2018 or higher, you can rig path properties which update live. If using an earlier version of AE, you must use the update Pathshapes tool to see your animation\'s effect on your path properties.",
    "While on the subject of PathShapes, there is a new setup tool called the PathFlipper. It will mirror a shape horizontally around whichever vertex is set to the first vertex on your path. It also manages the vertices to help the paths interpolate nicely. By holding ALT while clicking the PathFlipper, you will flip the path vertically.",
  ].join("\n");
  var af_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [
      {
        name: "Product page",
        url: "https://aescripts.com/joysticks-n-sliders/",
      },
      {
        name: "Other Products",
        url: "https://aescripts.com/authors/m-p/mike-overbeck/",
      },
    ],
    helpText: helpStr,
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6340054511873309,
    productSKU: "MOJ-SUL",
    scriptAuthor: "Mike Overbeck",
    scriptName: "Joysticks \'n Sliders",
    scriptURL: "http://aescripts.com/joysticks-n-sliders/",
    scriptVersion: "1.7.4",
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
    var wx = __BLOB__BLOB_000284__;
    var mx = __BLOB__BLOB_000285__;
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
  var jnsaf = new a(af_settings);
  if (jnsaf.c()) {
    jsLaunch(thisObj);
  }
}
mo_joysticksNsliders(this);
