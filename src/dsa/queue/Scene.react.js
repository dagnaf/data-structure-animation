var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '',
      demo: 'enque',
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    DsaActions.runDemo('init');
    DsaActions.runDemo('enque', 1);
    DsaActions.runDemo('enque', 2, false);
    // DsaActions.runDemo('push', 2, false);
    // DsaActions.runDemo('push', 3, false);
    // DsaActions.
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    var inputs = [
      {button: {demo: "enque", onClick: this._onClick.bind(this,'enque'), value:"入队"}, items: [{onChange:this._onChange.bind(this),value:this.state.text,placeholder:"整数"}]},
      {button: {demo: "deque", onClick: this._onClick.bind(this,'deque'), value:"出队"}},
      {button: {demo: "front", onClick: this._onClick.bind(this,'front'), value:"队首"}},
    ]
    var self = this;
    return (
      <div className="wrapper-code">
        <div className="list">
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
        <div ref="svg" className="scene"/>
      </div>
    );
  },
  _onChange: function (e) {
    this.setState({text: e.target.value});
  },
  _onClick: function (cmd) {
    this.setState({demo:cmd});
    DsaActions.runDemo(cmd, this.state.text);
  }
});
