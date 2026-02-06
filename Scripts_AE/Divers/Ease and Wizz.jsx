#target aftereffects

// Ease and Wizz 2.0.4
// Ian Haigh 2013 (mail@ianhaigh.com)

// An After Effects adaptation of Robert Penner's easing equations.
// Installation and usage at http://aescripts.com/ease-and-wizz/
// (apologies to Jarvis Cocker)

var ease_and_wizz = new Object(); // put all global variables on this object to avoid namespace clashes

ease_and_wizz.EASING_FOLDER = 'easingExpressions';
ease_and_wizz.CLEAR_EXPRESSION_BTN = false; // this adds a button to the palette, "clear", that deletes expressions on all selected properties. Off by default.
ease_and_wizz.easingEquation = "";
ease_and_wizz.palette = new Object();

// palette controls
ease_and_wizz.easingList = new Object();
ease_and_wizz.typeList = new Object();
ease_and_wizz.keysList = new Object();
ease_and_wizz.curvaceousCheckbox = new Object();

// define values for the controls
ease_and_wizz.keysLookup = new Object();
ease_and_wizz.keysLookup['-all'] = 'All';
ease_and_wizz.keysLookup['-startEnd'] = 'Start and end';
ease_and_wizz.keysLookup['-startOnly'] = 'Start only';

ease_and_wizz.inOutLookup = new Object();
ease_and_wizz.inOutLookup['inOut'] = 'In + Out';
ease_and_wizz.inOutLookup['in'] = 'In';
ease_and_wizz.inOutLookup['out'] = 'Out';

ease_and_wizz.easingTypesAry = ['Expo', 'Circ', 'Quint', 'Quart', 'Quad', 'Sine', '-', 'Back', 'Bounce', 'Elastic'];

//ease_and_wizz.activeItem;
//ease_and_wizz.selectedProperties;

function ew_getHashValues(hash) { // {{{
	var ary = new Array();
	for (k in hash) {
		ary.push(hash[k]);
	}

	return ary;
} // }}}

function ew_getHashKeys(hash) { // {{{
	var ary = new Array();
	for (k in hash) {
		ary.push(k);
	}

	return ary;
} // }}}

function ew_main(thisObj) { //{{{
	ew_createPalette(thisObj);
} //}}}

function ew_getPathToEasingFolder() { // {{{
	// much simpler, thanks Jeff
	var folderObj = new Folder((new File($.fileName)).path + "/" + ease_and_wizz.EASING_FOLDER);
	return folderObj;

} // }}}

