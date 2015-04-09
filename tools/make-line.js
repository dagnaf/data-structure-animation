var fs = require('fs');
require('shelljs/global');

var path = __dirname + '/../src/codes/';

var src = fs.readFileSync(path+'stack.js', 'utf-8');
console.log('process file: ' + path + 'stack.js');
console.log(src);
src.split('\n').map(function(s, i) {
    return s.replace(/li\(ne/g, 'li('+(i+1));
}).join('\n').to(path+'stack-built.js');
console.log('create file: ' + path + 'stack.js');
