var React = require('react');
var DsaActions = require('../actions/DsaActions');

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
        <input onChange={this._onChange} value={this.state.text} placeholder="eval"/>
        <input className="cmd-button" disabled onClick={this._onClick} value="运行"/>
      </div>
    );
  },
  _onChange: function (e) {
    this.setState({text: e.target.value});
  },
  _onClick: function () {
    DsaActions.runDemo(this.state.text);
  }
});
