var d3 = require('d3');
var d3Transform = require('d3-transform');

var gbase, gtext, ghigh;
var status, delay;

function _draw_stack_top () {
  gbase.selectAll('rect.stack-top').data([status.stack.length])
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
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [0, (5-d-1)*50]
          })
        );
  // update
  gbase.selectAll('rect.stack-top').data([status.stack.length])
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [0, (5-d-1)*50]
      })
    );
  // exit
  // *stack-top-text
  // enter
  gtext.selectAll('text.stack-top').data([status.stack.length])
    .enter()
      .append('text')
        .attr('class', 'stack-top')
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [50, -50+25+5]
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [50, (5-d-1)*50+25+5]
          })
        )
        .text(function () { return '栈顶'; });
  // update
  gtext.selectAll('text.stack-top').data([status.stack.length])
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        return [50, (5-d-1)*50+25+5]
      })
    );
  // exit
}

function _draw_items () {
  // *stack-item
  // enter
  gbase.selectAll('rect.item').data(status.stack)
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
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d,i) {
            return [0, (5-i-1)*50];
          })
        );
  // update
  gbase.selectAll('rect.item').data(status.stack)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d,i) {
        return [0, (5-i-1)*50];
      })
    );
  // exit
  gbase.selectAll('rect.item').data(status.stack)
    .exit()
        .transition()
        .duration(delay)
      .remove();
  // *stack-item-text
  // enter
  gtext.selectAll('text.item').data(status.stack)
    .enter()
      .append('text')
        .attr('class', 'item')
        .attr('transform',
          d3Transform().translate(function (d) {
            return [0+50, -2*50+25+5];
          })
        )
          .transition()
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d,i) {
            return [0+50, (5-i-1)*50+25+5];
          })
        )
        .text(function (d) { return d });
  // update
  gtext.selectAll('text.item').data(status.stack)
      .transition()
      .duration(delay)
    .attr('transform',
      d3Transform().translate(function (d,i) {
        return [0+50, (5-i-1)*50+25+5];
      })
    )
    .text(function (d) { return d });
  // exit
  gtext.selectAll('text.item').data(status.stack)
    .exit()
      .transition()
      .duration(delay)
    .remove();
}
function _draw_peak () {
  // *peak-item
  // enter
  gbase.selectAll('rect.peak').data(status.topeak)
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
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [0, -2*50];
          })
        );
  // udpate
  // exit
  gbase.selectAll('rect.peak').data(status.topeak)
    .exit()
        .transition()
        .duration(delay)
      .remove();
  // *peak-item-text
  // enter
  gtext.selectAll('text.peak').data(status.topeak)
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
          .duration(delay)
        .attr('transform',
          d3Transform().translate(function (d, i) {
            return [0+50, -2*50+25+5];
          })
        )
        .text(function (d) { return d; });
  // update
  gtext.selectAll('text.peak').data(status.topeak)
    .text(function (d) { return d; });
  // exit
  gtext.selectAll('text.peak').data(status.topeak)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_push () {
  // *push-item
  // enter
  gbase.selectAll('rect.push').data(status.topush)
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
          .duration(delay)
        .style('opacity', 1);
  // udpate
  // exit
  gbase.selectAll('rect.push').data(status.topush)
    .exit()
        .transition()
        .duration(delay)
      .remove();
  // *push-item-text
  // enter
  gtext.selectAll('text.push').data(status.topush)
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
          .duration(delay)
        .style('opacity', 1)
        .text(function (d) { return d; });
  // update
  gtext.selectAll('text.push').data(status.topush)
      .text(function (d) { return d; });
  // exit
  gtext.selectAll('text.push').data(status.topush)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _draw_stack_top_highlight () {
  // *stacktop
  // enter
  ghigh.selectAll('rect.stack-top-high').data(status.stacktop)
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
          .duration(delay)
        .style('opacity', 1);
  // update
  ghigh.selectAll('rect.stack-top-high').data(status.stacktop)
    .attr('transform',
      d3Transform().translate(function (d, i) {
        var j = status.stack.length;
        return [0, (5-j-1)*50];
      })
    )
  // exit
  ghigh.selectAll('rect.stack-top-high').data(status.stacktop)
    .exit()
        .transition()
        .duration(delay)
      .remove();
}

function _init (_status, _delay) {
  status = _status;
  delay = _delay;
}

function render (status, delay) {
  _init(status, delay);
  _draw_stack_top();
  _draw_items();
  _draw_peak();
  _draw_push();
  _draw_stack_top_highlight();
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
  this.g = this.svg.append('g')
    .attr('transform', d3Transform().translate(200, 200).scale(1));

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
      stack: [],
      topush: [],
      topeak: [],
      stacktop: []
    }, 10);
  }
}
