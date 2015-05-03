var path = require('path');
var global = require('./global');

var line_loader = path.join(global.root,'loaders','line.js');
var highlight_loader = path.join(global.root,'loaders','highlight.js');
var router_loader = path.join(global.root,'loaders','router.js');
var code_loader = 'raw!'+highlight_loader;

var output_path = path.join(__dirname,'example');

module.exports = {
  context: __dirname,
  entry: global.externals.concat(global.modules).concat(path.join(global.root,'src/app.react.js')),
  output: {
    path: output_path,
    filename: 'dsa.js',
    chunkFilename: 'chunks/[name].js',
    // TODO
    library: 'dsa',
    libraryTarget: 'umd'
  },
  module: {
    // file tested with absolute path, so only care about the suffix
    loaders: [
      { test: /\.less$/, loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'},
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.react\.js$/, loader: 'jsx-loader' },
      // read raw files
      { test: /\.c$/, loader: code_loader },
      { test: /\.h$/, loader: code_loader },
      { test: /Makefile$/, loader: code_loader },
      // transform 'line' to actual #line before required
      { test: /\.line\.js$/, loader: line_loader },
      // generate routers
      { test: /require-dsa\.js$/, loader: router_loader }
    ]
  },
  externals: {
    'react': 'React',
    'd3': 'd3'
  }
};
