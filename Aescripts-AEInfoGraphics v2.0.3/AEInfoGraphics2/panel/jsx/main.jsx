/**
 * AEInfoGraphics 2 - An extension that converts your data into amazing and beautiful chart animations.
 * @version v2.0.3
 * @link http://aeinfographics.com
 * @license UNLICENSED
 */
var myData;

function transferData(a) {
	myData = a;
	switch (myData.selectedTemplate) {
		case 0:
			createCylinderChart();
			break;
		case 1:
			createLineBarChart();
			break;
		case 2:
			createBarChart();
			break;
		case 3:
			createRingChart();
			break;
		case 4:
			createDropLineChart();
			break;
		case 5:
			createPyramidChart();
			break;
		case 6:
			createRoundChart();
			break;
		case 7:
			createSliderChart();
			break;
		case 8:
			createCircularChart();
			break;
		case 9:
			createSpiderChart();
			break;
		case 10:
			createNetChart();
			break;
		case 11:
			create3DBarChart();
			break;
		default:
			return;
	}
}
var ScriptName = "AEInfoGraphics";
var ScriptVersion = "2";
var data = new Array;
var columnIndex = 1;
var csv_file_name = "Population Density";
var file_ext = "";
var set = 0;
var cylinderChartNumber = 0;
var lineBarCompNumber = 0;
var barCompNumber = 0;
var netCompNumber = 0;
var pointerCompNumber = 0;
var circularBarCompNumber = 0;
var bar3DCompNumber = 0;
var ringChartNumber = 0;
var spiderChartNumber = 0;
var dropLineChartNumber = 0;
var pyramidChartNumber = 0;
var roundChartNumber = 0;
var easeIn = new KeyframeEase(0.5, 93);
var easeOut = new KeyframeEase(0.75, 15);

function createCylinderChart() {
	var z = app.project;
	var S = 12;
	var aa = myData.settings.compDuration;
	var F = Math.min(myData.dataNames.length, S);
	cylinderChartNumber++;
	app.beginUndoGroup("Create Cylinder Chart");
	var ak = z.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Cylinder Chart - " + cylinderChartNumber + ")", 1920, 1080, 1, aa, 25);
	var R = ak.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, aa);
	var ax = ak.layers.addNull(aa);
	ax.name = "PARENT";
	ax.position.setValue([960, 540]);
	var an = ax.Effects.addProperty("ADBE Color Control");
	an.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.cylinderChartColors.emptyCylinderColor));
	an.name = "Empty Cylinder Color";
	var I = ax.Effects.addProperty("ADBE Color Control");
	I.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	I.name = "BG Color";
	var ar = ax.Effects.addProperty("ADBE Color Control");
	ar.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.cylinderChartColors.titleColor));
	ar.name = "Title Color";
	var V = ax.Effects.addProperty("ADBE Color Control");
	V.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.cylinderChartColors.titleBGColor));
	V.name = "Title BG Color";
	var c = ax.Effects.addProperty("ADBE Color Control");
	c.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.cylinderChartColors.valueTitleColor));
	c.name = "Value Title Color";
	var J = ax.Effects.addProperty("ADBE Color Control");
	J.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.cylinderChartColors.valueTextColor));
	J.name = "Value Text Color";
	R.Effects.addProperty("ADBE Fill");
	R.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	R.shy = true;
	R.locked = true;
	var aj = myData.dataTitle;
	if (aj.length > 70) {
		aj = aj.slice(0, 68) + "..";
	}
	var n = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (n.length > 60) {
		n = n.slice(0, 58) + "..";
	}
	var s = 50 + 20 * n.length;
	var v = ak.layers.addSolid([1, 1, 1], "Title BG", s, 34, 1, aa);
	v.Effects.addProperty("ADBE Fill");
	v.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var L = v.position;
	var ab = v.scale;
	var ay = v.anchorPoint;
	ay.setValue([0, 17]);
	L.setValue([147, 188]);
	ab.setValueAtTime(0, [0, 100]);
	ab.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	ab.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
	v.shy = true;
	v.locked = true;
	for (i = 0; i < 2; i++) {
		var ad = ak.layers.addText("Hi");
		var y = ad.position;
		var P = ad.opacity;
		var M = ad.property("ADBE Text Properties").property("ADBE Text Document");
		var ae = M.value;
		if (i == 0) {
			ae.text = aj.toUpperCase();
			ae.fontSize = 30;
			ae.font = "Arial";
			ae.fillColor = ([1, 1, 1]);
			y.setValue([147, 152, 0]);
			ae.tracking = 250;
			ae.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			ae.text = n.toUpperCase();
			ae.fontSize = 20;
			ae.font = "Arial-Black";
			ae.fillColor = ([1, 1, 1]);
			y.setValue([155, 195, 0]);
			ae.tracking = 100;
			ae.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		ad.Effects.addProperty("ADBE Linear Wipe");
		ad.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		ad.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		ad.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		M.setValue(ae);
		ad.shy = true;
		ad.Effects.addProperty("ADBE Fill");
		ad.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var U = 0;
	var ah = 0;
	for (j = 0; j < myData.dataNames.length; j++) {
		ah += parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[j]);
	}
	for (l = 0; l < F; l++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[l]) > U) {
			U = myData.dataColumns[myData.selectedColumnsOf[0]].rows[l];
		}
	}
	var E = (100 * U) / ah;
	for (i = 0; i < F; i++) {
		var am = ((myData.settings.animDuration) / (2 * (F - 1))) * i;
		var aA = am + 0.5 * (myData.settings.animDuration);
		var aw = (F * 80) + (F - 1) * 40;
		var C = 960 - (aw / 2) + 20;
		var m = (myData.dataColumns[myData.selectedColumnsOf[0]].rows[i] * 420) / U;
		var w = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / ah;
		var q = "Data #" + (i + 1);
		var x = 0;
		if (myData.settings.selectedLabel == "percentage") {
			x = w / (myData.settings.animDuration);
		} else {
			x = parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) / (myData.settings.animDuration);
		}
		var Q = "timeToStart =" + am + "; \r timeToStop =" + aA + ";\r if ((time >= timeToStart) && (time < timeToStop)){ \r Math.round((time-timeToStart)*" + x + "); } else {text.sourceText}";
		var ac = ax.Effects.addProperty("ADBE Color Control");
		ac.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		ac.name = q;
		var e = ak.layers.addShape();
		e.name = "Empty Cylinder " + i;
		e.shy = true;
		e.locked = true;
		var X = e.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var h = X.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var a = h.size;
		a.setValue([80, 30]);
		var p = h.position;
		p.setValueAtTime(am * 0.25, [0, 210]);
		p.setValueAtTime(aA * 0.5, [0, -210]);
		var ao = X.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var Z = ao.property("ADBE Vector Fill Color");
		Z.setValue([0, 0, 0]);
		var u = X.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		u.setValueAtTime(am * 0.1, 0);
		u.setValueAtTime(aA * 0.1, 30);
		var W = e.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var K = W.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var az = K.size;
		az.setValue([80, 30]);
		var al = K.position;
		al.setValueAtTime(am * 0.25, [0, 210]);
		al.setValueAtTime(aA * 0.5, [0, -210]);
		var ao = W.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var Z = ao.property("ADBE Vector Fill Color");
		Z.expression = "thisComp.layer('PARENT').effect('Empty Cylinder Color')('ADBE Color Control-0001');";
		var t = W.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		t.setValueAtTime(am * 0.1, 0);
		t.setValueAtTime(aA * 0.1, 100);
		var au = e.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var B = au.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var N = B.size;
		N.setValue([80, 30]);
		var at = B.position;
		at.setValue([0, 210]);
		var D = au.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
		var H = D.size;
		H.setValueAtTime(am * 0.25, [80, 0]);
		H.setValueAtTime(aA * 0.5, [80, 420]);
		var af = D.position;
		af.setValueAtTime(am * 0.25, [0, 210]);
		af.setValueAtTime(aA * 0.5, [0, 0]);
		var T = au.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		T.setValueAtTime(am * 0.1, 0);
		T.setValueAtTime(aA * 0.1, 100);
		var ao = au.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var Z = ao.property("ADBE Vector Fill Color");
		Z.expression = "thisComp.layer('PARENT').effect('Empty Cylinder Color')('ADBE Color Control-0001');";
		var aq = e.anchorPoint;
		aq.setValue([0, 210]);
		var ap = e.position;
		ap.setValue([C + (120 * i), 796]);
		var ai = ak.layers.addShape();
		ai.name = "Data Cylinder " + i;
		ai.shy = true;
		ai.locked = true;
		var o = ai.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var h = o.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var a = h.size;
		a.setValue([80, 30]);
		var p = h.position;
		p.setValueAtTime(am, [0, m / 2]);
		p.setValueAtTime(aA, [0, -m / 2]);
		var ao = o.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var Z = ao.property("ADBE Vector Fill Color");
		Z.setValue([0, 0, 0]);
		var u = o.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		u.setValueAtTime(am * 0.1, 0);
		u.setValueAtTime(aA * 0.1, 30);
		var f = ai.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var K = f.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var az = K.size;
		az.setValue([80, 30]);
		var al = K.position;
		al.setValueAtTime(am, [0, m / 2]);
		al.setValueAtTime(aA, [0, -m / 2]);
		var ao = f.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var Z = ao.property("ADBE Vector Fill Color");
		Z.expression = "thisComp.layer('PARENT').effect('" + q + "')('ADBE Color Control-0001');";
		var t = f.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		t.setValueAtTime(am * 0.1, 0);
		t.setValueAtTime(aA * 0.1, 100);
		var Y = ai.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var B = Y.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var N = B.size;
		N.setValue([80, 30]);
		var at = B.position;
		at.setValue([0, m / 2]);
		var D = Y.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
		var H = D.size;
		H.setValueAtTime(am, [80, 0]);
		H.setValueAtTime(aA, [80, m]);
		var af = D.position;
		af.setValueAtTime(am, [0, m / 2]);
		af.setValueAtTime(aA, [0, 0]);
		var T = Y.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		T.setValueAtTime(am * 0.1, 0);
		T.setValueAtTime(aA * 0.1, 100);
		var ao = Y.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var Z = ao.property("ADBE Vector Fill Color");
		Z.expression = "thisComp.layer('PARENT').effect('" + q + "')('ADBE Color Control-0001');";
		var d = ai.anchorPoint;
		d.setValue([0, m / 2]);
		var ag = ai.position;
		ag.setValue([C + (120 * i), 796]);
		var aj = myData.dataNames[i];
		if (aj.length >= 13) {
			aj = aj.slice(0, 13) + "...";
		}
		var ad = ak.layers.addText(aj);
		var y = ad.position;
		var P = ad.opacity;
		var A = ad.rotation;
		var M = ad.property("ADBE Text Properties").property("ADBE Text Document");
		var ae = M.value;
		ae.fontSize = 17;
		ae.font = "Arial";
		ae.fillColor = ([1, 1, 1]);
		ae.tracking = 0;
		ae.justification = ParagraphJustification.LEFT_JUSTIFY;
		M.setValue(ae);
		ad.shy = true;
		ad.Effects.addProperty("ADBE Fill");
		ad.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
		P.setValueAtTime(am * 0.25, 0);
		P.setValueAtTime(aA * 0.25, 100);
		A.setValue(-90);
		var O = 796;
		if (w < E / 2) {
			O = 796 - m - 30;
		} else {
			O = 796;
		}
		y.setValueAtTime(am, [C + (120 * i) + 7, 796]);
		y.setValueAtTime(aA, [C + (120 * i) + 7, O]);
		ad.locked = true;
		var av = "";
		if (myData.settings.selectedLabel == "value") {
			av = "" + myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		} else {
			av = "" + (Math.round(w * 10) / 10) + "%";
		}
		var ad = ak.layers.addText(av);
		var y = ad.position;
		var P = ad.opacity;
		var G = ad.anchorPoint;
		var M = ad.property("ADBE Text Properties").property("ADBE Text Document");
		var ae = M.value;
		ae.fontSize = 17;
		ae.font = "Arial-Black";
		ae.fillColor = ([1, 1, 1]);
		ae.tracking = 0;
		ae.justification = ParagraphJustification.CENTER_JUSTIFY;
		M.setValue(ae);
		ad.shy = true;
		ad.Effects.addProperty("ADBE Fill");
		ad.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Text Color')('ADBE Color Control-0001');";
		M.expression = Q;
		P.setValueAtTime(am * 0.25, 0);
		P.setValueAtTime(aA * 0.25, 100);
		y.setValueAtTime(am, [C + (120 * i), 796 + 5]);
		y.setValueAtTime(aA, [C + (120 * i), 796 - m + 5]);
	}
	ak.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		ak.openInViewer();
	}
	app.endUndoGroup();
}

function createLineBarChart() {
	var y = 12;
	var R = app.project;
	var v = Math.min(myData.dataNames.length, y);
	var E = myData.settings.compDuration;
	lineBarCompNumber++;
	app.beginUndoGroup("Create Line Bar Chart");
	var A = R.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Line Bar Chart - " + lineBarCompNumber + ")", 1920, 1080, 1, E, 25);
	var aC = A.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, E);
	var P = A.layers.addNull(E);
	P.name = "PARENT";
	P.position.setValue([1921, 0]);
	var O = P.Effects.addProperty("ADBE Checkbox Control");
	O.name = "Gradient ON/OFF";
	var aD = P.Effects.addProperty("ADBE Color Control");
	aD.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	aD.name = "BG Color";
	var ay = P.Effects.addProperty("ADBE Color Control");
	ay.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.lineBarChartColors.bgColorDark));
	ay.name = "BG Color Dark (Gradient)";
	var c = P.Effects.addProperty("ADBE Color Control");
	c.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.lineBarChartColors.titleColor));
	c.name = "Title Color";
	if (myData.selectedColumnsOf.length == 1) {
		var aB = P.Effects.addProperty("ADBE Color Control");
		aB.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.lineBarChartColors.titleBGColor));
		aB.name = "Title BG Color";
	}
	var d = P.Effects.addProperty("ADBE Color Control");
	d.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.lineBarChartColors.valueTitleColor));
	d.name = "Value Title Color";
	var aa = P.Effects.addProperty("ADBE Color Control");
	aa.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.lineBarChartColors.valueTextColor));
	aa.name = "Value Text Color";
	var au = P.Effects.addProperty("ADBE Color Control");
	au.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.lineBarChartColors.lineColor));
	au.name = "Line Color";
	aC.Effects.addProperty("ADBE Fill");
	aC.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	aC.Effects.addProperty("ADBE Ramp");
	aC.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0001").setValue([960, 324]);
	aC.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0003").setValue([960, 1692]);
	aC.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	aC.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0004").expression = "thisComp.layer('PARENT').effect('BG Color Dark (Gradient)')('ADBE Color Control-0001');";
	aC.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0007").expression = "100-100*thisComp.layer('PARENT').effect('Gradient ON/OFF')('ADBE Checkbox Control-0001');";
	aC.shy = true;
	aC.locked = true;
	var aF = myData.dataTitle;
	if (aF.length > 70) {
		aF = aF.slice(0, 68) + "..";
	}
	var n = A.layers.addText("Hi");
	var af = n.position;
	var e = n.opacity;
	var z = n.property("ADBE Text Properties").property("ADBE Text Document");
	var aG = z.value;
	aG.text = aF.toUpperCase();
	aG.fontSize = 30;
	aG.font = "Arial";
	aG.fillColor = ([1, 1, 1]);
	af.setValue([147, 152, 0]);
	aG.tracking = 250;
	aG.justification = ParagraphJustification.LEFT_JUSTIFY;
	n.Effects.addProperty("ADBE Linear Wipe");
	n.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
	n.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(0, 95);
	n.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(myData.settings.animDuration * 0.5, 0);
	z.setValue(aG);
	n.shy = true;
	n.Effects.addProperty("ADBE Fill");
	n.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	if (myData.selectedColumnsOf.length == 1) {
		var Y = myData.dataColumns[myData.selectedColumnsOf[0]].title;
		if (Y.length > 60) {
			Y = Y.slice(0, 58);
		}
		var M = 50 + 20 * Y.length;
		var aE = A.layers.addSolid([1, 1, 1], "Title BG", M, 34, 1, E);
		aE.Effects.addProperty("ADBE Fill");
		aE.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
		var B = aE.position;
		var Q = aE.scale;
		var V = aE.anchorPoint;
		V.setValue([0, 17]);
		B.setValue([147, 186]);
		Q.setValueAtTime(0, [0, 0]);
		Q.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
		Q.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
		aE.shy = true;
		aE.locked = true;
		var n = A.layers.addText("Hi");
		var af = n.position;
		var e = n.opacity;
		var z = n.property("ADBE Text Properties").property("ADBE Text Document");
		var aG = z.value;
		aG.text = myData.dataColumns[myData.selectedColumnsOf[0]].title.toUpperCase();
		aG.fontSize = 20;
		aG.font = "Arial-Black";
		aG.fillColor = ([1, 1, 1]);
		af.setValue([155, 195, 0]);
		aG.tracking = 100;
		aG.justification = ParagraphJustification.LEFT_JUSTIFY;
		n.Effects.addProperty("ADBE Linear Wipe");
		n.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		n.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(myData.settings.animDuration * 0.1, 95);
		n.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(myData.settings.animDuration * 0.6, 0);
		z.setValue(aG);
		n.shy = true;
		n.Effects.addProperty("ADBE Fill");
		n.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var f = 1528;
	var m = 538;
	var J = 20;
	var w = 2;
	var K = 300;
	var t = 0;
	var ac = 146;
	var I = ac;
	var G = 0;
	var an = 0;
	var ad = {
		x: 960,
		y: 540
	};
	var s = 0;
	var h = 0;
	var ar = [0, 0, 0];
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (j = 0; j < v; j++) {
			h += parseFloat(myData.dataColumns[myData.selectedColumnsOf[i]].rows[j]);
		}
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < v; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > s) {
				s = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < v; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > ar[i]) {
				ar[i] = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	var at = Math.round((100 * s) / h);
	var ap = A.layers.addShape();
	ap.name = "Column Info Shape Layer";
	ap.shy = true;
	ap.locked = true;
	var p = A.layers.addShape();
	p.name = "Guide Shape Layer";
	p.shy = true;
	p.locked = true;
	for (i = 0; i < 11; i++) {
		var x = p.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var u = x.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
		var T = u.size;
		T.setValueAtTime((myData.settings.animDuration / 40) * i, [1, 0]);
		T.setValueAtTime((myData.settings.animDuration / 15) * i + 0.1, [1, m + 80]);
		T.setTemporalEaseAtKey(2, [easeIn, easeIn], [easeOut, easeOut]);
		var q = u.position;
		q.setValue([0, 0]);
		var aw = x.property("ADBE Vector Transform Group").property("ADBE Vector Position");
		aw.setValue([I + i * (f / 10) - 960, 0]);
		var ax = x.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
		ax.setValueAtTime(0, 0);
		ax.setValueAtTime(1, 100);
		var aH = x.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var av = aH.property("ADBE Vector Fill Color");
		av.expression = "thisComp.layer('PARENT').effect('Line Color')('ADBE Color Control-0001');";
		var W = (Math.round(((at / 10) * i) * 10) / 10) + "%";
		var n = A.layers.addText(W);
		var e = n.opacity;
		var af = n.position;
		var z = n.property("ADBE Text Properties").property("ADBE Text Document");
		var aG = z.value;
		aG.fontSize = 18;
		aG.font = "Arial-Black";
		aG.fillColor = ([1, 1, 1]);
		aG.tracking = 0;
		aG.justification = ParagraphJustification.CENTER_JUSTIFY;
		z.setValue(aG);
		n.shy = true;
		n.Effects.addProperty("ADBE Fill");
		n.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Line Color')('ADBE Color Control-0001');";
		e.setValueAtTime((myData.settings.animDuration / 40) * i, 0);
		e.setValueAtTime((myData.settings.animDuration / 15) * i + 0.1, 100);
		af.setValue([I + i * (f / 10), G + m + K + 64]);
	}
	var al = p.property("ADBE Transform Group").property("ADBE Position");
	al.setValue([960, 568]);
	var ab;
	for (k = 0; k < myData.selectedColumnsOf.length; k++) {
		var C = this.myData.selectedColumnsOf.length * v;
		J = 20 - (((C) - 2) / 52) * 19;
		t = (m - (v - 1) * J - (myData.selectedColumnsOf.length - 1) * w * v) / (v * myData.selectedColumnsOf.length);
		if (myData.selectedColumnsOf.length > 1) {
			var Z = "Column #" + (k + 1);
			var ae = P.Effects.addProperty("ADBE Color Control");
			ab = hexToRgb(myData.chartColors.lineBarChartColors.alternateColors[k]);
			ae.property("ADBE Color Control-0001").setValue(ab);
			ae.name = Z;
		}
		var aq = A.layers.addShape();
		aq.name = "Bar Shape Layer " + k;
		aq.shy = true;
		aq.locked = true;
		for (i = 0; i < v; i++) {
			var az = Math.round((100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i])) / h);
			var ao = ((myData.settings.animDuration) / (2 * (v - 1))) * i + (k * 0.3);
			var aj = ao + 0.5 * (myData.settings.animDuration);
			G = K + (i * (m / v)) + (k * (t + w));
			var a = myData.dataColumns[myData.selectedColumnsOf[k]].rows[i];
			an = (parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i]) / s) * f;
			if (myData.selectedColumnsOf.length == 1) {
				var Z = "Data #" + (i + 1);
				var ae = P.Effects.addProperty("ADBE Color Control");
				ab = hexToRgb(myData.dataColors[i]);
				ae.property("ADBE Color Control-0001").setValue(ab);
				ae.name = Z;
			}
			var F = aq.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
			var ak = F.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
			var am = ak.size;
			am.setValueAtTime(ao, [0, t]);
			am.setValueAtTime(aj, [an, t]);
			am.setTemporalEaseAtKey(2, [easeIn, easeIn], [easeOut, easeOut]);
			var H = ak.position;
			H.setValue([0, 0]);
			var aw = F.property("ADBE Vector Transform Group").property("ADBE Vector Position");
			aw.setValue([I - ad.x, G - ad.y]);
			var ah = F.property("ADBE Vector Transform Group").property("ADBE Vector Anchor");
			ah.setValueAtTime(ao, [0, -t / 2]);
			ah.setValueAtTime(aj, [-an / 2, -t / 2]);
			ah.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
			var aI = F.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
			aI.setValueAtTime(ao * 0.1, 0);
			aI.setValueAtTime(aj * 0.1, 100);
			var aH = F.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
			var av = aH.property("ADBE Vector Fill Color");
			av.expression = "thisComp.layer('PARENT').effect('" + Z + "')('ADBE Color Control-0001');";
			var D = 0;
			var X = Math.min(t, 17);
			if (myData.settings.selectedLabel == "percentage") {
				D = az / (myData.settings.animDuration);
			} else {
				D = parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i]) / (myData.settings.animDuration);
			}
			var ag = "timeToStart =" + ao + "; \r timeToStop =" + aj + ";\r if ((time >= timeToStart) && (time < timeToStop)){ \r Math.round((time-timeToStart)*" + (D * 2) + "); } else {text.sourceText}";
			var o = "";
			if (myData.settings.selectedLabel == "value") {
				o = "" + myData.dataColumns[myData.selectedColumnsOf[k]].rows[i];
			} else {
				o = "" + az + "%";
			}
			var n = A.layers.addText(o);
			var af = n.position;
			var e = n.opacity;
			var S = n.anchorPoint;
			var z = n.property("ADBE Text Properties").property("ADBE Text Document");
			var aG = z.value;
			aG.fontSize = X;
			aG.font = "Arial-Black";
			aG.fillColor = ([1, 1, 1]);
			aG.tracking = 0;
			aG.justification = ParagraphJustification.LEFT_JUSTIFY;
			z.setValue(aG);
			n.shy = true;
			n.Effects.addProperty("ADBE Fill");
			n.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Text Color')('ADBE Color Control-0001');";
			z.expression = ag;
			S.setValue([0, -X]);
			e.setValueAtTime(ao * 0.25, 0);
			e.setValueAtTime(aj * 0.25, 100);
			af.setValueAtTime(ao, [I, G]);
			af.setValueAtTime(aj, [I + an + J / 2, G]);
			af.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
			if (k == 0) {
				var aF = myData.dataNames[i];
				if (aF.length >= 13) {
					aF = aF.slice(0, 13) + "...";
				}
				var n = A.layers.addText(aF);
				var af = n.position;
				var e = n.opacity;
				var aA = n.anchorPoint;
				var z = n.property("ADBE Text Properties").property("ADBE Text Document");
				var aG = z.value;
				aG.fontSize = X;
				aG.font = "Arial";
				aG.fillColor = ([1, 1, 1]);
				aG.tracking = 0;
				aG.justification = ParagraphJustification.LEFT_JUSTIFY;
				z.setValue(aG);
				n.shy = true;
				n.Effects.addProperty("ADBE Fill");
				n.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
				aA.setValue([0, -X]);
				e.setValueAtTime(ao * 0.25, 0);
				e.setValueAtTime(aj * 0.25, 100);
				af.setValueAtTime(ao, [I, G]);
				af.setValueAtTime(aj, [I + (8 * o.length) + (an + X * (a.toString().length) * 0.7), G]);
				af.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
				n.locked = true;
			}
		}
		if (myData.selectedColumnsOf.length > 1) {
			var N = ap.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
			var ai = N.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
			var U = ai.size;
			U.setValueAtTime((myData.settings.animDuration / 8), [0, 0]);
			U.setValueAtTime((myData.settings.animDuration / 3) + k * 0.5, [33, 20]);
			U.setTemporalEaseAtKey(2, [easeIn, easeIn], [easeOut, easeOut]);
			var L = ai.position;
			L.setValue([0, 0]);
			var aw = N.property("ADBE Vector Transform Group").property("ADBE Vector Position");
			aw.setValue([I - ad.x + k * 300, 420]);
			var ah = N.property("ADBE Vector Transform Group").property("ADBE Vector Anchor");
			ah.setValue([-16, 0]);
			var ax = N.property("ADBE Vector Transform Group").property("ADBE Vector Group Opacity");
			ax.setValueAtTime(0, 0);
			ax.setValueAtTime(1, 100);
			var aH = N.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
			var av = aH.property("ADBE Vector Fill Color");
			av.expression = "thisComp.layer('PARENT').effect('" + Z + "')('ADBE Color Control-0001');";
			var aF = myData.dataColumns[myData.selectedColumnsOf[k]].title;
			if (aF.length >= 25) {
				aF = aF.slice(0, 22) + "...";
			}
			var n = A.layers.addText(aF);
			var af = n.position;
			var e = n.opacity;
			var aA = n.anchorPoint;
			var z = n.property("ADBE Text Properties").property("ADBE Text Document");
			var aG = z.value;
			aG.fontSize = 17;
			aG.font = "Arial-Black";
			aG.fillColor = ([1, 1, 1]);
			aG.tracking = 0;
			aG.justification = ParagraphJustification.LEFT_JUSTIFY;
			z.setValue(aG);
			n.shy = true;
			n.Effects.addProperty("ADBE Fill");
			n.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
			e.setValueAtTime((myData.settings.animDuration / 8), 0);
			e.setValueAtTime((myData.settings.animDuration / 3) + k * 0.5, 100);
			af.setValue([I + k * 300 + 50, 968]);
			n.locked = true;
		}
	}
	A.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		A.openInViewer();
	}
	app.endUndoGroup();
}

