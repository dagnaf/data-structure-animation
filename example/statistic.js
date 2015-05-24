var fs = require("fs");
var path = require("path");
var contents = require("./contents.json");
var translation = require("./translation.json");
var global = require("../global");
var dsa_path = path.join(global.root, "src", "dsa");

function recurse(node, parent) {
  node.zh = translation[node.name].zh;
  node.en = translation[node.name].en;
  if (fs.existsSync(path.join(dsa_path, node.name))) {
    var csize = fs.statSync(path.join(dsa_path, node.name, node.name+".c")).size;
    var hsize = fs.statSync(path.join(dsa_path, node.name, node.name+".h")).size;
    node.size = Math.ceil(csize + hsize);
    node.href = true;
  } else {
    if (parent && parent.size > 0) {
      node.size = Math.ceil(parent.size/parent.children.length);
    }
  }
  var s = 0;
  if (node.children) {
    node.children.forEach(function (c) {
      recurse(c,node);
      s += c.size;
    });
  }
  if (node.size === undefined) {
    node.size = s;
  }
}

recurse(contents);
fs.writeFileSync(path.join(__dirname, "contents_sized.json"), JSON.stringify(contents));
console.log(contents);
