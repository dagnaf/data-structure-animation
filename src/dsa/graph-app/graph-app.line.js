var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0; var g = {}; var bfs;



// === 6 ===
function GraphBFS(x) {bfs = true;




  if (stop(line,1),x < 0 || x >= g.n) {
    return;
  }
  var q = [];currentStatus.inq = q;
  var inq = [];
  var vis = [];currentStatus.vis = vis;
  var arr = [];
  var i;



  i = x;
stop(line,1);  q.push(i);
stop(line,1);  inq[i] = 1;
  while (stop(line,1),q.length > 0) {
stop(line);    u = q[0];
stop(line,1);    q.splice(0,1);
stop(line,1);    vis[u] = 1;
stop(line,1);    inq[u] = 0;
stop(line);    arr.push(u);
    for (var ei = 0; stop(line,1),_s(),ei < g.e[u].length; ei++) {var e = g.e[u][ei];
      if (stop(line,1),_s(e),!vis[e.v] && !inq[e.v]) {
stop(line,1);        q.push(e.v);_e(e);
stop(line,1);        inq[e.v] = 1;
      }
    }
  }



stop(line,1);  return arr;
}
// === 44 ===
function GraphDFS(x) {bfs = false;





  if (stop(line,1),x < 0 || x >= g.n) {
    return;
  }
  var su = [];currentStatus.inq = su;
  var se = [];
  var arr = [];
  var vis = [];currentStatus.vis = vis;
  var ins = [];
  var i, u;



  i = x;
stop(line,1);  su.push(i);
  se.push(0);
stop(line,1);  ins[i] = 1;
  while (stop(line,1),su.length > 0) {
stop(line);    u = su[su.length-1];
    ei = se[se.length-1];
    for (; stop(line,1),_s(),ei < g.e[u].length; ei++) {var e = g.e[u][ei];
      if (stop(line,1),_s(e),!vis[e.v] && !ins[e.v]) {
        se.pop();
        se.push(ei+1);
stop(line,1);        su.push(e.v);_e(e);
        se.push(0);
stop(line,1);        ins[e.v] = 1;
stop(line,1);        break;
      }
    }
    if (stop(line,1),ei >= g.e[u].length) {
stop(line,1);      su.pop();
      se.pop();
stop(line,1);      vis[u] = 1;
stop(line,1);      ins[u] = 0;
stop(line,1);      arr.push(u);
    }
  }




stop(line,1);  return arr;
}
// ======94====
function GraphTopoSort() {
    var su = []; currentStatus.inq = su;
    var se = [];
    var arr = []; currentStatus.arr = arr;
    var vis = [];vis.length = g.n; currentStatus.vis = vis;
    var ins = [];
    var ei;
    var i, u;
    var circular = 0;




    for (i = 0; stop(line,1),_hl(i),i < g.n && !circular; ++i) {
        if (stop(line,1),vis[i]) {
stop(line);            continue;
        }
stop(line);        su.push(i);
        se.push(0);
        ins[i] = 1;
        while (stop(line,1),su.length && !circular) {
            u = su[su.length-1];
            ei = se[se.length-1];
            for (; stop(line),_s(),ei < g.e[u].length; ei++) {var e = g.e[u][ei];
                if (stop(line,1),_s(e),!vis[e.v] && !ins[e.v]) {
                    se.pop();
                    se.push(ei+1);
stop(line,1);                    su.push(e.v);_e(e);
                    se.push(0);
                    ins[e.v] = 1;
                    break;
                } else if (stop(line,1),ins[e.v]) {
stop(line,1);                    circular = 1;_es(e.v);
stop(line,1);                    break;
                }
            }
            if (stop(line),ei >= g.e[u].length) {
stop(line);                su.pop();
                se.pop();
stop(line,1);                vis[u] = 1;
                ins[u] = 0;
stop(line,1);                arr.push(u);
            }
        }
    }




    if (stop(line,1),_hl(),circular) {

stop(line,1);        return;
    }
stop(line,1);    return arr;
}
// =========150=========
var _gId;
var _gColorK;
var _gColor;
var _gIndex;
var _gLowLk;
var _gInStk;
var _gStack;
var _gLowEg;
var _gDfsEg;