function createBarChart() {
	var Q = 18;
	var y = app.project;
	var D = Math.min(myData.dataNames.length, Q);
	var Y = myData.settings.compDuration;
	var f = 45;
	barCompNumber++;
	app.beginUndoGroup("Create Bar Chart");
	var V = y.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Bar Chart - " + barCompNumber + ")", 1920, 1080, 1, Y, 25);
	var P = V.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, Y);
	var aq = V.layers.addNull(Y);
	aq.name = "PARENT";
	aq.position.setValue([1921, 0]);
	aq.Effects.addProperty("ADBE Slider Control");
	aq.property("ADBE Effect Parade").property("ADBE Slider Control").name = "Height of Bars";
	aq.property("ADBE Effect Parade").property("Height of Bars").property("ADBE Slider Control-0001").expression = "if (effect('Height of Bars')('ADBE Slider Control-0001') > 150) {150} else if (effect('Height of Bars')('ADBE Slider Control-0001') < -95) {-95} else {effect('Height of Bars')('ADBE Slider Control-0001')}";
	if (set == 0) {
		var al = aq.Effects.addProperty("ADBE Checkbox Control");
		al.name = "Glows ON/OFF";
	}
	var d = aq.Effects.addProperty("ADBE Checkbox Control");
	d.name = "Gradient ON/OFF";
	var F = aq.Effects.addProperty("ADBE Color Control");
	F.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	F.name = "BG Color";
	var ad = aq.Effects.addProperty("ADBE Color Control");
	ad.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.barChartColors.bgColorDark));
	ad.name = "BG Color Dark (Gradient)";
	var S = aq.Effects.addProperty("ADBE Color Control");
	S.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.barChartColors.titleColor));
	S.name = "Title Color";
	var S = aq.Effects.addProperty("ADBE Color Control");
	S.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.barChartColors.titleBGColor));
	S.name = "Title BG Color";
	var c = aq.Effects.addProperty("ADBE Color Control");
	c.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.barChartColors.valueTitleColor));
	c.name = "Value Title Color";
	var G = aq.Effects.addProperty("ADBE Color Control");
	G.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.barChartColors.valueTextColor));
	G.name = "Value Text Color";
	var ao = aq.Effects.addProperty("ADBE Color Control");
	ao.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.barChartColors.littleCirclesColor));
	ao.name = "Little Circles Color";
	P.Effects.addProperty("ADBE Fill");
	P.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	P.Effects.addProperty("ADBE Ramp");
	P.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0001").setValue([960, 324]);
	P.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0003").setValue([960, 1692]);
	P.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	P.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0004").expression = "thisComp.layer('PARENT').effect('BG Color Dark (Gradient)')('ADBE Color Control-0001');";
	P.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0007").expression = "100-100*thisComp.layer('PARENT').effect('Gradient ON/OFF')('ADBE Checkbox Control-0001');";
	P.shy = true;
	P.locked = true;
	var af = myData.dataTitle;
	if (af.length > 70) {
		af = af.slice(0, 68) + "..";
	}
	var h = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (h.length > 60) {
		h = h.slice(0, 58) + "..";
	}
	var q = 50 + 20 * h.length;
	var s = V.layers.addSolid([1, 1, 1], "Title BG", q, 34, 1, Y);
	s.Effects.addProperty("ADBE Fill");
	s.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var J = s.position;
	var Z = s.scale;
	var av = s.anchorPoint;
	av.setValue([0, 17]);
	J.setValue([147, 188]);
	Z.setValueAtTime(0, [0, 100]);
	Z.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	Z.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
	s.shy = true;
	s.locked = true;
	for (i = 0; i < 2; i++) {
		var aa = V.layers.addText("Hi");
		var x = aa.position;
		var O = aa.opacity;
		var K = aa.property("ADBE Text Properties").property("ADBE Text Document");
		var ab = K.value;
		if (i == 0) {
			ab.text = af.toUpperCase();
			ab.fontSize = 30;
			ab.font = "Arial";
			ab.fillColor = ([1, 1, 1]);
			x.setValue([147, 152, 0]);
			ab.tracking = 250;
			ab.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			ab.text = h.toUpperCase();
			ab.fontSize = 20;
			ab.font = "Arial-Black";
			ab.fillColor = ([1, 1, 1]);
			x.setValue([155, 195, 0]);
			ab.tracking = 100;
			ab.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		aa.Effects.addProperty("ADBE Linear Wipe");
		aa.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		aa.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		aa.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		K.setValue(ab);
		aa.shy = true;
		aa.Effects.addProperty("ADBE Fill");
		aa.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var ae = totalValue(0, Q);
	var e = 140;
	var o = 500;
	var U = V.layers.addShape();
	U.name = "Ellipses";
	var L = U.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	U.shy = true;
	U.locked = true;
	for (i = 0; i < D; i++) {
		var m = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		if (m == 0) {
			m = 0.001;
		}
		var z = 5 * D;
		var a = Math.floor(parseFloat(m) * ((1655 - z) / ae));
		var u = parseFloat(m / myData.settings.animDuration);
		var p = "Data #" + (i + 1);
		var at = aq.Effects.addProperty("ADBE Color Control");
		at.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		at.name = p;
		var ak = [e, o + 53, 0];
		e = e + a + 5;
		var ax = L.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var I = ax.size;
		I.setValue([11, 11]);
		I.setValueAtTime(0, [0, 0]);
		I.setValueAtTime((myData.settings.animDuration), [11, 11]);
		I.setTemporalEaseAtKey(2, [easeIn, easeIn], [easeOut, easeOut]);
		var ar = ax.position;
		ar.setValueAtTime(0, [e - a - 970, o - 464]);
		ar.setValueAtTime((myData.settings.animDuration), [e - 970, o - 464]);
		ar.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
		var B = 0;
		if (a == 0) {
			B = 1;
		} else {
			B = a;
		}
		var aj = V.layers.addSolid(hexToRgb(myData.dataColors[i]), "Bar", B, f, 1, Y);
		aj.shy = true;
		aj.locked = true;
		aj.Effects.addProperty("ADBE Fill");
		var an = aj.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002");
		an.expression = "thisComp.layer('PARENT').effect('" + p + "')('ADBE Color Control-0001');";
		if (set == 0) {
			aj.Effects.addProperty("ADBE Glo2");
			var aw = aj.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0002");
			aw.expression = "0";
			var ah = aj.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0003");
			ah.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*56;";
			var X = aj.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0004");
			X.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*0.3;";
		}
		var E = aj.anchorPoint;
		var R = aj.scale;
		R.expression = "[transform.scale[0],transform.scale[1]+thisComp.layer('PARENT').effect('Height of Bars')('ADBE Slider Control-0001')];";
		E.setValue([0, f]);
		var au = aj.position;
		var R = aj.scale;
		var ac = aj.opacity;
		R.setValueAtTime(0, [0, 100]);
		R.setValueAtTime((myData.settings.animDuration), [100, 100]);
		R.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
		ac.setValueAtTime(0, 0);
		ac.setValueAtTime((myData.settings.animDuration), 100);
		ac.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
		au.setValue(ak);
		if (B > 5) {
			var aa = V.layers.addText(m.toString());
			aa.shy = true;
			var x = aa.position;
			var O = aa.opacity;
			var A = aa.rotation;
			A.setValue(90);
			var K = aa.property("ADBE Text Properties").property("ADBE Text Document");
			var ab = K.value;
			ab.font = "Arial-Black";
			ab.fontSize = 16;
			ab.fillColor = [1, 1, 1];
			ab.tracking = 0;
			ab.justification = ParagraphJustification.LEFT_JUSTIFY;
			K.setValue(ab);
			aa.Effects.addProperty("ADBE Fill");
			aa.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Text Color')('ADBE Color Control-0001');";
			x.setValueAtTime(0, [e - a - 14, o + 91]);
			x.setValueAtTime((myData.settings.animDuration), [e - 14, o + 91]);
			x.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
			O.setValueAtTime(0, 0);
			O.setValueAtTime((myData.settings.animDuration), 100);
			O.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
		}
	}
	var w = L.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
	w.property("ADBE Vector Stroke Width").setValue(1);
	w.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Little Circles Color')('ADBE Color Control-0001');";
	var C = V.layers.addShape();
	C.name = "Big Circles";
	C.shy = true;
	C.locked = true;
	var T = C.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	T.name = "Group 1";
	for (i = 0; i < D; i++) {
		var n = 7;
		var am = i % n;
		var H = (i - (i % n)) / n;
		var ai = 230;
		var v = 68;
		var N = 10;
		var M = 10;
		var a = 1655 / n;
		var m = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		var t = (100 * parseFloat(m)) / ae;
		var p = "Data #" + (i + 1);
		var z = 5 * D;
		var ax = T.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		ax.name = "Ellipse Path " + i.toString();
		var I = ax.size;
		var ag = i * 0.1 * (myData.settings.animDuration);
		I.setValueAtTime(ag, [0, 0]);
		I.setValueAtTime(ag + (myData.settings.animDuration) * 0.5, [22, 22]);
		I.expression = "if (time>" + ag + ") {a=content('Group 1').content('Ellipse Path " + i + "').size[0]+20*Math.sin(10*(time-" + ag + "))/Math.exp(1.7*(time-" + ag + ")); [a,a];}  else {[content('Group 1').content('Ellipse Path " + i + "').size[0],content('Group 1').content('Ellipse Path " + i + "').size[0]]}";
		var ar = ax.position;
		ar.setValue([am * ai + N - 814, M + 222 + H * v]);
		var w = T.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
		w.property("ADBE Vector Stroke Width").setValue(0);
		var w = T.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var W = w.property("ADBE Vector Fill Color");
		W.expression = "thisComp.layer('PARENT').effect('" + p + "')('ADBE Color Control-0001');";
		var af = myData.dataNames[i];
		if (af.length >= 13) {
			af = af.slice(0, 13) + "...";
		}
		var aa = V.layers.addText(af);
		aa.shy = true;
		var x = aa.position;
		var O = aa.opacity;
		var K = aa.property("ADBE Text Properties").property("ADBE Text Document");
		var ab = K.value;
		ab.fontSize = 18;
		ab.font = "Arial-Black";
		ab.fillColor = [1, 1, 1];
		ab.tracking = 40;
		ab.justification = ParagraphJustification.LEFT_JUSTIFY;
		K.setValue(ab);
		aa.Effects.addProperty("ADBE Fill");
		aa.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
		x.setValue([am * ai + N + 180, M + 768 + H * v]);
		O.setValueAtTime(ag, 0);
		O.setValueAtTime(ag + (myData.settings.animDuration) * 0.5, 100);
		var ap = "";
		if (myData.settings.selectedLabel == "value") {
			ap = "" + m;
		} else {
			ap = "" + (Math.round(t * 10) / 10) + "%";
		}
		var aa = V.layers.addText(ap);
		aa.shy = true;
		var x = aa.position;
		var O = aa.opacity;
		var K = aa.property("ADBE Text Properties").property("ADBE Text Document");
		var ab = K.value;
		ab.fontSize = 18;
		ab.font = "Arial-Black";
		ab.fillColor = [0.6, 0.6, 0.6];
		ab.tracking = 40;
		ab.justification = ParagraphJustification.LEFT_JUSTIFY;
		K.setValue(ab);
		aa.Effects.addProperty("ADBE Fill");
		aa.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Text Color')('ADBE Color Control-0001');";
		x.setValue([am * ai + N + 180, M + 790 + H * v]);
		O.setValueAtTime(ag, 0);
		O.setValueAtTime(ag + (myData.settings.animDuration) * 0.5, 100);
	}
	V.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		V.openInViewer();
	}
	app.endUndoGroup();
}

