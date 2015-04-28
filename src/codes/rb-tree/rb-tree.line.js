var _ = require('underscore'); var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0;
var _RED = 1; var _BLACK = 0;
var tree = { nil: { color: _BLACK, key: 'nil' } };
tree.root = tree.nil;
tree.nil.left = tree.nil.right = tree.nil.p = tree.nil;
var nil = tree.nil;

// 在更改left、right指针时，不对tree进行clone，
// 保存的是对于边修改的信息（需要长久保存，直到对tree进行clone后）
// 局部处理是都是这样处理，不对整颗树进行clone，而是长久地添加修改信息
// 直到对树处理完毕后再clone树，并删除这些信息。












function _LeftRotate (x) {
  var y;
stop(line);  y = x.right;
stop(line);  x.right = y.left;
  if (stop(line),y.left !== nil) {
stop(line);    y.left.p = x;
  }
stop(line);  y.p = x.p;
  if (stop(line),x.p === nil) {
stop(line);    tree.root = y;
  } else if (stop(line),x === x.p.left) {
stop(line);    x.p.left = y;
  } else {
stop(line);    x.p.right = y;
  }
stop(line);  y.left = x;
stop(line);  x.p = y;
}

function _RightRotate (y) {
    var x;
stop(line);    x = y.left;
stop(line);    y.left = x.right;
    if (stop(line),x.right !== nil) {
stop(line);        x.right.p = y;
    }
stop(line);    x.p = y.p;
    if (stop(line),y.p === nil) {
stop(line);        tree.root = x;
    } else if (stop(line),y === y.p.right) {
stop(line);        y.p.right = x;
    } else {
stop(line);        y.p.left = x;
    }
stop(line);    x.right = y;
stop(line);    y.p = x;
}

function _InsertFixUp (z) {
    var y;
    while (stop(line),z.p.color === _RED) {
        if (stop(line),z.p === z.p.p.left) {
stop(line);            y = z.p.p.right;
            if (stop(line),y.color === _RED) {
stop(line);                z.p.color = _BLACK;
stop(line);                y.color = _BLACK;
stop(line);                z.p.p.color = _RED;
stop(line);                z = z.p.p;
            } else {
                if (stop(line),z === z.p.right) {
stop(line);                    z= z.p;
stop(line);                    _LeftRotate(z);
                }
stop(line);                z.p.color = _BLACK;
stop(line);                z.p.p.color = _RED;
stop(line);                _RightRotate(z.p.p);
            }
        } else {
stop(line);            y = z.p.p.left;
            if (stop(line),y.color === _RED) {
stop(line);                z.p.color = _BLACK;
stop(line);                y.color = _BLACK;
stop(line);                z.p.p.color = _RED;
stop(line);                z = z.p.p;
            } else {
                if (stop(line),z === z.p.left) {
stop(line);                    z= z.p;
stop(line);                    _RightRotate(z);
                }
stop(line);                z.p.color = _BLACK;
stop(line);                z.p.p.color = _RED;
stop(line);                _LeftRotate(z.p.p);
            }
        }
    }
stop(line);    tree.root.color = _BLACK;
}

function _Insert (z) {
    var x;
    var y;
stop(line);    y = tree.nil;
stop(line);    x = tree.root;
    while (stop(line,1),x !== nil) {
stop(line);        y = x;
        if (stop(line),z.key < x.key) {
stop(line);            x = x.left;
        } else {
stop(line);            x = x.right;
        }
    }
stop(line);    z.p = y;
    if (stop(line),y === tree.nil) {
stop(line);        tree.root = z;
    } else if (stop(line),z.key < y.key) {
stop(line);        y.left = z;
    } else {
stop(line);        y.right = z;
    }
stop(line);    z.left = nil;
stop(line);    z.right = nil;
stop(line);    z.color = _RED;
stop(line);    _InsertFixUp(z);
}

function RBTreeInsert (key) {
    var newNode = {};
stop(line,1);    newNode.id = _id++;
stop(line,1);    newNode.key = key;
stop(line);    _Insert(newNode);
}

function _Transplant (u, v) {
    if (stop(line),u.p === nil) {
stop(line);        tree.root = v;
    } else if (stop(line),u === u.p.left) {
stop(line);        u.p.left = v;
    } else {
stop(line);        u.p.right = v;
    }
stop(line);    v.p = u.p;
}

