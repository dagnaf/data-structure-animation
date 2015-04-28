var path = require('path');
var entries = require('./create-entry');

module.exports = {
  context: path.join(__dirname,'src','pages'),
  entry: entries,
  output: {
    path: path.join(__dirname,'dev'),
    filename: '[name].entry.js'
  },
  module: {
    loaders: [
      // file tested with absolute path, so only care about the suffix
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
      { test: /\.react\.js$/, loader: "jsx-loader" },
      // transform 'line' to actual #line before required
      { test: /\.line\.js$/, loader: path.join(__dirname,'loader','line.js') },
      // read raw files
      { test: /\.c$/, loader: "raw" },
      { test: /\.h$/, loader: "raw" },
      { test: /Makefile$/, loader: "raw" }
    ]
  }
};
