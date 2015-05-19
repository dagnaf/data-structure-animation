require('./Renderer.d3.less');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh;
var status, delay;
var height = 600;
var width = 720;
var xScale = d3.scale.ordinal().rangeRoundBands([0, width], .08);
var yScale = d3.scale.linear().range([height, 0]);
var _marker_width = 5;
var _hl_color = 'deepskyblue';

function _draw_chart() {
  function _opacity(d, i) {
    return (status.hl[0]+1 <= i && i <= status.hl[1]+1) || i == 0 ? 1 : 0.2;
  }
  var data = [status.k].concat(status.arr);
  gbase.selectAll('rect.chart').data(data)
    .enter().append('rect')
      .attr('class', 'chart')
      .attr('x', function (d,i) { return xScale(i) })
      .attr('y', function () { return yScale(0) })
      .attr('height', 0)
  gbase.selectAll('rect.chart').data(data)
    .transition()
    .duration(delay)
    .attr('x', function (d,i) { return xScale(i) })
    .attr('y', function (d) { return yScale(d) })
    .attr('height', function (d) { return yScale(0) - yScale(d) })
    .attr('width', function () { return xScale.rangeBand() })
    .style('opacity', _opacity)
    .style('fill', function (d,i) { return i === 0 ? _hl_color : null})
  gbase.selectAll('rect.chart').data(data)
    .exit().remove()

  // text
  gtext.selectAll('text.chart').data(data)
    .enter().append('text')
      .attr('class', 'chart')
      .attr('x', function (d,i) { return xScale(i) + xScale.rangeBand()/2 })
      .attr('y', function () { return yScale(0) })
      .text(function (d) { return d ? d : '' })
  gtext.selectAll('text.chart').data(data)
    .transition()
    .duration(delay)
    .style('opacity', _opacity)
    .attr('x', function (d,i) { return xScale(i) + xScale.rangeBand()/2 })
    .attr('y', function (d) { return yScale(d) - 20 })
    .text(function (d) { return d ? d : '' })
  gtext.selectAll('text.chart').data(data)
    .exit().remove()
}

function _draw_cf() {
  var data = status.c// === undefined ? [] : [status.c];
  ghigh.selectAll('rect.cf').data(data)
    .enter().append('rect')
    .attr('class', 'cf')
    .attr('x', xScale(0))
    .attr('y', yScale(status.k))
    .attr('height', yScale(0) - yScale(status.k))
    .attr('width', xScale.rangeBand())
    .style('opacity', 0.6)
    .style('fill', _hl_color)
  ghigh.selectAll('rect.cf').data(data)
    .transition()
    .duration(delay)
    .attr('width', xScale.rangeBand())
    .attr('height', yScale(0) - yScale(status.k))
    .attr('y', yScale(status.k))
    .attr('x', function (d) { return xScale(d+1) })
  ghigh.selectAll('rect.cf').data(data)
    .exit().remove();
}

function _draw_pointer() {
  function _color() {
    return status.r === 0 ? _hl_color : status.r === 1 ? 'green' : 'red';
  }
  d3.select('#left-arr').select('path')
    .transition()
    .duration(delay)
    .style('stroke', _color());
  d3.select('#right-arr').select('path')
    .transition()
    .duration(delay)
    .style('stroke', _color());
  var end, start;
  var x1, y1, x2, y2;
  var b = status.p;
  if (b.length === 1) {
    end = 'right';start = 'left';
    x1 = x2 = xScale(b[0]+1)+xScale.rangeBand()/2;
    y1 = y2 = yScale(status.arr[b[0]]) - 40;
  } else if (b.length === 2) {
    if (b[0] === b[1]) {
      end = 'left';
      start = null;
      x1 = x2 = xScale(b[0]+1)+xScale.rangeBand()/2;
      y2 = yScale(status.arr[b[0]]) - 60;
      y1 = y2-60;
    } else {
      end = 'left';start = 'right';
      x1 = xScale(b[0]+1) + 10;
      x2 = xScale(b[1]+1) + xScale.rangeBand() - 15;
      y1 = y2 = height + 20;
    }
  }
  var data = (b.length === 0 ? [] : [1]);
  gbase.selectAll('line.ptr').data(data)
    .enter().append('line')
    .attr('class', 'ptr')
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('y1', y1)
    .attr('y2', y2)
    .attr('marker-start', start ? 'url(#'+start+'-arr)' : null)
    .attr('marker-end', end ? 'url(#'+end+'-arr)' : null)
  gbase.selectAll('line.ptr').data(data)
    .attr('marker-start', start ? 'url(#'+start+'-arr)' : null)
    .attr('marker-end', end ? 'url(#'+end+'-arr)' : null)
    .transition()
    .duration(delay)
    .style('stroke', _color)
    .attr('x1', x1)
    .attr('x2', x2)
    .attr('y1', y1)
    .attr('y2', y2)
  gbase.selectAll('line.ptr').data(data)
    .exit().remove()
}

function _process_data() {
  status.k = status.k || 0;
  if (status.hl.length === 0) {
    status.hl = [0, status.arr.length-1];
  }
  xScale.domain(d3.range(status.arr.length+1));
  yScale.domain([0, Math.max(status.k, d3.max(status.arr))]);
}

function _init(_status, _delay) {
  status = _status;
  delay = _delay;
}


function render(status, delay) {
  _init(status, delay);
  _process_data();
  _draw_chart();
  _draw_cf();
  _draw_pointer();
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

  var defs = this.svg.append('defs').selectAll('marker').data(['left','right']).enter()
    .append('marker')
      .attr('id', function (d) { return d+'-arr' })
      .attr('viewBox', '-5 -5 20 15')
      .attr('markerWidth', _marker_width)
      .attr('markerHeight', _marker_width)
      .attr('orient', 'auto')
      .attr('refX', function (d) { return d === 'left' ? 7 : 1 })
    .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', 'none')
      .attr('stroke', _hl_color)
      .attr('stroke-width', 3)

  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(100, 200).scale(0.5));

  gbase = this.g.append('g').attr('class', 'base');
  ghigh = this.g.append('g').attr('class', 'high');
  gtext = this.g.append('g').attr('class', 'text');

}

module.exports = {
  init: init,
  render: render
};
