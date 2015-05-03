var React = require('react');
var d3 = require('d3');
var DsaActions = require('../actions/DsaActions');

var sideWidth = 80;
var totalWidth = function () {
  return document.querySelector('.dsa-app').clientWidth - sideWidth*2;
  // return document.getElementById('dsaapp').clientWidth - sideWidth*2;
}
var clientWidth = function (clientX) {
  return Math.max(0,Math.min(totalWidth(), clientX - sideWidth));
}

module.exports = React.createClass({
  propTypes: {
    val: React.PropTypes.number.isRequired,
    domain: React.PropTypes.array.isRequired,
  },
  getInitialState: function () {
    return {
      draggingWidth: undefined
    }
  },

  render: function () {
    var width;
    if (this.state.draggingWidth >= 0)
      width = this.state.draggingWidth;
    else
      width = d3.scale.linear()
        .domain(this.props.domain)
        .range([0, 100])(this.props.val);
    var inlineStyle = {
        width: width + '%'
    };

    return (
      <header>
        <div className="header-left">快</div>
        <div
          className="range-bar header-middle"
          onMouseDown={this._onMouseDown}
          onContextMenu={this._onContextMenu}
        >
          <div className="progress" style={inlineStyle}></div>
        </div>
        <div className="header-right">慢</div>
      </header>
    )
  },
  // Solution copy from dat.gui .slider
  _onMouseDown: function (e) {
    if (e.button !== 0) {
        e.preventDefault();
        return;
    }
    // FIXME: difference with Footer.js
    // DsaActions.pauseDemo();
    // FIXME: don't know by react how to attach events to window
    window.addEventListener('mousemove', this._onMouseDrag);
    window.addEventListener('mouseup', this._onMouseUp);
    this._onMouseDrag(e);
  },
  // Solution copy from dat.gui .slider
  _onMouseDrag: function(e) {
    // e is synthetic event by react
    e.preventDefault();
    this.setState({
      draggingWidth: d3.scale.linear()
        .domain([0, totalWidth()])
        .range([0, 100])(clientWidth(e.clientX))
      });
    console.log(this.state.draggingWidth);
    return false;
  },
  // Solution copy from dat.gui .slider
  _onMouseUp: function (e) {
    // e is window default event
    // FIXME: don't know by react how to detach events from window
    window.removeEventListener('mousemove', this._onMouseDrag);
    window.removeEventListener('mouseup', this._onMouseUp);
    // var totalWidth = window.innerWidth - 80*2;
    // var clientWidth = Math.max(0,Math.min(totalWidth, e.clientX - 80));
    // var unitWidth = totalWidth/this.state.demo.length;
    // FIXME: difference with Footer.js
    DsaActions.updateDelay(Math.round(d3.scale.linear()
      .domain([0,100])
      .range(this.props.domain)(this.state.draggingWidth)));
    this.setState({draggingWidth: undefined})
  },
  _onContextMenu: function (e) {
    e.preventDefault();
  }
});
