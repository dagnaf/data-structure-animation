var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh;
var status, delay;
var height = 600;
var width = 720;
var yScale = d3.scale.ordinal();//.rangeRoundBands([0, height], .08);
var xScale = d3.scale.ordinal();
var _marker_width = 3;
var _hl_color = 'deepskyblue';
var _x_items = 500;
var _x_key = 200;
var _w_items = 50;

function _color_item(d,j,i) {
  return status.ht.occupied[i] === 1 ? 'tomato' : (status.ht.occupied[i] === -1 ? _hl_color : 'coral')
}
function _stroke_item(d,j,i) {
  return (status.ptr.i === i && status.ptr.j === j) ? 'black' : 'none';
}
function _text_item(d,j,i) {
  return status.ht.occupied[i] === 1 ? d.d : (status.ht.occupied[i] === -1 ? 'X' : '');
}
function _draw_array() {
  gbase.selectAll('g.list').data(status.ht.table)
    .enter().append('g')
      .attr('class', 'list')
  gbase.selectAll('g.list').data(status.ht.table)
    .exit().remove();
  var lists = gbase.selectAll('g.list').data(status.ht.table);
  lists.selectAll('rect.item').data(function (d) { return d }, function (d) { return d.id })
    .enter().append('rect')
      .attr('class', 'item')
      .attr('x', function (d, j, i) { return _x_items + xScale(j) })
      .attr('y', function (d, j, i) { return yScale(i) })
      .attr('width', 0)
      .attr('height', yScale.rangeBand())
      .style('fill', _color_item)
      .style('stroke-width', 3)
  lists.selectAll('rect.item').data(function (d) { return d }, function (d) { return d.id })
    .transition()
    .duration(delay)
      .attr('x', function (d, j, i) { return _x_items + xScale(j) })
      .attr('y', function (d, j, i) { return yScale(i) })
      .attr('width', xScale.rangeBand())
      .attr('height', yScale.rangeBand())
      .style('fill', _color_item)
      .style('stroke', _stroke_item)
  lists.selectAll('rect.item').data(function (d) { return d }, function (d) { return d.id })
    .exit().remove();

  // text
  gtext.selectAll('g.list').data(status.ht.table)
    .enter().append('g')
      .attr('class', 'list')
  gtext.selectAll('g.list').data(status.ht.table)
    .exit().remove();
  var texts = gtext.selectAll('g.list').data(status.ht.table)
  texts.selectAll('text.item').data(function (d) { return d }, function (d) { return d.id })
    .enter().append('text')
      .attr('class', 'item')
      .attr('x', _x_items)
      .attr('y', function (d, j, i) { return yScale(i) + yScale.rangeBand()/2 + 5 })
      .style('fill',_color_item)
      .text(_text_item)
  texts.selectAll('text.item').data(function (d) { return d }, function (d) { return d.id })
    .transition()
    .duration(delay)
    .attr('x', function (d, j, i) { return _x_items + xScale(j) + xScale.rangeBand()/2 })
    .style('fill', _color_item)
    .text(_text_item)
  texts.selectAll('text.item').data(function (d) { return d }, function (d) { return d.id })
    .exit().remove();

  gtext.selectAll('text.num').data(status.ht.table)
    .enter().append('text')
      .attr('class', 'num')
      .attr('x', _x_items - 10)
      .attr('y', function (d,i) { return yScale(i) + yScale.rangeBand()/2 + 5})
      .style('fill', _color_item)
      .text(function (d,i) { return i })
  gtext.selectAll('text.num').data(status.ht.table)
    .transition()
    .duration(delay)
    .style('fill', _color_item)
    .text(function (d,i) { return i })
  gtext.selectAll('text.num').data(status.ht.table)
    .exit().remove();
}
function _u_array(i) {
  return i === undefined ? [] : [i];
}
function _draw_key() {
  function _color_key() {
    return status.r === undefined ? _hl_color : (status.r === -1 ? 'red' : 'green');
  }
  var data = _u_array(status.key);
  gbase.selectAll('rect.key').data(data)
    .enter().append('rect')
      .attr('class', 'key')
      .attr('x', _x_key)
      .attr('y', yScale(0))
      .attr('width', _w_items)
      .attr('height', yScale.rangeBand())
      .attr('fill', _color_key)
  gbase.selectAll('rect.key').data(data)
    .transition()
    .duration(delay)
    .attr('y', yScale(status.pos || 0))
    .attr('fill', _color_key)
  gbase.selectAll('rect.key').data(data)
    .exit().remove();

  // text
  gtext.selectAll('text.key').data(data)
    .enter().append('text')
      .attr('class', 'key')
      .attr('x', _x_key + _w_items/2)
      .attr('y', yScale(0) + yScale.rangeBand() / 2 + 5)
      .attr('fill', _color_key)
  gtext.selectAll('text.key').data(data)
    .transition()
    .duration(delay)
    .attr('y', yScale(status.pos || 0) + yScale.rangeBand() / 2 + 5)
    .attr('fill', _color_key)
    .text(function (d) { return d} );
  gtext.selectAll('text.key').data(data)
    .exit().remove();

  data = _u_array(status.pos);
  gbase.selectAll('line.key').data(data)
    .enter().append('line')
      .attr('class', 'key')
      .attr('x1', _x_key + _w_items + 10 )
      .attr('y1', function (d) { return yScale(d) + yScale.rangeBand() / 2 })
      .attr('x2', _x_key + _w_items + 10 )
      .attr('y2', function (d) { return yScale(d) + yScale.rangeBand() / 2 })
      .attr('marker-end', 'url(#arrow)')
      .style('stroke', _hl_color)
      .style('stroke-width', 10)
  gbase.selectAll('line.key').data(data)
      .transition()
      .duration(delay)
      .attr('y1', function (d) { return yScale(d) + yScale.rangeBand() / 2 })
      .attr('y2', function (d) { return yScale(d) + yScale.rangeBand() / 2 })
      .attr('x2', _x_items - 55)
  gbase.selectAll('line.key').data(data)
      .exit().remove();

  gtext.selectAll('text.hash').data(data)
    .enter().append('text')
      .attr('class', 'hash')
      .attr('x', (_x_items - 55 + _x_key + _w_items + 10)/2 )
      .attr('y', function (d) { return yScale(d) + yScale.rangeBand() / 2 +5})
      .style('fill', _hl_color)
      .text('hash(x) = '+status.ht.fn+ ' % ' + status.ht.n)
  gtext.selectAll('text.hash').data(data)
      .transition()
      .duration(delay)
      .attr('y', function (d) { return yScale(d) + yScale.rangeBand() / 2 +5})
      .text('hash(x) = '+status.ht.fn+ ' % ' + status.ht.n)
  gtext.selectAll('text.hash').data(data)
      .exit().remove();
}

