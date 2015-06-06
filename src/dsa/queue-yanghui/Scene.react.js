var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '8',
      demo: 'yanghui'
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    DsaActions.runDemo('yanghui', 8, false);
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    return (
      <div className="wrapper-code">
        <div className="list">
          <div className={"input-group "+(this.state.demo === 'yanghui' ? 'input-current' : '')}>
            <input className="input-button" readOnly={true} onClick={this._onClick.bind(this, 'yanghui')} value="计算杨辉三角"/>
            <input className="input-item" onChange={this._onChange} value={this.state.text} placeholder="整数"/>
          </div>
        </div>
        <div ref="svg" className="scene"/>
      </div>
    );
  },
  _onChange: function (e) {
    this.setState({text: e.target.value});
  },
  _onClick: function (cmd) {
    DsaActions.runDemo(cmd, this.state.text);
  }
});
