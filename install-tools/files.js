'use strict';

var colors = require('colors/safe');
var fs = require('fs.extra');
var path = require('path');
var prompt = require('prompt');

module.exports = {

	/**
	 * Check if file exists/installed
	 *
	 * @param fileObject
	 * @returns {Promise}
	 */
	checkFile: function(fileObject) {

		return new Promise(function(resolve, reject) {
			fs.exists(fileObject.filename, function(err) {
				if (true !== err) {
					console.log(colors.red(fileObject.warning));

					if( false === fileObject.prompt ) {
						resolve();
						return;
					}

					prompt.start({
						message: ' - ',
						delimiter: '  '
					});

					var property = {
						name: 'yesno',
						message: fileObject.prompt,
						validator: /y[es]*|n[o]?/,
						warning: 'Please respond yes or no',
						default: 'no'
					};

					prompt.get(property, function(err, result) {
						if ('yes' == result.yesno) {
							console.log(colors.green('    installing...'));

							fs.copy(path.basename(fileObject.filename), fileObject.filename, { replace: false }, function(err) {
								if (err) {
									console.log(colors.red(err));
									reject();
								} else {
									resolve();
								}
							});
						} else {
							console.log(colors.cyan('    skipping...'));
							resolve();
						}
					});
				} else {
					console.log(colors.green('[x] ' + path.basename(fileObject.filename) + ' already installed...\n'));
					resolve();
				}
			});

		});
	},
	/**
	 *
	 * @param npmModule
	 * @param index
	 * @returns {*}
	 */
	processNextFile: function(filesToCheck, index) {

		var self = this;

		if (undefined === filesToCheck[index]) {
			return;
		}

		this.checkFile(filesToCheck[index]).then(function() {
			self.processNextFile(filesToCheck, (index + 1));
		}).catch(function(err) {
			console.log(colors.red(err));
		});
	}
};
