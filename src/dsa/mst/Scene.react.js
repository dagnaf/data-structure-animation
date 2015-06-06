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
      demo: '',
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
    // TODO: input to be wrapped with div, then on focus or hover,
    // input-button(fake-input) should show under the input element
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
    this.setState({ painting: !this.state.painting, demo: "" });
  },
  // _onChange: function (o, e) {
  //   var state = {};
  //   state[o] = e.target.value;
  //   this.setState(state);
  // },
  _onClick: function (cmd) {
    this.setState({ demo: cmd});
    Renderer.clear();
    Renderer.init(Painter.raw());
    DsaActions.runDemo(cmd, {
      g: Painter.data(),
      x: this.state.text
    });
  },
  // _onConvert: function (directional, weighted) {
  //   Painter.convert(directional, weighted);
  // },
  getInputList: function () {
    if (this.state.loaded === false) {
      return (
        <input className="input-button" readOnly={true} value="加载中" title="加载中" />
      );
    }
    var self = this;
    if (this.state.painting) {
      return (
        <div>
          <input className="input-button" readOnly={true} onClick={Painter.clear} value="清空" title="清空" />
          <input className="input-button" readOnly={true} onClick={this._onPainting} value="完成" title="完成" />
        </div>
      )
    } else {
      var inputs = [
        {button: {demo: "prim", onClick: this._onClick.bind(this,'prim'), value:"Prim最小生成树"}},
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
