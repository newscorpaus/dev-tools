'use strict';

var colors = require('colors/safe');

module.exports = {
	/**
	 * Logs array
	 */
	logs: [],

	/**
	 * Output immediately
	 */
	outputOnLog: false,

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

		if( this.outputOnLog ) {
			this.output();
		}
	},

	/**
	 * Log an error message
	 *
	 * @param message
	 * @param level
	 */
	logError: function(message) {
		this.log(message, 'error');
	},

	/**
	 * Log a debug message
	 *
	 * @param message
	 * @param level
	 */
	logDebug: function(message) {
		this.log(message, 'debug');
	},

	/**
	 * Log a warning message
	 *
	 * @param message
	 * @param level
	 */
	logWarning: function(message) {
		this.log(message, 'warning');
	},

	/**
	 * Check if an error exists in logs
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
	 * Get color from error level
	 *
	 * @param level
	 * @param string color
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
	 * Output all log messages
	 */
	output: function() {
		var self = this;
		this.logs.forEach(function(log) {
			console.log(colors[self.getColorFromErrorLevel(log.level)](log.message + '\n'));
		});

		this.logs = [];

	}
};
