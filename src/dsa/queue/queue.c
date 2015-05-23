#include <stddef.h>
#include <stdlib.h>
#include "../common/util.h"
#include "./queue.h"

int QueueIsEmpty(queue *q) {
  return q->front != q->tail ? 0 : 1;
}

int QueueIsFull(queue *q) {
  return (q->tail+1) % q->capacity != q->front ? 0 : 1;
}

void *QueuePop(queue *q) {
  void *item = NULL;
  if (!QueueIsEmpty(q)) {
    item = (char *)q->items + q->front*q->item_size;
    q->front = (q->front+1) % q->capacity;
  }
  return item;
}

void *QueuePeak(queue *q) {
  void *item = NULL;
  if (!QueueIsEmpty(q)) {
    item = (char *)q->items + q->front*q->item_size;
  }
  return item;
}

void *QueuePush(queue *q, void *x) {
  if (!QueueIsFull(q)) {
    MemoryCopy((char *)q->items + q->tail*q->item_size, x, q->item_size);
    q->tail = (q->tail+1) % q->capacity;
    return x;
  }
  return NULL;
}

queue *QueueCreate(int n, size_t item_size) {
  n = n+1;  // 1 for front-tail
  queue *q = SafeMalloc(sizeof(queue));
  q->capacity = n;
  q->front = q->tail = 0;
  q->items = SafeMalloc(item_size*n);
  q->item_size = item_size;
  return q;
}

void QueueDestroy(queue *q) {
  free(q->items);
  free(q);
}
