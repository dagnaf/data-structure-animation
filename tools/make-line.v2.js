var fs = require('fs');
require('shelljs/global');

var path = __dirname + '/../src/codes/stack-eval/';

var src = fs.readFileSync(path+'stack-eval.js', 'utf-8');
console.log('process file: ' + path + 'stack-eval.js');
console.log(src);
src.split('\n').map(function(s, i) {
    return s.replace(/stop\(line/g, 'stop('+(i+1));
}).join('\n').to(path+'lined.js');
console.log('create file: ' + path + 'lined.js');
