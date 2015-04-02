var React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      demo: app.store.demo,
      text: ''
    }
  },
  onChange: function (e) {
    this.setState({text: e.target.value});
  },
  run: function () {
    this.state.demo.run(this.state.text);
  },
  render: function () {
    return (
      <div className="list">
        <input onChange={this.onChange} value={this.state.text} placeholder="eval"/>
        <input className="cmd-button" disabled onClick={this.run} value="运行"/>
      </div>
    );
  }
});
