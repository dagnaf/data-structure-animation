var React = require('react');
var Renderer = require('../routers/require-dsa').required.renderer;
var Input = require('../routers/require-dsa').required.input;

module.exports = React.createClass({
  componentDidMount: function () {
    Renderer.init.bind(this)();
    Renderer.render(this.props.frame.current.status, 15);
  },
  componentDidUpdate: function(prevProps, prevState) {
    // FIXME circular object not jsonalbe
    //   need to find a way for debug status contents
    // console.log('%cScene update\n'+JSON.stringify(prevProps)+'\n'+JSON.stringify(this.props), 'color:purple')
    console.log('%cScene update\n', 'color:purple')
    if (this.props.delay !== prevProps.delay) {
      return;
    }
    if (this.props.isPlaying && this.props.frame.next) {
      if (this.props.frame.next === undefined) return;
      Renderer.render(this.props.frame.next.status, this.props.delay*0.75);
      console.log('%cSCENE playing '+this.props.frame.current.id+' to '+this.props.frame.next.id, 'color:purple');
    } else {
      if (this.props.frame.current === undefined) return;
      Renderer.render(this.props.frame.current.status,15);
    }
  },
  render: function () {
    return (
      <div className="wrapper-code">
        <Input />
        <div ref="svg" className="scene"/>
      </div>
    )
  }
});
