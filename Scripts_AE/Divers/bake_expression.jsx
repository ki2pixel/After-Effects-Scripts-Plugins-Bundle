{

	function convertToKeyframes(theProperty) {
		if (theProperty.canSetExpression && theProperty.expressionEnabled) {
			theProperty.selected = true;
			app.executeCommand(app.findMenuCommandId("Convert Expression to Keyframes"));
			theProperty.selected = false;
		}
	}


	var myComp = app.project.activeItem;
	if (myComp && myComp instanceof CompItem) {
		var myLayer;
		var myProperty;
		app.beginUndoGroup("convert expressions");
		for (var i = 1; i <= myComp.numLayers; i++) {
			myLayer = myComp.layer(i);
			try {
				myProperty = myLayer.property("position");
				convertToKeyframes(myProperty);
			} catch (err) {}
			try {
				myProperty = myLayer.property("anchorPoint");
				convertToKeyframes(myProperty);
			} catch (err) {}
			try {
				myProperty = myLayer.property("rotation");
				convertToKeyframes(myProperty);
			} catch (err) {}
			try {
				myProperty = myLayer.property("scale");
				convertToKeyframes(myProperty);
			} catch (err) {}
			try {
				myProperty = myLayer.property("opacity");
				convertToKeyframes(myProperty);
			} catch (err) {}
		}
		app.endUndoGroup();
	}

}