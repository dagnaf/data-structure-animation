require('./Tip.react.less')
var React = require('react');

var TipItem = React.createClass({
  render: function () {
    var classes = "tip-item tip-item-"+(this.props.direction || "no-arrow");
    var cancel = (<span onClick={this.props.onCancel}>关闭</span>);
    return (
      <div className={classes} style={this.props.inlineStyle} onClick={function (e) { e.stopPropagation(); }}>
        <div dangerouslySetInnerHTML={{__html:this.props.content}}/>
        <div style={{textAlign: "right"}}>
          {this.props.prev ? (<span onClick={this.props.onPrev}>{this.props.prev}</span>) : cancel}
          |
          {this.props.next ? (<span onClick={this.props.onNext}>{this.props.next}</span>) : cancel}
        </div>
        <span onClick={this.props.onCancel}></span>
      </div>
    )
  }
})

var tips = [
  { html: "基于MOOC的数据结构课程动态演示系统<div style=\"text-align: center\">简单介绍</div>", style: {/*width:"325px",*/top: "50%", left: "50%",marginTop: "-50px",marginLeft:"-160px"}, dir: "" },
  { html: "输入数据、选择数据结构的具体操作。", style: {/*width:"305px",*/top: "50%", left: "100px",marginTop: "-35px"}, dir: "left" },
  { html: "调节播放速度。", style: {/*width:"200px",*/top: "85px", left: "50%",marginLeft:"-100px"}, dir: "top" },
  { html: "控制播放进度。", style: {/*width:"200px",*/top: "100%", marginTop: "-160px", left: "50%",marginLeft: "-100px"}, dir: "bottom" },
  { html: "查看代码文件。", style: {/*width:"200px",*/top: "50%", left: "100%",marginLeft: "-300px",marginTop: "-35px"}, dir: "right" },
  { html: "如有疑问，请联系开发者。", style: {/*width:"225px",*/top: "50%", left: "50%",marginTop: "-50px",marginLeft:"-110px"}, dir: "" },
]
module.exports = React.createClass({
  getInitialState: function () {
    return {
      open: (localStorage.getItem("dsa-notip") === "true" ? false : true),
      step: 0
    }
  },
  render: function () {
    return (
      <div className="header-right play-button" title={this.state.open ? "" : "如何使用"} onClick={this._toggle.bind(this,true)}>
        <div className="replay qmark">
          <div className="quater3" />
          <div className="q-line">
            <div className="q-dot" />
          </div>
        </div>
        <div className="tip-full" style={{display: this.state.open ? "block" : "none"}} onClick={this._toggle.bind(this,false)}>
          <TipItem
            direction={tips[this.state.step].dir}
            content={tips[this.state.step].html}
            inlineStyle={tips[this.state.step].style}
            onPrev={this._onJump.bind(this,this.state.step-1)}
            onNext={this._onJump.bind(this,this.state.step+1)}
            prev={this.state.step === 0 ? "" : "返回"}
            next={this.state.step === tips.length-1 ? "" : "继续"}
            onCancel={this._toggle.bind(this,false)} />
        </div>
      </div>
    );
  },
  _onJump: function (step, e) {
    e && e.stopPropagation();
    this.setState({step: step});
  },
  _toggle: function (open, e) {
    e && e.stopPropagation();
    this.setState({open: open || false, step: 0});
    localStorage.setItem("dsa-notip", true);
    console.log("clicked");
  }
});
