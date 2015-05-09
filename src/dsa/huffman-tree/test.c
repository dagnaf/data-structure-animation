#include <stdio.h>
#include <string.h>
#include "./huffman-tree.h"

int main(int argc, char const *argv[]) {
  char *s;
  size_t buf = 0;
  int tbl[100];
  int i;
  int l;
  int type;
  huffman_tree* t;
  printf("0: full text, 1: text with freq > ");
  scanf("%d\n", &type);
  if (type) {
    getline(&s, &buf, stdin);
    l = strlen(s)-1;
    s[l--] = '\0';
    for (i = 0; i < l; ++i) {
      scanf("%d", &tbl[i]);
    }
    t = HuffmanTreeCreateWithFreq(s, tbl);
  } else {
    getline(&s, &buf, stdin);
    l = strlen(s)-1;
    s[l--] = '\0';
    printf("%s\n",s);
    t = HuffmanTreeCreate(s);
  }
  for (i = 0; i < t->size; ++i) {
    printf("char %c, freq %d, code %s\n", t->table[i]->val, t->table[i]->key, t->table[i]->code);
  }
  return 0;
};
