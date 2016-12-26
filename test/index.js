require('should');
var fs = require('fs');

function fixture(path) {
  return fs.readFileSync(path, 'utf8');
}

var Annotation = require('../index.js');

describe('.use(directive, action)', function () {
  it('should register a function to transform the specified comments', function () {
    var input = fixture('test/fixture/simple.js');
    var logger = new Annotation();
    logger.use('@log', function (param) {
      return 'console.log(' + JSON.stringify(param) + ');';
    });
    var output = logger.process(input);
    output.should.equal(fixture('test/fixture/simple.out.js'));
  });
});
