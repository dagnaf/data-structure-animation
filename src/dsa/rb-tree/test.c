#include <stdio.h>
#include "./rb-tree.h"

int main(int argc, char const *argv[]) {
  int i;
  int k;
  rb_tree* rbTree = RBTreeCreate();
  while (scanf("%d", &i) != EOF) {
    scanf("%d", &k);
    switch (i) {
      case 0:
        RBTreeInsert(rbTree, k);
        break;
      case 1:
        RBTreeDelete(rbTree, k);
        break;
      case 2:
        RBTreeSearch(rbTree, k);
        break;
    }
    RBTreeInorderWalk(rbTree);
  }
  RBTreeDestroy(rbTree);
  return 0;
};
