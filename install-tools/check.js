'use strict';

var argv = require('argv');
var colors = require('colors/safe');
var checkRepo = require('./util/check-repo');

var argOptions = {
	name: 'Dev tools checker',
	type: 'boolean'
};

var args = argv.option(argOptions).run();
args = process.argv.slice(2);
var repositoryDir = args[0];

if (undefined == args[0]) {
	return console.log(colors.red('Please pass an argument to the path of the repository'));
}

console.log(colors.cyan('Checking repository: [' + repositoryDir + ']...\n'));

// Check a single repo
checkRepo.check(repositoryDir).catch(function(err) {
	console.log(colors.red(err));
});
