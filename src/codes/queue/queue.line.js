var _ = require('underscore'); var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var nums = []; var N = 5; head = 0, tail = 1; _id = 0;

        var init = function(n) {
          var i;
          var j;
          var a;
          var b;
stop(line,1);
stop(line);          nums = []; head = 0; tail = 1;
          for (stop(line,1),i = 1; i <= n; ++i) {
stop(line);              nums.push({v: 1, i: _id++}); tail++;
              for (stop(line,1),j = 0; j < i-2; ++j) {
stop(line);                  a = nums[0].v;
stop(line,1);                  nums.shift(); head++;
stop(line,1);                  b = nums[0].v;
stop(line,1);                  nums.push({v: a+b, i: _id++}); tail++;
              }
stop(line,1);              nums.shift(); head++;
stop(line,1);              nums.push({v: 1, i: _id++}); tail++;
          }
          for (stop(line,1),i = 1; i <= n; ++i) {
stop(line);              a = nums[0].v;
stop(line);              // console.log("%d ", a);
stop(line);              nums.shift(); head++;
          }
stop(line,1);          return;
        }

// ===================================

currentStatus = {};
lastStatus = {};

function _headtail(s) {
  currentStatus.headtail = (s === undefined ? [] : [1]);
}
function _toque(s) {
  currentStatus.toque = (s === undefined ? [] : [s]);
}
function _tofront(s) {
  currentStatus.tofront = [s];
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
  stop(_.last(frames).line, 1);
}

module.exports = {
  getInitialDescriptions: function () {
    this.initialize(true);
    enque(0);
    enque(50);
    // push(100);
    return this.run('enque', 100);
  },
  initialize: function (hard) {
    frames = [];
    stopid = 0;
    if (hard) {
      queue = [];
    }
    currentStatus = {
      queue: queue,
      tofront: [],
      toque: [],
      headtail: [],
      head: head,
      tail: tail
    }
    lastStatus = clone(currentStatus);
    return this;
  },
  enque: enque,
  deque: deque,
  front: front,
  init: init,
  run: function (cmd, param) {
    this.initialize()[cmd](param);
    over();
    return { frames: frames };
  }
};
