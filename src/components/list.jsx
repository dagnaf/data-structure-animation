var React = require('react');
var EventMixin = require('react-backbone-events-mixin');

module.exports = React.createClass({
  mixins: [
    EventMixin
  ],
  registerListeners: function (props, state) {
    this.listenTo(state.file, 'change:index', function () {
      this.forceUpdate();
    })
  },
  getInitialState: function () {
    return {
      file: app.store.file
    }
  },
  switch: function (i) {
    this.state.file.trigger('save:line', this.state.file.index);
    this.state.file.index = i;
  },
  render: function () {
    // NOTE: add key at li level, need to understand
    return (
      <ul className="list file-list">
        {this.state.file.files.map(function (file, i) {
          var classes = '';
          if (i === this.state.file.index) classes += ' active';
          return (
            <li key={i}><input disabled={true} className={classes} onClick={this.switch.bind(this, i)} value={file.name} /></li>
          );
        }.bind(this))}
      </ul>
    );
  }
})
