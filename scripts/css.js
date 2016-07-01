'use strict';

var utils = require('../build-tools/utils');
var css = require('../build-tools/css');
var path = require('path');

utils.findFiles( ['./examples/*.scss'], function(obj) {
	var distFilename = path.basename(obj.file).replace('.scss', '.css');
	var distDirectory = path.dirname(obj.file) + '/dist/';

	css.scssToCss(obj.file, distDirectory + distFilename, { minify: true });
} );
