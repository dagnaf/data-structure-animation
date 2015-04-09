var React = require('react');
var ReactPropTypes = React.PropTypes;
var DsaActions = require('../actions/DsaActions');
var D3 = require('d3');

var sideWidth = 80;
var totalWidth = function () {
  return document.getElementById('dsaapp').clientWidth - sideWidth*2;
}
var clientWidth = function (clientX) {
  return Math.max(0,Math.min(totalWidth(), clientX - sideWidth));
}

module.exports = React.createClass({

  propTypes: {
    val: ReactPropTypes.number.isRequired,
    delay: ReactPropTypes.number.isRequired,
    domain: ReactPropTypes.array.isRequired,
    isRunning: ReactPropTypes.bool.isRequired,
    isPlaying: ReactPropTypes.bool.isRequired,
  },
  getInitialState: function () {
    return {
      draggingWidth: undefined
    }
  },

  render: function () {
    var playButton;
    if (this.props.isRunning) {
      if (this.props.isPlaying) {
        playButton = (
            <span className="pause" onClick={this._onPause}></span>
        );
      } else {
        playButton = (
            <span className="play" onClick={this._onPlay}></span>
        );
      }
    } else {
        playButton = (
            <span className="replay" onClick={this._onReplay}>
                <span className="play">
                    <span className="play"></span>
                </span>
            </span>
        );
    }
    var width;
    if (this.state.draggingWidth >= 0)
      width = this.state.draggingWidth;
    else
      width = D3.scale.linear()
        .domain(this.props.domain)
        .range([0, 100])(this.props.val);
    var inlineStyle = {
        width: width + '%'
    };
    return (
      <footer>
        <div className="play-button header-left">{playButton}</div>
        <div
          className="range-bar header-middle"
          onMouseDown={this._onMouseDown}
          onContextMenu={this._onContextMenu}
        >
          <div className="progress" style={inlineStyle}></div>
        </div>
        <div className="header-right"></div>
      </footer>
    )
  },
  // Solution copy from dat.gui .slider
  _onMouseDown: function (e) {
    if (e.button !== 0) {
        e.preventDefault();
        return;
    }
    // FIXME: difference with Header.js
    DsaActions.pauseDemo();
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
      draggingWidth: D3.scale.linear()
        .domain([0, totalWidth()])
        .range([0, 100])(clientWidth(e.clientX))
      });
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
    DsaActions.updateStamp(Math.round(this.state.draggingWidth * this.props.domain[1] / 100), true);
    this.setState({draggingWidth: undefined})
  },
  _onContextMenu: function (e) {
    e.preventDefault();
  },
  _onPause: function () {
    DsaActions.pauseDemo();
  },
  _onReplay: function () {
    DsaActions.replayDemo();
  },
  _onPlay: function () {
    DsaActions.playDemo();
  },
});
