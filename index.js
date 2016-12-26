module.exports = Annotation;

function Annotation() {
  if (!(this instanceof Annotation)) return new Annotation();

  this.plugins = [];
}

Annotation.prototype.__join = function (directive, param) {
  var result = [];
  for (var i = 0; i < this.plugins.length; i++) {
    if (this.plugins[i].rule.test(directive)) {
      var output = this.plugins[i].action.call(this, param);
      if (output) result.push(output);
    }
  }
  return result;
};

Annotation.prototype.use = function (directive, action) {
  this.plugins.push({
    rule: new RegExp('^' + directive + '$'),
    action: action
  });
  return this;
};

Annotation.prototype.process = function (source) {
  var re = /^([\ |\t]*\/\/\S+.*)/mg;
  var self = this;

  return source.split(re).map(function (value, index) {
    if (index % 2 === 0) return value;

    var indent = value.replace(/^(\s*).*/, '$1');
    var directive = value.trim().replace(/^\/\/(\S+).*/, '$1');
    var param = value.trim().replace(/\/\/\S+(.*)/, '$1').trim();

    var output = self.__join(directive, param).map(function (s) {
      return '\n' + indent + s;
    }).join('');
    return value + output;
  }).join('');
};
