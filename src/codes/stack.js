module.exports = function (save) {var N = 100;
var Stack = function() {    this.top = 0;    this.data = new Array(N);};
var Expression = function(s) {    this.str = s;    this.ptr = s;};
            Stack.prototype.init = function() {
save(line);      this.top = 0;
            };

            Stack.prototype.isFull = function() {
save(line);     if (this.top === N) {
save(line);         return 1;
                } else {
save(line);         return 0;
                }
            };

            Stack.prototype.isEmpty = function() {
save(line);     if (this.top === 0) {
save(line);         return 1;
                } else {
save(line);         return 0;
                }
            };

            Stack.prototype.push = function(val) {
save(line);     if (this.isFull() === 1) {
save(line);         console.log('stack full.');
                } else {
save(line);         this.data[this.top] = val;
save(line);         this.top = this.top + 1;
                }
            };

            Stack.prototype.pop = function() {
save(line);     if (this.isEmpty() === 1) {
save(line);         console.log('stack empty.');
                } else {
save(line);         this.top = this.top - 1;
                }
            };

            Stack.prototype.peak = function() {
save(line);     if (this.isEmpty() === 1) {
save(line);         console.log('stack empty.');
save(line);         return -1;
                } else {
save(line);         return this.data[this.top - 1];
                }
            };

            var prior = function(instack, coming) {
save(line);     if (instack === '+' || instack === '-') {
save(line);         if (coming == '+' || coming == '-' || coming === ')') {save(line);return 1;}
                    else {save(line);return -1;}
save(line);     } else if (instack === '*' || instack === '/') {
save(line);         if (coming === '(') {save(line);return -1;}
                    else {save(line);return 1;}
save(line);     } else if (instack === '(') {
save(line);         if (coming === ')') {save(line);return 0;}
                    else {save(line);return -1;}
                }
save(line);     return -1;
            };

            var poppush = function(nums, ops) {
                var a;
                var b;
                var op;
save(line);     a = nums.peak();
save(line);     nums.pop();
save(line);     b = nums.peak();
save(line);     nums.pop();
save(line);     op = ops.peak();
save(line);     ops.pop();
save(line);     if (a === 0 && op === '/') {
save(line);         console.log('divided by zero.\n');
save(line);         return;
                }
save(line);     switch(op) {
                    case '+': save(line); nums.push(a+b); break;
                    case '-': save(line); nums.push(b-a); break;
                    case '*': save(line); nums.push(a*b); break;
                    case '/': save(line); nums.push(Math.round(b/a)); break;
                    default: save(line); break;
                }
            };

            Expression.prototype.eval = function() {
                var i;
save(line);     var nums = new Stack();
save(line);     nums.init();
save(line);     var ops = new Stack();
save(line);     ops.init();
                for (;save(line),this.ptr.length != 0; this.ptr = this.ptr.slice(1)) {
save(line);         if ('0' <= this.ptr[0] && this.ptr[0] <= '9') {
save(line);             nums.push(this.ptr[0] - '0');
                    } else {
                        while ((save(line),ops.isEmpty() === 0) && (save(line),prior((save(line),ops.peak()), this.ptr[0])) === 1) {
save(line);                 poppush(nums, ops);
                        }
save(line);             if (this.ptr[0] === ')') {
save(line);                 ops.pop();
                        } else {
save(line);                 ops.push(this.ptr[0]);
                        }
                    }
                }
                while (save(line),ops.isEmpty() === 0) {
save(line);         poppush(nums, ops);
                }
save(line);     return nums.peak();
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
