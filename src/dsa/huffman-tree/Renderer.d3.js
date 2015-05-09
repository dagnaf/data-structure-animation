// require('./Renderer.d3.less');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, gnodes, gedges;
var status, delay;

var pos = {};
var nodes = [];
var edges = [];
var hl = {};
var ids = [];
var _x_skip =20+15;
var _y_skip = 70;
var _rad = 15;
var _RED = 1;
var _BLACK = 0;
var _line_stroke_width = 3;
var _marker_width = 2;

var interpolate_node_color = [
  d3.interpolateRgb('white', 'black'),
  d3.interpolateRgb('white', 'red'),
]

function hl_top() {
  return status.hls.length + 1 + (status.hl.length ? 1 : 0);
}

function _node_color (d) {
  if (d.color === undefined) return 'deepskyblue';
  var i = hl[d.id]+1;
  var r = status.hls.length + 1 + (status.hl.length ? 1 : 0);
  if (i < r) { i = 1; }
  return interpolate_node_color[d.color](i/r);
}

function _edge_opacity (d) {
  var i = Math.min(hl[d.from], hl[d.to])+1;
  var r = status.hls.length + 1 + (status.hl.length ? 1 : 0);
  if (i < r) { i = 1; }
  return d3.interpolate(0,1)(i/r);
}

function _newPos(v, curr, nn) {
  pos[v.id] = (pos[v.id] || {});
  pos[v.id].curr = curr;
}

function _newEdge (u, r) {
  var from = u.id;
  var to = u[r] ? u[r].id : undefined;
  var id = from+r; // r is string
  if (status.ne[id] !== undefined) {
    to = status.ne[id];
  }
  // var dx = pos[to].curr.x-pos[from].curr.x;
  // var dy = pos[to].curr.y-pos[from].curr.y;
  // var dr = Math.sqrt(dx*dx+dy*dy);
  // dx *= _rad/dr;
  // dy *= _rad/dr;
  return {
    // dx: dx,
    // dy: dy,
    from: u.id,
    to: to,
    type: r,
    id: id,
    // nil has edge out, it is unconditionally added
    unconditional: u.nil
  };
}

function _newNode (v) {
  ids.push(v.id);
  var color = v.color;
  if (status.co[v.id] !== undefined) {
    color = status.co[v.id];
  }
  return {
    extra: v.extra,
    color: color,
    v: v.key,
    id: v.id,
  }
}
function _getNodesAndEdges (v, pid) {
  // nil has no p, param pid for nil
  pid = pid || v.p.id;
  // update pos.prev if not defined
  if (pos[v.id].prev === undefined) {
    if (pos[pid] === undefined) {
      pos[v.id].prev = pos[v.id].curr;
    } else {
      pos[v.id].prev = (pos[pid].prev || pos[v.id].curr);
    }
  }
  if (v.p || status.ne[v.id+'p']) {
    edges.push(_newEdge(v, 'p'));
  }
  if (v.id === status.hl) {
    hide = false;
  }
  nodes.push(_newNode(v));
  if (v.left) {
    edges.push(_newEdge(v, 'left'));
    _getNodesAndEdges(v.left, v.id);
  }
  if (v.right) {
    edges.push(_newEdge(v, 'right'));
    _getNodesAndEdges(v.right, v.id);
  }
  if (v.id === status.hl) {
    hide = true;
  }
}

