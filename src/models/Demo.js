// TODO require.context
var req = require.context('../codes', true, /\.line(\.js)*$/);
// alert(req.keys());
module.exports = function (arg) {

var DsaFactory = req('./'+arg+'/'+arg+'.line');

var isPlaying = false;
var hasDemo = true;
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
  return hasDemo && stamp !== length;
}

function activeLine () {
  if (hasDemo) {
    if (_breakpoints[stamp]) {
      return _breakpoints[stamp].line || -1;
    } else {
      return -1;
    }
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
  console.log('goto demo '+ newStamp);
}

function setDelay (newDelay) {
  delay = newDelay;
  console.log('delay changed '+ newDelay);
}

function play () {
  isPlaying = true;
  console.log('play demo / demo playing');
}

function pause () {
  isPlaying = false;
  console.log('pause demo / demo stopped');
}

function replay () {
}

// Only run the built-program foreground, not start to
//   play
function run (cmd, param) {
  console.log('code (not demo) running foreground: '+ cmd);
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
  hasDemo = true;
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
  hasDemo: function () { return hasDemo; },
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
