var d3 = require('d3');
var delay;
var nodes = [];
var edges = [];
var _x_skip = 40;
var _y_skip = 40;
var _rad = 15;
var root;
var nil;
var _RED = 1;
var _BLACK = 0;

function _getNodesAndEdges (v) {
  if (v === nil) {
    return;
  }
  nodes.push({
    color: v.color,
    pos: v.pos,
    id: v.id,
    v: v.key
  });
  if (v.p !== nil) {
    edges.push({
      pos1: v.p.pos,
      pos2: v.pos,
      type: 'p',
      id: 'p'+v.p.id + '-'+v.id
    })
  }
  var nil_node;
  if (v.left === nil) {
    nil_node = {
      color: _BLACK,
      pos: { x: v.pos.x - _x_skip, y: v.pos.y + _y_skip },
      id: 'left-nil'+v.id,
      v: 'nil'
    };
    nodes.push(nil_node);
    edges.push({
      pos1: v.pos,
      pos2: nil_node.pos,
      type: 'left',
      id: 'left'+v.id + '-'+nil_node.id
    })
  } else {
    edges.push({
      pos1: v.pos,
      pos2: v.left.pos,
      type: 'left',
      id: 'left' + v.id + '-' + v.left.id
    })
    _getNodesAndEdges(v.left);
  }
  if (v.right === nil) {
    nil_node = {
      color: _BLACK,
      pos: { x: v.pos.x + _x_skip, y: v.pos.y + _y_skip },
      id: 'right-nil'+v.id,
      v: 'nil'
    };
    nodes.push(nil_node);
    edges.push({
      pos1: v.pos,
      pos2: nil_node.pos,
      type: 'right',
      id: 'right'+v.id + '-'+nil_node.id
    })
  } else {
    edges.push({
      pos1: v.pos,
      pos2: v.right.pos,
      type: 'right',
      id: 'right' + v.id + '-' + v.right.id
    })
    _getNodesAndEdges(v.right);
  }
}

function _getNodesAndEdgesWithNil() {
  nodes = [];
  edges = [];
  // FIXME root should fix at (0,0) no matter how tree changes
  // then I have to make the following left/right case
  _setPosition(root.left, 0, 0, -_x_skip);
  _setPosition(root.right, 0, 0, _x_skip);
  var nil_node = {
    color: _BLACK,
    pos: { x: 0, y: -_y_skip },
    id: '-nil',
    v: 'nil'
  };
  nodes.push(nil_node);
  if (root !== nil) {
    root.pos = { x: 0, y: 0 };
    edges.push({
      pos1: nil_node.pos,
      pos2: root.pos,
      type: 'p',
      id: 'p' + nil_node.id + '-' + root.id
    })
  }
  _getNodesAndEdges(root);
}

function _setPosition(v, y, b, x) {
  if (v === nil || v.pos !== undefined) {
    return;
  }
  v.pos = { y: y + _y_skip };
  var l, r;
  if (x < 0) {
    l = 'right'; r = 'left';
  } else {
    l = 'left'; r = 'right';
  }
  if (v[l] === nil) {
    v.pos.x = b + x * 2;
  } else {
    v.pos.x = _setPosition(v[l], v.pos.y, b, x) + x;
  }
  if (v[r] === nil) {
    return v.pos.x + x;
  } else {
    return _setPosition(v[r], v.pos.y, v.pos.x, x);
  }
}

function _draw_nodes() {
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  }).enter().append('circle')
    .attr('class', 'node')
    .attr('cx', function (d) { return d.pos.x })
    .attr('cy', function (d) { return d.pos.y })
    .attr('r', _rad)
    .style('fill', function (d) { return d.color ? 'red' : 'black' });
  gnodes.selectAll('circle.node').data(nodes, function (d) {
    return d.id;
  })
    .attr('cx', function (d) { return d.pos.x })
    .attr('cy', function (d) { return d.pos.y })
    .style('fill', function (d) { return d.color ? 'red' : 'black' });
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
    .attr('x1', function (d) { return d.pos1.x })
    .attr('y1', function (d) { return d.pos1.y })
    .attr('x2', function (d) { return d.pos1.x })
    .attr('y2', function (d) { return d.pos1.y })
    .classed('parent', function (d) { return d.type === 'p' ? true : false})
  gedges.selectAll('line.edge').data(edges, function (d) {
    return d.id;
  })
    .attr('x1', function (d) { return d.pos1.x })
    .attr('y1', function (d) { return d.pos1.y })
    .attr('x2', function (d) { return d.pos2.x })
    .attr('y2', function (d) { return d.pos2.y })
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
    .attr('x', function (d) { return d.pos.x })
    .attr('y', function (d) { return d.pos.y })
    .attr('dy', 5)
    .text(function (d) { return d.v});
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  })
    .attr('x', function (d) { return d.pos.x })
    .attr('y', function (d) { return d.pos.y })
  gtext.selectAll('text.node').data(nodes, function (d) {
    return d.id;
  }).exit()
    .remove();
}

function _init(_status, _delay) {
  root = _status.tree.root;
  nil = _status.tree.nil;
  delay = _delay;
}

function render(status, delay) {
  _init(status, delay);
  _getNodesAndEdgesWithNil();
  _draw_edges();
  _draw_nodes();
  _draw_nodes_text();
}

function init() {
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
