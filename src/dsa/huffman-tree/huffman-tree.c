#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "./huffman-tree.h"
#include "../min-heap/min-heap.h"
#include "../common/util.h"

huffman_tree_node* _NewNode(int k, char v, huffman_tree_node* l, huffman_tree_node* r) {
    huffman_tree_node* node = (huffman_tree_node*)SafeMalloc(sizeof(huffman_tree_node));
    node->key = k;
    node->val = v;
    node->left = l;
    node->right = r;
    return node;
}

huffman_tree_item* _NewItem(int k, char v, char* c) {
    huffman_tree_item* item = (huffman_tree_item*)SafeMalloc(sizeof(huffman_tree_item));
    item->key = k;
    item->val = v;
    item->code = (char*)SafeMalloc(sizeof(c));
    strcpy(item->code, c);
    return item;
}

char* _Append(char* s, char* t) {
    char* r = (char*)SafeMalloc(sizeof(s)+sizeof(char));
    strcpy(r,s);
    strcat(r,t);
    return r;
}

void _Traverse(huffman_tree* t, huffman_tree_node* x, char* s) {
    if (x->left == NULL && x->right == NULL) {
        t->table[t->size++] = _NewItem(x->key, x->val, s);
        return;
    }
    _Traverse(t, x->left, _Append(s,"0"));
    _Traverse(t, x->right, _Append(s,"1"));
}

huffman_tree* HuffmanTreeCreate(char *s) {
    int tbl[256];
    int i;
    int n = 0;
    char* s2 = NULL;
    int* tbl2 = NULL;
    for (i = 0; i < 256; ++i) {
        tbl[i] = 0;
    }
    for (i = 0; i < strlen(s); ++i) {
        if (0 <= s[i] && s[i] < 256) {
            if (tbl[(int)s[i]] == 0) {
                n++;
            }
            tbl[(int)s[i]]++;
        }
    }
    s2 = (char*)SafeMalloc(sizeof(char)*(n+1));
    tbl2 = (int*)SafeMalloc(sizeof(int)*(n));
    n = 0;
    for (i = 0; i < 256; ++i) {
        if (tbl[i] > 0) {
            s2[n] = (char)i;
            tbl2[n] = tbl[i];
            n++;
        }
    }
    s2[n] = '\0';
    return HuffmanTreeCreateWithFreq(s2,tbl2);
}

int _CompareFn(const void* a, const void* b) {
    return ((huffman_tree_node*)a)->key - ((huffman_tree_node*)b)->key;
}

huffman_tree* HuffmanTreeCreateWithFreq(char* s, int* tbl) {
    int i;
    int n;
    min_heap* h;
    huffman_tree* t;
    huffman_tree_node* node;
    huffman_tree_node* node1;
    huffman_tree_node* node2;
    n = strlen(s);
    h = MinHeapCreate(n, _CompareFn);
    for (i = 0; i < n; ++i) {
        node = _NewNode(tbl[i], s[i], NULL, NULL);
        MinHeapInsert(h, node);
    }
    while (h->size > 1) {
        node1 = (huffman_tree_node*)MinHeapPop(h);
        node2  = (huffman_tree_node*)MinHeapPop(h);
        node = _NewNode(node1->key + node2->key, node1->val, node1, node2);
        MinHeapInsert(h, node);
    }
    t = (huffman_tree*)SafeMalloc(sizeof(huffman_tree));
    t->root = (huffman_tree_node*)MinHeapPop(h);
    t->size = 0;
    t->table = (huffman_tree_item**)SafeMalloc(sizeof(huffman_tree_item*)*n);
    _Traverse(t, t->root, "");
    return t;
}
