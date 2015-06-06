var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '',
      fn: '',
      demo: 'insert',
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    DsaActions.runDemo('create', { n: '10', f: 'x', t: 'hc' });
    DsaActions.runDemo('insert', 11, false);
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    var inputs = [
      {button: {demo: "createhc", onClick: this._onClick.bind(this,'create','hc'), value:"开地址散列"}, items: [
        {onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"大小"},
        {onChange:this._onChange.bind(this,'fn'),value:this.state.fn,placeholder:"x的函数"},
      ]},
      {button: {demo: "createho", onClick: this._onClick.bind(this,'create','ho'), value:"链地址散列"}, items: [
        {onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"大小"},
        {onChange:this._onChange.bind(this,'fn'),value:this.state.fn,placeholder:"x的函数"},
      ]},
      {button: {demo: "search", onClick: this._onClick.bind(this,'search'), value:"查找"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"数字"}]},
      {button: {demo: "insert", onClick: this._onClick.bind(this,'insert'), value:"插入"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"数字"}]},
      {button: {demo: "delete", onClick: this._onClick.bind(this,'delete'), value:"删除"}, items: [{onChange:this._onChange.bind(this,'text'),value:this.state.text,placeholder:"数字"}]},
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
  _onChange: function (o, e) {
    var state = {};
    state[o] = e.target.value;
    this.setState(state);
  },
  _onClick: function (cmd, type) {
    this.setState({demo: type ? cmd+type : cmd});
    if (cmd.indexOf('create') !== -1) {
      DsaActions.runDemo(cmd, {n: this.state.text, f: this.state.fn, t: type });
    } else {
      DsaActions.runDemo(cmd, this.state.text);
    }
  }
});
