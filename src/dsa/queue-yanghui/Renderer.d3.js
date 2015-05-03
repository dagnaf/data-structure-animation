var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, status, delay;
var status, delay;

var N;

var _r = 30;

var _highlight_color = 'deepskyblue';

function _draw_circles () {
  var data = status.yh.map(function (d,i) {
    return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
  });
  gbase.selectAll('circle').data(data)
    .enter()
      .append('circle')
      .attr('r', _r)
      .attr('cx', function (d) { return d.cx})
      .attr('cy', function (d) { return d.cy})
      .style('fill', 'coral')
      .style('opacity', 0)
        .transition()
        .duration(delay)
      .style('opacity', 1);
  // yh-update
  gbase.selectAll('circle').data(data)
    .style('opacity', 1)
      .transition()
      .duration(delay)
    .style('fill', function (d, i) {
      return status.nums.some(function (v) {
        return v.i === i;
      }) ? _highlight_color : 'coral';
    });
  // yh-exit
  gbase.selectAll('circle').data(data)
    .exit()
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .style('opacity', 0)
      .remove();
  // yh-text
  // yh-text-enter
  gtext.selectAll('text').data(data)
    .enter()
      .append('text')
      .attr('x', function (d) { return d.cx})
      .attr('y', function (d) { return d.cy})
      .attr('dy', 5)
      .text(function (d) { return d.v})
      .style('opacity', 0)
        .transition()
        .duration(delay)
      .style('opacity', 1);
  // yh-text-update
  gtext.selectAll('text').data(data)
        .transition()
        .duration(delay)
      .style('opacity', 1);
  // yh-text-exit
  gtext.selectAll('text').data(data)
    .exit()
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .style('opacity', 0)
      .remove();
}

function _draw_tofront () {
  var data = status.tofront.map(function (d,i) {
    return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
  })
  // tofront
  // tofront-enter
  ghigh.selectAll('circle').data(data)
    .enter()
      .append('circle')
      .attr('r', _r)
      .attr('cx', function (d) { return d.cx})
      .attr('cy', function (d) { return d.cy})
      .style('fill', 'transparent')
      .style('stroke', 'gray')
      .style('stroke-width', 5)
      .style('opacity', 0)
        .transition()
        .duration(delay)
      .style('opacity', 1);
  // tofront-update
  ghigh.selectAll('circle').data(data)
      .transition()
      .duration(delay)
    .attr('cx', function (d) { return d.cx})
    .attr('cy', function (d) { return d.cy})
    .style('opacity', 1);
  // tofront-exit
  ghigh.selectAll('circle').data(data)
    .exit()
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .style('opacity', 0)
      .remove();
}

function _init (_status, _delay) {
  status = _status;
  delay = _delay;
}

function render (status, delay) {
  _init(status, delay);
  _draw_circles();
  _draw_tofront();
}

function init () {
  N = this.props.others.N;
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
    .attr('transform', d3Transform().translate(300, 50).scale(1));

  this.gbase = this.g.append('g').attr('class', 'base');
  this.ghigh = this.g.append('g').attr('class', 'high');
  this.gtext = this.g.append('g').attr('class', 'text');

  gbase = this.gbase;
  gtext = this.gtext;
  ghigh = this.ghigh;
}

module.exports = {
  init: init,
  render: render
}
