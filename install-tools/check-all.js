'use strict';

var colors = require('colors/safe');
var checkRepo = require('./util/check-repo');
var rmdir = require('rmdir');
var Repo = require('git-tools');

var parsedJSON = require('../package.json');
var reposToValidate = parsedJSON['repos-to-validate'];

console.log(colors.cyan('Checking [' + reposToValidate.length + '] repositories for validity...\n'));

(function checkNextRepo(repo) {

	if (undefined === repo) {
		console.log(colors.green('Repo check finished...\n'));
		return;
	}

	console.log(colors.cyan('Checking repository setup [' + repo + ']...\n'));

	var repoName = repo.substr(repo.lastIndexOf('/') + 1).replace('.git', '');
	var repositoryDir = './tmp/' + repoName;

	if ('/' == repositoryDir.charAt(0)) {
		console.log(colors.red('Disabled deleting a root directory\n'));
		console.log('Disabled deleting a root directory');
		return;
	}

	// Clone locally and check
	Repo.clone({
		repo: repo,
		dir: repositoryDir,
		depth: 1
	}, function() {

		// Check a single repo
		checkRepo.check(repositoryDir).then(function() {
			rmdir(repositoryDir);
			checkNextRepo(reposToValidate.shift());
		}).catch(function() {
			// cleanup
			rmdir(repositoryDir);
		});
	});

})(reposToValidate.shift());
