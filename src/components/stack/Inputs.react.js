var React = require('react');
var DsaActions = require('../../actions/DsaActions');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: ''
    }
  },
  render: function () {
    // TODO: input to be wrapped with div, then on focus or hover,
    // cmd-button(fake-input) should show under the input element
    return (
      <div className="list">
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'init')} value="初始化"/>
        <input onChange={this._onChange} value={this.state.text} placeholder="整数"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'push')} value="入栈"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'pop')} value="出栈"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'peak')} value="栈顶"/>
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
