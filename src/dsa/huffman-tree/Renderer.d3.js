require('./Renderer.d3.less');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, gnodes, gedges, gx, gy;
var status, delay;

var margin = {top: 40, right: 10, bottom: 20, left: 10};
var width = 720 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;
var _height;
// domain decided by data
var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .08);
var xSubScale = d3.scale.ordinal();
var xPopScale = d3.scale.ordinal();
var yScale = d3.scale.linear().range([height, 0]);
var keyScale = d3.scale.linear().range([40,100]);
var color = d3.scale.category20();
var yMax;
var nodes;
var edges;
var _node_height = 40;
var items;

var xAxis = d3.svg.axis()
  .scale(xScale)
  .tickSize(0)
  .tickPadding(6)
  .orient('bottom');

var yAxis = d3.svg.axis()
  .scale(yScale)
  .tickSubdivide(1)
  .orient('left');

function _fn_id(d) { return d.id; }

function _init(_status, _delay) {
  status = _status;
  delay = _delay;
}

function _draw_axis() {
  gx
    .attr("transform", "translate(0,"+_height+")")
    .transition()
    .style('opacity', status.onlyTree ? 0 : 1)
    .call(xAxis);
  // gy
  //   .transition()
  // .call(yAxis);
}

function _draw_nodes() {
  function nh(d) {
    if (d.inner) {
      return 10;
    }
    return (d.inner === false && status.onlyTree) ? keyScale(d.key) : _node_height;
  }
  gnodes.selectAll('rect.node').data(nodes,_fn_id)
  .enter().append('rect')
    .attr('class', 'node')
    .attr('x', function (d) { return d.ex-d.ew/2;})
    .attr('y', function (d) { return _height;})
    .attr('width', function (d) { return d.ew; })
    .attr('height', function (d) { return d.inner ? 10 : _node_height})
    .style('fill', function (d) { return d.inner ? 'black' : color(d.id)})
    // .text(function (d) { return d.val+':'+d.key;})
  gnodes.selectAll('rect.node').data(nodes,_fn_id)
    .transition()
    .duration(delay)
    .attr('x', function (d) { return d.x-d.w/2;})
    .attr('y', function (d) { return d.y-5;})
    .attr('width', function (d) { return d.w; })
    .attr('height', nh)
  gnodes.selectAll('rect.node').data(nodes,_fn_id)
  .exit().remove()
}

function _draw_edges() {
  function _fn_fin() {
    this.attr('x1', function (d) { return d.x1;} )
    .attr('y1', function (d) { return d.y1;} )
    .attr('x2', function (d) { return d.x2;} )
    .attr('y2', function (d) { return d.y2;} )
  }
  gedges.selectAll('line.edge').data(edges, _fn_id)
    .transition()
    .duration(delay)
    .call(_fn_fin);
  gedges.selectAll('line.edge').data(edges, _fn_id)
  .enter().append('line')
    .attr('class', 'edge')
    .attr('x1', function (d) { return d.x1;})
    .attr('y1', function (d) { return d.y1;})
    .attr('x2', function (d) { return d.x1;})
    .attr('y2', function (d) { return d.y1;})
    .attr('stroke', 'black')
    .attr('stroke-width', 3)
    .attr('stroke-opacity', 1)
    .transition()
    .duration(delay/2)
    .delay(delay/2)
    .call(_fn_fin)
  gedges.selectAll('line.edge').data(edges, _fn_id)
  .exit().remove();

  // text
  function _fn_fin_text(d) {
    this.attr('x', function (d) { return (d.x1+d.x2) / 2;} )
    .attr('y', function (d) { return (d.y1+d.y2) / 2;} )
  }
  function _fn_ft(d) {
    var dx = d.x1-d.x2;
    var dy = d.y1-d.y2;
    var r = Math.sqrt(dx*dx+dy*dy);
    return (r/5)+'px'
  }
  gtext.selectAll('text.edge').data(edges, _fn_id)
    .transition()
    .duration(delay)
    .call(_fn_fin_text)
    .text(function (d) { return d.left ? '0' : '1'})
    .style('font-size', _fn_ft)
  gtext.selectAll('text.edge').data(edges, _fn_id)
  .enter().append('text')
    .attr('class', 'edge')
    .attr('x', function (d) { return (d.x1+d.x1) / 2;})
    .attr('y', function (d) { return (d.y1+d.y1) / 2;})
    .style('fill', 'black')
    .attr('stroke-opacity', 1)
    .transition()
    .duration(delay/2)
    .delay(delay/2)
    .call(_fn_fin_text)
    .text(function (d) { return d.left ? '0' : '1'})
    .style('font-size', _fn_ft)
  gtext.selectAll('text.edge').data(edges, _fn_id)
  .exit().remove();
}

