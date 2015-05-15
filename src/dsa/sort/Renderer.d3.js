require('./Renderer.d3.less');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh;
var status, delay, others;
var height = 400;
var width;
var _width = 720;
var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .08);
var yScale = d3.scale.linear().range([height, 0]);
var _marker_width = 3;
var _hl_color = 'deepskyblue';
var _stroke_width = 10;
var color = d3.interpolateRgb('white', 'black');
// var opa = d3.interpolate(0,1);
var opa = d3.interpolate(0,1);
var color2 = d3.scale.category10();

function _draw_bg() {
  ghigh.selectAll('rect.bg').data(status.bg)
    .enter().append('rect')
    .attr('class','bg')
    .attr('x', function (d) { return xScale(d[0]) })
    .attr('y', -10)
    .attr('width', function (d) {
      return xScale(d[1]) + xScale.rangeBand() - xScale(d[0]);
    })
    .attr('height', height + 20)
    .style('fill', function (d, i) {
      var j = status.bg.length-1-i;
      return color(j/status.bg.length);
    });
  ghigh.selectAll('rect.bg').data(status.bg)
    .transition()
    .duration(delay)
    .style('fill', function (d, i) {
      var j = status.bg.length-1-i;
      return color(j/status.bg.length);
    });
  ghigh.selectAll('rect.bg').data(status.bg)
    .exit().remove();
}

function _get_i(i) {
  return status.mp[i] === 0 ? 0 : (status.mp[i] || i);
}
function _x (d,i) {
  return xScale(_get_i(i))
}
function _y(d, i, up) {
  if (up === true || status.dn.indexOf(i) === -1) {
    return yScale(d);
  }
  return -(yScale(0) - yScale(d)) - 30;
}
function _height(d,i) {
  return yScale(0) - yScale(d);
}
function _get_bg(i) {
  var bg = status.bg;
  for (var k = bg.length-1; k > 0 && (bg[k][0] > i || i > bg[k][1]); k--);
    return k;
}
function _opacity(d,i) {
  return 1;
  i = _get_i(i)
  var bg = status.bg;
  // bg = bg || [0, status.arr.length-1];
  // return bg[0] <= i && i <= bg[1] ? 1 : 0.3;
  // k = bg.length-1-k;
  var k = _get_bg(i);
  return opa((k+1)/bg.length);
}
function _fill(d,i,text) {
  if (status.fin.indexOf(i) !== -1 && text !== true) {
    return 'none';
  }
  i = _get_i(i)
  return color2(_get_bg(i));
}
function _stroke(d,i) {
  if (status.fin.indexOf(i) === -1) {
    return 'none';
  }
  i = _get_i(i)
  return color2(_get_bg(i));
}
function _draw_chart() {
  gbase.selectAll('rect.item').data(status.arr)
    .enter().append('rect')
      .attr('class', 'item')
      .attr('x', function (d, i) { return xScale(i)})
      .attr('y', height)
      .attr('width', xScale.rangeBand())
      .attr('height', 0)
  gbase.selectAll('rect.item').data(status.arr)
    .transition()
    .duration(delay)
    .attr('x', _x)
    .attr('y', _y)
    .attr('height', _height)
    .attr('width', xScale.rangeBand())
    .style('fill', _fill)
    .style('stroke', _stroke)
    .style('opacity', _opacity);
  gbase.selectAll('rect.item').data(status.arr)
    .exit().remove()

  // text
  gtext.selectAll('text.item').data(status.arr)
    .enter().append('text')
      .attr('class', 'item')
      .attr('x', function (d, i) { return xScale(i) + xScale.rangeBand() / 2 })
      .attr('y', height + 20)
      .text(function (d) { return d })
  gtext.selectAll('text.item').data(status.arr)
    .transition()
    .duration(delay)
    .attr('x', function (d,i) { return _x(d,i) + xScale.rangeBand() / 2 })
    .attr('y', function (d,i) { return _y(d,i) < 0 ? -10 : height+20 })
    // .attr('y', function (d,i) { return _y(d,i) - 20 })
    .style('fill', function (d, i) { return _fill(d,i,true) })
    .style('opacity', _opacity);
  gtext.selectAll('text.item').data(status.arr)
    .exit().remove()
}

