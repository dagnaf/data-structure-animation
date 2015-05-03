#include <stdio.h>
#include "./stack.h"

void init(Stack *s) {
    s->top = 0;
};

int isFull(Stack *s) {
    if (s->top == N) {
        return 1;
    } else {
        return 0;
    }
};

int isEmpty(Stack *s) {
    if (s->top == 0) {
        return 1;
    } else {
        return 0;
    }
};

void push(Stack *s, int val) {
    if (isFull(s) == 1) {
        printf("stack full.\n");
    } else {
        s->data[s->top++] = val;
    }
};

void pop(Stack *s) {
    if (isEmpty(s) == 1) {
        printf("stack empty.\n");
    } else {
        s->top = s->top - 1;
    }
};

int peak(Stack *s) {
    if (isEmpty(s) == 1) {
        printf("stack empty.\n");
        return -1;
    } else {
        return s->data[s->top - 1];
    }
};
