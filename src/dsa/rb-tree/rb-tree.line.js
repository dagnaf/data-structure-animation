var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0;
var _RED = 1; var _BLACK = 0;
function nil() { return { id: _id++, nil: true, key: 'nil', color: _BLACK }; };
var tree = { nil: nil() }; tree.root = tree.nil;



// 在更改left、right指针时，不对tree进行clone，
// 保存的是对于边修改的信息（需要长久保存，直到对tree进行clone后）
// 局部处理是都是这样处理，不对整颗树进行clone，而是长久地添加修改信息
// 直到对树处理完毕后再clone树，并删除这些信息。
// _ne tree not clone yet, but edges have changed
//   clear _ne before clone tree
// _nn tree not clone yet, but new node (probably new edge) have added
//   it keep info of start position
//   not clear _nn before clone tree, clear it after



function _LeftRotate (x) {_hl();_hlsa(x);_ro(x,'left');
  var y;
stop(line,1);  y = x.right;_hl(y,x);
stop(line,1);  x.right = y.left;_ne(x,'right');_hl(x,y.left);
  if (stop(line,1),y.left.nil !== true) {
stop(line,1);    y.left.p = x;_ne(y.left,'p');_hl(y.left, x);
  }
stop(line,1);  y.p = x.p;_ne(y,'p');_hl(y,x.p);
  if (stop(line,1),x.p.nil) {
stop(line,1);    tree.root = y;_hl(y);
  } else if (stop(line,1),x === x.p.left) {
stop(line,1);    x.p.left = y;_ne(x.p,'left');
  } else {
stop(line,1);    x.p.right = y;_ne(x.p,'right');
  }
stop(line,1);  y.left = x;_ne(y,'left');_hl(y,x);
stop(line,1);  x.p = y;_ne(x,'p');_hl(x,y); stop(line,1);_hl();_hls();_cl();_ro();
}

function _RightRotate (y) {_hl();_hlsa(y);_ro(y,'right');
    var x;
stop(line,1);    x = y.left;_hl(x,y);
stop(line,1);    y.left = x.right;_ne(y,'left');_hl(y,x.right);
    if (stop(line,1),x.right.nil !== true) {
stop(line,1);        x.right.p = y;_ne(x.right,'p');_hl(x.right,y);
    }
stop(line,1);    x.p = y.p;_ne(x,'p');_hl(x,y.p);
    if (stop(line,1),y.p.nil) {
stop(line,1);        tree.root = x; _hl(x);
    } else if (stop(line,1),y === y.p.right) {
stop(line,1);        y.p.right = x;_ne(y.p,'right');
    } else {
stop(line,1);        y.p.left = x;_ne(y.p,'left');
    }
stop(line,1);    x.right = y;_ne(x,'right');_hl(x,y);
stop(line,1);    y.p = x;_ne(y,'p'); _hl(y,x); stop(line,1);_hl();_hls();_cl();_ro();
}

function _InsertFixUp (z) {
    var y;
    while (stop(line,1),_hls(z),_hl(z,z.p),z.p.color === _RED) {
        if (stop(line,1),_hls(z.p.p),z.p === z.p.p.left) {
stop(line,1);            y = z.p.p.right;
            if (stop(line,1),_hl(y),y.color === _RED) {
stop(line,1);                z.p.color = _BLACK; _co(z.p);_hl(y,z.p);
stop(line,1);                y.color = _BLACK; _co(y);
stop(line,1);                z.p.p.color = _RED;_hl(y,z.p,z.p.p);
stop(line,1);                z = z.p.p;_hl(z);
            } else {
                if (stop(line,1),_hl(z.p,z),z === z.p.right) {
stop(line,1);                    z = z.p;_hl(z);
stop(line,1);                    _LeftRotate(z);
                }
stop(line,1);                z.p.color = _BLACK;_co(z.p);_hl(z.p);
stop(line,1);                z.p.p.color = _RED;_co(z.p.p);_hl(z.p.p);
stop(line,1);                _RightRotate(z.p.p);
            }
        } else {
stop(line,1);            y = z.p.p.left;
            if (stop(line,1),_hl(y),y.color === _RED) {
stop(line,1);                z.p.color = _BLACK;_co(z.p);_hl(y,z.p);
stop(line,1);                y.color = _BLACK;_co(y);
stop(line,1);                z.p.p.color = _RED;_hl(y,z.p,z.p.p);
stop(line,1);                z = z.p.p;_hl(z);
            } else {
                if (stop(line,1),_hl(z.p,z),z === z.p.left) {
stop(line,1);                    z = z.p;_hl(z);
stop(line,1);                    _RightRotate(z); _hl();_hls();_cl();
                }
stop(line,1);                z.p.color = _BLACK;_co(z.p);_hl(z.p);
stop(line,1);                z.p.p.color = _RED;_co(z.p.p);_hl(z.p.p);
stop(line,1);                _LeftRotate(z.p.p); _hl();_hls();_cl();
            }
        }
    }
stop(line,1);    tree.root.color = _BLACK; _cl();_hl();_hls();
}

