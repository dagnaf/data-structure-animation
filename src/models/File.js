var fs = require('fs');

var src = [
fs.readFileSync(__dirname + '/../codes/stack.c', 'utf-8').trim(),
fs.readFileSync(__dirname + '/../codes/stack.h', 'utf-8').trim(),
fs.readFileSync(__dirname + '/../codes/main.c', 'utf-8').trim()
]
var File = function (t) {
  var dsaType = t || 'stack';
  this.index = 0;
  this.list = [dsaType+'.c', dsaType+'.h', 'main.c'].map(function (name,i) {
      return {
        name: name,
        src: src[i],//fs.readFileSync(__dirname + name, 'utf-8').trim(),
        line: -1
      }
    });
}
File.prototype.open = function(i) {
  this.index = i;
};

File.prototype.update = function(line, k) {
  var i = k || this.index;
  this.list[i].line = line;
};

module.exports = File;
