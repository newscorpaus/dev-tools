'use strict';

var argv = require('argv');
var logger = require('./util/logger');
var checkRepo = require('./util/check-repo');

var argOptions = {
	name: 'Dev tools checker',
	type: 'boolean'
};

var args = argv.option(argOptions).run();
args = process.argv.slice(2);
var repositoryDir = args[0];

if (undefined == args[0]) {
	return logger.logError('Please pass an argument to the path of the repository');
}

logger.logDebug('Checking repository: [' + repositoryDir + ']...');

// Check a single repo
checkRepo.check(repositoryDir).catch(function(err) {
	logger.logError(err);
});
