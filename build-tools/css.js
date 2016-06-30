var sass = require('node-sass');
var fs = require('fs-extra');
var utils = require('./utils');
var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');

module.exports = {
	/**
	 * Higlights an error and ensures an Error is thrown so that the build script exits in shell.
	 * It assumes {@param err} indicates an error
	 *
	 * @param {*} err The error indicator
	 */
	scssToCss: function(scssFile, cssFile, options) {
		options.file = scssFile;
		options.sourceComments = true;

		if (options.minify) {
			options.outputStyle = 'compressed';
			options.sourceComments = false;
		}

		sass.render(options, function(err, out) {
			utils.testError(err);

			fs.ensureFileSync(cssFile); // Create the specified dirs and an empty file

			console.log('--- Wrote css to --- ' + cssFile);

			postcss([ autoprefixer ]).process(out.css).then(function(result) {
				result.warnings().forEach(function(warn) {
					console.warn(warn.toString());
				});
				fs.writeFile(cssFile, result.css, function(err) {
					utils.testError(err);
				});
			});
		});
	}
};



