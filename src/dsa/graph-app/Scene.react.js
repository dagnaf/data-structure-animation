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
      text: '',
      graphType: '有向图',
      demo: ''
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
    this.setState({ painting: !this.state.painting,demo: "" });
  },
  _onChange: function (o, e) {
    var state = {};
    state[o] = e.target.value;
    this.setState(state);
  },
  _onClick: function (cmd) {
    this.setState({demo: cmd});
    Renderer.clear();
    Renderer.init(Painter.raw());
    DsaActions.runDemo(cmd, {
      g: Painter.data(),
      x: this.state.text
    });
  },
  _onConvert: function (directional, weighted) {
    this.setState({graphType: directional ? "有向图" : "无向图"})
    Painter.convert(directional, weighted);
  },
  getInputList: function () {
    if (this.state.loaded === false) {
      return (
        <input className="input-button" readOnly={true} value="加载中" title="加载中" />
      );
    }
    var self = this;
    if (this.state.painting) {
      var inputs = [
        {onClick: this._onConvert.bind(this,false,false), value:"无向图"},
        {onClick: this._onConvert.bind(this,true,false), value:"有向图"},
        {onClick: Painter.clear, value:"清空"},
        {onClick: this._onPainting, value:"完成"},
      ];
      return (
        <div>
          {inputs.map(function (d, i) {
            var classes = "input-group" + (d.value === self.state.graphType ? " input-current" : "");
            return (
              <div key={i} className={classes}>
                <input className="input-button" readOnly={true} onClick={d.onClick} value={d.value} title={d.value} />
              </div>
            )
          })}
        </div>
      )
    } else {
      var inputs = [
        {button: {demo: "dfs", onClick: this._onClick.bind(this,'dfs'), value:"深度优先搜索"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"数字"}]},
        {button: {demo: "bfs", onClick: this._onClick.bind(this,'bfs'), value:"广度优先搜索"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"数字"}]},
        {button: {demo: "topo", onClick: this._onClick.bind(this,'topo'), value:"拓扑排序"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"数字"}]},
        {button: {demo: "scctarjan", onClick: this._onClick.bind(this,'scctarjan'), value:"强连通分量"}},
        {button: {demo: "", onClick: this._onPainting, value:"编辑图"}},
      ];
      return (
        <div>
          {inputs.map(function (d,i) {
            var classes = "input-group" + (d.button.demo === self.state.demo ? " input-current" : "");
            var items = d.items ? d.items : [];
            return (
              <div key={i} className={classes}>
                <input className="input-button" readOnly={true} onClick={d.button.onClick} value={d.button.value} title={d.button.value} />
                <div>
                  {items.map(function (dd, ii) {
                    return (
                      <input key={ii} className="input-item" onChange={dd.onChange} value={dd.value} title={dd.value} placeholder={dd.placeholder} />
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )
    }
  }
});
