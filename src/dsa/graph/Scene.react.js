var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Painter = require("../common/painter");
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      painting: false
    }
  },
  componentDidMount: function () {
    Painter.init({
      container: this.refs.svg.getDOMNode(),
      offsetTop: document.querySelector('.dsa-app').offsetTop+55,
      offsetLeft: document.querySelector('.dsa-app').offsetLeft+80,
    });
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
          {this.getInputList()}
        </div>
        <div ref="svg" className="scene"/>
      </div>
    );
  },
  _onPainting: function () {
    if (this.state.painting) {
      Painter.stop();
    } else {
      DsaActions.pauseDemo();
      DsaActions.waitDemo();
      Painter.restart();
    }
    this.setState({ painting: !this.state.painting });
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
  },
  _onConvert: function (directional, weighted) {
    Painter.convert(directional, weighted);
  },
  getInputList: function () {
    if (this.state.painting) {
      return (
        <div>
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,false,false)} value="无向无权图" title="无向无权图" />
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,false,true)} value="无向带权图" title="无向带权图" />
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,true,false)} value="有向无权图" title="有向无权图" />
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,true,true)} value="有向带权图" title="有向带权图" />
          <input className="cmd-button" readOnly={true} onClick={this._onPainting} value="完成" title="完成" />
        </div>
      )
    } else {
      return (
        <input className="cmd-button" readOnly={true} onClick={this._onPainting} value="编辑" title="编辑" />
      )
    }
  }
});
