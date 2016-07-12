'use strict';

var utils = require('../../build-tools/utils');
var logger = require('../util/logger');

module.exports = {

	/**
	 * Link to package file
	 */
	packageJsonFile: null,

	/**
	 * Whether to trigger install processes
	 */
	install: false,

	/**
	 * Check if an NPM module is installed
	 *
	 * @param npmModule
	 * @returns {Promise}
     */
	checkModule: function(npmModule) {

		var self = this;

		return new Promise(function(resolve, reject) {

			if( null == self.packageJsonFile ) {
				reject('No package.json file provided');
				return;
			}

			utils.readFile(self.packageJsonFile).then(function( jsonContents ) {

				if( 0 > jsonContents.indexOf(npmModule.npmKey) ) {

					if( 'error' == npmModule.errorLevel ) {
						logger.logError(npmModule.warning);
						if (true === self.install) {
							logger.logDebug('    ' + npmModule.prompt);
						}
					} else {
						logger.logWarning(npmModule.warning);
					}
				} else {
					logger.log('[x] ' + npmModule.name + ' npm package exist');
				}

				resolve();

			}).catch(function() {
				reject('[x] Could not read/find package.json');
			});
		});
	},

	/**
	 *
	 * @param npmModules
	 * @returns {*}
     */
	checkAllModules: function( npmModules ) {

		var self = this;

		if( 0 === npmModules.length ) {
			return;
		}

		return this.checkModule( npmModules.shift() ).then(function() {
			return self.checkAllModules(npmModules);
		}).catch(function(err) {
			logger.logError(err);
		});
	}
};
