var debounce = require('lodash.debounce');
var dsa = require('../codes/stack-built');
var DsaAction = require('../actions/DsaActions')


var Demo = function (dsaType) {
  this.isPlaying = false;
  this.hasDemo = false;
  this.stamp = 0;
  this.delay = 800;
  this.length = 0;
  this._breakpoints = [];
  this.dsaType = dsaType || 'stack';

  this.maxDelay = 2500;
  this.minDelay = 100;
  // FIXME: have to wait assigning playing until initialization
  var self = this;
  this.playing = debounce(function (startStamp) {
    console.log('play from ' + startStamp);
    // FIXME: playing should be inside demo, but updateStamp is an action
    DsaAction.updateStamp(startStamp);
    // self.stamp = startStamp;
    if (self.stamp === self.length) {
      // FIXME: playing should be inside demo, but pauseDemo is an action
      DsaAction.pauseDemo();
      // isPlaying = false;
      return;
    }
    self.playing(startStamp+1);
  }, this.delay)

};

Demo.prototype.isRunning = function () {
  return this.hasDemo && this.stamp !== this.length;
};

Demo.prototype.breakpoint = function () {
  return this._breakpoints[this.stamp] || -1;
};

Demo.prototype.play = function () {
  this.isPlaying = true;
  this.playing(this.stamp);
  console.log('play');
};

Demo.prototype.pause = function () {
  this.playing.cancel();
  this.isPlaying = false;
  console.log('pause');
};

Demo.prototype.replay = function () {
  console.log('replay');
  this.isPlaying = true;
  this.playing(0);
};

Demo.prototype.run = function (str) {
  console.log('running the code');

  var save = function(breakpoint) {
      this._breakpoints.push(breakpoint);
  }.bind(this);
  var val = dsa(save).eval(str);
  this.length = this._breakpoints.length;

  this.hasDemo = true;
  this.isPlaying = true;
  this.playing(0);
};

module.exports = Demo;
