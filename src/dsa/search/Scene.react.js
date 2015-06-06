var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '5',
      demo: 'bsearch'
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    DsaActions.runDemo('create', '1 1 2 3 5 8 13 21 34 55 89');
    DsaActions.runDemo('bsearch', 5, false);
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    var inputs = [
      {button: {demo: "create", onClick: this._onClick.bind(this,'create'), value:"新数组"}, items: [{onChange:this._onChange.bind(this),value:this.state.text,placeholder:"数组"}]},
      {button: {demo: "lsearch", onClick: this._onClick.bind(this,'lsearch'), value:"线性查找"}, items: [{onChange:this._onChange.bind(this),value:this.state.text,placeholder:"数字"}]},
      {button: {demo: "bsearch", onClick: this._onClick.bind(this,'bsearch'), value:"二分查找"}, items: [{onChange:this._onChange.bind(this),value:this.state.text,placeholder:"数字"}]},
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
    this.setState({demo: cmd});
    DsaActions.runDemo(cmd, this.state.text);
  }
});
