#ifndef QUEUE_H
#define QUEUE_H
#include <stddef.h>
typedef struct queue {
  int front;
  int tail;
  int capacity;
  size_t item_size;
  void *items;
} queue;

queue *QueueCreate(int n, size_t item_size);
void QueueDestroy(queue *q);
int QueueIsEmpty(queue *q);
int QueueIsFull(queue *q);
void *QueuePop(queue *q);
void *QueuePeak(queue *q);
void *QueuePush(queue *q, void *x);

#endif

