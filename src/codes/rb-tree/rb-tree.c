#include <stdio.h>
#include <stdlib.h>
#include "./rb-tree.h"
#include "../common/util.h"

int _RED = 1;
int _BLACK = 0;

rb_tree * RBTreeCreate() {
    rb_tree* newTree;
    rb_tree_node* newNode;

    newTree = (rb_tree*) SafeMalloc(sizeof(rb_tree));

    newTree->nil = newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));
    newNode->left = newNode->right = newNode->p = newNode;
    newNode->key = 0;
    newNode->color = _BLACK;

    newTree->root = newTree->nil;

    return newTree;
}

void _LeftRotate(rb_tree* t, rb_tree_node* x) {
    rb_tree_node* y;
    y = x->right;
    x->right = y->left;
    if (y->left != t->nil) {
        y->left->p = x;
    }
    y->p = x->p;
    if (x->p == t->nil) {
        t->root = y;
    } else if (x == x->p->left) {
        x->p->left = y;
    } else {
        x->p->right = y;
    }
    y->left = x;
    x->p = y;
}

void _RightRotate(rb_tree* t, rb_tree_node* y) {
    rb_tree_node* x;
    x = y->left;
    y->left = x->right;
    if (x->right != t->nil) {
        x->right->p = y;
    }
    x->p = y->p;
    if (y->p == t->nil) {
        t->root = x;
    } else if (y == y->p->right) {
        y->p->right = x;
    } else {
        y->p->left = x;
    }
    x->right = y;
    y->p = x;
}

void _InsertFixUp(rb_tree* t, rb_tree_node *z) {
    rb_tree_node *y;
    while (z->p->color == _RED) {
        if (z->p == z->p->p->left) {
            y = z->p->p->right;
            if (y->color == _RED) {
                z->p->color = _BLACK;
                y->color = _BLACK;
                z->p->p->color = _RED;
                z = z->p->p;
            } else {
                if (z == z->p->right) {
                    z= z->p;
                    _LeftRotate(t, z);
                }
                z->p->color = _BLACK;
                z->p->p->color = _RED;
                _RightRotate(t, z->p->p);
            }
        } else {
            y = z->p->p->left;
            if (y->color == _RED) {
                z->p->color = _BLACK;
                y->color = _BLACK;
                z->p->p->color = _RED;
                z = z->p->p;
            } else {
                if (z == z->p->left) {
                    z= z->p;
                    _RightRotate(t, z);
                }
                z->p->color = _BLACK;
                z->p->p->color = _RED;
                _LeftRotate(t, z->p->p);
            }
        }
    }
    t->root->color = _BLACK;
}

void _Insert(rb_tree* t, rb_tree_node* z) {
    rb_tree_node* x;
    rb_tree_node* y;
    y = t->nil;
    x = t->root;
    while (x != t->nil) {
        y = x;
        if (z->key < x->key) {
            x = x->left;
        } else {
            x = x->right;
        }
    }
    z->p = y;
    if (y == t->nil) {
        t->root = z;
    } else if (z->key < y->key) {
        y->left = z;
    } else {
        y->right = z;
    }
    z->left = t->nil;
    z->right = t->nil;
    z->color = _RED;
    _InsertFixUp(t, z);
}

void RBTreeInsert(rb_tree* t, int key) {
    rb_tree_node* newNode;
    newNode = (rb_tree_node*) SafeMalloc(sizeof(rb_tree_node));
    newNode->key = key;
    _Insert(t, newNode);
}

void _Transplant(rb_tree* t, rb_tree_node* u, rb_tree_node* v) {
    if (u->p == t->nil) {
        t->root = v;
    } else if (u == u->p->left) {
        u->p->left = v;
    } else {
        u->p->right = v;
    }
    v->p = u->p;
}

void _DeleteFixUp(rb_tree* t, rb_tree_node* x) {
    rb_tree_node* w;
    while (x != t->root && x->color == _BLACK) {
        if (x == x->p->left) {
            w = x->p->right;
            if (w->color == _RED) {
                w->color = _BLACK;
                x->p->color = _RED;
                _LeftRotate(t, x->p);
                w = x->p->right;
            }
            if (w->left->color == _BLACK && w->right->color == _BLACK) {
                w->color = _RED;
                x = x->p;
            } else {
                if (w->right->color == _BLACK) {
                    w->left->color = _BLACK;
                    w->color = _RED;
                    _RightRotate(t, w);
                    w = x->p->right;
                }
                w->color = x->p->color;
                x->p->color = _BLACK;
                w->right->color = _BLACK;
                _LeftRotate(t, x->p);
                x = t->root;
            }
        } else {
            w = x->p->left;
            if (w->color == _RED) {
                w->color = _BLACK;
                x->p->color = _RED;
                _RightRotate(t, x->p);
                w = x->p->left;
            }
            if (w->right->color == _BLACK && w->left->color == _BLACK) {
                w->color = _RED;
                x = x->p;
            } else {
                if (w->left->color == _BLACK) {
                    w->right->color = _BLACK;
                    w->color = _RED;
                    _LeftRotate(t,w);
                    w = x->p->left;
                }
                w->color = x->p->color;
                x->p->color = _BLACK;
                w->left->color = _BLACK;
                _RightRotate(t, x->p);
                x = t->root;
            }
        }
    }
    x->color =_BLACK;
}

rb_tree_node* _Minimum(rb_tree* t, rb_tree_node *z) {
    while (z->left != t->nil) {
        z = z->left;
    }
    return z;
}

void _Delete(rb_tree* t, rb_tree_node *z) {
    rb_tree_node* x;
    rb_tree_node* y;
    int y_original_color;
    y = z;
    y_original_color = y->color;
    if (z->left == t->nil) {
        x = z->right;
        _Transplant(t, z, z->right);
    } else if (z->right == t->nil) {
        x = z->left;
        _Transplant(t, z, z->left);
    } else {
        y = _Minimum(t, z->right);
        y_original_color = y->color;
        x = y->right;
        if (y->p == z) {
            x->p = y;
        } else {
            _Transplant(t, y, y->right);
            y->right = z->right;
            y->right->p = y;
        }
        _Transplant(t, z, y);
        y->left = z->left;
        y->left->p = y;
        y->color = z->color;
    }
    if (y_original_color == _BLACK) {
        _DeleteFixUp(t, x);
    }
}

rb_tree_node* _Search(rb_tree* t, rb_tree_node* x, int k) {
    while (x != t->nil && k != x->key) {
        if (k < x->key) {
            x = x->left;
        } else {
            x = x->right;
        }
    }
    return x;
}

rb_tree_node* RBTreeSearch(rb_tree* t, int k) {
    return _Search(t, t->root, k);
}

void RBTreeDelete(rb_tree* t, int key) {
    rb_tree_node* newNode = _Search(t, t->root, key);
    if (newNode != t->nil) {
        _Delete(t, newNode);
    }
}

void _InorderWalk(rb_tree* t, rb_tree_node* x) {
    if (x != t->nil) {
        _InorderWalk(t, x->left);
        printf("%d ", x->key);
        _InorderWalk(t, x->right);
    }
}

void RBTreeInorderWalk(rb_tree* t) {
    _InorderWalk(t, t->root);
    printf("\n");
}

void _Destroy(rb_tree* t, rb_tree_node* x) {
    if (x != t->nil) {
        _Destroy(t, x->left);
        _Destroy(t, x->right);
        free(x);
    }
}

void RBTreeDestroy(rb_tree* t) {
    _Destroy(t, t->root);
    free(t->nil);
}
