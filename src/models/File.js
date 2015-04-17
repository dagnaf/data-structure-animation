var fs = require('fs');

var src = [
fs.readFileSync(__dirname + '/../codes/stack-eval/stack-eval.c', 'utf-8').trim(),
fs.readFileSync(__dirname + '/../codes/stack-eval/stack-eval.h', 'utf-8').trim(),
fs.readFileSync(__dirname + '/../codes/stack/stack.c', 'utf-8').trim(),
fs.readFileSync(__dirname + '/../codes/stack/stack.h', 'utf-8').trim(),
fs.readFileSync(__dirname + '/../codes/stack-eval/main.c', 'utf-8').trim()
]
var File = function (t) {
  var dsaType = t || 'stack';
  this.index = 0;
  // this.list = [dsaType+'.c', dsaType+'.h', 'main.c'].map(function (name,i) {
  //     return {
  //       name: name,
  //       src: src[i],//fs.readFileSync(__dirname + name, 'utf-8').trim(),
  //       line: -1
  //     }
  //   });
  this.list = ['stack-eval.c', 'stack-eval.h', 'stack.c', 'stack.h', 'main.c'].map(function (n, i) {
    return {
      name: n,
      src: src[i],
      line: -1
    }
  })
}
File.prototype.open = function(i) {
  this.index = i;
};

File.prototype.update = function(line, k) {
  var i = k || this.index;
  this.list[i].line = line;
};

module.exports = File;
