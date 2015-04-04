var React = require('react');
var EventMixin = require('react-backbone-events-mixin');
var D3 = require('d3');

var SideWidth = 80;
var maxDelay = 2500;
var minDelay = 100;
var totalWidth = function () {
    return window.innerWidth - 2*SideWidth;
}
var clientWidth = function (x) {
    Math.max(0,Math.min(totalWidth(), e.clientX - 80))
}

module.exports = React.createClass({
  mixins: [
    EventMixin
  ],
  registerListeners: function(props, state) {
    this.listenTo(state.demo, 'change:delay', function () {
      // this.setState({width: this.state.demo.stamp*100/this.state.demo.length});
    });
  },
  getInitialState: function () {
    return {
        demo: app.store.demo,
        width: 0
    }
  },
  onMouseDown: function (e) {
    if (e.button !== 0) {
        e.preventDefault();
        return;
    }
    window.addEventListener('mousemove', this.onMouseDrag);
    window.addEventListener('mouseup', this.onMouseUp);
  },
  onMouseDrag: function(e) {
    e.preventDefault();
    this.setState({width: clientWidth()*100/totalWidth()});
    return false;
  },
  onMouseUp: function (e) {
    window.removeEventListener('mousemove', this.onMouseDrag);
    window.removeEventListener('mouseup', this.onMouseUp);
    this.state.demo.delay = Math.round(D3.scale.linear().domain([0, totalWidth()]).range([minDelay, maxDelay])(clientWidth()))
    this.setState({width: Math.round(D3.scale.linear().domain([minDelay, maxDelay]).range([0, 100])(this.state.demo.delay))})
  },
  onContextMenu: function (e) {
    e.preventDefault();
  },

  render: function () {
    var inlineStyle = {
        width: this.state.width + '%'
    };
    return (
      <header>
        <div className="header-left"></div>
        <div className="range-bar header-middle" onMouseDown={this.onMouseDown} onContextMenu={this.onContextMenu}>
          <div className="progress" style={inlineStyle}></div>
        </div>
        <div className="header-right"></div>
      </header>
    )
  }
});
