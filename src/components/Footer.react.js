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
    delay: React.PropTypes.number.isRequired,
    domain: React.PropTypes.array.isRequired,
    isRunning: React.PropTypes.bool.isRequired,
    isPlaying: React.PropTypes.bool.isRequired,
  },
  // getInitialState: function () {
  //   return {
  //     draggingWidth: undefined
  //   }
  // },
  _update_width_with_props: function () {
    var _delay;
    var _val;
    if (this.props.isPlaying) {
      _delay = this.props.delay;
      _val = this.props.val + 1;
      if (_val > this.props.domain[1]) {
        _val = this.props.domain[1];
      }
    } else {
      _delay = 15;
      _val = this.props.val;
    }
    if (this.sl.__prev__ === undefined) {
      this.sl.__prev__ = '0%';
    }
    console.log('%cFooter play from'+this.props.val+' to '+_val, 'color:green')
    var oldWidth = d3.scale.linear()
      .domain(this.props.domain)
      .range([0, 100])(this.props.val);
    var newWidth = d3.scale.linear()
      .domain(this.props.domain)
      .range([0, 100])(_val);
    // var i = d3.interpolate(this.sl.__prev__, newWidth+'%');
    var i = d3.interpolate(oldWidth+'%', newWidth+'%');
    this.sl.__prev__ = newWidth+'%';
    this.sl
      .transition()
      .duration(_delay*0.75)
      .styleTween('width', function () { return i});
  },

  componentDidMount: function () {
    this.sl = d3.select('footer .progress');
    this._update_width_with_props();
  },

  componentDidUpdate: function(prevProps, prevState) {
    console.log('%cFooter update\n'+JSON.stringify(prevProps)+'\n'+JSON.stringify(this.props), 'color:green')
    if (this.sl.__dragging__) {
      return;
    }
    if (prevProps.val === this.props.val &&
      prevProps.domain[1] === this.props.domain[1] &&
      prevProps.isPlaying === this.props.isPlaying) {
        return;
    }
    this._update_width_with_props();
  },

  render: function () {
    var playButton;
    if (this.props.isRunning) {
      if (this.props.isPlaying) {
        playButton = (
          <div className="play-button header-left" onClick={this._onPause}>
            <span className="pause"></span>
          </div>
        );
      } else {
        playButton = (
          <div className="play-button header-left" onClick={this._onPlay}>
            <span className="play"></span>
          </div>
        );
      }
    } else {
        playButton = (
          <div className="play-button header-left" onClick={this._onReplay}>
            <span className="replay">
                <span className="play">
                    <span className="play"></span>
                </span>
            </span>
          </div>
        );
    }

    return (
      <footer>
        {playButton}
        <div
          className="range-bar header-middle"
          onMouseDown={this._onMouseDown}
          onContextMenu={this._onContextMenu}
        >
          <div className="progress"></div>
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
    DsaActions.pauseDemo();
    // FIXME: don't know by react how to attach events to window
    window.addEventListener('mousemove', this._onMouseDrag);
    window.addEventListener('mouseup', this._onMouseUp);
    this._onMouseDrag(e, '_onMouseDown');
  },
  // Solution copy from dat.gui .slider
  _onMouseDrag: function(e, w) {
    // e is synthetic event by react
    e.preventDefault();

    this.sl.__dragging__ = true;
    this.sl.__prev__ = d3.scale.linear()
        .domain([0, totalWidth()])
        .range([0, 100])(clientWidth(e.clientX))+'%';

    this.sl.style('width', this.sl.__prev__);
    return false;
  },
  // Solution copy from dat.gui .slider
  _onMouseUp: function (e) {
    // e is window default event
    window.removeEventListener('mousemove', this._onMouseDrag);
    window.removeEventListener('mouseup', this._onMouseUp);

    this.sl.__dragging__ = false;

    var newStamp = Math.round(parseInt(this.sl.__prev__) * this.props.domain[1] / 100);
    DsaActions.updateStamp(newStamp);

    this.sl.__prev__ = d3.scale.linear()
      .domain(this.props.domain)
      .range([0, 100])(this.props.val) + '%';
    this.sl.style('width', this.sl.__prev__);
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
