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
        <input onChange={this._onChange} value={this.state.text} placeholder="数组"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'msort')} value="归并排序" title="归并排序"/>
        <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'qsort')} value="快速排序" title="快速排序"/>
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
