// demo.js
var AmpersandState = require('ampersand-state');
// var deval = require('deval');
// var weevil = require('weevil');
var dsa = require('../codes/stack-built');

module.exports = AmpersandState.extend({
  props: {
    running: ['boolean', true, false],
    hasDemo: ['boolean', true, false],
    ended: ['boolean', true, false],
    stamp: ['number', true, 0]
  },
  play: function () {
    console.log('play demo');
    this.running = true;
  },
  pause: function () {
    console.log('pause demo');
    this.running = false;
  },
  replay: function () {
    console.log('replay demo');
    this.running = true;
  },
  run: function (str) {
    console.log('running the code');
    var breakpoints = [];
    var save = function(breakpoint) {
        breakpoints.push({line: breakpoint});
    }
    var val = dsa(save).eval(str);
    this.running = true;
    this.hasDemo = true;
    this.ended = false;
    var self = this;
    (function () {
        var i = 0;
        var id = setInterval(function () {
            self.trigger('code:break', breakpoints[i]);
            i++;
            if (i >= breakpoints.length) {
                clearInterval(id);
                self.running = false;
                self.ended = true;
                console.log(val);
            }
        }, 1000)
    })();
  }
})
