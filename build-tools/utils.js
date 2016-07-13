var glob = require('glob');
var colors = require('colors/safe');
var fs = require('fs');

module.exports = {
	/**
	 * Tests error
	 *
	 * @param err
     */
	testError: function(err) {
		if (err) {
			console.log(colors.red(err));
			throw Error();
		}
	},

	/**
	 * Find files based on glob pattern
	 *
	 * @param globs
	 * @param callback
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
	},

	/**
	 * Reads a file
	 *
	 * @param fileName
	 * @returns {Promise}
     */
	readFile: function( fileName ) {
		return new Promise(function(resolve, reject) {
			fs.readFile(fileName, 'utf8', function(err, data) {

				if (err) {
					reject('Error reading file');
					return;
				}

				resolve(data);
			});

		});
	}
};
