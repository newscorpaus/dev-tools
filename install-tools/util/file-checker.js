'use strict';

var colors = require('colors/safe');
var fs = require('fs.extra');
var path = require('path');
var prompt = require('prompt');

module.exports = {

	/**
	 * Repository directory
	 */
	repositoryDir: null,

	/**
	 * Whether to trigger install processes
	 */
	install: false,

	/**
	 * Check if file exists/installed
	 *
	 * @param fileObject
	 * @returns {Promise}
	 */
	checkFile: function(fileObject) {

		var self = this;
		var filename = self.repositoryDir + '/' + fileObject.filename;

		return new Promise(function(resolve, reject) {
			fs.exists(filename, function(err) {
				if (true !== err) {
					console.log(colors.red(fileObject.warning + '\n'));

					if (false === fileObject.prompt) {
						resolve();
						return;
					}

					if (true !== self.install) {
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

							fs.copy(path.basename(filename), filename, { replace: false }, function(err) {
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
					console.log(colors.green('[x] ' + path.basename(filename) + ' already installed...\n'));
					resolve();
				}
			});

		});
	},

	/**
	 *
	 * @param files
	 * @returns {*}
	 */
	checkAllFiles: function(files) {

		var self = this;

		if (0 == files.length) {
			return;
		}

		return this.checkFile(files.shift()).then(function() {
			return self.checkAllFiles(files);
		}).catch(function(err) {
			console.log(colors.red(err));
		});
	}

};
