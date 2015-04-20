var path = require('path');
var fs = require('fs-sync');
var entries = {};
[
  'stack',
  'stack-eval',
  'queue'
].forEach(function (n) {
  // copy js files
  var pages = path.join(__dirname, 'src', 'pages');
  var template_js = pages + '/template.js';
  var file_js = pages +'/' + n +'.js';
  fs.write(file_js,
    fs.read(template_js).replace('[name]', n)
  );
  console.log("Copied '"+template_js+"' to '"+file_js+"'");
  // copy html files
  var dev = path.join(__dirname, 'dev');
  var template_html = dev + '/template.html';
  var file_html = dev + '/' + n + '.html';
  fs.write(file_html,
    fs.read(template_html).replace('[name]', n).replace('[NAME]', n.toUpperCase())
  );
  console.log("Copied '"+template_html+"' to '"+file_html+"'");
  // add entries
  entries[n] = './' + n +'.js';;
});

console.log('entries: ', JSON.stringify(entries));

module.exports = entries;
