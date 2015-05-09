var word = ['毫秒', '秒', '分钟', '小时', '天', '个月', '年'];
var unit = [1000, 60, 60, 24, 30, 12];
Array.prototype.forEach.call(document.getElementsByClassName('time-ago'), function (e) {
  var date = e.getAttribute('title');
  var last = new Date(date);
  var now = new Date();
  var diff = [(now-last)];
  var ago = '';
  for (var i = 1; i < word.length; ++i) {
    diff.push(diff[i-1]/unit[i-1])
    if (Math.ceil(diff[i]) === 1) {
      if (word[i] === 'second') {
        ago += '刚刚更新';
      } else {
        var num = Math.floor(diff[i-1]);
        ago += num + word[i-1]+'前最后一次更新';
      }
      break;
    }
  }
  e.innerText = ago;
})
