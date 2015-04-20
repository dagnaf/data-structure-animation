var _ = require('underscore'); var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var queue = []; var N = 5; head = 0, tail = 1; _id = 0;

        var print_line = function() {
stop(line,1); head = 0;
stop(line,1); tail = 1; queue = []; currentStatus.queue = queue;
        };

        var isFull = function() { _headtail(1);
stop(line,1); if (queue.length === N) {
stop(line,1);    return true;
            } else {
stop(line,1); _headtail();    return false;
            }
        };

        var isEmpty = function() { _headtail(1);
stop(line,1); if (queue.length === 0) {
stop(line,1);     return true;
            } else {
stop(line,1); _headtail();    return false;
            }
        };

        var enque = function(val) { _toque(val);
stop(line,1); if (isFull()) {
stop(line,1);     console.log('queue full.');
                        } else {
stop(line,1);     queue.push({v:val, id:_id++}); tail=(tail+1)%N; _toque();;
            }
        };

        var deque = function() {
stop(line,1); if (isEmpty()) {
stop(line,1);     console.log('queue empty.');
            } else {
stop(line,1);     queue.shift();
            }
        };

        var front = function() {
stop(line,1); if (isEmpty()) {
stop(line,1);     console.log('queue empty.');
stop(line,1);     return -1;
            } else {
stop(line,1);  rc=queue[0].v; _tofront(rc);  return rc;
            }
        };
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
