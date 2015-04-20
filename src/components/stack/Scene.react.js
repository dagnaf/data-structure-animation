var React = require('react');
var d3 = require('d3');
var d3Transform = require('d3-transform');

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

    // *stack
    this.gbase.append('rect')
      .attr('class', 'stack')
      .attr('width', 100)
      .attr('height', 5*50)
      .attr('transform',d3Transform().translate(function (d,i) {
        return [0, -5*50];
      }))
      .transition()
        .duration(this.props.delay*0.75)
      .attr('transform',d3Transform().translate(function (d, i) {
          return [0, 0];
      }));
    this.componentDidUpdate(this.props, this.props)
  },
  componentDidUpdate: function(prevProps, prevState) {
    // Delay changes, do nothing
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

        // *stack-top
        // enter
        this.gbase.selectAll('rect.stack-top')
          .data([status.stack.length])
            .enter()
              .append('rect')
                .attr('class', 'stack-top')
                .attr('width', 100)
                .attr('height', 50)
                .attr('transform',
                  d3Transform().translate(function () {
                    return [0, -50]
                  })
                )
                .transition()
                .duration(_delay*0.75)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [0, (5-d-1)*50]
                  })
                );
        // update
        this.gbase.selectAll('rect.stack-top')
          .data([status.stack.length])
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [0, (5-d-1)*50]
              })
            );
        // exit
        // *stack-top-text
        // enter
        this.gtext.selectAll('text.stack-top')
          .data([status.stack.length])
            .enter()
              .append('text')
                .attr('class', 'stack-top')
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [50, -50+25+5]
                  })
                )
                .transition()
                .duration(_delay*0.75)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [50, (5-d-1)*50+25+5]
                  })
                )
                .text(function () { return '栈顶'; });
        // update
        this.gtext.selectAll('text.stack-top')
          .data([status.stack.length])
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                return [50, (5-d-1)*50+25+5]
              })
            );
        // exit
        // *stack-item
        // enter
        this.gbase.selectAll('rect.item')
          .data(status.stack)
            .enter()
              .append('rect')
                .attr('class', 'item')
                .attr('width', 100)
                .attr('height', 50)
                .attr('transform',
                  d3Transform().translate(function (d) {
                    return [0, -2*50];
                  })
                )
                .transition()
                .duration(_delay*0.75)
                .attr('transform',
                  d3Transform().translate(function (d,i) {
                    return [0, (5-i-1)*50];
                  })
                );
        // update
        this.gbase.selectAll('rect.item')
          .data(status.stack)
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d,i) {
                return [0, (5-i-1)*50];
              })
            );
        // exit
        this.gbase.selectAll('rect.item')
          .data(status.stack)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
        // *stack-item-text
        // enter
        this.gtext.selectAll('text.item')
          .data(status.stack)
            .enter()
              .append('text')
                .attr('class', 'item')
                .attr('transform',
                  d3Transform().translate(function (d) {
                    return [0+50, -2*50+25+5];
                  })
                )
                .transition()
                .duration(_delay*0.75)
                .attr('transform',
                  d3Transform().translate(function (d,i) {
                    return [0+50, (5-i-1)*50+25+5];
                  })
                )
                .text(function (d) { return d });
        // update
        this.gtext.selectAll('text.item')
          .data(status.stack)
            .transition()
            .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d,i) {
                return [0+50, (5-i-1)*50+25+5];
              })
            )
            .text(function (d) { return d });
        // exit
        this.gtext.selectAll('text.item')
          .data(status.stack)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
        // *peak-item
        // enter
        this.gbase.selectAll('rect.peak')
          .data(status.topeak)
            .enter()
              .append('rect')
                .attr('class', 'peak')
                .attr('width', 100)
                .attr('height', 50)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    var j = status.stack.length-1;
                    return [0, (5-j-1)*50];
                  })
                )
                .transition()
                .duration(_delay*0.75)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [0, -2*50];
                  })
                );
        // udpate
        // exit
        this.gbase.selectAll('rect.peak')
          .data(status.topeak)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
        // *peak-item-text
        // enter
        this.gtext.selectAll('text.peak')
          .data(status.topeak)
            .enter()
              .append('text')
                .attr('class', 'peak')
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    var j = status.stack.length-1;
                    return [0+50, (5-j-1)*50+25+5];
                  })
                )
                .transition()
                .duration(_delay*0.75)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [0+50, -2*50+25+5];
                  })
                )
                .text(function (d) { return d; });
        // update
        this.gtext.selectAll('text.peak')
          .data(status.topeak)
            .text(function (d) { return d; });
        // exit
        this.gtext.selectAll('text.peak')
          .data(status.topeak)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
        // *push-item
        // enter
        this.gbase.selectAll('rect.push')
          .data(status.topush)
            .enter()
              .append('rect')
                .attr('class', 'push')
                .attr('width', 100)
                .attr('height', 50)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [0, -2*50];
                  })
                )
                .style('opacity', 0)
                .transition()
                .duration(_delay*0.75)
                .style('opacity', 1);
        // udpate
        // exit
        this.gbase.selectAll('rect.push')
          .data(status.topush)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
        // *push-item-text
        // enter
        this.gtext.selectAll('text.push')
          .data(status.topush)
            .enter()
              .append('text')
                .attr('class', 'push')
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    return [0+50, -2*50+25+5];
                  })
                )
                .style('opacity', 0)
                .transition()
                .duration(_delay*0.75)
                .style('opacity', 1)
                .text(function (d) { return d; });
        // update
        this.gtext.selectAll('text.push')
          .data(status.topush)
            .text(function (d) { return d; });
        // exit
        this.gtext.selectAll('text.push')
          .data(status.topush)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
        // *stacktop
        // enter
        this.ghigh.selectAll('rect.stack-top-high')
          .data(status.stacktop)
            .enter()
              .append('rect')
                .attr('class', 'stack-top-high')
                .attr('width', 100)
                .attr('height', 50)
                .attr('transform',
                  d3Transform().translate(function (d, i) {
                    var j = status.stack.length;
                    return [0, (5-j-1)*50];
                  })
                )
                .style('opacity', 0)
                .transition()
                .duration(_delay*0.75)
                .style('opacity', 1);
        // update
        this.ghigh.selectAll('rect.stack-top-high')
          .data(status.stacktop)
            // .transition()
            // .duration(_delay*0.75)
            .attr('transform',
              d3Transform().translate(function (d, i) {
                var j = status.stack.length;
                return [0, (5-j-1)*50];
              })
            )
        // exit
        this.ghigh.selectAll('rect.stack-top-high')
          .data(status.stacktop)
            .exit()
            .transition()
            .duration(_delay*0.75)
            .remove();
    }
  },
  render: function () {
    return (
      <div className="scene"></div>
    )
  }
});
