var _ = require('underscore'); var clone = require('clone'); var stop = function () {}; var _resultDatum = []; var stopid = 0; var rc;
var nums = []; var ops = []; var str = '';


               var prior = function (instack, coming) {
stop(line),_row(instack);    if (instack === '+' || instack === '-') {
stop(line),_col(coming);     if (coming == '+' || coming == '-' || coming === ')') {
stop(line); _row(0),_col(0);     return 1;
                 } else {
stop(line); _row(0),_col(0);     return -1;
                 }
                 } else if (stop(line),_row(instack),instack === '*' || instack === '/') {
stop(line,1),_col(coming);     if (coming === '(') {
stop(line); _row(0),_col(0);     return -1;
                 } else {
stop(line); _row(0),_col(0);     return 1;
                 }
                 } else if (stop(line),_row(instack),instack === '(') {
stop(line),_col(coming);     if (coming === ')') {
stop(line); _row(0),_col(0);     return 0;
                 } else {
stop(line); _row(0),_col(0);     return -1;
                 }
                 }
stop(line); _row(0),_col(0);   return -1;
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
          case '/': stop(line); nums.push(Math.round(b/a)); break;
          default: stop(line); break;
        }  _peak();
      };

      var evaluate = function(str) {
        var i;
stop(line);   nums = []; _addstack(nums);
stop(line,1);
stop(line);   ops = []; _addstack();
stop(line,1);
        for (i = 0;stop(line),_inci(),str.length != 0; str = str.slice(1), ++i) {
stop(line,1);     if ('0' <= str[0] && str[0] <= '9') {
stop(line);       nums.push(str[0] - '0');
          } else {
            while ((stop(line,1),ops.length !== 0) && (rc=prior(_.last(ops), str[0]), stop(line,1),rc) === 1) {
stop(line,1);         poppush(nums, ops);
            }
stop(line,1);       if (str[0] === ')') {
stop(line);         ops.pop();
            } else {
stop(line);         ops.push(str[0]);
            }
          }
        }
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
function _inci() {
  currentStatus.iter++;
}
function _row(r) {
  currentStatus.row = r;
}
function _col(c) {
  currentStatus.col = c;
}
function _peak(i, a) {
  if (i === undefined) {
    currentStatus.peak = [];
  } else {
    currentStatus.peak.push({i: 0, v: a});
  }
}

function stop(line, i, animation) {
  if (i === 1) {
    lastStatus = clone(currentStatus);
  }
  frames.push({
  status: lastStatus,
  line: line,
  animation: animation,
  id: stopid
  }
  stopid++;
}

function over() {
  stop(_.last(frames).line, 1);
}

module.exports = {
  initialize: function () {
    currentStatus = {
      stack: [],
      iter: -1,
      peak: [],
      row: 0,
      col: 0
    };
    lastStatus = clone(currentStatus);
    return this;
  },
  eval: function (str) {
    str = args;
    evaluate(str);
    return {
      frames: frames,
      others: {
        string: str;
      }
    };
  }
};

// prior = {
//   '+': { '+': '>', '-': '>', '*': '<', '/': '<', '(': '<', ')': '>' },
//   '-': { '+': '>', '-': '>', '*': '<', '/': '<', '(': '<', ')': '>' },
//   '*': { '+': '>', '-': '>', '*': '>', '/': '>', '(': '<', ')': '>' },
//   '/': { '+': '>', '-': '>', '*': '>', '/': '>', '(': '<', ')': '>' },
//   '(': { '+': '<', '-': '<', '*': '<', '/': '<', '(': '<', ')': '<' },
//   '/': { '+': '/', '-': '/', '*': '/', '/': '/', '(': '/', ')': '/' },
//   }
// }