function _getNodesAndEdgesWithNil() {
  // initialize
  nodes = [];
  edges = [];
  ids = [];
  hl = {};
  // set nil highlight
  hl[status.tree.nil.id] = (status.hl.indexOf(status.tree.nil.id) === -1 ? 0 : hl_top()-1);
  _setHighlight(status.tree.root, 0);
  // copy last scene position, for d3-update/d3-enter
  for (var p in pos) {
    pos[p].prev = pos[p].curr;
  }
  // set nil position
  _newPos(status.tree.nil, { x: 0, y: -_y_skip*1.5 });
  pos[status.tree.nil.id].prev = pos[status.tree.nil.id].curr;
  // set root and nodes position
  if (status.tree.root.nil !== true) {
    _newPos(status.tree.root, { x: 0, y: 0 });
    _setPosition(status.tree.root.left, 0, 0, -_x_skip, _BLACK);
    _setPosition(status.tree.root.right, 0, 0, _x_skip, _BLACK);
  }
  // add nill node and edge
  nodes.push(_newNode(status.tree.nil));
  if (status.tree.root.nil !== true) {
    _getNodesAndEdges(status.tree.root);
  }
  // set transplant position, store tmp in case inter-dependent
  var pos_curr_y = {};
  for (var i in status.np) {
    pos_curr_y[i] = pos[status.np[i]].curr.y;
  }
  for (var i in status.np) {
    pos[i].curr.y = pos_curr_y[i];
  }
  // add new/extra/min/pointer node
  if (status.nn) {
    // push new add node
    nodes.push(_newNode(status.nn));
    // push new node pos
    _newPos(status.nn, {x: pos[status.nn.ref].curr.x, y: pos[status.nn.ref].curr.y-(status.nn.extra ? _y_skip/3 : _y_skip/2)}, 1);
    if (pos[status.nn.id].prev === undefined) {
      pos[status.nn.id].prev = pos[status.nn.ref].curr;
    }
    // push new add node edge not be identified by tree before clone
    if (status.ne[status.nn.id+'p'] !== undefined) {
      edges.push(_newEdge(status.nn, 'p'));
    }
    // hl[status.nn.id] = status.hls.length;
    if (status.hl.indexOf(status.nn.id) !== -1) {
      hl[status.nn.id] = hl_top() - 1;
    } else {
      hl[status.nn.id] = hl[status.nn.ref];
    }
  }
  // jobs to do when all positions set
  for (var i = 0; i < edges.length; ++i) {
    // calc dx,dy out of the node circle
    var from = edges[i].from;
    var to = edges[i].to;
    var dx = pos[to].curr.x-pos[from].curr.x;
    var dy = pos[to].curr.y-pos[from].curr.y;
    var dr = Math.sqrt(dx*dx+dy*dy);
    // in case two node are very close
    var extra = _marker_width*_line_stroke_width;
    if (dr < _rad+extra) {
      edges[i].dx = 0;
      edges[i].dy = 0;
    } else {
      edges[i].dx = dx*(_rad+extra)/dr;
      edges[i].dy = dy*(_rad+extra)/dr;
    }
  }
  // delete invisible pos, for next call
  Object.keys(pos).filter(function (id) {
    return ids.indexOf(+id) === -1;
  }).forEach(function (id) { delete pos[id]; })
  // console.log(JSON.stringify(hl));
}

function _setHighlight(v, h) {
  if (status.hls.indexOf(v.id) !== -1) {
    h = status.hls.lastIndexOf(v.id)+1;
  }
  if (status.hl.indexOf(v.id) !== -1) {
    hl[v.id] = status.hls.length+1;
  } else {
    hl[v.id] = h;
  }
  if (v.left) {
    _setHighlight(v.left, h);
  }
  if (v.right) {
    _setHighlight(v.right, h);
  }
}

function _setPosition(v, y, b, x, pc) {
  if (v === undefined) return;
  var l, r;
  if (x < 0) {
    l = 'right'; r = 'left';
  } else {
    l = 'left'; r = 'right';
  }
  var py = _y_skip//(v.color === pc ? 1 : 2);
  if (v.nil || v[l] === undefined) {
    _newPos(v, {x: b+x, y: y+py});
  } else {
    _newPos(v, {x: _setPosition(v[l], y + py, b, x, v.color) + x, y: y+py});
  }
  if (v.nil || v[r] === undefined) {
    return pos[v.id].curr.x;
  } else {
    return _setPosition(v[r], y + py, pos[v.id].curr.x, x, v.color);
  }
}

function _draw_nodes() {
  // d3-enter
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  }).enter().append('circle')
    .attr('class', 'node')
    .attr('cx', function (d) { return pos[d.id].prev.x })
    .attr('cy', function (d) { return pos[d.id].prev.y })
    .attr('r', function (d) { return d.extra ?  _rad/2 : _rad })
    .style('fill', function (d) { return d.color ? 'red' : 'black' });
  // d3-update
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  })
    .transition()
    .duration(delay)
    .attr('cx', function (d) { return pos[d.id].curr.x })
    .attr('cy', function (d) { return pos[d.id].curr.y })
    .attr('r', function (d) { return d.extra ?  _rad/2 : _rad })
    .style('fill', _node_color)
  // d3-exit
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  }).exit()
      .transition()
      .duration(delay)
    .style('opacity', 0)
    .remove();
}

function _draw_edges() {
  // d3-enter
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  }).enter().append('line')
    .attr('class', 'edge')
    .attr('stroke-width', _line_stroke_width)
    .attr('x1', function (d) { return pos[d.from].prev.x+d.dx })
    .attr('y1', function (d) { return pos[d.from].prev.y+d.dy })
    .attr('x2', function (d) { return pos[d.from].prev.x+d.dx })
    .attr('y2', function (d) { return pos[d.from].prev.y+d.dy })
    .classed('parent', function (d) { return d.type === 'p' ? true : false})
    .classed('child', function (d) { return d.type !== 'p' ? true : false})
  // d3-update
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  })
    .style('marker-end', function (d) { return d.id === status.ne.curr ? 'url(#'+d.type+'-end)' : null })
    .transition()
    .duration(delay)
    // .style('marker-end', function (d) { return d.id === status.ne.curr ? 'url(#edge-end)' : null })
    // .style('marker-end', null)
    .attr('x1', function (d) { return pos[d.from].curr.x+d.dx })
    .attr('y1', function (d) { return pos[d.from].curr.y+d.dy })
    .attr('x2', function (d) { return pos[d.to].curr.x-d.dx })
    .attr('y2', function (d) { return pos[d.to].curr.y-d.dy })
    .style('opacity', _edge_opacity)
    .style('stroke-dasharray', function (d) { return d.unconditional ? '5 5' : null })
  // d3-exit
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  }).exit()
      .transition()
      .duration(delay)
    .style('opacity', 0)
    .remove();
}

