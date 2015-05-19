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
    DsaActions.runDemo('create', '1 1 2 3 5 8 13 21 34 55 89');
    DsaActions.runDemo('bsearch', 5, false);
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
          <input onChange={this._onChange} value={this.state.text} placeholder="数字"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'lsearch')} value="线性查找" title="线性查找"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'bsearch')} value="二分查找" title="二分查找"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'create')} value="新数组" title="新数组"/>
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
