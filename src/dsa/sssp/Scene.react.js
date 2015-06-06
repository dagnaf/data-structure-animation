require("./Scene.react.less");
var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Painter = require("../common/painter.d3");
var Renderer = require('./Renderer.d3');
var Legend = require('./Legend.react');
var PainterLegend = require('../common/painter.react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      painting: false,
      loaded: false,
      text: '',
      demo: '',
      graphType: '有向图',
      help: true,
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
    var legend = this.state.painting ? (<PainterLegend show={this.state.help}/>) : (<Legend show={this.state.help}/>);
    return (
      <div className="wrapper-code">
        <div className="list">
          {this.getInputList()}
        </div>
        <div ref="svg" className="scene"/>
        {legend}
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
      src: this.state.text
    });
  },
  _onConvert: function (directional, weighted) {
    this.setState({graphType: directional ? "有向图" : "无向图"})
    Painter.convert(directional, weighted);
  },
  _onHelp: function () {
    this.setState({help: !this.state.help});
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
        {onClick: this._onConvert.bind(this,false,true), value:"无向图"},
        {onClick: this._onConvert.bind(this,true,true), value:"有向图"},
        {onClick: Painter.clear, value:"清空"},
        {onClick: this._onPainting, value:"完成"},
        {help: this.state.help, onClick: this._onHelp, value:"帮助"},
      ];
      return (
        <div>
          {inputs.map(function (d, i) {
            var classes = "input-group" + (d.value === self.state.graphType || d.help ? " input-current" : "");
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
        {button: {demo: "dijkstra", onClick: this._onClick.bind(this,'dijkstra'), value:"Dijkstra单源最短路径"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"源点"}]},
        {button: {demo: "", onClick: this._onPainting, value:"编辑图"}},
        {button: {help: this.state.help, onClick: this._onHelp, value:"帮助"}},
      ];
      return (
        <div>
          {inputs.map(function (d,i) {
            var classes = "input-group" + (d.button.demo === self.state.demo || d.button.help ? " input-current" : "");
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
      );
    }
  }
});
