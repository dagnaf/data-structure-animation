require('./less/app.react.less');
var React = require('react');
window.React = React;

module.exports = function (arg, id) {
// console.log(arg);
var DsaApp = require('./components/DsaApp.react')(arg);

React.render(
  <DsaApp />,
  id === undefined ? document.body : document.getElementById(id)
);

};// end of module.exports