function createRingChart() {
	var v = app.project;
	var P = 9;
	var R = myData.settings.compDuration;
	var B = Math.min(myData.dataNames.length, P);
	ringChartNumber++;
	app.beginUndoGroup("Create Ring Chart");
	var ak = v.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Ring Chart - " + ringChartNumber + ")", 1920, 1080, 1, R, 25);
	var O = ak.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, R);
	var an = ak.layers.addNull(R);
	an.name = "PARENT";
	an.position.setValue([960, 540]);
	var ar = an.Effects.addProperty("ADBE Slider Control");
	ar.property("ADBE Slider Control-0001").setValue(35);
	ar.name = "Thickness";
	var C = an.Effects.addProperty("ADBE Color Control");
	C.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	C.name = "BG Color";
	var ah = an.Effects.addProperty("ADBE Color Control");
	ah.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.ringChartColors.titleColor));
	ah.name = "Title Color";
	var at = an.Effects.addProperty("ADBE Color Control");
	at.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.ringChartColors.titleColor));
	at.name = "Value Title Color";
	if (myData.selectedColumnsOf.length == 1) {
		var aq = an.Effects.addProperty("ADBE Color Control");
		aq.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.ringChartColors.titleBGColor));
		aq.name = "Title BG Color";
		var E = an.Effects.addProperty("ADBE Color Control");
		E.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.ringChartColors.percentageColor));
		E.name = "Value Text Color";
	}
	var D = an.Effects.addProperty("ADBE Color Control");
	D.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.ringChartColors.guideColor));
	D.name = "Guide Color";
	O.Effects.addProperty("ADBE Fill");
	O.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	O.shy = true;
	O.locked = true;
	var aa = myData.dataTitle;
	if (aa.length > 20) {
		aa = aa.slice(0, 18) + "..";
	}
	var U = ak.layers.addText("Hi");
	var t = U.position;
	var M = U.opacity;
	var H = U.property("ADBE Text Properties").property("ADBE Text Document");
	var V = H.value;
	V.text = aa.toUpperCase();
	V.fontSize = 30;
	V.font = "Arial";
	V.fillColor = ([1, 1, 1]);
	t.setValue([147, 152, 0]);
	V.tracking = 250;
	V.justification = ParagraphJustification.LEFT_JUSTIFY;
	U.Effects.addProperty("ADBE Linear Wipe");
	U.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
	U.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(0, 95);
	U.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime((myData.settings.animDuration) * 0.5, 0);
	H.setValue(V);
	U.shy = true;
	U.Effects.addProperty("ADBE Fill");
	U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	var Q = 0;
	var Y = 0;
	var L = [0, 0, 0];
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (j = 0; j < B; j++) {
			Y += parseFloat(myData.dataColumns[myData.selectedColumnsOf[i]].rows[j]);
		}
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < B; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > Q) {
				Q = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < B; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > L[i]) {
				L[i] = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	var c = 75;
	var A = (100 * Q) / Y;
	var p = 450 - B * 0.5 * c;
	var a = ak.layers.addShape();
	a.name = "Guides";
	a.shy = true;
	var am = a.property("ADBE Root Vectors Group");
	var I = am;
	var ae, s, av;
	ae = I.addProperty("ADBE Vector Shape - Group");
	ae.name = "Shape Layer";
	s = ae.property("ADBE Vector Shape");
	av = new Shape();
	av.vertices = [
		[0, (p + c) * (-0.5) + 20],
		[0, (p + c * B) * (-0.5)]
	];
	av.inTangents = [
		[0, 0],
		[0, 0]
	];
	av.outTangents = [
		[0, 0],
		[0, 0]
	];
	av.closed = false;
	s.setValue(av);
	var u = I.addProperty("ADBE Vector Graphic - Stroke");
	u.property("ADBE Vector Stroke Width").setValue(1);
	u.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Color')('ADBE Color Control-0001');";
	var W = I.addProperty("ADBE Vector Filter - Repeater");
	W.property("ADBE Vector Repeater Copies").setValue(11);
	W.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValue(27);
	a.parent = an;
	a.locked = true;
	W.property("ADBE Vector Repeater Copies").setValueAtTime(0.32, 0);
	W.property("ADBE Vector Repeater Copies").setValueAtTime(0.32 + (myData.settings.animDuration), 11);
	W.property("ADBE Vector Repeater Copies").setTemporalEaseAtKey(2, [easeIn]);
	var J = (p + c * B) * 0.5 + 20;
	for (i = 0; i < 11; i++) {
		var f = J * Math.cos((Math.PI * (27 * i)) / 180 - Math.PI * 0.5);
		var G = J * Math.sin((Math.PI * (27 * i)) / 180 - Math.PI * 0.5);
		var U = ak.layers.addText("0");
		var t = U.position;
		var ap = U.anchorPoint;
		var M = U.opacity;
		ap.setValue([0, -7]);
		var H = U.property("ADBE Text Properties").property("ADBE Text Document");
		var V = H.value;
		V.text = Math.round((A / 10) * i * 10) / 10;
		V.fontSize = 20;
		V.font = "Arial";
		V.fillColor = ([1, 1, 1]);
		t.setValue([f + 960, G + 540, 0]);
		V.tracking = 0;
		V.justification = ParagraphJustification.CENTER_JUSTIFY;
		H.setValue(V);
		U.shy = true;
		U.Effects.addProperty("ADBE Fill");
		U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Guide Color')('ADBE Color Control-0001');";
		M.setValueAtTime(0.1 * (myData.settings.animDuration) + i * 0.18, 0);
		M.setValueAtTime(0.35 * (myData.settings.animDuration) + i * 0.18, 100);
		U.parent = an;
		U.locked = true;
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < B; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > L[i]) {
				L[i] = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	for (k = 0; k < myData.selectedColumnsOf.length; k++) {
		var d = 0.1 * (myData.settings.animDuration) + k * 0.1;
		var ag;
		if (myData.selectedColumnsOf.length > 1) {
			var e = "Column #" + (k + 1);
			var T = an.Effects.addProperty("ADBE Color Control");
			ag = hexToRgb(myData.chartColors.ringChartColors.alternateColors[k]);
			T.property("ADBE Color Control-0001").setValue(ag);
			T.name = e;
		}
		for (i = 0; i < B; i++) {
			var o = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i])) / Y;
			var Z = (75 * o) / A;
			if (myData.selectedColumnsOf.length == 1) {
				var e = "Data #" + (i + 1);
				var T = an.Effects.addProperty("ADBE Color Control");
				ag = hexToRgb(myData.dataColors[i]);
				T.property("ADBE Color Control-0001").setValue(ag);
				T.name = e;
			}
			var F = ak.layers.addShape();
			F.name = "Ring" + i.toString();
			F.shy = true;
			var ab = F.property("ADBE Root Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
			var N = ab.size;
			var ai = p + i * c + k * 20;
			N.setValue([ai, ai]);
			var u = F.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
			u.property("ADBE Vector Stroke Width").expression = "thickness=thisComp.layer('PARENT').effect('Thickness')('ADBE Slider Control-0001');linear(thickness,0,100,0,30);";
			u.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('" + e + "')('ADBE Color Control-0001');";
			var n = F.property("ADBE Root Vectors Group").addProperty("ADBE Vector Filter - Trim");
			n.property("ADBE Vector Trim End").setValueAtTime(d, 0);
			n.property("ADBE Vector Trim End").setValueAtTime(0.35 * (myData.settings.animDuration) + d + Z * 0.01, Z);
			n.property("ADBE Vector Trim End").setTemporalEaseAtKey(2, [easeIn]);
			F.parent = an;
			F.locked = true;
			var X = 0;
			if (k == (myData.selectedColumnsOf.length - 1)) {
				var aa = myData.dataNames[i];
				if (aa.length >= 22) {
					aa = aa.slice(0, 19) + "...";
				}
				var U = ak.layers.addText(aa);
				var t = U.position;
				var ap = U.anchorPoint;
				var M = U.opacity;
				ap.setValue([0, -7]);
				var H = U.property("ADBE Text Properties").property("ADBE Text Document");
				var V = H.value;
				V.fontSize = 20;
				V.font = "Arial";
				V.fillColor = ([1, 1, 1]);
				V.tracking = 0;
				V.justification = ParagraphJustification.RIGHT_JUSTIFY;
				H.setValue(V);
				U.shy = true;
				U.Effects.addProperty("ADBE Fill");
				if (k == 0) {
					U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + e + "')('ADBE Color Control-0001');";
					if (myData.settings.selectedLabel == "value") {
						var af = L[0];
						X = 45 + af.toString().length * 12;
					} else {
						X = 90;
					}
				} else {
					U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
					if (myData.settings.selectedLabel == "value") {
						var af = L[0];
						var ad = L[1];
						X = 90 + (af.toString().length + ad.toString().length) * 12;
					} else {
						X = 170;
					}
				}
				M.setValueAtTime(0.12 * i, 0);
				M.setValueAtTime(0.44 + 0.12 * i, 100);
				t.setValueAtTime(d + 0.12 * i, [940, 540 + (p + c * i) * (-0.5), 0]);
				t.setValueAtTime(d + 1.76 + 0.12 * i, [940 - X, 540 + (p + c * i) * (-0.5), 0]);
				t.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
				U.parent = an;
				U.locked = true;
			}
			var ac = 0;
			var al = "";
			if (myData.settings.selectedLabel == "value") {
				al = "" + myData.dataColumns[myData.selectedColumnsOf[k]].rows[i];
				ac = L[0];
			} else {
				al = "" + (Math.round(o * 10) / 10) + "%";
				ac = 9999;
			}
			var U = ak.layers.addText(al);
			var t = U.position;
			var ap = U.anchorPoint;
			var M = U.opacity;
			ap.setValue([0, -7]);
			var H = U.property("ADBE Text Properties").property("ADBE Text Document");
			var V = H.value;
			V.fontSize = 20;
			V.font = "Arial-Black";
			t.setValue([940 - k * (30 + (ac.toString().length) * 12), 540 + (p + c * i) * (-0.5), 0]);
			V.tracking = 0;
			V.justification = ParagraphJustification.RIGHT_JUSTIFY;
			H.setValue(V);
			U.shy = true;
			U.Effects.addProperty("ADBE Fill");
			if (myData.selectedColumnsOf.length > 1) {
				U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + e + "')('ADBE Color Control-0001');";
			} else {
				U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Text Color')('ADBE Color Control-0001');";
			}
			M.setValueAtTime(d + 0.12 * i, 0);
			M.setValueAtTime(d + (myData.settings.animDuration) + 0.12 * i, 100);
			U.parent = an;
			U.locked = true;
		}
		var w = 0;
		var q = 147 + 30 * this.myData.dataTitle.length + 25;
		var K = 143 + 35 * k;
		if ((B > 5) && (myData.selectedColumnsOf.length > 1)) {
			q = 147;
			K = 210 + 35 * k;
		} else {
			if ((B > 5) && (myData.selectedColumnsOf.length == 1)) {
				q = 147;
				K = 190 + 35 * k;
			}
		}
		if (myData.selectedColumnsOf.length > 1) {
			var S = ak.layers.addSolid([1, 1, 1], "Column Box " + k, 60, 15, 1, R);
			S.Effects.addProperty("ADBE Fill");
			S.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + e + "')('ADBE Color Control-0001');";
			var au = S.position;
			var aj = S.scale;
			var h = S.anchorPoint;
			h.setValue([0, 0]);
			au.setValue([q, K - 10]);
			aj.setValueAtTime(0, [0, 100]);
			aj.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [100, 100]);
			aj.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
			S.shy = true;
			S.locked = true;
		} else {
			var m = 50 + 25 * (myData.dataColumns[myData.selectedColumnsOf[0]].title.length);
			m = Math.min(m, 500);
			var S = ak.layers.addSolid([1, 1, 1], "Column Box " + k, m, 34, 1, R);
			S.Effects.addProperty("ADBE Fill");
			S.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
			var au = S.position;
			var aj = S.scale;
			var h = S.anchorPoint;
			h.setValue([0, 0]);
			au.setValue([q, K - 17]);
			aj.setValueAtTime(0, [0, 100]);
			aj.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [100, 100]);
			aj.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
			S.shy = true;
			S.locked = true;
		}
		var ao = myData.dataColumns[myData.selectedColumnsOf[k]].title;
		if (ao.length > 22) {
			ao = ao.slice(0, 19) + "...";
		}
		var U = ak.layers.addText(ao.toUpperCase());
		var t = U.position;
		var ap = U.anchorPoint;
		var M = U.opacity;
		ap.setValue([0, -7]);
		var H = U.property("ADBE Text Properties").property("ADBE Text Document");
		var V = H.value;
		V.font = "Arial-BoldMT";
		if (myData.selectedColumnsOf.length > 1) {
			V.fontSize = 16;
			t.setValueAtTime(0, [q - 30, K - 3]);
			t.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [q + 70, K - 3]);
			t.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
		} else {
			V.fontSize = 18;
			t.setValue([q + 25, K]);
		}
		V.tracking = 100;
		V.justification = ParagraphJustification.LEFT_JUSTIFY;
		H.setValue(V);
		U.shy = true;
		U.Effects.addProperty("ADBE Fill");
		U.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
		M.setValueAtTime(0, 0);
		M.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, 100);
		U.parent = an;
		U.locked = true;
	}
	ak.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		ak.openInViewer();
	}
	app.endUndoGroup();
}

function createDropLineChart() {
	var Y = app.project;
	var N = 18;
	var R = myData.settings.compDuration;
	var H = Math.min(myData.dataNames.length, N);
	dropLineChartNumber++;
	app.beginUndoGroup("Create Drop Line Chart");
	var A = Y.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Drop Line Chart - " + dropLineChartNumber + ")", 1920, 1080, 1, R, 25);
	var aG = A.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, R);
	var X = A.layers.addNull(R);
	X.name = "PARENT";
	X.position.setValue([960, 540]);
	var J = X.Effects.addProperty("ADBE Slider Control");
	J.property("ADBE Slider Control-0001").setValue(21);
	J.name = "Vertical Interval";
	var a = X.Effects.addProperty("ADBE Slider Control");
	a.property("ADBE Slider Control-0001").setValue(50);
	a.name = "Horizontal Interval";
	var aD = X.Effects.addProperty("ADBE Color Control");
	aD.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.dropLineChartColors.intervalTextColor));
	aD.name = "Interval Text Color";
	var B = X.Effects.addProperty("ADBE Color Control");
	B.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.dropLineChartColors.dataNameLineColor));
	B.name = "Data Name Line Color";
	var I = X.Effects.addProperty("ADBE Slider Control");
	I.property("ADBE Slider Control-0001").setValue(15);
	I.name = "Drop Shadow Distance";
	var q = X.Effects.addProperty("ADBE Slider Control");
	q.property("ADBE Slider Control-0001").setValue(10);
	q.name = "Drop Shadow Opacity";
	var Z = X.Effects.addProperty("ADBE Color Control");
	Z.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.dropLineChartColors.guideLinesColor));
	Z.name = "Guide Lines Color";
	var aH = X.Effects.addProperty("ADBE Color Control");
	aH.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	aH.name = "BG Color";
	var av = X.Effects.addProperty("ADBE Color Control");
	av.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.dropLineChartColors.titleColor));
	av.name = "Title Color";
	if (myData.selectedColumnsOf.length > 1) {
		var an = X.Effects.addProperty("ADBE Color Control");
		an.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.dropLineChartColors.titleColor));
		an.name = "Value Title Color";
	} else {
		var M = X.Effects.addProperty("ADBE Color Control");
		M.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.dropLineChartColors.titleBGColor));
		M.name = "Title BG Color";
	}
	aG.Effects.addProperty("ADBE Fill");
	aG.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	aG.shy = true;
	aG.locked = true;
	var ak = myData.dataTitle;
	if (ak.length > 70) {
		ak = ak.slice(0, 68) + "..";
	}
	var t = A.layers.addText("Hi");
	var ah = t.position;
	var h = t.opacity;
	var O = t.property("ADBE Text Properties").property("ADBE Text Document");
	var aK = O.value;
	aK.text = ak.toUpperCase();
	aK.fontSize = 30;
	aK.font = "Arial";
	aK.fillColor = ([1, 1, 1]);
	ah.setValue([147, 152, 0]);
	aK.tracking = 250;
	aK.justification = ParagraphJustification.LEFT_JUSTIFY;
	t.Effects.addProperty("ADBE Linear Wipe");
	t.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
	t.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(0, 95);
	t.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime((myData.settings.animDuration) * 0.5, 0);
	O.setValue(aK);
	t.shy = true;
	t.Effects.addProperty("ADBE Fill");
	t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	var x = 0;
	var p = 0;
	var aB = 336;
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (j = 0; j < H; j++) {
			p += parseFloat(myData.dataColumns[myData.selectedColumnsOf[i]].rows[j]);
		}
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < H; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > x) {
				x = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	var ay = (100 * x) / p;
	var c = A.layers.addShape();
	c.name = "Horizontal Lines";
	c.shy = true;
	var L = c.property("ADBE Root Vectors Group");
	var s = L;
	var K, y, D, aw;
	K = s.addProperty("ADBE Vector Shape - Group");
	K.name = "Shape Layer";
	y = K.property("ADBE Vector Shape");
	D = new Shape();
	D.vertices = [
		[0, aB],
		[0, aB]
	];
	D.inTangents = [
		[0, 0],
		[0, 0]
	];
	D.outTangents = [
		[0, 0],
		[0, 0]
	];
	D.closed = false;
	aw = new Shape();
	aw.vertices = [
		[-670, aB],
		[740, aB]
	];
	aw.inTangents = [
		[0, 0],
		[0, 0]
	];
	aw.outTangents = [
		[0, 0],
		[0, 0]
	];
	aw.closed = false;
	y.setValueAtTime(0, D);
	y.setValueAtTime(0.35 * (myData.settings.animDuration), aw);
	y.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var ao = s.addProperty("ADBE Vector Graphic - Stroke");
	ao.property("ADBE Vector Stroke Width").setValue(1);
	ao.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Lines Color')('ADBE Color Control-0001');";
	var ab = s.addProperty("ADBE Vector Filter - Repeater");
	ab.property("ADBE Vector Repeater Copies").expression = "v_interval=thisComp.layer('PARENT').effect('Vertical Interval')('ADBE Slider Control-0001'); if (v_interval > 0) linear(time,0," + (0.35 * myData.settings.animDuration) + ",0,v_interval) else 1;";
	ab.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0, 30);
	ab.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0.35 * (myData.settings.animDuration), 0);
	ab.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setTemporalEaseAtKey(2, [easeIn]);
	ab.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").expression = "copies = thisComp.layer('Horizontal Lines')('ADBE Root Vectors Group')('ADBE Vector Filter - Repeater')('ADBE Vector Repeater Copies'); if (copies != 0) [0,-480/copies] else [0,-480];";
	c.parent = X;
	c.locked = true;
	var aE = A.layers.addShape();
	aE.name = "Vertical Lines";
	aE.shy = true;
	var al = aE.property("ADBE Root Vectors Group");
	var W = al;
	var ax, E, au, ar;
	ax = W.addProperty("ADBE Vector Shape - Group");
	ax.name = "Shape Layer";
	E = ax.property("ADBE Vector Shape");
	au = new Shape();
	au.vertices = [
		[-569, aB],
		[-569, aB]
	];
	au.inTangents = [
		[0, 0],
		[0, 0]
	];
	au.outTangents = [
		[0, 0],
		[0, 0]
	];
	au.closed = false;
	ar = new Shape();
	ar.vertices = [
		[-569, aB],
		[-569, aB - 574]
	];
	ar.inTangents = [
		[0, 0],
		[0, 0]
	];
	ar.outTangents = [
		[0, 0],
		[0, 0]
	];
	ar.closed = false;
	E.setValueAtTime(0, au);
	E.setValueAtTime(0.35 * (myData.settings.animDuration), ar);
	E.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var w = W.addProperty("ADBE Vector Graphic - Stroke");
	w.property("ADBE Vector Stroke Width").setValue(1);
	w.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Lines Color')('ADBE Color Control-0001');";
	var v = W.addProperty("ADBE Vector Filter - Repeater");
	v.property("ADBE Vector Repeater Copies").expression = "h_interval=thisComp.layer('PARENT').effect('Horizontal Interval')('ADBE Slider Control-0001'); if (h_interval > 0) linear(time,0," + (0.35 * myData.settings.animDuration) + ",0,h_interval) else 1;";
	v.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0, -30);
	v.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0.35 * (myData.settings.animDuration), 0);
	v.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setTemporalEaseAtKey(2, [easeIn]);
	v.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").expression = "copies = thisComp.layer('Vertical Lines')('ADBE Root Vectors Group')('ADBE Vector Filter - Repeater')('ADBE Vector Repeater Copies'); if (copies != 0) [1250/copies,0] else [1250,0];";
	aE.parent = X;
	aE.locked = true;
	for (i = 0; i < 11; i++) {
		var am = "";
		am = (Math.round(((ay / 10) * i) * 10) / 10) + "%";
		var t = A.layers.addText(am);
		var ah = t.position;
		var aF = t.anchorPoint;
		var h = t.opacity;
		var aC = t.rotation;
		var P = t.scale;
		aF.setValue([0, -7]);
		var O = t.property("ADBE Text Properties").property("ADBE Text Document");
		var aK = O.value;
		aK.fontSize = 20;
		aK.font = "Arial";
		aK.fillColor = ([1, 1, 1]);
		ah.setValue([264, 540 + aB - 40 * i]);
		aK.tracking = 0;
		aK.justification = ParagraphJustification.RIGHT_JUSTIFY;
		O.setValue(aK);
		t.shy = true;
		t.Effects.addProperty("ADBE Fill");
		t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Interval Text Color')('ADBE Color Control-0001');";
		h.setValueAtTime(0.25 * (myData.settings.animDuration) + 0.02 * i, 0);
		h.setValueAtTime(0.5 * (myData.settings.animDuration) + 0.02 * i, 100);
		h.setTemporalEaseAtKey(2, [easeIn]);
		aC.setValueAtTime(0.25 * (myData.settings.animDuration) + 0.02 * i, 120);
		aC.setValueAtTime(0.5 * (myData.settings.animDuration) + 0.02 * i, 0);
		aC.setTemporalEaseAtKey(2, [easeIn]);
		P.setValueAtTime(0.25 * (myData.settings.animDuration) + 0.02 * i, [0, 0]);
		P.setValueAtTime(0.5 * (myData.settings.animDuration) + 0.02 * i, [100, 100]);
		P.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
		t.parent = X;
		t.locked = true;
	}
	var c = A.layers.addShape();
	c.name = "Data Name Line 1";
	c.shy = true;
	var L = c.property("ADBE Root Vectors Group");
	var s = L;
	var K, y, D, aw;
	K = s.addProperty("ADBE Vector Shape - Group");
	K.name = "Shape Layer";
	y = K.property("ADBE Vector Shape");
	D = new Shape();
	D.vertices = [
		[-670, aB + 24],
		[-670, aB + 24]
	];
	D.inTangents = [
		[0, 0],
		[0, 0]
	];
	D.outTangents = [
		[0, 0],
		[0, 0]
	];
	D.closed = false;
	aw = new Shape();
	aw.vertices = [
		[-670, aB + 24],
		[740, aB + 24]
	];
	aw.inTangents = [
		[0, 0],
		[0, 0]
	];
	aw.outTangents = [
		[0, 0],
		[0, 0]
	];
	aw.closed = false;
	y.setValueAtTime(0.25 * (myData.settings.animDuration), D);
	y.setValueAtTime(0.5 * (myData.settings.animDuration), aw);
	y.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var ao = s.addProperty("ADBE Vector Graphic - Stroke");
	ao.property("ADBE Vector Stroke Width").setValue(1);
	ao.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Data Name Line Color')('ADBE Color Control-0001');";
	c.parent = X;
	c.locked = true;
	var c = A.layers.addShape();
	c.name = "Data Name Line 2";
	c.shy = true;
	var L = c.property("ADBE Root Vectors Group");
	var s = L;
	var K, y, D, aw;
	K = s.addProperty("ADBE Vector Shape - Group");
	K.name = "Shape Layer";
	y = K.property("ADBE Vector Shape");
	D = new Shape();
	D.vertices = [
		[-670, aB + 54],
		[-670, aB + 54]
	];
	D.inTangents = [
		[0, 0],
		[0, 0]
	];
	D.outTangents = [
		[0, 0],
		[0, 0]
	];
	D.closed = false;
	aw = new Shape();
	aw.vertices = [
		[-670, aB + 54],
		[740, aB + 54]
	];
	aw.inTangents = [
		[0, 0],
		[0, 0]
	];
	aw.outTangents = [
		[0, 0],
		[0, 0]
	];
	aw.closed = false;
	y.setValueAtTime(0.25 * (myData.settings.animDuration), D);
	y.setValueAtTime(0.5 * (myData.settings.animDuration), aw);
	y.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var ao = s.addProperty("ADBE Vector Graphic - Stroke");
	ao.property("ADBE Vector Stroke Width").setValue(1);
	ao.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Data Name Line Color')('ADBE Color Control-0001');";
	c.parent = X;
	c.locked = true;
	var C = 20;
	var m = [
		[]
	];
	var ap = [
		[]
	];
	m[0] = [-670, 256];
	ap[0] = [-670, 256];
	for (k = 0; k < myData.selectedColumnsOf.length; k++) {
		var ae;
		if (myData.selectedColumnsOf.length > 1) {
			var ad = "Column #" + (k + 1);
			var ag = X.Effects.addProperty("ADBE Color Control");
			ae = hexToRgb(myData.chartColors.dropLineChartColors.alternateColors[k]);
			ag.property("ADBE Color Control-0001").setValue(ae);
			ag.name = ad;
		}
		for (i = 0; i < H; i++) {
			var aq = 0.4 * (myData.settings.animDuration) + ((0.6 * myData.settings.animDuration) / (2 * (H - 1))) * i + (k * 0.3);
			var aj = aq + 0.3 * (myData.settings.animDuration);
			var aA = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i])) / p;
			var U = 450 + (1150 / H) * i + k * 30;
			var z = aB - ((400 / ay) * aA);
			m[i] = [U - 960, z];
			ap[i] = [U - 960, aB];
			C = 5 + (15 / ay) * aA;
			C = Math.max(0.01, C);
			if (myData.selectedColumnsOf.length == 1) {
				var ad = "Data #" + (i + 1);
				var ag = X.Effects.addProperty("ADBE Color Control");
				ae = hexToRgb(myData.dataColors[i]);
				ag.property("ADBE Color Control-0001").setValue(ae);
				ag.name = ad;
			}
			if (k == 0) {
				var aJ = myData.dataNames[i];
				if (aJ.length >= 7) {
					aJ = aJ.slice(0, 7) + "..";
				}
				var t = A.layers.addText(aJ.toUpperCase());
				var ah = t.position;
				var h = t.opacity;
				var O = t.property("ADBE Text Properties").property("ADBE Text Document");
				var aK = O.value;
				aK.fontSize = 14;
				aK.font = "Arial";
				aK.fillColor = ([1, 1, 1]);
				aK.tracking = 0;
				aK.justification = ParagraphJustification.CENTER_JUSTIFY;
				O.setValue(aK);
				t.shy = true;
				t.Effects.addProperty("ADBE Fill");
				t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + ad + "')('ADBE Color Control-0001');";
				if (myData.selectedColumnsOf.length > 1) {
					t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
				}
				h.setValueAtTime(aq, 0);
				h.setValueAtTime(aj, 100);
				var S = 584 + aB;
				if (H > 9) {
					S = 584 + aB + (i % 2) * 30;
				}
				ah.setValue([U + (myData.selectedColumnsOf.length - 1) * 15, S]);
				t.locked = true;
			}
			var T = A.layers.addShape();
			T.name = "Points" + i.toString();
			T.shy = true;
			T.locked = true;
			var f = T.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
			var at = f.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
			var ai = at.size;
			var F = at.position;
			ai.setValueAtTime(aq, [0, 0]);
			ai.setValueAtTime(aj, [C, C]);
			ai.setTemporalEaseAtKey(2, [easeIn, easeIn]);
			F.setValueAtTime(aq, [U - 960, z + 30]);
			F.setValueAtTime(aj, [U - 960, z]);
			F.setTemporalEaseAtKey(2, [easeIn], [easeIn]);
			var ao = f.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
			var az = ao.property("ADBE Vector Fill Color");
			az.expression = "thisComp.layer('PARENT').effect('" + ad + "')('ADBE Color Control-0001');";
			var c = A.layers.addShape();
			c.name = "Drops " + i.toString();
			c.shy = true;
			var L = c.property("ADBE Root Vectors Group");
			var s = L;
			var K, y, D, aw;
			K = s.addProperty("ADBE Vector Shape - Group");
			K.name = "Shape Layer";
			y = K.property("ADBE Vector Shape");
			D = new Shape();
			D.vertices = [
				[U - 960, aB],
				[U - 960 - C * 0.5, z],
				[U - 960 + C * 0.5, z]
			];
			D.inTangents = [
				[0, 0],
				[0, 0],
				[0, 0]
			];
			D.outTangents = [
				[0, 0],
				[0, 0]
			];
			D.closed = true;
			aw = new Shape();
			aw.vertices = [
				[U - 960, aB],
				[U - 960, aB],
				[U - 960, aB]
			];
			aw.inTangents = [
				[0, 0],
				[0, 0],
				[0, 0]
			];
			aw.outTangents = [
				[0, 0],
				[0, 0]
			];
			aw.closed = true;
			y.setValueAtTime(aq, aw);
			y.setValueAtTime(aj, D);
			y.setTemporalEaseAtKey(2, [easeIn], [easeIn]);
			var ao = s.addProperty("ADBE Vector Graphic - Stroke");
			ao.property("ADBE Vector Stroke Width").setValue(1);
			ao.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('" + ad + "')('ADBE Color Control-0001');";
			var aL = s.addProperty("ADBE Vector Graphic - Fill");
			var af = aL.property("ADBE Vector Fill Color");
			af.expression = "thisComp.layer('PARENT').effect('" + ad + "')('ADBE Color Control-0001');";
			if (set == 0) {
				c.Effects.addProperty("ADBE Drop Shadow");
				c.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0002").expression = "thisComp.layer('PARENT').effect('Drop Shadow Opacity')('ADBE Slider Control-0001');";
				c.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0003").setValue(134);
				c.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0004").expression = "thisComp.layer('PARENT').effect('Drop Shadow Distance')('ADBE Slider Control-0001');";
				c.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0005").setValue(5);
			}
			c.parent = X;
			c.locked = true;
			var u = "";
			if (myData.settings.selectedLabel == "value") {
				u = "" + myData.dataColumns[myData.selectedColumnsOf[k]].rows[i];
			} else {
				u = "" + (Math.round(aA * 10) / 10) + "%";
			}
			var t = A.layers.addText(u);
			var ah = t.position;
			var h = t.opacity;
			var aa = t.anchorPoint;
			var O = t.property("ADBE Text Properties").property("ADBE Text Document");
			var aK = O.value;
			aK.fontSize = 12 + (8 / ay) * aA;
			aK.font = "Arial-Black";
			aK.fillColor = ([1, 1, 1]);
			aK.tracking = 0;
			aK.justification = ParagraphJustification.CENTER_JUSTIFY;
			O.setValue(aK);
			t.shy = true;
			aa.setValue([0, 20]);
			t.Effects.addProperty("ADBE Fill");
			t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + ad + "')('ADBE Color Control-0001');";
			h.setValueAtTime(aq, 0);
			h.setValueAtTime(aj, 100);
			ah.setValue([U, z + 540]);
		}
		var G = 147 + 30 * ak.length + 25;
		var n = 143 + 35 * k;
		if (myData.selectedColumnsOf.length > 1) {
			var e = A.layers.addSolid([1, 1, 1], "Column Box " + k, 60, 15, 1, R);
			e.Effects.addProperty("ADBE Fill");
			e.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + ad + "')('ADBE Color Control-0001');";
			var d = e.position;
			var o = e.scale;
			var Q = e.anchorPoint;
			Q.setValue([0, 0]);
			d.setValue([G, n - 10]);
			o.setValueAtTime(0, [0, 100]);
			o.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [100, 100]);
			o.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
			e.shy = true;
			e.locked = true;
		} else {
			var ac = myData.dataColumns[myData.selectedColumnsOf[0]].title;
			if (ac.length > 60) {
				ac = ac.slice(0, 58) + "..";
			}
			var V = 50 + 20 * (ac.length);
			var e = A.layers.addSolid([1, 1, 1], "Column Box " + k, V, 34, 1, R);
			e.Effects.addProperty("ADBE Fill");
			e.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
			var d = e.position;
			var o = e.scale;
			var Q = e.anchorPoint;
			Q.setValue([0, 0]);
			d.setValue([147, 178]);
			o.setValueAtTime(0, [0, 100]);
			o.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [100, 100]);
			o.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
			e.shy = true;
			e.locked = true;
		}
		var aI = myData.dataColumns[myData.selectedColumnsOf[k]].title;
		if (aI.length > 60) {
			aI = aI.slice(0, 58) + "..";
		}
		var t = A.layers.addText(aI.toUpperCase());
		var ah = t.position;
		var aF = t.anchorPoint;
		var h = t.opacity;
		aF.setValue([0, -7]);
		var O = t.property("ADBE Text Properties").property("ADBE Text Document");
		var aK = O.value;
		aK.font = "Arial-BoldMT";
		if (myData.selectedColumnsOf.length > 1) {
			aK.fontSize = 16;
			ah.setValueAtTime(0, [G - 30, n - 3]);
			ah.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [G + 70, n - 3]);
			ah.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
		} else {
			aK.fontSize = 18;
			ah.setValue([155, 195]);
		}
		aK.tracking = 100;
		aK.justification = ParagraphJustification.LEFT_JUSTIFY;
		O.setValue(aK);
		t.shy = true;
		t.Effects.addProperty("ADBE Fill");
		t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
		h.setValueAtTime(0, 0);
		h.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, 100);
		t.parent = X;
		t.locked = true;
	}
	A.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		A.openInViewer();
	}
	app.endUndoGroup();
}

