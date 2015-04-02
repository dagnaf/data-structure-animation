var React = require('react');
var Code = require('./code.jsx');
var Input = require('./input.jsx');
var List = require('./list.jsx');
var Scene = require('./scene.jsx');
var Control = require('./control.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      demo: app.store.demo
    };
  },
  render: function () {
    return (
      <div className="wrapper">
        <header>
          <div className="header-side"></div>
          <div className="header-middle"></div>
          <div className="header-side"></div>
        </header>
        <div className="wrapper-row">
          <List />
          <Code />
          <Scene />
          <Input />
        </div>
        <footer>
          <Control />
        </footer>
      </div>
    );
  }
});
