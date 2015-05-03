// FIXME compress output or let highlight work in editors?
var hl = require('highlight').Highlight;

module.exports = function (contents) {
  this.cacheable && this.cacheable();
  return hl(contents.trim());
}

