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
        <input onChange={this._onChange} value={this.state.text} placeholder="整数"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'insert')} value="插入"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'delete')} value="删除"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'search')} value="查找"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'inorder')} value="查找"/>
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
