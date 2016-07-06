var test = require('tape');
var example = require('../example');
var exampleTwo = require('../example-two');

test('example test', function(t) {
	t.plan(1);

	var output = example.render();

	t.equal(output, 'example string');
});

test('example two test', function(t) {
	t.plan(1);

	var output = exampleTwo.render();

	t.equal(output, 'example two string');
});
