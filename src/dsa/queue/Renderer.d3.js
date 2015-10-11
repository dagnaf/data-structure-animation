var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh, status, delay;
var status, delay;

var N;

var _ir = 150;
var _or = 200;
var _2pie = Math.PI*2;
var _highlight_color = 'deepskyblue';

function _arc(offset) {
  offset = (offset || 0);
  return d3.svg.arc()
    .innerRadius(_ir+offset)
    .outerRadius(_or+offset);
}

function _xpie (x) {
  return _2pie*x/N;
}
function _angle(a,b) {
  if (b === undefined) b = a+1;
  return { startAngle: _xpie(a), endAngle: _xpie(b) };
}
function _radius(a,b) {
  if (b === undefined) b = a + 50;
  return { innerRadius: a, outerRadius: b };
}

function _draw_head_tail () {
  var data = [status.head, status.tail];
  gbase.selectAll('path.head').data(data)
    .enter()
      .append('path')
        .attr('class', 'head');
  gbase.selectAll('path.head').data(data)
      .transition()
      .duration(delay)
    .style('fill', function (d, j) {
      return status.headtail ? _highlight_color : 'tomato';
    })
    .attrTween("d", function (d, j) {
      if (this.__prev__ === undefined) {
        // var i = d3.interpolate(_radius(j?150:200), _radius(j?100:150));
        var i = d3.interpolate(_radius(j?150:100,150), _radius(j?100:50,150));
        this.__prev__ = _angle(d);
        return function (t) {
          return d3.svg.arc()
            .startAngle(_xpie(d))
            .endAngle(_xpie(d+1))(i(t))
        }
      } else {
        var i = d3.interpolate(this.__prev__, _angle(d));
        this.__prev__ = _angle(d);
        return function (t) {
          return d3.svg.arc()
            // .innerRadius(j?100:150)
            .innerRadius(j?100:50)
            // .outerRadius(j?150:200)(i(t));
            .outerRadius(j?150:150)(i(t));
        }
      }
    });
  // text
  gtext.selectAll('text.head').data(data)
    .enter()
      .append('text')
        .attr('class', 'head')
        .attr('dy', 5)
        .attr('transform', d3Transform().translate(function (d, j) {
          return d3.svg.arc()
            // .innerRadius(j?150:200)
            .innerRadius(j?150:100,150)
            // .outerRadius(j?200:250).centroid(_angle(d));
            .outerRadius(j?200:150,150).centroid(_angle(d));
        }))
        .text(function (d, j) { return j ?'队尾':'队首'})
  gtext.selectAll('text.head').data(data)
      .transition()
      .duration(delay)
    .attr('transform', d3Transform().translate(function (d, j) {
      return d3.svg.arc()
            // .innerRadius(j?100:150)
            .innerRadius(j?100:50,150)
            // .outerRadius(j?150:200).centroid(_angle(d, d+1));
            .outerRadius(j?150:100,150).centroid(_angle(d, d+1));
    }));
}

function _draw_items () {
  var data = status.queue;
  var fnid = function (d) { return d.i }
    gbase.selectAll('path.item').data(data, fnid)
      .enter()
        .append('path')
          .attr('class', 'item');
    gbase.selectAll('path.item').data(data, fnid)
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .attrTween('d', function (d, j) {
        if (this.__prev__ === undefined) {
          var i = d3.interpolate(_radius(200), _radius(150));
          this.__prev__ = _angle(status.head+1-1+j);
          return function (t) {
            return d3.svg.arc()
              .startAngle(_xpie(status.head+1-1+j))
              .endAngle(_xpie(status.head+1-1+j+1))(i(t))
          }
        } else {
          var i = d3.interpolate(this.__prev__, _angle(status.head+1-1+j));
          this.__prev__ = _angle(status.head+1-1+j);
          return function (t) {
            return _arc()(i(t));
          }
        }
      });
    gbase.selectAll('path.item').data(data, fnid)
      .exit()
        .style('opacity', 1)
          .transition()
          .duration(delay)
        .style('opacity', 0)
        .remove();
    // item-text
    gtext.selectAll('text.item').data(data, fnid)
      .enter()
        .append('text')
          .attr('class', 'item')
          .attr('dy', 5)
          .text(function (d) { return d.v });
    gtext.selectAll('text.item').data(data, fnid)
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .attrTween('transform', function (d, j) {
        if (this.__prev__ === undefined) {
          var i = d3.interpolate(
            d3Transform().translate(_arc(50).centroid(_angle(status.head+1-1+j)))(),
            d3Transform().translate(_arc().centroid(_angle(status.head+1-1+j)))()
          );
          this.__prev__ = status.head+1-1+j;
        } else {
          var i = d3.interpolate(
            d3Transform().translate(_arc().centroid(_angle(this.__prev__)))(),
            d3Transform().translate(_arc().centroid(_angle(status.head+1-1+j)))()
          );
          this.__prev__ = status.head+1-1+j;
        }
        return function (t) {
          return i(t);
        }
      });
    gtext.selectAll('text.item').data(data, fnid)
      .exit()
        .style('opacity', 1)
          .transition()
          .duration(delay)
        .style('opacity', 0)
        .remove()
}

