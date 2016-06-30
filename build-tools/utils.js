var glob = require('glob');
var chalk = require('chalk');

module.exports = {
	/**
	 * Higlights an error and ensures an Error is thrown so that the build script exits in shell.
	 * It assumes {@param err} indicates an error
	 *
	 * @param {*} err The error indicator
	 */
	testError: function(err) {
		if (err) {
			console.error(chalk.bgRed.black(err));
			throw Error();
		}
	},

	/**
	 * Higlights an error and ensures an Error is thrown so that the build script exits in shell.
	 * It assumes {@param err} indicates an error
	 *
	 * @param {*} err The error indicator
	 */
	findFiles: function( globs, callback ) {
		var self = this;

		for( var index in globs ) {

			glob(globs[index], null, function(err, files) {

				self.testError(err);

				files.forEach(function(fileRef) {
					callback({ file: fileRef });
				});
			});

		}
	}
};