function _DeleteFixUp (x) {
    var w;
    while (stop(line),x !== tree.root && x.color === _BLACK) {
        if (stop(line),x === x.p.left) {
stop(line);            w = x.p.right;
stop(line);            if (stop(line),w.color === _RED) {
stop(line);                w.color = _BLACK;
stop(line);                x.p.color = _RED;
stop(line);                _LeftRotate(x.p);
stop(line);                w = x.p.right;
            }
            if (stop(line),w.left.color === _BLACK && w.right.color === _BLACK) {
stop(line);                w.color = _RED;
stop(line);                x = x.p;
            } else {
                if (stop(line),w.right.color === _BLACK) {
stop(line);                    w.left.color = _BLACK;
stop(line);                    w.color = _RED;
stop(line);                    _RightRotate(w);
stop(line);                    w = x.p.right;
                }
stop(line);                w.color = x.p.color;
stop(line);                x.p.color = _BLACK;
stop(line);                w.right.color = _BLACK;
stop(line);                _LeftRotate(x.p);
stop(line);                x = tree.root;
            }
        } else {
stop(line);            w = x.p.left;
            if (stop(line),w.color === _RED) {
stop(line);                w.color = _BLACK;
stop(line);                x.p.color = _RED;
stop(line);                _RightRotate(x.p);
stop(line);                w = x.p.left;
            }
            if (stop(line),w.right.color === _BLACK && w.left.color === _BLACK) {
stop(line);                w.color = _RED;
stop(line);                x = x.p;
            } else {
                if (stop(line),w.left.color === _BLACK) {
stop(line);                    w.right.color = _BLACK;
stop(line);                    w.color = _RED;
stop(line);                    _LeftRotate(t,w);
stop(line);                    w = x.p.left;
                }
stop(line);                w.color = x.p.color;
stop(line);                x.p.color = _BLACK;
stop(line);                w.left.color = _BLACK;
stop(line);                _RightRotate(x.p);
stop(line);                x = tree.root;
            }
        }
    }
stop(line);    x.color =_BLACK;
}

function _Minimum (z) {
    while (stop(line),z.left !== nil) {
stop(line);        z = z.left;
    }
stop(line);    return z;
}

function _Delete (z) {
    var x;
    var y;
    var y_original_color;
stop(line);    y = z;
stop(line);    y_original_color = y.color;
    if (stop(line),z.left === nil) {
stop(line);        x = z.right;
stop(line);        _Transplant(z, z.right);
    } else if (stop(line),z.right === nil) {
stop(line);        x = z.left;
stop(line);        _Transplant(z, z.left);
    } else {
stop(line);        y = _Minimum(z.right);
stop(line);        y_original_color = y.color;
stop(line);        x = y.right;
        if (stop(line),y.p === z) {
stop(line);            x.p = y;
        } else {
stop(line);            _Transplant(y, y.right);
stop(line);            y.right = z.right;
stop(line);            y.right.p = y;
        }
stop(line);        _Transplant(z, y);
stop(line);        y.left = z.left;
stop(line);        y.left.p = y;
stop(line);        y.color = z.color;
    }
    if (stop(line),y_original_color === _BLACK) {
stop(line);        _DeleteFixUp(x);
    }
}

function _Search (x, k) {
    while (stop(line),x !== nil && k !== x.key) {
        if (stop(line),k < x.key) {
stop(line);            x = x.left;
        } else {
stop(line);            x = x.right;
        }
    }
stop(line);    return x;
}

function RBTreeSearch (k) {
  return _Search(tree.root, k);
}

function RBTreeDelete (key) {
    var newNode = _Search(tree.root,key);
    if (stop(line),newNode !== nil) {
stop(line);        _Delete(newNode);
    }
}

function _InorderWalk (x) {
    if (stop(line),x !== nil) {
stop(line);        _InorderWalk(x.left);
stop(line);        console.log(x.key);
stop(line);        _InorderWalk(x.right);
    }
}

function RBTreeInorderWalk() {
  _InorderWalk(tree.root);
}
// ===================================

currentStatus.clone = function () {
  return {
    tree: clone(tree),
  }
}
currentStatus.init = function (hard) {
  if (hard) {
    tree.root = tree.nil;
    tree.nil.left = tree.nil.right = tree.nil.p = tree.nil;
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
  stop(_.last(frames).line, 1);
}

module.exports = {
  getInitialDescriptions: function () {
    this.initialize(true);
    RBTreeInsert(10);
    RBTreeInsert(1);
    RBTreeInsert(2);
    RBTreeInsert(3);
    RBTreeInsert(4);
    return this.run('insert', 5);
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
