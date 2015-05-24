var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0; var g = {}; var Heap = require('../common/min-heap');

var _gNegInfinity = '-';
var _gPosInfinity = '+';

function _GraphDijkstraEdgeCompare(a,b) {
    if (a === _gNegInfinity || b === _gPosInfinity) {
        return a === b ? 0 : -1;
    } else if (a === _gPosInfinity || b === _gNegInfinity) {
        return a === b ? 0 : 1;
    }
    return a - b;
}

function _GraphDijkstraNodeCompare(a,b) {
  return _GraphDijkstraEdgeCompare(a.w,b.w);
}

function _GraphDijkstraWeightAdd(a,b) {
  if (a === _gPosInfinity || b === _gPosInfinity) {
    return _gPosInfinity;
  } else if (a === _gNegInfinity || b === _gNegInfinity) {
    return a === _gNegInfinity ? b : a;
  }
  return a + b;
}

function _s(which, e) {
  if (e === undefined) {
    currentStatus[which].pop();
  } else {
    currentStatus[which].push(e);
  }
}

function GraphNodeValid(x) {
  return 0 <= x && x < g.n;
}







function GraphDijkstra(src, dest) {
    var i;
    var w;
    var mh;
    var ei;
    var dns;
    var dn;
    var s;
// ==== 55 =====
    if (stop(line,1),!GraphNodeValid(src)) {
stop(line);        return;
    }
    // w = SafeMalloc(g->w_size);
    // _gGraphEdgeWeightCompare = CompFn;
    // _gGraphEdgeWeightAdd = AddFn;
    mh = new Heap(_GraphDijkstraNodeCompare);
    s = [];
    dns = [];currentStatus.pns = dns;
stop(line,1);    for (i = 0; i < g.n; ++i) {
        dns[i] = {i:i};
        dns[i].w = (i == src ? _gNegInfinity : _gPosInfinity);
        dns[i].e = undefined;
        mh.insert(dns[i], i);
    }
    for (i = 0; stop(line,1),i < g.n; ++i) {
stop(line);        dn = mh.pop();_s('hl',dn.i); dns[dn.i].out = true; if (dn.e) { _s('ine', dn.e); }
        if (stop(line,1),i === g.n-1) {_s('hl');
stop(line);          break;
        }
        for (ei = 0; stop(line,1),_s('se'),_s('hle'),ei < g.e[dn.i].length; ei++) {var e = g.e[dn.i][ei];
stop(line,1);          w = _GraphDijkstraWeightAdd(dn.w,e.w);_s('se',e);_s('hle',e);
          if (stop(line,1),_GraphDijkstraEdgeCompare(dns[e.v].w, w) > 0) {_s('ine',e);
               // if (dns[e->v].w == &_gPosInfinity) {
               //     dns[e->v].w = SafeMalloc(g->w_size);
               // }
            dns[e.v].w = w;
            dns[e.v].e = e;
stop(line,1);            mh.forceUpdate(e.v);_s('ine');
          }
        }
_s('hl');
    }
    // i = dest;
    // while (i != src) {
    //   s.push(dns[i].e);
    //   i = dns[i].e.u;
    // }








    return s;
}
// ===============================

function createGraph(data) {
  g.n = data.n;
  g.e = [];
  for (var i = 0; i < g.n; ++i) g.e.push([]);
  data.e.forEach(function (d) {
    g.e[d.u].push(d);
  });
}
// ====================================
currentStatus.clone = function () {
  return {
    neg: _gNegInfinity,
    pos: _gPosInfinity,
    ine: clone(this.ine) || [],
    se: clone(this.se) || [],
    hl: clone(this.hl) || [],
    hle: clone(this.hle) || [],
    pns: clone(this.pns) || [],
  }
}
currentStatus.init = function (hard) {
  this.se = [];
  this.ine = [];
  this.pns = [];
  this.hl = [];
  this.hle = [];
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
  dijkstra: GraphDijkstra,
  run: function (cmd, param) {
    createGraph(param.g);
    this.initialize()[cmd](_parse_int(param.src));
    over();
    return { frames: frames, others: {} };
  }
};
