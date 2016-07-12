'use strict';

var npmChecker = require('./npm-checker');
var fileChecker = require('./file-checker');
var npmModulesToCheck = require('../npm-modules.json');
var filesToCheck = require('../files.json');

module.exports = {
	/**
	 * Reads a file
	 *
	 * @param fileName
	 * @returns {Promise}
	 */
	check: function(repositoryDir, install) {
		return new Promise(function(resolve, reject) {
			npmChecker.packageJsonFile = repositoryDir + '/package.json';
			npmChecker.install = install;

			fileChecker.repositoryDir = repositoryDir;
			fileChecker.install = install;

			npmChecker.checkAllModules(npmModulesToCheck.slice(0)).then(function() {
				fileChecker.checkAllFiles(filesToCheck.slice(0)).then(function() {
					resolve();
				}).catch(function(err) {
					reject('Error checking repository files ' + err);
				});
			}).catch(function(err) {
				reject('Error checking NPM repository modules ' + err);
			});
		});
	}
};