function _draw_pt() {
  var data = status.pt.map(function (d) {
    if (d >= status.arr.length) {
      return xScale(status.arr.length-1) + xScale.rangeBand()*1.6;
    } else {
      return xScale(d) + xScale.rangeBand()/2;
    }
  });
  gbase.selectAll('line.pt').data(data)
    .enter().append('line')
      .attr('class', 'pt')
      .attr('stroke', function (d, i) { return color2(i) })
      .attr('stroke-width', _stroke_width)
      .attr('stroke-opacity', 0.5)
      .attr('marker-end', function (d,i) { return 'url(#'+(i ? 'j' : 'i')+'-arr)' })
      .attr('x1', function (d) { return d })
      .attr('x2', function (d) { return d })
      .attr('y1', function (d) { return height + 90 })
      .attr('y2', function (d) { return height + 50 })
  gbase.selectAll('line.pt').data(data)
    .transition()
    .duration(delay)
    .attr('x1', function (d) { return d })
    .attr('x2', function (d) { return d })
    .attr('y1', function (d) { return height + 90 })
    .attr('y2', function (d) { return height + 50 })
  gbase.selectAll('line.pt').data(data)
    .exit().remove();
}
function _draw_mid() {
  gbase.selectAll('line.mid').data(status.mid)
    .enter().append('line')
      .attr('class', 'mid')
      .attr('x1', function (d) { return xScale(d) - 2.5 })
      .attr('x2', function (d) { return xScale(d) - 2.5 })
      .attr('y1', -20)
      .attr('y2', -20)
      .style('stroke', _hl_color)
      .style('stroke-opacity', 1)
      .style('stroke-width', 5)
      .style('stroke-dasharray', '20 5');
  gbase.selectAll('line.mid').data(status.mid)
    .transition()
    .duration(delay)
      .attr('x1', function (d) { return xScale(d) - 2.5 })
      .attr('x2', function (d) { return xScale(d) - 2.5 })
      .attr('y1', -20)
      .attr('y2', height + 20)
  gbase.selectAll('line.mid').data(status.mid)
    .exit()
    .transition()
    .duration(delay)
    .attr('y2', 0)
    .remove();
}
function _draw_cf() {
  gbase.selectAll('line.cf').data(status.cf)
    .enter().append('line')
      .attr('class', 'cf')
      // .attr('x1', function (d) { return xScale(_get_i(d.i)) })
      // .attr('x2', function (d) { return xScale(_get_i(d.i))+xScale.rangeBand()})
      // .attr('y1', function (d) { return yScale(status.arr[d.i])})
      // .attr('y2', function (d) { return yScale(status.arr[d.i])})
      .style('stroke', _hl_color)
      .style('stroke-opacity', 1)
      .style('stroke-width', 5)
  gbase.selectAll('line.cf').data(status.cf)
    .attr('x1', function (d) { return xScale(_get_i(d.i)) })
    .attr('x2', function (d) { return xScale(_get_i(d.i))+xScale.rangeBand()})
    .attr('y1', function (d) { return yScale(status.arr[d.i])})
    .attr('y2', function (d) { return yScale(status.arr[d.i])})
    .transition()
    .duration(delay)
      .attr('x1', function (d) { return xScale(_get_i(d.j)) })
      .attr('x2', function (d) { return xScale(_get_i(d.j))+xScale.rangeBand()})
      .attr('y1', function (d) { return yScale(status.arr[d.i])})
      .attr('y2', function (d) { return yScale(status.arr[d.i])})
      // .style('stroke-dasharray', '20 5');
  gbase.selectAll('line.cf').data(status.cf)
    .exit()
    .remove();
}
function _process_data () {
  console.log(JSON.stringify(status))
  if (status.bg.length === 0) {
    status.bg = [[0,status.arr.length-1]];
  }
  width = _width/12*status.arr.length;
  xScale
  .rangeRoundBands([0, width], .08)
  .domain(d3.range(status.arr.length))
  yScale
  .domain([0,d3.max(status.arr)]);
}

function _init(_status, _delay) {
  status = _status;
  delay = _delay;
}

function render(status, delay) {
  _init(status, delay);
  _process_data();
  _draw_chart();
  _draw_mid();
  _draw_pt();
  _draw_cf();
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

  var defs = this.svg.append('defs').selectAll('marker').data(['i','j']).enter()
    .append('marker')
      .attr('id', function (d) { return d+'-arr' })
      .attr('viewBox', '-5 -5 10 10')
      .attr('markerWidth', _marker_width)
      .attr('markerHeight', _marker_width)
      .attr('orient', 'auto')
      .attr('refX', -5)
    .append('path')
      .attr('d', 'M-5,-5L5,0,L-5,5')
      .attr('opacity', 0.5)
      .attr('fill', function (d,i) { return color2(i); })

  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(100, 200).scale(0.5));

  ghigh = this.g.append('g').attr('class', 'high');
  gbase = this.g.append('g').attr('class', 'base');
  gtext = this.g.append('g').attr('class', 'text');

  others = this.props.others;
}

module.exports = {
  init: init,
  render: render
};
