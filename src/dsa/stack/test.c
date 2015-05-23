#include <stdio.h>
#include "./stack.h"

int main(int argc, char const *argv[]) {
  int cmd;
  int a;
  int *b;
  stack *s = StackCreate(10, sizeof(int));
  while (scanf("%d", &cmd) != EOF) {
    switch(cmd) {
      case 0:
        scanf("%d\n", &a);
        b = StackPush(s, &a);
        if (b == NULL) {
          printf("push null\n");
        } else {
          printf("push %d\n", *b);
        }
        break;
      case 1:
        b = StackPeak(s);
        if (b == NULL) {
          printf("peak null\n");
        } else {
          printf("peak %d\n", *b);
        }
        break;
      case 2:
        b = StackPop(s);
        if (b == NULL) {
          printf("pop null\n");
        } else {
          printf("pop %d\n", *b);
        }
        break;
      default:
        break;
    }
  }
  StackDestroy(s);
  return 0;
};