function _Insert (z) {
    var x;
    var y;
stop(line);    y = tree.nil;
stop(line);    x = tree.root;
    while (stop(line,1),_hls(x),x.nil !== true) {
stop(line,1);        y = x;
        if (stop(line),z.key < x.key) {
stop(line,1);            x = x.left;_nn(z,x);
        } else {
stop(line,1);            x = x.right;_nn(z,x);
        }
    }_hls(y);
stop(line,1);    z.p = y; _ne(z,'p');
    if (stop(line,1),y === tree.nil) {
stop(line,1);        tree.root = z;
    } else if (stop(line,1),z.key < y.key) {//_hls(y.left);
stop(line,1);        y.left = z;_ne(y,'left');
    } else {//_hls(y.right);
stop(line,1);        y.right = z;_ne(y,'right');
    }_hls(z);
stop(line,1);    z.left = nil();_cl();
stop(line,1);    z.right = nil();_cl();
stop(line,1);    z.color = _RED;_co(z);
stop(line,1);    _InsertFixUp(z);
}

function RBTreeInsert (key) {
    var newNode = {};
stop(line);    newNode.id = _id++;
stop(line);    newNode.key = key;_nn(newNode,tree.root);
stop(line,1);    _Insert(newNode);
}

function _Transplant (u, v) {
    if (stop(line,1),u.p.nil) {
stop(line,1);        tree.root = v;
    } else if (stop(line,1),u === u.p.left) {
stop(line,1);        u.p.left = v;
    } else {
stop(line,1);        u.p.right = v;
    }
stop(line,1);    v.p = u.p;
}

function _DeleteFixUp (x) {
    var w;
    while (stop(line,1),x !== tree.root && x.color === _BLACK) {
        if (stop(line,1),x === x.p.left) {
stop(line,1);            w = x.p.right;
stop(line,1);            if (stop(line,1),w.color === _RED) {
stop(line,1);                w.color = _BLACK;
stop(line,1);                x.p.color = _RED;
stop(line,1);                _LeftRotate(x.p);
stop(line,1);                w = x.p.right;
            }
            if (stop(line,1),w.left.color === _BLACK && w.right.color === _BLACK) {
stop(line,1);                w.color = _RED;
stop(line,1);                x = x.p;
            } else {
                if (stop(line,1),w.right.color === _BLACK) {
stop(line,1);                    w.left.color = _BLACK;
stop(line,1);                    w.color = _RED;
stop(line,1);                    _RightRotate(w);
stop(line,1);                    w = x.p.right;
                }
stop(line,1);                w.color = x.p.color;
stop(line,1);                x.p.color = _BLACK;
stop(line,1);                w.right.color = _BLACK;
stop(line,1);                _LeftRotate(x.p);
stop(line,1);                x = tree.root;
            }
        } else {
stop(line,1);            w = x.p.left;
            if (stop(line,1),w.color === _RED) {
stop(line,1);                w.color = _BLACK;
stop(line,1);                x.p.color = _RED;
stop(line,1);                _RightRotate(x.p);
stop(line,1);                w = x.p.left;
            }
            if (stop(line,1),w.right.color === _BLACK && w.left.color === _BLACK) {
stop(line,1);                w.color = _RED;
stop(line,1);                x = x.p;
            } else {
                if (stop(line,1),w.left.color === _BLACK) {
stop(line,1);                    w.right.color = _BLACK;
stop(line,1);                    w.color = _RED;
stop(line,1);                    _LeftRotate(t,w);
stop(line,1);                    w = x.p.left;
                }
stop(line,1);                w.color = x.p.color;
stop(line,1);                x.p.color = _BLACK;
stop(line,1);                w.left.color = _BLACK;
stop(line,1);                _RightRotate(x.p);
stop(line,1);                x = tree.root;
            }
        }
    }
stop(line,1);    x.color =_BLACK;
}

