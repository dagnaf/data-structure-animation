var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0;





function _NewNode(k, v, l, r) {
  var node = {};
  node.key = k;
  node.v = v;
  node.left = l;
  node.right = r;
  return node;
}

function _NewItem(k, v, c) {
    var item = {}
    item.key = k;
    item.val = v;
    item.code = '';
    item.code = c;
    return item;
}








function _Traverse(t, x,s) {
    if (x.left === null && x.right === null) {
        t.table[t.size++] = _NewItem(x.key, x.val, s);
        return;
    }
    _Traverse(t, x.left, s+'0');
    _Traverse(t, x.right, s+'1');
}

function HuffmanTreeCreate(s) {
    var tbl = [];
    var i;

    var n;
    var s2;
    var tbl2;
    for (i = 0; i < 256; ++i) {
        tbl[i] = 0;
    }
    for (i = 0; i < s.length; ++i) {
        if (0 <= s[i] && s[i] < 256) {
            tbl[s.charCodeAt(i)] = (tbl[s.charCodeAt(i)] || 0)+1;
        }
    }
    n = 0;
    for (i = 0; i < 256; ++i) {
        if (tbl[i] > 0) {
            n++;
        }
    }
    j = 0;
    s2 = [];
    tbl2 = [];
    for (i = 0; i < 256; ++i) {
        if (tbl[i] > 0) {
            s2.push(String.fromCharCode(i));
            tbl2.push(tbl[i]);

        }
    }
    return HuffmanTreeCreateWithFreq(s2,tbl2);
}

function pop()




function HuffmanTreeCreateWithFreq(s, tbl) {
stop(line,1)    int i;
stop(line,1)    int n;
stop(line,1)    var heap;
stop(line,1)    var t;
stop(line,1)    var node;
stop(line,1)    var node1;
stop(line,1)    var node2;
stop(line,1)    n = s.length;
stop(line,1)    heap = { size: 0, capacity: n, array: [] };
stop(line,1)    for (i = 0; i < n; ++i) {
        node = { key: tbl[i], val: s[i], left: null, right: null };
        _HeapInsert(heap, node);
    }
stop(line,1)    while (heap.size > 1) {
stop(line,1)        node1 = _HeapPopMin(heap);
stop(line,1)        node2  = _HeapPopMin(heap);
stop(line,1)        node = _NewNode(node1.key + node2.key, node1.val, node1, node2);
stop(line,1)        _HeapInsert(heap, node);
stop(line,1)    }
stop(line,1)    t = (huffman_tree*)SafeMalloc(sizeof(huffman_tree));
stop(line,1)    t.root = _HeapPopMin(heap);
stop(line,1)    t.size = 0;
stop(line,1)    t.table = (huffman_tree_item**)SafeMalloc(sizeof(huffman_tree_item*)*n);
stop(line,1)    _Traverse(t, t.root, "");
stop(line,1)    return t;
}

// ===================================
function _ro(x, d) {
  if (x === undefined) {
    currentStatus.ro = undefined;
  } else {
    var p = (d === 'left' ? 'right' : 'left');
    var ids = [x.id, x[p].id,x[p][p].id, x[p][d].id,x[d].id];
    currentStatus.ro = {
      ids: ids,
      type: d
    }
  }
}
function _co(a) {
  if (a === undefined) {
    currentStatus.co = {};
  } else {
    currentStatus.co = (currentStatus.co || {});
    currentStatus.co[a.id] = a.color;
  }
}
function _hlsa(x) {
  currentStatus.hls.push(x.id);
}
function _hls(x) {
  currentStatus.hls.pop();
  if (x !== undefined) {
    _hlsa(x);
  }
}
function _hl() {
  if (arguments.length === 0) {
    currentStatus.hl = [];
  } else {
    currentStatus.hl = Array.prototype.map.call(arguments, function (x) {
      return x.id;
    })
  }
}
function _hla(x) {
  currentStatus.hl.push(x.id);
}
function _ne(a, b) {
  if (a === undefined) {
    currentStatus.ne = {};
  } else {
    var id = a.id+b;
    currentStatus.ne = (currentStatus.ne || {});
    currentStatus.ne[id] = a[b].id;
    currentStatus.ne.curr = id;
  }
}
function _np(a, b) {
  if (a === undefined) {
    currentStatus.np = {};
  } else {
    currentStatus.np = (currentStatus.np || {});
    currentStatus.np[a.id] = b.id;
  }
}
function _nn(a,b) {
  if (arguments.length === 0) {
    currentStatus.nn = undefined;
  } else {
    currentStatus.nn = { id: a.id, key: a.key, color: a.color, ref: b.id, extra: a.extra };
  }
}
function _cl() {
  _co();
  _ne();
  _np();
  _nn();
  currentStatus.lastTree = clone(tree);
}

function rbtCheck() {
  //
}

currentStatus.clone = function () {
  if (this.lastTree === undefined) {
    this.lastTree = clone(tree);
  }
  return {
    tree: this.lastTree,
    hl: clone(this.hl) || [],
    hls: clone(this.hls) || [],
    ne: clone(this.ne) || {},
    np: clone(this.np) || {},
    nn: clone(this.nn),
    co: clone(this.co) || {},
    ro: clone(this.ro) || undefined,
  }
}
currentStatus.init = function (hard) {
  if (hard) {
    tree.root = tree.nil;
  }
  this.hl = [];
  this.hls = [];
  this.ne = {};
  this.np = {};
  this.nn = undefined;
  this.co = {};
  this.ro = undefined;
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
    RBTreeInsert(10);
    RBTreeInsert(1);
    RBTreeInsert(2);
    RBTreeInsert(3);
    RBTreeInsert(4);
    RBTreeInsert(5);
    // RBTreeInsert(4);
    return this.run('insert', '6');
  },
  // FIXME initialize(hard) is ambiguous among all such *.line.js
  //   because of the difference between dsa and app of dsa.
  initialize: function (hard) {
    frames = [];
    stopid = 0;
    currentStatus.init(hard);
    lastStatus = currentStatus.clone();
    return this;
  },
  insert: RBTreeInsert,
  inorder: RBTreeInorderWalk,
  delete: RBTreeDelete,
  search: RBTreeSearch,
  check: rbtCheck,
  run: function (cmd, param) {
    this.initialize()[cmd](isNaN(parseInt(param)) ? 0 : parseInt(param));
    over();
    return { frames: frames, others: {} };
  }
};
