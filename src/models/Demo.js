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
};

Demo.prototype.isRunning = function () {
  return this.hasDemo && this.stamp !== this.length;
};

Demo.prototype.breakpoint = function () {
  return this._breakpoints[this.stamp] || -1;
};

Demo.prototype.update = function (newStamp) {
  this.stamp = newStamp;
  console.log('goto demo '+ newStamp);
}

Demo.prototype.setDelay = function (newDelay) {
  this.delay = newDelay;
  console.log('delay changed '+ newDelay);
}

Demo.prototype.play = function () {
  this.isPlaying = true;
  console.log('play demo / demo playing'+ this.isPlaying);
};

Demo.prototype.pause = function () {
  this.isPlaying = false;
  console.log('pause demo / demo stopped');
};

Demo.prototype.replay = function () {
};

// Only run the built-program foreground, not start to
//   play
Demo.prototype.run = function (str) {
  console.log('code (not demo) running foreground');
  var save = function(breakpoint) {
      this._breakpoints.push(breakpoint);
  }.bind(this);
  var val = dsa(save).eval(str);
  this.length = this._breakpoints.length;
  this.hasDemo = true;;
};

module.exports = Demo;
