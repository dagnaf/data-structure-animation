var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');
var Legend = require('./Legend.react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '',
      demo: 'insert',
      help: true
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    DsaActions.runDemo('insert', 10);
    DsaActions.runDemo('insert', 1);
    DsaActions.runDemo('insert', 2);
    DsaActions.runDemo('insert', 3);
    DsaActions.runDemo('insert', 4);
    DsaActions.runDemo('insert', 5, false);
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    var inputs = [
      {button: {demo: "search", onClick: this._onClick.bind(this,'search'), value:"查找"}, items: [{onChange:this._onChange/*.bind(this)*/,value:this.state.text,placeholder:"数字"}]},
      {button: {demo: "insert", onClick: this._onClick.bind(this,'insert'), value:"插入"}, items: [{onChange:this._onChange/*.bind(this)*/,value:this.state.text,placeholder:"数字"}]},
      {button: {demo: "delete", onClick: this._onClick.bind(this,'delete'), value:"删除"}, items: [{onChange:this._onChange/*.bind(this)*/,value:this.state.text,placeholder:"数字"}]},
      {button: {demo: "inorder", onClick: this._onClick.bind(this,'inorder'), value:"中序遍历"}},
      {button: {demo: "reset", onClick: this._onReset, value:"重置"}},
      {button: {help: this.state.help, onClick: this._onHelp, value:"帮助"}},
    ]
    var self = this;
    return (
      <div className="wrapper-code">
        <div className="list">
          {inputs.map(function (d,i) {
            var classes = "input-group" + (d.button.help || d.button.demo === self.state.demo ? " input-current" : "");
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
        <Legend show={this.state.help} />
      </div>
    );
  },
  _onChange: function (e) {
    this.setState({text: e.target.value});
  },
  _onClick: function (cmd) {
    this.setState({demo: cmd});
    DsaActions.runDemo(cmd, this.state.text);
  },
  _onReset: function () {
    DsaActions.runDemo('reset');
    DsaActions.pauseDemo();
    DsaActions.waitDemo();
    Renderer.clear();
  },
  _onHelp: function () {
    this.setState({help: !this.state.help});
  },
});
