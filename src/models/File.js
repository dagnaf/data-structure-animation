// TODO require.context
var req = require.context('../codes', true, /((\.(c|h))|(Makefile))$/);
var commons = ['main.c', 'Makefile'];
var dsaFiles = {
  'stack': {},
  'stack-eval': {deps: ['stack']},
  'queue': {},
  'queue-tri': {},
  'matrix': {},
  'rb-tree': {},
  'huffman': {},
  'graph': {},
  'sort-merge': {},
  'sort-quick': {},
  'search-order': {},
  'search-binary': {}
};
var base_url = function (type) {
  return function (f) {
    return {
      path: './' + type + '/' + f,
      name: f
    }
  }
}
var getFiles = function (type, depended) {
  var files = [type+'.c', type+'.h'].map(base_url(type))
  // some extra files c files header files
  if (dsaFiles[type].extra) {
    files = files.concat(dsaFiles[type].extra.map(base_url(type)))
  }
  // be careful, no interdependency check
  if (dsaFiles[type].deps) {
    files = files.concat(dsaFiles[type].deps.map(function (t) {
      return getFiles(t, true);
    }).reduce(function (a,b) { return a.concat(b)}, []));
  }
  // if not depended, include main Makefile
  if (depended === undefined) {
    files = files.concat(commons.map(base_url(type)));
  }
  return files;
}

module.exports = function (arg) {

var dsaType = arg;
var index = 0;
var list = getFiles(arg).map(function (f, i) {
  return {
    name: f.name,
    src: req(f.path),
    line: -1
  }
});

function open (i) {
  index = i;
}

function update (line, k) {
  var i = k || index;
  list[i].line = line;
};

return {
  open: open,
  update: update,
  list: function () { return list; },
  index: function () { return index; }
}

};// end of module.exports