function _GraphSccTarjanColor(u) {_hl(u);
    var v;
    var ei;
stop(line,1);    _gIndex[u] = _gId++;
stop(line,1);    _gLowLk[u] = _gIndex[u];
stop(line,1);    _gStack.push(u);
    _gInStk[u] = 1;
    for (ei = 0; stop(line,1),_s(),ei < g.e[u].length; ei++) {var e = g.e[u][ei];
        if (stop(line,1),_s(e),_gIndex[e.v] === undefined && !_gInStk[e.v]) {_e(e);_gDfsEg[e.v]=e;
stop(line,1);_s();            _GraphSccTarjanColor(e.v);_hl(u);
stop(line,1);            _gLowLk[u] = Math.min(_gLowLk[u], _gLowLk[e.v]);
        } else if (stop(line,1),_gInStk[e.v]) {
stop(line,1);if(_gLowLk[u] > _gIndex[e.v]) {_gLowEg[u]=e;}            _gLowLk[u] = Math.min(_gLowLk[u], _gIndex[e.v]);
        }
    }currentStatus.vis[u] = 1;v = _gStack[_gStack.length-1];
    if (stop(line,1),_gLowLk[u] === _gIndex[u]) { _es2(u);
        do {
            v = _gStack[_gStack.length-1]; if (_gLowEg[v]) {_s(_gLowEg[v]);}
stop(line,1);            _gStack.pop();
            _gInStk[v] = 0;
stop(line,1);            _gColor[v] = _gColorK;
        } while (stop(line,1),v !== u);
stop(line,1);        _gColorK++;_s();
    }
}

function GraphSccTarjan() {
    var i;
    _gId = 0;
    _gColorK = 0;
    _gColor = [];currentStatus.col = _gColor;
    _gIndex = [];currentStatus.ind = _gIndex;
    _gLowLk = [];currentStatus.low = _gLowLk;
    _gInStk = [];
    _gStack = [];currentStatus.inq = _gStack;
    currentStatus.vis = [];
    _gLowEg = [];
    _gDfsEg = [];

    for (i = 0; stop(line,1),_hl(i),i < g.n; ++i) {
        if (stop(line),_gIndex[i] === undefined) {
stop(line);            _GraphSccTarjanColor(i);
        }
    }




stop(line);_hl();    return _gColor;
}
// ===============================
function _es2(u) {
  for(var i = _gStack.length-1; _gStack[i] != u; --i) {
    if (_gDfsEg[_gStack[i]]) {
      _s(_gDfsEg[_gStack[i]]);
    }
  }
}
function createGraph(data) {
  g.n = data.n;
  g.e = [];
  for (var i = 0; i < g.n; ++i) g.e.push([]);
  data.e.forEach(function (d) {
    g.e[d.u].push(d);
  });
}

function _e(e) {
  if (e === undefined) {
    currentStatus.ine.pop();
  } else {
    currentStatus.ine.push(e);
  }
}

function _s(e) {
  if (e === undefined) {
    currentStatus.se = [];
  } else {
    currentStatus.se.push(e);
  }
}

function _es(v, v2) {
  var ine = currentStatus.ine;
  var i = ine.length-1;;
  // if (v2 !== undefined) {
  //   for (; i >= 0; --i) {
  //     if (ine[i].u === v || ine[i].v == v2) {
  //       break;
  //     }
  //   }
  // }
  for (; i >= 0; --i) {
    _s(ine[i]);
    if (ine[i].u === v) {
      break;
    }
  }
  // if (v2 === undefined) {
  //   ine.length = 0;
  // }
}

function _hl(i) {
  currentStatus.hl = i;
}

// ====================================
currentStatus.clone = function () {
  var inq = clone(this.inq) || [];
  return {
    inq: bfs ? inq.reverse() : inq,
    ine: clone(this.ine) || [],
    vis: clone(this.vis) || [],
    se: clone(this.se) || [],
    // topo
    arr: clone(this.arr) || [],
    hl: currentStatus.hl,
    // scc
    col: clone(currentStatus.col) || [],
    low: clone(currentStatus.low) || [],
    ind: clone(currentStatus.ind) || [],
  }
}
currentStatus.init = function (hard) {
  this.se = [];
  this.inq = [];
  this.ine = [];
  this.vis = [];
  this.arr = [];
  this.col = [];
  this.low = [];
  this.ind = [];
  this.hl = undefined;
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
  dfs: GraphDFS,
  bfs: GraphBFS,
  topo: GraphTopoSort,
  scctarjan: GraphSccTarjan,
  run: function (cmd, param) {
    createGraph(param.g);
    this.initialize()[cmd](_parse_int(param.x));
    over();
    return { frames: frames, others: {} };
  }
};
