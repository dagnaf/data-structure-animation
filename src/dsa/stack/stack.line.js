var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var stack = []; var N = 5;



        var isEmpty = function() { _stacktop(1);
stop(line,1);          return stack.length === 0 ? true : (_stacktop(),false);
};

        var isFull = function() { _stacktop(1);
stop(line,1);         return stack.length === N ? true : (_stacktop(),false);
};

        var pop = function() {

  if (stop(line,1),!isEmpty()) {

stop(line,1);     stack.pop();
  }
stop(line,1);  return;
};

        var peak = function() {

stop(line,1); if (!isEmpty()) {
stop(line,1);  rc=stack[stack.length - 1]; _topeak(rc);  return rc;
            }
stop(line,1);return;
};

        var push = function(val) { _topush(val);
stop(line,1); if (!isFull()) {

stop(line,1);     stack.push(val); _topush();
stop(line,1); return;
}
stop(line,1); return;
};
// ===================================

        var init = function() {
          stack = []; currentStatus.stack = stack;
        };


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
  if (frames[frames.length-1])
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
  init: function () {
    init();
    stop(0);
  },
  run: function (cmd, param) {
    this.initialize()[cmd](param);
    over();
    return { frames: frames };
  },
  reset: function () {
    this.initialize(true);
  }
};
