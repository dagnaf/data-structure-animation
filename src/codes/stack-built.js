module.exports = function (save) {var N = 100;
var Stack = function() {    this.top = 0;    this.data = new Array(N);};
var Expression = function(s) {    this.str = s;    this.ptr = s;};
            Stack.prototype.init = function() {
save(5);      this.top = 0;
            };

            Stack.prototype.isFull = function() {
save(9);     if (this.top === N) {
save(10);         return 1;
                } else {
save(12);         return 0;
                }
            };

            Stack.prototype.isEmpty = function() {
save(17);     if (this.top === 0) {
save(18);         return 1;
                } else {
save(20);         return 0;
                }
            };

            Stack.prototype.push = function(val) {
save(25);     if (this.isFull() === 1) {
save(26);         console.log('stack full.');
                } else {
save(28);         this.data[this.top] = val;
save(29);         this.top = this.top + 1;
                }
            };

            Stack.prototype.pop = function() {
save(34);     if (this.isEmpty() === 1) {
save(35);         console.log('stack empty.');
                } else {
save(37);         this.top = this.top - 1;
                }
            };

            Stack.prototype.peak = function() {
save(42);     if (this.isEmpty() === 1) {
save(43);         console.log('stack empty.');
save(44);         return -1;
                } else {
save(46);         return this.data[this.top - 1];
                }
            };

            var prior = function(instack, coming) {
save(51);     if (instack === '+' || instack === '-') {
save(52);         if (coming == '+' || coming == '-' || coming === ')') {save(52);return 1;}
                    else {save(53);return -1;}
save(54);     } else if (instack === '*' || instack === '/') {
save(55);         if (coming === '(') {save(55);return -1;}
                    else {save(56);return 1;}
save(57);     } else if (instack === '(') {
save(58);         if (coming === ')') {save(58);return 0;}
                    else {save(59);return -1;}
                }
save(61);     return -1;
            };

            var poppush = function(nums, ops) {
                var a;
                var b;
                var op;
save(68);     a = nums.peak();
save(69);     nums.pop();
save(70);     b = nums.peak();
save(71);     nums.pop();
save(72);     op = ops.peak();
save(73);     ops.pop();
save(74);     if (a === 0 && op === '/') {
save(75);         console.log('divided by zero.\n');
save(76);         return;
                }
save(78);     switch(op) {
                    case '+': save(79); nums.push(a+b); break;
                    case '-': save(80); nums.push(b-a); break;
                    case '*': save(81); nums.push(a*b); break;
                    case '/': save(82); nums.push(Math.round(b/a)); break;
                    default: save(83); break;
                }
            };

            Expression.prototype.eval = function() {
                var i;var tmp;
save(89);     var nums = new Stack();
save(90);     nums.init();
save(91);     var ops = new Stack();
save(92);     ops.init();
                for (;save(93),this.ptr.length != 0; this.ptr = this.ptr.slice(1)) {
save(94);         if ('0' <= this.ptr[0] && this.ptr[0] <= '9') {
save(95);             nums.push(this.ptr[0] - '0');
                    } else {
                        while ((save(97),ops.isEmpty() === 0) && ((save(97),tmp=ops.peak(),save(97),prior(tmp), this.ptr[0])) === 1) {
save(98);                 poppush(nums, ops);
                        }
save(100);            if (this.ptr[0] === ')') {
save(101);                ops.pop();
                       } else {
save(103);                ops.push(this.ptr[0]);
                       }
                   }
               }
               while (save(107),ops.isEmpty() === 0) {
save(108);        poppush(nums, ops);
               }
save(110);     tmp = nums.peak(); save(110);return tmp;
            };

// var str;
// str = '3*5+(1+2)+(1-(2*4/(3+7))-4)/7+2';
// expr.str = str;
// expr.ptr = expr.str
// var val = expr.eval();
// console.log('%s=%d', str, val);

    return {
        eval: function(str) {
            var expr = new Expression(str);
            var val = expr.eval();
            console.log('%s=%d', str, val);
            return val;
        }
    }

}