function _draw_items() {
  var data = items
  if (status.onlyTree) {
    data = [];
  }
  function _fn_y_x() {
    this.transition()
    .duration(delay/2)
    .attr('y', function (d) { return yScale(d.y0+d.y)})
    .attr('height', function (d) { return yScale(d.y0) - yScale(d.y0+d.y)})
    .transition()
    .duration(delay/2)
    .attr('x', function (d) { return xScale(d.fi)})
    .attr('width', function (d) { return xScale.rangeBand() })
  }
  function _fn_xy() {
    this.transition()
    .duration(delay)
    .attr('x', function (d) { return xScale(d.fi)})
    .attr('width', function (d) { return xScale.rangeBand() })
    .attr('y', function (d) { return yScale(d.y0+d.y)})
    .attr('height', function (d) { return yScale(d.y0) - yScale(d.y0+d.y)})
  }
  gbase.selectAll('rect.item').data(data, _fn_id)
  .enter().append('rect')
    .attr('class', 'item')
    .attr('x', function (d) { return xScale(d.fi)})
    .attr('y', function (d) { return _height})
    .attr('width', function (d) { return xScale.rangeBand() })
    .attr('height', 0)
    .style('fill', function (d) { return color(d.id)})
  if (status.pop) {
    gbase.selectAll('rect.item').data(data, _fn_id)
    .call(_fn_y_x);
  } else {
    gbase.selectAll('rect.item').data(data, _fn_id)
    .call(_fn_xy);
  }

  gbase.selectAll('rect.item').data(data, _fn_id)
    .exit()
    .transition()
    .duration(delay)
    .style('opacity', 0)
    .remove();

  // text
  gtext.selectAll('text.item').data(items, _fn_id)
  .enter().append('text')
    .attr('class', 'item')
    .attr('x', function (d) { return d.tx})
    .attr('y', function (d) { return d.ty + 20})
    .style('fill', function (d) { return color(d.id)})
    .text(function (d) { return d.val })
  gtext.selectAll('text.item').data(items, _fn_id)
    .transition()
    .duration(delay)
    .attr('x', function (d) { return d.tx})
    .attr('y', function (d) { return d.ty+20})
  gtext.selectAll('text.item').data(items, _fn_id)
    .exit()
    .transition()
    .duration(delay)
    .style('opacity', 0)
    .remove();
}


function _process_node(n, p, x, y, skip, w) {
  if (n === null) {
    return;
  }
  var data = {
    key: n.key,
    val: n.val,
    x: x+(p.size-n.size)*skip,
    y: y+(p.size-n.size)*(skip > 0 ? skip : -skip),
    w: n.size === 1 ? w : 10,
    inner: n.size !== 1,
    id: n.id,
    ex: xPopScale(skip < 0 ? 0 : 1) + xPopScale.rangeBand()/2,
    ew: n.size === 1 ? xPopScale.rangeBand() : 10
  };
  if (n.size === 1) {
    items.push({
      val: n.val,
      id: n.id,
      y: n.key,
      tx: data.x,
      ty: data.y
    })
  }
  nodes.push(data);
  edges.push({
    x1: data.x,
    y1: data.y,
    x2: x,
    y2: y,
    id: n.id+'-'+p.id,
    left: n === p.left
  });
  _process_node(n.left,n,data.x,data.y, skip < 0 ? skip : -skip,w);
  _process_node(n.right,n,data.x,data.y, skip > 0 ? skip : -skip, w);
}

function _process_data() {
  if (status.array.sorted === undefined) {
    status.array.sort(function (a,b) {
      if (a.key === b.key) {
        return a.id - b.id;
      } else {
        return a.key-b.key;
      }
    })
    status.array.sorted = true;
  }
  tmpa = [];
  nodes = [];
  edges = [];
  items = [];
  if (status.pop) {
    offset = 1;
    tmpa.push(status.pop);
  } else {
    offset = 0;
  }
  tmpa = tmpa.concat(status.array);
  xScale.rangeRoundBands([0, Math.max(width,width/10*status.n)], .08).domain(d3.range(tmpa.length));
  xSubScale.rangeRoundBands([0,xScale.rangeBand()], .08);
  xPopScale = xScale.copy().domain(d3.range(tmpa.length+1));
  yMax = d3.max(tmpa, function (d) {return d.key;});
  yMax = yMax || 20;
  _height = Math.max(height,height/10*status.n);
  yScale.range([_height, 0]).domain([0,yMax]);
  for (var i = 0; i < tmpa.length; ++i) {
    if (tmpa[i].size > 1) {
      xSubScale.domain(d3.range(tmpa[i].size));
      var w = xSubScale.rangeBand();
      var skip = (xSubScale(1)-xSubScale(0))/2;
      var pos_x = xScale(i) + xScale.rangeBand()/2;
      var j = items.length;
      var k = 0;
      var sum = 0;
      function _helper(lr) {
        _process_node(tmpa[i][lr], tmpa[i], pos_x, _height, lr === 'left' ? -skip : skip, w);
        for (; j < items.length; ++j) {
          items[j].y0 = sum;
          items[j].fi = i;
          items[j].si = k++;
          sum += items[j].y;
        }
      }
      _helper('left');
      _helper('right');
    } else {
      items.push({
        val: tmpa[i].val,
        id: tmpa[i].id,
        y: tmpa[i].key,
        y0: 0,
        fi: i,
        si: 0,
        tx: xScale(i)+xScale.rangeBand()/2,
        ty: _height
      });
    }
  }
  keyScale.domain([0,d3.max(items, function (d) { return d.y})]);
}

function _move_canvas() {
  function _move() {
    this.transition()
    .duration(delay)
    .attr("transform", "translate(0,"+(status.onlyTree ? -_height : 0)+")");
  }
  gtree.call(_move);
  gtext.call(_move);
}

function render(status, delay) {
  _init(status, delay);
  _process_data();
  _draw_axis();
  _draw_nodes();
  _draw_edges();
  _draw_items();
  _move_canvas();
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
    .attr('transform', d3Transform().translate(100, 100).scale(0.5));

  ghigh = this.g.append('g').attr('class', 'high');
  gtree = this.g.append('g').attr('class', 'tree');
  gbase = this.g.append('g').attr('class', 'base');
  gtext = this.g.append('g').attr('class', 'text');

  gedges = gtree.append('g').attr('class', 'edges');
  gnodes = gtree.append('g').attr('class', 'nodes');

  gx = this.g.append('g').attr('class', 'axis');
  gy = this.g.append('g').attr('class', 'axis');

}

module.exports = {
  init: init,
  render: render
};
