var _ = require('underscore'); var clone = require('clone'); var frames = []; var stopid = 0; var rc;
var nums = []; var ops = []; var str = '';


               var prior = function (instack, coming) {
                 if (stop(line),instack === '+' || instack === '-') {_row(instack);
stop(line,1);     if (coming == '+' || coming == '-' || coming === ')') { _row(coming);
stop(line,1);      return 1;
                 } else { _row(coming);
stop(line,1);      return -1;
                 }
                 } else if (stop(line,1),instack === '*' || instack === '/') { _row(instack);
stop(line,1);     if (coming === '(') {_row(coming);
stop(line,1);      return -1;
                 } else { _row(coming);
stop(line,1);      return 1;
                 }
                 } else if (stop(line,1),instack === '(') {_row(instack);
stop(line,1);     if (coming === ')') {_row(coming);
stop(line,1);      return 0;
                 } else { _row(coming);
stop(line,1);      return -1;
                 }
                 }
stop(line,1);    return -1;
               };

      var poppush = function(nums, ops) {
        var a;
        var b;
        var op;
stop(line,0);   a = _.last(nums); _peak(0,a);
stop(line,1);   nums.pop();
stop(line,1);   b = _.last(nums); _peak(0,b);
stop(line,1);   nums.pop();
stop(line,1);   op = _.last(ops); _peak(1,op);
stop(line,1);   ops.pop();
stop(line,1);   switch(op) {
          case '+': stop(line); nums.push(a+b); break;
          case '-': stop(line); nums.push(b-a); break;
          case '*': stop(line); nums.push(a*b); break;
          case '/': stop(line); nums.push(Math.floor(b/a)); break;
          default: stop(line); break;
        }  _peak();
      };

      var evaluate = function(str) {
        var i;
stop(line);   nums = []; _addStack(nums);
stop(line,1);
stop(line);   ops = []; _addStack(ops);
stop(line,1);
        for (i = 0;stop(line,1),_inc(i),str.length != 0; str = str.slice(1), ++i) {
stop(line,1);     if ('0' <= str[0] && str[0] <= '9') {
stop(line);       nums.push(str[0] - '0');
          } else {
            while ((stop(line,1),ops.length !== 0) && (rc=prior(_.last(ops), str[0]), stop(line,1),_row(0),rc) === 1) {
stop(line,1);         poppush(nums, ops);
            }
stop(line,1);       if (str[0] === ')') {
stop(line);         ops.pop();
            } else {
stop(line);         ops.push(str[0]);
            }
          }
        }//_inc();
        while (stop(line,1),ops.length !== 0) {
stop(line,1);     poppush(nums, ops);
        }
stop(line); _peak(0,_.last(nums));  return _.last(nums);
      };
// ===================================

currentStatus = {};
lastStatus = {};

function _addStack(s) {
  currentStatus.stack.push(s);
}
function _inc(i) {
  currentStatus.iter[0] = i;
  if (i === undefined) currentStatus.iter = [];
}
function _row(r) {
  currentStatus.table.push(r);
  if (r === 0) currentStatus.table = [];
}
function _peak(i, a) {
  if (i === undefined) {
    currentStatus.peak = [];
  } else {
    if (currentStatus.peak[i] === undefined)
      currentStatus.peak[i] = [];
    currentStatus.peak[i].push(a);
  }
}

function stop(l, i, animation) {
  if (i === 1) {
    lastStatus = clone(currentStatus);
  }
  frames.push({
    status: lastStatus,
    line: l,
    animation: animation,
    id: stopid
  });
  stopid++;
}

function over() {
  stop(_.last(frames).line, 1);
}

module.exports = {
  initialize: function () {
    frames = [];
    stopid = 0;
    currentStatus = {
      stack: [],
      iter: [],
      peak: [],
      table: []
    };
    lastStatus = clone(currentStatus);
    return this;
  },
  eval: function (str) {
    evaluate(str);
    over();
    return {
      frames: frames,
      others: {
        string: (str.trim()+'=').split('')
      }
    };
  }
};
