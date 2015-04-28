var React = require('react');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var N = 5;
var _ir = 150;
var _or = 200;
// var angle = Math.PI*2/8;
var _2pie = Math.PI*2;
function _xpie (x) {
  return _2pie*x/N;
}
var _highlight_color = 'deepskyblue';

var _arc = d3.svg.arc()
  .innerRadius(_ir)
  .outerRadius(_or);
var _arc_in = d3.svg.arc()
  .innerRadius(_ir-50)
  .outerRadius(_or-50);
var _arc_out = d3.svg.arc()
  .innerRadius(_ir+50)
  .outerRadius(_or+50);
function _angle(a,b) {
  if (b === undefined) b = a+1;
  return { startAngle: _xpie(a), endAngle: _xpie(b) };
}
function _radius(a,b) {
  if (b === undefined) b = a + 50;
  return { innerRadius: a, outerRadius: b };
}

module.exports = React.createClass({
  // _zoom: function () {
  //     this.svg.attr("transform", "translate("
  //         + d3.event.translate
  //         + ")scale(" + d3.event.scale + ")");
  // },
  _update_with_props: function (status, _delay) {
    this.gbase.selectAll('path.head')
      .data([status.head, status.tail])
        .enter()
          .append('path')
            .attr('class', 'head');
    this.gbase.selectAll('path.head')
      .data([status.head, status.tail])
        .transition()
        .duration(_delay*0.75)
        .style('fill', function (d, j) {
          return status.headtail ? _highlight_color : 'tomato';
        })
        .attrTween("d", function (d, j) {
          if (this.__prev__ === undefined) {
            var i = d3.interpolate(_radius(j?150:200), _radius(j?100:150));
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
                .innerRadius(j?100:150)
                .outerRadius(j?150:200)(i(t));
            }
          }
        });
    // head-text
    this.gtext.selectAll('text.head')
      .data([status.head, status.tail])
        .enter()
          .append('text')
            .attr('class', 'head')
            .attr('dy', 5)
            .attr('transform', d3Transform().translate(function (d, j) {
              return d3.svg.arc()
                .innerRadius(j?150:200)
                .outerRadius(j?200:250).centroid(_angle(d));
            }))
            .text(function (d, j) { return j?'队尾':'队首'})
    this.gtext.selectAll('text.head')
      .data([status.head, status.tail])
        .transition()
        .duration(_delay*0.75)
        .attr('transform', d3Transform().translate(function (d, j) {
          return d3.svg.arc()
                .innerRadius(j?100:150)
                .outerRadius(j?150:200).centroid(_angle(d, d+1));
        }))
    // item
    this.gbase.selectAll('path.item')
      .data(status.queue, function (d) { return d.i })
        .enter()
        .append('path')
          .attr('class', 'item')
    this.gbase.selectAll('path.item')
      .data(status.queue, function (d) { return d.i })
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .attrTween('d', function (d, j) {
          if (this.__prev__ === undefined) {
            var i = d3.interpolate(_radius(200), _radius(150));
            this.__prev__ = _angle(status.head+1+j);
            return function (t) {
              return d3.svg.arc()
                .startAngle(_xpie(status.head+1+j))
                .endAngle(_xpie(status.head+1+j+1))(i(t))
            }
          } else {
            var i = d3.interpolate(this.__prev__, _angle(status.head+1+j));
            this.__prev__ = _angle(status.head+1+j);
            return function (t) {
              return _arc(i(t));
            }
          }
        })
    this.gbase.selectAll('path.item')
      .data(status.queue, function (d) { return d.i })
        .exit()
          .style('opacity', 1)
          .transition()
          .duration(_delay*0.75)
          .style('opacity', 0)
          .remove()
    // item-text
    this.gtext.selectAll('text.item')
      .data(status.queue, function (d) { return d.i })
        .enter()
          .append('text')
            .attr('class', 'item')
            .attr('dy', 5)
            .text(function (d) { return d.v });
    this.gtext.selectAll('text.item')
      .data(status.queue, function (d) { return d.i })
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .attrTween('transform', function (d, j) {
          if (this.__prev__ === undefined) {
            var i = d3.interpolate(
              d3Transform().translate(_arc_out.centroid(_angle(status.head+1+j)))(),
              d3Transform().translate(_arc.centroid(_angle(status.head+1+j)))()
            );
            this.__prev__ = status.head+1+j;
          } else {
            var i = d3.interpolate(
              d3Transform().translate(_arc.centroid(_angle(this.__prev__)))(),
              d3Transform().translate(_arc.centroid(_angle(status.head+1+j)))()
            );
            this.__prev__ = status.head+1+j;
          }
          return function (t) {
            return i(t);
          }
        })
    this.gtext.selectAll('text.item')
      .data(status.queue, function (d) { return d.i })
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove()
    // toqueue
    this.gbase.selectAll('path.toque')
      .data(status.toque)
        .enter()
          .append('path')
            .attr('class', 'toque')
    this.gbase.selectAll('path.toque')
      .data(status.toque)
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
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
        })
    this.gbase.selectAll('path.toque')
      .data(status.toque)
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove();
    // toque-text
    this.gtext.selectAll('text.toque')
      .data(status.toque)
        .enter()
          .append('text')
            .attr('class', 'toque')
            .attr('dy', 5)
            .text(function (d) { return d;})
    this.gtext.selectAll('text.toque')
      .data(status.toque)
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .attrTween('transform', function (d, j) {
          if (this.__prev__ === undefined) {
            var i = d3.interpolate(
              d3Transform().translate(d3.svg.arc().innerRadius(250).outerRadius(300).centroid(_angle(status.tail)))(),
              d3Transform().translate(d3.svg.arc().innerRadius(200).outerRadius(250).centroid(_angle(status.tail)))()
            );
            this.__prev__ = status.tail;
          } else {
            var i = d3.interpolate(
              d3Transform().translate(_arc_out.centroid(_angle(this.__prev__)))(),
              d3Transform().translate(_arc_out.centroid(_angle(status.tail)))()
            );
            this.__prev__ = status.tail;
          }
          return function (t) {
            return i(t);
          }
        })
    this.gtext.selectAll('text.toque')
      .data(status.toque)
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove()


    // tofront
    this.gbase.selectAll('path.tofront')
      .data(status.tofront)
        .enter()
          .append('path')
            .attr('class', 'tofront')
    this.gbase.selectAll('path.tofront')
      .data(status.tofront)
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .attrTween('d', function (d, j) {
          if (this.__prev__ === undefined) {
            var i = d3.interpolate(_radius(150), _radius(200));
            this.__prev__ = _angle(status.head+1);
            return function (t) {
              return d3.svg.arc()
                .startAngle(_xpie(status.head+1))
                .endAngle(_xpie(status.head+1+1))(i(t))
            }
          } else {
            var i = d3.interpolate(this.__prev__, _angle(status.head+1));
            this.__prev__ = _angle(status.head+1);
            return function (t) {
              return d3.svg.arc()
                .innerRadius(200)
                .outerRadius(250)(i(t));
            }
          }
        })
    this.gbase.selectAll('path.tofront')
      .data(status.tofront)
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove();
    // tofront-text
    this.gtext.selectAll('text.tofront')
      .data(status.tofront)
        .enter()
          .append('text')
            .attr('class', 'tofront')
            .attr('dy', 5)
            .text(function (d) { return d;})
    this.gtext.selectAll('text.tofront')
      .data(status.tofront)
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .attrTween('transform', function (d, j) {
          if (this.__prev__ === undefined) {
            var i = d3.interpolate(
              d3Transform().translate(d3.svg.arc().innerRadius(150).outerRadius(200).centroid(_angle(status.head+1)))(),
              d3Transform().translate(d3.svg.arc().innerRadius(200).outerRadius(250).centroid(_angle(status.head+1)))()
            );
            this.__prev__ = status.head+1;
          } else {
            var i = d3.interpolate(
              d3Transform().translate(_arc_out.centroid(_angle(this.__prev__)))(),
              d3Transform().translate(_arc_out.centroid(_angle(status.head+1)))()
            );
            this.__prev__ = status.head+1;
          }
          return function (t) {
            return i(t);
          }
        })
    this.gtext.selectAll('text.tofront')
      .data(status.tofront)
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove();
  },
  componentDidMount: function () {
    // this.transitions = [];
    var self = this;
    window.scene = this;
    var zoom = d3.behavior.zoom()
      .scaleExtent([0.1,10])
      .on('zoom', function () {
        self.svg.attr("transform", d3Transform()
          .translate(d3.event.translate)
          .scale(d3.event.scale))
      });
    this.svg = d3.select(this.getDOMNode()).append('svg').call(zoom)
      .append('g');
    this.g = this.svg.append('g')
      .attr('transform', d3Transform().translate(300, 250).scale(1));

    this.gbase = this.g.append('g').attr('class', 'base');
    this.ghigh = this.g.append('g').attr('class', 'high');
    this.gtext = this.g.append('g').attr('class', 'text');

    N = this.props.others.N;

    // *queue
    this.gbase.append('path').attr('class', 'queue');
    this.gbase.select('path.queue')
      .transition()
      .duration(this.props.delay/3)
      .attrTween("d", function (d) {
        var i = d3.interpolate(_angle(0,0), _angle(0, N))
        return function (t) {
          return _arc(i(t))
        }
      });

    // this.componentDidUpdate(this.props, this.props)
    this._update_with_props(this.props.frame.current.status, 15);
  },
  componentDidUpdate: function(prevProps, prevState) {
    console.log('%cScene update\n'+JSON.stringify(prevProps)+'\n'+JSON.stringify(this.props), 'color:purple')
    if (this.props.delay !== prevProps.delay) {
      return;
    }
    if (this.props.isPlaying === true && this.props.frame.current.id === 0) {
      // this._update_with_props(this.props.frame.current.status, 15);
    }
    if (this.props.isPlaying && this.props.frame.next) {
      if (this.props.frame.next === undefined) return;
      this._update_with_props(this.props.frame.next.status, this.props.delay);
      console.log('%cSCENE playing '+this.props.frame.current.id+' to '+this.props.frame.next.id, 'color:purple');
    } else {
      if (this.props.frame.current === undefined) return;
      this._update_with_props(this.props.frame.current.status,15);
    }
    // console.log('SCENE UPDATE stopid #',this.props.frame.current.id, JSON.stringify(status));

  },
  render: function () {
    return (
      <div className="scene"></div>
    )
  }
});
