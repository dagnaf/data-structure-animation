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
        {x: 50, y: 50, fixed: true},
        {x: 50, y: 250, fixed: true},
        {x: 150, y: 150, fixed: true},
        {x: 250, y: 250, fixed: true},
        {x: 150, y: 350, fixed: true},
        {x: 250, y: 450, fixed: true},
        {x: 350, y: 50, fixed: true},
        {x: 450, y: 350, fixed: true},
        {x: 450, y: 150, fixed: true},
      ],
      edges: [
        {u: 0, v: 1, w: 8},
        {u: 0, v: 2, w: 12},
        {u: 1, v: 2, w: 13},
        {u: 1, v: 3, w: 25},
        {u: 1, v: 4, w: 9},
        {u: 2, v: 3, w: 14},
        {u: 2, v: 6, w: 21},
        {u: 3, v: 4, w: 20},
        {u: 3, v: 5, w: 8},
        {u: 3, v: 6, w: 12},
        {u: 3, v: 7, w: 12},
        {u: 3, v: 8, w: 16},
        {u: 4, v: 5, w: 19},
        {u: 5, v: 7, w: 11},
        {u: 6, v: 8, w: 11},
        {u: 7, v: 8, w: 9},
      ],
      directional: false,
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
    this.setState({ painting: !this.state.painting, demo: "" });
  },
  _onClick: function (cmd) {
    this.setState({ demo: cmd});
    Renderer.clear();
    Renderer.init(Painter.raw());
    DsaActions.runDemo(cmd, {
      g: Painter.data(),
      x: this.state.text
    });
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
        {onClick: Painter.clear, value:"清空"},
        {onClick: this._onPainting, value:"完成"},
        {help: this.state.help, onClick: this._onHelp, value:"帮助"},
      ];
      return (
        <div>
          {inputs.map(function (d, i) {
            var classes = "input-group" + (d.value === self.state.graphType || d.help? " input-current" : "");
            return (
              <div key={i} className={classes}>
                <input className="input-button" readOnly={true} onClick={d.onClick} value={d.value} title={d.value} />
              </div>
            )
          })}
        </div>
      );
    } else {
      var inputs = [
        {button: {demo: "prim", onClick: this._onClick.bind(this,'prim'), value:"Prim最小生成树"}},
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
      )
    }
  }
});