function createPyramidChart() {
	var W = app.project;
	var J = 18;
	var N = myData.settings.compDuration;
	var E = Math.min(myData.dataNames.length, J);
	pyramidChartNumber++;
	app.beginUndoGroup("Create Pyramid Chart");
	var e = W.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Pyramid Chart - " + pyramidChartNumber + ")", 1920, 1080, 1, N, 25);
	var aD = e.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, N);
	var U = e.layers.addNull(N);
	U.name = "PARENT";
	U.position.setValue([960, 540]);
	var F = U.Effects.addProperty("ADBE Slider Control");
	F.property("ADBE Slider Control-0001").setValue(21);
	F.name = "Vertical Interval";
	var a = U.Effects.addProperty("ADBE Slider Control");
	a.property("ADBE Slider Control-0001").setValue(40);
	a.name = "Horizontal Interval";
	var aA = U.Effects.addProperty("ADBE Color Control");
	aA.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.pyramidChartColors.intervalTextColor));
	aA.name = "Interval Text Color";
	var X = U.Effects.addProperty("ADBE Color Control");
	X.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.pyramidChartColors.guideLinesColor));
	X.name = "Guide Lines Color";
	var aE = U.Effects.addProperty("ADBE Color Control");
	aE.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	aE.name = "BG Color";
	var aq = U.Effects.addProperty("ADBE Color Control");
	aq.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.pyramidChartColors.titleColor));
	aq.name = "Title Color";
	var I = U.Effects.addProperty("ADBE Color Control");
	I.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.pyramidChartColors.titleBGColor));
	I.name = "Title BG Color";
	aD.Effects.addProperty("ADBE Fill");
	aD.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	aD.shy = true;
	aD.locked = true;
	var aG = myData.dataTitle;
	if (aG.length > 70) {
		aG = aG.slice(0, 68) + "..";
	}
	var ab = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (ab.length > 60) {
		ab = ab.slice(0, 58) + "..";
	}
	var R = 50 + 20 * ab.length;
	var aF = e.layers.addSolid([1, 1, 1], "Title BG", R, 34, 1, N);
	aF.Effects.addProperty("ADBE Fill");
	aF.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var M = aF.position;
	var V = aF.scale;
	var aa = aF.anchorPoint;
	aa.setValue([0, 17]);
	M.setValue([147, 188]);
	V.setValueAtTime(0, [0, 100]);
	V.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	V.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
	aF.shy = true;
	aF.locked = true;
	for (i = 0; i < 2; i++) {
		var p = e.layers.addText("Hi");
		var af = p.position;
		var f = p.opacity;
		var K = p.property("ADBE Text Properties").property("ADBE Text Document");
		var aH = K.value;
		if (i == 0) {
			aH.text = aG.toUpperCase();
			aH.fontSize = 30;
			aH.font = "Arial";
			aH.fillColor = ([1, 1, 1]);
			af.setValue([147, 152, 0]);
			aH.tracking = 250;
			aH.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			aH.text = ab.toUpperCase();
			aH.fontSize = 20;
			aH.font = "Arial-Black";
			aH.fillColor = ([1, 1, 1]);
			af.setValue([155, 195, 0]);
			aH.tracking = 100;
			aH.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		p.Effects.addProperty("ADBE Linear Wipe");
		p.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		p.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		p.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		K.setValue(aH);
		p.shy = true;
		p.Effects.addProperty("ADBE Fill");
		p.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var ay = 336;
	var n = totalValue(0, J);
	var x = 0;
	for (i = 0; i < E; i++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) > x) {
			x = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		}
	}
	var au = (100 * x) / n;
	var c = e.layers.addShape();
	c.name = "Horizontal Lines";
	c.shy = true;
	var H = c.property("ADBE Root Vectors Group");
	var o = H;
	var G, y, B, ar;
	G = o.addProperty("ADBE Vector Shape - Group");
	G.name = "Shape Layer";
	y = G.property("ADBE Vector Shape");
	B = new Shape();
	B.vertices = [
		[0, ay],
		[0, ay]
	];
	B.inTangents = [
		[0, 0],
		[0, 0]
	];
	B.outTangents = [
		[0, 0],
		[0, 0]
	];
	B.closed = false;
	ar = new Shape();
	ar.vertices = [
		[-670, ay],
		[670, ay]
	];
	ar.inTangents = [
		[0, 0],
		[0, 0]
	];
	ar.outTangents = [
		[0, 0],
		[0, 0]
	];
	ar.closed = false;
	y.setValueAtTime(0, B);
	y.setValueAtTime(0.35 * (myData.settings.animDuration), ar);
	y.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var ak = o.addProperty("ADBE Vector Graphic - Stroke");
	ak.property("ADBE Vector Stroke Width").setValue(1);
	ak.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Lines Color')('ADBE Color Control-0001');";
	var Z = o.addProperty("ADBE Vector Filter - Repeater");
	Z.property("ADBE Vector Repeater Copies").expression = "v_interval=thisComp.layer('PARENT').effect('Vertical Interval')('ADBE Slider Control-0001'); if (v_interval > 0) linear(time,0," + (0.35 * (myData.settings.animDuration)) + ",0,v_interval) else 1;";
	Z.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0, 30);
	Z.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0.35 * (myData.settings.animDuration), 0);
	Z.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setTemporalEaseAtKey(2, [easeIn]);
	Z.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").expression = "copies = thisComp.layer('Horizontal Lines')('ADBE Root Vectors Group')('ADBE Vector Filter - Repeater')('ADBE Vector Repeater Copies'); if (copies != 0) [0,-480/copies] else [0,-480];";
	c.parent = U;
	c.locked = true;
	var aB = e.layers.addShape();
	aB.name = "Vertical Lines";
	aB.shy = true;
	var ai = aB.property("ADBE Root Vectors Group");
	var T = ai;
	var at, C, ap, an;
	at = T.addProperty("ADBE Vector Shape - Group");
	at.name = "Shape Layer";
	C = at.property("ADBE Vector Shape");
	ap = new Shape();
	ap.vertices = [
		[-569, ay],
		[-569, ay]
	];
	ap.inTangents = [
		[0, 0],
		[0, 0]
	];
	ap.outTangents = [
		[0, 0],
		[0, 0]
	];
	ap.closed = false;
	an = new Shape();
	an.vertices = [
		[-569, ay],
		[-569, ay - 574]
	];
	an.inTangents = [
		[0, 0],
		[0, 0]
	];
	an.outTangents = [
		[0, 0],
		[0, 0]
	];
	an.closed = false;
	C.setValueAtTime(0, ap);
	C.setValueAtTime(0.35 * (myData.settings.animDuration), an);
	C.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var w = T.addProperty("ADBE Vector Graphic - Stroke");
	w.property("ADBE Vector Stroke Width").setValue(1);
	w.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Lines Color')('ADBE Color Control-0001');";
	var t = T.addProperty("ADBE Vector Filter - Repeater");
	t.property("ADBE Vector Repeater Copies").expression = "h_interval=thisComp.layer('PARENT').effect('Horizontal Interval')('ADBE Slider Control-0001'); if (h_interval > 0) linear(time,0," + (0.35 * (myData.settings.animDuration)) + ",0,h_interval) else 1;";
	t.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0, -30);
	t.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValueAtTime(0.35 * (myData.settings.animDuration), 0);
	t.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setTemporalEaseAtKey(2, [easeIn]);
	t.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Position").expression = "copies = thisComp.layer('Vertical Lines')('ADBE Root Vectors Group')('ADBE Vector Filter - Repeater')('ADBE Vector Repeater Copies'); if (copies != 0) [1150/copies,0] else [1150,0];";
	aB.parent = U;
	aB.locked = true;
	for (i = 0; i < 11; i++) {
		var aj = "";
		aj = (Math.round(((au / 10) * i) * 10) / 10) + "%";
		var p = e.layers.addText(aj);
		var af = p.position;
		var aC = p.anchorPoint;
		var f = p.opacity;
		var az = p.rotation;
		var L = p.scale;
		aC.setValue([0, -7]);
		var K = p.property("ADBE Text Properties").property("ADBE Text Document");
		var aH = K.value;
		aH.fontSize = 20;
		aH.font = "Arial";
		aH.fillColor = ([1, 1, 1]);
		af.setValue([264, 540 + ay - 40 * i]);
		aH.tracking = 0;
		aH.justification = ParagraphJustification.RIGHT_JUSTIFY;
		K.setValue(aH);
		p.shy = true;
		p.Effects.addProperty("ADBE Fill");
		p.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Interval Text Color')('ADBE Color Control-0001');";
		f.setValueAtTime(0.25 * (myData.settings.animDuration) + 0.02 * i, 0);
		f.setValueAtTime(0.5 * (myData.settings.animDuration) + 0.02 * i, 100);
		f.setTemporalEaseAtKey(2, [easeIn]);
		az.setValueAtTime(0.25 * (myData.settings.animDuration) + 0.02 * i, 120);
		az.setValueAtTime(0.5 * (myData.settings.animDuration) + 0.02 * i, 0);
		az.setTemporalEaseAtKey(2, [easeIn]);
		L.setValueAtTime(0.25 * (myData.settings.animDuration) + 0.02 * i, [0, 0]);
		L.setValueAtTime(0.5 * (myData.settings.animDuration) + 0.02 * i, [100, 100]);
		L.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
		p.parent = U;
		p.locked = true;
	}
	var A = 20;
	var h = [
		[]
	];
	var al = [
		[]
	];
	h[0] = [-670, ay];
	al[0] = [-670, ay];
	for (i = 0; i < E; i++) {
		var am = 0.3 * (myData.settings.animDuration) + ((0.7 * myData.settings.animDuration) / (2 * (E - 1))) * i;
		var ah = am + 0.35 * (myData.settings.animDuration);
		var ax = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / n;
		var Q = 450 + (1150 / E) * i;
		var v = 450 + (1150 / E) * (i - 1);
		var S = 450 + (1150 / E) * (i + 1);
		var z = ay - ((400 / au) * ax);
		h[i] = [Q - 960, z];
		al[i] = [Q - 960, ay];
		A = 10 + (10 / au) * ax;
		var ac = "Data #" + (i + 1);
		var ae = U.Effects.addProperty("ADBE Color Control");
		ae.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		ae.name = ac;
		var aG = myData.dataNames[i];
		if (aG.length >= 13) {
			aG = aG.slice(0, 13) + "...";
		}
		var p = e.layers.addText(aG.toUpperCase());
		var af = p.position;
		var f = p.opacity;
		var K = p.property("ADBE Text Properties").property("ADBE Text Document");
		var aH = K.value;
		aH.fontSize = 14;
		aH.font = "Arial";
		aH.fillColor = ([1, 1, 1]);
		aH.tracking = 0;
		aH.justification = ParagraphJustification.CENTER_JUSTIFY;
		K.setValue(aH);
		p.shy = true;
		p.Effects.addProperty("ADBE Fill");
		p.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + ac + "')('ADBE Color Control-0001');";
		f.setValueAtTime(am, 0);
		f.setValueAtTime(ah, 100);
		var O = ay + 584;
		if (E > 9) {
			O = ay + 584 + (i % 2) * 30;
		}
		af.setValue([Q, O]);
		p.locked = true;
		var P = e.layers.addShape();
		P.name = "Points" + i.toString();
		P.shy = true;
		P.locked = true;
		var d = P.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var ao = d.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var ag = ao.size;
		var D = ao.position;
		ag.setValueAtTime(am, [0, 0]);
		ag.setValueAtTime(ah, [A, A]);
		ag.setTemporalEaseAtKey(2, [easeIn, easeIn]);
		D.setValueAtTime(am, [Q - 960, z + 30]);
		D.setValueAtTime(ah, [Q - 960, z]);
		D.setTemporalEaseAtKey(2, [easeIn], [easeIn]);
		var ak = d.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var aw = ak.property("ADBE Vector Fill Color");
		aw.expression = "thisComp.layer('PARENT').effect('" + ac + "')('ADBE Color Control-0001');";
		var c = e.layers.addShape();
		c.name = "Drops " + i.toString();
		c.shy = true;
		var s = c.opacity;
		s.setValue(10);
		var H = c.property("ADBE Root Vectors Group");
		var o = H;
		var G, y, B, ar;
		G = o.addProperty("ADBE Vector Shape - Group");
		G.name = "Shape Layer";
		y = G.property("ADBE Vector Shape");
		B = new Shape();
		B.vertices = [
			[v - 960, ay],
			[Q - 960, z],
			[S - 960, ay]
		];
		B.inTangents = [
			[0, 0],
			[0, 0],
			[0, 0]
		];
		B.outTangents = [
			[0, 0],
			[0, 0]
		];
		B.closed = true;
		ar = new Shape();
		ar.vertices = [
			[v - 960, ay],
			[Q - 960, ay],
			[S - 960, ay]
		];
		ar.inTangents = [
			[0, 0],
			[0, 0],
			[0, 0]
		];
		ar.outTangents = [
			[0, 0],
			[0, 0]
		];
		ar.closed = true;
		y.setValueAtTime(am, ar);
		y.setValueAtTime(ah, B);
		y.setTemporalEaseAtKey(2, [easeIn], [easeIn]);
		var ak = o.addProperty("ADBE Vector Graphic - Stroke");
		ak.property("ADBE Vector Stroke Width").setValue(1);
		ak.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('" + ac + "')('ADBE Color Control-0001');";
		var aI = o.addProperty("ADBE Vector Graphic - Fill");
		var ad = aI.property("ADBE Vector Fill Color");
		ad.expression = "thisComp.layer('PARENT').effect('" + ac + "')('ADBE Color Control-0001');";
		c.parent = U;
		c.locked = true;
		var av = c.duplicate();
		var u = av.scale;
		var m = av.anchorPoint;
		m.setValue([0, -2 * ay]);
		u.setValue([100, 33]);
		var q = "";
		if (myData.settings.selectedLabel == "value") {
			q = "" + myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		} else {
			q = "" + (Math.round(ax * 10) / 10) + "%";
		}
		var p = e.layers.addText(q);
		var af = p.position;
		var f = p.opacity;
		var Y = p.anchorPoint;
		var K = p.property("ADBE Text Properties").property("ADBE Text Document");
		var aH = K.value;
		aH.fontSize = 12 + (8 / au) * ax;
		aH.font = "Arial-Black";
		aH.fillColor = ([1, 1, 1]);
		aH.tracking = 0;
		aH.justification = ParagraphJustification.CENTER_JUSTIFY;
		K.setValue(aH);
		p.shy = true;
		Y.setValue([0, 20]);
		p.Effects.addProperty("ADBE Fill");
		p.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + ac + "')('ADBE Color Control-0001');";
		f.setValueAtTime(am, 0);
		f.setValueAtTime(ah, 100);
		af.setValue([Q, z + 540]);
	}
	e.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		e.openInViewer();
	}
	app.endUndoGroup();
}

