var fs = require('fs');
var path = require('path');
var global = require('../global');
var require_dsa = require('../src/routers/require-dsa');

var template_req = global.getFunctionBody(require_dsa.requires, '*');
var template_dep = global.getFunctionBody(require_dsa.dependencies, '*');

var deps = global.deps;

module.exports = function (content) {
  this.cacheable && this.cacheable();
  return content.replace(
    require_dsa.$('requires'),
    fs.readdirSync(path.join(__dirname, '..', 'src', 'dsa')).map(function (dir) {
      if (global.entries.indexOf(dir) === -1) return '';
      return template_req.replace(/dsa_name/g, dir).replace(
        require_dsa.$('deps'),
        (deps[dir] || []).map(function (dep) {
          return dep.files.map(function (filename) {
            return template_dep.replace(
              /dsa_name/g,dep.path
            ).replace(
              /file_name/g,filename
            );
            // end of deps_template.replace
          }).join(',\n');
          // end of dep_files.map
        }).join('\n')
        // end of deps_dir.map
      );
      // end of template.replace
    }).join('\n')
    // end of dirs.map
  ).slice(content.indexOf(require_dsa.$('begin')));
}
