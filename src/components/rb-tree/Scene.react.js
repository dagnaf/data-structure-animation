// FIXME queue,queue-yanghui,stack,stack-eval
//   scene in these files should be rewrite like this one
//   Extract a more common interface for scene
//   And deal with drawings (enter/update/exit) in a module file
//   that is: enter.update.exit.js
var React = require('react');
var d3 = require('d3');
var d3Transform = require('d3-transform');
var renderer = require('./enter.update.exit');

module.exports = React.createClass({
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

    renderer.init.bind(this)();
    renderer.render(this.props.frame.current.status, 15);
  },
  componentDidUpdate: function(prevProps, prevState) {
    // FIXME circular object not jsonalbe
    //   need to find a way for debug status contents
    // console.log('%cScene update\n'+JSON.stringify(prevProps)+'\n'+JSON.stringify(this.props), 'color:purple')
    console.log('%cScene update\n', 'color:purple')
    if (this.props.delay !== prevProps.delay) {
      return;
    }
    if (this.props.isPlaying === true && this.props.frame.current.id === 0) {
      // this._update_with_props(this.props.frame.current.status, 15);
    }
    if (this.props.isPlaying && this.props.frame.next) {
      if (this.props.frame.next === undefined) return;
      renderer.render(this.props.frame.next.status, this.props.delay);
      console.log('%cSCENE playing '+this.props.frame.current.id+' to '+this.props.frame.next.id, 'color:purple');
    } else {
      if (this.props.frame.current === undefined) return;
      renderer.render(this.props.frame.current.status,15);
    }
    // console.log('SCENE UPDATE stopid #',this.props.frame.current.id, JSON.stringify(status));

  },
  render: function () {
    return (
      <div className="scene"></div>
    )
  }
});
