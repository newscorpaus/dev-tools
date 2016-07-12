'use strict';

var utils = require('../build-tools/utils');
var colors = require('colors/safe');

module.exports = {
	/**
	 *
	 */
	packageJsonFile: null,

	/**
	 *
	 */
	install: false,

	/**
	 * Check if an NPM module is installed
	 *
	 * @param packageJson
	 * @param npmModule
	 * @returns {Promise}
     */
	checkModule: function(npmModule) {

		var self = this;
		return new Promise(function(resolve, reject) {

			if( null == self.packageJsonFile ) {
				//console.log(colors.red('No package.json file provided'));
				reject('No package.json file provided');
				return;
			}

			utils.readFile(self.packageJsonFile).then(function( jsonContents ) {

				if( 0 > jsonContents.indexOf(npmModule.npmKey) ) {

					if( 'error' == npmModule.errorLevel ) {
						console.log(colors.red(npmModule.warning));
						if (true === self.install) {
							console.log(colors.cyan('    ' + npmModule.prompt + '\n'));
						} else {
							console.log('');
						}
					} else {
						console.log(colors.yellow(npmModule.warning + '\n'));
					}
				} else {
					console.log(colors.green('[x] ' + npmModule.name + ' npm package exists\n'));
				}

				resolve();

			}).catch(function(err) {
				reject('[x] Could not read/find package.json');
			});
		});
	},

	/**
	 *
	 * @param npmModule
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
			console.log(colors.red(err));
		});
	}
};
