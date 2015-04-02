var React = require('react');
var EventMixin = require('react-backbone-events-mixin');

module.exports = React.createClass({
  mixins: [
    EventMixin
  ],
  registerListeners: function(props, state) {
    this.listenTo(state.demo, 'change', function () {
        this.forceUpdate();
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
    this.setState({width: Math.min(totalWidth, e.clientX - 80)*100/totalWidth});
    return false;
  },
  // Solution copy from dat.gui .slider
  onMouseUp: function (e) {
    // e is window default event
    // FIXME: don't know by react how to detach events from window
    window.removeEventListener('mousemove', this.onMouseDrag);
    window.removeEventListener('mouseup', this.onMouseUp);
    var totalWidth = window.innerWidth - 80*2;
    this.setState({width: Math.max(0,Math.min(totalWidth, e.clientX - 80))*100/totalWidth});
  },
  onContextMenu: function (e) {
    e.preventDefault();
  },
  render: function () {
    // if (this.state.demo.hasDemo === false) return (
    //     // <div className="demo-title">栈——算术表达式</div>
    //     null
    // );
    var playButton;
    var demo = this.state.demo;
    if (this.state.demo.running) {
        playButton = (
            <span className="pause" onClick={this.state.demo.pause.bind(demo)}></span>
        );
    } else if (this.state.demo.ended) {
        playButton = (
            <span className="replay" onClick={this.state.demo.replay.bind(demo)}>
                <span className="play">
                    <span className="play"></span>
                </span>
            </span>
        );
    } else {
        playButton = (
            <span className="play" onClick={this.state.demo.play.bind(demo)}></span>
        );
    }
    var inlineStyle = {
        width: this.state.width + '%'
    };
    return (
      <div className="control">
        <div className="play-button">{playButton}</div>
        <div className="range-bar" onMouseDown={this.onMouseDown} onContextMenu={this.onContextMenu}>
          <div className="progress" style={inlineStyle}></div>
        </div>
        <div className="footer-side"></div>
      </div>
    )
  }
});
