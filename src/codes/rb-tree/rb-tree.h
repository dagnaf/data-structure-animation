#ifndef RB_TREE_H
#define RB_TREE_H

typedef struct rb_tree_node {
    int key;
    int color;
    struct rb_tree_node* left;
    struct rb_tree_node* right;
    struct rb_tree_node* p;
} rb_tree_node;

typedef struct rb_tree {
    rb_tree_node* root;
    rb_tree_node* nil;
} rb_tree;

rb_tree* RBTreeCreate();
void RBTreeInsert(rb_tree*, int);
void RBTreeDelete(rb_tree*, int);
void RBTreeDestroy(rb_tree*);
rb_tree_node* RBTreeSearch(rb_tree*, int);
void RBTreeInorderWalk(rb_tree*);

#endif