function _draw_nodes_text() {
  // d3-enter
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  }).enter().append('text')
    .attr('class', 'node')
    .attr('x', function (d) { return pos[d.id].prev.x })
    .attr('y', function (d) { return pos[d.id].prev.y })
    .attr('dy', 5)
  // d3-update
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  })
    .transition()
    .duration(delay)
    .attr('x', function (d) { return pos[d.id].curr.x })
    .attr('y', function (d) { return pos[d.id].curr.y })
    .style('fill', _node_color)
    .text(function (d) { return d.v});
    // .text(function (d) { return d.id+'-'+d.v+'('+hl[d.id]+')'});
  // d3-exit
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  }).exit()
      .transition()
      .duration(delay)
    .style('opacity', 0)
    .remove();
}

function _draw_rot() {
  var data = (status.ro ? [status.ro.ids] : []);
  // d3-enter
  ghigh.selectAll('path.rot').data(data).enter()
    .append('path')
      .attr('class', 'rot')
      .attr('d', function (d) {
        this.__prev__ = d;
        return 'M'+d.map(function (id) {
          return [pos[id].curr.x, pos[id].curr.y];
        }).join('L')
      })
      .style('fill-opacity', 0.05)
      .style('opacity', 0)
        .transition()
        .duration(delay)
      .style('opacity', 1);
  // d3-update
  ghigh.selectAll('path.rot').data(data)
    .attr('d', function (d) {
        this.__prev__ = d;
        return 'M'+d.map(function (id) {
          return [pos[id].curr.x, pos[id].curr.y];
        }).join('L');
    })
  // d3-exit
  ghigh.selectAll('path.rot').data(data)
    .exit()
      .transition()
      .duration(delay)
    .attr('d', function() {
      var d = this.__prev__;
      for (var i = 0; i < d.length; ++i) {
        if (pos[d[i]] === undefined) {
          return '';
        }
      }
      return 'M'+d.map(function (id) {
        return [pos[id].curr.x, pos[id].curr.y];
      }).join('L');
    })
    .style('opacity', 0)
    .remove();
}

function _draw_rot_text() {
  var data = (status.ro ? [status.ro.ids] : []);
  function xy(x) {
    return function (d) {
      return d.reduce(function (s,id) {
        return s+pos[id].curr[x]
      }, 0) / d.length;
    }
  }
  // d3-enter
  gtext.selectAll('text.rot').data(data).enter()
    .append('text')
      .attr('class', 'rot')
      .attr('x', xy('x'))
      .attr('y', xy('y'))
      .attr('dy', 5)
      .text(function () { return status.ro.type === 'left' ? '左旋' : '右旋'})
      .style('fill-opacity', 0.5)
  gtext.selectAll('text.rot').data(data)
    .attr('x', xy('x'))
    .attr('y', xy('y'))
    .text(function () { return status.ro.type === 'left' ? '左旋' : '右旋'});
  gtext.selectAll('text.rot').data(data).exit()
      .transition()
      .duration(delay)
    .style('opacity', 0)
    .remove();
}

function _init(_status, _delay) {
  status = _status;
  delay = _delay;
}

function render(status, delay) {
  _init(status, delay);
  _getNodesAndEdgesWithNil();
  _draw_edges();
  _draw_nodes();
  _draw_nodes_text();
  _draw_rot();
  _draw_rot_text();
}

function init () {
  var self = this;
  var zoom = d3.behavior.zoom()
    .scaleExtent([0.1,10])
    .on('zoom', function () {
      self.svg.attr("transform", d3Transform()
        .translate(d3.event.translate)
        .scale(d3.event.scale))
    });

  this.svg = d3.select(this.refs.svg.getDOMNode()).append('svg').call(zoom)
    .append('g');

  this.svg.append('defs').selectAll('marker').data(['left','right','p']).enter()
    .append('marker')
      .attr('id', function (d) { return d+'-end' })
      .attr('viewBox', '0 -5 10 10')
      .attr('markerWidth', _marker_width)
      .attr('markerHeight', _marker_width)
      .attr('orient', 'auto')
    .append('path')
      .attr('d', 'M0,-5L10,0,L0,5');

  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(100, 100).scale(1));

  this.ghigh = this.g.append('g').attr('class', 'high');
  this.gbase = this.g.append('g').attr('class', 'base');
  this.gtext = this.g.append('g').attr('class', 'text');

  gbase = this.gbase;
  gedges = this.gbase.append('g').attr('class', 'edges');
  gnodes = this.gbase.append('g').attr('class', 'nodes');
  gtext = this.gtext;
  ghigh = this.ghigh;



}

module.exports = {
  init: init,
  render: render
};
