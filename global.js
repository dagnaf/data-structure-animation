module.exports.root = __dirname;

module.exports.externals = [
  'react',
  'd3',
];

module.exports.modules = [
  'clone',
  'd3-transform',
];

module.exports.entries = [
  'stack', 'stack-eval', 'queue', 'queue-yanghui', 'rb-tree'
];

module.exports.deps = {
  'stack-eval': [
    {
      path: 'stack',
      files: ['stack.c', 'stack.h']
    }
  ],
  'queue-yanghui': [
    {
      path: 'queue',
      files: ['queue.c', 'queue.h']
    }
  ],
  'rb-tree': [
    {
      path: 'common',
      files: ['util.c', 'util.h']
    }
  ]
};

module.exports.getFunctionBody = function (fn, opt) {
  if (typeof opt === 'string') {
    opt = { s: opt, t: opt };
  }
  opt = opt || { s: '{', t: '}' };
  var a = fn.toString().indexOf(opt.s)+1;
  var b = fn.toString().lastIndexOf(opt.t);
  return fn.toString().substr(a, b-a);
};
