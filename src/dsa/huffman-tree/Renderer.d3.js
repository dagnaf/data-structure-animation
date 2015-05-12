require('./Renderer.d3.less');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, gnodes, gedges, gx, gy;
var status, delay;

var xScale = d3.scale.ordinal()
var yScale = d3.scale.linear()
var color = d3.scale.category20();
var yMax;
var nodes;
var edges;
var xi;
var _inner_width = 10;

function _fn_id(d) { return d.id; }

function _init(_status, _delay) {
  status = _status;
  delay = _delay;
}

function _draw_nodes() {
  function _add_paths(d) {
    if (d.paths === undefined) {
      d.paths = [];
      d.ancestors = [];
      var x = d;
      while (x.p !== null) {
        d.paths.push(x.p.id+'-'+x.id);
        d.ancestors.push(x.p.id);
        x = x.p
      }
    }
  }
  function _mouseover(d,i,j) {
    // console.log(d,i,j,this)
    _add_paths(d);
    var paths = d.paths;
    var ancestors = d.ancestors;
    var id = d.id;
    d3.selectAll('line.edge')
    .style('opacity', function (d) {
      return paths.indexOf(d.id) === -1 ? 0.3 : 1;
    })
    d3.selectAll('text.edge')
    .style('opacity', function (d) {
      return paths.indexOf(d.id) === -1 ? 0.3 : 1;
    })
    d3.selectAll('rect.node')
    .style('opacity', function (d) {
      return (ancestors.indexOf(d.id) === -1 && d.id !== id) ? 0.3 : 1;
    })
    d3.selectAll('text.char')
    .style('opacity', function (d) {
      return (ancestors.indexOf(d.id) === -1 && d.id !== id) ? 0.3 : 1;
    })
    .text(function (d) {
      return (id === d.id ? d.key : d.val)
    })
  }
  function _mouseout(d) {
    d3.selectAll('line.edge').style('opacity', 1)
    d3.selectAll('text.edge').style('opacity', 1)
    d3.selectAll('rect.node').style('opacity', 1)
    d3.selectAll('text.char').style('opacity', 1).text(function (d) { return d.val})

  }

  var data_inner = nodes.filter(function (d) { return d.inner === true});
  var data = nodes.filter(function (d) { return d.inner !== true });
  gnodes.selectAll('rect.node').data(data,_fn_id)
  .enter().append('rect')
    .attr('class', 'node')
    .attr('x', function (d) { return d.x-d.w/2})
    .attr('y', function (d) { return d.inner ? d.y-d.h/2 : 0 })
    .attr('width', function (d) { return d.w })
    .attr('height', 0)
    .style('fill', function (d) { return color(d.id)})
    .on('mouseover', _mouseover)
    .on('mouseout', _mouseout)


  gnodes.selectAll('rect.node').data(data_inner,_fn_id)
  .enter().append('rect')
    .attr('class', 'node')
    .attr('x', function (d) { return d.x-d.w/2})
    .attr('y', function (d) { return d.inner ? d.y-d.h/2 : 0 })
    .attr('width', function (d) { return d.w })
    .attr('height', 0)
    .style('fill', function (d) { return 'black' })

  gnodes.selectAll('rect.node').data(nodes,_fn_id)
    .transition()
    .duration(delay)
    .attr('x', function (d) { return d.x-d.w/2})
    .attr('y', function (d) { return d.inner ? d.y-d.h/2 : 0 })
    .attr('width', function (d) { return d.w })
    .attr('height', function (d) { return d.h })
    .style('opacity', function (d) { return d.o ? 0.3 : 1 })
  gnodes.selectAll('rect.node').data(nodes,_fn_id)
    .exit().remove()

  // text-key
  gtext.selectAll('text.node').data(nodes, _fn_id)
    .enter().append('text')
    .attr('class', 'node')
    .attr('x', function (d) { return d.tx})
    .attr('y', function (d) { return d.ty-5 })
  gtext.selectAll('text.node').data(nodes,_fn_id)
    .transition()
    .duration(delay)
    .attr('x', function (d) { return d.tx})
    .attr('y', function (d) { return d.ty-5 })
    .text(function (d) { return d.top ? d.key :  ''})
    .style('opacity', function (d) { return d.o ? 0.3 : 1 })
  gtext.selectAll('text.node').data(nodes,_fn_id)
    .exit().remove()

  // text-val

  gtext.selectAll('text.char').data(data, _fn_id)
    .enter().append('text')
    .attr('class','char')
    .attr('x', function (d){ return d.tx })
    .attr('y', function (d){ return d.h > 40 ? d.h-10: d.h+10 })
    .style('fill', function (d) { return d.h > 40 ? color(d.id) : 'black' })
  gtext.selectAll('text.char').data(nodes,_fn_id)
    .transition()
    .duration(delay)
    .attr('x', function (d){ return d.tx })
    .attr('y', function (d){ return d.h > 40 ? d.h/2+5: d.h+10 })
    .text(function (d) { return d.val })
    .style('opacity', function (d) { return d.o ? 0.3 : 1 })
  gtext.selectAll('text.char').data(nodes,_fn_id)
    .exit().remove()
}