function createRoundChart() {
	var q = app.project;
	var C = 6;
	var F = myData.settings.compDuration;
	var t = Math.min(myData.dataNames.length, C);
	roundChartNumber++;
	app.beginUndoGroup("Create Round Chart");
	var S = q.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Round Chart - " + roundChartNumber + ")", 1920, 1080, 1, F, 25);
	var B = S.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, F);
	var Y = S.layers.addNull(F);
	Y.name = "PARENT";
	Y.position.setValue([960, 540]);
	var T = Y.Effects.addProperty("ADBE Slider Control");
	T.property("ADBE Slider Control-0001").setValue(25);
	T.name = "Drop Shadow Opacity";
	var K = Y.Effects.addProperty("ADBE Color Control");
	K.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.roundChartColors.percentageTextColor));
	K.name = "Percentage Text Color";
	var a = Y.Effects.addProperty("ADBE Color Control");
	a.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.roundChartColors.valueTitleColor));
	a.name = "Value Title Color";
	var X = Y.Effects.addProperty("ADBE Color Control");
	X.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.roundChartColors.ringColor));
	X.name = "Ring Color";
	var P = Y.Effects.addProperty("ADBE Slider Control");
	if (set == 0) {
		P.property("ADBE Slider Control-0001").setValue(10);
	} else {
		P.property("ADBE Slider Control-0001").setValue(35);
	}
	P.name = "BG Circle Opacity";
	var v = Y.Effects.addProperty("ADBE Color Control");
	v.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	v.name = "BG Color";
	var U = Y.Effects.addProperty("ADBE Color Control");
	U.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.roundChartColors.titleColor));
	U.name = "Title Color";
	var ab = Y.Effects.addProperty("ADBE Color Control");
	ab.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.roundChartColors.titleBGColor));
	ab.name = "Title BG Color";
	B.Effects.addProperty("ADBE Fill");
	B.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	B.shy = true;
	B.locked = true;
	var M = myData.dataTitle;
	if (M.length > 70) {
		M = M.slice(0, 68) + "..";
	}
	var c = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (c.length > 60) {
		c = c.slice(0, 58) + "..";
	}
	var e = 50 + 20 * c.length;
	var f = S.layers.addSolid([1, 1, 1], "Title BG", e, 34, 1, F);
	f.Effects.addProperty("ADBE Fill");
	f.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var x = f.position;
	var G = f.scale;
	var ad = f.anchorPoint;
	ad.setValue([0, 17]);
	x.setValue([147, 188]);
	G.setValueAtTime(0, [0, 100]);
	G.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	G.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
	f.shy = true;
	f.locked = true;
	for (i = 0; i < 2; i++) {
		var I = S.layers.addText("Hi");
		var p = I.position;
		var A = I.opacity;
		var z = I.property("ADBE Text Properties").property("ADBE Text Document");
		var J = z.value;
		if (i == 0) {
			J.text = M.toUpperCase();
			J.fontSize = 30;
			J.font = "Arial";
			J.fillColor = ([1, 1, 1]);
			p.setValue([147, 152, 0]);
			J.tracking = 250;
			J.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			J.text = c.toUpperCase();
			J.fontSize = 20;
			J.font = "Arial-Black";
			J.fillColor = ([1, 1, 1]);
			p.setValue([155, 195, 0]);
			J.tracking = 100;
			J.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		I.Effects.addProperty("ADBE Linear Wipe");
		I.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		I.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		I.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		z.setValue(J);
		I.shy = true;
		I.Effects.addProperty("ADBE Fill");
		I.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var L = totalValue(0, C);
	var D = 0;
	for (i = 0; i < t; i++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) > D) {
			D = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		}
	}
	var s = (100 * D) / L;
	var V = 4 * 1370 / (5 * (t) - 1);
	for (i = 0; i < t; i++) {
		var O = ((myData.settings.animDuration) / (2 * (t - 1))) * i;
		var af = O + 0.5 * (myData.settings.animDuration);
		var m = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / L;
		var Q = -685 + V * 0.5 + V * 1.25 * i;
		var d = "Data #" + (i + 1);
		var H = Y.Effects.addProperty("ADBE Color Control");
		H.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		H.name = d;
		var n = S.layers.addShape();
		n.name = "bgCircles " + i.toString();
		n.shy = true;
		n.locked = true;
		var R = n.opacity;
		R.expression = "t=thisComp.layer('PARENT').effect('BG Circle Opacity')('ADBE Slider Control-0001'); linear(t,0,100,0,100);";
		var W = n.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var ae = W.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var w = ae.size;
		var aa = ae.position;
		w.setValueAtTime(O, [0, 0]);
		w.setValueAtTime(af, [V, V]);
		w.setTemporalEaseAtKey(2, [easeIn, easeIn]);
		aa.setValue([Q, 0]);
		var o = W.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var E = o.property("ADBE Vector Fill Color");
		E.expression = "thisComp.layer('PARENT').effect('" + d + "')('ADBE Color Control-0001');";
		var y = S.layers.addShape();
		y.name = "Rings " + i.toString();
		y.shy = true;
		y.locked = true;
		var N = y.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
		var ae = N.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var w = ae.size;
		var aa = ae.position;
		w.setValue([V * 0.9, V * 0.9]);
		aa.setValue([Q, 0]);
		var o = N.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
		var E = o.property("ADBE Vector Stroke Color");
		E.expression = "thisComp.layer('PARENT').effect('Ring Color')('ADBE Color Control-0001');";
		o.property("ADBE Vector Stroke Width").setValue(V * 0.04);
		var h = y.property("ADBE Root Vectors Group").addProperty("ADBE Vector Filter - Trim");
		h.property("ADBE Vector Trim End").setValueAtTime(O, 0);
		h.property("ADBE Vector Trim End").setValueAtTime(af, m);
		h.property("ADBE Vector Trim End").setTemporalEaseAtKey(2, [easeIn]);
		y.Effects.addProperty("ADBE Drop Shadow");
		y.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0002").expression = "thisComp.layer('PARENT').effect('Drop Shadow Opacity')('ADBE Slider Control-0001');";
		y.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0003").setValue(156);
		y.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0004").setValue(V * 0.1);
		y.property("ADBE Effect Parade").property("ADBE Drop Shadow").property("ADBE Drop Shadow-0005").setValue(0);
		var I = S.layers.addText("Hi");
		var p = I.position;
		var A = I.opacity;
		var u = I.anchorPoint;
		var z = I.property("ADBE Text Properties").property("ADBE Text Document");
		var J = z.value;
		J.fontSize = V * 0.28;
		J.font = "Arial";
		J.fillColor = ([1, 1, 1]);
		J.tracking = 0;
		J.justification = ParagraphJustification.CENTER_JUSTIFY;
		z.setValue(J);
		I.shy = true;
		u.setValue([0, -V * 0.14 * 2 / 7]);
		I.Effects.addProperty("ADBE Fill");
		I.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Percentage Text Color')('ADBE Color Control-0001');";
		A.setValueAtTime(O, 0);
		A.setValueAtTime(af, 100);
		p.setValue([Q + 960, 540]);
		var ac = I.property("ADBE Text Properties").property("ADBE Text Document");
		ac.expression = "timeA = " + O + ";  timeB = " + af + ";  Math.round(linear(time, timeA,timeB, 0, " + m + "))+'%';";
		var M = myData.dataNames[i].toUpperCase();
		if (M.length >= 11) {
			M = M.slice(0, 11) + "...";
		}
		var I = S.layers.addText(M);
		var p = I.position;
		var A = I.opacity;
		var u = I.anchorPoint;
		var Z = I.scale;
		var z = I.property("ADBE Text Properties").property("ADBE Text Document");
		var J = z.value;
		J.fontSize = V * 0.074;
		J.font = "Arial";
		J.fillColor = ([1, 1, 1]);
		J.tracking = 100;
		J.justification = ParagraphJustification.CENTER_JUSTIFY;
		z.setValue(J);
		I.shy = true;
		u.setValue([0, -V * 0.074 * 2.1]);
		I.Effects.addProperty("ADBE Fill");
		I.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
		A.setValueAtTime(O, 0);
		A.setValueAtTime(af, 100);
		Z.setValueAtTime(O, [0, 0]);
		Z.setValueAtTime(af, [100, 100]);
		Z.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
		p.setValue([Q + 960, 540]);
	}
	S.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		S.openInViewer();
	}
	app.endUndoGroup();
}

function createSliderChart() {
	var G = 5;
	var x = Math.min(myData.dataNames.length, G);
	var M = myData.settings.compDuration;
	var c = 45;
	pointerCompNumber++;
	var e = new KeyframeEase(0, 95);
	var aa = new KeyframeEase(0, 10);
	app.beginUndoGroup("Create Slider Chart");
	var f = app.project.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Slider Chart - " + pointerCompNumber + ")", 1920, 1080, 1, M, 25);
	var F = f.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, M);
	F.Effects.addProperty("ADBE Fill");
	F.shy = true;
	F.locked = true;
	var h = f.layers.addNull();
	h.name = "PARENT";
	if (set == 0) {
		var ac = h.Effects.addProperty("ADBE Checkbox Control");
		ac.name = "Glows ON/OFF";
	}
	var p = h.Effects.addProperty("ADBE Checkbox Control");
	p.name = "Gradient ON/OFF";
	var y = h.Effects.addProperty("ADBE Color Control");
	y.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	y.name = "BG Color";
	var S = h.Effects.addProperty("ADBE Color Control");
	S.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.sliderChartColors.bgColorDark));
	S.name = "BG Color Dark (Gradient)";
	var Y = h.Effects.addProperty("ADBE Color Control");
	Y.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.sliderChartColors.lineBarColor));
	Y.name = "Line Bar Color";
	var I = h.Effects.addProperty("ADBE Color Control");
	I.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.sliderChartColors.titleBGColor));
	I.name = "Title BG Color";
	var J = h.Effects.addProperty("ADBE Color Control");
	J.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.sliderChartColors.titleColor));
	J.name = "Title Color";
	var K = h.Effects.addProperty("ADBE Color Control");
	K.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.sliderChartColors.dataValueColor));
	K.name = "Data Value Color";
	var ag = F.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002");
	ag.expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001')";
	F.Effects.addProperty("ADBE Ramp");
	F.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0001").setValue([960, 324]);
	F.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0003").setValue([960, 1692]);
	F.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	F.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0004").expression = "thisComp.layer('PARENT').effect('BG Color Dark (Gradient)')('ADBE Color Control-0001');";
	F.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0007").expression = "100-100*thisComp.layer('PARENT').effect('Gradient ON/OFF')('ADBE Checkbox Control-0001');";
	var T = totalValue(0, G);
	var U = myData.dataTitle;
	if (U.length > 70) {
		U = U.slice(0, 68) + "..";
	}
	var d = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (d.length > 60) {
		d = d.slice(0, 58) + "..";
	}
	var m = 50 + 20 * d.length;
	var o = f.layers.addSolid([1, 1, 1], "Title BG", m, 34, 1, M);
	o.Effects.addProperty("ADBE Fill");
	o.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var A = o.position;
	var O = o.scale;
	var ah = o.anchorPoint;
	ah.setValue([0, 17]);
	A.setValue([147, 188]);
	O.setValueAtTime(0, [0, 100]);
	O.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	O.setTemporalEaseAtKey(2, [e, e, e], [aa, aa, aa]);
	o.shy = true;
	o.locked = true;
	for (i = 0; i < 2; i++) {
		var Q = f.layers.addText("Hi");
		var v = Q.position;
		var D = Q.opacity;
		var C = Q.property("ADBE Text Properties").property("ADBE Text Document");
		var R = C.value;
		if (i == 0) {
			R.text = U.toUpperCase();
			R.fontSize = 30;
			R.font = "Arial";
			R.fillColor = ([1, 1, 1]);
			v.setValue([147, 152, 0]);
			R.tracking = 250;
			R.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			R.text = d.toUpperCase();
			R.fontSize = 20;
			R.font = "Arial-Black";
			R.fillColor = ([1, 1, 1]);
			v.setValue([155, 195, 0]);
			R.tracking = 100;
			R.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		Q.Effects.addProperty("ADBE Linear Wipe");
		Q.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		Q.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		Q.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		C.setValue(R);
		Q.shy = true;
		Q.Effects.addProperty("ADBE Fill");
		Q.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var H = 0;
	for (i = 0; i < x; i++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) > H) {
			H = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		}
	}
	for (i = 0; i < x; i++) {
		var q = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / T;
		var ae = 80;
		var af = (5 - x) * ae;
		var z = (1628 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / (H);
		var w = 814 - z;
		var V = ((myData.settings.animDuration) / (2 * (x - 1))) * i;
		var ak = V + 0.5 * (myData.settings.animDuration);
		var N = "Data #" + (i + 1);
		var P = h.Effects.addProperty("ADBE Color Control");
		P.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		P.name = N;
		var a = f.layers.addShape();
		a.name = "BG Line ShapeLayer";
		var ad = a.property("ADBE Root Vectors Group");
		var B = ad;
		var X, t, aj;
		X = B.addProperty("ADBE Vector Shape - Group");
		X.name = "Shape Layer";
		t = X.property("ADBE Vector Shape");
		aj = new Shape();
		aj.vertices = [
			[-813, af + (ae * i)],
			[813, af + (ae * i)]
		];
		aj.inTangents = [
			[0, 0],
			[0, 0]
		];
		aj.outTangents = [
			[0, 0],
			[0, 0]
		];
		aj.closed = false;
		n = new Shape();
		n.vertices = [
			[-813, af + (ae * i)],
			[-813, af + (ae * i)]
		];
		n.inTangents = [
			[0, 0],
			[0, 0]
		];
		n.outTangents = [
			[0, 0],
			[0, 0]
		];
		n.closed = false;
		t.setValueAtTime(V, n);
		t.setValueAtTime(ak, aj);
		t.setTemporalEaseAtKey(2, [e], [aa]);
		var u = B.addProperty("ADBE Vector Graphic - Stroke");
		u.property("ADBE Vector Stroke Width").setValue(10);
		u.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Line Bar Color')('ADBE Color Control-0001')";
		u.property("ADBE Vector Stroke Line Cap").setValue(2);
		a.shy = true;
		a.locked = true;
		var a = f.layers.addShape();
		a.name = "Actual Line ShapeLayer";
		var ad = a.property("ADBE Root Vectors Group");
		var B = ad;
		var X, t, aj;
		X = B.addProperty("ADBE Vector Shape - Group");
		X.name = "Shape Layer";
		t = X.property("ADBE Vector Shape");
		aj = new Shape();
		aj.vertices = [
			[-813, af + (ae * i)],
			[(-813 + z), af + (ae * i)]
		];
		aj.inTangents = [
			[0, 0],
			[0, 0]
		];
		aj.outTangents = [
			[0, 0],
			[0, 0]
		];
		aj.closed = false;
		t.setValue(aj);
		var n = new Shape();
		n.vertices = [
			[-813, af + (ae * i)],
			[-813, af + (ae * i)]
		];
		n.inTangents = [
			[0, 0],
			[0, 0]
		];
		n.outTangents = [
			[0, 0],
			[0, 0]
		];
		n.closed = false;
		t.setValue(n);
		t.setValueAtTime(V, n);
		t.setValueAtTime(ak, aj);
		t.setTemporalEaseAtKey(2, [e], [aa]);
		var u = B.addProperty("ADBE Vector Graphic - Stroke");
		u.property("ADBE Vector Stroke Width").setValue(10);
		u.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('" + N + "')('ADBE Color Control-0001');";
		u.property("ADBE Vector Stroke Line Cap").setValue(2);
		if (set == 0) {
			a.Effects.addProperty("ADBE Glo2");
			var ai = a.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0002");
			ai.expression = "0";
			var W = a.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0003");
			W.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*56;";
			var L = a.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0004");
			L.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*0.3;";
		}
		a.shy = true;
		a.locked = true;
		var a = f.layers.addShape();
		a.name = "Pointer ShapeLayer";
		var ad = a.property("ADBE Root Vectors Group");
		var B = ad;
		var X, t, aj;
		X = B.addProperty("ADBE Vector Shape - Group");
		X.name = "Shape Layer";
		t = X.property("ADBE Vector Shape");
		aj = new Shape();
		aj.vertices = [
			[-814, ae * i + af - 15],
			[-814, ae * i + af - 35],
			[-814, ae * i + af - 74],
			[-814, ae * i + af - 74],
			[-814, ae * i + af - 35]
		];
		aj.inTangents = [
			[0, 0],
			[0, 0]
		];
		aj.outTangents = [
			[0, 0],
			[0, 0]
		];
		aj.closed = true;
		shapePathData1 = new Shape();
		shapePathData1.vertices = [
			[-814, ae * i + af - 15],
			[18 - 814, ae * i + af - 35],
			[18 - 814, ae * i + af - 54],
			[-18 - 814, ae * i + af - 54],
			[-18 - 755, ae * i + af - 35]
		];
		shapePathData1.inTangents = [
			[0, 0],
			[0, 0]
		];
		shapePathData1.outTangents = [
			[0, 0],
			[0, 0]
		];
		shapePathData1.closed = true;
		n = new Shape();
		n.vertices = [
			[0 - w, ae * i + af - 15],
			[18 - w, ae * i + af - 35],
			[18 - w, ae * i + af - 54],
			[-18 - w, ae * i + af - 54],
			[-18 - w, ae * i + af - 35]
		];
		n.inTangents = [
			[0, 0],
			[0, 0]
		];
		n.outTangents = [
			[0, 0],
			[0, 0]
		];
		n.closed = true;
		t.setValueAtTime(V, aj);
		t.setValueAtTime(ak, n);
		t.setTemporalEaseAtKey(2, [e], [aa]);
		var u = B.addProperty("ADBE Vector Graphic - Stroke");
		u.property("ADBE Vector Stroke Width").setValue(0);
		var Z = B.addProperty("ADBE Vector Graphic - Fill");
		Z.property("ADBE Vector Fill Color").expression = "thisComp.layer('PARENT').effect('" + N + "')('ADBE Color Control-0001');";
		if (set == 0) {
			a.Effects.addProperty("ADBE Glo2");
			var ai = a.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0002");
			ai.expression = "0";
			var W = a.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0003");
			W.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*56;";
			var L = a.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0004");
			L.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*0.3;";
		}
		a.shy = true;
		a.locked = true;
		var U = myData.dataNames[i];
		if (U.length >= 13) {
			U = U.slice(0, 13) + "...";
		}
		var Q = f.layers.addText(U.toUpperCase());
		var v = Q.position;
		var D = Q.opacity;
		var C = Q.property("ADBE Text Properties").property("ADBE Text Document");
		var R = C.value;
		R.fontSize = 22;
		R.font = "Arial-Black";
		R.fillColor = hexToRgb(myData.dataColors[i]);
		R.justification = ParagraphJustification.RIGHT_JUSTIFY;
		C.setValue(R);
		Q.Effects.addProperty("ADBE Fill");
		Q.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + N + "')('ADBE Color Control-0001');";
		Q.shy = true;
		v.setValueAtTime(V, [915 - 755, i * ae + af + 510]);
		v.setValueAtTime(ak, [915 - w, i * ae + af + 510]);
		v.setTemporalEaseAtKey(2, [e], [aa]);
		D.setValueAtTime(V, 0);
		D.setValueAtTime(ak, 100);
		D.setTemporalEaseAtKey(2, [e], [aa]);
		var s = 0;
		if (myData.settings.selectedLabel == "percentage") {
			s = q / (myData.settings.animDuration);
		} else {
			s = parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) / (myData.settings.animDuration);
		}
		var E = "timeToStart =" + V + "; \r timeToStop =" + ak + ";\r if ((time >= timeToStart) && (time < timeToStop)){ \r Math.round((time-timeToStart)*" + (s * 2) + "); } else {text.sourceText}";
		var ab = "";
		if (myData.settings.selectedLabel == "value") {
			ab = "" + myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		} else {
			ab = "" + (Math.round(q * 10) / 10) + "%";
		}
		var Q = f.layers.addText(ab);
		var v = Q.position;
		var D = Q.opacity;
		var C = Q.property("ADBE Text Properties").property("ADBE Text Document");
		var R = C.value;
		R.fontSize = 22;
		R.font = "Arial-Black";
		R.fillColor = [0.5, 0.5, 0.5];
		R.justification = ParagraphJustification.LEFT_JUSTIFY;
		C.setValue(R);
		C.expression = E;
		Q.Effects.addProperty("ADBE Fill");
		Q.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Data Value Color')('ADBE Color Control-0001');";
		Q.shy = true;
		v.setValueAtTime(V, [205, i * ae + af + 508]);
		v.setValueAtTime(ak, [1000 - w, i * ae + af + 508]);
		v.setTemporalEaseAtKey(2, [e], [aa]);
		D.setValueAtTime(V, 0);
		D.setValueAtTime(ak, 100);
		D.setTemporalEaseAtKey(2, [e], [aa]);
	}
	f.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		f.openInViewer();
	}
	app.endUndoGroup();
}

