var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var stack = []; var N = 5;

        var init = function() {
stop(line,1);  stack = []; currentStatus.stack = stack;
        };

        var isFull = function() { _stacktop(1);
stop(line,1); if (stack.length === N) {
stop(line,1);    return true;
            } else {
stop(line,1); _stacktop();    return false;
            }
        };

        var isEmpty = function() { _stacktop(1);
stop(line,1); if (stack.length === 0) {
stop(line,1);     return true;
            } else {
stop(line,1); _stacktop();    return false;
            }
        };

        var push = function(val) { _topush(val);
stop(line,1); if (isFull()) {
stop(line,1);     console.log('stack full.');
                        } else {
stop(line,1);     stack.push(val); _topush();
            }
        };

        var pop = function() {
stop(line,1); if (isEmpty()) {
stop(line,1);     console.log('stack empty.');
            } else {
stop(line,1);     stack.pop();
            }
        };

        var peak = function() {
stop(line,1); if (isEmpty()) {
stop(line,1);     console.log('stack empty.');
stop(line,1);     return -1;
            } else {
stop(line,1);  rc=stack[stack.length - 1]; _topeak(rc);  return rc;
            }
        };
// ===================================

currentStatus = {};
lastStatus = {};

function _topush(s) {
  currentStatus.topush = (s === undefined) ? [] : [s];
}
function _stacktop(s) {
  currentStatus.stacktop = (s === undefined) ? [] : [1];
}
function _topeak(s) {
  currentStatus.topeak = [s];
}

function stop(l, i, animation) {
  if (i === 1) {
    lastStatus = clone(currentStatus);
  }
  frames.push({
    status: lastStatus,
    line: l,
    animation: animation,
    id: stopid
  });
  stopid++;
}

function over() {
  stop(frames[frames.length-1].line, 1);
}

module.exports = {
  getInitialDescriptions: function () {
    this.initialize(true);
    push(0);
    push(50);
    // push(100);
    return this.run('push', 100);
  },
  initialize: function (hard) {
    frames = [];
    stopid = 0;
    if (hard) {
      stack = [];
    }
    currentStatus = {
      stack: stack,
      topush: [],
      topeak: [],
      stacktop: []
    }
    lastStatus = clone(currentStatus);
    return this;
  },
  push: push,
  pop: pop,
  peak: peak,
  init: init,
  run: function (cmd, param) {
    this.initialize()[cmd](param);
    over();
    return { frames: frames };
  }
};
