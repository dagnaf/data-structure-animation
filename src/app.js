var React = require('react');
window.React = React;
var DsaApp = require('./components/DsaApp.react');

React.render(
  <DsaApp />,
  document.getElementById('dsaapp')
);
