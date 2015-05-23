#include <stddef.h>
#include <stdlib.h>
#include "../common/util.h"
#include "./stack.h"

int StackIsEmpty(stack *s) {
  return s->top > 0 ? 0 : 1;
}

int StackIsFull(stack *s) {
  return s->top < s->capacity ? 0 : 1;
}

void* StackPop(stack *s) {
  void *item = NULL;
  if (!StackIsEmpty(s)) {
    item = (char *)s->items + (s->top-1)*s->item_size;
    s->top--;
  }
  return item;
}

void* StackPeak(stack *s) {
  void *item = NULL;
  if (!StackIsEmpty(s)) {
    item = (char *)s->items + (s->top-1)*s->item_size;
  }
  return item;
}

void* StackPush(stack *s, void *x) {
  if (!StackIsFull(s)) {
    MemoryCopy((char *)s->items + s->top*s->item_size, x, s->item_size);
    s->top++;
    return x;
  }
  return NULL;
}

stack *StackCreate(int n, size_t item_size) {
  stack *s = SafeMalloc(sizeof(stack));
  s->capacity = n;
  s->item_size = item_size;
  s->top = 0;
  s->items = SafeMalloc(item_size*n);
  return s;
}

void StackDestroy(stack *s) {
  free(s->items);
  free(s);
}
