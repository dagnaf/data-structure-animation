webpackJsonpdsa([5],{6:function(n,t,e){n.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include &lt;string.h></span>\n<span class="comment">#include "./util.h"</span>\n\nvoid* SafeMalloc(size_t size) {\n    void* m;\n    <span class="keyword">if</span> ((m = malloc(size))) {\n        <span class="keyword">return</span> m;\n    } <span class="keyword">else</span> {\n        printf(<span class="string">"memory overflow\\n"</span>);\n        <span class="keyword">exit</span>(-<span class="number">1</span>);\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n}\n\nvoid MemoryCopy(void *a, <span class="keyword">const</span> void *b, size_t size) {\n    <span class="comment">// size_t i;</span>\n    <span class="comment">// size_t n = size / sizeof(char);</span>\n    <span class="comment">// for (i = 0; i &lt; n; ++i) {</span>\n    <span class="comment">//     *((char *)a + i) = *((char *)b + i);</span>\n    <span class="comment">// }</span>\n    memcpy(a, b, size);\n}\n\nvoid MemorySwap(void *a, void *b, size_t size) {\n    <span class="comment">// size_t i;</span>\n    <span class="comment">// size_t n = size / sizeof(char);</span>\n    <span class="comment">// char t;</span>\n    <span class="comment">// for (i = 0; i &lt; n; ++i) {</span>\n    <span class="comment">//     t = *(char *)a;</span>\n    <span class="comment">//     *((char *)a + i) = *((char *)b + i);</span>\n    <span class="comment">//     *((char *)b + i) = t;</span>\n    <span class="comment">// }</span>\n    void *t = SafeMalloc(size);\n    memcpy(t, a, size);\n    memcpy(a, b, size);\n    memcpy(b, t, size);\n}\n\nvoid MemoryClear(void *a, size_t size) {\n    memset(a, <span class="number">0</span>, size);\n}\n\nvoid *MemoryAddress(void *a, int i, size_t size) {\n    <span class="keyword">return</span> (char *)a + i*size;\n}'},7:function(n,t,e){n.exports='<span class="comment">#ifndef UTIL_H</span>\n<span class="comment">#define UTIL_H</span>\n\n<span class="comment">#include &lt;stddef.h></span>\n\nvoid * SafeMalloc(size_t size);\nvoid MemoryCopy(void *a, <span class="keyword">const</span> void *b, size_t size);\nvoid MemorySwap(void *a, void *b, size_t size);\nvoid MemoryClear(void *a, size_t size);\n\n<span class="comment">#endif</span>'},22:function(n,e,r){function s(){return{id:O++,nil:!0,key:"nil",color:P}}function a(n){b(),_(n),x(n,"left");var t;M(23,1),t=n.right,b(t,n),M(24,1),n.right=t.left,A(n,"right"),b(n,t.left),M(25,1),t.left.nil!==!0&&(M(26,1),t.left.p=n,A(t.left,"p"),b(t.left,n)),M(28,1),t.p=n.p,A(t,"p"),b(t,n.p),M(29,1),n.p.nil?(M(30,1),j.root=t,b(t)):(M(31,1),n===n.p.left?(M(32,1),n.p.left=t,A(n.p,"left")):(M(34,1),n.p.right=t,A(n.p,"right"))),M(36,1),t.left=n,A(t,"left"),b(t,n),M(37,1),n.p=t,A(n,"p"),b(n,t),M(37,1),b(),k(),C(),x()}function i(n){b(),_(n),x(n,"right");var t;M(42,1),t=n.left,b(t,n),M(43,1),n.left=t.right,A(n,"left"),b(n,t.right),M(44,1),t.right.nil!==!0&&(M(45,1),t.right.p=n,A(t.right,"p"),b(t.right,n)),M(47,1),t.p=n.p,A(t,"p"),b(t,n.p),M(48,1),n.p.nil?(M(49,1),j.root=t,b(t)):(M(50,1),n===n.p.right?(M(51,1),n.p.right=t,A(n.p,"right")):(M(53,1),n.p.left=t,A(n.p,"left"))),M(55,1),t.right=n,A(t,"right"),b(t,n),M(56,1),n.p=t,A(n,"p"),b(n,t),M(56,1),b(),k(),C(),x()}function o(n){for(var t;M(61,1),k(n),b(n,n.p),n.p.color===N;)M(62,1),k(n.p.p),n.p===n.p.p.left?(M(63,1),t=n.p.p.right,M(64,1),b(t),t.color===N?(M(65,1),n.p.color=P,w(n.p),b(t,n.p),M(66,1),t.color=P,w(t),M(67,1),n.p.p.color=N,w(n.p.p),b(t,n.p,n.p.p),M(68,1),n=n.p.p,b(n)):(M(70,1),b(n.p,n),n===n.p.right&&(M(71,1),n=n.p,b(n),M(72,1),a(n)),M(74,1),n.p.color=P,w(n.p),b(n.p),M(75,1),n.p.p.color=N,w(n.p.p),b(n.p.p),M(76,1),i(n.p.p))):(M(79,1),t=n.p.p.left,M(80,1),b(t),t.color===N?(M(81,1),n.p.color=P,w(n.p),b(t,n.p),M(82,1),t.color=P,w(t),M(83,1),n.p.p.color=N,w(n.p.p),b(t,n.p,n.p.p),M(84,1),n=n.p.p,b(n)):(M(86,1),b(n.p,n),n===n.p.left&&(M(87,1),n=n.p,b(n),M(88,1),i(n),b(),k(),C()),M(90,1),n.p.color=P,w(n.p),b(n.p),M(91,1),n.p.p.color=N,w(n.p.p),b(n.p.p),M(92,1),a(n.p.p),b(),k(),C()));M(96,1),j.root.color=P,C(),b(),k()}function c(n){var t,e;for(M(102),e=j.nil,M(103),t=j.root;M(104,1),k(t),t.nil!==!0;)M(105,1),e=t,M(106),n.key<t.key?(M(107,1),t=t.left,z(n,t)):(M(109,1),t=t.right,z(n,t));k(e),M(112,1),n.p=e,A(n,"p"),M(113,1),e===j.nil?(M(114,1),j.root=n):(M(115,1),n.key<e.key?(M(116,1),e.left=n,A(e,"left")):(M(118,1),e.right=n,A(e,"right"))),k(n),M(120,1),n.left=s(),C(),A(n,"left"),M(121,1),n.right=s(),C(),A(n,"right"),M(122,1),n.color=N,w(n),A(),M(123,1),o(n)}function l(n){var t={};M(128),t.id=O++,M(129),t.key=n,z(t,j.root),M(130,1),c(t)}function p(n,t){_(t),M(134,1),n.p.nil?(M(135,1),j.root=t):(M(136,1),n===n.p.left?(M(137,1),n.p.left=t,A(n.p,"left"),b(n.p,t)):(M(139,1),n.p.right=t,A(n.p,"right"),b(n.p,t))),M(141,1),t.p=n.p,A(t,"p"),b(t,n.p),S(t,n),M(141,1),k(),b()}function u(n,e){b(n);for(var r,s;M(147,1),b(n),n!==j.root&&n.color===P;)M(148,1),n===n.p.left?(M(149,1),s=n.p.right,M(150,1),b(n,s),s.color===N&&(M(151,1),s.color=P,w(s),b(n,s),M(152,1),n.p.color=N,w(n.p),E(n,s,n.p),M(153,1),a(n.p),b(n),z(e,n),M(154,1),s=n.p.right),M(156,1),b(n,s.left,s.right),s.left.color===P&&s.right.color===P?(M(157,1),s.color=N,w(s),E(s),M(158,1),n=n.p,b(n),z(e,n)):(M(160,1),b(n,s.right),s.right.color===P&&(M(161,1),s.left.color=P,w(s.left),E(s.left),M(162,1),s.color=N,w(s),E(s),M(163,1),i(s),b(n),z(e,n),M(164,1),s=n.p.right),M(166,1),r=n.p.color,z(e,n.p),E(n.p),M(167,1),n.p.color=P,w(n.p),e.color=r,z(e,n.p),M(168,1),s.color=r,w(s),E(s),e.color=P,z(e,s),M(169,1),s.right.color=P,w(s.right),E(s.right),e.color=N,z(e,s.right),M(170,1),a(n.p),b(s.right),z(e,s.right),M(171,1),n=j.root,b(n))):(M(174,1),s=n.p.left,M(175,1),b(n,s),s.color===N&&(M(176,1),s.color=P,w(s),b(n,s),M(177,1),n.p.color=N,w(n.p),E(n,s,n.p),M(178,1),i(n.p),b(n),z(e,n),M(179,1),s=n.p.left),M(181,1),b(n,s.left,s.right),s.right.color===P&&s.left.color===P?(M(182,1),s.color=N,w(s),E(s),M(183,1),n=n.p,b(n),z(e,n)):(M(185,1),b(n,s.left),s.left.color===P&&(M(186,1),s.right.color=P,w(s.right),E(s.right),M(187,1),s.color=N,w(s),E(s),M(188,1),a(t,s),b(n),z(e,n),M(189,1),s=n.p.left),M(191,1),r=n.p.color,E(n.p),M(192,1),n.p.color=P,w(n.p),e.color=r,z(e,n.p),M(193,1),s.color=r,w(s),E(s),e.color=P,z(e,s),M(194,1),s.left.color=P,w(s.left),E(s.left),E(s.left),e.color=N,z(e,s.left),M(195,1),i(n.p),b(s.right),z(e,s.right),M(196,1),n=j.root,b(n)));M(200,1),n.color=P,w(n),z()}function d(n,t){var e={id:t,key:"min"};for(z(e,n),b(n);M(204,1),E(n.left),n.left.nil!==!0;)M(205,1),n=n.left,b(n),z(e,n);return M(207,1),b(n),n}function f(n){k(n),b(n);var t,e,r,s={id:O++,extra:!0,key:""};M(214,1),e=n,z(s,n),M(215,1),r=e.color,s.color=e.color,z(s,n),M(216,1),b(n,n.left),n.left.nil?(M(217,1),t=n.right,b(n),M(218,1),p(n,n.right),C()):(M(219,1),b(n,n.right),n.right.nil?(M(220,1),t=n.left,b(n),M(221,1),p(n,n.left),C()):(b(n),M(223,1),e=d(n.right,s.id),delete s.color,z(s,e),b(e),M(224,1),r=e.color,s.color=e.color,z(s,e),M(225,1),t=e.right,M(226,1),e.p===n?(M(227,1),t.p=e,A(t,"p"),E(t)):(M(229,1),p(e,e.right),b(e),M(230,1),e.right=n.right,A(e,"right"),b(e,n.right),S(e,n),M(231,1),e.right.p=e,A(e.right,"p")),M(233,1),p(n,e),b(e),M(234,1),e.left=n.left,A(e,"left"),b(e,n.left),M(235,1),e.left.p=e,A(e.left,"p"),b(e.left,e),M(236,1),e.color=n.color,w(e),C())),z(s,t),k(),b(),M(238,1),b(s),r===P&&(M(239,1),u(t,s)),M(240,1),z(),b(),k()}function h(n,t){var e={id:O++,key:t};for(z(e,j.root);M(244,1),k(n),n.nil!==!0&&t!==n.key;)M(245,1),t<n.key?(M(246,1),n=n.left,z(e,n)):(M(248,1),n=n.right,z(e,n));return k(),b(n),M(251,1),z(),n}function m(n){M(255,1),T=h(j.root,n),M(256,1),z({id:O,key:T.nil!==!0?n:"X"},T)}function y(n){M(259,1);var t=h(j.root,n);M(260,1),t.nil!==!0&&(M(261,1),f(t)),b(),k()}function g(n,t){t.key="递归",z(t,n),M(266,1),n.nil!==!0&&(M(267,1),g(n.left,t),t.key="回溯",z(t,n),M(268,1),E(n),M(269,1),g(n.right,t),t.key="回溯",z(t,n),M(270,1)),M(271,1)}function v(){var n={id:O++,key:"指针"};b(n),M(274,1),g(j.root,n),M(275,1),n.key="完成",z(n,j.root)}function x(n,t){if(void 0===n)I.ro=void 0;else{var e="left"===t?"right":"left",r=[n.id,n[e].id,n[e][e].id,n[e][t].id,n[t].id];I.ro={ids:r,type:t}}}function w(n){void 0===n?I.co={}:(I.co=I.co||{},I.co[n.id]=n.color)}function _(n){I.hls.push(n.id)}function k(n){I.hls.pop(),void 0!==n&&_(n)}function b(){0===arguments.length?I.hl=[]:I.hl=Array.prototype.map.call(arguments,function(n){return n.id})}function E(n){I.hl.push(n.id)}function A(n,t){if(void 0===n)I.ne={};else{var e=n.id+t;I.ne=I.ne||{},I.ne[e]=n[t].id,I.ne.curr=e}}function S(n,t){void 0===n?I.np={}:(I.np=I.np||{},I.np[n.id]=t.id)}function z(n,t){0===arguments.length?I.nn=void 0:I.nn={id:n.id,key:n.key,color:n.color,ref:t.id,extra:n.extra}}function C(){w(),A(),S(),z(),I.lastTree=R(j)}function D(){}function M(n,t,e){1===t&&(lastStatus=I.clone()),B.push({status:lastStatus,line:n,animation:e,id:U}),U++}function L(){M(B[B.length-1].line,1)}var T,R=r(4),B=[],U=0,I={},O=0,N=1,P=0,j={nil:s()};j.root=j.nil,I.clone=function(){return void 0===this.lastTree&&(this.lastTree=R(j)),{tree:this.lastTree,hl:R(this.hl)||[],hls:R(this.hls)||[],ne:R(this.ne)||{},np:R(this.np)||{},nn:R(this.nn),co:R(this.co)||{},ro:R(this.ro)||void 0}},I.init=function(n){n&&(j.root=j.nil),this.hl=[],this.hls=[],this.ne={},this.np={},this.nn=void 0,this.co={},this.ro=void 0},lastStatus={},n.exports={getInitialDescriptions:function(){return this.initialize(!0),l(10),l(1),l(2),l(3),l(4),l(5),this.run("insert","6")},initialize:function(n){return B=[],U=0,I.init(n),lastStatus=I.clone(),this},insert:l,inorder:v,"delete":y,search:m,check:D,run:function(n,t){return this.initialize()[n](isNaN(parseInt(t))?0:parseInt(t)),L(),{frames:B,others:{}}}}},46:function(n,t,e){var r=e(1),s=e(2);n.exports=r.createClass({displayName:"module.exports",getInitialState:function(){return{text:""}},render:function(){return r.createElement("div",{className:"list"},r.createElement("input",{onChange:this._onChange,value:this.state.text,placeholder:"整数"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"insert"),value:"插入"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"delete"),value:"删除"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"search"),value:"查找"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"inorder"),value:"中序遍历"}))},_onChange:function(n){this.setState({text:n.target.value})},_onClick:function(n){s.runDemo(n,this.state.text)}})},71:function(n,t,e){n.exports="CC=gcc\nCFLAGS=-c -Wall\nLDFLAGS=\nSOURCES=test.c rb-tree.c rb-tree.h ../common/util.c ../common/util.h\nOBJECTS=$(SOURCES:.c=.o)\nEXECUTABLE=a.out\n\nall: $(SOURCES) $(EXECUTABLE)\n\n$(EXECUTABLE): $(OBJECTS)\n    $(CC) $(LDFLAGS) $(OBJECTS) -o $@\n\n.cpp.o:\n    $(CC) $(CFLAGS) $&lt; -o $@\n\nclean:\n    rm -rf *.o a.out"},72:function(n,t,e){n.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include "./rb-tree.h"</span>\n<span class="comment">#include "../common/util.h"</span>\n\nint _RED = <span class="number">1</span>;\nint _BLACK = <span class="number">0</span>;\n\nrb_tree * RBTreeCreate() {\n    rb_tree* newTree;\n    rb_tree_node* newNode;\n    newTree = (rb_tree*) SafeMalloc(sizeof(rb_tree));\n    newTree->nil = newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));\n    newNode->left = newNode->right = newNode->p = newNode;\n    newNode->key = <span class="number">0</span>;\n    newNode->color = _BLACK;\n    newTree->root = newTree->nil;\n    <span class="keyword">return</span> newTree;\n}\n\nvoid _LeftRotate(rb_tree* t, rb_tree_node* x) {\n    rb_tree_node* y;\n    y = x->right;\n    x->right = y->left;\n    <span class="keyword">if</span> (y->left != t->nil) {\n        y->left->p = x;\n    }\n    y->p = x->p;\n    <span class="keyword">if</span> (x->p == t->nil) {\n        t->root = y;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (x == x->p->left) {\n        x->p->left = y;\n    } <span class="keyword">else</span> {\n        x->p->right = y;\n    }\n    y->left = x;\n    x->p = y;\n}\n\nvoid _RightRotate(rb_tree* t, rb_tree_node* y) {\n    rb_tree_node* x;\n    x = y->left;\n    y->left = x->right;\n    <span class="keyword">if</span> (x->right != t->nil) {\n        x->right->p = y;\n    }\n    x->p = y->p;\n    <span class="keyword">if</span> (y->p == t->nil) {\n        t->root = x;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (y == y->p->right) {\n        y->p->right = x;\n    } <span class="keyword">else</span> {\n        y->p->left = x;\n    }\n    x->right = y;\n    y->p = x;\n}\n\nvoid _InsertFixUp(rb_tree* t, rb_tree_node *z) {\n    rb_tree_node *y;\n    <span class="keyword">while</span> (z->p->color == _RED) {\n        <span class="keyword">if</span> (z->p == z->p->p->left) {\n            y = z->p->p->right;\n            <span class="keyword">if</span> (y->color == _RED) {\n                z->p->color = _BLACK;\n                y->color = _BLACK;\n                z->p->p->color = _RED;\n                z = z->p->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (z == z->p->right) {\n                    z= z->p;\n                    _LeftRotate(t, z);\n                }\n                z->p->color = _BLACK;\n                z->p->p->color = _RED;\n                _RightRotate(t, z->p->p);\n            }\n        } <span class="keyword">else</span> {\n            y = z->p->p->left;\n            <span class="keyword">if</span> (y->color == _RED) {\n                z->p->color = _BLACK;\n                y->color = _BLACK;\n                z->p->p->color = _RED;\n                z = z->p->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (z == z->p->left) {\n                    z= z->p;\n                    _RightRotate(t, z);\n                }\n                z->p->color = _BLACK;\n                z->p->p->color = _RED;\n                _LeftRotate(t, z->p->p);\n            }\n        }\n    }\n    t->root->color = _BLACK;\n}\n\nvoid _Insert(rb_tree* t, rb_tree_node* z) {\n    rb_tree_node* x;\n    rb_tree_node* y;\n    y = t->nil;\n    x = t->root;\n    <span class="keyword">while</span> (x != t->nil) {\n        y = x;\n        <span class="keyword">if</span> (z->key &lt; x->key) {\n            x = x->left;\n        } <span class="keyword">else</span> {\n            x = x->right;\n        }\n    }\n    z->p = y;\n    <span class="keyword">if</span> (y == t->nil) {\n        t->root = z;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (z->key &lt; y->key) {\n        y->left = z;\n    } <span class="keyword">else</span> {\n        y->right = z;\n    }\n    z->left = t->nil;\n    z->right = t->nil;\n    z->color = _RED;\n    _InsertFixUp(t, z);\n}\n\nvoid RBTreeInsert(rb_tree* t, int key) {\n    rb_tree_node* newNode;\n    newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));\n    newNode->key = key;\n    _Insert(t, newNode);\n}\n\nvoid _Transplant(rb_tree* t, rb_tree_node* u, rb_tree_node* v) {\n    <span class="keyword">if</span> (u->p == t->nil) {\n        t->root = v;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (u == u->p->left) {\n        u->p->left = v;\n    } <span class="keyword">else</span> {\n        u->p->right = v;\n    }\n    v->p = u->p;\n}\n\nvoid _DeleteFixUp(rb_tree* t, rb_tree_node* x) {\n    int tmp;\n    rb_tree_node* w;\n    <span class="keyword">while</span> (x != t->root &amp;&amp; x->color == _BLACK) {\n        <span class="keyword">if</span> (x == x->p->left) {\n            w = x->p->right;\n            <span class="keyword">if</span> (w->color == _RED) {\n                w->color = _BLACK;\n                x->p->color = _RED;\n                _LeftRotate(t, x->p);\n                w = x->p->right;\n            }\n            <span class="keyword">if</span> (w->left->color == _BLACK &amp;&amp; w->right->color == _BLACK) {\n                w->color = _RED;\n                x = x->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (w->right->color == _BLACK) {\n                    w->left->color = _BLACK;\n                    w->color = _RED;\n                    _RightRotate(t, w);\n                    w = x->p->right;\n                }\n                tmp = x->p->color;\n                x->p->color = _BLACK;\n                w->color = tmp;\n                w->right->color = _BLACK;\n                _LeftRotate(t, x->p);\n                x = t->root;\n            }\n        } <span class="keyword">else</span> {\n            w = x->p->left;\n            <span class="keyword">if</span> (w->color == _RED) {\n                w->color = _BLACK;\n                x->p->color = _RED;\n                _RightRotate(t, x->p);\n                w = x->p->left;\n            }\n            <span class="keyword">if</span> (w->right->color == _BLACK &amp;&amp; w->left->color == _BLACK) {\n                w->color = _RED;\n                x = x->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (w->left->color == _BLACK) {\n                    w->right->color = _BLACK;\n                    w->color = _RED;\n                    _LeftRotate(t,w);\n                    w = x->p->left;\n                }\n                tmp = x->p->color;\n                x->p->color = _BLACK;\n                w->color = tmp;\n                w->left->color = _BLACK;\n                _RightRotate(t, x->p);\n                x = t->root;\n            }\n        }\n    }\n    x->color =_BLACK;\n}\n\nrb_tree_node* _Minimum(rb_tree* t, rb_tree_node *z) {\n    <span class="keyword">while</span> (z->left != t->nil) {\n        z = z->left;\n    }\n    <span class="keyword">return</span> z;\n}\n\nvoid _Delete(rb_tree* t, rb_tree_node *z) {\n    rb_tree_node* x;\n    rb_tree_node* y;\n    int y_original_color;\n    y = z;\n    y_original_color = y->color;\n    <span class="keyword">if</span> (z->left == t->nil) {\n        x = z->right;\n        _Transplant(t, z, z->right);\n    } <span class="keyword">else</span> <span class="keyword">if</span> (z->right == t->nil) {\n        x = z->left;\n        _Transplant(t, z, z->left);\n    } <span class="keyword">else</span> {\n        y = _Minimum(t, z->right);\n        y_original_color = y->color;\n        x = y->right;\n        <span class="keyword">if</span> (y->p == z) {\n            x->p = y;\n        } <span class="keyword">else</span> {\n            _Transplant(t, y, y->right);\n            y->right = z->right;\n            y->right->p = y;\n        }\n        _Transplant(t, z, y);\n        y->left = z->left;\n        y->left->p = y;\n        y->color = z->color;\n    }\n    <span class="keyword">if</span> (y_original_color == _BLACK) {\n        _DeleteFixUp(t, x);\n    }\n}\n\nrb_tree_node* _Search(rb_tree* t, rb_tree_node* x, int k) {\n    <span class="keyword">while</span> (x != t->nil &amp;&amp; k != x->key) {\n        <span class="keyword">if</span> (k &lt; x->key) {\n            x = x->left;\n        } <span class="keyword">else</span> {\n            x = x->right;\n        }\n    }\n    <span class="keyword">return</span> x;\n}\n\nrb_tree_node* RBTreeSearch(rb_tree* t, int k) {\n    <span class="keyword">return</span> _Search(t, t->root, k);\n}\n\nvoid RBTreeDelete(rb_tree* t, int key) {\n    rb_tree_node* newNode = _Search(t, t->root, key);\n    <span class="keyword">if</span> (newNode != t->nil) {\n        _Delete(t, newNode);\n    }\n}\n\nvoid _InorderWalk(rb_tree* t, rb_tree_node* x) {\n    <span class="keyword">if</span> (x != t->nil) {\n        _InorderWalk(t, x->left);\n        printf(<span class="string">"%d "</span>, x->key);\n        _InorderWalk(t, x->right);\n    }\n}\n\nvoid RBTreeInorderWalk(rb_tree* t) {\n    _InorderWalk(t, t->root);\n    printf(<span class="string">"\\n"</span>);\n}\n\nvoid _Destroy(rb_tree* t, rb_tree_node* x) {\n    <span class="keyword">if</span> (x != t->nil) {\n        _Destroy(t, x->left);\n        _Destroy(t, x->right);\n        free(x);\n    }\n}\n\nvoid RBTreeDestroy(rb_tree* t) {\n    _Destroy(t, t->root);\n    free(t->nil);\n}'},73:function(n,t,e){n.exports='<span class="comment">#ifndef RB_TREE_H</span>\n<span class="comment">#define RB_TREE_H</span>\n\ntypedef struct rb_tree_node {\n    int key;\n    int color;\n    struct rb_tree_node* left;\n    struct rb_tree_node* right;\n    struct rb_tree_node* p;\n} rb_tree_node;\n\ntypedef struct rb_tree {\n    rb_tree_node* root;\n    rb_tree_node* nil;\n} rb_tree;\n\nrb_tree* RBTreeCreate();\nvoid RBTreeInsert(rb_tree*, int);\nvoid RBTreeDelete(rb_tree*, int);\nvoid RBTreeDestroy(rb_tree*);\nrb_tree_node* RBTreeSearch(rb_tree*, int);\nvoid RBTreeInorderWalk(rb_tree*);\n\n<span class="comment">#endif</span>'},74:function(n,t,e){n.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include "./rb-tree.h"</span>\n\nint main(int argc, char <span class="keyword">const</span> *argv[]) {\n  int i;\n  int k;\n  rb_tree* rbTree = RBTreeCreate();\n  <span class="keyword">while</span> (scanf(<span class="string">"%d"</span>, &amp;i) != EOF) {\n    scanf(<span class="string">"%d"</span>, &amp;k);\n    <span class="keyword">switch</span> (i) {\n      <span class="keyword">case</span> <span class="number">0</span>:\n        RBTreeInsert(rbTree, k);\n        <span class="keyword">break</span>;\n      <span class="keyword">case</span> <span class="number">1</span>:\n        RBTreeDelete(rbTree, k);\n        <span class="keyword">break</span>;\n      <span class="keyword">case</span> <span class="number">2</span>:\n        RBTreeSearch(rbTree, k);\n        <span class="keyword">break</span>;\n    }\n    RBTreeInorderWalk(rbTree);\n  }\n  RBTreeDestroy(rbTree);\n  <span class="keyword">return</span> <span class="number">0</span>;\n};'},103:function(n,t,e){function r(){return S.hls.length+1+(S.hl.length?1:0)}function s(n){if(void 0===n.color)return"deepskyblue";var t=R[n.id]+1,e=S.hls.length+1+(S.hl.length?1:0);return e>t&&(t=1),$[n.color](t/e)}function a(n){var t=Math.min(R[n.from],R[n.to])+1,e=S.hls.length+1+(S.hl.length?1:0);return e>t&&(t=1),C.interpolate(0,1)(t/e)}function i(n,t,e){M[n.id]=M[n.id]||{},M[n.id].curr=t}function o(n,t){var e=n.id,r=n[t]?n[t].id:void 0,s=e+t;return void 0!==S.ne[s]&&(r=S.ne[s]),{from:n.id,to:r,type:t,id:s,unconditional:n.nil}}function c(n){B.push(n.id);var t=n.color;return void 0!==S.co[n.id]&&(t=S.co[n.id]),{extra:n.extra,color:t,v:n.key,id:n.id}}function l(n,t){t=t||n.p.id,void 0===M[n.id].prev&&(void 0===M[t]?M[n.id].prev=M[n.id].curr:M[n.id].prev=M[t].prev||M[n.id].curr),(n.p||S.ne[n.id+"p"])&&T.push(o(n,"p")),n.id===S.hl&&(hide=!1),L.push(c(n)),n.left&&(T.push(o(n,"left")),l(n.left,n.id)),n.right&&(T.push(o(n,"right")),l(n.right,n.id)),n.id===S.hl&&(hide=!0)}function p(){L=[],T=[],B=[],R={},R[S.tree.nil.id]=-1===S.hl.indexOf(S.tree.nil.id)?0:r()-1,u(S.tree.root,0);for(var n in M)M[n].prev=M[n].curr;i(S.tree.nil,{x:0,y:1.5*-I}),M[S.tree.nil.id].prev=M[S.tree.nil.id].curr,S.tree.root.nil!==!0&&(i(S.tree.root,{x:0,y:0}),d(S.tree.root.left,0,0,-U,N),d(S.tree.root.right,0,0,U,N)),L.push(c(S.tree.nil)),S.tree.root.nil!==!0&&l(S.tree.root);var t={};for(var e in S.np)t[e]=M[S.np[e]].curr.y;for(var e in S.np)M[e].curr.y=t[e];S.nn&&(L.push(c(S.nn)),i(S.nn,{x:M[S.nn.ref].curr.x,y:M[S.nn.ref].curr.y-(S.nn.extra?I/3:I/2)},1),void 0===M[S.nn.id].prev&&(M[S.nn.id].prev=M[S.nn.ref].curr),void 0!==S.ne[S.nn.id+"p"]&&T.push(o(S.nn,"p")),-1!==S.hl.indexOf(S.nn.id)?R[S.nn.id]=r()-1:R[S.nn.id]=R[S.nn.ref]);for(var e=0;e<T.length;++e){var s=T[e].from,a=T[e].to,p=M[a].curr.x-M[s].curr.x,f=M[a].curr.y-M[s].curr.y,h=Math.sqrt(p*p+f*f),m=j*P;O+m>h?(T[e].dx=0,T[e].dy=0):(T[e].dx=p*(O+m)/h,T[e].dy=f*(O+m)/h)}Object.keys(M).filter(function(n){return-1===B.indexOf(+n)}).forEach(function(n){delete M[n]})}function u(n,t){-1!==S.hls.indexOf(n.id)&&(t=S.hls.lastIndexOf(n.id)+1),-1!==S.hl.indexOf(n.id)?R[n.id]=S.hls.length+1:R[n.id]=t,n.left&&u(n.left,t),n.right&&u(n.right,t)}function d(n,t,e,r,s){if(void 0!==n){var a,o;0>r?(a="right",o="left"):(a="left",o="right");var c=I;return n.nil||void 0===n[a]?i(n,{x:e+r,y:t+c}):i(n,{x:d(n[a],t+c,e,r,n.color)+r,y:t+c}),n.nil||void 0===n[o]?M[n.id].curr.x:d(n[o],t+c,M[n.id].curr.x,r,n.color)}}function f(){E.selectAll("circle.node").data(L,function(n){return n.id}).enter().append("circle").attr("class","node").attr("cx",function(n){return M[n.id].prev.x}).attr("cy",function(n){return M[n.id].prev.y}).attr("r",function(n){return n.extra?O/2:O}).style("fill",function(n){return n.color?"red":"black"}),E.selectAll("circle.node").data(L,function(n){return n.id}).transition().duration(z).attr("cx",function(n){return M[n.id].curr.x}).attr("cy",function(n){return M[n.id].curr.y}).attr("r",function(n){return n.extra?O/2:O}).style("fill",s),E.selectAll("circle.node").data(L,function(n){return n.id}).exit().transition().duration(z).style("opacity",0).remove()}function h(){A.selectAll("line.edge").data(T,function(n){return n.id}).enter().append("line").attr("class","edge").attr("stroke-width",P).attr("x1",function(n){return M[n.from].prev.x+n.dx}).attr("y1",function(n){return M[n.from].prev.y+n.dy}).attr("x2",function(n){return M[n.from].prev.x+n.dx}).attr("y2",function(n){return M[n.from].prev.y+n.dy}).classed("parent",function(n){return"p"===n.type?!0:!1}).classed("child",function(n){return"p"!==n.type?!0:!1}),A.selectAll("line.edge").data(T,function(n){return n.id}).style("marker-end",function(n){return n.id===S.ne.curr?"url(#"+n.type+"-end)":null}).transition().duration(z).attr("x1",function(n){return M[n.from].curr.x+n.dx}).attr("y1",function(n){return M[n.from].curr.y+n.dy}).attr("x2",function(n){return M[n.to].curr.x-n.dx}).attr("y2",function(n){return M[n.to].curr.y-n.dy}).style("opacity",a).style("stroke-dasharray",function(n){return n.unconditional?"5 5":null}),A.selectAll("line.edge").data(T,function(n){return n.id}).exit().transition().duration(z).style("opacity",0).remove()}function m(){k.selectAll("text.node").data(L,function(n){return n.id}).enter().append("text").attr("class","node").attr("x",function(n){return M[n.id].prev.x}).attr("y",function(n){return M[n.id].prev.y}).attr("dy",5),k.selectAll("text.node").data(L,function(n){return n.id}).transition().duration(z).attr("x",function(n){return M[n.id].curr.x}).attr("y",function(n){return M[n.id].curr.y}).style("fill",s).text(function(n){return n.v}),k.selectAll("text.node").data(L,function(n){return n.id}).exit().transition().duration(z).style("opacity",0).remove()}function y(){var n=S.ro?[S.ro.ids]:[];b.selectAll("path.rot").data(n).enter().append("path").attr("class","rot").attr("d",function(n){return this.__prev__=n,"M"+n.map(function(n){return[M[n].curr.x,M[n].curr.y]}).join("L")}).style("fill-opacity",.05).style("opacity",0).transition().duration(z).style("opacity",1),b.selectAll("path.rot").data(n).attr("d",function(n){return this.__prev__=n,"M"+n.map(function(n){return[M[n].curr.x,M[n].curr.y]}).join("L")}),b.selectAll("path.rot").data(n).exit().transition().duration(z).attr("d",function(){for(var n=this.__prev__,t=0;t<n.length;++t)if(void 0===M[n[t]])return"";return"M"+n.map(function(n){return[M[n].curr.x,M[n].curr.y]}).join("L")}).style("opacity",0).remove()}function g(){function n(n){return function(t){return t.reduce(function(t,e){return t+M[e].curr[n]},0)/t.length}}var t=S.ro?[S.ro.ids]:[];k.selectAll("text.rot").data(t).enter().append("text").attr("class","rot").attr("x",n("x")).attr("y",n("y")).attr("dy",5).text(function(){return"left"===S.ro.type?"左旋":"右旋"}).style("fill-opacity",.5),k.selectAll("text.rot").data(t).attr("x",n("x")).attr("y",n("y")).text(function(){return"left"===S.ro.type?"左旋":"右旋"}),k.selectAll("text.rot").data(t).exit().transition().duration(z).style("opacity",0).remove()}function v(n,t){S=n,z=t}function x(n,t){v(n,t),p(),h(),f(),m(),y(),g()}function w(){var n=this,t=C.behavior.zoom().scaleExtent([.1,10]).on("zoom",function(){n.svg.attr("transform",D().translate(C.event.translate).scale(C.event.scale))});this.svg=C.select(this.refs.svg.getDOMNode()).append("svg").call(t).append("g"),this.svg.append("defs").selectAll("marker").data(["left","right","p"]).enter().append("marker").attr("id",function(n){return n+"-end"}).attr("viewBox","0 -5 10 10").attr("markerWidth",j).attr("markerHeight",j).attr("orient","auto").append("path").attr("d","M0,-5L10,0,L0,5"),this.g=this.svg.append("g").attr("transform",D().translate(100,100).scale(1)),this.ghigh=this.g.append("g").attr("class","high"),this.gbase=this.g.append("g").attr("class","base"),this.gtext=this.g.append("g").attr("class","text"),_=this.gbase,A=this.gbase.append("g").attr("class","edges"),E=this.gbase.append("g").attr("class","nodes"),k=this.gtext,b=this.ghigh}var _,k,b,E,A,S,z,C=e(3),D=e(5),M={},L=[],T=[],R={},B=[],U=35,I=70,O=15,N=0,P=3,j=2,$=[C.interpolateRgb("white","black"),C.interpolateRgb("white","red")];n.exports={init:w,render:x}}});