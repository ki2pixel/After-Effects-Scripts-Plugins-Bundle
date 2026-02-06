/* global $ */
if (typeof $.jt === 'undefined')
	$.jt = {};

$.jt.pio_ = {
	//Evaluate a file and catch the exception.
	evalFile : function(path) {
		try {
			$.evalFile(path);
		} catch (e) {
			alert(e.toString());
		}
	},
	// Evaluate all the files in the given folder
	evalFiles: function (jsxFolderPath) {
		var folder = new Folder(jsxFolderPath);
		if (folder.exists) {
			var jsxFiles = folder.getFiles('*.jsxbin');
			jsxFiles = jsxFiles.concat(folder.getFiles('*.jsx'));
			for (var i = 0; i < jsxFiles.length; i++) {
				var jsxFile = jsxFiles[i];
				$.jt.pio_.evalFile(jsxFile);
			}
		}
	}
};
