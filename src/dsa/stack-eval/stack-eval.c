#include <stdio.h>
#include <string.h>
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

void poppush(stack *nums, stack *ops) {
    int a;
    int b;
    int op;
    a = *(int *)StackPeak(nums);
    StackPop(nums);
    b = *(int *)StackPeak(nums);
    StackPop(nums);
    op = *(char *)StackPeak(ops);
    StackPop(ops);
    switch(op) {
        case '+': a = a+b; StackPush(nums, &a); break;
        case '-': a = b-a; StackPush(nums, &a); break;
        case '*': a = a*b; StackPush(nums, &a); break;
        case '/': a = b/a; StackPush(nums, &a); break;
        default: break;
    }
};

int eval(char *str) {
    int l = strlen(str);
    int num;
    char op;
    stack *nums = StackCreate(l, sizeof(int));
    stack *ops = StackCreate(l, sizeof(char));
    for (; *str != '\0'; str++) {
        if ('0' <= *str && *str <= '9') {
            num = (int)(*str - '0');
            StackPush(nums, &num);
        } else {
            while (StackIsEmpty(ops) == 0 && prior(*(char *)StackPeak(ops), *str) == 1) {
                poppush(nums, ops);
            }
            if (*str == ')') {
                StackPop(ops);
            } else {
                op = *str;
                StackPush(ops, &op);
            }
        }
    }
    while (StackIsEmpty(ops) == 0) {
        poppush(nums, ops);
    }
    num = *(int *)StackPeak(nums);
    StackDestroy(nums);
    StackDestroy(ops);
    return num;
};
