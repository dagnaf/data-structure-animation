// require('./Renderer.d3.less');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, gnodes, gedges;
var status, delay;

var pos = {};
var nodes = [];
var edges = [];
var hide;
var ids = [];
var _x_skip =20+15;
var _y_skip = 70;
var _rad = 15;
var _RED = 1;
var _BLACK = 0;

function _node_color (d) {
  if (d.color === undefined) return 'transparent';
  return d.color === _RED ? 'red' : 'black';
}

function _newPos(v, curr, nn) {
  pos[v.id] = (pos[v.id] || {});
  pos[v.id].curr = curr;
}

function _newEdge (u, r, to_id) {
  var from = u.id;
  var to = (to_id || u[r].id);
  var id = from+r; // r is string
  if (status.ne[id]) {
    to = status.ne[id];
  }
  var dx = pos[to].curr.x-pos[from].curr.x;
  var dy = pos[to].curr.y-pos[from].curr.y;
  var dr = Math.sqrt(dx*dx+dy*dy);
  dx *= _rad/dr;
  dy *= _rad/dr;
  return {
    dx: dx,
    dy: dy,
    from: u.id,
    to: to,
    type: r,
    id: id,
    hide: hide
  };
}

function _newNode (v) {
  ids.push(v.id);
  var color = v.color;
  if (status.co[v.id] !== undefined) {
    color = status.co[v.id];
  }
  return {
    color: color,
    v: v.key,
    id: v.id,
    hide: hide
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
  if (v.p) {
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
  // console.log(JSON.stringify(status.co));
  nodes = [];
  edges = [];
  ids = [];
  // copy last scene position
  for (var p in pos) {
    pos[p].prev = pos[p].curr;
  }
  _newPos(status.tree.nil, { x: 0, y: -_y_skip*1.5 });
  pos[status.tree.nil.id].prev = pos[status.tree.nil.id].curr;
  if (status.tree.root.nil !== true) {
    _newPos(status.tree.root, { x: 0, y: 0 });
    _setPosition(status.tree.root.left, 0, 0, -_x_skip);
    _setPosition(status.tree.root.right, 0, 0, _x_skip);
  }
  if (status.hl === undefined) {
    hide = false;
  } else {
    hide = true;
  }
  nodes.push(_newNode(status.tree.nil));
  if (status.tree.root.nil !== true) {
    _getNodesAndEdges(status.tree.root);
  }
  hide = false;
  if (status.nn) {
    // push new add node
    nodes.push(_newNode(status.nn));
    // push new add node edge not be identified by tree before clone
    if (status.ne[status.nn.id+'p']) {
      _newEdge(status.nn, 'p', status.ne[status.nn.id+'p'])
    }
    // push new node pos
    _newPos(status.nn, {x: pos[status.nn.ref].curr.x, y: pos[status.nn.ref].curr.y-_y_skip/2}, 1);
    if (pos[status.nn.id].prev === undefined) {
      pos[status.nn.id].prev = pos[status.nn.ref].curr;
    }
  }
  // delete invisible pos
  Object.keys(pos).filter(function (id) {
    return ids.indexOf(+id) === -1;
  }).forEach(function (id) { delete pos[id]; })
}

function _setPosition(v, y, b, x) {
  if (v === undefined) return;
  var l, r;
  if (x < 0) {
    l = 'right'; r = 'left';
  } else {
    l = 'left'; r = 'right';
  }
  if (v.nil || v[l] === undefined) {
    _newPos(v, {x: b+x, y: y+_y_skip});
  } else {
    _newPos(v, {x: _setPosition(v[l], y + _y_skip, b, x) + x, y: y+_y_skip});
  }
  if (v.nil || v[r] === undefined) {
    return pos[v.id].curr.x;
  } else {
    return _setPosition(v[r], y + _y_skip, pos[v.id].curr.x, x);
  }
}

function _draw_nodes() {
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  }).enter().append('circle')
    .attr('class', 'node')
    .attr('cx', function (d) { return pos[d.id].prev.x })
    .attr('cy', function (d) { return pos[d.id].prev.y })
    .attr('r', _rad)
    .style('fill', function (d) { return d.color ? 'red' : 'black' });
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  })
    .transition()
    .duration(delay)
    .attr('cx', function (d) { return pos[d.id].curr.x })
    .attr('cy', function (d) { return pos[d.id].curr.y })
    .style('fill', _node_color)
    .style('opacity', function (d) { return d.hide ? 0.3 : 1 })
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  }).exit()
    .remove();
}

function _draw_edges() {
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  }).enter().append('line')
    .attr('class', 'edge')
    .attr('x1', function (d) { return pos[d.from].prev.x+d.dx })
    .attr('y1', function (d) { return pos[d.from].prev.y+d.dy })
    .attr('x2', function (d) { return pos[d.from].prev.x+d.dx })
    .attr('y2', function (d) { return pos[d.from].prev.y+d.dy })
    .classed('parent', function (d) { return d.type === 'p' ? true : false})
    .classed('child', function (d) { return d.type !== 'p' ? true : false})
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  })
    .transition()
    .duration(delay)
    .attr('x1', function (d) { return pos[d.from].curr.x+d.dx })
    .attr('y1', function (d) { return pos[d.from].curr.y+d.dy })
    .attr('x2', function (d) { return pos[d.to].curr.x-d.dx })
    .attr('y2', function (d) { return pos[d.to].curr.y-d.dy })
    .style('opacity', function (d) { return d.hide ? 0.3 : 1 })
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  }).exit()
    .remove();
}

function _draw_nodes_text() {
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  }).enter().append('text')
    .attr('class', 'node')
    .attr('x', function (d) { return pos[d.id].prev.x })
    .attr('y', function (d) { return pos[d.id].prev.y })
    .attr('dy', 5)
    .text(function (d) { return d.id+'-'+d.v});
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  })
    .transition()
    .duration(delay)
    .attr('x', function (d) { return pos[d.id].curr.x })
    .attr('y', function (d) { return pos[d.id].curr.y })
    .style('opacity', function (d) { return d.hide ? 0.3 : 1 })
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  }).exit()
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
  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(100, 100).scale(1));

  this.gbase = this.g.append('g').attr('class', 'base');
  this.ghigh = this.g.append('g').attr('class', 'high');
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
