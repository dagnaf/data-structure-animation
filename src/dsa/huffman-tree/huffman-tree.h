#ifndef HUFFMAN_TREE_H
#define HUFFMAN_TREE_H

typedef struct huffman_tree_node {
  int key;
  char val;
  struct huffman_tree_node* left;
  struct huffman_tree_node* right;
} huffman_tree_node;

typedef struct huffman_tree_item {
  int key;
  char val;
  char* code;
} huffman_tree_item;

typedef struct huffman_tree {
  struct huffman_tree_node* root;
  struct huffman_tree_item** table;
  int size;
} huffman_tree;

huffman_tree* HuffmanTreeCreate(char *);
huffman_tree* HuffmanTreeCreateWithFreq(char *, int *);

#endif
