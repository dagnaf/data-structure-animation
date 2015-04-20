var React = require('react');
var d3 = require('d3');
var d3Transform = require('d3-transform');

var N = 8;
var ir = 150;
var or = 200;
var angle = Math.PI*2/8;
function radiusMap(d) {
  return {
    startAngle:
  }
}
module.exports = React.createClass({
  _zoom: function () {
      this.svg.attr("transform", "translate("
          + d3.event.translate
          + ")scale(" + d3.event.scale + ")");
  },
  componentDidMount: function () {
    // this.transitions = [];
    var self = this;
    window.scene = this;
    this.svg = d3.select(this.getDOMNode()).append('svg')
      .call(
        d3.behavior.zoom()
          .scaleExtent([0.1,10])
          .on("zoom", self._zoom)
      ).append('g');
    this.g = this.svg.append('g')
      .attr('transform', d3Transform().translate(200, 200));

    this.gbase = this.g.append('g').attr('class', 'base');
    this.ghigh = this.g.append('g').attr('class', 'high');
    this.gtext = this.g.append('g').attr('class', 'text');

    // *queue
    var arc =
    this.gbase.append('path').attr('class', 'queue');
    this.gbase.select('path.queue')
      .transition()
      .duration(this.props.delay)
      .attrTween("d", function () {
        return d3.svg.arc()
        .innerRadius(ir)
        .outerRadius(or)
        .startAngle(0)
        .endAngle(d3.interpolate(0,Math.PI*2));
      });


    this.componentDidUpdate(this.props, this.props)
  },
  componentDidUpdate: function(prevProps, prevState) {
    // Delay changes, do nothing
    return;
    if (this.props.delay !== prevProps.delay) {
      return;
    }

    var status;
    var _delay;
    if (this.props.isPlaying && this.props.frame.next) {
      if (this.props.frame.next === undefined) return;
      status = this.props.frame.next.status;
      _delay = this.props.delay;
    } else {
      if (this.props.frame.current === undefined) return;
      status = this.props.frame.current.status;
      _delay = 15;
    }
    console.log('now stop at #',this.props.frame.current.id, status);

    {
        // enter: number of data
        // update: property of data: color,position,text,etc.
        // exit: number of data

        // *head
        // enter
        this.gbase.select('path.head')
          .data([status.head].map(toRadius))
            .append('path')
              .attr('class', 'head')
            .transition()
            .duration(_delay*0.75)
            .attrTween("d", function (d) {
              return d3.svg.arc()
                .innerRadius(ir)
                .outerRadius(or)
                .startAngle(d*angle)
                .endAngle(d3.interpolate(d*angle, (d+1)*angle))
            })
        // update
    }

  },
  render: function () {
    return (
      <div className="scene"></div>
    )
  }
});
