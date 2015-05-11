var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0;
/*



 */
function _NewNode(k,v,l,r) {
  var node = { id: _id++, p: null};
  node.key = k;
  node.val = v;
  node.left = l; if (l !== null) {l.p = node;}
  node.right = r; if (r !== null) {r.p = node}; _set_size(node);
  return node;
}

function _set_size(x) {
  if (x.left === null && x.right === null) {
    x.size = 1;
  } else {
    x.size = 0;
    if (x.left !== null) {
      x.size += x.left.size;
    }
    if (x.right !== null) {
      x.size += x.right.size;
    }
  }
}



function _Traverse(t, x, s) {
    if (x.left === null && x.right === null) {
        t.table[t.size++] = { key: x.key, val: x.val, code: s};
        return;
    }
    _Traverse(t, x.left, s+'0');
    _Traverse(t, x.right, s+'1');
}

function HuffmanTreeCreate(s) {
    var tbl = {};
    var tbl2 = [];
    var val;
    var c;
    var i;


currentStatus.l = s.length;
stop(line,1);    for (i = 0; i < s.length; ++i) {
        var c = s.charCodeAt(i);
        tbl[c] = (tbl[c] || 0)+1


    }
/*



 */
stop(line,1);    for (i in tbl) {
        if (tbl[i] > 0) {
            val = String.fromCharCode(i);
            tbl2.push(_NewNode(tbl[i], val, null, null));
        }
    }currentStatus.array = tbl2;currentStatus.n = tbl2.length;


stop(line,1);    return HuffmanTreeCreateWithFreq(tbl2);
}

function _CompareFn(a,b) {
  return (a.key !== b.key) ? (a.key-b.key) : (a.id -b.id);
}

function HuffmanTreeCreateWithFreq(tbl) {
    var i;
    var n;
    var h;
    var t;
    var node;
    var node1;
    var node2;
    n = tbl.length;
stop(line,1);    h = new heap(_CompareFn); currentStatus.sorted = true;
    for (i = 0; i < n; ++i) {
        h.insert(tbl[i]);
    }currentStatus.array = h.array;

    while (stop(line,1),h.array.length > 1) {
stop(line);        node1 = h.pop();currentStatus.hl = 1; currentStatus.pop = [node1];
stop(line,1);        node2  = h.pop();currentStatus.hl = 2; currentStatus.pop.push(node2);
stop(line,1);        node = _NewNode(node1.key + node2.key, '', node1, node2); currentStatus.pop = [node]; currentStatus.hl = 1;
stop(line,1);        h.insert(node); currentStatus.pop = []; currentStatus.hl = 0;
    }
stop(line,1);
stop(line);
stop(line);
stop(line);
stop(line);currentStatus.zo = true;
stop(line,1);    return t;
}
// ===================================

currentStatus.clone = function () {
  return {
    array: clone(this.array) || [],
    pop: clone(this.pop) || [],
    n: this.n || 0,
    l: this.l || 0,
    zo: this.zo || false,
    sorted: this.sorted || false,
    hl: this.hl || 0
  }
}
currentStatus.init = function (hard) {
  this.array = [];
  this.pop = [];
  this.n = 0;
  this.l = 0;
  this.zo = false;
  this.sorted = false;
  this.hl = 0;
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
    this.initialize(true);

    return this.run('create', 'The quick brown fox jumps over the lazy dog');
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
  create: HuffmanTreeCreate,
  run: function (cmd, param) {
    this.initialize()[cmd](param);
    over();
    return { frames: frames, others: {} };
  }
};

function heap(cf) {
  this.array = [];
  this.cf = cf;
}

heap.prototype.p = function (x) {
  return x == 0 ? 0 : Math.floor((x-1)/2);
}

heap.prototype.l = function (x) {
  return x*2+1;
}

heap.prototype.r = function (x) {
  return x*2+2;
}

heap.prototype.ex = function (i,j) {
  var tmp = this.array[i];
  this.array[i] = this.array[j];
  this.array[j] = tmp;
}

heap.prototype.insert = function (v) {
  this.array.push(v);
  var x = this.array.length-1;
  while (x != 0 && this.cf(this.array[x], this.array[this.p(x)]) < 0) {
    this.ex(x,this.p(x));
    x = this.p(x);
  }
}

heap.prototype.pop = function () {
  var x,y,v;
  if (this.array.length === 0) {
    return;
  }
  v = this.array[0];
  this.array[0] = this.array[this.array.length-1];
  this.array.pop();
  x = 0; y = -1;
  while (x !== y) {
    y = x;
    if (this.array[this.l(x)] !== undefined) {
      if (this.cf(this.array[this.l(x)], this.array[x]) < 0) {
        y = this.l(x);
      }
    }
    if (this.array[this.r(x)] !== undefined) {
      if (this.cf(this.array[this.r(x)], this.array[y]) < 0) {
        y = this.r(x);
      }
    }
    if (y != x) {
      this.ex(x,y);
      x = y;
      y = -1;
    }
  }
  return v;
}
