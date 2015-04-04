var React = require('react');
var ace = require('brace');
require('brace/mode/c_cpp');
require('brace/theme/chrome');
var EventMixin = require('react-backbone-events-mixin');

module.exports = React.createClass({
  mixins: [
    EventMixin
  ],
  registerListeners: function(props, state) {
    // UPDATE: no need to explicitly call for resize
    // this.listenTo(state.demo, 'change:hasDemo', function () {
    //   // FIXME: this is fired before control componentDidMount
    //   setTimeout(function () {
    //     this.editor.resize(true);
    //   }.bind(this), 500);
    // }.bind(this));

    this.listenTo(state.demo, 'change:isRunning', function () {
      this.forceUpdate();
    }.bind(this));

    this.listenTo(state.demo, 'change:activeLine', function (curr) {
      if (this.state.file.main && this.state.demo.activeLine !== undefined) {
        this.editor.gotoLine(this.state.demo.activeLine);
      }
    }.bind(this));

    this.listenTo(state.file, 'change', function () {
      // this.forceUpdate();
      this.editor.setValue(this.state.file.content, -1);
      this.editor.gotoLine(this.state.file.line);
    }.bind(this));

    this.listenTo(state.file, 'save:line', function (index) {
      this.state.file.files[index].line = this.editor.getCursorPosition().row + 1;
      this.forceUpdate();
    }.bind(this));
  },

  getInitialState: function () {
    return {
      demo: app.store.demo,
      file: app.store.file
    };
  },

  componentDidMount: function () {
    this.editor = ace.edit(this.refs.code.getDOMNode());
    // this.editSession = this.editor.getSession();

    this.editor.getSession().setMode('ace/mode/c_cpp');
    this.editor.setTheme('ace/theme/chrome');

    this.editor.setReadOnly(true);
    this.editor.setAnimatedScroll(true);
    // this.editor.setFontSize(16);

    this.editor.setValue(this.state.file.content, -1);
    // this.Range = ace.acequire('ace/range').Range;
  },

  componentWillUnmount: function () {
    this.editor.destroy();
  },

  render: function () {
    var classes = 'wrapper-code';
    if (this.state.file.main) classes += ' main';
    if (this.state.demo.isRunning) classes += ' running';
    return (
      <div className={classes}>
        <div className="ace-flex" ref="code"></div>
      </div>
    );
  }
});
