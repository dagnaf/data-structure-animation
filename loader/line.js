module.exports = function (content) {
  this.cacheable && this.cacheable();
  return content.split('\n').map(function (s,i) {
    return s.replace(/stop\(line/g, 'stop('+(i+1));
  }).join('\n');
}
