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
    var n = 11;
    var array = [];
    for (var i = 0; i < n; ++i) {
      array.push(Math.ceil(Math.random()*100))
    }
    DsaActions.runDemo('qsort', array.join(' '), false);
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
          <input onChange={this._onChange} value={this.state.text} placeholder="数组"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'msort')} value="归并排序" title="归并排序"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this, 'qsort')} value="快速排序" title="快速排序"/>
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
