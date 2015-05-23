#include <stdio.h>
#include "./queue.h"

int main(int argc, char const *argv[]) {
  int cmd;
  int a;
  int *b;
  queue *q = QueueCreate(10, sizeof(int));
  while (scanf("%d", &cmd) != EOF) {
    switch(cmd) {
      case 0:
        scanf("%d\n", &a);
        b = QueuePush(q, &a);
        if (b == NULL) {
          printf("push null\n");
        } else {
          printf("push %d\n", *b);
        }
        break;
      case 1:
        b = QueuePeak(q);
        if (b == NULL) {
          printf("peak null\n");
        } else {
          printf("peak %d\n", *b);
        }
        break;
      case 2:
        b = QueuePop(q);
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
  QueueDestroy(q);
  return 0;
};
