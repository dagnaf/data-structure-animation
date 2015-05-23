var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh;
var status, delay, others;
var gtopotext;
var gscclowtext;
var gsccindtext;
var g;
var radius = 15;
var tau = 2*Math.PI;
var arc = d3.svg.arc()
    .innerRadius(0)
    .outerRadius(radius)
    .startAngle(0);
var d3color = d3.scale.category10();

function transform(d) {
  return 'translate('+g.nodes[d].x+','+g.nodes[d].y+')';
}
function angle(d,i) {
  // return { endAngle: /*status.vis[d] !== undefined ? tau :*/ (i+1)/(status.inq.length+1) * tau };
  return { endAngle: /*status.vis[d] !== undefined ? tau :*/ (i+1)/(status.inq.length) * tau };
}
function fnid(d) {
  return d;
}
function visited(d) {
  return status.vis[d.index] !== undefined;
}
function _draw_nodes () {
  gnodes.selectAll('path.inq').data(status.inq, fnid)
    .enter().append('path')
      .attr('class', 'inq')
      .attr('d', function (d) { return arc({ endAngle: 0 }); })
      .attr('transform', transform)
      .each(function (d) { this._current = { endAngle: 0 }; })
  gnodes.selectAll('path.inq').data(status.inq, fnid)
    .transition()
    .duration(delay)
    .attr('transform', transform)
    .attrTween('d', function (d,i) {
      var ia = d3.interpolate(this._current, angle(d,i));
      this._current = ia(0); // this._current update with i
      return function (t) {
        return arc(ia(t));
      }
    })
  gnodes.selectAll('path.inq').data(status.inq, fnid)
    .exit().remove()
  gnodes.selectAll('circle.node')
    .classed('visited', visited);
  gtext.selectAll('text.node')
    .classed('visited', visited);
}

function fneid(d) {
  return d.u+'-'+d.v;
}

function rotate(pos, deg) {
  var r = Math.PI*deg/180;
  return {
    x: pos.x *  Math.cos(r) + pos.y * Math.sin(r),
    y: pos.x * -Math.sin(r) + pos.y * Math.cos(r),
  }
}

function neg(pos) {
  return { x: -pos.x, y: -pos.y };
}

function translate(pos, vec) {
  return {
    x: pos.x - vec.x,
    y: pos.y - vec.y,
  }
}
function sameEdge(d,e,strict) {
  var weighted = gedges.classed('weighted');
  var directional = gedges.classed('directional');
  if ((!weighted || !directional)) {
    if (strict === true) {
      return (e.u === d.source.index && e.v === d.target.index);
    } else if (strict === false) {
      return (e.v === d.source.index && e.u === d.target.index);
    }
  }
  if (d.reflexive || !directional) {
    return (e.u === d.source.index && e.v === d.target.index) ||
      (e.v === d.source.index && e.u === d.target.index);
  }
  return (e.u === d.source.index && e.v === d.target.index);
}
function getPainterEdge(e) {
  var weighted = gedges.classed('weighted');
  var directional = gedges.classed('directional');
  var edge = g.edges.filter(function (d) {
    return sameEdge(d,e);
  })[0];
  if (directional && weighted) {
    return edge;
  }
  return {
    source: edge.source.index === e.u ? edge.source : edge.target,
    target: edge.target.index === e.v ? edge.target : edge.source,
  }
}
function link(type) {
  return function (d) {
    var e = getPainterEdge(d);
    var dx = e.source.x - e.target.x;
    var dy = e.target.y - e.source.y;
    var dr = Math.sqrt(dx*dx + dy*dy);
    var it = (type === 'exit' ? d3.interpolate(e.target, e.source) : d3.interpolate(e.source, e.target));
    // var source = d3.interpolate(d.source, d.target)(radius/dr);
    var source = e.source;
    if (e.curve) {
      var ia = (type === 'exit' ? d3.interpolate(0,30) : d3.interpolate(30,0));
      return function (t) {
        var ang =ia(t);
        var target = translate(rotate(translate(it(t), source), ang), neg(source));
        return "M"+source.x+","+source.y+"A"+dr+","+dr+" 0 0,1 "+target.x+","+target.y;
      }
    } else {
      return function (t) {
        var target = it(t);
        return "M"+source.x+","+source.y+"L"+target.x+","+target.y;
      }
    }
  }
}

