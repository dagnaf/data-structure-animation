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

function transform(d) {
  return 'translate('+g.nodes[d].x+','+g.nodes[d].y+')';
}
function _draw_nodes () {
  var data = status.pns.filter(function (d) { return !isNaN(d.w) && d.out !== true; });
  var set = d3.set(data.map(function (d) { return d.w })).values().map(parseFloat).sort(d3.descending);
  function _fnid(d) { return d.i; }
  function _transform(d) { return transform(d.i); }
  function _angle(d) { return (set.indexOf(d.w)+1)/set.length*tau; }
  function _visited(d,i) { return status.pns[i] && status.pns[i].out === true; }
  gnodes.selectAll('path.inq').data(data, _fnid)
    .enter().append('path')
      .attr('class', 'inq')
      .attr('d', function (d) { return arc({ endAngle: 0 }); })
      .attr('transform', _transform)
      .each(function (d) { this._current = { endAngle: 0 }; })
  gnodes.selectAll('path.inq').data(data, _fnid)
    .transition()
    .duration(delay)
    .attr('transform', _transform)
    .attrTween('d', function (d,i) {
      var ia = d3.interpolate(this._current, { endAngle: _angle(d,i) });
      this._current = ia(0); // this._current update with i
      return function (t) {
        return arc(ia(t));
      }
    })
  gnodes.selectAll('path.inq').data(data, _fnid)
    .exit().remove()
  gnodes.selectAll('circle.node')
    .classed('visited', _visited);
  gtext.selectAll('text.node')
    .classed('visited', _visited);
  // text
  gprimtext.selectAll('text.dist').data(status.pns, _fnid)
    .enter().append('text')
      .attr('class','dist')
      .attr("transform", _transform)
  gprimtext.selectAll('text.dist').data(status.pns, _fnid)
    .attr("transform", _transform)
    .text(function (d) { return d.w === status.neg ? '=0'/*'-∞'*/ : (d.w === status.pos ? '+∞' : '='+d.w); })
  gprimtext.selectAll('text.dist').data(status.pns, _fnid)
    .exit().remove();
  // hl
  gnodes.selectAll("circle.node")
    .classed('highlighted', function (d, i) { return i === status.hl[0] });
}

function fneid(d) {
  return d.u+'-'+d.v;
}

function sameEdge(d,e,strict) {
  if (strict === true) {
    return (e.u === d.source.index && e.v === d.target.index);
  } else if (strict === false) {
    return (e.v === d.source.index && e.u === d.target.index);
  }
  return (e.u === d.source.index && e.v === d.target.index) ||
    (e.v === d.source.index && e.u === d.target.index);
}
function getPainterEdge(e) {
  var edge = g.edges.filter(function (d) {
    return sameEdge(d,e);
  })[0];
  return {
    source: edge.source.index === e.u ? edge.source : edge.target,
    target: edge.target.index === e.v ? edge.target : edge.source,
    curve: edge.curve
  }
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
  var strict = gedges.classed('directional') ? true : undefined;
  return status.se.concat(status.pns.filter(function (d) { return d.w !== status.neg && d.out !== true }).map(function (d) { return d.e; })).some(function (se) {
  // return status.se.some(function (se) {
    return se && sameEdge(d,se,strict);
  })
}
function reversed(d) {
  if (gedges.classed('directional')) return false;
  return status.se.concat(status.pns.filter(function (d) { return d.w !== status.neg && d.out !== true }).map(function (d) { return d.e; })).some(function (se) {
  // return status.pns.map(function (d) { return d.e; }).some(function (se) {
  // return status.se.some(function (se) {
    return se && sameEdge(d,se,false);
  })
}
// function same(d) {
//   return status.se.some(function (se) {
//     return sameEdge(d,se,true);
//   })
// }
function _draw_edges() {
  gedges.selectAll('path.edge')
    .classed('painter-selected', selected)
    .classed('rev-dir', reversed)
    .classed('highlighted', function (d) {
      var strict = gedges.classed('directional') ? true : undefined;
      return status.hle.some(function (se) { return se && sameEdge(d,se,strict); })
    })
    // .classed('sam-dir', same)
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

function _init(_status, _delay, _others) {
  status = _status;
  delay = _delay;
  others = _others;
}

function render(status, delay, others) {
  _init(status, delay, others);
  _draw_nodes();
  _draw_edges();
}

function init(_g) {
  g = _g;
  gbase = d3.select('g.base');
  gtext = d3.select('g.text');
  gnodes = d3.select('g.nodes');
  gedges = d3.select('g.edges');
  d3.selectAll('g.prim').remove();
  gprimtext = gtext.append("g")
      .attr("class", "prim")
      .attr("transform","translate(15,-15)");
}

function clear() {
  gnodes.selectAll('path.inq').remove();
  gedges.selectAll('path.edge').attr('class', 'edge');
  gedges.selectAll('path.ine').remove();
  gnodes.selectAll('circle.node').attr('class', 'node');
  gtext.selectAll('text.node').attr('class', 'node');
  gprimtext.remove();
}

module.exports = {
  init: init,
  render: render,
  clear: clear
}
