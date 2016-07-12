'use strict';

var logger = require('../util/logger');
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
					logger.logError(fileObject.warning);

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
							logger.log('    installing...');

							fs.copy(path.basename(filename), filename, { replace: false }, function(err) {
								if (err) {
									logger.logError(err);
									reject();
								} else {
									resolve();
								}
							});
						} else {
							logger.logDebug('    skipping...');
							resolve();
						}
					});
				} else {
					logger.log('[x] ' + path.basename(filename) + ' already installed...');
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
			logger.logError(err);
		});
	}

};
