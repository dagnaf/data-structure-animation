#include <stdio.h>
#include <string.h>
#include "stack.h"
#include "eval-stack.h"

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
