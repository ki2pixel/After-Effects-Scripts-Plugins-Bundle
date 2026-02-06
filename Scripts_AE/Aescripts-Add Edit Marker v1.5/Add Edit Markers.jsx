/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function CreateEditMarkers(thisObj) {
  function buildUI1(thisObj) {
    if (thisObj instanceof Panel) {
      var myPal = thisObj;
    } else {
      var myPal = new Window(
        "palette",
        aes_aem_data.scriptName + " v" + aes_aem_data.scriptVersion,
        undefined,
        { resizeable: false },
      );
    }
    if (myPal != null) {
      var res =
        "group { \n\t\t\t\t\talignment: [\'left\',\'top\'], \n\t\t\t\t\talignChildren: [\'left\',\'top\'], \n\t\t\t\t\torientation: \'column\', \n                    layerGrp: Group {\n                       alignment: [\'fill\',\'fill\'], \n\t\t\t\t\talignChildren: [\'left\',\'top\'], \n                    spacing: 0 \n                       orientation: \'row\', \n\t\t\t\t\taddLayer: Checkbox {text:\'Add layer markers\', preferredSize: [125,30]}, \n                      inOut: DropDownList {properties:{items:[\'in & out split\',\'in & out\',\'in\',\'out\']}, preferredSize: [90,20]}, \n                    }\n                    compGrp: Group {\n                        alignment: [\'fill\',\'fill\'], \n\t\t\t\t\talignChildren: [\'left\',\'top\'], \n                    spacing: 0 \n                       orientation: \'row\', \n                       addComp: Checkbox {text:\'Add comp markers\', preferredSize: [125,30]}, \n                       inOut: DropDownList {properties:{items:[\'in & out split\',\'in & out\',\'in\',\'out\']}, preferredSize: [90,20]}, \n                       }\n                       btnsGrp: Group {\n                        alignment: [\'fill\',\'fill\'], \n\t\t\t\t\talignChildren: [\'fill\',\'top\'], \n                       orientation: \'row\', \n                       help: Button {text: \'?\', alignment: [\'left\',\'top\'],preferredSize: [30,30]} , \n\t\t\t\t\tdoIt: Button {text: \'Do It!\', alignment: [\'right\',\'top\']} , \n                    }\n\t\t\t\t}";
      myPal.grp = myPal.add(res);
      myPal.layout.layout(true);
      myPal.layout.resize();
      myPal.onResizing = myPal.onResize = function () {
        this.layout.resize();
      };
      myPal.grp.layerGrp.inOut.selection =
        myPal.grp.compGrp.inOut.selection = 0;
      if (app.settings.haveSetting("aescripts", "AddEditMarkers_LayerInOut")) {
        myPal.grp.layerGrp.inOut.selection = app.settings.getSetting(
          "aescripts",
          "AddEditMarkers_LayerInOut",
        );
      }
      if (app.settings.haveSetting("aescripts", "AddEditMarkers_CompInOut")) {
        myPal.grp.compGrp.inOut.selection = app.settings.getSetting(
          "aescripts",
          "AddEditMarkers_CompInOut",
        );
      }
      if (app.settings.haveSetting("aescripts", "AddEditMarkers_LayerMarker")) {
        myPal.grp.layerGrp.addLayer.value = !(
          app.settings.getSetting("aescripts", "AddEditMarkers_LayerMarker") ==
          "false"
        );
      } else {
        myPal.grp.layerGrp.addLayer.value = false;
      }
      if (app.settings.haveSetting("aescripts", "AddEditMarkers_CompMarker")) {
        myPal.grp.compGrp.addComp.value = !(
          app.settings.getSetting("aescripts", "AddEditMarkers_CompMarker") ==
          "false"
        );
      } else {
        myPal.grp.compGrp.addComp.value = false;
      }
      myPal.grp.btnsGrp.doIt.onClick = function () {
        saveSettings(myPal);
        app.beginUndoGroup(aes_aem_data.scriptName);
        doIt(myPal);
        app.endUndoGroup;
      };
      myPal.onClose = function () {
        saveSettings(myPal);
      };
      myPal.grp.btnsGrp.help.onClick = function () {
        alert(
          aes_aem_data.scriptName +
            " v" +
            aes_aem_data.scriptVersion +
            "\n\xa9 Lloyd Alvarez http://aescripts.com\n\n" +
            "Will place markers at the in and out points of the selected layers or all layers in the comp if no layers are selected. The markers will be placed on the layers or the comp depending on the user preference. Split will create a single split marker otherwise individual markers will be created.",
        );
      };
    }
    return myPal;
  }
  function saveSettings(thePal) {
    var markLayer = thePal.grp.layerGrp.addLayer.value;
    var layerInOut = thePal.grp.layerGrp.inOut.selection.index;
    var markComp = thePal.grp.compGrp.addComp.value;
    var compInOut = thePal.grp.compGrp.inOut.selection.index;
    app.settings.saveSetting(
      "aescripts",
      "AddEditMarkers_LayerMarker",
      markLayer,
    );
    app.settings.saveSetting(
      "aescripts",
      "AddEditMarkers_LayerInOut",
      layerInOut,
    );
    app.settings.saveSetting(
      "aescripts",
      "AddEditMarkers_CompMarker",
      markComp,
    );
    app.settings.saveSetting(
      "aescripts",
      "AddEditMarkers_CompInOut",
      compInOut,
    );
  }
  function doIt(thePal) {
    var markLayer = thePal.grp.layerGrp.addLayer.value;
    var layerInOut = thePal.grp.layerGrp.inOut.selection.index;
    var isLayerSplit = layerInOut == 0;
    var markComp = thePal.grp.compGrp.addComp.value;
    var compInOut = thePal.grp.compGrp.inOut.selection.index;
    var isCompSplit = compInOut == 0;
    var myComp = app.project.activeItem;
    if (!markLayer && !markComp) {
      alert("Please select at least one option");
      return;
    }
    if (myComp == null || !(myComp instanceof CompItem)) {
      alert("Please select a comp");
      return;
    }
    var isSelLayers = myComp.selectedLayers.length > 0;
    var numLayers = isSelLayers
      ? myComp.selectedLayers.length - 1
      : myComp.numLayers;
    var i = isSelLayers ? 0 : 1;
    var selLayers = new Array();
    var counter = 0;
    for (i; i <= numLayers; i++) {
      selLayers[counter] = isSelLayers
        ? myComp.selectedLayers[i]
        : myComp.layer(i);
      counter++;
    }
    for (var i = 0; i < selLayers.length; i += 1) {
      selLayers[i].selected = false;
    }
    var saveCompTime = myComp.time;
    for (var i = 0; i < selLayers.length; i += 1) {
      var myLayer = selLayers[i];
      var myIn = myLayer.inPoint;
      var myOut = myLayer.outPoint;
      var myMarker = new MarkerValue("");
      if (markLayer) {
        if (isLayerSplit) {
          myMarker.duration = myOut - myIn;
        }
        if (layerInOut < 3) {
          myLayer.property("Marker").setValueAtTime(myIn, myMarker);
        }
        if (layerInOut == 1 || layerInOut == 3) {
          myLayer.property("Marker").setValueAtTime(myOut, myMarker);
        }
      }
      if (markComp) {
        if (compInOut < 3) {
          myComp.time = myIn;
          myComp.markerProperty.setValueAtTime(myIn, myMarker);
        }
        if (isCompSplit) {
          myMarker.duration = myOut - myIn;
        }
        if (compInOut == 1 || compInOut == 3) {
          myComp.time = myOut;
          myComp.markerProperty.setValueAtTime(myOut, myMarker);
        }
      }
    }
    if (isSelLayers) {
      for (var i = 0; i < selLayers.length; i += 1) {
        selLayers[i].selected = true;
      }
    }
    myComp.time = saveCompTime;
  }
  var myPalette = buildUI1(thisObj);
  if (myPalette != null && myPalette instanceof Window) {
    myPalette.show();
  }
}
var aes_aem_data = { scriptName: "Add Edit Markers", scriptVersion: "1.5" };
CreateEditMarkers(this);
