var React = require('react');
var EventMixin = require('react-backbone-events-mixin');

module.exports = React.createClass({
  mixins: [
    EventMixin
  ],
  registerListeners: function(props, state) {
    this.listenTo(state.demo, 'change:isRunning', function () {
      this.forceUpdate();
      // FIXME: isRunning and isPlaying are interdependent
      if (!this.state.demo.isRunning)
        this.state.demo.isPlaying = false;
    });
    this.listenTo(state.demo, 'change:isPlaying', function () {
      this.forceUpdate();
    });
    this.listenTo(state.demo, 'change:stamp', function () {
      this.setState({width: this.state.demo.stamp*100/this.state.demo.length});
    });
  },
  getInitialState: function () {
    return {
        demo: app.store.demo,
        width: 0
    }
  },
  // Solution copy from dat.gui .slider
  onMouseDown: function (e) {
    if (e.button !== 0) {
        e.preventDefault();
        return;
    }
    this.state.demo.pause();
    // FIXME: don't know by react how to attach events to window
    window.addEventListener('mousemove', this.onMouseDrag);
    window.addEventListener('mouseup', this.onMouseUp);
    this.onMouseDrag(e);
  },
  // Solution copy from dat.gui .slider
  onMouseDrag: function(e) {
    // e is synthetic event by react
    e.preventDefault();
    // FIXME: 80 is width of play-button
    var totalWidth = window.innerWidth - 80*2;
    var clientWidth = Math.max(0,Math.min(totalWidth, e.clientX - 80));
    this.setState({width: clientWidth*100/totalWidth});
    return false;
  },
  // Solution copy from dat.gui .slider
  onMouseUp: function (e) {
    // e is window default event
    // FIXME: don't know by react how to detach events from window
    window.removeEventListener('mousemove', this.onMouseDrag);
    window.removeEventListener('mouseup', this.onMouseUp);
    var totalWidth = window.innerWidth - 80*2;
    var clientWidth = Math.max(0,Math.min(totalWidth, e.clientX - 80));
    var unitWidth = totalWidth/this.state.demo.length;
    // FIXME: width is binded to stamp, listened in change events
    // this.setState({width: clientWidth*100/totalWidth});
    this.state.demo.stamp = Math.round(clientWidth/unitWidth);
    this.setState({width: this.state.demo.stamp*100/this.state.demo.length})
  },
  onContextMenu: function (e) {
    e.preventDefault();
  },

  pause: function () {
    this.state.demo.pause();
  },
  replay: function () {
    this.state.demo.replay();
  },
  play: function () {
    this.state.demo.play();
  },

  render: function () {
    var playButton;
    if (this.state.demo.isRunning) {
      if (this.state.demo.isPlaying) {
        playButton = (
            <span className="pause" onClick={this.pause}></span>
        );
      } else {
        playButton = (
            <span className="play" onClick={this.play}></span>
        );
      }
    } else {
        playButton = (
            <span className="replay" onClick={this.replay}>
                <span className="play">
                    <span className="play"></span>
                </span>
            </span>
        );
    }

    var inlineStyle = {
        width: this.state.width + '%'
    };
    return (
      <footer>
        <div className="play-button header-left">{playButton}</div>
        <div className="range-bar header-middle" onMouseDown={this.onMouseDown} onContextMenu={this.onContextMenu}>
          <div className="progress" style={inlineStyle}></div>
        </div>
        <div className="header-right"></div>
      </footer>
    )
  }
});
