// TODO require.context
var req = require.context('../codes', true, /\.line(\.js)*$/);
// alert(req.keys());
module.exports = function (arg) {

var DsaFactory = req('./'+arg+'/'+arg+'.line');

var isPlaying = false;
// var hasDemo = true;
var delay = 800;
var _descriptions = DsaFactory.getInitialDescriptions();
var _breakpoints = _descriptions.frames;
var length = _breakpoints.length-1;
var stamp = length;
// _breakpoints = [ DsaFactory.getInitialFrame() ];
var dsaType = dsaType || 'stack';

var maxDelay = 2500;
var minDelay = 100;

function isRunning () {
  return stamp !== length;
}

function activeLine () {
  // if (hasDemo) {
    if (_breakpoints[stamp]) {
      return _breakpoints[stamp].line || -1;
    } else {
      return -1;
    }
  // } else {
  //   return -1;
  // }
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
  // DsaFactory.reset(false);
  // switch (cmd) {
  //   case 'push': DsaFactory.defaultStack.push(parseInt(param)); break;
  //   case 'pop': DsaFactory.defaultStack.pop(); break;
  //   case 'peak': DsaFactory.defaultStack.peak(); break;
  //   case 'init': DsaFactory.defaultStack.init(); break;
  // }
  // DsaFactory.defaultStack.push(cmd);
  // DsaFactory.initialize();
  _descriptions = DsaFactory.run(cmd,param);
  // _breakpoints = DsaFactory.getBreakpoints();
  _breakpoints = _descriptions.frames;
  length = _breakpoints.length-1;
  // hasDemo = true;
}

//
function proxy () {

}

return {
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
  // hasDemo: function () { return hasDemo; },
  stamp: function () { return stamp; },
  delay: function () { return delay; },
  length: function () { return length; },
  _breakpoints: function () { return _breakpoints; },
  _descriptions: function () { return _descriptions; },
  breakpoints: function () { return breakpoints; },
  dsaType: function () { return dsaType; },

  maxDelay: function () { return maxDelay; },
  minDelay: function () { return minDelay; },
};

};// end of module.exports
