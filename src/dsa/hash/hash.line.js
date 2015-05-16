var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0; var ht = {}; var hash_fn; var hash_type;



function _SetTable(i, key) {
    ht.occupied[i] = 1;
    ht.table[i][0].d = key;
}



function _GetSlot(i) {
    var j = i;
    var occupied = ht.occupied[i];
    if (stop(line,1),_p(i,0),occupied !== 1) {
stop(line,1);        return i;
    }
    for (j = (i+1) % ht.n; stop(line,1),_p(j,0),j !== i; j = (j+1) % ht.n) {
        occupied = ht.occupied[j];
        if (stop(line,1),occupied !== 1) {
stop(line,1);          return j;
        }
    }
stop(line,1);    return -1;
}

function HashClosedInsert(key) {_k(key);
stop(line,1);    var i = _hash_fn(key);_h(i);
stop(line,1);    i = _GetSlot(i);
stop(line,1);    if (i !== -1) {
stop(line,1);        _SetTable(i, key);_clone();
stop(line,1);_r(i);        return key;
    }
stop(line,1);_r(-1);    return null;
}

function _UnsetTable(i) {
    ht.occupied[i] = -1;
}



function _HashClosedSearch(key) {_k(key);
stop(line,1);    var i = _hash_fn(key);_h(i);
    var j;
    var occupied = ht.occupied[i];
    if (stop(line,1),_p(i,0),occupied === 0) {
stop(line,1);        return -1;
    }
    if (stop(line,1),occupied === 1 && key === ht.table[i][0].d) {
stop(line,1);        return i;
    }
    for (j = (i+1) % ht.n; stop(line,1),_p(j,0),j !== i; j = (j+1) % ht.n) {
        occupied = ht.occupied[j];
        if (stop(line,1),occupied === 0) {
          break;
        }
        if (stop(line,1),occupied === 1 && key === ht.table[j][0].d) {
stop(line,1);            return j;
        }
    }
stop(line,1);    return -1;
}

function HashClosedDelete(key) {
stop(line,1);    var i = _HashClosedSearch(key);
    if (stop(line,1),i == -1) {
stop(line,1);_r(-1);        return null;
    }
stop(line,1);    _UnsetTable(i);_clone();
stop(line,1);_r(i);    return key;
}

function HashClosedSearch(key) {
stop(line,1);    var i = _HashClosedSearch(key);
stop(line,1);_r(i);    return i == -1 ? null : key;
}

// ===================================

function HashOpenInsert(key) {_k(key);
stop(line,1);  var i = _hash_fn(key);_h(i);
  var p =ht.table[i];
  ht.occupied[i] = 1;
stop(line,1); if (p[0].d !== 'X') {p.unshift({d:'', id: _id++});_clone();}
stop(line,1);
stop(line,1);
stop(line,1);  p[0].d = key;_clone();
stop(line,1); return key;
}

function _HashOpenSearch(key) {_k(key);
stop(line,1);    var i = _hash_fn(key);_h(i);
  var p = ht.table[i];
  var r = -1;

  for (var j = 0; stop(line,1),_p(i,j),j < p.length; ++j) {


    if (stop(line,1),p[j].d === key) {
stop(line,1);      r = j;
stop(line,1);      break;
    }
  }
stop(line,1); return [i,r];
}

function HashOpenDelete(key) {
stop(line,1);    var r = _HashOpenSearch(key);

stop(line,1);    if (r === -1) {
stop(line,1);_r(r);       return null;
    }
    var i = r[0];
    var j = r[1];


stop(line,1);   _RemoveOpen(i,j);
stop(line,1);_r(j);   return key;
}

function HashOpenSearch(key) {
stop(line,1);    var p = _HashOpenSearch(key);
stop(line,1);_r(p);    return p === -1 ? null : key;
}

function _RemoveOpen(i,j) {
    ht.occupied[i] = (ht.table[i].length-1 > 0) ? 1 : 0;
    if (ht.table[i].length === 1) {
      ht.table[i][0].d = 'X';
      ht.occupied[i] = 0;
    } else {
      ht.table[i] = ht.table[i].slice(0,j).concat(ht.table[i].slice(j+1));
    }
    _clone();
}

// ======================================

function HashCreate(n, h) {
    ht = {}
    ht.table = [];
    ht.n = n;
    ht.occupied = [];
    for (var i = 0; i < n; ++i) {
      ht.occupied[i] = 0;
      ht.table[i] = [{d:'X', id:_id++}];
    }
    ht.fn = h;
    hash_fn = new Function('x', 'return '+h);
}

// ===================================
function _k(key) {
  currentStatus.key = key;
}

function _h(i) {
  currentStatus.pos = i;
}

function _p(i,j) {
  currentStatus.ptr = {i: i, j: j};
}
function _r(i) {
  currentStatus.r = i;
}
var lastHt;
function _clone() {
  lastHt = clone(ht);
}

function _hash_fn(x) {
  x = hash_fn(x) % ht.n;
  if (x < 0) {
    x = (x + ht.n) % ht.n;
  }
  x = Math.floor(x);
  return isNaN(x) ? 0 : x;
}

currentStatus.clone = function () {
  return {
    ht: lastHt,
    key: this.key,
    pos: this.pos,
    ptr: clone(this.ptr),
    r: this.r
  }
}
currentStatus.init = function (hard) {
  lastHt = clone(ht);
  this.key = undefined;
  this.pos = undefined;
  this.ptr = {};
  this.r = undefined;
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

function _parse_int(x) {
  x = parseInt(x);
  return isNaN(x) ? 0 : x;
}

module.exports = {
  getInitialDescriptions: function () {
    this.initialize(true);
    var n = 11;
    var arr = [1,1];
    for (i = 2; i < n; ++i) {
      arr.push(arr[i-1]+arr[i-2]);
    }
    return this.run('create', {n:'10', f: 'x', t: 'ho' });
  },
  // FIXME initialize(hard) is ambiguous among all such *.line.js
  //   because of the difference between dsa and app of dsa.
  initialize: function (hard) {
    frames = [];
    stopid = 0;
    if (hard) {
      _id = 0;
    }
    currentStatus.init(hard);
    lastStatus = currentStatus.clone();
    return this;
  },
  create: function (p) {
    hash_type = p.t;
    HashCreate(_parse_int(p.n),p.f);
    currentStatus.init();
    stop(0, 1);
  },
  searchhc: HashClosedSearch,
  searchho: HashOpenSearch,
  inserthc: HashClosedInsert,
  insertho: HashOpenInsert,
  deletehc: HashClosedDelete,
  deleteho: HashOpenDelete,
  run: function (cmd, param) {
    if (cmd.indexOf('create') === -1) {
      param = _parse_int(param);
      cmd += (hash_type || 'hc');
      this.initialize()[cmd](param);
    } else {
      this.initialize(true)[cmd](param);
    }
    over();
    return { frames: frames, others: {} };
  }
};