function _draw_toqueue () {
    gbase.selectAll('path.toque').data(status.toque)
      .enter()
        .append('path')
          .attr('class', 'toque')
    gbase.selectAll('path.toque').data(status.toque)
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .attrTween('d', function (d, j) {
        if (this.__prev__ === undefined) {
          var i = d3.interpolate(_radius(250), _radius(200));
          this.__prev__ = _angle(status.tail);
          return function (t) {
            return d3.svg.arc()
              .startAngle(_xpie(status.tail))
              .endAngle(_xpie(status.tail+1))(i(t))
          }
        } else {
          var i = d3.interpolate(this.__prev__, _angle(status.tail));
          this.__prev__ = _angle(status.tail);
          return function (t) {
            return d3.svg.arc()
              .innerRadius(200)
              .outerRadius(250)(i(t));
          }
        }
      });
    gbase.selectAll('path.toque').data(status.toque)
      .exit()
        .style('opacity', 1)
          .transition()
          .duration(delay)
        .style('opacity', 0)
        .remove();
    // toque-text
    gtext.selectAll('text.toque').data(status.toque)
      .enter()
        .append('text')
          .attr('class', 'toque')
          .attr('dy', 5)
          .text(function (d) { return d;});
    gtext.selectAll('text.toque').data(status.toque)
      .style('opacity', 1)
        .transition()
        .duration(delay)
      .attrTween('transform', function (d, j) {
        if (this.__prev__ === undefined) {
          var i = d3.interpolate(
            d3Transform().translate(d3.svg.arc().innerRadius(250).outerRadius(300).centroid(_angle(status.tail)))(),
            d3Transform().translate(d3.svg.arc().innerRadius(200).outerRadius(250).centroid(_angle(status.tail)))()
          );
          this.__prev__ = status.tail;
        } else {
          var i = d3.interpolate(
            d3Transform().translate(_arc(50).centroid(_angle(this.__prev__)))(),
            d3Transform().translate(_arc(50).centroid(_angle(status.tail)))()
          );
          this.__prev__ = status.tail;
        }
        return function (t) {
          return i(t);
        }
      });
    gtext.selectAll('text.toque').data(status.toque)
      .exit()
        .style('opacity', 1)
        .transition()
        .duration(delay)
        .style('opacity', 0)
        .remove();
}
function _draw_tofont () {
  gbase.selectAll('path.tofront').data(status.tofront)
    .enter()
      .append('path')
        .attr('class', 'tofront')
  gbase.selectAll('path.tofront').data(status.tofront)
    .style('opacity', 1)
      .transition()
      .duration(delay)
    .attrTween('d', function (d, j) {
      if (this.__prev__ === undefined) {
        var i = d3.interpolate(_radius(150), _radius(0));
        // this.__prev__ = _angle(status.head+1);
        this.__prev__ = _angle(status.head);
        return function (t) {
          return d3.svg.arc()
            // .startAngle(_xpie(status.head+1))
            .startAngle(_xpie(status.head))
            // .endAngle(_xpie(status.head+1-1+1))(i(t))
            .endAngle(_xpie(status.head+1))(i(t))
        }
      } else {
        var i = d3.interpolate(this.__prev__, _angle(status.head));
        // var i = d3.interpolate(this.__prev__, _angle(status.head+1));
        // this.__prev__ = _angle(status.head+1);
        this.__prev__ = _angle(status.head);
        return function (t) {
          return d3.svg.arc()
            .innerRadius(0)
            .outerRadius(50)(i(t));
        }
      }
    });
  gbase.selectAll('path.tofront').data(status.tofront)
    .exit()
      .style('opacity', 1)
      .transition()
      .duration(delay)
      .style('opacity', 0)
      .remove();
  // tofront-text
  gtext.selectAll('text.tofront').data(status.tofront)
    .enter()
      .append('text')
        .attr('class', 'tofront')
        .attr('dy', 5)
        .text(function (d) { return d;})
  gtext.selectAll('text.tofront').data(status.tofront)
    .style('opacity', 1)
      .transition()
      .duration(delay)
    .attrTween('transform', function (d, j) {
      if (this.__prev__ === undefined) {
        var i = d3.interpolate(
          d3Transform().translate(d3.svg.arc().innerRadius(150).outerRadius(200).centroid(_angle(status.head)))(),
          d3Transform().translate(d3.svg.arc().innerRadius(0).outerRadius(50).centroid(_angle(status.head)))()
        );
        this.__prev__ = status.head;
      } else {
        var i = d3.interpolate(
          d3Transform().translate(_arc(-150).centroid(_angle(this.__prev__)))(),
          d3Transform().translate(_arc(-150).centroid(_angle(status.head)))()
        );
        this.__prev__ = status.head;
      }
      return function (t) {
        return i(t);
      }
    });
  gtext.selectAll('text.tofront').data(status.tofront)
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
  _draw_head_tail();
  _draw_items();
  _draw_toqueue();
  _draw_tofont();
}

function init () {
  // N = this.props.others.N;
  N = 8;
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
    .attr('transform', d3Transform().translate(300, 250).scale(1));

  this.gbase = this.g.append('g').attr('class', 'base');
  this.ghigh = this.g.append('g').attr('class', 'high');
  this.gtext = this.g.append('g').attr('class', 'text');

  this.gbase.append('path').attr('class', 'queue');
  this.gbase.select('path.queue')
    .transition()
    .duration(this.props.delay/3)
    .attrTween("d", function (d) {
      var i = d3.interpolate(_angle(0,0), _angle(0, N))
      return function (t) {
        return _arc()(i(t))
      }
    });

  gbase = this.gbase;
  gtext = this.gtext;
  ghigh = this.ghigh;
}

module.exports = {
  init: init,
  render: render,
  clear: function () {
    //FIXME
    render({
      queue: [],
      tofront: [],
      toque: [],
      headtail: 0,
      head: 0,
      tail: 0
    }, 10);
  }
}