function createCircularChart() {
	var P = 18;
	var A = app.project;
	var D = Math.min(myData.dataNames.length, P);
	var Q = myData.settings.compDuration;
	circularBarCompNumber++;
	app.beginUndoGroup("Create Circular Chart");
	var aj = A.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Circular Chart - " + circularBarCompNumber + ")", 1920, 1080, 1, Q, 25);
	var N = aj.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, Q);
	var af = aj.layers.addNull(Q);
	af.name = "PARENT";
	af.position.setValue([960, 540]);
	var ai = af.Effects.addProperty("ADBE Slider Control");
	ai.name = "Radius";
	ai.property("ADBE Slider Control-0001").expression = "if (effect('Radius')('ADBE Slider Control-0001') > 23) {23} else if (effect('Radius')('ADBE Slider Control-0001') < -60) {-60} else {effect('Radius')('ADBE Slider Control-0001')}";
	var s = af.Effects.addProperty("ADBE Slider Control");
	s.name = "X Position";
	var n = af.Effects.addProperty("ADBE Slider Control");
	n.name = "Y Position";
	var E = af.Effects.addProperty("ADBE Color Control");
	E.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	E.name = "BG Color";
	var ac = af.Effects.addProperty("ADBE Color Control");
	ac.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.circularChartColors.titleColor));
	ac.name = "Title Color";
	var ah = af.Effects.addProperty("ADBE Color Control");
	ah.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.circularChartColors.titleBGColor));
	ah.name = "Title BG Color";
	var v = af.Effects.addProperty("ADBE Color Control");
	v.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.circularChartColors.valueTextColor));
	v.name = "Value Text Color";
	var L = af.Effects.addProperty("ADBE Color Control");
	L.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.circularChartColors.littleCirclesColor));
	L.name = "Little Circles Color";
	N.Effects.addProperty("ADBE Fill");
	N.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	N.shy = true;
	N.locked = true;
	af.property("ADBE Transform Group").property("ADBE Scale").expression = "a=40*Math.sin(10*time)/Math.exp(1.7*time); [transform.scale[0]+a,transform.scale[1]+a];";
	af.property("ADBE Transform Group").property("ADBE Rotate Z").expression = "transform.rotation+40*Math.sin(10*time)/Math.exp(1.7*time);";
	af.property("ADBE Transform Group").property("ADBE Position").expression = "[transform.position[0]+effect('X Position')('ADBE Slider Control-0001'),transform.position[1]+effect('Y Position')('ADBE Slider Control-0001')];";
	var W = myData.dataTitle;
	if (W.length > 20) {
		W = W.slice(0, 18) + "..";
	}
	var d = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (d.length > 20) {
		d = d.slice(0, 18) + "..";
	}
	var q = 50 + 20 * d.length;
	var u = aj.layers.addSolid([1, 1, 1], "Title BG", q, 34, 1, Q);
	u.Effects.addProperty("ADBE Fill");
	u.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var H = u.position;
	var R = u.scale;
	var ak = u.anchorPoint;
	ak.setValue([0, 17]);
	H.setValue([147, 188]);
	R.setValueAtTime(0, [0, 100]);
	R.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	R.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
	u.shy = true;
	u.locked = true;
	for (i = 0; i < 2; i++) {
		var T = aj.layers.addText("Hi");
		var z = T.position;
		var M = T.opacity;
		var K = T.property("ADBE Text Properties").property("ADBE Text Document");
		var U = K.value;
		if (i == 0) {
			U.text = W.toUpperCase();
			U.fontSize = 30;
			U.font = "Arial";
			U.fillColor = ([1, 1, 1]);
			z.setValue([147, 152, 0]);
			U.tracking = 250;
			U.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			U.text = d.toUpperCase();
			U.fontSize = 20;
			U.font = "Arial-Black";
			U.fillColor = ([1, 1, 1]);
			z.setValue([155, 195, 0]);
			U.tracking = 100;
			U.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		T.Effects.addProperty("ADBE Linear Wipe");
		T.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		T.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		T.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		K.setValue(U);
		T.shy = true;
		T.Effects.addProperty("ADBE Fill");
		T.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var an = aj.layers.addNull(10);
	an.name = "values_parent";
	an.property("ADBE Transform Group").property("ADBE Position").setValue([960, 540, 0]);
	an.shy = true;
	var X = aj.layers.addNull(10);
	X.name = "little_circle_parent";
	X.property("ADBE Transform Group").property("ADBE Position").setValue([960, 540, 0]);
	X.shy = true;
	var V = totalValue(0, P);
	var ad = 0;
	var aq = 0;
	var t = 0;
	for (i = 0; i < D; i++) {
		ad = parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]);
		var w = (100 * ad) / V;
		aq = (100 / V) * ad;
		var Y = ((myData.settings.animDuration) / (2 * (D - 1))) * i;
		var ap = Y + 0.5 * (myData.settings.animDuration);
		var p = "Data #" + (i + 1);
		var S = af.Effects.addProperty("ADBE Color Control");
		S.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		S.name = p;
		var Z = aj.layers.addShape();
		Z.name = "Arc " + i.toString();
		Z.shy = true;
		var am = Z.property("ADBE Root Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var m = am.size;
		var B = am.position;
		m.setValue([540, 540]);
		B.setValue([0, 0]);
		var ab = Z.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		ab.property("ADBE Vector Fill Color").expression = "thisComp.layer('PARENT').effect('" + p + "')('ADBE Color Control-0001');";
		Z.Effects.addProperty("ADBE Radial Wipe");
		Z.property("ADBE Effect Parade").property("ADBE Radial Wipe").property("ADBE Radial Wipe-0002").setValue(3.6 * (t));
		t = t + aq;
		Z.property("ADBE Effect Parade").property("ADBE Radial Wipe").property("ADBE Radial Wipe-0001").setValue(100 - aq);
		Z.property("ADBE Effect Parade").property("ADBE Radial Wipe").property("ADBE Radial Wipe-0004").setValue(2);
		Z.property("ADBE Effect Parade").property("ADBE Radial Wipe").property("ADBE Radial Wipe-0003").expression = "[thisComp.layer('PARENT').transform.position[0],thisComp.layer('PARENT').transform.position[1]];";
		var o = 270 * Math.cos(t * Math.PI / 50 - Math.PI * 0.5);
		var J = 270 * Math.sin(t * Math.PI / 50 - Math.PI * 0.5);
		Z.property("ADBE Transform Group").property("ADBE Scale").expression = "if (time>" + Y + ") {a=100+20*Math.sin(10*(time-" + Y + "))/Math.exp(1.7*(time-" + Y + ")); [a,a];}  else {[30,30]}";
		Z.parent = af;
		Z.locked = true;
		if (w > 0.07) {
			var f = aj.layers.addShape();
			f.shy = true;
			var al = f.property("ADBE Root Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
			var G = al.size;
			G.setValue([11, 11]);
			var ag = al.position;
			ag.setValue([o + 13 * Math.cos(t * Math.PI / 50 - Math.PI * 0.5), J + 13 * Math.sin(t * Math.PI / 50 - Math.PI * 0.5)]);
			var y = f.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
			y.property("ADBE Vector Stroke Width").setValue(1);
			y.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Little Circles Color')('ADBE Color Control-0001');";
			f.name = "Little Circle " + i.toString();
			f.property("ADBE Transform Group").property("ADBE Scale").expression = "thisComp.layer('Arc " + i + "').transform.scale";
			f.parent = X;
			f.locked = true;
			var T = aj.layers.addText(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i].toString());
			T.shy = true;
			var z = T.position;
			var M = T.opacity;
			var C = T.rotation;
			C.setValue(3.6 * t - 90);
			var K = T.property("ADBE Text Properties").property("ADBE Text Document");
			var U = K.value;
			U.fontSize = 10;
			U.font = "Arial-Black";
			U.justification = ParagraphJustification.RIGHT_JUSTIFY;
			U.tracking = 0;
			K.setValue(U);
			T.Effects.addProperty("ADBE Fill");
			T.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Text Color')('ADBE Color Control-0001');";
			z.setValue([960 + o - 8 * Math.cos(t * Math.PI / 50 - Math.PI * 0.5), 540 + J - 8 * Math.sin(t * Math.PI / 50 - Math.PI * 0.5)]);
			T.parent = an;
			var W = myData.dataNames[i];
			if (W.length >= 13) {
				W = W.slice(0, 13) + "...";
			}
			var h = aj.layers.addText(W + " - " + (Math.round(w * 10) / 10) + "%");
			h.shy = true;
			var c = h.position;
			var F = h.opacity;
			var O = h.property("ADBE Text Properties").property("ADBE Text Document");
			var e = O.value;
			e.fontSize = 14 + w * 0.1;
			e.font = "Arial-Black";
			e.fillColor = [1, 1, 1];
			e.tracking = 40;
			e.justification = ParagraphJustification.LEFT_JUSTIFY;
			O.setValue(e);
			h.Effects.addProperty("ADBE Fill");
			h.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + p + "')('ADBE Color Control-0001');";
			c.setValue([960 + o + 35 * Math.cos(t * Math.PI / 50 - Math.PI * 0.5), 540 + J + 35 * Math.sin(t * Math.PI / 50 - Math.PI * 0.5)]);
			h.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(3.6 * t - 90);
			F.setValueAtTime(Y, 0);
			F.setValueAtTime(ap, 100);
			h.parent = af;
		}
		var a = aj.layers.addShape();
		a.name = "Line " + i.toString();
		a.shy = true;
		var ae = a.property("ADBE Root Vectors Group");
		var I = ae;
		var aa, x, ao;
		aa = I.addProperty("ADBE Vector Shape - Group");
		aa.name = "Shape Layer";
		x = aa.property("ADBE Vector Shape");
		ao = new Shape();
		ao.vertices = [
			[0, 0],
			[o, J]
		];
		ao.inTangents = [
			[0, 0],
			[0, 0]
		];
		ao.outTangents = [
			[0, 0],
			[0, 0]
		];
		ao.closed = false;
		x.setValue(ao);
		var y = I.addProperty("ADBE Vector Graphic - Stroke");
		y.property("ADBE Vector Stroke Width").setValue(4);
		y.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
		a.parent = af;
		a.locked = true;
	}
	an.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(-1.1);
	X.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(-1.8);
	innerCircle = aj.layers.addShape();
	innerCircle.shy = true;
	var am = innerCircle.property("ADBE Root Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
	var m = am.size;
	var B = am.position;
	m.setValue([430, 430]);
	B.setValue([0, 0]);
	var ab = innerCircle.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Fill");
	ab.property("Color").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	innerCircle.scale.expression = "a=100+thisComp.layer('PARENT').effect('Radius')('ADBE Slider Control-0001');[a,a]";
	innerCircle.parent = af;
	innerCircle.locked = true;
	X.parent = af;
	an.parent = af;
	X.locked = true;
	an.locked = true;
	aj.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		aj.openInViewer();
	}
	app.endUndoGroup();
}

function createSpiderChart() {
	var T = 9;
	var Y = myData.settings.compDuration;
	var G = Math.min(myData.dataNames.length, T);
	var B = app.project;
	spiderChartNumber++;
	app.beginUndoGroup("Create Spider Chart");
	var w = B.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Spider Chart - " + spiderChartNumber + ")", 1920, 1080, 1, Y, 25);
	var S = w.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, Y);
	var ap = w.layers.addNull(Y);
	ap.name = "PARENT";
	ap.position.setValue([960, 540]);
	var s = ap.Effects.addProperty("ADBE Color Control");
	s.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.spiderChartColors.chartLineColor));
	s.name = "Chart Line Color";
	var V = ap.Effects.addProperty("ADBE Slider Control");
	V.property("ADBE Slider Control-0001").setValue(15);
	V.name = "Chart Line Thickness";
	var C = ap.Effects.addProperty("ADBE Slider Control");
	C.property("ADBE Slider Control-0001").setValue(80);
	C.name = "Data Point Size";
	var W = ap.Effects.addProperty("ADBE Slider Control");
	W.property("ADBE Slider Control-0001").setValue(8);
	W.name = "Guide Lines Interval";
	var I = ap.Effects.addProperty("ADBE Color Control");
	I.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.spiderChartColors.guideLinesColor));
	I.name = "Guide Lines Color";
	var ah = ap.Effects.addProperty("ADBE Slider Control");
	ah.property("ADBE Slider Control-0001").setValue(12.5);
	ah.name = "Guide Lines Thickness";
	var N = ap.Effects.addProperty("ADBE Slider Control");
	N.property("ADBE Slider Control-0001").setValue(50);
	N.name = "Chart Opacity";
	var Q = ap.Effects.addProperty("ADBE Color Control");
	Q.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.spiderChartColors.chartColor));
	Q.name = "Chart Color";
	var H = ap.Effects.addProperty("ADBE Color Control");
	H.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	H.name = "BG Color";
	var al = ap.Effects.addProperty("ADBE Color Control");
	al.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.spiderChartColors.titleColor));
	al.name = "Title Color";
	var at = ap.Effects.addProperty("ADBE Color Control");
	at.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.spiderChartColors.titleBGColor));
	at.name = "Title BG Color";
	S.Effects.addProperty("ADBE Fill");
	S.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	S.shy = true;
	S.locked = true;
	var ag = myData.dataTitle;
	if (ag.length > 20) {
		ag = ag.slice(0, 18) + "..";
	}
	var e = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (e.length > 20) {
		e = e.slice(0, 18) + "..";
	}
	var o = 50 + 20 * e.length;
	var t = w.layers.addSolid([1, 1, 1], "Title BG", o, 34, 1, Y);
	t.Effects.addProperty("ADBE Fill");
	t.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var K = t.position;
	var aa = t.scale;
	var av = t.anchorPoint;
	av.setValue([0, 17]);
	K.setValue([147, 188]);
	aa.setValueAtTime(0, [0, 100]);
	aa.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	aa.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn], [easeOut, easeOut, easeOut]);
	t.shy = true;
	t.locked = true;
	for (i = 0; i < 2; i++) {
		var ab = w.layers.addText("Hi");
		var A = ab.position;
		var R = ab.opacity;
		var M = ab.property("ADBE Text Properties").property("ADBE Text Document");
		var ad = M.value;
		if (i == 0) {
			ad.text = ag.toUpperCase();
			ad.fontSize = 30;
			ad.font = "Arial";
			ad.fillColor = ([1, 1, 1]);
			A.setValue([147, 152, 0]);
			ad.tracking = 250;
			ad.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			ad.text = e.toUpperCase();
			ad.fontSize = 20;
			ad.font = "Arial-Black";
			ad.fillColor = ([1, 1, 1]);
			A.setValue([155, 195, 0]);
			ad.tracking = 100;
			ad.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		ab.Effects.addProperty("ADBE Linear Wipe");
		ab.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		ab.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		ab.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		M.setValue(ad);
		ab.shy = true;
		ab.Effects.addProperty("ADBE Fill");
		ab.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var af = totalValue(0, T);
	var U = 0;
	for (i = 0; i < G; i++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) > U) {
			U = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		}
	}
	var Z = G;
	var F = (100 * U) / af;
	var d = w.layers.addShape();
	d.name = "Spider - Lines";
	d.shy = true;
	var ao = d.property("ADBE Root Vectors Group");
	var L = ao;
	var ak, x, ay, q;
	ak = L.addProperty("ADBE Vector Shape - Group");
	ak.name = "Shape Layer";
	x = ak.property("ADBE Vector Shape");
	ay = new Shape();
	ay.vertices = [
		[0, 0],
		[0, 0]
	];
	ay.inTangents = [
		[0, 0],
		[0, 0]
	];
	ay.outTangents = [
		[0, 0],
		[0, 0]
	];
	ay.closed = false;
	q = new Shape();
	q.vertices = [
		[0, 0],
		[0, -450]
	];
	q.inTangents = [
		[0, 0],
		[0, 0]
	];
	q.outTangents = [
		[0, 0],
		[0, 0]
	];
	q.closed = false;
	x.setValueAtTime(0, ay);
	x.setValueAtTime(0.5 * (myData.settings.animDuration), q);
	x.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	var z = L.addProperty("ADBE Vector Graphic - Stroke");
	z.property("ADBE Vector Stroke Width").setValue(1);
	z.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Lines Color')('ADBE Color Control-0001');";
	var ac = L.addProperty("ADBE Vector Filter - Repeater");
	ac.property("ADBE Vector Repeater Copies").setValue(Z);
	ac.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Rotation").setValue(360 / (Z));
	ac.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Anchor").setValueAtTime(0, [50, 0]);
	ac.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Anchor").setValueAtTime(0.5 * (myData.settings.animDuration), [0, 0]);
	ac.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Anchor").setTemporalEaseAtKey(2, [easeIn], [easeOut]);
	d.parent = ap;
	d.locked = true;
	var y = w.layers.addShape();
	y.name = Z + " - Gons";
	y.shy = true;
	var an = y.property("ADBE Root Vectors Group").addProperty("ADBE Vector Shape - Star");
	var n = y.opacity;
	an.property("ADBE Vector Star Type").setValue(2);
	an.property("ADBE Vector Star Outer Radius").setValue(50);
	an.property("ADBE Vector Star Points").setValue(Z);
	var z = y.property("ADBE Root Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
	z.property("ADBE Vector Stroke Width").expression = "thickness=thisComp.layer('PARENT').effect('Guide Lines Thickness')('ADBE Slider Control-0001');linear(thickness,0,100,0.1,3);";
	z.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Guide Lines Color')('ADBE Color Control-0001');";
	var ac = y.property("ADBE Root Vectors Group").addProperty("ADBE Vector Filter - Repeater");
	ac.property("ADBE Vector Repeater Copies").expression = "thickness=thisComp.layer('PARENT').effect('Guide Lines Interval')('ADBE Slider Control-0001');r=linear(thickness,0,100,4,0); 6+Math.pow(2,r)";
	n.expression = "linear(time,0,1,0,100);";
	ac.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Scale").expression = "thickness=thisComp.layer('PARENT').effect('Guide Lines Interval')('ADBE Slider Control-0001');s=linear(thickness,0,100,10,50);[100+s,100+s]";
	ac.property("ADBE Vector Repeater Transform").property("ADBE Vector Repeater Opacity 2").setValue(0);
	y.parent = ap;
	y.locked = true;
	var E = [
		[]
	];
	var a = [
		[]
	];
	var v = 400 / F;
	var P = 2 * Math.PI / Z;
	for (i = 0; i < G; i++) {
		var u = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / af;
		var aj = [0, 0];
		aj[0] = v * u * Math.cos(i * P - (Z % 4) * 0.25 * P);
		aj[1] = v * u * Math.sin(i * P - (Z % 4) * 0.25 * P);
		E[i] = aj;
		a[i] = [0, 0];
	}
	var O = w.layers.addShape();
	O.name = "Middle Shape";
	O.shy = true;
	var ae = O.property("ADBE Root Vectors Group");
	var L = ae;
	var ak, x, ay, q;
	ak = L.addProperty("ADBE Vector Shape - Group");
	ak.name = "Shape Layer";
	x = ak.property("ADBE Vector Shape");
	ay = new Shape();
	ay.vertices = a;
	ay.closed = true;
	q = new Shape();
	q.vertices = E;
	q.closed = true;
	x.setValueAtTime(0.25 * (myData.settings.animDuration), ay);
	x.setValueAtTime((myData.settings.animDuration), q);
	x.setTemporalEaseAtKey(2, [easeIn]);
	var z = L.addProperty("ADBE Vector Graphic - Stroke");
	z.property("ADBE Vector Stroke Width").expression = "thickness=thisComp.layer('PARENT').effect('Chart Line Thickness')('ADBE Slider Control-0001');linear(thickness,0,100,0.1,3);";
	z.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Chart Line Color')('ADBE Color Control-0001');";
	var z = L.addProperty("ADBE Vector Graphic - Fill");
	z.property("ADBE Vector Fill Color").expression = "thisComp.layer('PARENT').effect('Chart Color')('ADBE Color Control-0001');";
	z.property("ADBE Vector Fill Opacity").expression = "thisComp.layer('PARENT').effect('Chart Opacity')('ADBE Slider Control-0001');";
	O.parent = ap;
	O.locked = true;
	var m = w.layers.addShape();
	m.name = "outerPoints";
	var L = m.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	m.shy = true;
	for (i = 0; i < G; i++) {
		var u = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / af;
		var h = "Data #" + (i + 1);
		var au = ap.Effects.addProperty("ADBE Color Control");
		au.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		au.name = h;
		var aw = L.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var J = aw.size;
		J.expression = "thickness=thisComp.layer('PARENT').effect('Data Point Size')('ADBE Slider Control-0001');r=linear(thickness,0,100,0.1,35);[r,r];";
		var ar = aw.position;
		ar.setValueAtTime(0.25 * (myData.settings.animDuration), a[i]);
		ar.setValueAtTime((myData.settings.animDuration), E[i]);
		ar.setTemporalEaseAtKey(2, [easeIn]);
	}
	var z = L.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
	z.property("ADBE Vector Stroke Width").setValue(1);
	z.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Chart Line Color')('ADBE Color Control-0001');";
	var z = L.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
	var X = z.property("ADBE Vector Fill Color");
	X.expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	m.parent = ap;
	m.locked = true;
	var c = w.layers.addShape();
	c.name = "Points";
	var L = c.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	c.shy = true;
	for (i = 0; i < G; i++) {
		var u = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / af;
		var aw = L.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var J = aw.size;
		J.expression = "thickness=thisComp.layer('PARENT').effect('Data Point Size')('ADBE Slider Control-0001'); r=linear(thickness,0,100,0.1,20); if ((time < 2) & (time > 0)) [r*Math.sin(Math.PI / time),  r*Math.sin(Math.PI / time)] else [r, r];";
		var ar = aw.position;
		ar.setValueAtTime(0.25 * (myData.settings.animDuration), a[i]);
		ar.setValueAtTime((myData.settings.animDuration), E[i]);
		ar.setTemporalEaseAtKey(2, [easeIn]);
		var z = L.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var X = z.property("ADBE Vector Fill Color");
		X.expression = "thisComp.layer('PARENT').effect('Data #" + (i + 1) + "')('ADBE Color Control-0001');";
	}
	c.parent = ap;
	c.locked = true;
	var am = 35;
	var f = w.layers.addShape();
	f.name = "Points For Lists";
	var L = f.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	f.shy = true;
	f.locked = true;
	for (i = 0; i < G; i++) {
		var u = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / af;
		var aw = L.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		var J = aw.size;
		J.setValueAtTime(0.5 * (myData.settings.animDuration), [0, 0]);
		J.setValueAtTime((myData.settings.animDuration), [20, 20]);
		J.setTemporalEaseAtKey(2, [easeIn, easeIn], [easeIn, easeIn]);
		var ar = aw.position;
		ar.setValueAtTime(0.5 * (myData.settings.animDuration), [365, -Z * 0.5 * am + i * am]);
		ar.setValueAtTime((myData.settings.animDuration), [415, -Z * 0.5 * am + i * am]);
		ar.setTemporalEaseAtKey(2, [easeIn]);
		var z = L.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var X = z.property("ADBE Vector Fill Color");
		X.expression = "thisComp.layer('PARENT').effect('Data #" + (i + 1) + "')('ADBE Color Control-0001');";
	}
	for (i = 0; i < G; i++) {
		var ai = 0.4 * (myData.settings.animDuration) + ((0.6 * myData.settings.animDuration) / (2 * (G - 1))) * i;
		var ax = ai + 0.3 * (myData.settings.animDuration);
		var u = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i])) / af;
		var ag = myData.dataNames[i].replace(/\n|\r/g, "");
		if (ag.length >= 25) {
			ag = ag.slice(0, 25) + "...";
		}
		var ab = w.layers.addText(ag + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].rows[i].toString().toUpperCase());
		var A = ab.position;
		var R = ab.opacity;
		var M = ab.property("ADBE Text Properties").property("ADBE Text Document");
		var ad = M.value;
		ad.fontSize = 20;
		ad.font = "Arial";
		ad.fillColor = ([1, 1, 1]);
		ad.tracking = 0;
		ad.justification = ParagraphJustification.LEFT_JUSTIFY;
		M.setValue(ad);
		ab.shy = true;
		ab.Effects.addProperty("ADBE Fill");
		ab.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Data #" + (i + 1) + "')('ADBE Color Control-0001');";
		R.setValueAtTime(ai, 0);
		R.setValueAtTime(ax, 100);
		A.setValueAtTime(ai, [1325, 517 - Z * 0.5 * am + i * am]);
		A.setValueAtTime(ax, [1400, 547 - Z * 0.5 * am + i * am]);
		A.setTemporalEaseAtKey(2, [easeIn], [easeOut]);
		ab.locked = true;
		var ab = w.layers.addText((Math.round(u * 10) / 10) + "%");
		var A = ab.position;
		var aq = ab.anchorPoint;
		var R = ab.opacity;
		var D = ab.rotation;
		var p = ab.scale;
		aq.setValue([0, 24]);
		var M = ab.property("ADBE Text Properties").property("ADBE Text Document");
		var ad = M.value;
		ad.fontSize = 20;
		ad.font = "Arial-Black";
		ad.fillColor = ([1, 1, 1]);
		A.setValue([960 + E[i][0], 540 + E[i][1]]);
		ad.tracking = 0;
		ad.justification = ParagraphJustification.CENTER_JUSTIFY;
		M.setValue(ad);
		ab.shy = true;
		ab.Effects.addProperty("ADBE Fill");
		ab.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Data #" + (i + 1) + "')('ADBE Color Control-0001');";
		R.setValueAtTime(ai, 0);
		R.setValueAtTime(ax, 100);
		R.setTemporalEaseAtKey(2, [easeIn]);
		D.setValueAtTime(ai, 120);
		D.setValueAtTime(ax, 0);
		D.setTemporalEaseAtKey(2, [easeIn]);
		p.setValueAtTime(ai, [0, 0]);
		p.setValueAtTime(ax, [100, 100]);
		p.setTemporalEaseAtKey(2, [easeIn, easeIn, easeIn]);
		ab.parent = ap;
		ab.locked = true;
	}
	ap.property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime(0, 150);
	ap.property("ADBE Transform Group").property("ADBE Rotate Z").setValueAtTime((myData.settings.animDuration), 0);
	ap.property("ADBE Transform Group").property("ADBE Rotate Z").setTemporalEaseAtKey(2, [easeIn]);
	ap.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(0.25 * (myData.settings.animDuration), [960, 540]);
	ap.property("ADBE Transform Group").property("ADBE Position").setValueAtTime((myData.settings.animDuration), [764, 540]);
	ap.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(2, [easeOut], [easeIn]);
	w.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		w.openInViewer();
	}
	app.endUndoGroup();
}

