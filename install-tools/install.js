'use strict';

var argv = require('argv');
var logger = require('./util/logger');
var npmChecker = require('./util/npm-checker');
var checkRepo = require('./util/check-repo');

// Ensure all logs are outputted immediately
logger.outputOnLog = true;

var argOptions = {
	name: 'Dev tools installer',
	type: 'boolean'
};

var args = argv.option(argOptions).run();
args = process.argv.slice(2);
var repositoryDir = args[0];

if (undefined == args[0]) {
	return logger.logError('Please pass an argument to the path of the repository');
}

logger.logDebug('Setting up repository: [' + repositoryDir + ']...');

// Setup package.json
npmChecker.packageJsonFile = repositoryDir + 'package.json';

// Check a single repo
checkRepo.check(repositoryDir, true).catch(function(err) {
	logger.logError(err);
});
