var li = il = function () {},globalData = undefined,N = 5;
var Stack = require('./Stack').Stack;



            var prior = function (instack, coming) { an(imation);
li(ne);     if (instack === '+' || instack === '-') {
li(ne);         if (coming == '+' || coming == '-' || coming === ')') {li(ne);return 1;}
                    else {li(ne);return -1;}
li(ne);     } else if (instack === '*' || instack === '/') {
li(ne);         if (coming === '(') {li(ne);return -1;}
                    else {li(ne);return 1;}
li(ne);     } else if (instack === '(') {
li(ne);         if (coming === ')') {li(ne);return 0;}
                    else {li(ne);return -1;}
                }
li(ne);     return -1;
            };

            var poppush = function(nums, ops) { an(imation);
                var a;
                var b;
                var op;
li(ne);     a = nums.peak();
li(ne);     nums.pop();
li(ne);     b = nums.peak();
li(ne);     nums.pop();
li(ne);     op = ops.peak();
li(ne);     ops.pop();
li(ne);     if (a === 0 && op === '/') {
li(ne);         console.log('divided by zero.\n');
li(ne);         return;
                }
li(ne);     switch(op) {
                    case '+': li(ne); nums.push(a+b); break;
                    case '-': li(ne); nums.push(b-a); break;
                    case '*': li(ne); nums.push(a*b); break;
                    case '/': li(ne); nums.push(Math.round(b/a)); break;
                    default: li(ne); break;
                }
            };

            var eval = function(str) {
            var i;
li(ne);     var nums = Stack();
li(ne);     nums.init();
li(ne);     var ops = Stack();
li(ne);     ops.init();
                for (;li(ne),str.length != 0; str = str.slice(1)) {
li(ne);         if ('0' <= str[0] && str[0] <= '9') {
li(ne);             nums.push(str[0] - '0');
                    } else {
                        while ((li(ne),ops.isEmpty() === 0) && (li(ne),prior((li(ne),ops.peak()), str[0])) === 1) {
li(ne);                 poppush(nums, ops);
                        }
li(ne);             if (str[0] === ')') {
li(ne);                 ops.pop();
                        } else {
li(ne);                 ops.push(str[0]);
                        }
                    }
                }
                while (li(ne),ops.isEmpty() === 0) {
li(ne);         poppush(nums, ops);
                }
li(ne);         tmp = nums.peak(); li(ne); return tmp;
            };

var set = function (li, an) {
    li = li || function () {};
    an = an || function () {};
}

module.exports = {
    set: set,
    eval: function (str) {
        set()
        eval(str);
    }
}
