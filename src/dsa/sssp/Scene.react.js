require("./Scene.react.less");
var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Painter = require("../common/painter.d3");
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      painting: false,
      loaded: false,
      text: ''
    }
  },
  componentDidMount: function () {
    Painter.init({
      container: this.refs.svg.getDOMNode(),
      offsetTop: document.querySelector('.dsa-app').offsetTop+55,
      offsetLeft: document.querySelector('.dsa-app').offsetLeft+80,
      _onLoad: this._onLoad,
      nodes: [
        {x: 50, y: 150, fixed: true},
        {x: 150, y: 250, fixed: true},
        {x: 150, y: 50, fixed: true},
        {x: 300, y: 250, fixed: true},
        {x: 300, y: 50, fixed: true},
      ],
      edges: [
        {u: 0, v: 1, w: 5},
        {u: 0, v: 2, w: 3},
        {u: 1, v: 2, w: 1},
        {u: 1, v: 3, w: 6},
        {u: 1, v: 4, w: 4},
        {u: 2, v: 1, w: 2},
        {u: 2, v: 4, w: 6},
        {u: 3, v: 0, w: 3},
        {u: 3, v: 4, w: 7},
        {u: 4, v: 3, w: 2},
      ],
      directional: true,
      weighted: true,
      nowait: true
    });
    Renderer.init(Painter.raw());
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    if (this.props.frame) {
      Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
    }
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
  _onLoad: function () {
    this.setState({ loaded: true });
  },
  _onPainting: function () {
    if (this.state.painting) {
      Painter.stop();
    } else {
      Renderer.clear();
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
  _onClick: function (cmd) {
    Renderer.clear();
    Renderer.init(Painter.raw());
    DsaActions.runDemo(cmd, {
      g: Painter.data(),
      src: this.state.text
    });
  },
  _onConvert: function (directional, weighted) {
    Painter.convert(directional, weighted);
  },
  getInputList: function () {
    if (this.state.loaded === false) {
      return (
        <input className="cmd-button" readOnly={true} value="加载中" title="加载中" />
      );
    }
    if (this.state.painting) {
      return (
        <div>
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,false,true)} value="无向图" title="无向带权图" />
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,true,true)} value="有向图" title="有向带权图" />
          <input className="cmd-button" readOnly={true} onClick={Painter.clear} value="清空" title="清空" />
          <input className="cmd-button" readOnly={true} onClick={this._onPainting} value="完成" title="完成" />
        </div>
      )
    } else {
      return (
        <div>
          <input onChange={this._onChange.bind(this,'text')} value={this.state.text} placeholder="源点"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this,'dijkstra')} value="Dijkstra单源最短路径" title="Dijkstra单源最短路径" />
          <input className="cmd-button" readOnly={true} onClick={this._onPainting} value="编辑图" title="编辑图" />
        </div>
      )
    }
  }
});