function _process_data() {
  yScale.rangeRoundBands([0, height/10*status.ht.n], .2).domain(d3.range(status.ht.n));
  var m = d3.max(status.ht.table, function (d) { return d.length })+1;
  xScale.rangeRoundBands([0, height/10*m], .08).domain(d3.range(m));
  _w_items = xScale.rangeBand();
}

function _init(_status, _delay) {
  status = _status;
  delay = _delay;
}


function render(status, delay) {
  _init(status, delay);
  _process_data();
  _draw_key();
  _draw_array();
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

  var defs = this.svg.append('defs').selectAll('marker').data([1]).enter()
    .append('marker')
      .attr('id', 'arrow' )
      .attr('viewBox', '-5 -5 10 10')
      .attr('markerWidth', _marker_width)
      .attr('markerHeight', _marker_width)
      .attr('orient', 'auto')
      .attr('refX', -5)
    .append('path')
      .attr('d', 'M-5,-5L5,0L-5,5')
      .attr('opacity', 0.5)
      .attr('fill', function (d,i) { return _hl_color })

  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(-140, 10).scale(0.8));

  gbase = this.g.append('g').attr('class', 'base');
  ghigh = this.g.append('g').attr('class', 'high');
  gtext = this.g.append('g').attr('class', 'text');

}

module.exports = {
  init: init,
  render: render
};
