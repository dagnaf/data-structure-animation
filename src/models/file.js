var AmpersandState = require('ampersand-state');
var fs = require('fs');

// files.js
module.exports = AmpersandState.extend({
  props: {
    index: ['number', true, 0]
  },
  derived: {
    content: {
      deps: ['index'],
      fn: function () {
        return this.files[this.index].src;
      }
    },
    name: {
      deps: ['index'],
      fn: function () {
        return this.files[this.index].name;
      }
    },
    line: {
      deps: ['index'],
      fn: function () {
        return this.files[this.index].line;
      }
    },
    main: {
      deps: ['index'],
      fn: function () {
        return this.index === 0;
      }
    }
  },
  initialize: function () {
    this.files = [
      { name: 'stack.c', src: fs.readFileSync(__dirname + '/../codes/stack.c', 'utf-8').trim(), line: -1 },
      { name: 'stack.h', src: fs.readFileSync(__dirname + '/../codes/stack.h', 'utf-8').trim(), line: -1 }
    ];
    this.trigger('file:loaded');
  },
})
