'use strict';

var argv = require('argv');
var colors = require('colors/safe');
var installNpm = require('./npm');
var installFiles = require('./files');

var argOptions = {
	name: 'Dev tools installer',
	type: 'boolean'
};

var args = argv.option(argOptions).run();
args = process.argv.slice(2);
var repositoryDir = args[0];

if (undefined == args[0]) {
	return console.log(colors.red('Please pass argument to the path to the repository'));
}

console.log(colors.cyan('Checking repository setup: [' + repositoryDir + ']...\n'));

// List of NPM module to check are installed
var npmModulesToCheck = [{
	npmKey: '"dev-tools"',
	warning: '[x] Dev-tools repository is not installed',
	prompt: 'To install run: npm install dev-tools --save-dev'
}, {
	npmKey: '"eslint"',
	warning: '[x] ESLint is not installed',
	prompt: 'To install run: npm install eslint --save-dev'
}, {
	npmKey: '"stylelint"',
	warning: '[x] Stylelint is not installed',
	prompt: 'To install run: npm install stylelint --save-dev'
}, {
	npmKey: '"stylelint-scss"',
	warning: '[x] Stylelint-scss is not installed',
	prompt: 'To install run: npm install stylelint-scss --save-dev'
}, {
	npmKey: '"stylelint-config-standard"',
	warning: '[x] Stylelint-config-standard is not installed',
	prompt: 'To install run: npm install stylelint-config-standard --save-dev'
}, {
	npmKey: '"stylefmt"',
	warning: '[x] Stylefmt is not installed',
	prompt: 'To install run: npm install stylefmt --save-dev'
}, {
	npmKey: '"pre-commit"',
	warning: '[x] Pre-commit is not installed',
	prompt: 'To install run: npm install pre-commit --save-dev'
}];

// List of files to check exist in the repo
var filesToCheck = [{
	filename: repositoryDir + '.stylelintrc',
	warning: '[x] No .stylelintrc file exists',
	prompt: 'Would you like to copy it over?'
}, {
	filename: repositoryDir + '.stylelintignore',
	warning: '[x] No .stylelintignore file exists',
	prompt: 'Would you like to copy it over?'
}, {
	filename: repositoryDir + '.eslintignore',
	warning: '[x] No .eslintignore file exists',
	prompt: 'Would you like to copy it over?'
}, {
	filename: repositoryDir + '.eslintrc',
	warning: '[x] No .eslintrc file exists',
	prompt: 'Would you like to copy it over?'
}, {
	filename: repositoryDir + '.editorconfig',
	warning: '[x] No .editorconfig file exists',
	prompt: 'Would you like to copy it over?'
}, {
	filename: repositoryDir + '.gitignore',
	warning: '[x] No .gitignore file exists',
	prompt: 'Would you like to copy it over?'
}, {
	filename: repositoryDir + 'readme.md',
	warning: '[x] No readme.md file exists',
	prompt: 'Would you like to copy it over?'
}];

// Setup package.json
installNpm.packageJsonFile = repositoryDir + 'package.json';

installNpm.processNextModule(npmModulesToCheck, 0).then(function() {
	installFiles.processNextFile(filesToCheck, 0);
});
