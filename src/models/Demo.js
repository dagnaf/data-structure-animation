var DsaFactory = require('../routers/require-dsa').required.factory;

var isPlaying = false;
var delay = parseInt(localStorage.getItem("dsa-delay")) || 800;
var _descriptions = {};//DsaFactory.getInitialDescriptions();
var _breakpoints = [];//_descriptions.frames;
var length = -1;//_breakpoints.length-1;
var stamp = -1;
var maxDelay = 2500;
var minDelay = 100;

function isRunning () {
  return stamp !== length && stamp >= 0;
}

function activeLine () {
    if (_breakpoints[stamp]) {
      return _breakpoints[stamp].line || -1;
    } else {
      return -1;
    }
}
function activeFrame () {
  return {
    current: _breakpoints[stamp],
    next: _breakpoints[stamp+1]
  }
}
function others () {
  return _descriptions.others;
}
function update (newStamp) {
  stamp = newStamp;
  console.log('_DEMO update stamp= '+ newStamp);
}

function setDelay (newDelay) {
  delay = newDelay;
  localStorage.setItem("dsa-delay", delay);
  console.log('_DEMO set delay= '+ newDelay);
}

function play () {
  isPlaying = true;
  console.log('_DEMO set isPlaying true');
}

function pause () {
  isPlaying = false;
  console.log('_DEMO set isPlaying false');
}

function replay () {
}

// Only run the built-program foreground, not start to
//   play
function run (cmd, param) {
  console.log('_DEMO run '+ cmd + ' '+param);
  _descriptions = DsaFactory.run(cmd,param);
  _breakpoints = _descriptions.frames;
  length = _breakpoints.length-1;
}

module.exports = {
  isRunning: isRunning,
  activeLine: activeLine,
  activeFrame: activeFrame,
  others: others,
  update: update,
  setDelay: setDelay,
  play: play,
  pause: pause,
  replay:replay,
  run: run,
  isPlaying: function () { return isPlaying; },
  stamp: function () { return stamp; },
  delay: function () { return delay; },
  length: function () { return length; },
  _breakpoints: function () { return _breakpoints; },
  _descriptions: function () { return _descriptions; },
  maxDelay: function () { return maxDelay; },
  minDelay: function () { return minDelay; },

  destroy: function () {
    stamp = -1;
    length = -1;
    _breakpoints = [];
    _descriptions = {};
  },
  end: function () {
    stamp = length;
  }
};
