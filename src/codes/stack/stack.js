var _nothing = function () {},globalData = undefined,N = 5;



        var init = function() {
li(ne,'init-top');  this.data = []; il(this.data);
        };

        var isFull = function() {
li(ne); if (this.data.length === N) {
li(ne);     return 1;
            } else {
li(ne);     return 0;
            }
        };

        var isEmpty = function() {
li(ne); if (this.data.length === 0) {
li(ne);     return 1;
            } else {
li(ne);     return 0;
            }
        };

        var push = function(val) {
li(ne); if (this.isFull() === 1) {
li(ne,'push-full');     console.log('stack full.');
                        } else {
li(ne,'push-ok');     this.data.push(val); il(this.data);
            }
        };

        var pop = function() {
li(ne); if (this.isEmpty() === 1) {
li(ne,'pop-empty');     console.log('stack empty.');
            } else {
li(ne,'pop-top');     this.data.pop(); il(this.data);
            }
        };

        var peak = function() {
li(ne); if (this.isEmpty() === 1) {
li(ne,'peak-empty');     console.log('stack empty.');
li(ne);     return -1;
            } else {
li(ne,'peak-val');     return this.data[this.data.length - 1];
            }
        };
// ================================================== //
var _ = require('underscore');
var Stack = function () {
    this.data = [];
};
Stack.prototype.init = init;
Stack.prototype.isEmpty = isEmpty;
Stack.prototype.isFull = isFull;
Stack.prototype.push = push;
Stack.prototype.pop = pop;
Stack.prototype.peak = peak;

li = function (line, name, inbetween) {
    frames.push({
        line: line,
        name: name,
        before: globalData,
        inbetween: inbetween,
    });
}
il = function (data) {
    globalData = _.clone(data);
}

var frames = [];
var defaultStack = new Stack();
defaultStack.push(50);
defaultStack.push(100);
defaultStack.push(0);
li(_.last(frames).line);

module.exports = {
    Stack: Stack,
    defaultStack: defaultStack,
    getBreakpoints: function () {
        li(_.last(frames).line);
        return frames;
    },
    getInitialFrame: function () {
        return _.last(frames);
    },
    reset: function (hard) {
        if (hard) {
            delete defaultStack;
            defaultStack = new Stack();
            il(defaultStack.data);
        }
        delete frames;
        frames = [];
    },
    nullify: function () {
        il = il = _nothing;
    }
}

// init: draw stack, two blocks, top and max, transition pan
// push: draw block on top of the stack, transition down,
//   top up one block. if stack full, deny with max
// pop: transition up, top down one block. if stack empty, deny with
//   top
// peak: copy and transition up, remove

// background: stackoutline
// background-text: top/max
// foreground: stack
// foreground-text:
// push(10)
