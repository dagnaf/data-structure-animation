webpackJsonpdsa([2],{18:function(e,n,r){function s(){return{id:R++,nil:!0,key:"nil",color:B}}function a(t){var e;E(23,1),e=t.right,E(24,1),t.right=e.left,x(t,"right"),E(25,1),e.left.nil!==!0&&(E(26,1),e.left.p=t,x(e.left,"p")),E(28,1),e.p=t.p,x(e,"p"),E(29,1),t.p.nil?(E(30,1),I.root=e):(E(31,1),t===t.p.left?(E(32,1),t.p.left=e,x(t.p,"left")):(E(34,1),t.p.right=e,x(t.p,"right"))),E(36,1),e.left=t,x(e,"left"),E(37,1),t.p=e,x(t,"p")}function i(t){var e;E(42,1),e=t.left,E(43,1),t.left=e.right,x(t,"left"),E(44,1),e.right.nil!==!0&&(E(45,1),e.right.p=t,x(e.right,"p")),E(47,1),e.p=t.p,x(e,"p"),E(48,1),t.p.nil?(E(49,1),I.root=e):(E(50,1),t===t.p.right?(E(51,1),t.p.right=e,x(t.p,"right")):(E(53,1),t.p.left=e,x(t.p,"left"))),E(55,1),e.right=t,x(e,"right"),E(56,1),t.p=e,x(t,"p")}function o(t){for(var e;E(61),t.p.color===C;)_(t.p.p),E(62,1),t.p===t.p.p.left?(E(63,1),e=t.p.p.right,E(64,1),e.color===C?(E(65,1),t.p.color=B,w(t.p),E(66,1),e.color=B,w(e),E(67,1),t.p.p.color=C,w(t.p.p),E(68,1),t=t.p.p):(E(70,1),t===t.p.right&&(E(71,1),t=t.p,E(72,1),a(t),E(72,1),k()),E(74,1),t.p.color=B,w(t.p),E(75,1),t.p.p.color=C,w(t.p.p),E(76,1),i(t.p.p),E(76,1),k())):(E(79,1),e=t.p.p.left,E(80,1),e.color===C?(E(81,1),t.p.color=B,w(t.p),E(82,1),e.color=B,w(e),E(83,1),t.p.p.color=C,w(t.p.p),E(84,1),t=t.p.p):(E(86,1),t===t.p.left&&(E(87,1),t=t.p,E(88,1),i(t),E(88,1),k()),E(90,1),t.p.color=B,w(t.p),E(91,1),t.p.p.color=C,w(t.p.p),E(92,1),a(t.p.p),E(92,1),k()));_(),E(96,1),I.root.color=B,k()}function c(t){var e,n;for(E(102),n=I.nil,E(103),e=I.root;E(104,1),_(e),e.nil!==!0;)E(105,1),n=e,E(106),t.key<e.key?(E(107,1),e=e.left,b(t,e)):(E(109,1),e=e.right,b(t,e));_(n),E(112,1),t.p=n,x(t,"p"),E(113,1),n===I.nil?(E(114,1),I.root=t):(E(115,1),t.key<n.key?(_(n.left),E(116,1),n.left=t,x(n,"left")):(_(n.right),E(118,1),n.right=t,x(n,"right"))),_(t),E(120,1),t.left=s(),k(),E(121,1),t.right=s(),k(),E(122,1),t.color=C,w(t),E(123,1),o(t)}function l(t){var e={};E(128),e.id=R++,E(129),e.key=t,b(e,I.root),E(130,1),c(e)}function p(t,e){E(134,1),t.p.nil?(E(135,1),I.root=e):(E(136,1),t===t.p.left?(E(137,1),t.p.left=e):(E(139,1),t.p.right=e)),E(141,1),e.p=t.p}function u(e){for(var n;E(146,1),e!==I.root&&e.color===B;)E(147,1),e===e.p.left?(E(148,1),n=e.p.right,E(149,1),E(149,1),n.color===C&&(E(150,1),n.color=B,E(151,1),e.p.color=C,E(152,1),a(e.p),E(153,1),n=e.p.right),E(155,1),n.left.color===B&&n.right.color===B?(E(156,1),n.color=C,E(157,1),e=e.p):(E(159,1),n.right.color===B&&(E(160,1),n.left.color=B,E(161,1),n.color=C,E(162,1),i(n),E(163,1),n=e.p.right),E(165,1),n.color=e.p.color,E(166,1),e.p.color=B,E(167,1),n.right.color=B,E(168,1),a(e.p),E(169,1),e=I.root)):(E(172,1),n=e.p.left,E(173,1),n.color===C&&(E(174,1),n.color=B,E(175,1),e.p.color=C,E(176,1),i(e.p),E(177,1),n=e.p.left),E(179,1),n.right.color===B&&n.left.color===B?(E(180,1),n.color=C,E(181,1),e=e.p):(E(183,1),n.left.color===B&&(E(184,1),n.right.color=B,E(185,1),n.color=C,E(186,1),a(t,n),E(187,1),n=e.p.left),E(189,1),n.color=e.p.color,E(190,1),e.p.color=B,E(191,1),n.left.color=B,E(192,1),i(e.p),E(193,1),e=I.root));E(197,1),e.color=B}function f(t){for(;E(201,1),t.left.nil!==!0;)E(202,1),t=t.left;return E(204,1),t}function h(t){var e,n,r;E(211,1),n=t,E(212,1),r=n.color,E(213,1),t.left.nil?(E(214,1),e=t.right,E(215,1),p(t,t.right)):(E(216,1),t.right.nil?(E(217,1),e=t.left,E(218,1),p(t,t.left)):(E(220,1),n=f(t.right),E(221,1),r=n.color,E(222,1),e=n.right,E(223,1),n.p===t?(E(224,1),e.p=n):(E(226,1),p(n,n.right),E(227,1),n.right=t.right,E(228,1),n.right.p=n),E(230,1),p(t,n),E(231,1),n.left=t.left,E(232,1),n.left.p=n,E(233,1),n.color=t.color)),E(235,1),r===B&&(E(236,1),u(e))}function d(t,e){for(;E(241,1),t.nil!==!0&&e!==t.key;)E(242,1),e<t.key?(E(243,1),t=t.left):(E(245,1),t=t.right);return E(248,1),t}function g(t){return E(252,1),d(I.root,t)}function m(t){E(256,1);var e=d(I.root,t);E(257,1),e.nil!==!0&&(E(258,1),h(e))}function y(t){E(263,1),t.nil!==!0&&(E(264,1),y(t.left),E(265,1),console.log(t.key),E(266,1),y(t.right))}function v(){y(I.root)}function w(t){void 0===t?T.co={}:(T.co=T.co||{},T.co[t.id]=t.color)}function _(t){void 0===t?T.hl=void 0:T.hl=t.id}function x(t,e){if(void 0===t)T.ne={};else{var n=t.id+e;T.ne=T.ne||{},T.ne[n]=t[e].id}}function b(t,e){0===arguments.length?T.nn=void 0:T.nn={id:t.id,key:t.key,color:t.color,ref:e.id}}function k(){w(),x(),b(),T.lastTree=D(I)}function E(t,e,n){1===e&&(lastStatus=T.clone()),S.push({status:lastStatus,line:t,animation:n,id:L}),L++}function A(){E(S[S.length-1].line,1)}var D=r(4),S=[],L=0,T={},R=0,C=1,B=0,I={nil:s()};I.root=I.nil,T.clone=function(){return void 0===this.lastTree&&(this.lastTree=D(I)),{tree:this.lastTree,hl:D(this.hl),ne:D(this.ne)||{},nn:D(this.nn),co:D(this.co)||{}}},T.init=function(t){t&&(I.root=I.nil),this.hl=void 0,this.ne={},this.nn=void 0,this.co={}},lastStatus={},e.exports={getInitialDescriptions:function(){return this.initialize(!0),this.run("insert","5")},initialize:function(t){return S=[],L=0,T.init(t),lastStatus=T.clone(),this},insert:l,inorder:v,"delete":m,search:g,run:function(t,e){return this.initialize()[t](isNaN(parseInt(e))?0:parseInt(e)),A(),{frames:S,others:{}}}}},35:function(t,e,n){var r=n(1),s=n(2);t.exports=r.createClass({displayName:"module.exports",getInitialState:function(){return{text:""}},render:function(){return r.createElement("div",{className:"list"},r.createElement("input",{onChange:this._onChange,value:this.state.text,placeholder:"整数"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"insert"),value:"插入"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"delete"),value:"删除"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"search"),value:"查找"}),r.createElement("input",{className:"cmd-button",readOnly:!0,onClick:this._onClick.bind(this,"inorder"),value:"中序遍历"}))},_onChange:function(t){this.setState({text:t.target.value})},_onClick:function(t){s.runDemo(t,this.state.text)}})},42:function(t,e,n){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include "./util.h"</span>\n\nvoid* SafeMalloc(size_t size) {\n    void* m;\n    <span class="keyword">if</span> ((m = malloc(size))) {\n        <span class="keyword">return</span> m;\n    } <span class="keyword">else</span> {\n        printf(<span class="string">"memory overflow\\n"</span>);\n        <span class="keyword">exit</span>(-<span class="number">1</span>);\n        <span class="keyword">return</span> <span class="number">0</span>;\n    }\n}\n\n<span class="comment">// FIXME</span>\n<span class="comment">//   stack,queue and other dsa should use dynamically</span>\n<span class="comment">//   allocated memory, which is what util.c provides.</span>\n<span class="comment">//   Also should be included in model-file descripttions.</span>'},43:function(t,e,n){t.exports='<span class="comment">#ifndef UTIL_H</span>\n<span class="comment">#define UTIL_H</span>\n\n<span class="comment">#include &lt;stddef.h></span>\n\nvoid * SafeMalloc(size_t size);\n\n<span class="comment">#endif</span>'},50:function(t,e,n){t.exports="CC=gcc\nCFLAGS=-c -Wall\nLDFLAGS=\nSOURCES=test.c rb-tree.c rb-tree.h ../common/util.c ../common/util.h\nOBJECTS=$(SOURCES:.c=.o)\nEXECUTABLE=a.out\n\nall: $(SOURCES) $(EXECUTABLE)\n\n$(EXECUTABLE): $(OBJECTS)\n    $(CC) $(LDFLAGS) $(OBJECTS) -o $@\n\n.cpp.o:\n    $(CC) $(CFLAGS) $&lt; -o $@\n\nclean:\n    rm -rf *.o a.out"},51:function(t,e,n){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include &lt;stdlib.h></span>\n<span class="comment">#include "./rb-tree.h"</span>\n<span class="comment">#include "../common/util.h"</span>\n\nint _RED = <span class="number">1</span>;\nint _BLACK = <span class="number">0</span>;\n\nrb_tree * RBTreeCreate() {\n    rb_tree* newTree;\n    rb_tree_node* newNode;\n    newTree = (rb_tree*) SafeMalloc(sizeof(rb_tree));\n    newTree->nil = newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));\n    newNode->left = newNode->right = newNode->p = newNode;\n    newNode->key = <span class="number">0</span>;\n    newNode->color = _BLACK;\n    newTree->root = newTree->nil;\n    <span class="keyword">return</span> newTree;\n}\n\nvoid _LeftRotate(rb_tree* t, rb_tree_node* x) {\n    rb_tree_node* y;\n    y = x->right;\n    x->right = y->left;\n    <span class="keyword">if</span> (y->left != t->nil) {\n        y->left->p = x;\n    }\n    y->p = x->p;\n    <span class="keyword">if</span> (x->p == t->nil) {\n        t->root = y;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (x == x->p->left) {\n        x->p->left = y;\n    } <span class="keyword">else</span> {\n        x->p->right = y;\n    }\n    y->left = x;\n    x->p = y;\n}\n\nvoid _RightRotate(rb_tree* t, rb_tree_node* y) {\n    rb_tree_node* x;\n    x = y->left;\n    y->left = x->right;\n    <span class="keyword">if</span> (x->right != t->nil) {\n        x->right->p = y;\n    }\n    x->p = y->p;\n    <span class="keyword">if</span> (y->p == t->nil) {\n        t->root = x;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (y == y->p->right) {\n        y->p->right = x;\n    } <span class="keyword">else</span> {\n        y->p->left = x;\n    }\n    x->right = y;\n    y->p = x;\n}\n\nvoid _InsertFixUp(rb_tree* t, rb_tree_node *z) {\n    rb_tree_node *y;\n    <span class="keyword">while</span> (z->p->color == _RED) {\n        <span class="keyword">if</span> (z->p == z->p->p->left) {\n            y = z->p->p->right;\n            <span class="keyword">if</span> (y->color == _RED) {\n                z->p->color = _BLACK;\n                y->color = _BLACK;\n                z->p->p->color = _RED;\n                z = z->p->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (z == z->p->right) {\n                    z= z->p;\n                    _LeftRotate(t, z);\n                }\n                z->p->color = _BLACK;\n                z->p->p->color = _RED;\n                _RightRotate(t, z->p->p);\n            }\n        } <span class="keyword">else</span> {\n            y = z->p->p->left;\n            <span class="keyword">if</span> (y->color == _RED) {\n                z->p->color = _BLACK;\n                y->color = _BLACK;\n                z->p->p->color = _RED;\n                z = z->p->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (z == z->p->left) {\n                    z= z->p;\n                    _RightRotate(t, z);\n                }\n                z->p->color = _BLACK;\n                z->p->p->color = _RED;\n                _LeftRotate(t, z->p->p);\n            }\n        }\n    }\n    t->root->color = _BLACK;\n}\n\nvoid _Insert(rb_tree* t, rb_tree_node* z) {\n    rb_tree_node* x;\n    rb_tree_node* y;\n    y = t->nil;\n    x = t->root;\n    <span class="keyword">while</span> (x != t->nil) {\n        y = x;\n        <span class="keyword">if</span> (z->key &lt; x->key) {\n            x = x->left;\n        } <span class="keyword">else</span> {\n            x = x->right;\n        }\n    }\n    z->p = y;\n    <span class="keyword">if</span> (y == t->nil) {\n        t->root = z;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (z->key &lt; y->key) {\n        y->left = z;\n    } <span class="keyword">else</span> {\n        y->right = z;\n    }\n    z->left = t->nil;\n    z->right = t->nil;\n    z->color = _RED;\n    _InsertFixUp(t, z);\n}\n\nvoid RBTreeInsert(rb_tree* t, int key) {\n    rb_tree_node* newNode;\n    newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));\n    newNode->key = key;\n    _Insert(t, newNode);\n}\n\nvoid _Transplant(rb_tree* t, rb_tree_node* u, rb_tree_node* v) {\n    <span class="keyword">if</span> (u->p == t->nil) {\n        t->root = v;\n    } <span class="keyword">else</span> <span class="keyword">if</span> (u == u->p->left) {\n        u->p->left = v;\n    } <span class="keyword">else</span> {\n        u->p->right = v;\n    }\n    v->p = u->p;\n}\n\nvoid _DeleteFixUp(rb_tree* t, rb_tree_node* x) {\n    rb_tree_node* w;\n    <span class="keyword">while</span> (x != t->root &amp;&amp; x->color == _BLACK) {\n        <span class="keyword">if</span> (x == x->p->left) {\n            w = x->p->right;\n            <span class="keyword">if</span> (w->color == _RED) {\n                w->color = _BLACK;\n                x->p->color = _RED;\n                _LeftRotate(t, x->p);\n                w = x->p->right;\n            }\n            <span class="keyword">if</span> (w->left->color == _BLACK &amp;&amp; w->right->color == _BLACK) {\n                w->color = _RED;\n                x = x->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (w->right->color == _BLACK) {\n                    w->left->color = _BLACK;\n                    w->color = _RED;\n                    _RightRotate(t, w);\n                    w = x->p->right;\n                }\n                w->color = x->p->color;\n                x->p->color = _BLACK;\n                w->right->color = _BLACK;\n                _LeftRotate(t, x->p);\n                x = t->root;\n            }\n        } <span class="keyword">else</span> {\n            w = x->p->left;\n            <span class="keyword">if</span> (w->color == _RED) {\n                w->color = _BLACK;\n                x->p->color = _RED;\n                _RightRotate(t, x->p);\n                w = x->p->left;\n            }\n            <span class="keyword">if</span> (w->right->color == _BLACK &amp;&amp; w->left->color == _BLACK) {\n                w->color = _RED;\n                x = x->p;\n            } <span class="keyword">else</span> {\n                <span class="keyword">if</span> (w->left->color == _BLACK) {\n                    w->right->color = _BLACK;\n                    w->color = _RED;\n                    _LeftRotate(t,w);\n                    w = x->p->left;\n                }\n                w->color = x->p->color;\n                x->p->color = _BLACK;\n                w->left->color = _BLACK;\n                _RightRotate(t, x->p);\n                x = t->root;\n            }\n        }\n    }\n    x->color =_BLACK;\n}\n\nrb_tree_node* _Minimum(rb_tree* t, rb_tree_node *z) {\n    <span class="keyword">while</span> (z->left != t->nil) {\n        z = z->left;\n    }\n    <span class="keyword">return</span> z;\n}\n\nvoid _Delete(rb_tree* t, rb_tree_node *z) {\n    rb_tree_node* x;\n    rb_tree_node* y;\n    int y_original_color;\n    y = z;\n    y_original_color = y->color;\n    <span class="keyword">if</span> (z->left == t->nil) {\n        x = z->right;\n        _Transplant(t, z, z->right);\n    } <span class="keyword">else</span> <span class="keyword">if</span> (z->right == t->nil) {\n        x = z->left;\n        _Transplant(t, z, z->left);\n    } <span class="keyword">else</span> {\n        y = _Minimum(t, z->right);\n        y_original_color = y->color;\n        x = y->right;\n        <span class="keyword">if</span> (y->p == z) {\n            x->p = y;\n        } <span class="keyword">else</span> {\n            _Transplant(t, y, y->right);\n            y->right = z->right;\n            y->right->p = y;\n        }\n        _Transplant(t, z, y);\n        y->left = z->left;\n        y->left->p = y;\n        y->color = z->color;\n    }\n    <span class="keyword">if</span> (y_original_color == _BLACK) {\n        _DeleteFixUp(t, x);\n    }\n}\n\nrb_tree_node* _Search(rb_tree* t, rb_tree_node* x, int k) {\n    <span class="keyword">while</span> (x != t->nil &amp;&amp; k != x->key) {\n        <span class="keyword">if</span> (k &lt; x->key) {\n            x = x->left;\n        } <span class="keyword">else</span> {\n            x = x->right;\n        }\n    }\n    <span class="keyword">return</span> x;\n}\n\nrb_tree_node* RBTreeSearch(rb_tree* t, int k) {\n    <span class="keyword">return</span> _Search(t, t->root, k);\n}\n\nvoid RBTreeDelete(rb_tree* t, int key) {\n    rb_tree_node* newNode = _Search(t, t->root, key);\n    <span class="keyword">if</span> (newNode != t->nil) {\n        _Delete(t, newNode);\n    }\n}\n\nvoid _InorderWalk(rb_tree* t, rb_tree_node* x) {\n    <span class="keyword">if</span> (x != t->nil) {\n        _InorderWalk(t, x->left);\n        printf(<span class="string">"%d "</span>, x->key);\n        _InorderWalk(t, x->right);\n    }\n}\n\nvoid RBTreeInorderWalk(rb_tree* t) {\n    _InorderWalk(t, t->root);\n    printf(<span class="string">"\\n"</span>);\n}\n\nvoid _Destroy(rb_tree* t, rb_tree_node* x) {\n    <span class="keyword">if</span> (x != t->nil) {\n        _Destroy(t, x->left);\n        _Destroy(t, x->right);\n        free(x);\n    }\n}\n\nvoid RBTreeDestroy(rb_tree* t) {\n    _Destroy(t, t->root);\n    free(t->nil);\n}'},52:function(t,e,n){t.exports='<span class="comment">#ifndef RB_TREE_H</span>\n<span class="comment">#define RB_TREE_H</span>\n\ntypedef struct rb_tree_node {\n    int key;\n    int color;\n    struct rb_tree_node* left;\n    struct rb_tree_node* right;\n    struct rb_tree_node* p;\n} rb_tree_node;\n\ntypedef struct rb_tree {\n    rb_tree_node* root;\n    rb_tree_node* nil;\n} rb_tree;\n\nrb_tree* RBTreeCreate();\nvoid RBTreeInsert(rb_tree*, int);\nvoid RBTreeDelete(rb_tree*, int);\nvoid RBTreeDestroy(rb_tree*);\nrb_tree_node* RBTreeSearch(rb_tree*, int);\nvoid RBTreeInorderWalk(rb_tree*);\n\n<span class="comment">#endif</span>'},53:function(t,e,n){t.exports='<span class="comment">#include &lt;stdio.h></span>\n<span class="comment">#include "./rb-tree.h"</span>\n\nint main(int argc, char <span class="keyword">const</span> *argv[]) {\n  int i;\n  int k;\n  rb_tree* rbTree = RBTreeCreate();\n  <span class="keyword">while</span> (scanf(<span class="string">"%d"</span>, &amp;i) != EOF) {\n    scanf(<span class="string">"%d"</span>, &amp;k);\n    <span class="keyword">switch</span> (i) {\n      <span class="keyword">case</span> <span class="number">0</span>:\n        RBTreeInsert(rbTree, k);\n        <span class="keyword">break</span>;\n      <span class="keyword">case</span> <span class="number">1</span>:\n        RBTreeDelete(rbTree, k);\n        <span class="keyword">break</span>;\n      <span class="keyword">case</span> <span class="number">2</span>:\n        RBTreeSearch(rbTree, k);\n        <span class="keyword">break</span>;\n    }\n    RBTreeInorderWalk(rbTree);\n  }\n  RBTreeDestroy(rbTree);\n  <span class="keyword">return</span> <span class="number">0</span>;\n};'},69:function(t,e,n){function r(t){return void 0===t.color?"transparent":t.color===I?"red":"black"}function s(t,e,n){D[t.id]=D[t.id]||{},D[t.id].curr=e}function a(t,e,n){var r=t.id,s=n||t[e].id,a=r+e;x.ne[a]&&(s=x.ne[a]);var i=D[s].curr.x-D[r].curr.x,o=D[s].curr.y-D[r].curr.y,c=Math.sqrt(i*i+o*o);return i*=B/c,o*=B/c,{dx:i,dy:o,from:t.id,to:s,type:e,id:a,hide:k}}function i(t){T.push(t.id);var e=t.color;return void 0!==x.co[t.id]&&(e=x.co[t.id]),{color:e,v:t.key,id:t.id,hide:k}}function o(t,e){e=e||t.p.id,void 0===D[t.id].prev&&(void 0===D[e]?D[t.id].prev=D[t.id].curr:D[t.id].prev=D[e].prev||D[t.id].curr),t.p&&L.push(a(t,"p")),t.id===x.hl&&(k=!1),S.push(i(t)),t.left&&(L.push(a(t,"left")),o(t.left,t.id)),t.right&&(L.push(a(t,"right")),o(t.right,t.id)),t.id===x.hl&&(k=!0)}function c(){S=[],L=[],T=[];for(var t in D)D[t].prev=D[t].curr;s(x.tree.nil,{x:0,y:1.5*-C}),D[x.tree.nil.id].prev=D[x.tree.nil.id].curr,x.tree.root.nil!==!0&&(s(x.tree.root,{x:0,y:0}),l(x.tree.root.left,0,0,-R),l(x.tree.root.right,0,0,R)),k=void 0===x.hl?!1:!0,S.push(i(x.tree.nil)),x.tree.root.nil!==!0&&o(x.tree.root),k=!1,x.nn&&(S.push(i(x.nn)),x.ne[x.nn.id+"p"]&&a(x.nn,"p",x.ne[x.nn.id+"p"]),s(x.nn,{x:D[x.nn.ref].curr.x,y:D[x.nn.ref].curr.y-C/2},1),void 0===D[x.nn.id].prev&&(D[x.nn.id].prev=D[x.nn.ref].curr)),Object.keys(D).filter(function(t){return-1===T.indexOf(+t)}).forEach(function(t){delete D[t]})}function l(t,e,n,r){if(void 0!==t){var a,i;return 0>r?(a="right",i="left"):(a="left",i="right"),t.nil||void 0===t[a]?s(t,{x:n+r,y:e+C}):s(t,{x:l(t[a],e+C,n,r)+r,y:e+C}),t.nil||void 0===t[i]?D[t.id].curr.x:l(t[i],e+C,D[t.id].curr.x,r)}}function p(){w.selectAll("circle.node").data(S,function(t){return t.id}).enter().append("circle").attr("class","node").attr("cx",function(t){return D[t.id].prev.x}).attr("cy",function(t){return D[t.id].prev.y}).attr("r",B).style("fill",function(t){return t.color?"red":"black"}),w.selectAll("circle.node").data(S,function(t){return t.id}).transition().duration(b).attr("cx",function(t){return D[t.id].curr.x}).attr("cy",function(t){return D[t.id].curr.y}).style("fill",r).style("opacity",function(t){return t.hide?.3:1}),w.selectAll("circle.node").data(S,function(t){return t.id}).exit().remove()}function u(){_.selectAll("line.edge").data(L,function(t){return t.id}).enter().append("line").attr("class","edge").attr("x1",function(t){return D[t.from].prev.x+t.dx}).attr("y1",function(t){return D[t.from].prev.y+t.dy}).attr("x2",function(t){return D[t.from].prev.x+t.dx}).attr("y2",function(t){return D[t.from].prev.y+t.dy}).classed("parent",function(t){return"p"===t.type?!0:!1}).classed("child",function(t){return"p"!==t.type?!0:!1}),_.selectAll("line.edge").data(L,function(t){return t.id}).transition().duration(b).attr("x1",function(t){return D[t.from].curr.x+t.dx}).attr("y1",function(t){return D[t.from].curr.y+t.dy}).attr("x2",function(t){return D[t.to].curr.x-t.dx}).attr("y2",function(t){return D[t.to].curr.y-t.dy}).style("opacity",function(t){return t.hide?.3:1}),_.selectAll("line.edge").data(L,function(t){return t.id}).exit().remove()}function f(){y.selectAll("text.node").data(S,function(t){return t.id}).enter().append("text").attr("class","node").attr("x",function(t){return D[t.id].prev.x}).attr("y",function(t){return D[t.id].prev.y}).attr("dy",5).text(function(t){return t.id+"-"+t.v}),y.selectAll("text.node").data(S,function(t){return t.id}).transition().duration(b).attr("x",function(t){return D[t.id].curr.x}).attr("y",function(t){return D[t.id].curr.y}).style("opacity",function(t){return t.hide?.3:1}),y.selectAll("text.node").data(S,function(t){return t.id}).exit().remove()}function h(t,e){x=t,b=e}function d(t,e){h(t,e),c(),u(),p(),f()}function g(){var t=this,e=E.behavior.zoom().scaleExtent([.1,10]).on("zoom",function(){t.svg.attr("transform",A().translate(E.event.translate).scale(E.event.scale))});this.svg=E.select(this.refs.svg.getDOMNode()).append("svg").call(e).append("g"),this.g=this.svg.append("g").attr("transform",A().translate(100,100).scale(1)),this.gbase=this.g.append("g").attr("class","base"),this.ghigh=this.g.append("g").attr("class","high"),this.gtext=this.g.append("g").attr("class","text"),m=this.gbase,_=this.gbase.append("g").attr("class","edges"),w=this.gbase.append("g").attr("class","nodes"),y=this.gtext,v=this.ghigh}var m,y,v,w,_,x,b,k,E=n(3),A=n(5),D={},S=[],L=[],T=[],R=35,C=70,B=15,I=1;t.exports={init:g,render:d}}});