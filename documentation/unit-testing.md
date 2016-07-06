# Unit Testing

Unit tests are very important to reduce regression issues and write loosely coupled code.

We utilize 2 preferred unit test libraries for our front-end unit tests

## Mocha ##
WordPress front-end uses Mocha:

npm install mocha --save-dev
npm install chai --save-dev
[https://www.npmjs.com/package/mocha][4]
[https://www.npmjs.com/package/chai][6]

Example of running unit tests:
node ./node_modules/.bin/mocha examples/test/mocha-example.js

Examples of unit tests:
[examples/test/mocha-example.js][5]

## Tape ##
Tangram front-end uses Tape:

npm install tape --save-dev
[https://www.npmjs.com/package/tape][1]

Example of running unit tests:
node examples/test/tape-example.js

Examples of unit tests:
[http://stash.news.com.au/projects/TG/repos/tg-commons/browse/test][2]
[examples/test/tape-example.js][3]

# Implementation #

We use a generic NPM script called 'test' to run all unit tests. This can then be picked up by Bamboo/CI an run.

pacakge.json example:
{
	"scripts": {
		"test": "istanbul cover _mocha -- --reporter mocha-sonar-generic-test-coverage --recursive ./templates/components/test/ | tee report/unit-test-report.xml",
	},
}

[1]: https://www.npmjs.com/package/tape
[2]: http://stash.news.com.au/projects/TG/repos/tg-commons/browse/test
[3]: ../examples/test/tape-example.js
[4]: https://www.npmjs.com/package/mocha
[5]: ../examples/test/mocha-example.js
[6]: https://www.npmjs.com/package/chai
