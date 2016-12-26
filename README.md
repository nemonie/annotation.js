# annotation.js [![Build Status](https://travis-ci.org/nemonie/annotation.js.svg?branch=master)](https://travis-ci.org/nemonie/annotation.js)

Inspired by JAVA / Annotation, `annotation.js` can transform the specified comments in javascript code string.

It's useful for injecting logging, tracing, debugging, or stats related code.

> Good choice when using with webpack or other build systems.

## Installation

```
$ npm install annotation.js
```

## Example

`annotation.js` is only a kind of framework, so it has **NO** built-in rules.

Almost everything is up to you. Here we registered a comment logger.

``` javascript
var logger = new Annotation();
logger.use('@log', function (param) {
  return 'console.log(' + JSON.stringify(param) + ');';
});
```

If your source file is like below:

``` javascript
//@log test start
'do something';
//@log test end
//@other nothing will happen to this

function test() {
  // here we have some indents
  //@log i'm in a function
  'do something';
}
```

Use `logger.process(source: string)`, it will yield:

``` javascript
//@log test start
console.log("test start");
'do something';
//@log test end
console.log("test end");
//@other nothing will happen to this

function test() {
  // here we have some indents
  //@log i'm in a function
  console.log("i'm in a function");
  'do something';
}
```

## Api

### Annotation

Exposed by `require('annotation.js')`.

### Annotation()

Creates a new `Annotation`. Works with and without `new`:

``` javascript
var Annotation = require('annotation.js');

var test = Annotation();
// or
var test = new Annotation();
```

### Annotation.prototype.use(directive: string, action: function)

Register a function to transform the specified comments.

Directive is the first word after "`//`". The action function will have one argument named param.

A valid "annotation" should be like this.

``` javascript
//[directive] [param] [\n]
```

### Annotation.prototype.process(source: string)

When use `process`, it will transform the source code string using the rules and functions you registered.

It is worth noting that, if you registered more than one SAME-NAME directives, all of them will take effect.

For example, we change the `logger` above:

``` javascript
var logger = new Annotation();
logger.use('@log', function (param) {
  return 'console.log(1, ' + JSON.stringify(param) + ');';
});
logger.use('@log', function (param) {
  return 'console.log(2, ' + JSON.stringify(param) + ');';
});
```

Source code:

``` javascript
//@log hello
'do something';
```

Yielding:

``` javascript
//@log hello
console.log(1, "hello");
console.log(2, "hello");
'do something';
```

## Running tests

```
npm test
```

## License

MIT
