var React = require('react');
var DsaActions = require('../../actions/DsaActions');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '1*(2+3)'
    }
  },
  render: function () {
    // TODO: input to be wrapped with div, then on focus or hover,
    // cmd-button(fake-input) should show under the input element
    return (
      <div className="list">
        <input onChange={this._onChange} value={this.state.text} placeholder="表达式"/>
        <input className="cmd-button" disabled onClick={this._onClick.bind(this, 'eval')} value="计算"/>
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
