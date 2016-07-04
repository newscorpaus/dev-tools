'use strict';

var utils = require('../build-tools/utils');
var colors = require('colors/safe');

module.exports = {
	/**
	 *
	 */
	packageJsonFile: null,
	/**
	 * Check if an NPM module is installed
	 *
	 * @param packageJson
	 * @param npmModule
	 * @returns {Promise}
     */
	checkModule: function(npmModule) {

		var self = this;

		if( null == this.packageJsonFile ) {
			console.log(colors.red('No package.json file provided'));
		}

		return new Promise(function(resolve, reject) {

			utils.readFile(self.packageJsonFile).then(function( jsonContents ) {

				if( 0 < jsonContents.indexOf(npmModule.npmKey) ) {
					console.log(colors.red(npmModule.warning));
					console.log(colors.cyan('    ' + npmModule.prompt + '\n'));
				}

				resolve();

			}).catch(function(err) {
				console.log(colors.red(err));
				reject();
			});
		});
	},
	/**
	 *
	 * @param npmModule
	 * @param index
	 * @returns {*}
     */
	processNextModule: function( npmModule, index ) {

		var self = this;

		if (undefined === npmModule[index]) {
			return true;
		}

		return this.checkModule( npmModule[index]).then(function() {
			return self.processNextModule(npmModule, (index + 1));
		}).catch(function(err) {
			console.log(colors.red(err));
		});
	}
};