function ew_createPalette(thisObj) { //{{{
	var LIST_DIMENSIONS = [0, 0, 120, 15];
	var STATIC_TEXT_DIMENSIONS = [0, 0, 60, 15];

	ease_and_wizz.palette = (thisObj instanceof Panel) ? thisObj : new Window("palette", "Easing", undefined, {
		resizeable: true
	});
	ease_and_wizz.palette.margins = 6;
	ease_and_wizz.palette.alignChildren = 'left';

	// fix the text display in the popup menu - thanks Jeff Almasol
	var winGfx = ease_and_wizz.palette.graphics;
	var darkColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [0, 0, 0], 1);
	var lightColorBrush = winGfx.newPen(winGfx.BrushType.SOLID_COLOR, [1, 1, 1], 1);

	// popup menus
	// {{{

	// "easing" menu

	var easingGrp = ease_and_wizz.palette.add('group', undefined, 'Easing group');
	easingGrp.add('statictext', STATIC_TEXT_DIMENSIONS, 'Easing:');

	ease_and_wizz.easingList = easingGrp.add('dropdownlist', LIST_DIMENSIONS, ease_and_wizz.easingTypesAry);
	ease_and_wizz.easingList.helpTip = "Choose the type of easing here. They're arranged from most dramatic (expo) to least dramatic (sine), with “special effects” (back, bounce, elastic) at the end.";
	ease_and_wizz.easingList.selection = 'expo';
	ease_and_wizz.easingList.graphics.foregroundColor = darkColorBrush;


	// "type" menu

	var typeGrp = ease_and_wizz.palette.add('group', undefined, 'Type group');
	typeGrp.add('statictext', STATIC_TEXT_DIMENSIONS, 'Type:');

	ease_and_wizz.typeList = typeGrp.add('dropdownlist', LIST_DIMENSIONS, ew_getHashValues(ease_and_wizz.inOutLookup));
	ease_and_wizz.typeList.selection = 'In + Out';
	ease_and_wizz.typeList.helpTip = "Whether the values ease in, out, or both.";
	ease_and_wizz.typeList.graphics.foregroundColor = darkColorBrush;


	// "keys" menu

	var keysGrp = ease_and_wizz.palette.add('group', undefined, 'Keys group');
	keysGrp.add('statictext', STATIC_TEXT_DIMENSIONS, 'Keys:');

	ease_and_wizz.keysList = keysGrp.add('dropdownlist', LIST_DIMENSIONS, ew_getHashValues(ease_and_wizz.keysLookup));
	ease_and_wizz.keysList.graphics.foregroundColor = darkColorBrush;
	ease_and_wizz.keysList.helpTip = "When there’s more than two keyframes, this affects whether it eases ALL of the keyframes (the default), the first and last two, or only the first two. Other keyframes will behave as usual.";
	ease_and_wizz.keysList.selection = ew_getHashValues(ease_and_wizz.keysLookup)[0]; // select the first item

	// }}}

	// curvaceous checkbox
	var curvaceousGrp = ease_and_wizz.palette.add('group', undefined, 'Curvaceous group');
	ease_and_wizz.curvaceousCheckbox = ease_and_wizz.palette.add('checkbox', undefined, 'Curvaceous');
	ease_and_wizz.curvaceousCheckbox.helpTip = "Turn this on if you’re easing a mask shape or shape path. Note that due to the way it works, Curvaceous automatically disables the “special” easing types, back, bounce, and elastic.";

	ease_and_wizz.curvaceousCheckbox.value = false;

	// update the panel
	ease_and_wizz.curvaceousCheckbox.onClick = function() { // {{{
		if (this.value) {
			// it wasn't checked; remove the options that aren't compatible with Curvaceous

			// before removing options, make sure a valid easing type remains selected
			var curveType = ease_and_wizz.easingList.selection.toString();
			if (curveType == 'Elastic' || curveType == 'Back') ease_and_wizz.easingList.selection = 'Expo';

			// now take 'em away
			ease_and_wizz.easingList.remove("Elastic");
			ease_and_wizz.easingList.remove("Back");
			ease_and_wizz.keysList.remove("Start only");

		} else {
			// it was checked, add the missing items
			ease_and_wizz.easingList.add("item", "Elastic");
			ease_and_wizz.easingList.add("item", "Back");
			ease_and_wizz.keysList.add("item", "Start only");
		}
	} // }}}


	// apply button
	// {{{

	var buttonGrp = ease_and_wizz.palette.add('group', undefined, 'Button group');
	buttonGrp.add('statictext', STATIC_TEXT_DIMENSIONS, '');

	// standard buttons
	if (ease_and_wizz.CLEAR_EXPRESSION_BTN) {
		var ew_clearExpressionsBtn = buttonGrp.add('button', undefined, 'Clear expressions');
		ew_clearExpressionsBtn.onClick = ew_clearExpressions;
	}

	// TODO: add a help button one of these days
	// var easewizz_helpBtn = buttonGrp.add('button', undefined, '?');

	////////////////////
	// apply button
	////////////////////

	var applyBtn = buttonGrp.add('button', undefined, 'Apply');
	applyBtn.onClick = ew_applyExpressions;

	// }}}

	if (ease_and_wizz.palette instanceof Window) {
		ease_and_wizz.palette.show();
	} else {
		ease_and_wizz.palette.layout.layout(true);
	}

} //}}}

