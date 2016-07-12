'use strict';

var argv = require('argv');
var colors = require('colors/safe');
var npmChecker = require('./util/npm-checker');
var checkRepo = require('./util/check-repo');

var argOptions = {
	name: 'Dev tools installer',
	type: 'boolean'
};

var args = argv.option(argOptions).run();
args = process.argv.slice(2);
var repositoryDir = args[0];

if (undefined == args[0]) {
	return console.log(colors.red('Please pass an argument to the path of the repository'));
}

console.log(colors.cyan('Setting up repository: [' + repositoryDir + ']...\n'));

// Setup package.json
npmChecker.packageJsonFile = repositoryDir + 'package.json';

// Check a single repo
checkRepo.check(repositoryDir, true).catch(function(err) {
	console.log(colors.red(err));
});
