var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var N = 8; var _id = 0; var currentStatus = {};

        var yanghui = function(n) {
          var i;
          var j;
          var a;
          var b;
stop(line);
stop(line,1);     //currentStatus.init(true);
          currentStatus.push(1,0,0);
          for (i = 1; stop(line,1),(i <= n); ++i) {
stop(line);              currentStatus.push(1,i,0);
              for (j = 0; stop(line,1),currentStatus.front(1),(j < i-1); ++j) {
stop(line,1);                  a = currentStatus.front();
stop(line,1);                  currentStatus.shift();
stop(line,1);                  b = currentStatus.front();
stop(line,1);                  currentStatus.push(a+b,i,j+1); currentStatus.last();
              }
stop(line,1);              currentStatus.shift();
stop(line,1);              currentStatus.push(1,i,i);
          }
          for (i = 0; stop(line,1),(i < n+1); ++i) {
stop(line);              a = currentStatus.front();
stop(line,1);              // currentStatus.front(1);
stop(line);              currentStatus.shift();
          }
stop(line);
stop(line);          return;
        }
// ===================================

currentStatus.init = function (hard) {
  _id = 0;
  this.nums = [];
  this.tofront = [];
  this.yh = [];
}
currentStatus.last = function () {
  var l = this.nums.length;
  this.tofront.push(this.yh[this.nums[l-1].i]);
}
currentStatus.front = function (c) {
  if (c) {
    this.tofront = [];
  } else {
    this.tofront.push(this.yh[this.nums[0].i]);
  }
  return this.nums[0].v;
}
currentStatus.push = function(v, r, c) {
  this.nums.push({v: v, i:_id});
  this.yh.push({v:v, r: r, c:c, i:_id});
  _id++;
}
currentStatus.shift = function() {
  this.nums.shift();
}
currentStatus.clone = function () {
  return {
    nums: clone(this.nums),
    tofront: clone(this.tofront),
    yh: clone(this.yh)
  }
}
lastStatus = {};

function stop(l, i, animation) {
  if (i === 1) {
    lastStatus = currentStatus.clone();
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
    this.initialize();
    return this.run('yanghui', 6);
  },
  initialize: function () {
    frames = [];
    stopid = 0;
    currentStatus.init(true);
    lastStatus = currentStatus.clone();
    return this;
  },
  yanghui: yanghui,
  run: function (cmd, param) {
    this.initialize()[cmd](isNaN(parseInt(param)) ? 0 : parseInt(param));
    over();
    return { frames: frames, others: {N:N} };
  }
};
