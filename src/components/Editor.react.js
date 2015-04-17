var React = require('react');
var ReactPropTypes = React.PropTypes;
var ace = require('brace');
require('brace/mode/c_cpp');
require('brace/theme/chrome');
var DsaActions = require('../actions/DsaActions');

module.exports = React.createClass({
  propTypes: {
    files: ReactPropTypes.array.isRequired,
    index: ReactPropTypes.number.isRequired,
    isRunning: ReactPropTypes.bool.isRequired,
    isPlaying: ReactPropTypes.bool.isRequired,
    activeLine: ReactPropTypes.number.isRequired
  },

  componentDidMount: function () {
    this.editor = ace.edit(this.refs.code.getDOMNode());

    this.editor.getSession().setMode('ace/mode/c_cpp');
    this.editor.setTheme('ace/theme/chrome');

    this.editor.setReadOnly(true);
    this.editor.setAnimatedScroll(true);

    this.editor.setValue(this.props.files[this.props.index].src, -1);
  },
  componentDidUpdate: function (prevProps, prevState) {
    // console.log('in Editor prev', prevProps);
    // console.log('in Editor curr', this.props);
  },
  componentWillUnmount: function () {
    this.editor.destroy();
  },

  render: function () {
    var classes = 'wrapper-code';
    if (this.props.index === 0) {
      classes += ' main';
      if (this.props.isRunning){ //&&
        //this.editor.getCursorPosition().row + 1 != this.props.activeLine) {
        this.editor.gotoLine(this.props.activeLine);
        // console.log('gotoline ' +this.props.activeLine)
      }
    }
    if (this.props.isRunning) classes += ' running';
    return (
      <div className={classes}>
        <div className="ace-flex" ref="code"></div>
        <ul className="list file-list">
          {this.props.files.map(function (file, i) {
            var classes = '';
            if (this.props.index === i) classes += ' active';
            return (
              <li key={i}>
                <input
                  disabled={true}
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
  _onClick: function (i) {
    if (this.props.index === i) return;
    DsaActions.updateFile(i, this.editor.getCursorPosition().row + 1);
    this.editor.setValue(this.props.files[i].src, -1);
    this.editor.gotoLine(this.props.files[i].line)
  }
});
