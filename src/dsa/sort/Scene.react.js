var React = require('react');
var DsaActions = require('../../actions/DsaActions');
var Renderer = require('./Renderer.d3');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      text: '',
      demo: 'qsort'
    }
  },
  componentDidMount: function () {
    Renderer.init.bind(this)();
    var n = 11;
    var array = [];
    for (var i = 0; i < n; ++i) {
      array.push(Math.ceil(Math.random()*100))
    }
    DsaActions.runDemo('qsort', array.join(' '), false);
  },
  componentDidUpdate: function (prevProps) {
    if (this.props === prevProps || this.props.frame === undefined) {
      return;
    }
    Renderer.render(this.props.frame.status, this.props.delay, this.props.others);
  },
  render: function () {
    var inputs = [
      {button: {demo: "msort", onClick: this._onClick.bind(this,'msort'), value:"归并排序"}, items: [{onChange:this._onChange.bind(this),value:this.state.text,placeholder:"数组"}]},
      {button: {demo: "qsort", onClick: this._onClick.bind(this,'qsort'), value:"快速排序"}, items: [{onChange:this._onChange.bind(this),value:this.state.text,placeholder:"数组"}]},
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
