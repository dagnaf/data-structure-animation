var debounce = require('lodash.debounce');
var DsaFactory = require('../codes/stack-built');

var Demo = function (dsaType) {
  this.isPlaying = false;
  this.hasDemo = false;
  this.stamp = 0;
  this.delay = 800;
  this.length = 0;
  this._breakpoints = [ DsaFactory.getInitialFrame() ];
  this.dsaType = dsaType || 'stack';

  this.maxDelay = 2500;
  this.minDelay = 100;
};

Demo.prototype.isRunning = function () {
  return this.hasDemo && this.stamp !== this.length;
};

Demo.prototype.activeLine = function () {
  return this._breakpoints[this.stamp].line || -1;
};
Demo.prototype.activeFrame = function () {
  return {
    current: this._breakpoints[this.stamp],
    next: this._breakpoints[this.stamp+1]
  }
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
Demo.prototype.run = function (cmd, param) {
  console.log('code (not demo) running foreground: '+ cmd);
  DsaFactory.reset(false);
  switch (cmd) {
    case 'push': DsaFactory.defaultStack.push(parseInt(param)); break;
    case 'pop': DsaFactory.defaultStack.pop(); break;
    case 'peak': DsaFactory.defaultStack.peak(); break;
    case 'init': DsaFactory.defaultStack.init(); break;
  }
  // DsaFactory.defaultStack.push(cmd);
  this._breakpoints = DsaFactory.getBreakpoints();
  this.length = this._breakpoints.length-1;
  this.hasDemo = true;
};

module.exports = Demo;
