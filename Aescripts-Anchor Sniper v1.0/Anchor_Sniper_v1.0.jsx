/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function vn_AnchorSniper() {
  function d() {
    this.osCheck = function () {
      var g = $.os;
      var f = g.indexOf("Windows");
      var e = "";
      if (f != -1) {
        e = "PC";
      } else {
        e = "MAC";
      }
      return e;
    };
    this.getUrlLaunchCode = function (e) {
      if (e == "MAC") {
        f = "Open";
      } else {
        f = 'cmd.exe /c"start';
      }
      return f;
    };
    this.ProgressBar = function (j, f, m) {
      60 <= f || 0 || (f = 340);
      40 <= m || 0 || (m = 60);
      var l = 22;
      var e = (3 * m - 2 * l) >> 2;
      var g = new Window("palette", " " + j, [0, 0, f, m], {
        closeButton: true,
      });
      var i = g.add(
        "progressbar",
        { height: 12, width: f - 40, x: 20, y: m >> 2 },
        0,
        100,
      );
      var h = g.add("statictext", { height: l, width: f, x: 0, y: e });
      var k = function (o, n) {
        return localize.apply(null, o.concat(n));
      };
      this.pattern = ["%1"];
      this.progressChunk = 1;
      this.progress_bar_value = 0;
      g.center();
      g.update();
      this.msg = function (n) {
        n && (h.location = [(f - h.graphics.measureString(n)[0]) >> 1, e]);
        h.text = n;
      };
      this.show = this.reset = function (o, n) {
        if (o && o != localize(o, 1, 2, 3, 4, 5, 6, 7, 8, 9)) {
          this.pattern[0] = o;
          o = k(this.pattern, [].slice.call(arguments, 2));
        } else {
          this.pattern[0] = "%1";
        }
        i.value = 0;
        i.maxvalue = n || 0;
        i.visible = !!n;
        this.msg(o);
        g.show();
        g.update();
      };
      this.hit = function () {
        this.progress_bar_value += this.progressChunk;
        var n = this.progress_bar_value;
        if (n > i.maxvalue) {
          n = i.maxvalue;
        }
        i.value = n;
        this.msg(k(this.pattern, [].slice.call([n], 0)));
        g.update();
      };
      this.hide = function () {
        g.hide();
      };
      this.close = function () {
        g.close();
        vn_AnchorSniperUI.globalVar.progressWin = false;
      };
      this.update = function () {
        g.update();
      };
    };
    this.removeEffectsFromLayer = function (g) {
      var f = g.property("ADBE Effect Parade");
      for (var e = f.numProperties; e > 0; e--) {
        f.property(e).remove();
      }
    };
    this.getRandomInt = function (f) {
      var e = Math.pow(10, f);
      return Math.floor(Math.random() * e + 1);
    };
    this.printObject = function (g, f) {
      for (var e in g) {
        if (g.hasOwnProperty(e)) {
          $.writeln(f + "," + e + " = " + g[e]);
        }
      }
    };
    this.runExpressionOnLayer = function (f, i, g) {
      var h = f.Effects.addProperty(i);
      h.property(1).expressionEnabled = true;
      h.property(1).expression = g;
      var e = h(1).value;
      h.property(1).expressionEnabled = false;
      return e;
    };
    this.setProjectFolder = function (k) {
      var e = false;
      var h = app.project;
      var j = h.numItems;
      for (var f = 1; f <= j; f += 1) {
        g = h.item(f);
        if (
          g instanceof FolderItem &&
          g.name.toLowerCase() == k.toLowerCase()
        ) {
          e = g;
          break;
        }
      }
      if (e == false) {
        e = app.project.items.addFolder(k);
      }
      return e;
    };
    this.getLayerType = function (e) {
      var f = "";
      if (e instanceof TextLayer || e instanceof ShapeLayer) {
        f = "text/shape";
      } else {
        if (e.canSetCollapseTransformation && e.collapseTransformation) {
          f = "vector";
        } else {
          f = "bitmap";
        }
      }
      return f;
    };
    this.getUserDataFolder = function (e) {
      var h = Folder.userData;
      var f = Folder(h.toString() + "/Aescripts/" + e);
      if (!f.exists) {
        var g = f.create();
        if (!g) {
          alert("Error creating " + e);
          f = Folder.temp;
        }
      }
      return f.toString();
    };
    this.createResourceFile = function (h, g, f) {
      var i = new File(f + "/" + h);
      if (!File(i).exists) {
        if (!this.isSecurityPrefSet()) {
          alert(
            "This script requires access to write files. Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.",
          );
          try {
            app.executeCommand(2359);
          } catch (j) {
            j;
          }
          if (!this.isSecurityPrefSet()) {
            return null;
          }
        }
        i.encoding = "BINARY";
        i.open("w");
        i.write(g);
        i.close();
      }
      return i;
    };
    this.isSecurityPrefSet = function () {
      var f = "";
      try {
        f = app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        );
        return f == 1;
      } catch (g) {
        return (f = 1);
      }
    };
    this.checkForActiveItems = function (f) {
      if (!(app.project.activeItem instanceof CompItem)) {
        f.globalVar.err_msg = "A comp must be active.";
        return false;
      } else {
        var e = app.project.activeItem;
        var g = e.selectedLayers;
        if (g.length < 1) {
          f.globalVar.err_msg = "Select at least one layer.";
          return false;
        } else {
          return true;
        }
      }
    };
    this.saveSingleSetting = function (f, g, e) {
      e = e ? "1" : "0";
      app.settings.saveSetting(f, g, e);
    };
    this.saveSettings = function (f, h) {
      for (var g in h) {
        var e = h[g] ? "1" : "0";
        app.settings.saveSetting(f, g, e);
      }
    };
    this.loadSettings = function (f, h) {
      for (var g in h) {
        if (app.settings.haveSetting(f, g)) {
          var e = app.settings.getSetting(f, g) == "1" ? true : false;
          h[g] = e;
        } else {
          h[g] = vn_AnchorSniperUI.globalVar.savedSettings[g];
        }
      }
    };
    this.checkForCinema4dSource = function (e) {
      if (e.source) {
        var g = new String(e.source.file);
        var f = g.split(".");
        var h = f[f.length - 1];
        if (h == "c4d") {
          return true;
        }
      }
      return false;
    };
    this.getUsableLayers = function (k, l) {
      var f = [];
      for (var h = 0; h < k.length; h += 1) {
        var g = k[h];
        if (
          !g.enabled ||
          !g.hasVideo ||
          g.nullLayer ||
          g instanceof LightLayer ||
          g instanceof CameraLayer ||
          this.checkForCinema4dSource(g)
        ) {
          continue;
        } else {
          if (!g.active) {
            continue;
          }
          if (l) {
            var j = g.Masks;
            var e = j.numProperties;
            if (e == 0) {
              continue;
            }
          }
          f[f.length] = g;
        }
      }
      if (f.length > 0) {
        return f;
      } else {
        return false;
      }
    };
    this.reSelectLayers = function (h, f) {
      f.active = true;
      for (var g = 1; g <= f.numLayers; g += 1) {
        f.layer(g).selected = false;
      }
      for (var e = 0; e < h.length; e += 1) {
        f.layer(h[e].index).selected = true;
      }
    };
    this.compareNumbers = function (f, e) {
      return f - e;
    };
    this.averageNumbers = function (h) {
      var f = 0;
      var g = 0;
      for (var e = 0; e < h.length; e += 1) {
        f += parseInt(h[e]);
      }
      if (h.length > 0) {
        g = f / h.length;
      }
      return g;
    };
  }
  function c() {
    this.scanToolsVar = {};
    this.scanToolsVar.current_project_bit_depth = false;
    this.scanToolsVar.shown_bit_depth_warning = false;
    this.checkProjectBitDepth = function () {
      this.scanToolsVar.current_project_bit_depth = app.project.bitsPerChannel;
      if (
        this.scanToolsVar.current_project_bit_depth == 8 &&
        !vn_AnchorSniperUI.globalVar.savedSettings.hideBitDepthWarning &&
        !this.scanToolsVar.shown_bit_depth_warning
      ) {
        var f =
          "Anchor SNIPER\'s alpha channel scanning process is significantly more accurate when the project\'s Color Bit Depth is set to 16 bits or higher.\n\nTo change the project\'s Color Bit Depth click on File -> Project Settings, then under \"Color Settings\" change the Depth value to 16 bits or higher.";
        var e = false;
        vn_AnchorSniperUI.openWarningDialog(
          f,
          "Anchor SNIPER Tip",
          e,
          "hideBitDepthWarning",
        );
        this.scanToolsVar.shown_bit_depth_warning = true;
      }
    };
    this.setProjectBitDepth = function () {
      if (!this.scanToolsVar.current_project_bit_depth) {
        this.scanToolsVar.current_project_bit_depth =
          app.project.bitsPerChannel;
      }
      if (this.scanToolsVar.current_project_bit_depth == 8) {
        if (!vn_AnchorSniperUI.globalVar.savedSettings.hideBitDepthWarning) {
          var f =
            "Anchor SNIPER\'s alpha channel scanning process is significantly more accurate when the project\'s Color Bit Depth is set to 16 bits or higher.\n\nTo change the project\'s Color Bit Depth click on File -> Project Settings, then under \"Color Settings\" change the Depth value to 16 bits or higher.";
          var e = false;
          vn_AnchorSniperUI.openWarningDialog(
            f,
            "Anchor SNIPER Tip",
            e,
            "hideBitDepthWarning",
          );
        }
      }
    };
    this.revertProjectBitDepth = function () {};
    this.getLayerSourceRecAtTime = function (f) {
      var j = {};
      var e = f
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      var h = e.propertyIndex;
      var i =
        "[thisLayer.sourceRectAtTime(time,true).left,thisLayer.sourceRectAtTime(time,true).top, thisLayer.sourceRectAtTime(time,true).width,thisLayer.sourceRectAtTime(time,true).height/1e4]";
      e.property(1).expressionEnabled = true;
      e.property(1).expression = i;
      var g = e(1).value;
      e.property(1).expressionEnabled = false;
      j.left = g[0];
      j.top = g[1];
      j.width = g[2];
      j.height = g[3] * 10000;
      j.bottom = j.top + j.height;
      j.right = j.left + j.width;
      f.property("ADBE Effect Parade").property(h).remove();
      return j;
    };
    this.getLayerSourceRecAtTimeInComp = function (i, j) {
      var f = i;
      var e = {};
      if (j) {
        g = f
          .property("ADBE Effect Parade")
          .addProperty("ADBE Point3D Control");
        h = g.propertyIndex;
        m =
          "thisLayer.toWorld([thisLayer.sourceRectAtTime(time,true).left,thisLayer.sourceRectAtTime(time,true).top])";
      } else {
        g = f.property("ADBE Effect Parade").addProperty("ADBE Point Control");
        h = g.propertyIndex;
        var n = [];
        var l = [];
        m =
          "var leftTop = thisLayer.toComp([thisLayer.sourceRectAtTime(time,true).left,thisLayer.sourceRectAtTime(time,true).top]); [leftTop[0],leftTop[1]]";
        g.property(1).expressionEnabled = true;
        g.property(1).expression = m;
        k = g(1).value;
        n[n.length] = k[0];
        l[l.length] = k[1];
        e.topLeft = [k[0], k[1]];
        g.property(1).expressionEnabled = false;
        m =
          "var rightTop=thisLayer.toComp([thisLayer.sourceRectAtTime(time,true).left+thisLayer.sourceRectAtTime(time,true).width,thisLayer.sourceRectAtTime(time,true).top]); [rightTop[0],rightTop[1]]";
        g.property(1).expressionEnabled = true;
        g.property(1).expression = m;
        k = g(1).value;
        n[n.length] = k[0];
        l[l.length] = k[1];
        e.topRight = [k[0], k[1]];
        g.property(1).expressionEnabled = false;
        m =
          "var leftBottom = thisLayer.toComp([thisLayer.sourceRectAtTime(time,true).left,thisLayer.sourceRectAtTime(time,true).top+thisLayer.sourceRectAtTime(time,true).height]); [leftBottom[0],leftBottom[1]]";
        g.property(1).expressionEnabled = true;
        g.property(1).expression = m;
        k = g(1).value;
        n[n.length] = k[0];
        l[l.length] = k[1];
        e.bottomLeft = [k[0], k[1]];
        g.property(1).expressionEnabled = false;
        m =
          "var rightBottom = thisLayer.toComp([thisLayer.sourceRectAtTime(time,true).left+thisLayer.sourceRectAtTime(time,true).width,thisLayer.sourceRectAtTime(time,true).top+thisLayer.sourceRectAtTime(time,true).height]);  [rightBottom[0],rightBottom[1]]";
        g.property(1).expressionEnabled = true;
        g.property(1).expression = m;
        k = g(1).value;
        n[n.length] = k[0];
        l[l.length] = k[1];
        e.bottomRight = [k[0], k[1]];
        g.property(1).expressionEnabled = false;
        n.sort(vn_AnchorSniperUI.utils.compareNumbers);
        l.sort(vn_AnchorSniperUI.utils.compareNumbers);
        e.left = n[0];
        e.top = l[0];
        e.right = n[3];
        e.bottom = l[3];
        e.width = Math.abs(e.right - e.left);
        e.height = Math.abs(e.bottom - e.top);
      }
      f.property("ADBE Effect Parade").property(h).remove();
      return e;
    };
    this.getBitmapLayerBBox = function (e) {
      var f = {};
      f.left = 0;
      f.top = 0;
      f.width = e.width;
      f.height = e.height;
      f.right = e.width;
      f.bottom = e.height;
      return f;
    };
    this.getLayerBBox = function (f) {
      var e = f.obj;
      var g = f.scanObj;
      switch (vn_AnchorSniperUI.utils.getLayerType(g)) {
        case "text/shape":
        case "vector":
          if (f.scanObj.threeDLayer) {
            f.scanObj.threeDLayer = false;
          }
          if (
            e
              .property("ADBE Transform Group")
              .property("ADBE Rotate Z")
              .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, false) %
              360 !=
            0
          ) {
            f.scanObj
              .property("ADBE Transform Group")
              .property("ADBE Rotate Z").expressionEnabled = false;
            f.scanObj
              .property("ADBE Transform Group")
              .property("ADBE Rotate Z")
              .setValueAtTime(
                vn_AnchorSniperUI.globalVar.currentCompTime,
                true,
              );
          }
          return this.getLayerSourceRecAtTimeInComp(f.scanObj);
        case "bitmap":
          return this.getBitmapLayerBBox(f.scanObj);
      }
    };
    this.convertVectorAlphaBox = function (e, j) {
      var g = e.scanObj;
      var h = g
        .property("ADBE Effect Parade")
        .addProperty("ADBE Point Control");
      var k = h.propertyIndex;
      var i = "thisLayer.fromComp([" + j.left + "," + j.top + "])";
      h.property(1).expressionEnabled = true;
      h.property(1).expression = i;
      var f = h(1).value;
      h.property(1).expressionEnabled = false;
      j.left = f[0];
      j.top = f[1];
      j.width = Math.abs(
        (j.width * 100) /
          g
            .property("ADBE Transform Group")
            .property("ADBE Scale")
            .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true)[0],
      );
      j.height = Math.abs(
        (j.height * 100) /
          g
            .property("ADBE Transform Group")
            .property("ADBE Scale")
            .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true)[1],
      );
      j.right = j.left + j.width;
      j.bottom = j.top + j.height;
      if (g.scale.value[0] < 0) {
        j.right = j.left;
        j.left = j.left - j.width;
      }
      if (g.scale.value[1] < 0) {
        j.bottom = j.top;
        j.top = j.top - j.height;
      }
      return j;
    };
    this.getLayerAlphaBox = function (g) {
      var l = g.bbox;
      var i = g.scanObj;
      var e = vn_AnchorSniperUI.globalVar.currentCompTime;
      var k = {};
      var f = i
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      if (e > 0) {
        vn_AnchorSniperUI.globalVar.selectedComp.time =
          e - vn_AnchorSniperUI.globalVar.selectedComp.frameDuration;
      } else {
        vn_AnchorSniperUI.globalVar.selectedComp.time =
          e + vn_AnchorSniperUI.globalVar.selectedComp.frameDuration;
      }
      var j =
        "function getLeftEdge(a){for(var b=a.left+a.width/4,c=a.width/4,d=a.top+a.height/2,e=a.height/2;c>.5&&b<=a.left+a.width;){var f=sampleImage([b,d],[c,e],!0,time)[3];f>0?(c/=2,b-=c):b+=2*c}var g=scanLeftSequentially(a,Math.floor(b));return g>a.left+a.width&&(g=0),g}function getTopEdge(a){for(var b=a.left+a.width/2,c=a.width/2,d=a.top+a.height/4,e=a.height/4;e>.5&&d<=a.top+a.height;){var f=sampleImage([b,d],[c,e],!0,time)[3];f>0?(e/=2,d-=e):d+=2*e}var g=scanTopSequentially(a,Math.floor(d));return g>a.top+a.height&&(g=0),g}function getRightEdge(a){for(var b=a.left+3*a.width/4,c=a.width/4,d=a.top+a.height/2,e=a.height/2;c>.5&&b>=a.left;){var f=sampleImage([b,d],[c,e],!0,time)[3];f>0?(c/=2,b+=c):b-=2*c}var g=scanRightSequentially(a,Math.floor(b));return g<a.left&&(g=a.left+a.width),g}function getBottomEdge(a){for(var b=a.top+3*a.height/4,c=a.height/4,d=a.left+a.width/2,e=a.width/2;c>.5&&b>=a.top;){var f=sampleImage([d,b],[e,c],!0,time)[3];f>0?(c/=2,b+=c):b-=2*c}var g=scanBottomSequentially(a,Math.floor(b));return g<a.top&&(g=a.top+a.height),g}function scanX(a,b,c){var d=a.top+a.height/2,e=a.height/2,f=.5,g=a.left,h=a.left+a.width;b=Math.floor(b);var i=sampleImage([b,d],[f,e],!0,time)[3],j=!1;for(0!=i&&(c=-c,j=!0),b+=c;g<=b&&b<=h&&(i=sampleImage([b,d],[f,e],!0,time)[3],0==i!=j);)b+=c;return 1==j&&(b+=-c),b}function scanLeftSequentially(a,b){return scanX(a,b,1)}function scanRightSequentially(a,b){var c=scanX(a,b,-1)+1;return c>a.left+a.width&&(c=a.left+a.width),c}function scanY(a,b,c){var d=a.top,e=.5,f=a.width/2,g=a.left+a.width/2,h=a.top+a.height;b=Math.floor(b);var i=sampleImage([g,b],[f,e],!0,time)[3],j=!1;for(0!=i&&(c=-c,j=!0),b+=c;d<=b&&b<=h&&(i=sampleImage([g,b],[f,e],!0,time)[3],0==i!=j);)b+=c;return 1==j&&(b+=-c),b}function scanTopSequentially(a,b){return scanY(a,b,1)}function scanBottomSequentially(a,b){var c=scanY(a,b,-1)+1;return c>a.top+a.height&&(c=a.top+a.height),c}var bbox=new Object;bbox.left=" +
        l.left +
        ",bbox.top=" +
        l.top +
        ",bbox.width=" +
        l.width +
        ",bbox.height=" +
        l.height +
        ",bbox.right=" +
        l.width +
        ",bbox.bottom=" +
        l.height +
        ";var alphaBox=new Object;alphaBox.left=getLeftEdge(bbox),alphaBox.right=getRightEdge(bbox),alphaBox.bottom=getBottomEdge(bbox),alphaBox.top=getTopEdge(bbox),[alphaBox.left,alphaBox.top,alphaBox.right,((alphaBox.bottom < 0 ) ? ((Math.abs(alphaBox.bottom)+2e4)/1e5) : (alphaBox.bottom/1e5))];";
      f.property(1).expressionEnabled = true;
      f.property(1).expression = j;
      f.property(1).selected = true;
      app.executeCommand(2639);
      f.property(1).selected = false;
      f.property(1).expression = "";
      f.property(1).expressionEnabled = false;
      vn_AnchorSniperUI.globalVar.selectedComp.time = e;
      var h = f
        .property(1)
        .valueAtTime(vn_AnchorSniperUI.globalVar.selectedComp.time, true);
      k.left = h[0];
      k.top = h[1];
      k.right = h[2];
      k.bottom = h[3] * 100000;
      if (k.bottom > 20000) {
        k.bottom = (k.bottom - 20000) * -1;
      }
      k.width = k.right - k.left;
      k.height = k.bottom - k.top;
      switch (vn_AnchorSniperUI.utils.getLayerType(i)) {
        case "text/shape":
        case "vector":
          k = this.convertVectorAlphaBox(g, k);
          break;
        case "bitmap":
          break;
      }
      return k;
    };
    this.getLayerNonAlphaBox = function (f) {
      var e = f.obj;
      switch (f.layerType) {
        case "text/shape":
          return this.getLayerSourceRecAtTime(e);
        case "vector":
        case "bitmap":
          return this.getBitmapLayerBBox(e);
      }
    };
    this.convertFromLayerToCompCoords = function (g, i) {
      var f = g;
      var h = f
        .property("ADBE Effect Parade")
        .addProperty("ADBE Point Control");
      var k = h.propertyIndex;
      var j = "thisLayer.toComp([" + i[0] + "," + i[1] + "])";
      h.property(1).expressionEnabled = true;
      h.property(1).expression = j;
      var e = h.property(1).value;
      h.property(1).expressionEnabled = false;
      f.property("ADBE Effect Parade").property(k).remove();
      return e;
    };
    this.convertFromLayerToWorldCoords = function (h, i) {
      var g = h;
      var k = g
        .property("ADBE Effect Parade")
        .addProperty("ADBE Point3D Control");
      var f = k.propertyIndex;
      var j = "thisLayer.toWorld([" + i[0] + "," + i[1] + "," + i[2] + "])";
      k.property(1).expressionEnabled = true;
      k.property(1).expression = j;
      var e = k.property(1).value;
      k.property(1).expressionEnabled = false;
      g.property("ADBE Effect Parade").property(f).remove();
      return e;
    };
    this.convertFromWorldToLayerCoords = function (i, e) {
      var g = i;
      var l = g
        .property("ADBE Effect Parade")
        .addProperty("ADBE Point3D Control");
      var f = l.propertyIndex;
      var k = "thisLayer.fromWorld([" + e[0] + "," + e[1] + "," + e[2] + "])";
      l.property(1).expressionEnabled = true;
      l.property(1).expression = k;
      var h = l(1).value;
      l.property(1).expressionEnabled = false;
      var j = [h[0], h[1], h[2]];
      g.property("ADBE Effect Parade").property(f).remove();
      return j;
    };
    this.convertFromCompToSurfaceCoords = function (i, e) {
      var g = i;
      var l = g
        .property("ADBE Effect Parade")
        .addProperty("ADBE Point3D Control");
      var f = l.propertyIndex;
      var k =
        "thisLayer.fromCompToSurface([" + e[0] + "," + e[1] + "," + e[2] + "])";
      l.property(1).expressionEnabled = true;
      l.property(1).expression = k;
      var h = l(1).value;
      l.property(1).expressionEnabled = false;
      var j = [h[0], h[1], h[2]];
      g.property("ADBE Effect Parade").property(f).remove();
      return j;
    };
    this.convertFromCompToLayerCoords = function (i, e) {
      var g = i;
      var l = g
        .property("ADBE Effect Parade")
        .addProperty("ADBE Point3D Control");
      var f = l.propertyIndex;
      var k = "thisLayer.fromComp([" + e[0] + "," + e[1] + "," + e[2] + "])";
      l.property(1).expressionEnabled = true;
      l.property(1).expression = k;
      var h = l(1).value;
      l.property(1).expressionEnabled = false;
      var j = [h[0], h[1], h[2]];
      g.property("ADBE Effect Parade").property(f).remove();
      return j;
    };
  }
  var b = this;
  this.utils = new d();
  this.scan = new c();
  this.globalVar = {};
  this.globalVar.scriptName = "Anchor SNIPER";
  this.globalVar.scriptVersion = "1.0";
  this.globalVar.scriptAuthor = "Video Narco";
  this.globalVar.isTrial = true;
  this.globalVar.registration = "";
  this.globalVar.userOSVer = this.utils.osCheck();
  this.globalVar.urlLaunchCode = this.utils.getUrlLaunchCode(
    this.globalVar.userOSVer,
  );
  this.globalVar.burger_list_on = false;
  this.globalVar.burger_list_should_close = true;
  this.globalVar.selectedComp = null;
  this.globalVar.currentCompTime = 0;
  this.globalVar.selectedLayers = [];
  this.globalVar.err_msg = false;
  this.globalVar.operation_in_progress = false;
  this.globalVar.savedSettings = [];
  this.globalVar.savedSettings.hideLayerControls = true;
  this.globalVar.savedSettings.iconsUI = false;
  this.globalVar.savedSettings.showTools = true;
  this.globalVar.savedSettings.centerAfterCrop = false;
  this.globalVar.savedSettings.hideBgImage = false;
  this.globalVar.savedSettings.hideCustomTargetWarning = false;
  this.globalVar.savedSettings.hideBitDepthWarning = false;
  this.globalVar.winObjSettings = [];
  this.globalVar.winObjSettings.winSizeBig = [0, 0, 293, 180];
  this.globalVar.winObjSettings.winSizeSmall = [0, 0, 194, 180];
  this.globalVar.winObjSettings.winSizeBigWithTools = [0, 0, 293, 244];
  this.globalVar.winObjSettings.winSizeSmallWithTools = [0, 0, 194, 244];
  this.globalVar.winObjSettings.winSizeCurrent =
    this.globalVar.winObjSettings.winSizeBig;
  this.globalVar.winObjSettings.iconsUI = false;
  this.globalVar.winObjSettings.hideBgImage = false;
  this.globalVar.winObjSettings.showTools = true;
  this.globalVar.winObjSettings.panelMainSizeSmall = [6, 6, 187, 173];
  this.globalVar.winObjSettings.panelMainSizeBig = [6, 6, 286, 173];
  this.globalVar.winObjSettings.panelMainSizeCurrent =
    this.globalVar.winObjSettings.panelMainSizeBig;
  this.globalVar.winObjSettings.groupAnchorSizeSmall = [11, 13, 104, 108];
  this.globalVar.winObjSettings.groupAnchorSizeBig = [13, 13, 106, 108];
  this.globalVar.winObjSettings.groupAnchorSizeCurrent =
    this.globalVar.winObjSettings.groupAnchorSizeBig;
  this.globalVar.winObjSettings.seperaterLineSizeSmall = [21, 129, 112, 129];
  this.globalVar.winObjSettings.seperaterLineSizeBig = [23, 129, 114, 129];
  this.globalVar.winObjSettings.seperaterLineSizeCurrent =
    this.globalVar.winObjSettings.seperaterLineSizeBig;
  this.globalVar.winObjSettings.groupCustomSizeSmall = [11, 122, 104, 150];
  this.globalVar.winObjSettings.groupCustomSizeBig = [13, 122, 106, 150];
  this.globalVar.winObjSettings.groupCustomSizeCurrent =
    this.globalVar.winObjSettings.groupCustomSizeBig;
  this.globalVar.winObjSettings.burgerListSizeSmall = [71, 19, 151, 85];
  this.globalVar.winObjSettings.burgerListSizeBig = [170, 19, 250, 85];
  this.globalVar.winObjSettings.burgerListSizeCurrent =
    this.globalVar.winObjSettings.burgerListSizeBig;
  this.globalVar.winObjSettings.burgerButtonSizeSmall = [145, 5, 171, 25];
  this.globalVar.winObjSettings.burgerButtonSizeBig = [243, 5, 269, 25];
  this.globalVar.winObjSettings.burgerButtonSizeCurrent =
    this.globalVar.winObjSettings.burgerButtonSizeBig;
  this.globalVar.createNullMODE = false;
  this.globalVar.layersLockedState = [];
  this.globalVar.lastCustomTarget = false;
  this.globalVar.customControlLayersOn = false;
  this.globalVar.customTargetLayer = false;
  this.globalVar.customLinesLayer = false;
  this.globalVar.newNullLayers = [];
  this.globalVar.progressWin = false;
  var af_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [],
    helpText:
      "For a complete User Guide, select \'Help...\' from the burger dropdown menu.",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 5932056451980258,
    productSKU: "VNCAS-SUL",
    scriptAuthor: "Video Narco",
    scriptName: this.globalVar.scriptName,
    scriptURL: "http://aescripts.com/anchor-sniper/",
    scriptVersion: this.globalVar.scriptVersion,
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
    var wx = __BLOB__BLOB_000075__;
    var mx = __BLOB__BLOB_000076__;
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
  this.globalVar.t9 = new a(af_settings);
  this.globalVar.isTrial = this.globalVar.t9.t();
  this.globalConstants = {};
  this.globalConstants.scriptDataFolderName = "AnchorSNIPER";
  this.globalConstants.precisionSet = 1e-5;
  this.globalConstants.settingsSection = "Anchor SNIPER Settings";
  this.globalConstants.progressBarTitle = "Sniper Progress...";
  this.globalConstants.progressBarSubTitle = "Processing... %1 / 100 Layers";
  this.populateGlobalVars = function () {
    this.globalVar.selectedComp = app.project.activeItem;
    this.globalVar.currentCompTime = this.globalVar.selectedComp.time;
    this.globalVar.selectedLayers =
      vn_AnchorSniperUI.globalVar.selectedComp.selectedLayers;
  };
  this.currentLayerContainerObj = function (f) {
    var e = {};
    e.obj = f;
    e.layerType = this.utils.getLayerType(f);
    e.currentParent = e.obj.parent;
    e.obj.parent = null;
    e.currentAnchorPoint = f.anchorPoint.valueAtTime(
      vn_AnchorSniperUI.globalVar.currentCompTime,
      true,
    );
    e.currentInPoint = f.inPoint;
    e.currentOutPoint = f.outPoint;
    e.currentEffectsSwitch = f.effectsActive;
    e.currentSoloState = e.obj.solo;
    e.currentMotionBlurState = e.obj.motionBlur;
    e.obj.motionBlur = false;
    e.obj.enabled = false;
    return e;
  };
  this.currentLayerContainerDuplicateObj = function (e) {
    var f = e.duplicate();
    f.enabled = false;
    f.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
    f.inPoint = this.globalVar.currentCompTime;
    f.outPoint =
      this.globalVar.currentCompTime +
      this.globalVar.selectedComp.frameDuration;
    if (!e.effectsActive) {
      this.utils.removeEffectsFromLayer(f);
    }
    return f;
  };
  this.returnLayerToInitialState = function (e) {
    if (!this.globalVar.createNullMODE) {
      e.obj.parent = e.currentParent;
    }
    if (e.currentEffectsSwitch) {
      e.obj.effectsActive = e.currentEffectsSwitch;
    }
    if (e.currentMotionBlurState) {
      e.obj.motionBlur = e.currentMotionBlurState;
    }
    e.obj.enabled = true;
    if (e.currentSoloState) {
      e.obj.solo = e.currentSoloState;
    }
  };
  this.getFixedRecLocation = function (f) {
    var g = f.alphaBox;
    var e = f.fixedAnchorLocation;
    switch (e) {
      case "topleft":
        h = [g.left, g.top];
        break;
      case "top":
        h = [g.left + g.width / 2, g.top];
        break;
      case "topright":
        h = [g.right, g.top];
        break;
      case "left":
        h = [g.left, g.top + g.height / 2];
        break;
      case "center":
        h = [g.left + g.width / 2, g.top + g.height / 2];
        break;
      case "right":
        h = [g.right, g.top + g.height / 2];
        break;
      case "bottomleft":
        h = [g.left, g.bottom];
        break;
      case "bottom":
        h = [g.left + g.width / 2, g.bottom];
        break;
      case "bottomright":
        h = [g.right, g.bottom];
        break;
    }
    h[2] = 0;
    return h;
  };
  this.setLayerAnchorPoint = function (e, f) {
    if (
      e.property("ADBE Transform Group").property("ADBE Anchor Point")
        .isTimeVarying
    ) {
      e.property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .setValueAtTime(this.globalVar.currentCompTime, f);
    } else {
      e.property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .setValue(f);
    }
  };
  this.setAnchorPointInPlace = function (m, n) {
    if (this.globalVar.createNullMODE) {
      this.setNullInPlace(m);
    } else {
      var o = m.obj;
      var q = m.newAnchorPoint;
      var k = "";
      if (n) {
        this.setLayerAnchorPoint(o, q);
      } else {
        var g = m.worldAnchorPoint;
        var p = m.currentAnchorPoint;
        if (
          o.property("ADBE Transform Group").property("ADBE Position")
            .isTimeVarying
        ) {
          var f = o
            .property("ADBE Transform Group")
            .property("ADBE Position")
            .valueAtTime(this.globalVar.currentCompTime, true);
          var e = [g[0], g[1], g[2]];
          var j = [f[0] - e[0], f[1] - e[1], f[2] - e[2]];
          this.setLayerAnchorPoint(o, q);
          if (
            o.property("ADBE Transform Group").property("ADBE Anchor Point")
              .isTimeVarying
          ) {
            o.property("ADBE Transform Group")
              .property("ADBE Position")
              .setValueAtTime(this.globalVar.currentCompTime, e);
          } else {
            for (
              var l = 1;
              l <
              o.property("ADBE Transform Group").property("ADBE Position")
                .numKeys +
                1;
              l += 1
            ) {
              var h = o
                .property("ADBE Transform Group")
                .property("ADBE Position")
                .keyValue(l);
              k = [h[0] - j[0], h[1] - j[1], h[2] - j[2]];
              o.property("ADBE Transform Group")
                .property("ADBE Position")
                .setValueAtKey(l, k);
            }
          }
        } else {
          this.setLayerAnchorPoint(o, q);
          var r = o
            .property("ADBE Transform Group")
            .property("ADBE Position")
            .valueAtTime(this.globalVar.currentCompTime, true);
          k = [g[0], g[1], g[2]];
          o.property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue(k);
        }
      }
    }
  };
  this.repositionAnchor = function (q, E, n) {
    if (this.globalVar.progressWin) {
      this.globalVar.progressWin.progressChunk = 1;
      this.globalVar.progressWin.progress_bar_value = 0;
    }
    if (!n.layerAlpha && !n.useComp && !n.groupLayers) {
      for (var x = 0; x < q.length; x += 1) {
        y = this.currentLayerContainerObj(q[x]);
        y.fixedAnchorLocation = E;
        y.alphaBox = this.scan.getLayerNonAlphaBox(y);
        y.newAnchorPoint = this.getFixedRecLocation(y);
        y.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
          y.obj,
          y.newAnchorPoint,
        );
        this.setAnchorPointInPlace(y, n.moveLayer);
        this.returnLayerToInitialState(y);
        this.globalVar.progressWin.hit();
      }
    } else {
      if (n.layerAlpha && !n.useComp && !n.groupLayers) {
        this.scan.checkProjectBitDepth();
        for (var x = 0; x < q.length; x += 1) {
          y = this.currentLayerContainerObj(q[x]);
          y.fixedAnchorLocation = E;
          y.scanObj = this.currentLayerContainerDuplicateObj(y.obj);
          y.bbox = this.scan.getLayerBBox(y);
          y.alphaBox = this.scan.getLayerAlphaBox(y);
          y.scanObj.remove();
          y.newAnchorPoint = this.getFixedRecLocation(y);
          y.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
            y.obj,
            y.newAnchorPoint,
          );
          this.setAnchorPointInPlace(y, n.moveLayer);
          this.returnLayerToInitialState(y);
          this.globalVar.progressWin.hit();
        }
      } else {
        if (n.layerAlpha && n.useComp && !n.moveLayer && !n.groupLayers) {
          this.scan.checkProjectBitDepth();
          g = app.project.items.addFolder("Anchor SNIPER Temp Folder");
          for (var x = 0; x < q.length; x += 1) {
            y = this.currentLayerContainerObj(q[x]);
            y.fixedAnchorLocation = E;
            var C = y.obj.duplicate();
            C.enabled = false;
            var l = C.index;
            C.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
            if (!y.currentEffectsSwitch) {
              this.utils.removeEffectsFromLayer(C);
            }
            h = C.name + " Temp Precomp";
            s = this.globalVar.selectedComp.layers.precompose([l], h, true);
            s.parentFolder = g;
            y.scanObj = this.globalVar.selectedComp.layer(l);
            y.scanObj.enabled = false;
            y.scanObj.inPoint = this.globalVar.currentCompTime;
            y.scanObj.outPoint =
              this.globalVar.currentCompTime +
              this.globalVar.selectedComp.frameDuration;
            y.scanObj.collapseTransformation = true;
            s.layer(1).enabled = true;
            y.bbox = this.scan.getLayerBBox(y);
            y.alphaBox = this.scan.getLayerAlphaBox(y);
            y.compAnchorPoint = this.getFixedRecLocation(y);
            y.newAnchorPoint = this.scan.convertFromCompToSurfaceCoords(
              y.obj,
              y.compAnchorPoint,
            );
            y.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
              y.obj,
              y.newAnchorPoint,
            );
            this.setAnchorPointInPlace(y, n.moveLayer);
            this.returnLayerToInitialState(y);
            this.globalVar.progressWin.hit();
          }
          g.remove();
        } else {
          if (!n.layerAlpha && n.useComp && !n.moveLayer && !n.groupLayers) {
            for (var x = 0; x < q.length; x += 1) {
              y = this.currentLayerContainerObj(q[x]);
              y.fixedAnchorLocation = E;
              y.alphaBox = {};
              y.alphaBox.left = 0;
              y.alphaBox.top = 0;
              y.alphaBox.width = this.globalVar.selectedComp.width;
              y.alphaBox.height = this.globalVar.selectedComp.height;
              y.alphaBox.right = this.globalVar.selectedComp.width;
              y.alphaBox.bottom = this.globalVar.selectedComp.height;
              y.compAnchorPoint = this.getFixedRecLocation(y);
              y.newAnchorPoint = this.scan.convertFromCompToSurfaceCoords(
                y.obj,
                y.compAnchorPoint,
              );
              y.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
                y.obj,
                y.newAnchorPoint,
              );
              this.setAnchorPointInPlace(y, n.moveLayer);
              this.returnLayerToInitialState(y);
              this.globalVar.progressWin.hit();
            }
          } else {
            if (n.useComp && n.moveLayer && !n.groupLayers) {
              g = {};
              j = {};
              j.layerAlpha = false;
              j.useComp = true;
              j.moveLayer = false;
              j.groupLayers = false;
              this.repositionAnchor(q, E, j);
              j.layerAlpha = n.layerAlpha;
              j.useComp = false;
              j.moveLayer = true;
              j.groupLayers = false;
              this.repositionAnchor(q, E, j);
            } else {
              if (!n.layerAlpha && n.useComp && !n.moveLayer && n.groupLayers) {
                for (var x = 0; x < q.length; x += 1) {
                  y = this.currentLayerContainerObj(q[x]);
                  y.fixedAnchorLocation = E;
                  y.alphaBox = {};
                  y.alphaBox.left = 0;
                  y.alphaBox.top = 0;
                  y.alphaBox.width = this.globalVar.selectedComp.width;
                  y.alphaBox.height = this.globalVar.selectedComp.height;
                  y.alphaBox.right = this.globalVar.selectedComp.width;
                  y.alphaBox.bottom = this.globalVar.selectedComp.height;
                  y.compAnchorPoint = this.getFixedRecLocation(y);
                  y.newAnchorPoint = this.scan.convertFromCompToLayerCoords(
                    y.obj,
                    y.compAnchorPoint,
                  );
                  y.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
                    y.obj,
                    y.newAnchorPoint,
                  );
                  this.setAnchorPointInPlace(y, n.moveLayer);
                  this.returnLayerToInitialState(y);
                  this.globalVar.progressWin.hit();
                }
              } else {
                if (n.useComp && n.moveLayer && n.groupLayers) {
                  j = {};
                  j.layerAlpha = false;
                  j.useComp = true;
                  j.moveLayer = false;
                  j.groupLayers = false;
                  this.repositionAnchor(q, E, j);
                  j.layerAlpha = n.layerAlpha;
                  j.useComp = false;
                  j.moveLayer = true;
                  j.groupLayers = true;
                  this.repositionAnchor(q, E, j);
                } else {
                  if (n.groupLayers) {
                    this.scan.checkProjectBitDepth();
                    g = app.project.items.addFolder(
                      "Anchor SNiPER Temp Folder",
                    );
                    var r = [];
                    var B = [];
                    var p = [];
                    var A = [];
                    var z = true;
                    var i = q[0]
                      .property("ADBE Transform Group")
                      .property("ADBE Position")
                      .valueAtTime(this.globalVar.currentCompTime, false);
                    for (var e = 0; e < i.length; e += 1) {
                      if (Math.abs(i[e]) < this.globalConstants.precisionSet) {
                        i[e] = 0;
                      }
                    }
                    var v = [];
                    for (var x = 0; x < q.length; x += 1) {
                      v[v.length] = q[x].parent;
                      q[x].parent = null;
                      r[x] = q[x].duplicate();
                      r[x].enabled = false;
                      r[x].trackMatteType = TrackMatteType.NO_TRACK_MATTE;
                      r[x].inPoint = this.globalVar.currentCompTime;
                      r[x].outPoint =
                        this.globalVar.currentCompTime +
                        this.globalVar.selectedComp.frameDuration;
                      if (!q[x].effectsActive) {
                        this.utils.removeEffectsFromLayer(r[x]);
                      }
                      var t = [];
                      t[0] = q[x]
                        .property("ADBE Transform Group")
                        .property("ADBE Position")
                        .valueAtTime(this.globalVar.currentCompTime, true)[0];
                      t[1] = q[x]
                        .property("ADBE Transform Group")
                        .property("ADBE Position")
                        .valueAtTime(this.globalVar.currentCompTime, true)[1];
                      t[2] = q[x]
                        .property("ADBE Transform Group")
                        .property("ADBE Position")
                        .valueAtTime(this.globalVar.currentCompTime, true)[2];
                      for (var e = 0; e < t.length; e += 1) {
                        if (
                          Math.abs(t[e]) < this.globalConstants.precisionSet
                        ) {
                          t[e] = 0;
                        }
                      }
                      if ((i[0] != t[0] || i[1] != t[1] || i[2] != t[2]) && z) {
                        z = false;
                      }
                      var H = [];
                      H[H.length] = this.scan.convertFromLayerToWorldCoords(
                        q[x],
                        [0, 0, 0],
                      )[2];
                      H[H.length] = this.scan.convertFromLayerToWorldCoords(
                        q[x],
                        [0, r[x].width, 0],
                      )[2];
                      H[H.length] = this.scan.convertFromLayerToWorldCoords(
                        q[x],
                        [r[x].height, 0, 0],
                      )[2];
                      H[H.length] = this.scan.convertFromLayerToWorldCoords(
                        q[x],
                        [r[x].height, r[x].width, 0],
                      )[2];
                      H.sort(vn_AnchorSniperUI.utils.compareNumbers);
                      A[A.length] = H[0];
                      A[A.length] = H[3];
                      var u = this.scan.getLayerSourceRecAtTimeInComp(
                        q[x],
                        false,
                      );
                      B[B.length] = u.left;
                      B[B.length] = u.right;
                      p[p.length] = u.top;
                      p[p.length] = u.bottom;
                    }
                    B.sort(vn_AnchorSniperUI.utils.compareNumbers);
                    p.sort(vn_AnchorSniperUI.utils.compareNumbers);
                    A.sort(vn_AnchorSniperUI.utils.compareNumbers);
                    var G = A[0] + (A[A.length - 1] - A[0]) / 2;
                    var o = [];
                    for (var D = 0; D < r.length; D += 1) {
                      o[o.length] = r[D].index;
                    }
                    h =
                      "Anchor SNiPER Temp Group Precomp " +
                      this.utils.getRandomInt(4);
                    s = this.globalVar.selectedComp.layers.precompose(
                      o,
                      h,
                      true,
                    );
                    s.parentFolder = g;
                    var w = {};
                    w.obj = this.globalVar.selectedComp.layer(h);
                    w.obj.enabled = false;
                    w.obj.selected = true;
                    for (var m = 1; m <= s.numLayers; m += 1) {
                      s.layer(m).enabled = true;
                    }
                    w.obj.collapseTransformation = !n.useComp;
                    w.layerType = this.utils.getLayerType(w.obj);
                    w.bbox = {};
                    w.bbox.left = B[0];
                    w.bbox.top = p[0];
                    w.bbox.right = B[B.length - 1];
                    w.bbox.bottom = p[p.length - 1];
                    w.bbox.width = Math.abs(w.bbox.right - w.bbox.left);
                    w.bbox.height = Math.abs(w.bbox.bottom - w.bbox.top);
                    w.obj.inPoint = this.globalVar.currentCompTime;
                    w.obj.outPoint =
                      this.globalVar.currentCompTime +
                      this.globalVar.selectedComp.frameDuration;
                    w.scanObj = w.obj;
                    if (n.layerAlpha) {
                      w.alphaBox = this.scan.getLayerAlphaBox(w);
                    } else {
                      w.alphaBox = w.bbox;
                    }
                    for (var F = 0; F < v.length; F += 1) {
                      q[F].parent = v[F];
                    }
                    if (this.globalVar.createNullMODE) {
                      w.fixedAnchorLocation = E;
                      w.compAnchorPoint = this.getFixedRecLocation(w);
                      this.createGroupNull(q, w.compAnchorPoint);
                    } else {
                      for (var x = 0; x < q.length; x += 1) {
                        y = this.currentLayerContainerObj(q[x]);
                        y.alphaBox = w.alphaBox;
                        if (!z && n.moveLayer) {
                          var f = "center";
                          y.fixedAnchorLocation = f;
                          y.compAnchorPoint = this.getFixedRecLocation(y);
                          if (n.useComp) {
                            y.compAnchorPoint[2] = 0;
                          } else {
                            y.compAnchorPoint[2] = G;
                          }
                          y.newAnchorPoint =
                            this.scan.convertFromWorldToLayerCoords(
                              y.obj,
                              y.compAnchorPoint,
                            );
                          y.worldAnchorPoint =
                            this.scan.convertFromLayerToWorldCoords(
                              y.obj,
                              y.newAnchorPoint,
                            );
                          this.setAnchorPointInPlace(y, false);
                        }
                        y.fixedAnchorLocation = E;
                        y.compAnchorPoint = this.getFixedRecLocation(y);
                        if (n.useComp) {
                          y.compAnchorPoint[2] = 0;
                        } else {
                          y.compAnchorPoint[2] = G;
                        }
                        y.newAnchorPoint =
                          this.scan.convertFromWorldToLayerCoords(
                            y.obj,
                            y.compAnchorPoint,
                          );
                        y.worldAnchorPoint =
                          this.scan.convertFromLayerToWorldCoords(
                            y.obj,
                            y.newAnchorPoint,
                          );
                        this.setAnchorPointInPlace(y, n.moveLayer);
                        this.returnLayerToInitialState(y);
                        if (this.globalVar.progressWin) {
                          this.globalVar.progressWin.hit();
                        }
                      }
                    }
                    g.remove();
                  }
                }
              }
            }
          }
        }
      }
    }
  };
  this.anchorPointToFixedLocation = function (f) {
    if (this.utils.checkForActiveItems(this)) {
      var g = "Move Anchor Point to ";
      if (this.globalVar.createNullMODE) {
        g = "Add Null Parent at ";
      }
      switch (f) {
        case "topleft":
          g += "Top Left";
          break;
        case "top":
          g += "Top";
          break;
        case "topright":
          g += "Top Right";
          break;
        case "left":
          g += "Left";
          break;
        case "center":
          g += "Center";
          break;
        case "right":
          g += "Right";
          break;
        case "bottomleft":
          g += "Bottom Left";
          break;
        case "bottom":
          g += "Bottom";
          break;
        case "bottomright":
          g += "Bottom Right";
          break;
      }
      app.beginUndoGroup(g);
      this.populateGlobalVars();
      var e = this.utils.getUsableLayers(this.globalVar.selectedLayers);
      this.globalVar.newNullLayers = [];
      if (e) {
        this.globalVar.progressWin = new this.utils.ProgressBar(
          this.globalConstants.progressBarTitle,
          150,
          50,
        );
        var i = "Processing %1 / " + e.length + " Layers";
        this.globalVar.progressWin.show(i, e.length, 0);
        this.globalVar.progressWin.update();
        var h = this.collectAnchorOptions();
        this.repositionAnchor(e, f, h);
      } else {
        this.globalVar.err_msg = "Cannot perform action on selected layers.";
      }
      if (this.globalVar.createNullMODE) {
        this.utils.reSelectLayers(
          this.globalVar.newNullLayers,
          this.globalVar.selectedComp,
        );
        this.cancelSelectNullTarget();
      } else {
        this.utils.reSelectLayers(
          this.globalVar.selectedLayers,
          this.globalVar.selectedComp,
        );
      }
      if (this.globalVar.progressWin) {
        this.globalVar.progressWin.close();
      }
      app.endUndoGroup();
    }
  };
  this.selectCustomPosition = function () {
    if (this.utils.checkForActiveItems(this)) {
      this.populateGlobalVars();
      if (!this.globalVar.savedSettings.hideCustomTargetWarning) {
        var h =
          'Use the Selection Tool to move the Anchor SNIPER Target layer and select a new location for the anchor point.\nClick the Check button ("V") next to the Custom Target button in the Anchor SNIPER\'s Panel. \nTo cancel click the "X" button.';
        var f = __BLOB__BLOB_000077__;
        var e = __BLOB__BLOB_000078__;
        this.globalVar.customTargetTipImgs = [];
        this.globalVar.customTargetTipImgs[0] = ScriptUI.newImage(
          vn_AnchorSniperUI.utils.createResourceFile(
            "customTargetTipImg01.png",
            f,
            vn_AnchorSniperUI.utils.getUserDataFolder(
              vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
            ),
          ),
        );
        this.globalVar.customTargetTipImgs[1] = ScriptUI.newImage(
          vn_AnchorSniperUI.utils.createResourceFile(
            "customTargetTipImg02.png",
            e,
            vn_AnchorSniperUI.utils.getUserDataFolder(
              vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
            ),
          ),
        );
        this.openWarningDialog(
          h,
          "Anchor SNIPER Tip",
          this.globalVar.customTargetTipImgs[0],
          "hideCustomTargetWarning",
        );
      }
      app.beginUndoGroup("Select a Custom Anchor Point Target");
      this.globalVar.winObj.panelMain.groupCustomButtons.iconbut_Target.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_TL.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_T.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_TR.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_L.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_C.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_R.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_BL.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_B.enabled = false;
      this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_BR.enabled = false;
      this.globalVar.winObj.panelMain.groupOptions.check_UseComp.enabled = false;
      this.globalVar.winObj.panelMain.groupOptions.check_LayerAlpha.enabled = false;
      if (this.globalVar.winObjSettings.showTools) {
        this.globalVar.winObj.panelTools.groupToolsButtons.but_SplitMasks.enabled = false;
        this.globalVar.winObj.panelTools.groupToolsButtons.but_cropPrecomp.enabled = false;
        this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.enabled = false;
      }
      this.globalVar.winObj.panelMain.groupCustomButtons.iconbut_OK.enabled = true;
      this.globalVar.winObj.panelMain.groupCustomButtons.iconbut_Cancel.enabled = true;
      this.globalVar.layersLockedState = [];
      for (
        var j = 1;
        j < this.globalVar.selectedComp.layers.length + 1;
        j += 1
      ) {
        this.globalVar.layersLockedState[j] =
          this.globalVar.selectedComp.layer(j).locked;
        this.globalVar.selectedComp.layer(j).locked = true;
      }
      this.globalVar.customLinesLayer =
        this.globalVar.selectedComp.layers.addShape();
      this.globalVar.customLinesLayer.name = "Anchor SNIPER Lines";
      this.globalVar.customLinesLayer.label = 14;
      this.globalVar.customLinesLayer.blendingMode = BlendingMode.DIFFERENCE;
      this.globalVar.customLinesLayer.guideLayer = true;
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group");
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1).name = "LineX";
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      var o = this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property("ADBE Vector Shape");
      var p = o.value;
      var k =
        (this.globalVar.selectedComp.width / 2) *
        this.globalVar.selectedComp.pixelAspect;
      p.vertices = [
        [-k, 0],
        [k, 0],
      ];
      p.inTangents = [
        [0, 0],
        [0, 0],
      ];
      p.outTangents = [
        [0, 0],
        [0, 0],
      ];
      p.closed = false;
      o.setValue(p);
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Graphic - Stroke");
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Stroke Width")
        .setValue(1);
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group");
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2).name = "LineY";
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      var m = this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(1)
        .property("ADBE Vector Shape");
      var n = m.value;
      n.vertices = [
        [-0, -(this.globalVar.selectedComp.height / 2)],
        [0, this.globalVar.selectedComp.height / 2],
      ];
      n.inTangents = [
        [0, 0],
        [0, 0],
      ];
      n.outTangents = [
        [0, 0],
        [0, 0],
      ];
      n.closed = false;
      m.setValue(n);
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Graphic - Stroke");
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(2)
        .property("ADBE Vector Stroke Width")
        .setValue(1);
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      this.globalVar.customTargetLayer =
        this.globalVar.selectedComp.layers.addShape();
      this.globalVar.customTargetLayer.name = "Anchor SNIPER Target";
      this.globalVar.customTargetLayer.label = 14;
      this.globalVar.customTargetLayer.blendingMode = BlendingMode.DIFFERENCE;
      this.globalVar.customTargetLayer.guideLayer = true;
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group");
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1).name = "Large Ellipse 1";
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Shape - Ellipse");
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property("ADBE Vector Ellipse Size")
        .setValue([150, 150]);
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Graphic - Stroke");
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Position").expression.expressionEnabled = true;
      var g =
        '[value[0],thisComp.layer("Anchor SNIPER Target").transform.position[1]-' +
        this.globalVar.selectedComp.height / 2 +
        "]";
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Position").expression = g;
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Position").expression.expressionEnabled = true;
      var l =
        '[thisComp.layer("Anchor SNIPER Target").transform.position[0]-' +
        this.globalVar.selectedComp.width / 2 +
        ",value[1]]";
      this.globalVar.customLinesLayer
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Position").expression = l;
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property("ADBE Vector Ellipse Size").expression = "[150,150]";
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property("ADBE Vector Ellipse Position").expression = "[0,0]";
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Anchor").expression = "[0,0]";
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Position").expression = "[0,0]";
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Scale").expression = "[100,100]";
      this.globalVar.customTargetLayer
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Rotation").expression = "0";
      this.globalVar.customTargetLayer
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point").expression = "[0,0]";
      this.globalVar.customTargetLayer
        .property("ADBE Transform Group")
        .property("ADBE Scale").expression = "[100,100]";
      this.globalVar.customTargetLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Z").expression = "0";
      this.globalVar.customTargetLayer
        .property("ADBE Transform Group")
        .property("ADBE Opacity").expression = "100";
      this.globalVar.customLinesLayer.locked = true;
      this.globalVar.customTargetLayer.moveToBeginning();
      if (this.globalVar.lastCustomTarget != false) {
        this.globalVar.customTargetLayer
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(this.globalVar.lastCustomTarget);
      }
      if (this.globalVar.savedSettings.hideLayerControls) {
        app.executeCommand(2435);
      }
      this.globalVar.customControlLayersOn = true;
      app.endUndoGroup();
    }
  };
  this.repositionLayerCustomAnchor = function () {
    var h = this.collectAnchorOptions();
    var r = this.globalVar.selectedLayers;
    var q = r[0]
      .property("ADBE Transform Group")
      .property("ADBE Position")
      .valueAtTime(this.globalVar.selectedComp.time, true);
    for (var o = 0; o < q.length; o += 1) {
      if (Math.abs(q[o]) < this.globalConstants.precisionSet) {
        q[o] = 0;
      }
    }
    var f = true;
    if (h.moveLayer && h.groupLayers) {
      for (var i = 0; i < r.length; i += 1) {
        var n = r[i]
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .valueAtTime(this.globalVar.currentCompTime, true);
        for (var t = 0; t < n.length; t += 1) {
          if (Math.abs(n[t]) < this.globalConstants.precisionSet) {
            n[t] = 0;
          }
        }
        if ((q[0] != n[0] || q[1] != n[1] || q[2] != n[2]) && f) {
          f = false;
          break;
        }
      }
      if (!f) {
        var p = {};
        p.layerAlpha = h.layerAlpha;
        p.useComp = false;
        p.moveLayer = false;
        p.groupLayers = true;
        var e = "center";
        this.repositionAnchor(r, e, p);
      }
    }
    for (var g = 0; g < r.length; g += 1) {
      var m = r[g];
      var l = {};
      l.obj = m;
      l.currentParent = l.obj.parent;
      l.obj.parent = null;
      l.currentAnchorPoint = l.obj
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true);
      l.newAnchorPoint = this.scan.convertFromCompToSurfaceCoords(
        l.obj,
        this.globalVar.lastCustomTarget,
      );
      l.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
        l.obj,
        l.newAnchorPoint,
      );
      if (h.moveLayer) {
        var u = m
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .valueAtTime(this.globalVar.selectedComp.time, false);
        var s = this.globalVar.selectedComp.layers.addNull(
          this.globalVar.selectedComp.duration,
        );
        s.threeDLayer = true;
        s.property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(u);
        m.parent = s;
        s.property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(l.worldAnchorPoint);
        s.remove();
      } else {
        this.setAnchorPointInPlace(l, h.moveLayer);
      }
      l.obj.parent = l.currentParent;
    }
    this.utils.reSelectLayers(
      this.globalVar.selectedLayers,
      this.globalVar.selectedComp,
    );
  };
  this.repositionCustomAnchor = function () {
    this.globalVar.newNullLayers = [];
    if (this.globalVar.createNullMODE) {
      this.setCustomNullLocation();
    } else {
      this.repositionLayerCustomAnchor();
    }
  };
  this.removeCustomTargetUI = function () {
    this.enableAllGuiElements();
    this.globalVar.winObj.panelMain.groupCustomButtons.iconbut_OK.enabled = false;
    this.globalVar.winObj.panelMain.groupCustomButtons.iconbut_Cancel.enabled = false;
    try {
      if (this.globalVar.savedSettings.hideLayerControls) {
        app.executeCommand(2435);
      }
      this.globalVar.customTargetLayer.remove();
      this.globalVar.customLinesLayer.locked = false;
      this.globalVar.customLinesLayer.remove();
      this.globalVar.customControlLayersOn = false;
      for (
        var f = 1;
        f < this.globalVar.selectedComp.layers.length + 1;
        f += 1
      ) {
        this.globalVar.selectedComp.layer(f).locked =
          this.globalVar.layersLockedState[f];
      }
      this.utils.reSelectLayers(
        this.globalVar.selectedLayers,
        this.globalVar.selectedComp,
      );
    } catch (g) {}
  };
  this.cancelCustomPosition = function () {
    if (this.globalVar.customControlLayersOn) {
      app.beginUndoGroup("Cancel Custom Anchor Point Location");
      this.removeCustomTargetUI();
      app.endUndoGroup();
    }
  };
  this.approveCustomPosition = function () {
    app.beginUndoGroup("Approve Custom Anchor Point Location");
    var e = this.utils.runExpressionOnLayer(
      this.globalVar.customTargetLayer,
      "ADBE Point Control",
      "thisLayer.toComp([0,0,0])",
    );
    this.globalVar.lastCustomTarget = [e[0], e[1], 0];
    this.removeCustomTargetUI();
    this.repositionCustomAnchor();
    app.endUndoGroup();
  };
  this.checkTempControls = function () {
    try {
      vn_AnchorSniperUI.cancelCustomPosition();
    } catch (f) {}
  };
  this.splitMasksLoop = function (g) {
    var o = [];
    if (this.globalVar.progressWin) {
      this.globalVar.progressWin.progressChunk = Math.round(100 / g.length);
      this.globalVar.progressWin.progress_bar_value = 0;
    }
    for (var f = 0; f < g.length; f += 1) {
      var l = g[f];
      var m = l.Masks;
      var q = m.numProperties;
      var e = l.hasTrackMatte;
      if (q < 2) {
        continue;
      }
      var n = false;
      for (var p = 1; p <= q; p += 1) {
        if (l.Masks.property(p).maskMode != MaskMode.NONE) {
          var i = l.duplicate();
          if (e) {
            var h = myComp.layer(l.index - 1);
            var r = h.duplicate();
            r.moveBefore(i);
          }
          i.name = l.name + " - " + l.Masks.property(p).name;
          var j = q;
          while (j >= 1) {
            if (p != j) {
              i.Masks.property(j).remove();
            }
            j--;
          }
          o[o.length] = i;
          i.audioEnabled = false;
        }
      }
      l.enabled = false;
      this.globalVar.progressWin.hit();
    }
    this.utils.reSelectLayers(o, this.globalVar.selectedComp);
  };
  this.splitLayerMasks = function () {
    if (this.utils.checkForActiveItems(this)) {
      this.populateGlobalVars();
      var h = true;
      var e = this.utils.getUsableLayers(this.globalVar.selectedLayers, h);
      if (e) {
        var f = "Split Masks to Layers";
        app.beginUndoGroup(f);
        this.globalVar.progressWin = new this.utils.ProgressBar(
          this.globalConstants.progressBarTitle,
          150,
          50,
        );
        var g = "Processing %1 / " + e.length + " Layers";
        this.globalVar.progressWin.show(g, e.length, 0);
        this.globalVar.progressWin.update();
        this.splitMasksLoop(e);
        if (this.globalVar.progressWin) {
          this.globalVar.progressWin.close();
        }
        app.endUndoGroup();
      }
    }
  };
  this.cropPrecomp = function (g, l, h, k) {
    this.scan.checkProjectBitDepth();
    var e = g
      .property("ADBE Transform Group")
      .property("ADBE Anchor Point")
      .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true);
    var f = {};
    f.obj = h;
    f.layerType = this.utils.getLayerType(f);
    f.fixedAnchorLocation = "center";
    var m = {};
    m.obj = g;
    m.layerType = this.utils.getLayerType(m);
    m.scanObj = g;
    m.scanObj.enabled = false;
    m.scanObj.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
    this.utils.removeEffectsFromLayer(m.scanObj);
    m.scanObj.inPoint = this.globalVar.selectedComp.time;
    m.scanObj.outPoint =
      this.globalVar.selectedComp.time +
      this.globalVar.selectedComp.frameDuration;
    m.fixedAnchorLocation = "center";
    m.bbox = this.scan.getLayerBBox(m);
    m.alphaBox = this.scan.getLayerAlphaBox(m);
    f.bbox = m.bbox;
    f.alphaBox = m.alphaBox;
    f.newAnchorPoint = this.getFixedRecLocation(f);
    this.setLayerAnchorPoint(f.obj, f.newAnchorPoint);
    var i = f.alphaBox;
    h.property("ADBE Transform Group")
      .property("ADBE Position")
      .setValue([i.width / 2, i.height / 2]);
    k.width = parseInt(i.width);
    k.height = parseInt(i.height);
    var j = [e[0] - i.left, e[1] - i.top];
    l.property("ADBE Transform Group")
      .property("ADBE Anchor Point")
      .setValue(j);
  };
  this.autoCropLayers = function (l) {
    var w = [];
    var o = this.globalVar.selectedComp.name + " - Cropped Precomps";
    var e = false;
    if (this.globalVar.progressWin) {
      this.globalVar.progressWin.progressChunk = Math.round(100 / l.length);
      this.globalVar.progressWin.progress_bar_value = 0;
    }
    for (var q = 0; q < l.length; q += 1) {
      var p = l[q];
      if (p instanceof TextLayer || p instanceof ShapeLayer) {
        continue;
      }
      if (e == false) {
        e = this.utils.setProjectFolder(o);
      }
      var m = p.Masks;
      var t = m.numProperties;
      var v = p.duplicate();
      var j = v.index;
      var u = p.index;
      var f = new String(p.name);
      var r = f.length;
      if (f.substring(r - 7, r) == "Cropped") {
        f = p.name;
      } else {
        f = p.name + " Cropped";
      }
      var n = this.globalVar.selectedComp.layers.precompose([u], f, false);
      n.parentFolder = e;
      var i = this.globalVar.selectedComp.layer(u);
      i.collapseTransformation = true;
      var x = n.layer(1);
      x.label = v.label;
      i.label = v.label;
      x.motionBlur = v.motionBlur;
      x.frameBlendingType = v.frameBlendingType;
      if (x.canSetCollapseTransformation) {
        x.collapseTransformation = v.collapseTransformation;
      }
      x.samplingQuality = v.samplingQuality;
      x.quality = v.quality;
      x.threeDLayer = v.threeDLayer;
      x.adjustmentLayer = v.adjustmentLayer;
      var s = t;
      while (s > 0) {
        var h = i.Masks.property(s);
        var g = x.property("ADBE Mask Parade").addProperty("Mask");
        g.name = h.name;
        g.property("ADBE Mask Shape").setValue(
          h.property("ADBE Mask Shape").value,
        );
        g.property("ADBE Mask Feather").setValue(
          h.property("ADBE Mask Feather").value,
        );
        g.property("ADBE Mask Opacity").setValue(
          h.property("ADBE Mask Opacity").value,
        );
        g.property("ADBE Mask Offset").setValue(
          h.property("ADBE Mask Offset").value,
        );
        g.maskMode = h.maskMode;
        g.inverted = h.inverted;
        g.locked = h.locked;
        g.maskFeatherFalloff = h.maskFeatherFalloff;
        g.maskMotionBlur = h.maskMotionBlur;
        g.rotoBezier = h.rotoBezier;
        i.Masks.property(s).remove();
        s--;
      }
      this.cropPrecomp(v, i, x, n);
      v.remove();
      w[w.length] = i;
      this.globalVar.progressWin.hit();
    }
    this.utils.reSelectLayers(w, this.globalVar.selectedComp);
  };
  this.autoCrop = function () {
    if (this.utils.checkForActiveItems(this)) {
      this.populateGlobalVars();
      var j = false;
      var f = this.utils.getUsableLayers(this.globalVar.selectedLayers, j);
      if (f) {
        var h = "Precomp and Crop Layer";
        app.beginUndoGroup(h);
        this.globalVar.progressWin = new this.utils.ProgressBar(
          this.globalConstants.progressBarTitle,
          150,
          50,
        );
        var i = "Processing %1 / " + f.length + " Layers";
        this.globalVar.progressWin.show(i, f.length, 0);
        this.globalVar.progressWin.update();
        this.autoCropLayers(f);
        if (vn_AnchorSniperUI.globalVar.savedSettings.centerAfterCrop) {
          this.populateGlobalVars();
          var e = {};
          e.layerAlpha = false;
          e.useComp = false;
          e.moveLayer = false;
          e.groupLayers = false;
          var g = this.utils.getUsableLayers(this.globalVar.selectedLayers, j);
          this.repositionAnchor(g, "center", e);
        }
        if (this.globalVar.progressWin) {
          this.globalVar.progressWin.close();
        }
        app.endUndoGroup();
      }
    }
  };
  this.createGroupNull = function (m, h) {
    var u = this.globalVar.selectedComp.duration;
    var v = 0;
    var r = this.globalVar.selectedComp.duration;
    var w = 0;
    var s = this.globalVar.selectedComp.numLayers;
    var f = this.globalVar.selectedComp.layers.addNull(
      this.globalVar.selectedComp.duration,
    );
    var t = true;
    var g = m[0].parent;
    var q = true;
    var e = m[0].label;
    for (var i = 0; i < m.length; i += 1) {
      var p = m[i];
      if (q && !p.threeDLayer) {
        q = false;
      }
      if (g != p.parent) {
        t = false;
      }
      if (e != m[i].label) {
        e = false;
      }
      var o = p.stretch < 0 ? p.outPoint : p.inPoint;
      if (u > o) {
        u = o;
      }
      var n = p.stretch < 0 ? p.inPoint : p.outPoint;
      if (v < n) {
        v = n;
      }
      if (s > p.index) {
        s = p.index;
      }
    }
    f.threeDLayer = q;
    if (this.globalVar.selectedComp.layer(s).hasTrackMatte) {
      s--;
    }
    if (u < r) {
      r = u;
    }
    if (v > w) {
      w = v;
    }
    f.inPoint = r;
    f.outPoint = w;
    f.property("ADBE Transform Group").property("ADBE Position").setValue(h);
    f.name = "Parent Null " + this.utils.getRandomInt(3);
    f.source.name = f.name;
    if (e) {
      f.label = e;
    }
    this.globalVar.newNullLayers[this.globalVar.newNullLayers.length] = f;
    if (t) {
      f.parent = g;
    }
    for (var l = 0; l < m.length; l += 1) {
      m[l].parent = f;
    }
    if (s == 1) {
      f.moveToBeginning();
    } else {
      f.moveBefore(this.globalVar.selectedComp.layer(s));
    }
  };
  this.setNullInPlace = function (h) {
    var f = h.obj;
    var l = h.worldAnchorPoint;
    var k = this.globalVar.selectedComp.duration;
    var i = 0;
    var j = this.globalVar.selectedComp.duration;
    var g = 0;
    var e = this.globalVar.selectedComp.layers.addNull(
      this.globalVar.selectedComp.duration,
    );
    e.selected = true;
    if (f.threeDLayer) {
      e.threeDLayer = true;
    }
    k = f.stretch < 0 ? f.outPoint : f.inPoint;
    i = f.stretch < 0 ? f.inPoint : f.outPoint;
    saveIndex = f.index;
    if (k < j) {
      j = k;
    }
    if (i > g) {
      g = i;
    }
    e.inPoint = j;
    e.outPoint = g;
    e.label = f.label;
    e.property("ADBE Transform Group").property("ADBE Position").setValue(l);
    e.property("ADBE Transform Group")
      .property("ADBE Rotate Z")
      .setValue(
        f
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z")
          .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true),
      );
    if (e.threeDLayer) {
      e.property("ADBE Transform Group")
        .property("ADBE Rotate X")
        .setValue(
          f
            .property("ADBE Transform Group")
            .property("ADBE Rotate X")
            .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true),
        );
      e.property("ADBE Transform Group")
        .property("ADBE Rotate Y")
        .setValue(
          f
            .property("ADBE Transform Group")
            .property("ADBE Rotate Y")
            .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true),
        );
      e.property("ADBE Transform Group")
        .property("ADBE Orientation")
        .setValue(
          f
            .property("ADBE Transform Group")
            .property("ADBE Orientation")
            .valueAtTime(vn_AnchorSniperUI.globalVar.currentCompTime, true),
        );
    }
    e.name = f.name + " - Null";
    e.source.name = e.name;
    this.globalVar.newNullLayers[this.globalVar.newNullLayers.length] = e;
    e.parent = h.currentParent;
    f.parent = e;
    if (f.index == 1) {
      e.moveToBeginning();
    } else {
      e.moveBefore(this.globalVar.selectedComp.layer(f.index));
    }
  };
  this.setCustomNullLocation = function () {
    var g = this.collectAnchorOptions();
    if (g.groupLayers) {
      this.createGroupNull(
        this.globalVar.selectedLayers,
        this.globalVar.lastCustomTarget,
      );
    } else {
      for (var e = 0; e < this.globalVar.selectedLayers.length; e += 1) {
        var f = {};
        f.obj = this.globalVar.selectedLayers[e];
        f.compAnchorPoint = this.globalVar.lastCustomTarget;
        f.newAnchorPoint = this.scan.convertFromCompToSurfaceCoords(
          f.obj,
          f.compAnchorPoint,
        );
        f.worldAnchorPoint = this.scan.convertFromLayerToWorldCoords(
          f.obj,
          f.newAnchorPoint,
        );
        f.currentParent = f.obj.parent;
        f.obj.parent = null;
        this.setNullInPlace(f);
      }
    }
    this.cancelSelectNullTarget();
  };
  this.cancelSelectNullTarget = function () {
    this.globalVar.winObj.panelMain.groupOptions.check_MoveLayer.enabled = true;
    this.globalVar.winObj.panelTools.groupToolsButtons.but_SplitMasks.enabled = true;
    this.globalVar.winObj.panelTools.groupToolsButtons.but_cropPrecomp.enabled = true;
    if (this.globalVar.winObjSettings.iconsUI == false) {
      this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.text =
        "Null Parent";
    }
    this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.value = false;
    this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.helpTip =
      "Link to a Null Parent Layer at the Specified Location";
    this.globalVar.winObj.panelMain.text = "Anchor Point Target";
    this.globalVar.createNullMODE = false;
  };
  this.selectNullTarget = function () {
    if (this.globalVar.createNullMODE) {
      this.cancelSelectNullTarget();
    } else {
      if (this.utils.checkForActiveItems(this)) {
        this.populateGlobalVars();
        this.globalVar.winObj.panelMain.groupOptions.check_MoveLayer.value = false;
        this.globalVar.winObj.panelMain.groupOptions.check_MoveLayer.enabled = false;
        this.globalVar.winObj.panelTools.groupToolsButtons.but_SplitMasks.enabled = false;
        this.globalVar.winObj.panelTools.groupToolsButtons.but_cropPrecomp.enabled = false;
        this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.helpTip =
          "Cancel Link to a Null Parent";
        if (this.globalVar.winObjSettings.iconsUI == false) {
          this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.text =
            "Cancel";
        }
        this.globalVar.winObj.panelMain.text = "Null Parent Target";
        this.globalVar.createNullMODE = true;
      } else {
        this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.value = false;
      }
    }
  };
  this.enableAllGuiElements = function () {
    this.globalVar.winObj.panelMain.groupCustomButtons.iconbut_Target.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_TL.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_T.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_TR.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_L.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_C.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_R.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_BL.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_B.enabled = true;
    this.globalVar.winObj.panelMain.groupAnchorButtons.iconbut_BR.enabled = true;
    this.globalVar.winObj.panelMain.groupOptions.check_UseComp.enabled = true;
    this.globalVar.winObj.panelMain.groupOptions.check_MoveLayer.enabled = true;
    this.globalVar.winObj.panelMain.groupOptions.check_GroupLayers.enabled = true;
    this.globalVar.winObj.panelMain.groupOptions.check_LayerAlpha.enabled = true;
    if (this.globalVar.winObjSettings.showTools) {
      this.globalVar.winObj.panelTools.groupToolsButtons.but_SplitMasks.enabled = true;
      this.globalVar.winObj.panelTools.groupToolsButtons.but_cropPrecomp.enabled = true;
      this.globalVar.winObj.panelTools.groupToolsButtons.but_addNull.enabled = true;
    }
  };
  this.collectAnchorOptions = function () {
    var e = {};
    e.layerAlpha =
      this.globalVar.winObj.panelMain.groupOptions.check_LayerAlpha.value;
    e.useComp =
      this.globalVar.winObj.panelMain.groupOptions.check_UseComp.value;
    e.moveLayer =
      this.globalVar.winObj.panelMain.groupOptions.check_MoveLayer.value;
    e.groupLayers =
      this.globalVar.winObj.panelMain.groupOptions.check_GroupLayers.value;
    return e;
  };
  this.clickButton = function (e) {
    if (!this.globalVar.operation_in_progress) {
      this.globalVar.operation_in_progress = true;
      this.globalVar.err_msg = false;
      switch (e) {
        case "topleft":
        case "top":
        case "topright":
        case "left":
        case "center":
        case "right":
        case "bottomleft":
        case "bottom":
        case "bottomright":
          this.anchorPointToFixedLocation(e);
          break;
        case "target":
          this.selectCustomPosition();
          break;
        case "customOK":
          this.approveCustomPosition();
          break;
        case "customCancel":
          this.cancelCustomPosition();
          break;
        case "splitMasks":
          this.splitLayerMasks();
          break;
        case "autoCrop":
          if (this.globalVar.isTrial) {
            alert("This feature is not available in trial mode");
          } else {
            this.autoCrop();
          }
          break;
        case "addNull":
          if (this.globalVar.isTrial) {
            alert("This feature is not available in trial mode");
          } else {
            this.selectNullTarget();
          }
          break;
        case "check_LayerAlpha":
        case "check_UseComp":
        case "check_MoveLayer":
        case "check_GroupLayers":
          this.toggleUIOption(e);
          break;
      }
      if (this.globalVar.err_msg != false) {
        alert(this.globalVar.err_msg);
      }
      this.globalVar.err_msg = false;
      this.globalVar.operation_in_progress = false;
    }
  };
  this.addBurgerListMouseOverEvent = function () {};
  this.toggleUIOption = function (e) {
    vn_AnchorSniperUI.globalVar.winObj.panelMain.groupOptions[e].value =
      !vn_AnchorSniperUI.globalVar.winObj.panelMain.groupOptions[e].value;
  };
  this.hideWinBgImage = function () {
    vn_AnchorSniperUI.globalVar.winObj.bgImage.hide();
  };
  this.showWinBgImage = function () {
    vn_AnchorSniperUI.globalVar.winObj.bgImage.show();
  };
  this.hideToolsPanel = function () {
    var e = vn_AnchorSniperUI.globalVar.winObj;
    if (e.panelTools != null && e.panelTools instanceof Panel) {
      e.remove(e.panelTools);
      e.size = [
        vn_AnchorSniperUI.globalVar.winObjSettings.winSizeCurrent[2],
        vn_AnchorSniperUI.globalVar.winObjSettings.winSizeCurrent[3],
      ];
      e.panelTools = null;
    }
  };
  this.showToolsPanel = function () {
    var e = vn_AnchorSniperUI.globalVar.winObj;
    if (vn_AnchorSniperUI.globalVar.winObjSettings.iconsUI) {
      vn_AnchorSniperUI.buildToolsPanel_small(e);
    } else {
      vn_AnchorSniperUI.buildToolsPanel_big(e);
    }
  };
  this.buildToolsPanel_small = function (g) {
    g.size = [
      this.globalVar.winObjSettings.winSizeCurrent[2],
      this.globalVar.winObjSettings.winSizeCurrent[3],
    ];
    g.panelTools = g.add("panel", [6, 176, 187, 236], "Tools");
    g.panelTools.graphics.backgroundColor = g.panelTools.graphics.newBrush(
      g.panelTools.graphics.BrushType.SOLID_COLOR,
      [1, 1, 1, 0],
    );
    g.panelTools.groupToolsButtons = g.panelTools.add(
      "group",
      [5, 13, 494, 69],
      "undefined",
    );
    var l = __BLOB__BLOB_000079__;
    var j = __BLOB__BLOB_000080__;
    var i = {
      grayed: undefined,
      hovered: undefined,
      pushed: this.utils.createResourceFile(
        "iconbut_NullCancelImage.png",
        j,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_NullParent.png",
        l,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    g.panelTools.groupToolsButtons.but_addNull =
      g.panelTools.groupToolsButtons.add(
        "iconbutton",
        [0, 0, 53, 30],
        ScriptUI.newImage(i.standard, i.grayed, i.pushed, i.hovered),
        { style: "", toggle: true },
      );
    g.panelTools.groupToolsButtons.but_addNull.helpTip =
      "Link to a Null Parent Layer at the Specified Location";
    g.panelTools.groupToolsButtons.but_addNull.onClick = function () {
      vn_AnchorSniperUI.clickButton("addNull");
    };
    var k = __BLOB__BLOB_000081__;
    var f = this.utils.createResourceFile(
      "iconbut_SplitMaskImage.png",
      k,
      this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
    );
    g.panelTools.groupToolsButtons.but_SplitMasks =
      g.panelTools.groupToolsButtons.add(
        "iconbutton",
        [57, 0, 110, 30],
        ScriptUI.newImage(f),
      );
    g.panelTools.groupToolsButtons.but_SplitMasks.helpTip =
      "Split Masks to Layers";
    g.panelTools.groupToolsButtons.but_SplitMasks.onClick = function () {
      vn_AnchorSniperUI.clickButton("splitMasks");
    };
    var h = __BLOB__BLOB_000082__;
    var e = this.utils.createResourceFile(
      "iconbut_CropLayer.png",
      h,
      this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
    );
    g.panelTools.groupToolsButtons.but_cropPrecomp =
      g.panelTools.groupToolsButtons.add(
        "iconbutton",
        [114, 0, 167, 30],
        ScriptUI.newImage(e),
      );
    g.panelTools.groupToolsButtons.but_cropPrecomp.helpTip =
      "Precomp Layer and Crop to Non-transparent dimensions";
    g.panelTools.groupToolsButtons.but_cropPrecomp.onClick = function () {
      vn_AnchorSniperUI.clickButton("autoCrop");
    };
  };
  this.buildToolsPanel_big = function (e) {
    e.size = [
      this.globalVar.winObjSettings.winSizeCurrent[2],
      this.globalVar.winObjSettings.winSizeCurrent[3],
    ];
    e.panelTools = e.add("panel", [6, 176, 286, 236], "Tools");
    e.panelTools.graphics.backgroundColor = e.panelTools.graphics.newBrush(
      e.panelTools.graphics.BrushType.SOLID_COLOR,
      [1, 1, 1, 0],
    );
    e.panelTools.groupToolsButtons = e.panelTools.add(
      "group",
      [5, 13, 495, 69],
      "undefined",
    );
    e.panelTools.groupToolsButtons.but_addNull =
      e.panelTools.groupToolsButtons.add(
        "button",
        [0, 0, 84, 28],
        "Null Parent",
      );
    e.panelTools.groupToolsButtons.but_addNull.helpTip =
      "Link to a Null Parent Layer at the Specified Location";
    e.panelTools.groupToolsButtons.but_addNull.onClick = function () {
      vn_AnchorSniperUI.clickButton("addNull");
    };
    e.panelTools.groupToolsButtons.but_SplitMasks =
      e.panelTools.groupToolsButtons.add(
        "button",
        [91, 0, 175, 28],
        "Split Masks",
      );
    e.panelTools.groupToolsButtons.but_SplitMasks.helpTip =
      "Split Masks to Layers";
    e.panelTools.groupToolsButtons.but_SplitMasks.onClick = function () {
      vn_AnchorSniperUI.clickButton("splitMasks");
    };
    e.panelTools.groupToolsButtons.but_cropPrecomp =
      e.panelTools.groupToolsButtons.add(
        "button",
        [183, 0, 266, 28],
        "Crop Layer",
      );
    e.panelTools.groupToolsButtons.but_cropPrecomp.helpTip =
      "Precomp Layer and Crop to Non-transparent dimensions";
    e.panelTools.groupToolsButtons.but_cropPrecomp.onClick = function () {
      vn_AnchorSniperUI.clickButton("autoCrop");
    };
  };
  this.toggleToolsPanel = function (e) {
    if (this.globalVar.winObjSettings.showTools) {
      if (this.globalVar.winObjSettings.iconsUI) {
        this.buildToolsPanel_small(e);
      } else {
        this.buildToolsPanel_big(e);
      }
    }
  };
  this.loadAnchorSNIPERSettings = function () {
    this.utils.loadSettings(
      this.globalConstants.settingsSection,
      this.globalVar.savedSettings,
    );
  };
  this.populateWinObjSettings = function () {
    this.globalVar.winObjSettings.hideBgImage =
      this.globalVar.savedSettings.hideBgImage;
    this.globalVar.winObjSettings.showTools =
      this.globalVar.savedSettings.showTools;
    this.globalVar.winObjSettings.iconsUI =
      this.globalVar.savedSettings.iconsUI;
    if (this.globalVar.winObjSettings.iconsUI) {
      e = "Small";
    } else {
      e = "Big";
    }
    if (this.globalVar.winObjSettings.showTools) {
      this.globalVar.winObjSettings.winSizeCurrent[2] =
        this.globalVar.winObjSettings["winSize" + e + "WithTools"][2];
      this.globalVar.winObjSettings.winSizeCurrent[3] =
        this.globalVar.winObjSettings["winSize" + e + "WithTools"][3];
    } else {
      this.globalVar.winObjSettings.winSizeCurrent[2] =
        this.globalVar.winObjSettings["winSize" + e][2];
      this.globalVar.winObjSettings.winSizeCurrent[3] = 180;
    }
    this.globalVar.winObjSettings.panelMainSizeCurrent[2] =
      this.globalVar.winObjSettings["panelMainSize" + e][2];
    this.globalVar.winObjSettings.groupAnchorSizeCurrent[0] =
      this.globalVar.winObjSettings["panelMainSize" + e][0];
    this.globalVar.winObjSettings.groupAnchorSizeCurrent[2] =
      this.globalVar.winObjSettings["panelMainSize" + e][2];
    this.globalVar.winObjSettings.seperaterLineSizeCurrent[0] =
      this.globalVar.winObjSettings["seperaterLineSize" + e][0];
    this.globalVar.winObjSettings.seperaterLineSizeCurrent[2] =
      this.globalVar.winObjSettings["seperaterLineSize" + e][2];
    this.globalVar.winObjSettings.groupCustomSizeCurrent[0] =
      this.globalVar.winObjSettings["groupCustomSize" + e][0];
    this.globalVar.winObjSettings.groupCustomSizeCurrent[2] =
      this.globalVar.winObjSettings["groupCustomSize" + e][2];
    this.globalVar.winObjSettings.burgerListSizeCurrent[0] =
      this.globalVar.winObjSettings["burgerListSize" + e][0];
    this.globalVar.winObjSettings.burgerListSizeCurrent[2] =
      this.globalVar.winObjSettings["burgerListSize" + e][2];
    this.globalVar.winObjSettings.burgerButtonSizeCurrent[0] =
      this.globalVar.winObjSettings["burgerButtonSize" + e][0];
    this.globalVar.winObjSettings.burgerButtonSizeCurrent[2] =
      this.globalVar.winObjSettings["burgerButtonSize" + e][2];
  };
  this.buildOptionsUI_small = function (m) {
    m.panelMain.groupOptions = m.panelMain.add(
      "group",
      [120, 13, 420, 163],
      "undefined",
    );
    var f = __BLOB__BLOB_000083__;
    var k = this.utils.createResourceFile(
      "optionIcon_Alpha.png",
      f,
      this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
    );
    m.panelMain.groupOptions.icon_LayerAlpha = m.panelMain.groupOptions.add(
      "image",
      [27, 25, 49, 49],
      ScriptUI.newImage(k),
    );
    m.panelMain.groupOptions.icon_LayerAlpha.helpTip = "Use Layer\u2019s Alpha";
    m.panelMain.groupOptions.check_LayerAlpha = m.panelMain.groupOptions.add(
      "checkbox",
      [2, 29, 49, 49],
      "",
    );
    m.panelMain.groupOptions.check_LayerAlpha.helpTip =
      "Use Layer\u2019s Alpha";
    m.panelMain.groupOptions.check_LayerAlpha.onClick = function () {
      vn_AnchorSniperUI.clickButton("layerAlphaOption");
    };
    m.panelMain.groupOptions.check_LayerAlpha.value = true;
    var e = __BLOB__BLOB_000084__;
    var g = this.utils.createResourceFile(
      "optionIcon_Comp.png",
      e,
      this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
    );
    m.panelMain.groupOptions.icon_UseComp = m.panelMain.groupOptions.add(
      "image",
      [25, 55, 50, 79],
      ScriptUI.newImage(g),
    );
    m.panelMain.groupOptions.icon_UseComp.helpTip = "Use Comp\'s Bounds";
    m.panelMain.groupOptions.check_UseComp = m.panelMain.groupOptions.add(
      "checkbox",
      [2, 58, 50, 79],
      "",
    );
    m.panelMain.groupOptions.check_UseComp.value = false;
    m.panelMain.groupOptions.check_UseComp.helpTip = "Use Comp\'s Bounds";
    m.panelMain.groupOptions.check_UseComp.onClick = function () {
      vn_AnchorSniperUI.clickButton("useComp");
    };
    var h = __BLOB__BLOB_000085__;
    var i = this.utils.createResourceFile(
      "optionIcon_Move.png",
      h,
      this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
    );
    m.panelMain.groupOptions.icon_MoveLayer = m.panelMain.groupOptions.add(
      "image",
      [27, 85, 55, 108],
      ScriptUI.newImage(i),
    );
    m.panelMain.groupOptions.icon_MoveLayer.helpTip = "Move Layer";
    m.panelMain.groupOptions.check_MoveLayer = m.panelMain.groupOptions.add(
      "checkbox",
      [2, 87, 55, 108],
      "",
    );
    m.panelMain.groupOptions.check_MoveLayer.value = 0;
    m.panelMain.groupOptions.check_MoveLayer.helpTip = "Move Layer";
    var j = __BLOB__BLOB_000086__;
    var l = this.utils.createResourceFile(
      "optionIcon_Group.png",
      j,
      this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
    );
    m.panelMain.groupOptions.icon_MoveLayer = m.panelMain.groupOptions.add(
      "image",
      [25, 113, 50, 141],
      ScriptUI.newImage(l),
    );
    m.panelMain.groupOptions.icon_MoveLayer.helpTip = "Group Selected Layers";
    m.panelMain.groupOptions.check_GroupLayers = m.panelMain.groupOptions.add(
      "checkbox",
      [2, 116, 50, 141],
      "",
    );
    m.panelMain.groupOptions.check_GroupLayers.value = 0;
    m.panelMain.groupOptions.check_GroupLayers.helpTip =
      "Group Selected Layers";
    m.panelMain.groupOptions.check_GroupLayers.onClick = function () {
      vn_AnchorSniperUI.clickButton("groupLayersOption");
    };
  };
  this.buildOptionsUI_big = function (e) {
    e.panelMain.groupOptions = e.panelMain.add(
      "group",
      [120, 13, 420, 163],
      "undefined",
    );
    e.panelMain.groupOptions.statictext_Options = e.panelMain.groupOptions.add(
      "statictext",
      [2, 2, 50, 17],
      "Options",
      { multiline: true },
    );
    e.panelMain.groupOptions.check_LayerAlpha = e.panelMain.groupOptions.add(
      "checkbox",
      [2, 29, 120, 49],
      "Use Layer\u2019s Alpha",
    );
    e.panelMain.groupOptions.check_LayerAlpha.helpTip =
      "Use Layer\u2019s Alpha";
    e.panelMain.groupOptions.check_LayerAlpha.onClick = function () {
      vn_AnchorSniperUI.clickButton("layerAlphaOption");
    };
    e.panelMain.groupOptions.check_LayerAlpha.value = true;
    e.panelMain.groupOptions.check_UseComp = e.panelMain.groupOptions.add(
      "checkbox",
      [2, 58, 145, 78],
      "Use Comp\'s Bounds",
    );
    e.panelMain.groupOptions.check_UseComp.value = false;
    e.panelMain.groupOptions.check_UseComp.helpTip = "Use Comp\'s Bounds";
    e.panelMain.groupOptions.check_UseComp.onClick = function () {
      vn_AnchorSniperUI.clickButton("useComp");
    };
    e.panelMain.groupOptions.check_MoveLayer = e.panelMain.groupOptions.add(
      "checkbox",
      [2, 87, 145, 107],
      "Move Layer",
    );
    e.panelMain.groupOptions.check_MoveLayer.value = 0;
    e.panelMain.groupOptions.check_MoveLayer.helpTip = "Move Layer";
    e.panelMain.groupOptions.check_GroupLayers = e.panelMain.groupOptions.add(
      "checkbox",
      [2, 116, 155, 136],
      "Group Selected Layers",
    );
    e.panelMain.groupOptions.check_GroupLayers.value = 0;
    e.panelMain.groupOptions.check_GroupLayers.helpTip =
      "Group Selected Layers";
    e.panelMain.groupOptions.check_GroupLayers.onClick = function () {
      vn_AnchorSniperUI.clickButton("groupLayersOption");
    };
  };
  this.openSettingsDialog = function () {
    function e(h) {
      function f(l) {
        var j =
          l instanceof Panel
            ? l
            : new Window("dialog", "Anchor SNIPER Settings", [0, 0, 285, 216], {
                resizeable: false,
              });
        j.panelSettings = j.add("panel", [5, 5, 272, 169], "Settings");
        j.panelSettings.check_hideLayerControls = j.panelSettings.add(
          "checkbox",
          [14, 18, 304, 38],
          "Toggle Layer Controls on Custom Selection",
        );
        j.panelSettings.check_hideLayerControls.value =
          vn_AnchorSniperUI.globalVar.savedSettings.hideLayerControls;
        j.panelSettings.check_hideLayerControls.helpTip =
          "Automatically toggles the visibility of layer controls when selecting a custom anchor point target";
        j.panelSettings.check_centerAfterCrop = j.panelSettings.add(
          "checkbox",
          [14, 45, 304, 65],
          "Center Anchor Point After Cropping Layer",
        );
        j.panelSettings.check_centerAfterCrop.value =
          vn_AnchorSniperUI.globalVar.savedSettings.centerAfterCrop;
        j.panelSettings.check_centerAfterCrop.helpTip =
          "Automatically centers the anchor point of a layer after cropping it using the Crop Layer button";
        j.panelSettings.check_iconsUI = j.panelSettings.add(
          "checkbox",
          [14, 72, 304, 92],
          "Small User Interface (requires script restart)",
        );
        j.panelSettings.check_iconsUI.value =
          vn_AnchorSniperUI.globalVar.savedSettings.iconsUI;
        var k = vn_AnchorSniperUI.globalVar.savedSettings.iconsUI;
        j.panelSettings.check_iconsUI.helpTip =
          "Shows only icons instead of text for options and buttons (requires script restart)";
        j.panelSettings.check_showTools = j.panelSettings.add(
          "checkbox",
          [14, 99, 304, 119],
          "Show Tools Panel",
        );
        j.panelSettings.check_showTools.value =
          vn_AnchorSniperUI.globalVar.savedSettings.showTools;
        var i = vn_AnchorSniperUI.globalVar.savedSettings.showTools;
        j.panelSettings.check_showTools.helpTip =
          "Shows the additional Tools Panel below the main Anchor Sniper interface";
        j.panelSettings.check_hideBgImage = j.panelSettings.add(
          "checkbox",
          [14, 126, 304, 146],
          "Hide Background Texture Image",
        );
        j.panelSettings.check_hideBgImage.value =
          vn_AnchorSniperUI.globalVar.savedSettings.hideBgImage;
        j.panelSettings.check_hideBgImage.helpTip =
          "Hides the camouflage background image of Anchor SNIPER\'s interface";
        j.but_save = j.add("button", [200, 180, 270, 200], "Save");
        j.but_save.helpTip = "Save Settings";
        j.but_save.onClick = function () {
          var p = [];
          p.hideLayerControls = j.panelSettings.check_hideLayerControls.value;
          p.centerAfterCrop = j.panelSettings.check_centerAfterCrop.value;
          p.iconsUI = j.panelSettings.check_iconsUI.value;
          p.showTools = j.panelSettings.check_showTools.value;
          p.hideBgImage = j.panelSettings.check_hideBgImage.value;
          var o = false;
          var m = false;
          if (
            k != p.iconsUI &&
            vn_AnchorSniperUI.globalVar.winObjSettings.iconsUI != p.iconsUI
          ) {
            o = true;
            alert(
              "Changing UI size requires script restart.\nTo apply settings, close the script\'s panel window and run it again.",
            );
          }
          vn_AnchorSniperUI.utils.saveSettings(
            vn_AnchorSniperUI.globalConstants.settingsSection,
            p,
          );
          vn_AnchorSniperUI.loadAnchorSNIPERSettings();
          if (i != vn_AnchorSniperUI.globalVar.savedSettings.showTools) {
            if (vn_AnchorSniperUI.globalVar.winObjSettings.iconsUI) {
              n = "Small";
            } else {
              n = "Big";
            }
            if (vn_AnchorSniperUI.globalVar.savedSettings.showTools) {
              vn_AnchorSniperUI.globalVar.winObjSettings.showTools = true;
              vn_AnchorSniperUI.globalVar.winObjSettings.winSizeCurrent[2] =
                vn_AnchorSniperUI.globalVar.winObjSettings[
                  "winSize" + n + "WithTools"
                ][2];
              vn_AnchorSniperUI.globalVar.winObjSettings.winSizeCurrent[3] =
                vn_AnchorSniperUI.globalVar.winObjSettings[
                  "winSize" + n + "WithTools"
                ][3];
              vn_AnchorSniperUI.toggleToolsPanel(
                vn_AnchorSniperUI.globalVar.winObj,
              );
            } else {
              vn_AnchorSniperUI.globalVar.winObjSettings.winSizeCurrent[2] =
                vn_AnchorSniperUI.globalVar.winObjSettings["winSize" + n][2];
              vn_AnchorSniperUI.globalVar.winObjSettings.winSizeCurrent[3] = 180;
              vn_AnchorSniperUI.globalVar.winObjSettings.showTools = false;
              vn_AnchorSniperUI.hideToolsPanel();
            }
          }
          vn_AnchorSniperUI.globalVar.savedSettings.hideBgImage
            ? vn_AnchorSniperUI.hideWinBgImage()
            : vn_AnchorSniperUI.showWinBgImage();
          vn_AnchorSniperUI.globalVar.winObjSettings.showTools =
            vn_AnchorSniperUI.globalVar.savedSettings.hideBgImage;
          j.close();
        };
        j.but_exit = j.add("button", [122, 180, 192, 200], "Cancel");
        j.but_exit.helpTip = "Exit without saving";
        j.but_exit.onClick = function () {
          j.close();
        };
        j.onClose = function () {
          vn_AnchorSniperUI.addBurgerListMouseOverEvent();
        };
        return j;
      }
      var g = f(h);
      if (g != null && g instanceof Window) {
        g.center();
        g.show();
      }
    }
    e(this);
  };
  this.openWarningDialog = function (i, h, g, e) {
    function f(l) {
      function j(n) {
        var m =
          n instanceof Panel
            ? n
            : new Window("dialog", h, [0, 0, 432, 190], {
                maximizeButton: false,
                minimizeButton: false,
                resizeable: false,
              });
        m.img_bg = m.add(
          "image",
          [0, 0, 275, 251],
          vn_AnchorSniperUI.globalVar.winBGImage,
        );
        if (g) {
          m.img_tip = m.add("image", [11, 10, 135, 134], g);
          m.text_warningMsg = m.add("statictext", [145, 18, 415, 134], i, {
            multiline: true,
          });
        } else {
          m.text_warningMsg = m.add("statictext", [17, 18, 415, 134], i, {
            multiline: true,
          });
        }
        m.text_showWarning = m.add(
          "statictext",
          [18, 149, 118, 169],
          "Show Warning:",
          { multiline: true },
        );
        m.group_radioButtons = m.add("group", [110, 139, 240, 183], "");
        m.group_radioButtons.radio_oncePerSession = m.group_radioButtons.add(
          "radiobutton",
          [0, 0, 230, 20],
          "Once Per Session",
        );
        m.group_radioButtons.radio_oncePerSession.value = 1;
        m.group_radioButtons.radio_oncePerSession.helpTip = "Once Per Session";
        m.group_radioButtons.radio_never = m.group_radioButtons.add(
          "radiobutton",
          [0, 22, 230, 42],
          "Never Again",
        );
        m.group_radioButtons.value = 0;
        m.group_radioButtons.helpTip = "Never Again";
        m.but_okWarning = m.add("button", [325, 154, 415, 174], "OK");
        m.but_okWarning.helpTip = "OK";
        m.onClose = function () {
          vn_AnchorSniperUI.globalVar.savedSettings[e] = true;
          if (m.group_radioButtons.children[1].value) {
            vn_AnchorSniperUI.utils.saveSingleSetting(
              vn_AnchorSniperUI.globalConstants.settingsSection,
              e,
              true,
            );
          }
          vn_AnchorSniperUI.addBurgerListMouseOverEvent();
        };
        return m;
      }
      var k = j(l);
      if (k != null && k instanceof Window) {
        k.center();
        k.show();
      }
    }
    f(this);
  };
  this.hideAllHelpCatPanels = function () {
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat0.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat1.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat2.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat3.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat4.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat5.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat6.visible = false;
    vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat7.visible = false;
  };
  this.switchHelpCat = function (e) {
    this.hideAllHelpCatPanels();
    switch (e.index) {
      case 0:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat0.visible = true;
        break;
      case 1:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat1.visible = true;
        break;
      case 2:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat2.visible = true;
        break;
      case 3:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat3.visible = true;
        break;
      case 4:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat4.visible = true;
        break;
      case 5:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat5.visible = true;
        break;
      case 6:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat6.visible = true;
        break;
      case 7:
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat7.visible = true;
        break;
    }
  };
  this.openHelpDialog = function () {
    function g(j) {
      function i(l) {
        vn_AnchorSniperUI.globalVar.helpPal =
          l instanceof Panel
            ? l
            : new Window("dialog", "Anchor SNIPER Help", undefined, {
                resizeable: true,
              });
        vn_AnchorSniperUI.globalVar.helpPal.orientation = "column";
        var k =
          "group{orientation:\'column\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'], margins: 0, spacing: 8,                                            groupContent: Group{orientation:\'row\', alignment:[\'fill\', \'fill\'], alignChildren:[\'fill\', \'fill\'], margins: 0, spacing: 5,                                                listboxHelpCat: ListBox{alignment:[\'left\', \'fill\'] , properties:{items:" +
          f.categories_string +
          "}},                                                grpRightColumn: Group{orientation:\'stack\', alignment:[\'fill\', \'fill\'], margins: 0, spacing: 0,                                                ";
        for (var n = 0; n < f.categories.length; n += 1) {
          k +=
            " panelCat" +
            n +
            ": Panel{text:\'" +
            f.categories[n].title +
            "\', orientation:\'column\', alignment:[\'fill\', \'fill\'], margins: [8,12,8,8], spacing: 8, visible: false,                                            grpParagraph1: Group{orientation:\'row\', alignment:[\'fill\', \'fill\'],                                                 textParagraph1: EditText{text:\'" +
            f.categories[n].paragraphs[0] +
            "\' ,alignment:[\'fill\', \'fill\'], size: [375, 200], properties:{\'multiline\':true , readonly : true}},                                                ";
          if (f.categories[n].imgs.length > 0) {
            k +=
              " grpImage1: Group{orientation:\'column\', alignment:[\'right\', \'fill\'],                                                                         ";
            for (var m = 0; m < f.categories[n].imgs.length; m += 1) {
              k +=
                " imgParagraph" +
                m +
                ": Image{ alignment:[\'right\', \'top\'], image:\'" +
                f.categories[n].imgs[m].path +
                "\'},                                                        ";
            }
            k += " },                                                    ";
          }
          k +=
            " },                                                            },                                                            ";
        }
        k +=
          "    },                 },                            groupButtons: Group{orientation:\'row\', alignment:[\'fill\', \'bottom\'], alignChildren:[\'fill\', \'fill\'], margins: 0, spacing: 0,                                         buttonOnlineHelp: Button{text:\'Online Help\', alignment:[\'left\', \'top\']},                                         buttonClose: Button{text:\'Close\' ,alignment:[\'right\', \'top\'], size: [100, 27] },                              },                    }";
        vn_AnchorSniperUI.globalVar.helpPal.margins = 8;
        vn_AnchorSniperUI.globalVar.helpPal.groupMain =
          vn_AnchorSniperUI.globalVar.helpPal.add(k);
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.listboxHelpCat.selection = 0;
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.grpRightColumn.panelCat0.visible = true;
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupButtons.buttonOnlineHelp.size =
          [
            vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent
              .listboxHelpCat.preferredSize.width,
            27,
          ];
        vn_AnchorSniperUI.globalVar.helpPal.layout.layout(true);
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.minimumSize =
          vn_AnchorSniperUI.globalVar.helpPal.groupMain.size;
        vn_AnchorSniperUI.globalVar.helpPal.layout.resize();
        vn_AnchorSniperUI.globalVar.helpPal.onResizing =
          vn_AnchorSniperUI.globalVar.helpPal.onResize = function () {
            this.layout.resize();
          };
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupButtons.buttonClose.onClick =
          function () {
            vn_AnchorSniperUI.globalVar.helpPal.close();
          };
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupButtons.buttonOnlineHelp.onClick =
          function () {
            system.callSystem(
              vn_AnchorSniperUI.globalVar.urlLaunchCode +
                ' http://www.aescripts.com"',
            );
          };
        vn_AnchorSniperUI.globalVar.helpPal.groupMain.groupContent.listboxHelpCat.onChange =
          function () {
            if (this.selection) {
              vn_AnchorSniperUI.switchHelpCat(this.selection);
            }
          };
        vn_AnchorSniperUI.globalVar.helpPal.onClose = function () {
          vn_AnchorSniperUI.addBurgerListMouseOverEvent();
        };
        return vn_AnchorSniperUI.globalVar.helpPal;
      }
      var h = i(j);
      if (h != null && h instanceof Window) {
        h.center();
        h.show();
      }
    }
    var f = {};
    f.categories = [];
    f.categories[0] = {};
    f.categories[0].title = "Introduction";
    f.categories[0].paragraphs = [];
    f.categories[0].paragraphs[0] =
      "Anchor SNIPER lets you quickly and accurately set the location of a layer\\\'s Anchor Point.\\r\\rCompatibility: After Effects CC 2014 and up.\\r\\rSupported layer types: Video, Image, Text and Shape layers (with 3D switch enabled support for these layer types).\\r\\rBasic usage:\\r\\r1. Select the layers whose Anchor Point you wish to relocate in an active composition.\\r\\r2. Set the different options using the four checkboxes (right side of the interface). These options are independent of each other and can be mixed and matched as desired allowing for sixteen combinations of relocating the anchor point.\\r\\r3. Click on any of the nine Fixed Target buttons or the Custom Target button to relocate the selected layers\\\' anchor point.\\r\\rAnchor point targets are determined based on the current frame of the active comp\\\'s timeline.  Any existing animation keyframes will be automatically adjusted to the new anchor point location.\\r\\rTip: Scanning of the layer\u2019s alpha channel is significantly more accurate when the project\u2019s color bit-depth is set to 16 bits or higher.\\r\\rTools section basic usage:\\r\\rThe lower Tools section of the interface contains three separate buttons that can significantly speed up the workflow of any AE user. See the specific help section for each tool for additional details. The tools are:\\r\\rNull Target \u2013 This tool creates a new null parent at the selected target instead of moving the anchor point.\\r\\rSplit Masks \u2013 This tool creates a duplicate of the selected layer for each mask it has and copies one of the masks to the new duplicate layer.\\r\\rAuto Crop Layer \u2013 This tool pre-composes a layer and crops the new pre-comp to the area of the layer\\\'s non-transparent pixels.";
    f.categories[0].imgs = [];
    f.categories[1] = {};
    f.categories[1].title = "Fixed Target Buttons";
    f.categories[1].paragraphs = [];
    f.categories[1].paragraphs[0] =
      "Each of the nine Fixed Target buttons let you move the anchor point to a specific location on a layer\u2019s edge or its exact center. The new target location is determined using the current setting of the four option checkboxes.\\r\\rNote regarding the Null Parent tool:\\rAfter clicking the Null Parent tool button, clicking any of the Fixed Target buttons will set a null layer parent for the selected layer, instead of moving the anchor point. Once a null layer parent is created the Fixed Target buttons revert to their normal behavior. You can manually cancel the Null Parent mode by clicking the Null Parent button a second time (the button\u2019s text will say \u201cCancel\u201d). ";
    f.categories[1].imgs = [];
    f.categories[1].imgs[0] = {};
    f.categories[1].imgs[0].bin = __BLOB__BLOB_000087__;
    f.categories[1].imgs[0].name = "FixedTargetButtonsImg.png";
    f.categories[1].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[1].imgs[0].name,
        f.categories[1].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[1].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[1].imgs[0].name;
    f.categories[2] = {};
    f.categories[2].title = "Custom Target Buttons";
    f.categories[2].paragraphs = [];
    f.categories[2].paragraphs[0] =
      "Below the Fixed Target buttons are the three Custom Target buttons. These let you move a layer\u2019s anchor point to any target location you choose in the composition viewer. The final target location is determined using these two options only: Move Layer and Group Layers.\\r\\rTo set a Custom Target for a selected layer\u2019s anchor point first click the left most Custom Target button. This will create a temporary target layer and automatically lock any other layers on the Timeline. Additionally, the Anchor SNIPER\u2019s interface will become disabled except for the OK and Cancel Custom Target buttons. Then, using After Effects\u2019 Move tool, drag the Anchor SNIPER\u2019s target layer to a desired location in the composition viewer. To approve the new location and move the anchor point click the OK button (green check mark). To cancel the Custom Target mode click the cancel button (red X mark). After clicking either the OK or Cancel buttons the temporary target layer will be automatically removed and all other layers will return to their previous locked state. \\r\\r Specific options:\\r\\rMove Layer \u2013 If this option is turned on then after clicking the OK button both the anchor point and the layer itself will move to the new selected location. This is equivalent to manually creating a new null layer parent for the layer, moving the Null and then deleting it.\\r\\rGroup Layers: this option is only relevant if the move layer option is turned on. When move layers is turned on and group layers is turned off, all selected layers are moved to the exact same position, stacked on top of each other. If move layers is turned on and Group Layers is turned on, the selected layers move as a single object and are centered around the chosen new location.\\r\\rIMPORTANT: Since clicking the Custom Target button creates new Timeline layers (though temporarily) this adds an action to the After Effects history list. Dragging the temporary target layer and clicking the OK button each adds another action to the history list as well. This means that if you wish to undo moving the anchor point then you would need to undo three times (or more \u2013 depending on how many times you dragged the temporary target layer). Make sure you click either the OK or Cancel buttons before taking any other action to automatically remove the temporary layers and return the timeline and the anchor SNIPER interface to their normal states \u2013 so you can continue working normally. This process is due to an unfortunate limitation of AE User Interface scripting.";
    f.categories[2].imgs = [];
    f.categories[2].imgs[0] = {};
    f.categories[2].imgs[0].bin = __BLOB__BLOB_000088__;
    f.categories[2].imgs[0].name = "CustomTargetButtonsImg.png";
    f.categories[2].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[2].imgs[0].name,
        f.categories[2].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[2].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[2].imgs[0].name;
    f.categories[3] = {};
    f.categories[3].title = "Anchor Target Options";
    f.categories[3].paragraphs = [];
    f.categories[3].paragraphs[0] =
      "The checkboxes on the right side of the interface consist of four options that affect the behavior of the Fixed Target buttons, the Custom Target button and the Null Parent tool.  Each option is independent. The final target location for the anchor point is determined using the combination of all four options.\\r\\rUse Layer\u2019s Alpha:\\rWhen this option is turned on (default), the Anchor SNIPER script will perform a detailed scan of the layer\u2019s alpha channel, determining its actual non-transparent edges. The anchor point will then be placed accordingly. This scanning process requires rendering the current frame of the layer in full resolution and its duration depends on how effects-heavy is the layer and the workstation\u2019s computing power.\\r\\rWhen this option is turned off, the anchor point\u2019s location is determined using the original bounds of the layer, regardless of its content (Which is instantaneous).\\rNote: This option does not affect the Custom Target buttons.\\r\\rUse Comp\u2019s Bounds:\\rWhen this option is turned off (default) the anchor point\u2019s location is determined using the layer\u2019s own coordinate system regardless of its rotation value. For example, if the layer is rotated +90 degrees and you click the Top Fixed Target button, the anchor point will actually move to the center of the edge facing the RIGHT side of the composition -- since now the top edge of the layer is rotated to face in that direction.\\r\\rIf this option is turned on, the anchor point location is determined using the composition\u2019s coordinate system. Using the same 90 degrees rotated layer from above and clicking the Top Fixed Target button will place the anchor point at the edge facing the TOP part of the composition.\\r\\rAdditionally, when turned on, this option limits the new target location of the anchor point to the bounds of the composition. The anchor point of layers positioned completely outside of the composition\u2019s bounds will be placed at the center of the composition.\\r\\rMove Layer:\\rWhen this option is turned on, instead of moving the anchor point, the layer position value is changed (the layer moves) moves in accordance with the Fixed Target button pressed.\\r\\rWhen this option is turned on and you select a Custom Target then after clicking the OK button both the anchor point and the layer itself will move to the new selected location. This is equivalent to manually creating a new null layer parent for the layer, moving the null, then deleting it.\\r\\rGroup Layers:\\rWhen this option is turned on, all selected layers are treated as a single object and the anchor point of all layers is placed in the same location according to their combined area.\\r\\rWhen using a Custom Target with the Move Layer option turned on, the Group Layers option also becomes relevant. When Move Layer is turned on and Group Layers is turned off, all selected layers are moved to the exact same position, stacked on top of each other. If Move Layer is turned on and Group Layers is turned on, the selected layers move as a single object and are centered around the chosen new anchor location.";
    f.categories[3].imgs = [];
    f.categories[3].imgs[0] = {};
    f.categories[3].imgs[0].bin = __BLOB__BLOB_000089__;
    f.categories[3].imgs[0].name = "TargetOptionsImg.png";
    f.categories[3].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[3].imgs[0].name,
        f.categories[3].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[3].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[3].imgs[0].name;
    f.categories[4] = {};
    f.categories[4].title = "Tools: Null Parent";
    f.categories[4].paragraphs = [];
    f.categories[4].paragraphs[0] =
      'This tool temporarily changes the behavior of the main Anchor SNIPER interface. Every option and button still behaves the same but instead of moving the layer\\\'s anchor point, a new Null Layer is created at the desired target location and the selected layer is automatically parented to it. Once the new null layer is created the main Anchor SNIPER interface reverts to its normal behavior.  To revert to the normal behavior without creating a new Null parent click the same Null Target button again \u2013 the text on the button will be "Cancel". ';
    f.categories[4].imgs = [];
    f.categories[4].imgs[0] = {};
    f.categories[4].imgs[0].bin = __BLOB__BLOB_000090__;
    f.categories[4].imgs[0].name = "NullParentButtonImg.png";
    f.categories[4].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[4].imgs[0].name,
        f.categories[4].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[4].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[4].imgs[0].name;
    f.categories[5] = {};
    f.categories[5].title = "Tools: Split Masks";
    f.categories[5].paragraphs = [];
    f.categories[5].paragraphs[0] =
      "This tool creates a duplicate of the selected layer for each mask it has and copies only one of the masks to the new duplicated layer. This tool skips layers with one or zero masks. The original selected layer\\\'s video switch is then disabled.";
    f.categories[5].imgs = [];
    f.categories[5].imgs[0] = {};
    f.categories[5].imgs[0].bin = __BLOB__BLOB_000091__;
    f.categories[5].imgs[0].name = "SplitMasksButtonImg.png";
    f.categories[5].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[5].imgs[0].name,
        f.categories[5].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[5].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[5].imgs[0].name;
    f.categories[6] = {};
    f.categories[6].title = "Tools: Crop Layer";
    f.categories[6].paragraphs = [];
    f.categories[6].paragraphs[0] =
      'This tool pre-composes a layer and automatically crops the new pre-comp to the area of the layer\\\'s non-transparent pixels at the current frame.  The pre-comping uses the "Leave all attributes" method except for any masks on the layer. All Masks are moved into the pre-comped layer before cropping.';
    f.categories[6].imgs = [];
    f.categories[6].imgs[0] = {};
    f.categories[6].imgs[0].bin = __BLOB__BLOB_000092__;
    f.categories[6].imgs[0].name = "CropLayerButtonImg.png";
    f.categories[6].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[6].imgs[0].name,
        f.categories[6].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[6].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[6].imgs[0].name;
    f.categories[7] = {};
    f.categories[7].title = "Settings";
    f.categories[7].paragraphs = [];
    f.categories[7].paragraphs[0] =
      "Toggle Layer Controls on Custom Target Selection: When clicking the Custom Target button a temporary target layer is created in the timeline which allows you to choose a new location for the anchor point. To make this layer easier to relocate the composition viewer\\\'s layer control gizmos are temporarily toggled (off presumably). When you click either the OK or Cancel buttons the layer controls\\\' visibility is toggled back. Due to a limitation of AE scripting, the layer controls can only be toggled and not specifically turned off. You can disable automatic hiding of the layer controls by disabling this option.\\r\\rHide Background Texture Image: Enable this option to hide the background camouflage texture image in anchor SNIPER\\\'s interface.";
    f.categories[7].imgs = [];
    f.categories[7].imgs[0] = {};
    f.categories[7].imgs[0].bin = __BLOB__BLOB_000093__;
    f.categories[7].imgs[0].name = "SettingsButtonImg.png";
    f.categories[7].imgs[0].img = ScriptUI.newImage(
      vn_AnchorSniperUI.utils.createResourceFile(
        f.categories[7].imgs[0].name,
        f.categories[7].imgs[0].bin,
        vn_AnchorSniperUI.utils.getUserDataFolder(
          vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
        ),
      ),
    );
    f.categories[7].imgs[0].path =
      vn_AnchorSniperUI.utils.getUserDataFolder(
        vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
      ) +
      "/" +
      f.categories[7].imgs[0].name;
    f.categories_string = "[";
    for (var e = 0; e < f.categories.length - 1; e += 1) {
      f.categories_string += "\'" + f.categories[e].title + "\',";
    }
    f.categories_string +=
      "\'" + f.categories[f.categories.length - 1].title + "\']";
    g(this);
  };
  this.openAboutDialog2 = function (i, h, g, f) {
    function e(k) {
      function j(p) {
        var o =
          p instanceof Panel
            ? p
            : new Window("dialog", "About Anchor SNIPER", [0, 0, 625, 205], {
                maximizeButton: false,
                minimizeButton: false,
                resizeable: false,
              });
        o.img_bg = o.add(
          "image",
          [0, 0, 275, 201],
          vn_AnchorSniperUI.globalVar.winBGImage,
        );
        o.groupAbout = o.add("group", [5, 5, 620, 200], "undefined");
        o.groupAbout.textVersion = o.groupAbout.add(
          "statictext",
          [5, 5, 145, 25],
          vn_AnchorSniperUI.globalVar.scriptName +
            " - version " +
            vn_AnchorSniperUI.globalVar.scriptVersion,
          { multiline: false },
        );
        o.groupAbout.textBy = o.groupAbout.add(
          "statictext",
          [5, 25, 145, 45],
          "@2019 " + vn_AnchorSniperUI.globalVar.scriptAuthor,
          { multiline: false },
        );
        o.groupAbout.textRegistration = o.groupAbout.add(
          "statictext",
          [200, 7, 500, 47],
          vn_AnchorSniperUI.globalVar.t9.getRegistration(),
          { multiline: true },
        );
        o.groupAbout.buttonDeactivate = o.groupAbout.add(
          "button",
          [498, 5, 609, 32],
          "Deactivate License",
        );
        o.groupAbout.buttonDeactivate.onClick = function () {
          vn_AnchorSniperUI.globalVar.t9.r();
        };
        if (vn_AnchorSniperUI.globalVar.t9.t()) {
          o.groupAbout.buttonDeactivate.visible = false;
        }
        var n = __BLOB__BLOB_000094__;
        var m = ScriptUI.newImage(
          vn_AnchorSniperUI.utils.createResourceFile(
            "AnchorSNIPERlogo.png",
            n,
            vn_AnchorSniperUI.utils.getUserDataFolder(
              vn_AnchorSniperUI.globalConstants.scriptDataFolderName,
            ),
          ),
        );
        o.groupAbout.imageLogo = o.groupAbout.add(
          "image",
          [10, 54, 608, 114],
          m,
        );
        o.groupAbout.buttonUpdate = o.groupAbout.add(
          "button",
          [5, 128, 129, 158],
          "Check for update now",
        );
        o.groupAbout.buttonUpdate.onClick = function () {
          vn_AnchorSniperUI.globalVar.t9.doUpdateCheckNow();
        };
        o.groupAbout.check_Update = o.groupAbout.add(
          "checkbox",
          [136, 134, 450, 164],
          "Check for updates automatically",
        );
        o.groupAbout.check_Update.onClick = function () {
          vn_AnchorSniperUI.globalVar.t9.doUpdateCheck(this.value);
        };
        o.groupAbout.check_Update.value =
          vn_AnchorSniperUI.globalVar.t9.getUpdateCheckStatus();
        o.groupAbout.buttonSupport = o.groupAbout.add(
          "button",
          [5, 164, 129, 194],
          "Get support",
        );
        o.groupAbout.buttonSupport.onClick = function () {
          vn_AnchorSniperUI.globalVar.t9.openSupportTicket();
        };
        o.groupAbout.buttonOK = o.groupAbout.add(
          "button",
          [485, 164, 609, 194],
          "OK",
        );
        o.groupAbout.buttonOK.onClick = function () {
          o.close();
        };
        return o;
      }
      var l = j(k);
      if (l != null && l instanceof Window) {
        l.center();
        l.show();
      }
    }
    e(this);
  };
  this.openBurger = function () {
    if (!vn_AnchorSniperUI.globalVar.burger_list_on) {
      vn_AnchorSniperUI.globalVar.winObj.burgerList.show();
    }
    vn_AnchorSniperUI.globalVar.burger_list_on = true;
    vn_AnchorSniperUI.globalVar.burger_list_should_close = false;
  };
  this.closeBurger = function () {
    if (vn_AnchorSniperUI.globalVar.burger_list_should_close) {
      vn_AnchorSniperUI.globalVar.winObj.burgerList.selection = null;
      vn_AnchorSniperUI.globalVar.winObj.burgerList.hide();
      vn_AnchorSniperUI.globalVar.burger_list_on = false;
    }
  };
  this.burgerMouseOutEvent = function () {
    vn_AnchorSniperUI.globalVar.burger_list_should_close = true;
    var e = "vn_AnchorSniperUI.closeBurger();";
    app.scheduleTask(e, 300, false);
  };
  this.burgerMouseOverEvent = function () {
    vn_AnchorSniperUI.globalVar.burger_list_should_close = false;
  };
  this.toggleBurger = function () {
    if (vn_AnchorSniperUI.globalVar.burger_list_on) {
      vn_AnchorSniperUI.globalVar.winObj.burgerList.selection = null;
      vn_AnchorSniperUI.globalVar.winObj.burgerList.hide();
    } else {
      vn_AnchorSniperUI.globalVar.winObj.burgerList.show();
    }
    vn_AnchorSniperUI.globalVar.burger_list_on = vn_AnchorSniperUI.globalVar
      .burger_list_on
      ? false
      : true;
  };
  this.selectBurgerOptions = function (e) {
    if (e) {
      switch (e.text) {
        case "Settings...":
          vn_AnchorSniperUI.openSettingsDialog();
          break;
        case "Help...":
          vn_AnchorSniperUI.openHelpDialog();
          break;
        case "About...":
          vn_AnchorSniperUI.openAboutDialog2();
          break;
      }
      vn_AnchorSniperUI.toggleBurger();
    }
  };
  this.buildUI_alt = function (G) {
    var H =
      G instanceof Panel
        ? G
        : new Window(
            "palette",
            this.globalVar.scriptName,
            this.globalVar.winObjSettings.winSizeCurrent,
            { resizeable: false },
          );
    var k = __BLOB__BLOB_000095__;
    vn_AnchorSniperUI.globalVar.winBGImage = ScriptUI.newImage(
      this.utils.createResourceFile(
        "bgImage.png",
        k,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    );
    H.bgImage = H.add(
      "image",
      [0, 0, 275, 251],
      vn_AnchorSniperUI.globalVar.winBGImage,
    );
    if (this.globalVar.winObjSettings.hideBgImage) {
      H.bgImage.hide();
    }
    H.panelMain = H.add(
      "panel",
      this.globalVar.winObjSettings.panelMainSizeCurrent,
      "Anchor Target",
    );
    H.panelMain.graphics.backgroundColor = H.panelMain.graphics.newBrush(
      H.panelMain.graphics.BrushType.SOLID_COLOR,
      [1, 1, 1, 0],
    );
    H.panelMain.groupAnchorButtons = H.panelMain.add(
      "group",
      this.globalVar.winObjSettings.groupAnchorSizeCurrent,
      "undefined",
    );
    var A = __BLOB__BLOB_000096__;
    var h = __BLOB__BLOB_000097__;
    var g = {
      grayed: this.utils.createResourceFile(
        "iconbut_TLImage.png",
        A,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_TLImage_on.png",
        h,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_TLImage_on.png",
        h,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_TLImage.png",
        A,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_TL =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [0, 2, 28, 30],
        ScriptUI.newImage(g.standard, g.grayed, g.pushed, g.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_TL.helpTip = "Top Left";
    H.panelMain.groupAnchorButtons.iconbut_TL.onClick = function () {
      vn_AnchorSniperUI.clickButton("topleft");
    };
    var v = __BLOB__BLOB_000098__;
    var M = __BLOB__BLOB_000099__;
    var O = {
      grayed: this.utils.createResourceFile(
        "iconbut_TImage.png",
        v,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_TImage_on.png",
        M,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_TImage_on.png",
        M,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_TImage.png",
        v,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_T =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [32, 2, 60, 30],
        ScriptUI.newImage(O.standard, O.grayed, O.pushed, O.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_T.helpTip = "Top";
    H.panelMain.groupAnchorButtons.iconbut_T.onClick = function () {
      vn_AnchorSniperUI.clickButton("top");
    };
    var J = __BLOB__BLOB_000100__;
    var C = __BLOB__BLOB_000101__;
    var u = {
      grayed: this.utils.createResourceFile(
        "iconbut_TRImage.png",
        J,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_TRImage_on.png",
        C,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_TRImage_on.png",
        C,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_TRImage.png",
        J,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_TR =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [64, 2, 92, 30],
        ScriptUI.newImage(u.standard, u.grayed, u.pushed, u.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_TR.helpTip = "Top Right";
    H.panelMain.groupAnchorButtons.iconbut_TR.onClick = function () {
      vn_AnchorSniperUI.clickButton("topright");
    };
    var p = __BLOB__BLOB_000102__;
    var r = __BLOB__BLOB_000103__;
    var m = {
      grayed: this.utils.createResourceFile(
        "iconbut_LImage.png",
        p,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_LImage_on.png",
        r,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_LImage_on.png",
        r,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_LImage.png",
        p,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_L =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [0, 34, 28, 62],
        ScriptUI.newImage(m.standard, m.grayed, m.pushed, m.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_L.helpTip = "Left";
    H.panelMain.groupAnchorButtons.iconbut_L.onClick = function () {
      vn_AnchorSniperUI.clickButton("left");
    };
    var E = __BLOB__BLOB_000104__;
    var y = __BLOB__BLOB_000105__;
    var w = {
      grayed: this.utils.createResourceFile(
        "iconbut_CImage.png",
        E,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_CImage_on.png",
        y,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_CImage_on.png",
        y,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_CImage.png",
        E,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_C =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [32, 34, 60, 62],
        ScriptUI.newImage(w.standard, w.grayed, w.pushed, w.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_C.helpTip = "Center";
    H.panelMain.groupAnchorButtons.iconbut_C.onClick = function () {
      vn_AnchorSniperUI.clickButton("center");
    };
    var t = __BLOB__BLOB_000106__;
    var f = __BLOB__BLOB_000107__;
    var B = {
      grayed: this.utils.createResourceFile(
        "iconbut_RImage.png",
        t,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_RImage_on.png",
        f,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_RImage_on.png",
        f,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_RImage.png",
        t,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_R =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [64, 34, 92, 62],
        ScriptUI.newImage(B.standard, B.grayed, B.pushed, B.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_R.helpTip = "Right";
    H.panelMain.groupAnchorButtons.iconbut_R.onClick = function () {
      vn_AnchorSniperUI.clickButton("right");
    };
    var z = __BLOB__BLOB_000108__;
    var q = __BLOB__BLOB_000109__;
    var o = {
      grayed: this.utils.createResourceFile(
        "iconbut_BLImage.png",
        z,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_BLImage_on.png",
        q,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_BLImage_on.png",
        q,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_BLImage.png",
        z,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_BL =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [0, 66, 28, 94],
        ScriptUI.newImage(o.standard, o.grayed, o.pushed, o.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_BL.helpTip = "Bottom Left";
    H.panelMain.groupAnchorButtons.iconbut_BL.onClick = function () {
      vn_AnchorSniperUI.clickButton("bottomleft");
    };
    var l = __BLOB__BLOB_000110__;
    var i = __BLOB__BLOB_000111__;
    var s = {
      grayed: this.utils.createResourceFile(
        "iconbut_BImage.png",
        l,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_BImage_on.png",
        i,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_BImage_on.png",
        i,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_BImage.png",
        l,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_B =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [32, 66, 60, 94],
        ScriptUI.newImage(s.standard, s.grayed, s.pushed, s.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_B.helpTip = "Bottom";
    H.panelMain.groupAnchorButtons.iconbut_B.onClick = function () {
      vn_AnchorSniperUI.clickButton("bottom");
    };
    var I = __BLOB__BLOB_000112__;
    var e = __BLOB__BLOB_000113__;
    var K = {
      grayed: this.utils.createResourceFile(
        "iconbut_BRImage.png",
        I,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_BRImage_on.png",
        e,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_BRImage_on.png",
        e,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_BRImage.png",
        I,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupAnchorButtons.iconbut_BR =
      H.panelMain.groupAnchorButtons.add(
        "iconbutton",
        [64, 66, 92, 94],
        ScriptUI.newImage(K.standard, K.grayed, K.pushed, K.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupAnchorButtons.iconbut_BR.helpTip = "Bottom Right";
    H.panelMain.groupAnchorButtons.iconbut_BR.onClick = function () {
      vn_AnchorSniperUI.clickButton("bottomright");
    };
    H.panelSeperatorLine = H.add(
      "panel",
      this.globalVar.winObjSettings.seperaterLineSizeCurrent,
    );
    H.panelMain.groupCustomButtons = H.panelMain.add(
      "group",
      this.globalVar.winObjSettings.groupCustomSizeCurrent,
      "undefined",
    );
    var n = __BLOB__BLOB_000114__;
    H.panelMain.groupCustomButtons.iconbut_Target =
      H.panelMain.groupCustomButtons.add(
        "iconbutton",
        [0, 0, 28, 28],
        ScriptUI.newImage(
          this.utils.createResourceFile(
            "iconbut_TargetImage.png",
            n,
            this.utils.getUserDataFolder(
              this.globalConstants.scriptDataFolderName,
            ),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupCustomButtons.iconbut_Target.helpTip =
      "Custom Anchor Target";
    H.panelMain.groupCustomButtons.iconbut_Target.onClick = function () {
      vn_AnchorSniperUI.clickButton("target");
    };
    var j = __BLOB__BLOB_000115__;
    var N = __BLOB__BLOB_000116__;
    var L = {
      grayed: this.utils.createResourceFile(
        "iconbut_OKImage_disabled.png",
        N,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_OKImage.png",
        j,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_OKImage.png",
        j,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_OKImage.png",
        j,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupCustomButtons.iconbut_OK =
      H.panelMain.groupCustomButtons.add(
        "iconbutton",
        [32, 0, 60, 28],
        ScriptUI.newImage(L.standard, L.grayed, L.pushed, L.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupCustomButtons.iconbut_OK.helpTip = "Ok";
    H.panelMain.groupCustomButtons.iconbut_OK.enabled = false;
    H.panelMain.groupCustomButtons.iconbut_OK.onClick = function () {
      vn_AnchorSniperUI.clickButton("customOK");
    };
    var F = __BLOB__BLOB_000117__;
    var D = __BLOB__BLOB_000118__;
    var x = {
      grayed: this.utils.createResourceFile(
        "iconbut_CancelImage_disabled.png",
        D,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      hovered: this.utils.createResourceFile(
        "iconbut_CancelImage.png",
        F,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      pushed: this.utils.createResourceFile(
        "iconbut_CancelImage.png",
        F,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
      standard: this.utils.createResourceFile(
        "iconbut_CancelImage.png",
        F,
        this.utils.getUserDataFolder(this.globalConstants.scriptDataFolderName),
      ),
    };
    H.panelMain.groupCustomButtons.iconbut_Cancel =
      H.panelMain.groupCustomButtons.add(
        "iconbutton",
        [64, 0, 92, 28],
        ScriptUI.newImage(x.standard, x.grayed, x.pushed, x.hovered),
        { style: "toolbutton", toggle: 0 },
      );
    H.panelMain.groupCustomButtons.iconbut_Cancel.helpTip = "Cancel";
    H.panelMain.groupCustomButtons.iconbut_Cancel.enabled = false;
    H.panelMain.groupCustomButtons.iconbut_Cancel.onClick = function () {
      vn_AnchorSniperUI.clickButton("customCancel");
    };
    if (this.globalVar.winObjSettings.iconsUI) {
      this.buildOptionsUI_small(H);
    } else {
      this.buildOptionsUI_big(H);
    }
    H.burgerList = H.add(
      "listbox",
      this.globalVar.winObjSettings.burgerListSizeCurrent,
      "Anchor Panel Options",
    );
    H.burgerList.graphics.backgroundColor = H.burgerList.graphics.newBrush(
      H.burgerList.graphics.BrushType.SOLID_COLOR,
      [0.88, 0.88, 0.88],
    );
    H.burgerList.add("item", "Settings...");
    H.burgerList.add("item", "Help...");
    H.burgerList.add("item", "About...");
    H.burgerList.hide();
    H.burgerList.onChange = function () {
      vn_AnchorSniperUI.selectBurgerOptions(
        vn_AnchorSniperUI.globalVar.winObj.burgerList.selection,
      );
    };
    H.burgerList.addEventListener("mouseout", function (Q) {
      vn_AnchorSniperUI.globalVar.burger_list_should_close = true;
      vn_AnchorSniperUI.burgerMouseOutEvent();
    });
    H.burgerList.addEventListener("mouseover", function (Q) {
      vn_AnchorSniperUI.globalVar.burger_list_should_close = false;
      vn_AnchorSniperUI.burgerMouseOverEvent();
    });
    var P = __BLOB__BLOB_000119__;
    H.panelMain.but_Burger = H.panelMain.add(
      "iconbutton",
      this.globalVar.winObjSettings.burgerButtonSizeCurrent,
      ScriptUI.newImage(
        this.utils.createResourceFile(
          "iconbut_BurgerImage.png",
          P,
          this.utils.getUserDataFolder(
            this.globalConstants.scriptDataFolderName,
          ),
        ),
      ),
      { style: "toolbutton", toggle: 0 },
    );
    H.panelMain.but_Burger.addEventListener("mouseover", this.openBurger);
    H.panelMain.but_Burger.addEventListener(
      "mouseout",
      this.burgerMouseOutEvent,
    );
    this.toggleToolsPanel(H);
    H.onClose = function () {
      vn_AnchorSniperUI.checkTempControls();
    };
    return H;
  };
  this.run = function (e) {
    if (this.globalVar.t9.c()) {
      this.globalVar.isTrial = this.globalVar.t9.t();
      this.loadAnchorSNIPERSettings();
      this.populateWinObjSettings();
      this.globalVar.winObj = this.buildUI_alt(e);
      if (this.globalVar.winObj.toString() == "[object Panel]") {
        this.globalVar.winObj;
      } else {
        this.globalVar.winObj.show();
        if (
          this.globalVar.winObj != null &&
          this.globalVar.winObj instanceof Window
        ) {
          this.globalVar.winObj.center();
        }
      }
      this.loadAnchorSNIPERSettings();
    }
  };
}
var vn_AnchorSniperUI = new vn_AnchorSniper();
vn_AnchorSniperUI.run(this);
