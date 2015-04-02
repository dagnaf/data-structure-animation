var React = require('react');
window.React = React;
var App = require('./components/app.jsx');
var Demo = require('./models/demo');
var File = require('./models/file');

window.app = {};
app.store = {
  demo: new Demo(),
  file: new File()
};
// React.renderComponent(Code(), document.body);
React.render(<App />, document.body);