function selected(d) {
  return status.se.some(function (se) {
    return sameEdge(d,se);
  })
}
function reversed(d) {
  var weighted = gedges.classed('weighted');
  var directional = gedges.classed('directional');
  if (directional && weighted) {
    return false;
  }
  return status.se.some(function (se) {
    return sameEdge(d,se,false);
  })
}
function same(d) {
  var weighted = gedges.classed('weighted');
  var directional = gedges.classed('directional');
  if (directional && weighted) {
    return false;
  }
  return status.se.some(function (se) {
    return sameEdge(d,se,true);
  })
}
function _draw_deges() {
  gedges.selectAll('path.edge')
    .classed('painter-selected', selected)
    .classed('rev-dir', reversed)
    .classed('sam-dir', same)
  gedges.selectAll('path.ine').data(status.ine, fneid)
    .enter().insert('path', ':first-child')
    .attr('class', 'ine')
    .transition()
    .duration(delay)
    .attrTween('d', link('update'));
  // gedges.selectAll('path.ine').data(status.ine, fneid)
  //   .transition()
  //   .duration(delay)
  //   .attrTween('d', link('update'));
  gedges.selectAll('path.ine').data(status.ine, fneid)
    .exit()
    .transition()
    .duration(delay)
    .attrTween('d', link('exit'))
    .remove();
}

function _draw_topo() {
  gnodes.selectAll("circle.node")
    .classed('highlighted', function (d, i) { return i === status.hl });
  gtopotext.selectAll("text.topo").data(status.arr, fnid)
    .enter().append("text")
    .attr("class", "topo")
    .attr("transform", transform)
    .text(function (d,i) { return '['+(status.vis.length-i-1)+']'; });
  gtopotext.selectAll("text.topo").data(status.arr, fnid)
    .attr("transform", transform)
    .text(function (d,i) { return '['+(status.vis.length-i-1)+']'; });
    // .text(function (d,i) { return status.vis.length-i-1; });
  gtopotext.selectAll("text.topo").data(status.arr, fnid)
    .exit().remove();
}
var udlr = [[-1,-1],[-1,1],[1,-1],[1,1]];
function _draw_scc() {
  var data = status.col.reduce(function (a,d,i) {
    if (d !== undefined) {
      a[d] = (a[d] || []).concat(d3.range(4).map(function (j) {
        return [g.nodes[i].x+udlr[j][0]*radius,g.nodes[i].y+udlr[j][1]*radius];
      }));
    }
    return a;
  }, []).map(d3.geom.hull);
  gbase.selectAll('path.scc').data(data)
    .enter().insert('path', ':first-child')
      .attr('class', 'scc')
  gbase.selectAll('path.scc').data(data)
    .attr('d', function (d) { return "M" + d.join("L") + "Z"; })
    // .style('fill', function (d,i) { return d3color(i); })
    // .style('stroke', function (d,i) { return d3color(i); })
  gbase.selectAll('path.scc').data(data)
    .exit().remove();

  function transform_i(d,i) {
    return transform(i);
  }
  function text_i(i) {
    if (status.ind[i] === 'undefined') {
      return '';
    }
    return '('+status.ind[i] + ',' + (status.low[i] === undefined ? '?' : status.low[i])+')';
  }
  // low
  gscclowtext.selectAll('text.low').data(status.low)
    .enter().append('text')
      .attr('class','low')
  gscclowtext.selectAll('text.low').data(status.low)
    .text(function (d,i) { return text_i(i); })
    .attr("transform", transform_i);
  gscclowtext.selectAll('text.low').data(status.low)
    .exit().remove();
  // index
  // gsccindtext.selectAll('text.ind').data(status.ind)
  //   .enter().append('text')
  //     .attr('class','ind')
  // gsccindtext.selectAll('text.ind').data(status.ind)
  //   .text(function (d) { return 'i' + (d === undefined ? '?' : d) })
  //   .attr("transform", transform_i);
  // gsccindtext.selectAll('text.ind').data(status.ind)
  //   .exit().remove();
}

function _init(_status, _delay, _others) {
  status = _status;
  delay = _delay;
  others = _others;
}

function render(status, delay, others) {
  _init(status, delay, others);
  _draw_nodes();
  _draw_deges();
  _draw_topo();
  _draw_scc();
}

function init(_g) {
  g = _g;
  gbase = d3.select('g.base');
  gtext = d3.select('g.text');
  gnodes = d3.select('g.nodes');
  gedges = d3.select('g.edges');
  d3.selectAll('g.topo,g.scclow,g.sccind').remove();
  gtopotext = gtext.append("g")
      .attr("class", "topo")
      .attr("transform","translate(15,-15)");
  gscclowtext = gtext.append("g")
      .attr("class", "scclow")
      .attr("transform","translate(20,-10)");
  gsccindtext = gtext.append("g")
      .attr("class", "sccind")
      .attr("transform","translate(15,15)");
}

function clear() {
  gbase.selectAll('path.scc').remove();
  gnodes.selectAll('path.inq').remove();
  gedges.selectAll('path.edge').attr('class', 'edge');
  gedges.selectAll('path.ine').remove();
  gnodes.selectAll('circle.node').attr('class', 'node');
  gtext.selectAll('text.node').attr('class', 'node');
  gtopotext.remove();
  gscclowtext.remove();
  gsccindtext.remove();
}

module.exports = {
  init: init,
  render: render,
  clear: clear
}
