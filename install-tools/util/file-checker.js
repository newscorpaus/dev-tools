'use strict';

var logger = require('../util/logger');
var utils = require('../../build-tools/utils');
var fs = require('fs.extra');
var path = require('path');
var prompt = require('prompt');
// var jsdiff = require('diff');

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
	checkFileExists: function(filename) {
		return utils.readFile(filename).then(function() {
			logger.log('[x] ' + path.basename(filename) + ' already installed...');
		});
	},

	/**
	 * Check file diff
	 *
	 * @param filename
	 * @returns {Promise}
	 */
	checkFileDiff: function(filename) {
		if( '.stylelintrc' != path.basename(filename) ) {
			return;
		}

		// var localFile;
		// var remoteFile;

		// Promise.all([
			// utils.readFile( filename).then(function(data){
				// console.log('File 1 done ', path.basename(filename), data.length);
				// localFile = data;
			// }), utils.readFile( path.basename(filename)).then(function(data){
				// console.log('File 2 done ', path.basename(filename), data.length);
				// remoteFile = data;
			// })]).then(value => {
				// console.log('one', localFile, remoteFile);
				// var diff = jsdiff.diffLines(localFile, remoteFile);
				// console.log(diff);
				// diff.forEach(function(part){
					// console.log(part);

					// process.stderr.write(part.value[color]);
				// });

			// }, function(reason) {
			//	console.log('EEEEEE');
			// });
	},

	/**
	 * Check file ok
	 *
	 * @param fileObject
	 * @returns {Promise}
	 */
	checkFile: function(fileObject) {

		var self = this;
		var filename = self.repositoryDir + '/' + fileObject.filename;

		return new Promise(function(resolve, reject) {
			self.checkFileExists(filename).then(function() {
				// self.checkFileDiff(filename).then(function() {
				// 	resolve();
				// });
				resolve();

			}).catch(function() {
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
