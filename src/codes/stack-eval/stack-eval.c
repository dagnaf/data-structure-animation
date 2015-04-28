#include <stdio.h>
#include "../stack/stack.h"

int prior(char instack, char coming) {
    if (instack == '+' || instack == '-') {
        if (coming == '+' || coming == '-' || coming == ')') {
            return 1;
        } else {
            return -1;
        }
    } else if (instack == '*' || instack == '/') {
        if (coming == '(') {
            return -1;
        } else {
            return 1;
        }
    } else if (instack == '(') {
        if (coming == ')') {
            return 0;
        } else {
            return -1;
        }
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
    switch(op) {
        case '+': push(nums, a+b); break;
        case '-': push(nums, b-a); break;
        case '*': push(nums, a*b); break;
        case '/': push(nums, b/a); break;
        default: break;
    }
};

int eval(char *str) {
    int i;
    Stack nums;
    init(&nums);
    Stack ops;
    init(&ops);
    for (; *str != '\0'; str++) {
        if ('0' <= *str && *str <= '9') {
            push(&nums,  *str - '0');
        } else {
            while (isEmpty(&ops) == 0 && prior(peak(&ops), *str) == 1) {
                poppush(&nums, &ops);
            }
            if (*str == ')') {
                pop(&ops);
            } else {
                push(&ops, *str);
            }
        }
    }
    while (isEmpty(&ops) == 0) {
        poppush(&nums, &ops);
    }
    return peak(&nums);
};
