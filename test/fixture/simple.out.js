/* eslint-disable */

/**
 * Some test for Annotation
 */

//@log test start
console.log("test start");
'do something';
'do something';
'do something';
//@log test end
console.log("test end");
//@other nothing will happen to this

function test() {
  // here we have some indents
  //@log i'm in a function
  console.log("i'm in a function");
  'do something';
  'do something';
}
