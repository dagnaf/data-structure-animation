var React = require('react');
var DsaActions = require('../../actions/DsaActions');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '10',
      fn: 'x'
    }
  },
  render: function () {
    // TODO: input to be wrapped with div, then on focus or hover,
    // cmd-button(fake-input) should show under the input element
    return (
      <div className="list">
        <input onChange={this._onChange.bind(this,'text')} value={this.state.text} placeholder="数字"/>
        <input onChange={this._onChange.bind(this,'fn')} value={this.state.fn} placeholder="x的函数"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'search')} value="查找" title="查找"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'insert')} value="插入" title="插入"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'delete')} value="删除" title="删除"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'create', 'hc')} value="开地址散列" title="开地址散列"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'create', 'ho')} value="链地址散列" title="链地址散列"/>
      </div>
    );
  },
  _onChange: function (o, e) {
    var state = {};
    state[o] = e.target.value;
    this.setState(state);
  },
  _onClick: function (cmd, type) {
    if (cmd.indexOf('create') !== -1) {
      DsaActions.runDemo(cmd, {n: this.state.text, f: this.state.fn, t: type });
    } else {
      DsaActions.runDemo(cmd, this.state.text);
    }
  }
});
