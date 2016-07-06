var assert = require('chai').assert;
var example = require('../example');
var exampleTwo = require('../example-two');

describe('example', function() {
	it('should return a string', function() {

		var output = example.render();

		assert.equal(output, 'example string');
	});

	it('should return a different string', function() {

		var output = exampleTwo.render();

		assert.equal(output, 'example two string');
	});
});
