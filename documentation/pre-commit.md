# Pre-commit hooks

We make sure we use pre-commit hooks to ensure the below are followed:
* Coding standards are followed
* Linting passes
* Unit tests are passing

## NPM pre-commit ##

We use the [pre-commit NPM package][1] to manage our pre-commit hooks.

## Implementing the pre-commit hooks ##

npm install pre-commit --save-dev

package.json

eg:
```
  "pre-commit": [
    "pre-commit"
  ],
  "scripts": {
    "pre-commit": "npm run lint; npm run test;",
    "lint": "npm run lint-css; npm run lint-js",
    "lint-css": "stylelint --syntax scss '**/*.scss'",
    "lint-js": "eslint --quiet .",
    "build-css": "node scripts/css.js",
    "build-js": "node scripts/js.js",
	"test": "node ./node_modules/.bin/mocha examples/test/mocha-example.js; node examples/test/tape-example.js"
  },
```

[1]: https://www.npmjs.com/package/pre-commit
[2]: ../pre-commit
