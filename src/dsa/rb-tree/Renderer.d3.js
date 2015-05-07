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
  hl = {};

  hl[status.tree.nil.id] = (status.hl.indexOf(status.tree.nil.id) === -1 ? 0 : hl_top()-1);
  _setHighlight(status.tree.root, 0);

  // copy last scene position
  for (var p in pos) {
    pos[p].prev = pos[p].curr;
  }
  _newPos(status.tree.nil, { x: 0, y: -_y_skip*1.5 });
  pos[status.tree.nil.id].prev = pos[status.tree.nil.id].curr;

  if (status.tree.root.nil !== true) {
    _newPos(status.tree.root, { x: 0, y: 0 });
    _setPosition(status.tree.root.left, 0, 0, -_x_skip, _BLACK);
    _setPosition(status.tree.root.right, 0, 0, _x_skip, _BLACK);
  }

  nodes.push(_newNode(status.tree.nil));
  if (status.tree.root.nil !== true) {
    _getNodesAndEdges(status.tree.root);
  }

  if (status.nn) {
    // push new add node
    nodes.push(_newNode(status.nn));
    // push new node pos
    _newPos(status.nn, {x: pos[status.nn.ref].curr.x, y: pos[status.nn.ref].curr.y-_y_skip/2}, 1);
    if (pos[status.nn.id].prev === undefined) {
      pos[status.nn.id].prev = pos[status.nn.ref].curr;
    }
    // push new add node edge not be identified by tree before clone
    if (status.ne[status.nn.id+'p'] !== undefined) {
      edges.push(_newEdge(status.nn, 'p'));
    }
    hl[status.nn.id] = status.hls.length;
  }

  for (var i = 0; i < edges.length; ++i) {
    var from = edges[i].from;
    var to = edges[i].to;
    var dx = pos[to].curr.x-pos[from].curr.x;
    var dy = pos[to].curr.y-pos[from].curr.y;
    var dr = Math.sqrt(dx*dx+dy*dy);
    edges[i].dx = dx*_rad/dr;
    edges[i].dy = dy*_rad/dr;
  }
  // delete invisible pos
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
    .style('opacity', _edge_opacity)
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
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  }).exit()
    .remove();
}

function _draw_rot() {
  var data = (status.ro ? [status.ro] : []);
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
  ghigh.selectAll('path.rot').data(data)
    .attr('d', function (d) {
        this.__prev__ = d;
        return 'M'+d.map(function (id) {
          return [pos[id].curr.x, pos[id].curr.y];
        }).join('L');
    })
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
