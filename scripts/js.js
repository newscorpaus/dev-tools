'use strict';

var utils = require('../build-tools/utils');
var js = require('../build-tools/js');
var path = require('path');

utils.findFiles(['./examples/*.js'], function(obj) {
	console.log(obj);
	var distFilename = path.basename(obj.file);
	var distDirectory = path.dirname(obj.file) + '/dist/';

	console.log(distDirectory, distFilename);
	js.process(obj.file);// , distDirectory + distFilename, {  });
});
