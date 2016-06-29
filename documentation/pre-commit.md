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
"pre-commit": ["lint"],

@todo
How to setup the existing linting


[1]: https://www.npmjs.com/package/pre-commit
[2]: ../pre-commit
