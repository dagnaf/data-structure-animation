// demo.js
var AmpersandState = require('ampersand-state');
// var deval = require('deval');
// var weevil = require('weevil');
var debounce = require('lodash.debounce');
var dsa = require('../codes/stack-built');

module.exports = AmpersandState.extend({
  props: {
    isPlaying: ['boolean', true, false],
    hasDemo: ['boolean', true, false],
    stamp: ['number', true, 0],
    delay: ['number', true, 800],
    length: ['number', true, 0]
  },
  derived: {
    activeLine: {
      deps: ['stamp'],
      fn: function () {
        return this.breakpoints[this.stamp];
      }
    },
    isRunning: {
      deps: ['hasDemo', 'stamp', 'length'],
      fn: function () {
        return this.hasDemo && (this.stamp !== this.length);
      }
    },
  },
  play: function () {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playing(this.stamp);
    console.log('play');
  },

  pause: function () {
    this.playing.cancel();
    this.isPlaying = false;
    console.log('pause');
  },

  replay: function () {
    console.log('replay');
    this.isPlaying = true;
    this.playing(0);
  },

  run: function (str) {
    console.log('running the code');

    var save = function(breakpoint) {
        this.breakpoints.push(breakpoint);
    }.bind(this);
    var val = dsa(save).eval(str);
    this.length = this.breakpoints.length;

    this.hasDemo = true;
    this.isPlaying = true;
    this.playing(0);
  },

  initialize: function () {
    this.breakpoints = [];
    this.maxDelay = 2500;
    this.minDelay = 100;
    var self = this;
    this.playing = debounce(function (startStamp) {
      console.log('play from ' + startStamp);
      self.stamp = startStamp;
      if (self.stamp === self.length) {
        isPlaying = false;
        return;
      }
      self.playing(startStamp+1);
    }, this.delay)
  }
})