function ew_trace(s) { // for debugging
	//{{{
	//$.writeln(s); // writes to the ExtendScript interface
	writeLn(s); // writes in the AE info window
} //}}}

function ew_readFile(filename) { //{{{
	var easing_folder = ew_getPathToEasingFolder();
	var file_handle = new File(easing_folder.fsName + '/' + filename);

	if (!file_handle.exists) {
		throw ("I can't find this file: '" + filename + "'. \n\nI looked in here: '" + easing_folder.fsName + "'. \n\nPlease refer to the installation guide and try installing again, or go to:\n\nhttp://aescripts.com/ease-and-wizz/\n\nfor more info.");
	}

	try {
		file_handle.open('r');
		var the_code = file_handle.read();
	} catch (e) {
		throw ("I couldn't read the easing equation file: " + e);
	} finally {
		file_handle.close();
	}

	return (the_code);
} //}}}

function ew_applyExpressions() { // decide what external file to load
	// {{{


	if (!ew_canProceed()) {
		return false;
	}

	app.beginUndoGroup("Ease and Wizz");


	// defaults
	var easingType = 'inOut';
	var easeandwizzOrCurvaceous = "-easeandwizz";
	var keyframesToAffect = "-allKeys";

	// loop through the two menu objects and see what the user's selected

	// easeAndWizz, or curvaceous?
	if (ease_and_wizz.curvaceousCheckbox.value) easeandwizzOrCurvaceous = "-curvaceous";

	// which keys should be affected?
	for (i in ease_and_wizz.keysLookup) {
		if (ease_and_wizz.keysLookup[i] == ease_and_wizz.keysList.selection.toString()) {
			keyframesToAffect = i;
		}
	}

	// then, should the expression be In, Out, or Both?
	for (i in ease_and_wizz.inOutLookup) {
		if (ease_and_wizz.inOutLookup[i] == ease_and_wizz.typeList.selection.toString()) {
			easingType = i;
		}
	}

	var curveType = ease_and_wizz.easingList.selection.toString();
	var fileToLoad = "";

	// very hacky, sorry
	if (curveType == "AE Expo") {
		curveType = "aeExpo";
		fileToLoad = curveType + ".js";
	} else {
		fileToLoad = easingType + curveType + easeandwizzOrCurvaceous + keyframesToAffect + '.js';
	}

	try {
		ease_and_wizz.easingEquation = ew_readFile(fileToLoad);
	} catch (e) {
		Window.alert(e);
		return false;
	}

	ew_setProps(ease_and_wizz.easingEquation);
	app.endUndoGroup();
} // }}}

function ew_clearExpressions() { //{{{
	// TODO : "Object is invalid"
	// TODO : "null is not an object"
	var selectedProperties = activeItem.selectedProperties;
	for (var f in selectedProperties) {
		var currentProperty = selectedProperties[f];
		if (!currentProperty.canSetExpression) {
			continue;
		}
		currentProperty.expression = '';
	}
} //}}}

function ew_setProps(expressionCode) { //{{{
	var selectedProperties = app.project.activeItem.selectedProperties;

	for (var f in selectedProperties) {
		var currentProperty = selectedProperties[f];

		if ((currentProperty.propertyValueType == PropertyValueType.SHAPE) && !ease_and_wizz.curvaceousCheckbox.value) {
			alert("It looks like you have a Mask Path selected. To apply Ease and Wizz to a Mask Path, select the ‘Curvaceous’ checkbox and try again.");
			continue;
		}

		if (!currentProperty.canSetExpression) {
			continue;
		} // don't do anything if we can't set an expression
		if (currentProperty.numKeys < 2) {
			continue
		} // likewise if there aren't at least two keyframes

		currentProperty.expression = expressionCode;
	}
} //}}}

function ew_canProceed() { // {{{
	var activeItem = app.project.activeItem;
	if (activeItem === null) {
		Window.alert("Select a keyframe or two.");
		return false;
	}

	return true;
} // }}}

ew_main(this);