function _draw_edges() {

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

  gedges.selectAll('line.edge').data(edges, _fn_id)
    .transition()
    .duration(delay)
    .attr('x1', function (d) { return d.x1;} )
    .attr('y1', function (d) { return d.y1;} )
    .attr('x2', function (d) { return d.x2;} )
    .attr('y2', function (d) { return d.y2;} )
    .style('opacity', function (d) { return d.o ? 0.3 : 1 })

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

  var data = status.zo ? edges : [];
  gtext.selectAll('text.edge').data(data, _fn_id)
  .enter().append('text')
    .attr('class', 'edge')
    .attr('x', function (d) { return (d.x1+d.x1) / 2;})
    .attr('y', function (d) { return (d.y1+d.y1) / 2;})
    .style('fill', 'black')
    .style('font-size', _fn_ft)
    .text(function (d) { return d.left ? '0' : '1'})
  gtext.selectAll('text.edge').data(data, _fn_id)
    .transition()
    .duration(delay)
    .attr('x', function (d) { return (d.x1+d.x2) / 2;} )
    .attr('y', function (d) { return (d.y1+d.y2) / 2;} )
    .text(function (d) { return d.t })
    .style('font-size', _fn_ft)
    .style('opacity', function (d) { return d.o ? 0.3 : 1 })
  gtext.selectAll('text.edge').data(data, _fn_id)
  .exit().remove();
}

function _process_node(n, opacity) {
  if (n.size === 1) {
    n.x = xScale(xi++)+xScale.rangeBand()/2;
    n.y = 0;
    n.w = xScale.rangeBand();
    n.h = yScale(n.key);
    n.tx = n.x;
    n.ty = 0;
    n.inner = false;
    n.o = opacity;
    nodes.push(n);
    return [n.x,n.x];
  }
  var xl = _process_node(n.left,opacity)[0];
  var xr = _process_node(n.right,opacity)[1];
  n.w = _inner_width;
  n.h = _inner_width;
  n.x = (xl+xr)/2;
  n.y = n.left.y-(n.size - n.left.size)*xScale.rangeBand()/2;
  n.tx = n.x;
  n.ty = n.y;
  n.inner = true;
  n.o = opacity;
  nodes.push(n);
  edges.push({o:opacity,x1: n.left.x,y1: n.left.y,x2: n.x,y2: n.y,id: n.id+'-'+n.left.id,t: 0});
  edges.push({o:opacity,x1: n.right.x,y1: n.right.y,x2: n.x,y2: n.y,id: n.id+'-'+n.right.id,t: 1});
  return [xl, xr];
}

function _process_data() {
  if (status.sorted && status.array.sorted === undefined) {
    status.array.sort(function (a,b) {
      if (a.key === b.key) {
        return a.id - b.id;
      } else {
        return a.key-b.key;
      }
    })
    status.array.sorted = true;
  }
  array = status.pop.concat(status.array);
  nodes = [];
  edges = [];
  xScale.rangeRoundBands([0, 720], .08).domain(d3.range(status.n))
  yScale.range([0, 400]).domain([0, status.l]);
  xi = 0;
  array.forEach(function (n, i) {
    n.top = true;
    var opacity = false;
    if (status.pop.length === status.hl) {
      if (status.hl !== 0 && i >= status.hl) {
        opacity = true;
      }
    }
    _process_node(n, opacity);
  })
}

function render(status, delay) {
  _init(status, delay);
  _process_data();
  _draw_nodes();
  _draw_edges();
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
    .attr('transform', d3Transform().translate(100, 200).scale(0.5));

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
