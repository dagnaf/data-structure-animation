var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: ''
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    DsaActions.runDemo('insert', 10);
    DsaActions.runDemo('insert', 1);
    DsaActions.runDemo('insert', 2);
    DsaActions.runDemo('insert', 3);
    DsaActions.runDemo('insert', 4);
    DsaActions.runDemo('insert', 5, false);
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    // TODO: input to be wrapped with div, then on focus or hover,
    // cmd-button(fake-input) should show under the input element
    return (
      <div className="wrapper-code">
        <div className="list">
          <input onChange={this._onChange} value={this.state.text} placeholder="整数"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'insert')} value="插入"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'delete')} value="删除"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'search')} value="查找"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'inorder')} value="中序遍历"/>
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
