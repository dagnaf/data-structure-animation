var global = require('../global');
var fs = require('fs');
var path = require('path');

var output = __dirname;
var _gh = ((process.argv.length > 2) ? '_gh' : '');

var template_page_html = 'template_page'+_gh+'.html';
console.log(process.argv, template_page_html);

var html = fs.readFileSync(path.join(output, 'templates', template_page_html), 'utf-8');
var index = fs.readFileSync(path.join(output, 'templates', 'template_index.html'), 'utf-8');

// generate html pages for each dsa
global.entries.forEach(function (e) {
  fs.writeFileSync(path.join(output, e+'.html'), html.replace(/dsa-name/g, e), 'utf-8');
});

// generate index (simple list)
// fs.writeFileSync(path.join(output, 'index.html'), index.replace('listofdsa', global.entries.map(function (e) {
//   return '<li><a href="'+e+'.html">'+global.zh[e] +' | ' + global.en[e]+'</a></li>'
// }).join('\n')).replace('lastupdate', new Date()), 'utf-8');


if (_gh) {
  var ghpages = require('gh-pages');
  var path = require('path');

  ghpages.publish(path.join(__dirname), {
    message: 'Auto-grenerated commit',
    push: false,
    dotfiles: true,
    logger: function (message) {
      console.log(message);
    },
  }, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Remember to push to origin/gh-pages.');
      console.log('cd '+path.join(global.root, 'node_modules', 'gh-pages', '.cache'));
      console.log('git push origin gh-pages');
    }
  })
}
