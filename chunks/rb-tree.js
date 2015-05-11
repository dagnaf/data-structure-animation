webpackJsonpdsa([3],{9:function(t,n,e){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include "./util.h"</span>\n\nvoid* SafeMalloc(size_t size) {\n    void* m;\n    <span class="keyword">if</span> ((m = malloc(size))) {\n        <span class="keyword">return</span> m;\n    } <span class="keyword">else</span> {\n        printf(<span class="string">"memory overflow\\n"</span>);\n        <span class="keyword">exit</span>(-<span class="number">1</span>);\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n}\n\n<span class="comment">// FIXME</span>\n<span class="comment">//   stack,queue and other dsa should use dynamically</span>\n<span class="comment">//   allocated memory, which is what util.c provides.</span>\n<span class="comment">//   Also should be included in model-file descripttions.</span>'},10:function(t,n,e){t.exports='<span class="comment">#ifndef UTIL_H</span>\n<span class="comment">#define UTIL_H</span>\n\n<span class="comment">#include &lt;stddef.h></span>\n\nvoid * SafeMalloc(size_t size);\n\n<span class="comment">#endif</span>'},21:function(n,e,r){function a(){return{id:P++,nil:!0,key:"nil",color:O}}function s(t){k(),_(t),x(t,"left");var n;C(23,1),n=t.right,k(n,t),C(24,1),t.right=n.left,A(t,"right"),k(t,n.left),C(25,1),n.left.nil!==!0&&(C(26,1),n.left.p=t,A(n.left,"p"),k(n.left,t)),C(28,1),n.p=t.p,A(n,"p"),k(n,t.p),C(29,1),t.p.nil?(C(30,1),$.root=n,k(n)):(C(31,1),t===t.p.left?(C(32,1),t.p.left=n,A(t.p,"left")):(C(34,1),t.p.right=n,A(t.p,"right"))),C(36,1),n.left=t,A(n,"left"),k(n,t),C(37,1),t.p=n,A(t,"p"),k(t,n),C(37,1),k(),b(),L(),x()}function i(t){k(),_(t),x(t,"right");var n;C(42,1),n=t.left,k(n,t),C(43,1),t.left=n.right,A(t,"left"),k(t,n.right),C(44,1),n.right.nil!==!0&&(C(45,1),n.right.p=t,A(n.right,"p"),k(n.right,t)),C(47,1),n.p=t.p,A(n,"p"),k(n,t.p),C(48,1),t.p.nil?(C(49,1),$.root=n,k(n)):(C(50,1),t===t.p.right?(C(51,1),t.p.right=n,A(t.p,"right")):(C(53,1),t.p.left=n,A(t.p,"left"))),C(55,1),n.right=t,A(n,"right"),k(n,t),C(56,1),t.p=n,A(t,"p"),k(t,n),C(56,1),k(),b(),L(),x()}function o(t){for(var n;C(61,1),b(t),k(t,t.p),t.p.color===N;)C(62,1),b(t.p.p),t.p===t.p.p.left?(C(63,1),n=t.p.p.right,C(64,1),k(n),n.color===N?(C(65,1),t.p.color=O,w(t.p),k(n,t.p),C(66,1),n.color=O,w(n),C(67,1),t.p.p.color=N,w(t.p.p),k(n,t.p,t.p.p),C(68,1),t=t.p.p,k(t)):(C(70,1),k(t.p,t),t===t.p.right&&(C(71,1),t=t.p,k(t),C(72,1),s(t)),C(74,1),t.p.color=O,w(t.p),k(t.p),C(75,1),t.p.p.color=N,w(t.p.p),k(t.p.p),C(76,1),i(t.p.p))):(C(79,1),n=t.p.p.left,C(80,1),k(n),n.color===N?(C(81,1),t.p.color=O,w(t.p),k(n,t.p),C(82,1),n.color=O,w(n),C(83,1),t.p.p.color=N,w(t.p.p),k(n,t.p,t.p.p),C(84,1),t=t.p.p,k(t)):(C(86,1),k(t.p,t),t===t.p.left&&(C(87,1),t=t.p,k(t),C(88,1),i(t),k(),b(),L()),C(90,1),t.p.color=O,w(t.p),k(t.p),C(91,1),t.p.p.color=N,w(t.p.p),k(t.p.p),C(92,1),s(t.p.p),k(),b(),L()));C(96,1),$.root.color=O,L(),k(),b()}function l(t){var n,e;for(C(102),e=$.nil,C(103),n=$.root;C(104,1),b(n),n.nil!==!0;)C(105,1),e=n,C(106),t.key<n.key?(C(107,1),n=n.left,S(t,n)):(C(109,1),n=n.right,S(t,n));b(e),C(112,1),t.p=e,A(t,"p"),C(113,1),e===$.nil?(C(114,1),$.root=t):(C(115,1),t.key<e.key?(C(116,1),e.left=t,A(e,"left")):(C(118,1),e.right=t,A(e,"right"))),b(t),C(120,1),t.left=a(),L(),A(t,"left"),C(121,1),t.right=a(),L(),A(t,"right"),C(122,1),t.color=N,w(t),A(),C(123,1),o(t)}function c(t){var n={};C(128),n.id=P++,C(129),n.key=t,S(n,$.root),C(130,1),l(n)}function p(t,n){_(n),C(134,1),t.p.nil?(C(135,1),$.root=n):(C(136,1),t===t.p.left?(C(137,1),t.p.left=n,A(t.p,"left"),k(t.p,n)):(C(139,1),t.p.right=n,A(t.p,"right"),k(t.p,n))),C(141,1),n.p=t.p,A(n,"p"),k(n,t.p),D(n,t),C(141,1),b(),k()}function u(n,e){k(n);for(var r,a;C(147,1),k(n),n!==$.root&&n.color===O;)C(148,1),n===n.p.left?(C(149,1),a=n.p.right,C(150,1),k(n,a),a.color===N&&(C(151,1),a.color=O,w(a),k(n,a),C(152,1),n.p.color=N,w(n.p),E(n,a,n.p),C(153,1),s(n.p),k(n),S(e,n),C(154,1),a=n.p.right),C(156,1),k(n,a.left,a.right),a.left.color===O&&a.right.color===O?(C(157,1),a.color=N,w(a),E(a),C(158,1),n=n.p,k(n),S(e,n)):(C(160,1),k(n,a.right),a.right.color===O&&(C(161,1),a.left.color=O,w(a.left),E(a.left),C(162,1),a.color=N,w(a),E(a),C(163,1),i(a),k(n),S(e,n),C(164,1),a=n.p.right),C(166,1),r=n.p.color,S(e,n.p),E(n.p),C(167,1),n.p.color=O,w(n.p),e.color=r,S(e,n.p),C(168,1),a.color=r,w(a),E(a),e.color=O,S(e,a),C(169,1),a.right.color=O,w(a.right),E(a.right),e.color=N,S(e,a.right),C(170,1),s(n.p),k(a.right),S(e,a.right),C(171,1),n=$.root,k(n))):(C(174,1),a=n.p.left,C(175,1),k(n,a),a.color===N&&(C(176,1),a.color=O,w(a),k(n,a),C(177,1),n.p.color=N,w(n.p),E(n,a,n.p),C(178,1),i(n.p),k(n),S(e,n),C(179,1),a=n.p.left),C(181,1),k(n,a.left,a.right),a.right.color===O&&a.left.color===O?(C(182,1),a.color=N,w(a),E(a),C(183,1),n=n.p,k(n),S(e,n)):(C(185,1),k(n,a.left),a.left.color===O&&(C(186,1),a.right.color=O,w(a.right),E(a.right),C(187,1),a.color=N,w(a),E(a),C(188,1),s(t,a),k(n),S(e,n),C(189,1),a=n.p.left),C(191,1),r=n.p.color,E(n.p),C(192,1),n.p.color=O,w(n.p),e.color=r,S(e,n.p),C(193,1),a.color=r,w(a),E(a),e.color=O,S(e,a),C(194,1),a.left.color=O,w(a.left),E(a.left),E(a.left),e.color=N,S(e,a.left),C(195,1),i(n.p),k(a.right),S(e,a.right),C(196,1),n=$.root,k(n)));C(200,1),n.color=O,w(n),S()}function f(t,n){var e={id:n,key:"min"};for(S(e,t),k(t);C(204,1),E(t.left),t.left.nil!==!0;)C(205,1),t=t.left,k(t),S(e,t);return C(207,1),k(t),t}function h(t){b(t),k(t);var n,e,r,a={id:P++,extra:!0,key:""};C(214,1),e=t,S(a,t),C(215,1),r=e.color,a.color=e.color,S(a,t),C(216,1),k(t,t.left),t.left.nil?(C(217,1),n=t.right,k(t),C(218,1),p(t,t.right),L()):(C(219,1),k(t,t.right),t.right.nil?(C(220,1),n=t.left,k(t),C(221,1),p(t,t.left),L()):(k(t),C(223,1),e=f(t.right,a.id),delete a.color,S(a,e),k(e),C(224,1),r=e.color,a.color=e.color,S(a,e),C(225,1),n=e.right,C(226,1),e.p===t?(C(227,1),n.p=e,A(n,"p"),E(n)):(C(229,1),p(e,e.right),k(e),C(230,1),e.right=t.right,A(e,"right"),k(e,t.right),D(e,t),C(231,1),e.right.p=e,A(e.right,"p")),C(233,1),p(t,e),k(e),C(234,1),e.left=t.left,A(e,"left"),k(e,t.left),C(235,1),e.left.p=e,A(e.left,"p"),k(e.left,e),C(236,1),e.color=t.color,w(e),L())),S(a,n),b(),k(),C(238,1),k(a),r===O&&(C(239,1),u(n,a)),C(240,1),S(),k(),b()}function d(t,n){var e={id:P++,key:n};for(S(e,$.root);C(244,1),b(t),t.nil!==!0&&n!==t.key;)C(245,1),n<t.key?(C(246,1),t=t.left,S(e,t)):(C(248,1),t=t.right,S(e,t));return b(),k(t),C(251,1),S(),t}function m(t){C(255,1),M=d($.root,t),C(256,1),S({id:P,key:M.nil!==!0?t:"X"},M)}function y(t){C(259,1);var n=d($.root,t);C(260,1),n.nil!==!0&&(C(261,1),h(n)),k(),b()}function g(t,n){n.key="递归",S(n,t),C(266,1),t.nil!==!0&&(C(267,1),g(t.left,n),n.key="回溯",S(n,t),C(268,1),E(t),C(269,1),g(t.right,n),n.key="回溯",S(n,t),C(270,1)),C(271,1)}function v(){var t={id:P++,key:"指针"};k(t),C(274,1),g($.root,t),C(275,1),t.key="完成",S(t,$.root)}function x(t,n){if(void 0===t)z.ro=void 0;else{var e="left"===n?"right":"left",r=[t.id,t[e].id,t[e][e].id,t[e][n].id,t[n].id];z.ro={ids:r,type:n}}}function w(t){void 0===t?z.co={}:(z.co=z.co||{},z.co[t.id]=t.color)}function _(t){z.hls.push(t.id)}function b(t){z.hls.pop(),void 0!==t&&_(t)}function k(){0===arguments.length?z.hl=[]:z.hl=Array.prototype.map.call(arguments,function(t){return t.id})}function E(t){z.hl.push(t.id)}function A(t,n){if(void 0===t)z.ne={};else{var e=t.id+n;z.ne=z.ne||{},z.ne[e]=t[n].id,z.ne.curr=e}}function D(t,n){void 0===t?z.np={}:(z.np=z.np||{},z.np[t.id]=n.id)}function S(t,n){0===arguments.length?z.nn=void 0:z.nn={id:t.id,key:t.key,color:t.color,ref:n.id,extra:t.extra}}function L(){w(),A(),D(),S(),z.lastTree=B($)}function T(){}function C(t,n,e){1===n&&(lastStatus=z.clone()),I.push({status:lastStatus,line:t,animation:e,id:U}),U++}function R(){C(I[I.length-1].line,1)}var M,B=r(4),I=[],U=0,z={},P=0,N=1,O=0,$={nil:a()};$.root=$.nil,z.clone=function(){return void 0===this.lastTree&&(this.lastTree=B($)),{tree:this.lastTree,hl:B(this.hl)||[],hls:B(this.hls)||[],ne:B(this.ne)||{},np:B(this.np)||{},nn:B(this.nn),co:B(this.co)||{},ro:B(this.ro)||void 0}},z.init=function(t){t&&($.root=$.nil),this.hl=[],this.hls=[],this.ne={},this.np={},this.nn=void 0,this.co={},this.ro=void 0},lastStatus={},n.exports={getInitialDescriptions:function(){return this.initialize(!0),c(10),c(1),c(2),c(3),c(4),c(5),this.run("insert","6")},initialize:function(t){return I=[],U=0,z.init(t),lastStatus=z.clone(),this},insert:c,inorder:v,"delete":y,search:m,check:T,run:function(t,n){return this.initialize()[t](isNaN(parseInt(n))?0:parseInt(n)),R(),{frames:I,others:{}}}}},40:function(t,n,e){var r=e(1),a=e(2);t.exports=r.createClass({displayName:"module.exports",getInitialState:function(){return{text:""}},render:function(){return r.createElement("div",{className:"list"},r.createElement("input",{onChange:this._onChange,value:this.state.text,placeholder:"整数"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"insert"),value:"插入"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"delete"),value:"删除"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"search"),value:"查找"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"inorder"),value:"中序遍历"}))},_onChange:function(t){this.setState({text:t.target.value})},_onClick:function(t){a.runDemo(t,this.state.text)}})},59:function(t,n,e){t.exports="CC=gcc\nCFLAGS=-c -Wall\nLDFLAGS=\nSOURCES=test.c rb-tree.c rb-tree.h ../common/util.c ../common/util.h\nOBJECTS=$(SOURCES:.c=.o)\nEXECUTABLE=a.out\n\nall: $(SOURCES) $(EXECUTABLE)\n\n$(EXECUTABLE): $(OBJECTS)\n    $(CC) $(LDFLAGS) $(OBJECTS) -o $@\n\n.cpp.o:\n    $(CC) $(CFLAGS) $&lt; -o $@\n\nclean:\n    rm -rf *.o a.out"},60:function(t,n,e){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include "./rb-tree.h"</span>\n<span class="comment">#include "../common/util.h"</span>\n\nint _RED = <span class="number">1</span>;\nint _BLACK = <span class="number">0</span>;\n\nrb_tree * RBTreeCreate() {\n    rb_tree* newTree;\n    rb_tree_node* newNode;\n    newTree = (rb_tree*) SafeMalloc(sizeof(rb_tree));\n    newTree->nil = newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));\n    newNode->left = newNode->right = newNode->p = newNode;\n    newNode->key = <span class="number">0</span>;\n    newNode->color = _BLACK;\n    newTree->root = newTree->nil;\n    <span class="keyword">return</span> newTree;\n}\n\nvoid _LeftRotate(rb_tree* t, rb_tree_node* x) {\n    rb_tree_node* y;\n    y = x->right;\n    x->right = y->left;\n    <span class="keyword">if</span> (y->left != t->nil) {\n        y->left->p = x;\n    }\n    y->p = x->p;\n    <span class="keyword">if</span> (x->p == t->nil) {\n        t->root = y;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (x == x->p->left) {\n        x->p->left = y;\n    } <span class="keyword">else</span> {\n        x->p->right = y;\n    }\n    y->left = x;\n    x->p = y;\n}\n\nvoid _RightRotate(rb_tree* t, rb_tree_node* y) {\n    rb_tree_node* x;\n    x = y->left;\n    y->left = x->right;\n    <span class="keyword">if</span> (x->right != t->nil) {\n        x->right->p = y;\n    }\n    x->p = y->p;\n    <span class="keyword">if</span> (y->p == t->nil) {\n        t->root = x;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (y == y->p->right) {\n        y->p->right = x;\n    } <span class="keyword">else</span> {\n        y->p->left = x;\n    }\n    x->right = y;\n    y->p = x;\n}\n\nvoid _InsertFixUp(rb_tree* t, rb_tree_node *z) {\n    rb_tree_node *y;\n    <span class="keyword">while</span> (z->p->color == _RED) {\n        <span class="keyword">if</span> (z->p == z->p->p->left) {\n            y = z->p->p->right;\n            <span class="keyword">if</span> (y->color == _RED) {\n                z->p->color = _BLACK;\n                y->color = _BLACK;\n                z->p->p->color = _RED;\n                z = z->p->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (z == z->p->right) {\n                    z= z->p;\n                    _LeftRotate(t, z);\n                }\n                z->p->color = _BLACK;\n                z->p->p->color = _RED;\n                _RightRotate(t, z->p->p);\n            }\n        } <span class="keyword">else</span> {\n            y = z->p->p->left;\n            <span class="keyword">if</span> (y->color == _RED) {\n                z->p->color = _BLACK;\n                y->color = _BLACK;\n                z->p->p->color = _RED;\n                z = z->p->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (z == z->p->left) {\n                    z= z->p;\n                    _RightRotate(t, z);\n                }\n                z->p->color = _BLACK;\n                z->p->p->color = _RED;\n                _LeftRotate(t, z->p->p);\n            }\n        }\n    }\n    t->root->color = _BLACK;\n}\n\nvoid _Insert(rb_tree* t, rb_tree_node* z) {\n    rb_tree_node* x;\n    rb_tree_node* y;\n    y = t->nil;\n    x = t->root;\n    <span class="keyword">while</span> (x != t->nil) {\n        y = x;\n        <span class="keyword">if</span> (z->key &lt; x->key) {\n            x = x->left;\n        } <span class="keyword">else</span> {\n            x = x->right;\n        }\n    }\n    z->p = y;\n    <span class="keyword">if</span> (y == t->nil) {\n        t->root = z;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (z->key &lt; y->key) {\n        y->left = z;\n    } <span class="keyword">else</span> {\n        y->right = z;\n    }\n    z->left = t->nil;\n    z->right = t->nil;\n    z->color = _RED;\n    _InsertFixUp(t, z);\n}\n\nvoid RBTreeInsert(rb_tree* t, int key) {\n    rb_tree_node* newNode;\n    newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));\n    newNode->key = key;\n    _Insert(t, newNode);\n}\n\nvoid _Transplant(rb_tree* t, rb_tree_node* u, rb_tree_node* v) {\n    <span class="keyword">if</span> (u->p == t->nil) {\n        t->root = v;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (u == u->p->left) {\n        u->p->left = v;\n    } <span class="keyword">else</span> {\n        u->p->right = v;\n    }\n    v->p = u->p;\n}\n\nvoid _DeleteFixUp(rb_tree* t, rb_tree_node* x) {\n    int tmp;\n    rb_tree_node* w;\n    <span class="keyword">while</span> (x != t->root &amp;&amp; x->color == _BLACK) {\n        <span class="keyword">if</span> (x == x->p->left) {\n            w = x->p->right;\n            <span class="keyword">if</span> (w->color == _RED) {\n                w->color = _BLACK;\n                x->p->color = _RED;\n                _LeftRotate(t, x->p);\n                w = x->p->right;\n            }\n            <span class="keyword">if</span> (w->left->color == _BLACK &amp;&amp; w->right->color == _BLACK) {\n                w->color = _RED;\n                x = x->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (w->right->color == _BLACK) {\n                    w->left->color = _BLACK;\n                    w->color = _RED;\n                    _RightRotate(t, w);\n                    w = x->p->right;\n                }\n                tmp = x->p->color;\n                x->p->color = _BLACK;\n                w->color = tmp;\n                w->right->color = _BLACK;\n                _LeftRotate(t, x->p);\n                x = t->root;\n            }\n        } <span class="keyword">else</span> {\n            w = x->p->left;\n            <span class="keyword">if</span> (w->color == _RED) {\n                w->color = _BLACK;\n                x->p->color = _RED;\n                _RightRotate(t, x->p);\n                w = x->p->left;\n            }\n            <span class="keyword">if</span> (w->right->color == _BLACK &amp;&amp; w->left->color == _BLACK) {\n                w->color = _RED;\n                x = x->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (w->left->color == _BLACK) {\n                    w->right->color = _BLACK;\n                    w->color = _RED;\n                    _LeftRotate(t,w);\n                    w = x->p->left;\n                }\n                tmp = x->p->color;\n                x->p->color = _BLACK;\n                w->color = tmp;\n                w->left->color = _BLACK;\n                _RightRotate(t, x->p);\n                x = t->root;\n            }\n        }\n    }\n    x->color =_BLACK;\n}\n\nrb_tree_node* _Minimum(rb_tree* t, rb_tree_node *z) {\n    <span class="keyword">while</span> (z->left != t->nil) {\n        z = z->left;\n    }\n    <span class="keyword">return</span> z;\n}\n\nvoid _Delete(rb_tree* t, rb_tree_node *z) {\n    rb_tree_node* x;\n    rb_tree_node* y;\n    int y_original_color;\n    y = z;\n    y_original_color = y->color;\n    <span class="keyword">if</span> (z->left == t->nil) {\n        x = z->right;\n        _Transplant(t, z, z->right);\n    } <span class="keyword">else</span> <span class="keyword">if</span> (z->right == t->nil) {\n        x = z->left;\n        _Transplant(t, z, z->left);\n    } <span class="keyword">else</span> {\n        y = _Minimum(t, z->right);\n        y_original_color = y->color;\n        x = y->right;\n        <span class="keyword">if</span> (y->p == z) {\n            x->p = y;\n        } <span class="keyword">else</span> {\n            _Transplant(t, y, y->right);\n            y->right = z->right;\n            y->right->p = y;\n        }\n        _Transplant(t, z, y);\n        y->left = z->left;\n        y->left->p = y;\n        y->color = z->color;\n    }\n    <span class="keyword">if</span> (y_original_color == _BLACK) {\n        _DeleteFixUp(t, x);\n    }\n}\n\nrb_tree_node* _Search(rb_tree* t, rb_tree_node* x, int k) {\n    <span class="keyword">while</span> (x != t->nil &amp;&amp; k != x->key) {\n        <span class="keyword">if</span> (k &lt; x->key) {\n            x = x->left;\n        } <span class="keyword">else</span> {\n            x = x->right;\n        }\n    }\n    <span class="keyword">return</span> x;\n}\n\nrb_tree_node* RBTreeSearch(rb_tree* t, int k) {\n    <span class="keyword">return</span> _Search(t, t->root, k);\n}\n\nvoid RBTreeDelete(rb_tree* t, int key) {\n    rb_tree_node* newNode = _Search(t, t->root, key);\n    <span class="keyword">if</span> (newNode != t->nil) {\n        _Delete(t, newNode);\n    }\n}\n\nvoid _InorderWalk(rb_tree* t, rb_tree_node* x) {\n    <span class="keyword">if</span> (x != t->nil) {\n        _InorderWalk(t, x->left);\n        printf(<span class="string">"%d "</span>, x->key);\n        _InorderWalk(t, x->right);\n    }\n}\n\nvoid RBTreeInorderWalk(rb_tree* t) {\n    _InorderWalk(t, t->root);\n    printf(<span class="string">"\\n"</span>);\n}\n\nvoid _Destroy(rb_tree* t, rb_tree_node* x) {\n    <span class="keyword">if</span> (x != t->nil) {\n        _Destroy(t, x->left);\n        _Destroy(t, x->right);\n        free(x);\n    }\n}\n\nvoid RBTreeDestroy(rb_tree* t) {\n    _Destroy(t, t->root);\n    free(t->nil);\n}'},61:function(t,n,e){t.exports='<span class="comment">#ifndef RB_TREE_H</span>\n<span class="comment">#define RB_TREE_H</span>\n\ntypedef struct rb_tree_node {\n    int key;\n    int color;\n    struct rb_tree_node* left;\n    struct rb_tree_node* right;\n    struct rb_tree_node* p;\n} rb_tree_node;\n\ntypedef struct rb_tree {\n    rb_tree_node* root;\n    rb_tree_node* nil;\n} rb_tree;\n\nrb_tree* RBTreeCreate();\nvoid RBTreeInsert(rb_tree*, int);\nvoid RBTreeDelete(rb_tree*, int);\nvoid RBTreeDestroy(rb_tree*);\nrb_tree_node* RBTreeSearch(rb_tree*, int);\nvoid RBTreeInorderWalk(rb_tree*);\n\n<span class="comment">#endif</span>'},62:function(t,n,e){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include "./rb-tree.h"</span>\n\nint main(int argc, char <span class="keyword">const</span> *argv[]) {\n  int i;\n  int k;\n  rb_tree* rbTree = RBTreeCreate();\n  <span class="keyword">while</span> (scanf(<span class="string">"%d"</span>, &amp;i) != EOF) {\n    scanf(<span class="string">"%d"</span>, &amp;k);\n    <span class="keyword">switch</span> (i) {\n      <span class="keyword">case</span> <span class="number">0</span>:\n        RBTreeInsert(rbTree, k);\n        <span class="keyword">break</span>;\n      <span class="keyword">case</span> <span class="number">1</span>:\n        RBTreeDelete(rbTree, k);\n        <span class="keyword">break</span>;\n      <span class="keyword">case</span> <span class="number">2</span>:\n        RBTreeSearch(rbTree, k);\n        <span class="keyword">break</span>;\n    }\n    RBTreeInorderWalk(rbTree);\n  }\n  RBTreeDestroy(rbTree);\n  <span class="keyword">return</span> <span class="number">0</span>;\n};'},80:function(t,n,e){function r(){return D.hls.length+1+(D.hl.length?1:0)}function a(t){if(void 0===t.color)return"deepskyblue";var n=B[t.id]+1,e=D.hls.length+1+(D.hl.length?1:0);return e>n&&(n=1),F[t.color](n/e)}function s(t){var n=Math.min(B[t.from],B[t.to])+1,e=D.hls.length+1+(D.hl.length?1:0);return e>n&&(n=1),L.interpolate(0,1)(n/e)}function i(t,n,e){C[t.id]=C[t.id]||{},C[t.id].curr=n}function o(t,n){var e=t.id,r=t[n]?t[n].id:void 0,a=e+n;return void 0!==D.ne[a]&&(r=D.ne[a]),{from:t.id,to:r,type:n,id:a,unconditional:t.nil}}function l(t){I.push(t.id);var n=t.color;return void 0!==D.co[t.id]&&(n=D.co[t.id]),{extra:t.extra,color:n,v:t.key,id:t.id}}function c(t,n){n=n||t.p.id,void 0===C[t.id].prev&&(void 0===C[n]?C[t.id].prev=C[t.id].curr:C[t.id].prev=C[n].prev||C[t.id].curr),(t.p||D.ne[t.id+"p"])&&M.push(o(t,"p")),t.id===D.hl&&(hide=!1),R.push(l(t)),t.left&&(M.push(o(t,"left")),c(t.left,t.id)),t.right&&(M.push(o(t,"right")),c(t.right,t.id)),t.id===D.hl&&(hide=!0)}function p(){R=[],M=[],I=[],B={},B[D.tree.nil.id]=-1===D.hl.indexOf(D.tree.nil.id)?0:r()-1,u(D.tree.root,0);for(var t in C)C[t].prev=C[t].curr;i(D.tree.nil,{x:0,y:1.5*-z}),C[D.tree.nil.id].prev=C[D.tree.nil.id].curr,D.tree.root.nil!==!0&&(i(D.tree.root,{x:0,y:0}),f(D.tree.root.left,0,0,-U,N),f(D.tree.root.right,0,0,U,N)),R.push(l(D.tree.nil)),D.tree.root.nil!==!0&&c(D.tree.root);var n={};for(var e in D.np)n[e]=C[D.np[e]].curr.y;for(var e in D.np)C[e].curr.y=n[e];D.nn&&(R.push(l(D.nn)),i(D.nn,{x:C[D.nn.ref].curr.x,y:C[D.nn.ref].curr.y-(D.nn.extra?z/3:z/2)},1),void 0===C[D.nn.id].prev&&(C[D.nn.id].prev=C[D.nn.ref].curr),void 0!==D.ne[D.nn.id+"p"]&&M.push(o(D.nn,"p")),-1!==D.hl.indexOf(D.nn.id)?B[D.nn.id]=r()-1:B[D.nn.id]=B[D.nn.ref]);for(var e=0;e<M.length;++e){var a=M[e].from,s=M[e].to,p=C[s].curr.x-C[a].curr.x,h=C[s].curr.y-C[a].curr.y,d=Math.sqrt(p*p+h*h),m=$*O;P+m>d?(M[e].dx=0,M[e].dy=0):(M[e].dx=p*(P+m)/d,M[e].dy=h*(P+m)/d)}Object.keys(C).filter(function(t){return-1===I.indexOf(+t)}).forEach(function(t){delete C[t]})}function u(t,n){-1!==D.hls.indexOf(t.id)&&(n=D.hls.lastIndexOf(t.id)+1),-1!==D.hl.indexOf(t.id)?B[t.id]=D.hls.length+1:B[t.id]=n,t.left&&u(t.left,n),t.right&&u(t.right,n)}function f(t,n,e,r,a){if(void 0!==t){var s,o;0>r?(s="right",o="left"):(s="left",o="right");var l=z;return t.nil||void 0===t[s]?i(t,{x:e+r,y:n+l}):i(t,{x:f(t[s],n+l,e,r,t.color)+r,y:n+l}),t.nil||void 0===t[o]?C[t.id].curr.x:f(t[o],n+l,C[t.id].curr.x,r,t.color)}}function h(){E.selectAll("circle.node").data(R,function(t){return t.id}).enter().append("circle").attr("class","node").attr("cx",function(t){return C[t.id].prev.x}).attr("cy",function(t){return C[t.id].prev.y}).attr("r",function(t){return t.extra?P/2:P}).style("fill",function(t){return t.color?"red":"black"}),E.selectAll("circle.node").data(R,function(t){return t.id}).transition().duration(S).attr("cx",function(t){return C[t.id].curr.x}).attr("cy",function(t){return C[t.id].curr.y}).attr("r",function(t){return t.extra?P/2:P}).style("fill",a),E.selectAll("circle.node").data(R,function(t){return t.id}).exit().transition().duration(S).style("opacity",0).remove()}function d(){A.selectAll("line.edge").data(M,function(t){return t.id}).enter().append("line").attr("class","edge").attr("stroke-width",O).attr("x1",function(t){return C[t.from].prev.x+t.dx}).attr("y1",function(t){return C[t.from].prev.y+t.dy}).attr("x2",function(t){return C[t.from].prev.x+t.dx}).attr("y2",function(t){return C[t.from].prev.y+t.dy}).classed("parent",function(t){return"p"===t.type?!0:!1}).classed("child",function(t){return"p"!==t.type?!0:!1}),A.selectAll("line.edge").data(M,function(t){return t.id}).style("marker-end",function(t){return t.id===D.ne.curr?"url(#"+t.type+"-end)":null}).transition().duration(S).attr("x1",function(t){return C[t.from].curr.x+t.dx}).attr("y1",function(t){return C[t.from].curr.y+t.dy}).attr("x2",function(t){return C[t.to].curr.x-t.dx}).attr("y2",function(t){return C[t.to].curr.y-t.dy}).style("opacity",s).style("stroke-dasharray",function(t){return t.unconditional?"5 5":null}),A.selectAll("line.edge").data(M,function(t){return t.id}).exit().transition().duration(S).style("opacity",0).remove()}function m(){b.selectAll("text.node").data(R,function(t){return t.id}).enter().append("text").attr("class","node").attr("x",function(t){return C[t.id].prev.x}).attr("y",function(t){return C[t.id].prev.y}).attr("dy",5),b.selectAll("text.node").data(R,function(t){return t.id}).transition().duration(S).attr("x",function(t){return C[t.id].curr.x}).attr("y",function(t){return C[t.id].curr.y}).style("fill",a).text(function(t){return t.v}),b.selectAll("text.node").data(R,function(t){return t.id}).exit().transition().duration(S).style("opacity",0).remove()}function y(){var t=D.ro?[D.ro.ids]:[];k.selectAll("path.rot").data(t).enter().append("path").attr("class","rot").attr("d",function(t){return this.__prev__=t,"M"+t.map(function(t){return[C[t].curr.x,C[t].curr.y]}).join("L")}).style("fill-opacity",.05).style("opacity",0).transition().duration(S).style("opacity",1),k.selectAll("path.rot").data(t).attr("d",function(t){return this.__prev__=t,"M"+t.map(function(t){return[C[t].curr.x,C[t].curr.y]}).join("L")}),k.selectAll("path.rot").data(t).exit().transition().duration(S).attr("d",function(){for(var t=this.__prev__,n=0;n<t.length;++n)if(void 0===C[t[n]])return"";return"M"+t.map(function(t){return[C[t].curr.x,C[t].curr.y]}).join("L")}).style("opacity",0).remove()}function g(){function t(t){return function(n){return n.reduce(function(n,e){return n+C[e].curr[t]},0)/n.length}}var n=D.ro?[D.ro.ids]:[];b.selectAll("text.rot").data(n).enter().append("text").attr("class","rot").attr("x",t("x")).attr("y",t("y")).attr("dy",5).text(function(){return"left"===D.ro.type?"左旋":"右旋"}).style("fill-opacity",.5),b.selectAll("text.rot").data(n).attr("x",t("x")).attr("y",t("y")).text(function(){return"left"===D.ro.type?"左旋":"右旋"}),b.selectAll("text.rot").data(n).exit().transition().duration(S).style("opacity",0).remove()}function v(t,n){D=t,S=n}function x(t,n){v(t,n),p(),d(),h(),m(),y(),g()}function w(){var t=this,n=L.behavior.zoom().scaleExtent([.1,10]).on("zoom",function(){t.svg.attr("transform",T().translate(L.event.translate).scale(L.event.scale))});this.svg=L.select(this.refs.svg.getDOMNode()).append("svg").call(n).append("g"),this.svg.append("defs").selectAll("marker").data(["left","right","p"]).enter().append("marker").attr("id",function(t){return t+"-end"}).attr("viewBox","0 -5 10 10").attr("markerWidth",$).attr("markerHeight",$).attr("orient","auto").append("path").attr("d","M0,-5L10,0,L0,5"),this.g=this.svg.append("g").attr("transform",T().translate(100,100).scale(1)),this.ghigh=this.g.append("g").attr("class","high"),this.gbase=this.g.append("g").attr("class","base"),this.gtext=this.g.append("g").attr("class","text"),_=this.gbase,A=this.gbase.append("g").attr("class","edges"),E=this.gbase.append("g").attr("class","nodes"),b=this.gtext,k=this.ghigh}var _,b,k,E,A,D,S,L=e(3),T=e(5),C={},R=[],M=[],B={},I=[],U=35,z=70,P=15,N=0,O=3,$=2,F=[L.interpolateRgb("white","black"),L.interpolateRgb("white","red")];t.exports={init:w,render:x}}});