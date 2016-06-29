# Unit Testing

Unit tests are very important to reduce regression issues and write loosely coupled code.

# Frameworks #

@todo - we have not yet enforced a framework. We use a combination of mocha & tape.

# Implementation #

We use a generic NPM script called 'test' to run all unit tests. This can then be picked up by Bamboo/CI an run.

pacakge.json example:
{
	"scripts": {
		"test": "istanbul cover _mocha -- --reporter mocha-sonar-generic-test-coverage --recursive ./templates/components/test/ | tee report/unit-test-report.xml",
	},
}



