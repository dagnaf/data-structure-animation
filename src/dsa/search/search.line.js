var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0; var arr = [];

function LinearSearch (k, a, n, Compare) {
  var i;
  var r;
  for (i = 0; stop(line,1),_hl([i,n-1]), i < n; ++i) {_p([i,i]);currentStatus.k = k;
stop(line,1);    r = Compare(a[i], k);_c([i]);
    if (stop(line,1), r === 0) {
stop(line,1);_hl([i,i]);_r(1);      return i;
    } else if (stop(line,1),r > 0) {
stop(line,1);_c();      break;
    }_c();
  }
stop(line,1);_r(-1);  return -1;
}

function BinarySearch (k, a, n, Compare) {
stop(line,1);  var l = 0, m, r = n-1; _hl([l,r]);_p([l,r]); currentStatus.k = k;
  while (stop(line,1),l < r) {
stop(line,1);    m = Math.floor((l+r) / 2); _hl([m,m]);
    if (stop(line,1),_c([m]),Compare(k, a[m]) > 0) {
stop(line,1);      l = m+1;
    } else {
stop(line,1);      r = m;
    } _p([l,r]); _hl([l,r]);_c();
  }
  if (stop(line,1), _c([l]), Compare(k, a[l]) != 0) {
stop(line,1);_r(-1);    return -1;
  }
stop(line,1);_r(1);  return l;
}

// ===================================

function _p(x) {
  currentStatus.p = x || [];
}

function _c(x) {
  currentStatus.c = x || [];
}

function _hl(x) {
  currentStatus.hl = x || [];
}

function _r(x) {
  currentStatus.r = x;
}

currentStatus.clone = function () {
  return {
    arr: arr,
    p: clone(this.p) || [],
    hl: clone(this.hl) || [],
    k: this.k,
    c: clone(this.c) || [],
    r: this.r
  }
}
currentStatus.init = function (hard) {
  this.p = [];
  this.c = [];
  this.hl = [];
  this.k = undefined;
  this.r = 0;
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
  var line = (frames.length === 0) ? 0 : frames[frames.length-1].line;
  stop(line, 1);
}

module.exports = {
  getInitialDescriptions: function () {
    this.initialize(true);
    var n = 11;
    var arr = [1,1];
    for (i = 2; i < n; ++i) {
      arr.push(arr[i-1]+arr[i-2]);
    }
    return this.run('create', arr.join(' '));
  },
  // FIXME initialize(hard) is ambiguous among all such *.line.js
  //   because of the difference between dsa and app of dsa.
  initialize: function (hard) {
    frames = [];
    stopid = 0;
    _id = 0;
    currentStatus.init(hard);
    lastStatus = currentStatus.clone();
    return this;
  },
  lsearch: function (p) {
    LinearSearch(Math.max(1,parseInt(p)), arr, arr.length, function (a,b) { return a-b });
  },
  bsearch: function (p) {
    BinarySearch(Math.max(1,parseInt(p)), arr, arr.length, function (a,b) { return a-b });
  },
  create: function (p) {
    arr = p.split(' ').map(function (d) { return parseInt(d) }).filter(function (d) { return d > 0 });
    stop(0);
  },
  run: function (cmd, param) {
    this.initialize()[cmd](param);
    over();
    return { frames: frames, others: {} };
  }
};
