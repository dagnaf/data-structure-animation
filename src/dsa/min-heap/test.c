#include <stdio.h>
#include "../common/util.h"
#include "./min-heap.h"

int cf(const void* a, const void* b) {
  return *(int*)a - *(int*)b;
}

void print(min_heap* h) {
  int i;
  for (i = 0; i < h->size; ++i) {
    printf("%d ", *(int*)(h->array[i]));
  }
  printf("\n");
}

int main(int argc, char const *argv[])
{
  int n;
  int i;
  int* a;
  printf("enter total number: ");
  scanf("%d\n", &n);
  min_heap* mh = MinHeapCreate(n, cf);
  for (i = 0; i < n; ++i) {
    a = (int*)SafeMalloc(sizeof(int));
    scanf("%d", a);
    MinHeapInsert(mh, a);
  }
  for (i = 0; i < n; ++i) {
    a = (int*)MinHeapPop(mh);
    printf("%d ", *a);
  }
  printf("\n");
  return 0;
}
