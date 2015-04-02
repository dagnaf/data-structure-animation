var fs = require('fs');
require('shelljs/global');

var src = fs.readFileSync(__dirname+'/stack.js', 'utf-8');

src.split('\n').map(function(s, i) {
        return s.replace(/line/g, i+1);
    }).join('\n').to('stack-built.js');
