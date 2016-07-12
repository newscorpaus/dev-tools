'use strict';

var checkRepo = require('./util/check-repo');
var logger = require('./util/logger');
var rmdir = require('rmdir');
var Repo = require('git-tools');
var parsedJSON = require('../package.json');
var reposToValidate = parsedJSON['repos-to-validate'];

logger.logDebug('Checking [' + reposToValidate.length + '] repositories for validity...');

(function checkNextRepo(repo) {

	if (undefined === repo) {
		logger.log('Repo check finished...');

		if( logger.hasError() ) {
			logger.output();
			process.exit(1);
		} else {
			logger.output();
		}

		return;
	}

	logger.logDebug('Checking repository setup [' + repo + ']...');

	var repoName = repo.substr(repo.lastIndexOf('/') + 1).replace('.git', '');
	var repositoryDir = './tmp/' + repoName;

	if ('/' == repositoryDir.charAt(0)) {
		logger.logError('Disabled deleting a root directory');
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
