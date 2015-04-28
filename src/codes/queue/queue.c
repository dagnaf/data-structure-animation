#include <stdio.h>
#include "./queue.h"

void init(Queue *q) {
    q->head = 0;
    q->tail = 1;
}

int isFull(Queue *q) {
    if (q->head == q->tail) {
        return 1;
    } else {
        return 0;
    }
}

int isEmpty(Queue *q) {
    if ((q->head + 1) % N == q->tail) {
        return 1;
    } else {
        return 0;
    }
}

void enque(Queue *q, int val) {
    if (isFull(q) == 1) {
        printf("queue full.\n");
    } else {
        q->data[q->tail] = val;
        q->tail = (q->tail + 1) % N;
    }
}

void deque(Queue *q) {
    if (isEmpty(q) == 1) {
        printf("queue empty.\n");
    } else {
        q->head = (q->head + 1) % N;
    }
}

int front(Queue *q) {
    if (isEmpty(q) == 1) {
        printf("queue empty.\n");
        return -1;
    } else {
        return q->data[(q->head + 1) % N];
    }
}
