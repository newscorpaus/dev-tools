# CSS Standards

Below are the NewsCorp CSS standards

## SASS ##

We use SASS as our CSS precompiler

## Standards ##

We use StyleLint to manage our CSS coding standards. The configuration can be found "[here][1]"

## StyleLint ##
Running:
./node_modules/.bin/stylelint "examples/*.scss"
npm install stylelint stylelint-scss

## Implementing linting ##

Document scripts we have for SASS->CSS @todo

Explain how to implement methods in a new project @todo

## Auto Formatting ##
usage:
./node_modules/.bin/stylefmt input.scss

## Helpful extensions ##
[Autoprefixer][2]
[StyleFmt][3]

[1]: ../.stylelintrc.json
[2]: https://www.npmjs.com/package/autoprefixer
[3]: https://www.npmjs.com/package/stylefmt
