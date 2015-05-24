var clone = require('clone'); var frames = []; var stopid = 0; var rc; var line = 0;
var currentStatus = {}; var _id = 0; var g = {}; var Heap = require('../common/min-heap');

var _gNegInfinity = '-';
var _gPosInfinity = '+';

function _GraphPrimNodeCompare(a,b) {
    if (a.w === _gNegInfinity || b.w === _gPosInfinity) {
        return -1;
    } else if (a.w === _gPosInfinity || b.w === _gNegInfinity) {
        return 1;
    }
    return a.w - b.w;
}
function _s(which, e) {
  if (e === undefined) {
    currentStatus[which].pop();
  } else {
    currentStatus[which].push(e);
  }
}


// ============ 25 ==================
function GraphPrim() {
    var i;
    var mst;
    var mh;
    var ei;
    var pns;
    var pn;
    if (g.n <= 1) {
        return;
    }
    // _gGraphEdgeWeightCompare = CompFn;
    mst = [];
    mh = new Heap(_GraphPrimNodeCompare);
    pns = [];currentStatus.pns = pns;
stop(line,1);    for (i = 0; i < g.n; ++i) {
        pns[i]= {i:i};
        pns[i].w = (i === 0 ? _gNegInfinity : _gPosInfinity);
        pns[i].e = undefined;
        mh.insert(pns[i], i);
    }
    for (i = 0; stop(line,1),i < g.n; ++i) {
stop(line);        pn = mh.pop();_s('hl',pn.i);
        if (stop(line,1),pn.e !== undefined) {
stop(line,1);            mst[i-1] = pn.e;_s('ine',pn.e);
        }
stop(line,1);        pns[pn.i].w = _gNegInfinity;
        if (stop(line,1),i === g.n-1) {_s('hl');
stop(line,1);          break;
        }
        for (ei = 0;stop(line,1), _s('se'),_s('hle'),ei < g.e[pn.i].length; ei++) {var e = g.e[pn.i][ei];
            if (stop(line,1),_s('se',e),_s('hle',e),pns[e.v].w === _gPosInfinity ||
                        (pns[e.v].w !== _gNegInfinity && pns[e.v].w - e.w > 0)
                ) {_s('ine',e);
                pns[e.v].w = e.w;
                pns[e.v].e = e;
stop(line,1);                mh.forceUpdate(e.v);_s('ine');
            }
        }
_s('hl');
    }


stop(line,1);    return mst;
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

/*function _parse_int(x) {
  x = parseInt(x);
  return isNaN(x) ? 0 : x;
}*/

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
  prim: GraphPrim,
  run: function (cmd, param) {
    createGraph(param.g);
    this.initialize()[cmd](/*_parse_int(param.x)*/);
    over();
    return { frames: frames, others: {} };
  }
};