function _Minimum (z) {
    while (stop(line,1),z.left.nil !== true) {
stop(line,1);        z = z.left;
    }
stop(line,1);    return z;
}

function _Delete (z) {
    var x;
    var y;
    var y_original_color;
stop(line,1);    y = z;
stop(line,1);    y_original_color = y.color;
    if (stop(line,1),z.left.nil) {
stop(line,1);        x = z.right;
stop(line,1);        _Transplant(z, z.right);
    } else if (stop(line,1),z.right.nil) {
stop(line,1);        x = z.left;
stop(line,1);        _Transplant(z, z.left);
    } else {
stop(line,1);        y = _Minimum(z.right);
stop(line,1);        y_original_color = y.color;
stop(line,1);        x = y.right;
        if (stop(line,1),y.p === z) {
stop(line,1);            x.p = y;
        } else {
stop(line,1);            _Transplant(y, y.right);
stop(line,1);            y.right = z.right;
stop(line,1);            y.right.p = y;
        }
stop(line,1);        _Transplant(z, y);
stop(line,1);        y.left = z.left;
stop(line,1);        y.left.p = y;
stop(line,1);        y.color = z.color;
    }
    if (stop(line,1),y_original_color === _BLACK) {
stop(line,1);        _DeleteFixUp(x);
    }
}

function _Search (x, k) {var z = { id: _id++, key: k }; _nn(z, tree.root);
    while (stop(line,1),_hls(x),x.nil !== true && k !== x.key) {
        if (stop(line,1),k < x.key) {
stop(line,1);            x = x.left;_nn(z,x);
        } else {
stop(line,1);            x = x.right;_nn(z,x);
        }
    }_hls();_hl(x);
stop(line,1);_nn();    return x;
}

function RBTreeSearch (k) {
stop(line,1); rc = _Search(tree.root, k);
stop(line,1); _nn({ id: _id, key: rc.nil !== true ? k : 'X' }, rc);}

function RBTreeDelete (key) {
stop(line,1);    var newNode = _Search(tree.root,key);
    if (stop(line,1),newNode.nil !== true) {
stop(line,1);        _Delete(newNode);
    }
}
// FIXME should not define view property '递归/回溯/完成' here, should publish cmds/actions
function _InorderWalk (x,z) {z.key='递归';_nn(z,x);
    if (stop(line,1),x.nil !== true) {
stop(line,1);        _InorderWalk(x.left,z);z.key='回溯';_nn(z,x);
stop(line,1);_hla(x);
stop(line,1);        _InorderWalk(x.right,z);z.key='回溯';_nn(z,x);
stop(line,1);    }
stop(line,1);}

function RBTreeInorderWalk() {var newNode = { id: _id++, key: '指针' };_hl(newNode);
stop(line,1);  _InorderWalk(tree.root, newNode);
stop(line,1);newNode.key='完成';_nn(newNode,tree.root);
}
// ===================================
function _ro(x, d) {
  if (x === undefined) {
    currentStatus.ro = undefined;
  } else {
    var p = (d === 'left' ? 'right' : 'left');
    var ids = [x.id, x[p].id,x[p][p].id, x[p][d].id,x[d].id];
    currentStatus.ro = ids;
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
  }
}
function _nn(a,b) {
  if (arguments.length === 0) {
    currentStatus.nn = undefined;
  } else {
    currentStatus.nn = { id: a.id, key: a.key, color: a.color, ref: b.id };
  }
}
function _cl() {
  _co();
  _ne();
  _nn();
  currentStatus.lastTree = clone(tree);
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
    return this.run('insert', '5');
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
  run: function (cmd, param) {
    this.initialize()[cmd](isNaN(parseInt(param)) ? 0 : parseInt(param));
    over();
    return { frames: frames, others: {} };
  }
};


// FIXME write here because don't want to change the line above
//   queue,queue-yanghui,stack,stack-eval.line.js should be rewrite
//   the function name should be consistent with the c files
//   Also their c files should be rewrite, with a more formal c style naming
//   conventions.
