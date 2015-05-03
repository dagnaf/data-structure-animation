var index = 0;
var list = require('../routers/require-dsa').required.codes.map(function (f, i) {
  return {
    name: f.name,
    src: f.text.trim(),
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

module.exports = {
  open: open,
  update: update,
  list: function () { return list; },
  index: function () { return index; }
};
