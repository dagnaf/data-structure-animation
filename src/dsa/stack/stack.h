#ifndef STACK_H
#define STACK_H
#include <stddef.h>

typedef struct stack {
  int top;
  int capacity;
  size_t item_size;
  void *items;
} stack;

stack *StackCreate(int n, size_t item_size);
void StackDestroy(stack *s);
int StackIsEmpty(stack *s);
int StackIsFull(stack *s);
void* StackPop(stack *s);
void* StackPeak(stack *s);
void* StackPush(stack *s, void *x);

#endif
