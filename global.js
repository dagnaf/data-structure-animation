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
  'search',
  'sort',
  'hash',
  "graph-app",
  "mst"
];
function Deps(path, name) {
  name = name || path;
  return {
    path: path,
    files: [name+'.c', name+'.h']
  }
}
var common_util = Deps('common', 'util');
var common_graph = Deps('common', 'graph');
module.exports.deps = {
  'stack': [common_util],
  'stack-eval': [Deps('stack'),common_util],
  'queue': [common_util],
  'queue-yanghui': [Deps('queue'),common_util],
  'rb-tree': [common_util],
  'huffman-tree': [Deps('min-heap'),common_util],
  'search': [common_util],
  'sort': [common_util],
  'hash': [common_util],
  "graph-app": [common_graph,Deps('stack'),Deps('queue'),common_util],
  "mst": [common_graph,Deps('min-heap'),common_util],
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
  'search': '有序数组搜索',
  'sort': '数组排序',
  'hash': '散列',
  "graph-app": "图",
  "mst": "最小生成树",
};

module.exports.en = {
  'stack': 'Stack',
  'stack-eval': 'Evaluate Expressions',
  'queue': 'Queue',
  'queue-yanghui': 'Yang Hui\'s Triangle',
  'rb-tree': 'Red Black Tree',
  'huffman-tree': 'Huffman Tree',
  'search': 'Sorted Array Search',
  'sort': 'Array Sort',
  'hash': 'Hash',
  "graph-app": "Graph",
  "mst": "Minimum Spanning Tree",
};
