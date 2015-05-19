var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0; var arr = []; var barr = []; var rmp = {};

function _MergeSort() { barr = clone(arr); MergeSort(0, arr.length-1); arr = barr;}
function MergeSort(a, b) {_bg(a,b);_pt();
  var i, j, k, x;
  var t;
  if (stop(line,1),a == b) {
stop(line,1);_bg();    return;
  }
stop(line,1);  i = a;
stop(line,1);  j = a+Math.floor((b-a+1)/2); x = j;_pt(i,j);
stop(line,1);  MergeSort(i, j-1);
stop(line,1);  MergeSort(j, b); _mid(x);
stop(line,1);  t = [];
stop(line,1);  k = 0;
  while (stop(line,1),i < x && j <= b) {_pt(i,j);
    if (stop(line,1),_cf(i,j),arr[i] <= arr[j]) {
stop(line,1);      t[k] = arr[i];_dn(i,a+k);_cf();
stop(line,1);      i++;
    } else {
stop(line,1);      t[k] = arr[j];_dn(j,a+k);_cf();
stop(line,1);      j++;
    }_pt(i,j);
stop(line,1);    k++;
  }
  while (stop(line,1),i < x) {_pt(i,j);
stop(line,1);    t[k] = arr[i];_dn(i,a+k);
stop(line,1);    k++;
stop(line,1);    i++;
  }_pt(i,j);
  while (stop(line,1),j <= b) {_pt(i,j);
stop(line,1);    t[k] = arr[j];_dn(j,a+k);
stop(line,1);    k++;
stop(line,1);    j++;
  }_pt();
  for (i = a,k=0; stop(line,1),i <= b; ++i,++k) {
stop(line,1);    arr[i] = t[k];_dn();
  }
stop(line,1);_bg();_mid();
}
function _QuickSort() { barr = clone(arr); QuickSort(0, arr.length-1);_fin(); arr = barr;}
function QuickSort(a, b) {_bg(a,b);_pt();
  var i, j, t;
  if (stop(line,1),a >= b) {
stop(line,1);_bg();if (a===b) { _fin(a); }    return;
  }
stop(line,1);  i = a;_mid(a+1);
stop(line,1);  j = b;_pt(i,j);
  while (stop(line,1),i < j) {
    while (stop(line,1),i < j && (_cf(a,j), arr[a] <= arr[j])) {
stop(line,1);      j--;_pt(i,j);_cf();
    }
    while (stop(line,1),i < j && (_cf(a,i), arr[a] >= arr[i])) {
stop(line,1);      i++;_pt(i,j);_cf();
    }
stop(line,1);    t = arr[i]; arr[i] = arr[j]; arr[j] = t; _sw(i,j);_cf();
  }
stop(line,1);  t = arr[a]; arr[a] = arr[j]; arr[j] = t; _sw(a,j);_mid();_fin(j);
stop(line,1);  QuickSort(a, j-1);
stop(line,1);  QuickSort(j+1, b);
_bg();}

// ===================================
function _cf(a,b) {
  if (a === undefined) {
    currentStatus.cf = [];
  } else {
    currentStatus.cf = [{i:_gi(a),j: _gi(b)}];
  }
}
function _fin(j) {
  if (j === undefined) {
    currentStatus.fin = [];
  } else {
    currentStatus.fin.push(_gi(j));
  }
}
function _sw(i, j) {
  bi = _gi(i);
  bj = _gi(j);
  rmp[i] = bj;currentStatus.mp[bi] = j;
  rmp[j] = bi;currentStatus.mp[bj] = i;
}

function _gi(i) {
  return rmp[i] === 0 ? 0 : (rmp[i] || i);
}

function _mid(x) {
  if (x === undefined) {
    currentStatus.mid = [];
  } else {
    currentStatus.mid = [x]
  }
}

function _pt () {
  if (arguments.length === 0) {
    currentStatus.pt = [];
  } else {
    currentStatus.pt = Array.prototype.slice.call(arguments);
  }
}

function _bg(i,j) {
  if (i === undefined) {
    currentStatus.bg.pop();
  } else {
    currentStatus.bg.push([i,j]);
  }
}

function _dn(i, j) {
  if (i === undefined) {
    i = currentStatus.dn[0];
    rmp[currentStatus.mp[i]] = i;
    currentStatus.dn.shift();
  } else {
    i = _gi(i);
    currentStatus.dn.push(i);
    currentStatus.mp[i] = j;
  }
}

currentStatus.clone = function () {
  return {
    arr: barr,
    cf: clone(this.cf),
    fin: clone(this.fin),
    mid: clone(this.mid),
    bg: clone(this.bg),
    pt: clone(this.pt),
    dn: clone(this.dn),
    mp: clone(this.mp),
  }
}
currentStatus.init = function (hard) {
  rmp = [];
  this.cf = [];
  this.fin = [];
  this.mid = [];
  this.bg = [];
  this.pt = [];
  this.dn = [];
  this.mp = {};
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
    var array = [];
    for (i = 0; i < n; ++i) {
      array.push(Math.ceil(Math.random()*100))
    }
    return this.run('qsort', array.join(' '));
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
  msort: _MergeSort,
  qsort: _QuickSort,
  run: function (cmd, param) {
    var p = param.split(' ').map(function (d) { return parseInt(d) }).filter(function (d) { return d > 0 })
    if (p.length !== 0) {
      arr = p;
    }
    this.initialize()[cmd]();
    over();
    return { frames: frames, others: { } };
  }
};
