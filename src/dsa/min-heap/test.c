#include <stdio.h>
#include <stdlib.h>
#include "../common/util.h"
#include "./min-heap.h"

int cf(const void* a, const void* b) {
  return *(int*)a - *(int*)b;
}

void print(min_heap* h, int *a) {
  int i;
  for (i = 0; i < h->capacity; ++i) {
    printf("%2d ", i);
  }
  printf("--#\n");
  for (i = 0; i < h->capacity; ++i) {
    printf("%2d ", h->map[i]);
  }
  printf("--map\n");
  for (i = 0; i < h->size; ++i) {
    printf("%2d ", *(int *)(h->array[i].item));
  }
  printf("--heap\n");
  for (i = 0; i < h->capacity; ++i) {
    printf("%2d ", a[i]);
  }
  printf("--a\n");
  printf("~~~~~~~~~~~~~~~~~~~\n");
}

int main(int argc, char const *argv[])
{
  int n;
  int i;
  int *a;
  int *b;
  int x,cmd;
  while (scanf("%d\n", &n) != EOF) {
    a = SafeMalloc(n*sizeof(int));
    min_heap* mh = MinHeapCreate(n, sizeof(int), cf);
    for (i = 0; i < n; ++i) {
      scanf("%d", &a[i]);
      MinHeapInsert(mh, &a[i], i);
      print(mh, a);
    }
    while (1) {
      scanf("%d", &cmd);
      if (cmd == -1) {
        break;
      }
      switch (cmd) {
        case 0:
          b = MinHeapPop(mh);
          printf("pop %d\n", *b);
          free(b);
          break;
        case 1:
          scanf("%d", &x);
          scanf("%d", &a[x]);
          MinHeapUpdate(mh, &a[x], x);
          printf("update a[%d] = %d\n",x,a[x]);
          break;
      }
      print(mh, a);
    }
    MinHeapDestroy(mh);
    free(a);
  }
  return 0;
}
