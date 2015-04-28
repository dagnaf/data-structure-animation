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
  _update_with_props: function (status, _delay) {
    var _r = 30;
    console.log('yh', JSON.stringify(status.yh))
    console.log('yh', JSON.stringify(status.tofront))
    // yh
    // yh-enter
    this.gbase.selectAll('circle')
      .data(status.yh.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .enter()
          .append('circle')
          .attr('r', _r)
          .attr('cx', function (d) { return d.cx})
          .attr('cy', function (d) { return d.cy})
          .style('fill', 'coral')
          .style('opacity', 0)
          .transition()
          .duration(_delay*0.75)
          .style('opacity', 1);
    // yh-update
    this.gbase.selectAll('circle')
      .data(status.yh.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('fill', function (d, i) {
          return status.nums.some(function (v) {
            return v.i === i;
          }) ? _highlight_color : 'coral';
        });
    // yh-exit
    this.gbase.selectAll('circle')
      .data(status.yh.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove();
    // yh-text
    // yh-text-enter
    this.gtext.selectAll('text')
      .data(status.yh.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .enter()
          .append('text')
          .attr('x', function (d) { return d.cx})
          .attr('y', function (d) { return d.cy})
          .attr('dy', 5)
          .text(function (d) { return d.v})
          .style('opacity', 0)
          .transition()
          .duration(_delay*0.75)
          .style('opacity', 1);
    // yh-text-update
    this.gtext.selectAll('text')
      .data(status.yh.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 1);
    // yh-text-exit
    this.gtext.selectAll('text')
      .data(status.yh.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .exit()
        .style('opacity', 1)
        .transition()
        .duration(_delay*0.75)
        .style('opacity', 0)
        .remove();
    // tofront
    // tofront-enter
    this.ghigh.selectAll('circle')
      .data(status.tofront.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
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
          .duration(_delay*0.75)
          .style('opacity', 1);
    // tofront-update
    this.ghigh.selectAll('circle')
      .data(status.tofront.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
        .transition()
        .duration(_delay*0.75)
        .attr('cx', function (d) { return d.cx})
        .attr('cy', function (d) { return d.cy})
        .style('opacity', 1);
    // tofront-exit
    this.ghigh.selectAll('circle')
      .data(status.tofront.map(function (d,i) {
        return { cy: d.r*_r*Math.sqrt(3), cx: (d.c-(d.r+1)/2)*_r*2, v: d.v}
      }))
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
      .attr('transform', d3Transform().translate(300, 50).scale(1));

    this.gbase = this.g.append('g').attr('class', 'base');
    this.ghigh = this.g.append('g').attr('class', 'high');
    this.gtext = this.g.append('g').attr('class', 'text');

    N = this.props.others.N;

    // var drag = d3.behavior.drag()
    //     .on("dragstart", function () {
    //       d3.event.sourceEvent.stopPropagation();

    //     })
    //     .origin(function(d) {
    //       var t = d3.select(this);
    //       return {
    //         x: t.attr('x') + d3.transform(t.attr('transform')).translate[0],
    //         y: t.attr('y') + d3.transform(t.attr('transform')).translate[1],
    //       }
    //     })
    //     .on("drag", function (d) {
    //       d3.select(this).attr("transform", d3Transform().translate(function (d) {
    //         return [d3.event.x, d3.event.y];
    //       }));
    //     });
    // this.gtri = this.gbase.append('g').call(drag);

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
