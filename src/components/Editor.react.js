require('../css/default.css');
require('./Editor.react.less');
var React = require('react');
var DsaActions = require('../actions/DsaActions');

var _line_height = 15;

module.exports = React.createClass({
  propTypes: {
    files: React.PropTypes.array.isRequired,
    isRunning: React.PropTypes.bool.isRequired,
    isPlaying: React.PropTypes.bool.isRequired,
    activeLine: React.PropTypes.number.isRequired
  },

  getInitialState: function () {
    this.scrolls = [];
    return {
      index: 0
    };
  },
  componentDidMount: function () {
  },
  componentDidUpdate: function (prevProps, prevState) {
    // if is running, then scrolltop depends on activeLine
    //   else it depends on the your scroll history
    if (this.state.index === 0 && this.props.isRunning &&
      this.props.activeLine !== prevProps.activeLine) {
      this._gotoLine(this.props.activeLine, prevProps.activeLine);
    } else if (this.state.index !== prevState.index) {
      this.refs.code.getDOMNode().scrollTop = (this.scrolls[this.state.index] || 0);
    }
  },
  // remember render should be pure state/props oriented
  //   other jobs better done in didupdate or didmount
  render: function () {
    var self = this;
    var classes = 'wrapper-code';
    var htmls = this.props.files[this.state.index].src.split('\n');
    if (this.state.index === 0) {
      classes += ' main';
    }
    if (this.props.isRunning) {
      classes += ' running';
    }
    return (
      <div className={classes}>
        <pre>
          <div ref="numbers" className="numbers">
            {htmls.map(function (h, i) {
              var classes = 'line';
              if (self.state.index === 0 && self.props.activeLine === i+1) {
                classes += ' active';
              }
              return (
                <div key={i} className={classes}>{i+1}</div>
              );
            })}
            <div className="line" />
          </div>
          <code ref="code" onScroll={this._onScroll}>
            {htmls.map(function (h, i) {
              var classes = 'line';
              if (self.state.index === 0 && self.props.activeLine === i+1) {
                classes += ' active';
              }
              return (
                <div key={i} className={classes} dangerouslySetInnerHTML={{ __html: h }} />
              );
            })}
          </code>
        </pre>
        <ul className="list file-list">
          {this.props.files.map(function (file, i) {
            var classes = '';
            if (this.state.index === i) classes += ' active';
            return (
              <li key={i}>
                <input
                  readOnly={true}
                  className={classes}
                  onClick={this._onClick.bind(this, i)}
                  value={file.name}
                />
              </li>
            );
          }.bind(this))}
        </ul>
      </div>
    );
  },
  _onScroll: function (e) {
    this.refs.numbers.getDOMNode().scrollTop = e.target.scrollTop;
  },
  _onClick: function (i) {
    if (this.state.index === i) {
      return;
    }
    this.scrolls[this.state.index] = this.refs.code.getDOMNode().scrollTop;
    this.setState({
      index: i
    })
  },
  _gotoLine: function (i, j) {
    var node = this.refs.code.getDOMNode();
    var from = node.scrollTop;
    var to = _line_height*(i-1);
    var half = node.clientHeight/2;
    if (Math.abs(from + half - to) > node.clientHeight/3) {
      node.scrollTop = to - node.clientHeight/2;
    }
  },
});
