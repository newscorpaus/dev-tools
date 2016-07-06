# Unit Testing

Unit tests are very important to reduce regression issues and write loosely coupled code.

We utilize 2 preferred unit test libraries for our front-end unit tests

## Mocha ##
WordPress front-end uses Mocha:
npm install mocha --save-dev

## Tape ##
Tangram front-end uses Tape:

npm install tape --save-dev
https://www.npmjs.com/package/tape

Examples of unit tests:
http://stash.news.com.au/projects/TG/repos/tg-commons/browse/test
[examples/test/tape-example.js][1]

# Implementation #

We use a generic NPM script called 'test' to run all unit tests. This can then be picked up by Bamboo/CI an run.

pacakge.json example:
{
	"scripts": {
		"test": "istanbul cover _mocha -- --reporter mocha-sonar-generic-test-coverage --recursive ./templates/components/test/ | tee report/unit-test-report.xml",
	},
}

[1]: ../examples/test/tape-example.js



