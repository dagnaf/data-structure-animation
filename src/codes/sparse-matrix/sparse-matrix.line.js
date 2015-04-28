var _ = require('underscore'); var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var nums = []; var N = 8; _id = 0;

// ===================================

currentStatus = {};
lastStatus = {};


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
      headtail: 0,
      head: currentStatus.head || 0,
      tail: currentStatus.tail || 1
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
    return { frames: frames, others: { N: N } };
  }
};