function createNetChart() {
	var H = 14;
	var C = Math.min(myData.dataNames.length, H);
	var S = myData.settings.compDuration;
	var n = totalValue(0, H);
	var aa = 0.7 * Math.PI / 17;
	var at = new KeyframeEase(0.5, 93);
	var aB = new KeyframeEase(0.75, 15);
	netCompNumber++;
	app.beginUndoGroup("Create Line Chart");
	var Y = app.project.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (Line Chart - " + netCompNumber + ")", 1920, 1080, 1, S, 25);
	var ay = Y.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, S);
	ay.shy = true;
	var c = Y.layers.addShape();
	c.name = "ShapeLayer";
	c.shy = true;
	var w = Y.layers.addShape();
	w.name = "Circles";
	w.shy = true;
	var a = Y.layers.addNull();
	a.name = "PARENT";
	var m = a.Effects.addProperty("ADBE Slider Control");
	m.name = "X Position";
	var aG = a.Effects.addProperty("ADBE Slider Control");
	aG.name = "Y Position";
	var P = a.Effects.addProperty("ADBE Angle Control");
	P.name = "Rotation";
	var p = a.Effects.addProperty("ADBE Slider Control");
	p.name = "Scale";
	var aq = a.Effects.addProperty("ADBE Slider Control");
	aq.name = "Line Thickness";
	a.property("ADBE Effect Parade").property("Line Thickness").property("ADBE Slider Control-0001").expression = "if (effect('Line Thickness')('ADBE Slider Control-0001') > 80) {5} else if (effect('Line Thickness')('ADBE Slider Control-0001') < -20) {0} else {effect('Line Thickness')('ADBE Slider Control-0001')/20}";
	if (set == 0) {
		var ao = a.Effects.addProperty("ADBE Checkbox Control");
		ao.name = "Glows ON/OFF";
	}
	var W = a.Effects.addProperty("ADBE Checkbox Control");
	W.name = "Gradient ON/OFF";
	var az = a.Effects.addProperty("ADBE Color Control");
	az.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	az.name = "BG Color";
	var ar = a.Effects.addProperty("ADBE Color Control");
	ar.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.netChartColors.bgColorDark));
	ar.name = "BG Color Dark (Gradient)";
	var ap = a.Effects.addProperty("ADBE Color Control");
	ap.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.netChartColors.lineColor));
	ap.name = "Line Color";
	var e = a.Effects.addProperty("ADBE Color Control");
	e.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.netChartColors.titleColor));
	e.name = "Title Color";
	var ax = a.Effects.addProperty("ADBE Color Control");
	ax.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.netChartColors.titleBGColor));
	ax.name = "Title BG Color";
	var ai = a.Effects.addProperty("ADBE Color Control");
	ai.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.netChartColors.valueAndPercentageColor));
	ai.name = "Value and Percentage Color";
	ay.locked = true;
	var aw = w.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
	aw.name = "Group 1";
	var aE = myData.dataTitle;
	if (aE.length > 25) {
		aE = aE.slice(0, 23) + "..";
	}
	var Z = myData.dataColumns[myData.selectedColumnsOf[0]].title;
	if (Z.length > 25) {
		Z = Z.slice(0, 23) + "..";
	}
	var T = 50 + 20 * Z.length;
	var aD = Y.layers.addSolid([1, 1, 1], "Title BG", T, 34, 1, S);
	aD.Effects.addProperty("ADBE Fill");
	aD.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
	var L = aD.position;
	var V = aD.scale;
	var X = aD.anchorPoint;
	X.setValue([0, 17]);
	L.setValue([147, 188]);
	V.setValueAtTime(0, [0, 100]);
	V.setValueAtTime(myData.settings.animDuration * 0.5, [100, 100]);
	V.setTemporalEaseAtKey(2, [at, at, at], [aB, aB, aB]);
	aD.shy = true;
	aD.locked = true;
	for (i = 0; i < 2; i++) {
		var q = Y.layers.addText("Hi");
		var ab = q.position;
		var f = q.opacity;
		var I = q.property("ADBE Text Properties").property("ADBE Text Document");
		var aF = I.value;
		if (i == 0) {
			aF.text = aE.toUpperCase();
			aF.fontSize = 30;
			aF.font = "Arial";
			aF.fillColor = ([1, 1, 1]);
			ab.setValue([147, 152, 0]);
			aF.tracking = 250;
			aF.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		if (i == 1) {
			aF.text = Z.toUpperCase();
			aF.fontSize = 20;
			aF.font = "Arial-Black";
			aF.fillColor = ([1, 1, 1]);
			ab.setValue([155, 195, 0]);
			aF.tracking = 100;
			aF.justification = ParagraphJustification.LEFT_JUSTIFY;
		}
		q.Effects.addProperty("ADBE Linear Wipe");
		q.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
		q.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2, 95);
		q.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(i * 0.2 + 3, 0);
		I.setValue(aF);
		q.shy = true;
		q.Effects.addProperty("ADBE Fill");
		q.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	}
	var t = 0;
	for (i = 0; i < C; i++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) > t) {
			t = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		}
	}
	var aC = t;
	for (i = 0; i < C; i++) {
		if (Number(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]) < aC) {
			aC = myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		}
	}
	var M = t - aC;
	for (i = 0; i < C; i++) {
		var O = parseFloat(myData.dataColumns[myData.selectedColumnsOf[0]].rows[i]);
		if (O == 0) {
			O = 0.001;
		}
		var aj = (O - aC) * (300 / M) + 250;
		var v = aj * 0.1;
		var Q = aj - v;
		var A = 50;
		var au = (100 * O) / n;
		var af = Q * Math.cos(aa * i);
		var z = Q * Math.sin(aa * i);
		var D = "Data #" + (i + 1);
		var aA = a.Effects.addProperty("ADBE Color Control");
		aA.property("ADBE Color Control-0001").setValue(hexToRgb(myData.dataColors[i]));
		aA.name = D;
		var al = aw.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
		al.name = "Ellipse Path " + i.toString();
		var ad = al.size;
		var ak = (myData.settings.animDuration / (2 * (C - 1))) * i;
		var ae = ak + 0.5 * (myData.settings.animDuration);
		var B = al.position;
		ad.setValueAtTime(ak, [0, 0]);
		ad.setValueAtTime(ae, [v, v]);
		ad.expression = "if (time>" + ak + ") {a=content('Group 1').content('Ellipse Path " + i + "').size[0]+20*Math.sin(10*(time-" + ak + "))/Math.exp(1.7*(time-" + ak + ")); [a,a];}  else {[content('Group 1').content('Ellipse Path " + i + "').size[0],content('Group 1').content('Ellipse Path " + i + "').size[0]]}";
		B.setValueAtTime(ak, [A * Math.cos(aa * i), A * Math.sin(aa * i)]);
		B.setValueAtTime(ae, [aj * Math.cos(aa * i), aj * Math.sin(aa * i)]);
		B.setTemporalEaseAtKey(2, [at], [aB]);
		var ah = aw.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
		var an = ah.property("ADBE Vector Fill Color");
		an.expression = "thisComp.layer('PARENT').effect('" + D + "')('ADBE Color Control-0001');";
		var F = c.property("ADBE Root Vectors Group");
		var o = F;
		var E, u, y;
		E = o.addProperty("ADBE Vector Shape - Group");
		E.name = "Line Shape Layer";
		u = E.property("ADBE Vector Shape");
		y = new Shape();
		y.vertices = [
			[A * Math.cos(aa * i), A * Math.sin(aa * i)],
			[af, z]
		];
		y.inTangents = [
			[0, 0],
			[0, 0]
		];
		y.outTangents = [
			[0, 0],
			[0, 0]
		];
		y.closed = false;
		shapePathData2 = new Shape();
		shapePathData2.vertices = [
			[A * Math.cos(aa * i), A * Math.sin(aa * i)],
			[A * Math.cos(aa * i), A * Math.sin(aa * i)]
		];
		shapePathData2.inTangents = [
			[0, 0],
			[0, 0]
		];
		shapePathData2.outTangents = [
			[0, 0],
			[0, 0]
		];
		shapePathData2.closed = false;
		u.setValueAtTime(ak, shapePathData2);
		u.setValueAtTime(ae, y);
		u.setTemporalEaseAtKey(2, [at], [aB]);
		var ah = o.addProperty("ADBE Vector Graphic - Stroke");
		ah.property("ADBE Vector Stroke Width").expression = "1+thisComp.layer('PARENT').effect('Line Thickness')('ADBE Slider Control-0001')*" + v / 20;
		ah.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Line Color')('ADBE Color Control-0001');";
		var aE = myData.dataNames[i];
		if (aE.length >= 13) {
			aE = aE.slice(0, 13) + "...";
		}
		var q = Y.layers.addText(aE);
		q.parent = a;
		var ab = q.position;
		var ac = q.anchorPoint;
		var av = q.rotation;
		var J = q.scale;
		var f = q.opacity;
		var I = q.property("ADBE Text Properties").property("ADBE Text Document");
		var aF = I.value;
		aF.fontSize = 35;
		J.setValueAtTime(ak, [0, 0]);
		J.setValueAtTime(ae, [aj * 0.2, aj * 0.2]);
		J.setTemporalEaseAtKey(2, [at, at, at], [aB, aB, aB]);
		ac.setValue([-45, -12]);
		aF.font = "Arial-Black";
		aF.fillColor = (hexToRgb(myData.dataColors[i]));
		ab.expression = "[thisComp.layer('Circles').content('Group 1').content('Ellipse Path " + i + "').position[0],thisComp.layer('Circles').content('Group 1').content('Ellipse Path " + i + "').position[1]];";
		aF.tracking = 40;
		aF.justification = ParagraphJustification.LEFT_JUSTIFY;
		av.setValue(aa * i * 180 / Math.PI);
		I.setValue(aF);
		q.Effects.addProperty("ADBE Fill");
		q.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + D + "')('ADBE Color Control-0001');";
		if (set == 0) {
			q.Effects.addProperty("ADBE Glo2");
			var h = q.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0002");
			h.expression = "0";
			var am = q.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0003");
			am.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*56;";
			var N = q.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0004");
			N.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*0.3;";
		}
		q.shy = true;
		var s = "";
		if (myData.settings.selectedLabel == "value") {
			s = "" + myData.dataColumns[myData.selectedColumnsOf[0]].rows[i];
		} else {
			s = "" + (Math.round(au * 10) / 10) + "%";
		}
		var q = Y.layers.addText("Hi");
		q.parent = a;
		var ab = q.position;
		var ac = q.anchorPoint;
		var av = q.rotation;
		var J = q.scale;
		var f = q.opacity;
		var I = q.property("ADBE Text Properties").property("ADBE Text Document");
		var aF = I.value;
		aF.text = s;
		aF.fontSize = 40;
		aF.justification = ParagraphJustification.LEFT_JUSTIFY;
		J.setValueAtTime(ak, [0, 0]);
		J.setValueAtTime(ae, [aj * 0.2, aj * 0.2]);
		J.setTemporalEaseAtKey(2, [at, at, at], [aB, aB, aB]);
		if (aE.length >= 13) {
			ac.setValue([-(aE.length - 3) * 25 - 100, -13]);
		} else {
			ac.setValue([-aE.length * 25 - 100, -13]);
		}
		aF.font = "Arial";
		aF.fillColor = ([0.3, 0.3, 0.3]);
		ab.expression = "[thisComp.layer('Circles').content('Group 1').content('Ellipse Path " + i + "').position[0],thisComp.layer('Circles').content('Group 1').content('Ellipse Path " + i + "').position[1]];";
		aF.tracking = 40;
		av.setValue(aa * i * 180 / Math.PI);
		q.Effects.addProperty("ADBE Fill");
		q.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value and Percentage Color')('ADBE Color Control-0001');";
		I.setValue(aF);
		q.shy = true;
		a.property("ADBE Effect Parade").property("ADBE Angle Control").property("ADBE Angle Control-0001").setValue(-45 - 3.2 * (i - 1));
	}
	c.parent = a;
	w.parent = a;
	if (set == 0) {
		w.Effects.addProperty("ADBE Glo2");
		var h = w.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0002");
		h.expression = "0";
		var am = w.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0003");
		am.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*56;";
		var N = w.property("ADBE Effect Parade").property("ADBE Glo2").property("ADBE Glo2-0004");
		N.expression = "thisComp.layer('PARENT').effect('Glows ON/OFF')('ADBE Checkbox Control-0001')*0.3;";
	}
	ay.Effects.addProperty("ADBE Fill");
	ay.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	ay.Effects.addProperty("ADBE Ramp");
	ay.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0001").setValue([960, 324]);
	ay.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0003").setValue([960, 1692]);
	ay.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	ay.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0004").expression = "thisComp.layer('PARENT').effect('BG Color Dark (Gradient)')('ADBE Color Control-0001');";
	ay.property("ADBE Effect Parade").property("ADBE Ramp").property("ADBE Ramp-0007").expression = "100-100*thisComp.layer('PARENT').effect('Gradient ON/OFF')('ADBE Checkbox Control-0001');";
	var d = 150;
	var U = Math.max(2, (10 / (myData.settings.animDuration))) + 3;
	var G = 1.8 - (myData.settings.animDuration) * 0.1;
	var ag = a.property("ADBE Transform Group").property("ADBE Position");
	var K = a.property("ADBE Transform Group").property("ADBE Rotate Z");
	var R = a.property("ADBE Transform Group").property("ADBE Scale");
	ag.expression = "veloc = " + U + "; amplitude = " + d + "; decay = " + G + "; a=amplitude*Math.cos(veloc*time)/Math.exp(decay*time);[a+transform.position[0]+effect('X Position')('ADBE Slider Control-0001')-340,a+effect('Y Position')('ADBE Slider Control-0001')+transform.position[1]-40];";
	K.expression = "veloc = " + U + "; amplitude = " + d + "; decay = " + G + "; 30+effect('ADBE Angle Control')('ADBE Angle Control-0001')+amplitude*Math.sin(veloc*time)/Math.exp(decay*time);";
	R.expression = "s = effect('Scale')('ADBE Slider Control-0001'); [100+s, 100+s];";
	a.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(-90);
	Y.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		Y.openInViewer();
	}
	app.endUndoGroup();
}

