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
    DsaActions.runDemo('create', 'Huffman Tree', false);
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
          <input onChange={this._onChange} value={this.state.text} placeholder="字符串"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'create')} value="编码" title="编码"/>
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
