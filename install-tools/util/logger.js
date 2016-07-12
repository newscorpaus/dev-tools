'use strict';

var colors = require('colors/safe');

module.exports = {
	/**
	 *
	 */
	logs: [],

	/**
	 * Log a message
	 *
	 * @param message
	 * @param level
     */
	log: function(message, level) {

		var log = {
			message: message,
			level: level
		};

		this.logs.push(log);
	},

	/**
	 * Log a message
	 *
	 * @param message
	 * @param level
	 */
	logError: function(message) {
		this.log(message, 'error');
	},

	/**
	 * Log a message
	 *
	 * @param message
	 * @param level
	 */
	logDebug: function(message) {
		this.log(message, 'debug');
	},

	/**
	 * Log a message
	 *
	 * @param message
	 * @param level
	 */
	hasError: function() {

		var hasError = false;

		this.logs.forEach(function(log) {
			if('error' == log.level) {
				hasError = true;
			}
		});

		return hasError;
	},

	/**
	 * Log a message
	 *
	 * @param message
	 * @param level
	 */
	getColorFromErrorLevel: function(level) {
		switch( level ) {
			case 'error':
				return 'red';
				break; // eslint-disable-line

			case 'warning':
				return 'yellow';
				break; // eslint-disable-line

			case 'debug':
				return 'cyan';
				break; // eslint-disable-line
		}

		return 'green';
	},

	/**
	 * Log a message
	 *
	 * @param message
	 * @param level
	 */
	output: function() {
		var self = this;
		this.logs.forEach(function(log) {
			console.log(colors[self.getColorFromErrorLevel(log.level)](log.message + '\n'));
		});

		this.logs = [];

	}
};
