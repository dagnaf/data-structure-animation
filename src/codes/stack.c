#include <string.h>
#include "stack.h"

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
        s->data[s->top] = val;
        s->top = s->top + 1;
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

int prior(char instack, char coming) {
    if (instack == '+' || instack == '-') {
        if (coming == '+' || coming == '-' || coming == ')') return 1;
        else return -1;
    } else if (instack == '*' || instack == '/') {
        if (coming == '(') return -1;
        else return 1;
    } else if (instack == '(') {
        if (coming == ')') return 0;
        else return -1;
    }
    return -1;
};

void poppush(Stack *nums, Stack *ops) {
    int a;
    int b;
    int op;
    a = peak(nums);
    pop(nums);
    b = peak(nums);
    pop(nums);
    op = peak(ops);
    pop(ops);
    if (a == 0 && op == '/') {
        printf("divided by zero.\n");
        return;
    }
    switch(op) {
        case '+': push(nums, a+b); break;
        case '-': push(nums, b-a); break;
        case '*': push(nums, a*b); break;
        case '/': push(nums, b/a); break;
        default: break;
    }
};

int eval(Expression *expr) {
    int i;
    Stack nums;
    init(&nums);
    Stack ops;
    init(&ops);
    for (; *(expr->ptr) != '\0'; expr->ptr = expr->ptr + 1) {
        if ('0' <= *(expr->ptr) && *(expr->ptr) <= '9') {
            push(&nums,  *(expr->ptr) - '0');
        } else {
            while (isEmpty(&ops) == 0 && prior(peak(&ops), *(expr->ptr)) == 1) {
                poppush(&nums, &ops);
            }
            if (*(expr->ptr) == ')') {
                pop(&ops);
            } else {
                push(&ops, *(expr->ptr));
            }
        }
    }
    while (isEmpty(&ops) == 0) {
        poppush(&nums, &ops);
    }
    return peak(&nums);
};
