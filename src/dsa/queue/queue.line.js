var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var nums = []; var N = 8; _id = 0; var queue = [];



        var isEmpty = function() { _headtail(1);
stop(line,1); return queue.length === 0 ? true : (_headtail(),false);
        };

        var isFull = function() { _headtail(1);
stop(line,1);return queue.length === N-1 ? true : (_headtail(),false);
        };

        var deque = function() {

stop(line,1); if (!isEmpty()) {

stop(line,1);     queue.shift(); currentStatus.head++;
            }
stop(line,1);return;
        };

        var front = function() {

stop(line,1); if (!isEmpty()) {
stop(line,1);  rc=queue[0].v; _tofront(rc);  return rc;
            }
stop(line,1);return;
        };

        var enque = function(val) { _toque(val);
stop(line,1); if (!isFull()) {
stop(line,1);     queue.push({v:val, i:_id++}); _toque();
stop(line,1);     currentStatus.tail++;
            }
stop(line,1);return;
        };

// ===================================

        var init = function() {
  currentStatus.head = 0;
  currentStatus.tail = 0; queue = []; currentStatus.queue = queue;
        };

currentStatus = {};
lastStatus = {};

function _headtail(s) {
  currentStatus.headtail = (s === undefined ? 0 : 1);
}
function _toque(s) {
  currentStatus.toque = (s === undefined ? [] : [s]);
}
function _tofront(s) {
  currentStatus.tofront = (s === undefined ? [] : [s]);
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
      headtail: 0,
      head: currentStatus.head || 0,
      tail: (hard ? 0 : (currentStatus.tail || 0))
    }
    lastStatus = clone(currentStatus);
    return this;
  },
  enque: enque,
  deque: deque,
  front: front,
  init: function () {
    init();
    stop(0);
  },
  run: function (cmd, param) {
    this.initialize()[cmd](param);
    over();
    return { frames: frames, others: { N: N } };
  },
  reset: function() {
    this.initialize(true);
  }
};
