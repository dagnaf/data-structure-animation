var React = require('react');
var Code = require('./code.jsx');
var Input = require('./input.jsx');
var List = require('./list.jsx');
var Scene = require('./scene.jsx');
var Header = require('./header.jsx');
var Footer = require('./footer.jsx');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      demo: app.store.demo
    };
  },
  render: function () {
    return (
      <div className="wrapper">
        <Header />
        <div className="wrapper-row">
          <List />
          <Code />
          <Scene />
          <Input />
        </div>
        <Footer />
      </div>
    );
  }
});
