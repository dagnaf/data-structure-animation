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
        {x: 50, y: 300, fixed: true},
        {x: 200, y: 150, fixed: true},
        {x: 200, y: 300, fixed: true},
        {x: 350, y: 300, fixed: true},
        {x: 350, y: 150, fixed: true},
        {x: 500, y: 150, fixed: true},
        {x: 500, y: 300, fixed: true},
      ],
      edges: [
        {u: 0, v: 1},
        {u: 1, v: 2},
        {u: 2, v: 0},
        {u: 3, v: 1},
        {u: 3, v: 2},
        {u: 3, v: 4, reflexive: true},
        {u: 4, v: 5},
        {u: 5, v: 2},
        {u: 5, v: 6, reflexive: true},
        {u: 7, v: 6},
        {u: 7, v: 4},
      ],
      directional: true,
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
      x: this.state.text
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
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,false,false)} value="无向图" title="无向无权图" />
          <input className="cmd-button" readOnly={true} onClick={this._onConvert.bind(this,true,false)} value="有向图" title="有向无权图" />
          <input className="cmd-button" readOnly={true} onClick={Painter.clear} value="清空" title="清空" />
          <input className="cmd-button" readOnly={true} onClick={this._onPainting} value="完成" title="完成" />
        </div>
      )
    } else {
      return (
        <div>
          <input onChange={this._onChange.bind(this,'text')} value={this.state.text} placeholder="数字"/>
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this,'dfs')} value="深度优先搜索" title="深度优先搜索" />
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this,'bfs')} value="广度优先搜索" title="广度优先搜索" />
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this,'topo')} value="拓扑排序" title="拓扑排序" />
          <input className="cmd-button" readOnly={true} onClick={this._onClick.bind(this,'scctarjan')} value="强连通分量" title="强连通分量" />
          <input className="cmd-button" readOnly={true} onClick={this._onPainting} value="编辑图" title="编辑图" />
        </div>
      )
    }
  }
});
