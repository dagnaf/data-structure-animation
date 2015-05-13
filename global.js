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
  'stack',
  'stack-eval',
  'queue',
  'queue-yanghui',
  'rb-tree',
  'huffman-tree',
  'search'
];
var deps_common =     {
  path: 'common',
  files: ['util.c', 'util.h']
};
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
    deps_common
  ],
  'huffman-tree': [
    deps_common,
    {
      path: 'min-heap',
      files: ['min-heap.c', 'min-heap.h']
    }
  ],
  'search': [
    deps_common
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

module.exports.zh = {
  'stack': '栈',
  'stack-eval': '计算表达式',
  'queue': '队列',
  'queue-yanghui': '杨辉三角',
  'rb-tree': '红黑树',
  'huffman-tree': '哈夫曼树',
  'search': '搜索',
};

module.exports.en = {
  'stack': 'Stack',
  'stack-eval': 'Evaluate Expressions',
  'queue': 'Queue',
  'queue-yanghui': 'Yang Hui\'s Triangle',
  'rb-tree': 'Red Black Tree',
  'huffman-tree': 'Huffman Tree',
  'search': 'Array Search',
};
