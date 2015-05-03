var global = require('../global');
var fs = require('fs');
var path = require('path');

var output = __dirname;//path.join(__dirname, 'gh-pages');

var template_page_html = (process.argv.length > 2) ? 'template_page_gh.html' : 'template_page.html';
console.log(process.argv, template_page_html);

var html = fs.readFileSync(path.join(output, 'templates', template_page_html), 'utf-8');
var index = fs.readFileSync(path.join(output, 'templates', 'template_index.html'), 'utf-8');

// generate html pages for each dsa
global.entries.forEach(function (e) {
  fs.writeFileSync(path.join(output, e+'.html'), html.replace(/dsa-name/g, e), 'utf-8');
})

// generate index (simple list)
fs.writeFileSync(path.join(output, 'index.html'), index.replace('listofdsa', global.entries.map(function (e) {
  return '<li><a href="'+e+'.html">'+e+'.html</a></li>'
}).join('\n')), 'utf-8');