function create3DBarChart() {
	bar3DCompNumber++;
	var K = 19;
	var G = Math.min(myData.dataNames.length, K);
	var R = myData.settings.compDuration;
	var ar = new KeyframeEase(0, 95);
	var aF = new KeyframeEase(0, 10);
	var Q, W, U;
	var N;
	var ak = 60;
	var P = 960;
	var O = 540;
	U = 300;
	Q = Math.ceil(1300 / G);
	W = 20;
	N = Q + ak;
	app.beginUndoGroup("Create 3D Bar Chart");
	var v = app.project;
	var s = v.items.addComp(myData.dataTitle + " - " + myData.dataColumns[myData.selectedColumnsOf[0]].title + " (3D Bar Chart - " + bar3DCompNumber + ")", 1920, 1080, 1, R, 25);
	var aC = s.layers.addSolid([1, 1, 1], "BG", 1920, 1080, 1, R);
	var X = s.layers.addNull(R);
	X.name = "PARENT";
	X.position.setValue([960, 540]);
	var ad = X.Effects.addProperty("ADBE Slider Control");
	ad.name = "Gap Between Bars";
	var B = X.Effects.addProperty("ADBE Slider Control");
	B.name = "Width of Bars";
	var S = X.Effects.addProperty("ADBE Slider Control");
	S.name = "Depth of Bars";
	X.property("ADBE Effect Parade").property("Depth of Bars").property("ADBE Slider Control-0001").expression = "if (effect('Depth of Bars')('ADBE Slider Control-0001') > 500) {500} else if (effect('Depth of Bars')('ADBE Slider Control-0001') < -80) {-80} else {effect('Depth of Bars')('ADBE Slider Control-0001')}";
	var Y = X.Effects.addProperty("ADBE Slider Control");
	Y.name = "Horizontal Line Length";
	X.property("ADBE Effect Parade").property("Horizontal Line Length").property("ADBE Slider Control-0001").expression = "if (effect('Horizontal Line Length')('ADBE Slider Control-0001') > 500) {500} else if (effect('Horizontal Line Length')('ADBE Slider Control-0001') < -100) {-100} else {effect('Horizontal Line Length')('ADBE Slider Control-0001')}";
	var aD = X.Effects.addProperty("ADBE Color Control");
	aD.property("ADBE Color Control-0001").setValue(hexToRgb(myData.backgroundColor));
	aD.name = "BG Color";
	var aq = X.Effects.addProperty("ADBE Color Control");
	aq.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.t3DBarChartColors.groundColor));
	aq.name = "Ground Color";
	var f = X.Effects.addProperty("ADBE Color Control");
	f.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.t3DBarChartColors.titleColor));
	f.name = "Title Color";
	if (myData.selectedColumnsOf.length == 1) {
		var aA = X.Effects.addProperty("ADBE Color Control");
		aA.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.t3DBarChartColors.titleBGColor));
		aA.name = "Title BG Color";
	}
	var C = X.Effects.addProperty("ADBE Color Control");
	C.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.t3DBarChartColors.valueTitleColor));
	C.name = "Value Title Color";
	var ai = X.Effects.addProperty("ADBE Color Control");
	ai.property("ADBE Color Control-0001").setValue(hexToRgb(myData.chartColors.t3DBarChartColors.horizontalLineColor));
	ai.name = "Horizontal Line Color";
	aC.Effects.addProperty("ADBE Fill");
	aC.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('BG Color')('ADBE Color Control-0001');";
	aC.shy = true;
	aC.locked = true;
	var T = s.layers.addSolid(hexToRgb(myData.chartColors.t3DBarChartColors.valueTextColor), "Ground", 4000, 4000, 1, R);
	T.threeDLayer = true;
	T.property("ADBE Transform Group").property("ADBE Position").setValue([2150, O, -2011]);
	T.property("ADBE Transform Group").property("ADBE Rotate X").setValue(-90);
	T.Effects.addProperty("ADBE Fill");
	T.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Ground Color')('ADBE Color Control-0001');";
	T.shy = true;
	T.locked = true;
	var aj = myData.dataTitle;
	if (aj.length > 30) {
		aj = aj.slice(0, 22) + "..";
	}
	var z = s.layers.addText("Hi");
	var af = z.position;
	var m = z.opacity;
	var L = z.property("ADBE Text Properties").property("ADBE Text Document");
	var aH = L.value;
	aH.text = aj.toUpperCase();
	aH.fontSize = 30;
	aH.font = "Arial";
	aH.fillColor = hexToRgb(myData.chartColors.t3DBarChartColors.titleColor);
	af.setValue([147, 152, 0]);
	aH.tracking = 250;
	aH.justification = ParagraphJustification.LEFT_JUSTIFY;
	z.Effects.addProperty("ADBE Linear Wipe");
	z.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0002").setValue(-90);
	z.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime(0, 95);
	z.property("ADBE Effect Parade").property("ADBE Linear Wipe").property("ADBE Linear Wipe-0001").setValueAtTime((myData.settings.animDuration), 0);
	L.setValue(aH);
	z.shy = true;
	z.Effects.addProperty("ADBE Fill");
	z.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
	var a = s.layers.addShape();
	a.name = "Horizontal lines";
	a.threeDLayer = true;
	a.property("ADBE Transform Group").property("ADBE Position").setValue([P, O, W]);
	a.property("ADBE Transform Group").property("ADBE Position").expression = "[transform.position[0],transform.position[1],transform.position[2]+thisComp.layer('PARENT').effect('Depth of Bars')('ADBE Slider Control-0001')*0.6]";
	var J = a.property("ADBE Root Vectors Group");
	var t = J;
	var ac = 800;
	var D = 0;
	var q = 0;
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (j = 0; j < G; j++) {
			q += parseFloat(myData.dataColumns[myData.selectedColumnsOf[i]].rows[j]);
		}
	}
	for (i = 0; i < myData.selectedColumnsOf.length; i++) {
		for (l = 0; l < G; l++) {
			if (Number(myData.dataColumns[myData.selectedColumnsOf[i]].rows[l]) > D) {
				D = myData.dataColumns[myData.selectedColumnsOf[i]].rows[l];
			}
		}
	}
	var p = 10;
	var ap = (100 * D) / q;
	for (i = 0; i < p; i++) {
		var I, E, F;
		I = t.addProperty("ADBE Vector Shape - Group");
		I.name = "Shape Layer";
		E = I.property("ADBE Vector Shape");
		F = new Shape();
		F.vertices = [
			[0, -(ac / p) * (i + 1)],
			[0, -(ac / p) * (i + 1)]
		];
		F.inTangents = [
			[0, 0],
			[0, 0]
		];
		F.outTangents = [
			[0, 0],
			[0, 0]
		];
		F.closed = false;
		shapePathData2 = new Shape();
		shapePathData2.vertices = [
			[0, -(ac / p) * (i + 1)],
			[3000, -(ac / p) * (i + 1)]
		];
		shapePathData2.inTangents = [
			[0, 0],
			[0, 0]
		];
		shapePathData2.outTangents = [
			[0, 0],
			[0, 0]
		];
		shapePathData2.closed = false;
		E.setValueAtTime(i * 0.2, F);
		E.setValueAtTime(i * 0.2 + 0.2, shapePathData2);
		var u = Math.round((ap / p) * (i + 1));
		if (myData.settings.selectedLabel == "value") {
			u = Math.round((D / p) * (i + 1));
		}
		var z = s.layers.addText(u);
		z.shy = true;
		z.threeDLayer = true;
		var af = z.position;
		var m = z.opacity;
		var L = z.property("ADBE Text Properties").property("ADBE Text Document");
		var aH = L.value;
		aH.fontSize = 20;
		aH.font = "Arial";
		aH.fillColor = [1, 1, 1];
		aH.tracking = 10;
		aH.justification = ParagraphJustification.RIGHT_JUSTIFY;
		L.setValue(aH);
		z.Effects.addProperty("ADBE Fill");
		z.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Horizontal Line Color')('ADBE Color Control-0001');";
		af.setValue([940, 550 - (ac / p) * (i + 1), W]);
		z.property("ADBE Transform Group").property("ADBE Position").expression = "[transform.position[0],transform.position[1],thisComp.layer('Horizontal lines').transform.position[2]];";
		m.setValueAtTime(i * 0.2, 0);
		m.setValueAtTime(i * 0.2 + 0.2, 100);
		z.locked = true;
	}
	for (k = 0; k < myData.selectedColumnsOf.length; k++) {
		if (myData.selectedColumnsOf.length > 1) {
			var aa = "Column #" + (k + 1);
			var ae = X.Effects.addProperty("ADBE Color Control");
			var ab = hexToRgb(myData.chartColors.t3DBarChartColors.alternateColors[k]);
			ae.property("ADBE Color Control-0001").setValue(ab);
			ae.name = aa;
		}
		for (i = 0; i < G; i++) {
			var at = (100 * parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i])) / q;
			U = Math.ceil((ac * parseFloat(myData.dataColumns[myData.selectedColumnsOf[k]].rows[i])) / D);
			if (U == 0) {
				U = 1;
			}
			var an = ((myData.settings.animDuration - k * 0.3) / (2 * (G - 1))) * i + (k * 0.3);
			var ah = an + 0.5 * (myData.settings.animDuration - k * 0.3);
			if (myData.selectedColumnsOf.length == 1) {
				aa = "Data #" + (i + 1);
				var ae = X.Effects.addProperty("ADBE Color Control");
				var ab = hexToRgb(myData.dataColors[i]);
				ae.property("ADBE Color Control-0001").setValue(ab);
				ae.name = aa;
			}
			var ag = Math.floor(Q / (myData.selectedColumnsOf.length));
			var aB = s.layers.addSolid(hexToRgb(myData.dataColors[i]), "Side 1 of " + k + "-" + i, ag, U, 1, R);
			aB.threeDLayer = true;
			aB.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([ag, U, 0]);
			aB.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i) * N, O, 0]);
			aB.property("ADBE Transform Group").property("ADBE Position").expression = "[transform.position[0]+" + i + "*thisComp.layer('PARENT').effect('Gap Between Bars')('ADBE Slider Control-0001'),transform.position[1],transform.position[2]];";
			aB.property("ADBE Transform Group").property("ADBE Scale").expression = "[transform.scale[0]+thisComp.layer('PARENT').effect('Width of Bars')('ADBE Slider Control-0001'),transform.scale[1],transform.scale[2]+thisComp.layer('PARENT').effect('Depth of Bars')('ADBE Slider Control-0001')];";
			aB.Effects.addProperty("ADBE Fill");
			aB.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			aB.Effects.addProperty("ADBE Brightness & Contrast");
			aB.property("ADBE Effect Parade").property("ADBE Brightness & Contrast").property("ADBE Brightness & Contrast-0001").setValue(-20);
			aB.shy = true;
			var ay = s.layers.addSolid(hexToRgb(myData.dataColors[i]), "Side 2 of " + k + "-" + i, W, U, 1, R);
			ay.threeDLayer = true;
			ay.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0, U, 0]);
			ay.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i) * N, O, 0]);
			ay.property("ADBE Transform Group").property("ADBE Rotate Y").setValue(-90);
			ay.parent = aB;
			ay.shy = true;
			ay.Effects.addProperty("ADBE Fill");
			ay.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			var ax = s.layers.addSolid(hexToRgb(myData.dataColors[i]), "Side 3 of " + k + "-" + i, W, U, 1, R);
			ax.threeDLayer = true;
			ax.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([W, U, 0]);
			ax.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i) * N - ag, O, 0]);
			ax.property("ADBE Transform Group").property("ADBE Rotate Y").setValue(90);
			ax.parent = aB;
			ax.shy = true;
			ax.Effects.addProperty("ADBE Fill");
			ax.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			var aw = s.layers.addSolid(hexToRgb(myData.dataColors[i]), "Side 4 of " + k + "-" + i, ag, W, 1, R);
			aw.threeDLayer = true;
			aw.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([ag, W, 0]);
			aw.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i) * N, O - U, 0]);
			aw.property("ADBE Transform Group").property("ADBE Rotate X").setValue(-90);
			aw.parent = aB;
			aw.Effects.addProperty("ADBE Fill");
			aw.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			aw.Effects.addProperty("ADBE Brightness & Contrast");
			aw.property("ADBE Effect Parade").property("ADBE Brightness & Contrast").property("ADBE Brightness & Contrast-0001").setValue(-10);
			aw.shy = true;
			var av = s.layers.addSolid(hexToRgb(myData.dataColors[i]), "Side 5 of " + k + "-" + i, ag, U, 1, R);
			av.threeDLayer = true;
			av.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([ag, U, 0]);
			av.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i) * N, O, W + 0]);
			av.parent = aB;
			av.Effects.addProperty("ADBE Fill");
			av.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			av.shy = true;
			var au = s.layers.addSolid(hexToRgb(myData.dataColors[i]), "Side 6 of " + k + "-" + i, ag, W, 1, R);
			au.threeDLayer = true;
			au.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([ag, W, 0]);
			au.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i) * N, O, 0]);
			au.property("ADBE Transform Group").property("ADBE Rotate X").setValue(-90);
			au.parent = aB;
			au.Effects.addProperty("ADBE Fill");
			au.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			au.shy = true;
			aB.property("ADBE Transform Group").property("ADBE Position").setValue([P + (i + 1) * N + (myData.selectedColumnsOf.length - k) * ag, O, 0]);
			aB.property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(an, [100, 0, 100]);
			aB.property("ADBE Transform Group").property("ADBE Scale").setValueAtTime(ah, [100, 100, 100]);
			aB.locked = true;
			ay.locked = true;
			ax.locked = true;
			aw.locked = true;
			av.locked = true;
			au.locked = true;
			var Z = Math.min(20 + ag * 0.1, 30);
			if (k == (myData.selectedColumnsOf.length - 1)) {
				var aG = myData.dataNames[i];
				if (aG.length >= 6) {
					aG = aG.slice(0, 6) + "..";
				}
				var z = s.layers.addText(aG);
				z.shy = true;
				z.threeDLayer = true;
				var af = z.position;
				var m = z.opacity;
				var L = z.property("ADBE Text Properties").property("ADBE Text Document");
				var aH = L.value;
				aH.fontSize = Z;
				aH.font = "Arial-Black";
				aH.fillColor = hexToRgb(myData.chartColors.t3DBarChartColors.titleColor);
				aH.tracking = 10;
				aH.justification = ParagraphJustification.LEFT_JUSTIFY;
				L.setValue(aH);
				af.setValue([P + (i + 1) * N + (k - 1) * ag, O - 5, -30]);
				z.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(0);
				z.property("ADBE Transform Group").property("ADBE Rotate X").setValue(-90);
				z.Effects.addProperty("ADBE Fill");
				z.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Value Title Color')('ADBE Color Control-0001');";
				m.setValueAtTime(an, 0);
				m.setValueAtTime(ah, 100);
				z.property("ADBE Transform Group").property("ADBE Rotate Y").setValueAtTime(an, 120);
				z.property("ADBE Transform Group").property("ADBE Rotate Y").setValueAtTime(ah, 0);
				z.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([ag, 0, 0]);
				z.property("ADBE Transform Group").property("ADBE Position").expression = "[thisComp.layer('Side 1 of " + k + "-" + i + "').transform.position[0],thisComp.layer('Side 1 of " + k + "-" + i + "').transform.position[1],transform.position[2]-20];";
				z.locked = true;
			}
			Z = Math.min(ag * 0.6, 90);
			var A = "";
			if (myData.settings.selectedLabel == "value") {
				A = "" + myData.dataColumns[myData.selectedColumnsOf[k]].rows[i];
			} else {
				A = "" + (Math.round(at * 10) / 10) + "%";
			}
			var z = s.layers.addText(A);
			z.shy = true;
			z.threeDLayer = true;
			var af = z.position;
			var m = z.opacity;
			var L = z.property("ADBE Text Properties").property("ADBE Text Document");
			var aH = L.value;
			aH.fontSize = Z;
			aH.font = "Arial-Black";
			if (myData.selectedColumnsOf.length == 1) {
				aH.fillColor = hexToRgb(myData.dataColors[i]);
			} else {
				aH.fillColor = hexToRgb(myData.chartColors.t3DBarChartColors.alternateColors[k]);
			}
			aH.tracking = 10;
			aH.justification = ParagraphJustification.LEFT_JUSTIFY;
			L.setValue(aH);
			af.setValue([P + (i + 1) * N + (myData.selectedColumnsOf.length - k) * ag, O - 5, -30]);
			z.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(90);
			z.property("ADBE Transform Group").property("ADBE Rotate X").setValue(-90);
			m.setValueAtTime(an, 0);
			m.setValueAtTime(ah, 100);
			z.property("ADBE Transform Group").property("ADBE Rotate Y").setValueAtTime(an, 120);
			z.property("ADBE Transform Group").property("ADBE Rotate Y").setValueAtTime(ah, 0);
			z.property("ADBE Transform Group").property("ADBE Anchor Point").setValue([0, -ag, 0]);
			z.property("ADBE Transform Group").property("ADBE Position").expression = "[thisComp.layer('Side 1 of " + k + "-" + i + "').transform.position[0],thisComp.layer('Side 1 of " + k + "-" + i + "').transform.position[1],transform.position[2]-60];";
			z.locked = true;
			z.Effects.addProperty("ADBE Fill");
			z.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
		}
		var H = 147 + 30 * aj.length + 25;
		var n = 143 + 35 * k;
		if ((G > 5) && (myData.selectedColumnsOf.length > 1)) {
			H = 147;
			n = 210 + 35 * k;
		} else {
			if ((G > 5) && (myData.selectedColumnsOf.length == 1)) {
				H = 147;
				n = 190 + 35 * k;
			}
		}
		if (myData.selectedColumnsOf.length > 1) {
			var e = s.layers.addSolid([1, 1, 1], "Column Box " + k, 60, 15, 1, R);
			e.Effects.addProperty("ADBE Fill");
			e.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('" + aa + "')('ADBE Color Control-0001');";
			var c = e.position;
			var o = e.scale;
			var M = e.anchorPoint;
			M.setValue([0, 0]);
			c.setValue([H, n - 10]);
			o.setValueAtTime(0, [0, 100]);
			o.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [100, 100]);
			o.setTemporalEaseAtKey(2, [ar, ar, ar]);
			e.shy = true;
			e.locked = true;
		} else {
			var V = 50 + 25 * (myData.dataColumns[myData.selectedColumnsOf[0]].title.length);
			V = Math.min(V, 500);
			var e = s.layers.addSolid([1, 1, 1], "Column Box " + k, V, 34, 1, R);
			e.Effects.addProperty("ADBE Fill");
			e.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title BG Color')('ADBE Color Control-0001');";
			var c = e.position;
			var o = e.scale;
			var M = e.anchorPoint;
			M.setValue([0, 0]);
			c.setValue([H, n - 17]);
			o.setValueAtTime(0, [0, 100]);
			o.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [100, 100]);
			o.setTemporalEaseAtKey(2, [ar, ar, ar]);
			e.shy = true;
			e.locked = true;
		}
		var aE = myData.dataColumns[myData.selectedColumnsOf[k]].title;
		if (aE.length > 22) {
			aE = aE.slice(0, 19) + "...";
		}
		var z = s.layers.addText(aE.toUpperCase());
		var af = z.position;
		var az = z.anchorPoint;
		var m = z.opacity;
		az.setValue([0, -7]);
		var L = z.property("ADBE Text Properties").property("ADBE Text Document");
		var aH = L.value;
		aH.font = "Arial-BoldMT";
		if (myData.selectedColumnsOf.length > 1) {
			aH.fontSize = 16;
			af.setValueAtTime(0, [H - 30, n - 3]);
			af.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, [H + 70, n - 3]);
			af.setTemporalEaseAtKey(2, [ar], [aF]);
		} else {
			aH.fontSize = 18;
			af.setValue([H + 25, n]);
		}
		aH.tracking = 100;
		aH.justification = ParagraphJustification.LEFT_JUSTIFY;
		L.setValue(aH);
		z.shy = true;
		z.Effects.addProperty("ADBE Fill");
		z.property("ADBE Effect Parade").property("ADBE Fill").property("ADBE Fill-0002").expression = "thisComp.layer('PARENT').effect('Title Color')('ADBE Color Control-0001');";
		m.setValueAtTime(0, 0);
		m.setValueAtTime((myData.settings.animDuration) * 0.3 + k * 0.5, 100);
		z.parent = X;
		z.locked = true;
	}
	var am = t.addProperty("ADBE Vector Graphic - Stroke");
	am.property("ADBE Vector Stroke Width").setValue(1);
	am.property("ADBE Vector Stroke Color").expression = "thisComp.layer('PARENT').effect('Horizontal Line Color')('ADBE Color Control-0001')";
	am.property("ADBE Vector Stroke Line Cap").setValue(2);
	a.property("ADBE Transform Group").property("ADBE Scale").expression = "[transform.scale[0]+thisComp.layer('PARENT').effect('Horizontal Line Length')('ADBE Slider Control-0001'),transform.scale[1],transform.scale[2]];";
	a.shy = true;
	a.locked = true;
	var ao = s.layers.addCamera("Camera", [1400, 200]);
	ao.property("ADBE Transform Group").property("ADBE Position").setValue([-187, -1391, -2016]);
	var ar = new KeyframeEase(0.5, 95);
	var aF = new KeyframeEase(0.75, 5);
	var al = Math.min(3, (myData.settings.animDuration + 0.5));
	ao.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(0, [2531, -686, -3548]);
	ao.property("ADBE Transform Group").property("ADBE Position").setValueAtTime(al, [70.7, -1195.8, -2795.4]);
	ao.property("ADBE Transform Group").property("ADBE Anchor Point").setValueAtTime(0, [1587, 194, -92]);
	ao.property("ADBE Transform Group").property("ADBE Anchor Point").setValueAtTime(al, [1702.5, 111.3, -136]);
	ao.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(1, [ar], [aF]);
	ao.property("ADBE Transform Group").property("ADBE Position").setTemporalEaseAtKey(2, [ar], [aF]);
	ao.property("ADBE Transform Group").property("ADBE Anchor Point").setTemporalEaseAtKey(1, [ar], [aF]);
	ao.property("ADBE Transform Group").property("ADBE Anchor Point").setTemporalEaseAtKey(2, [ar], [aF]);
	s.hideShyLayers = true;
	if (parseFloat(app.version) >= 11) {
		s.openInViewer();
	}
	app.endUndoGroup();
}

function totalValue(c, e) {
	var d = 0;
	var a = Math.min(myData.dataNames.length, e);
	for (i = 0; i < a; i++) {
		d += parseFloat(myData.dataColumns[myData.selectedColumnsOf[c]].rows[i]);
	}
	return d;
}

function hexToRgb(a) {
	a = a.replace("#", "");
	r = parseInt(a.substring(0, a.length / 3), 16);
	g = parseInt(a.substring(a.length / 3, 2 * a.length / 3), 16);
	b = parseInt(a.substring(2 * a.length / 3, 3 * a.length / 3), 16);
	result = [r / 255, g / 255, b / 255];
	return result;
}

function changeCoord(c) {
	var a = new Array;
	a[0] = c[0] - 960;
	a[1] = c[1] - 540;
	return a;
}