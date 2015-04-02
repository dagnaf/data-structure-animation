#include <stdio.h>
#include <string.h>
// 测试汉字
#define N 100

typedef struct {
    int top;
    int data[N];
} Stack;
void init(Stack *s);
int isFull(Stack *s);
int isEmpty(Stack *s);
void push(Stack *s, int val);
void pop(Stack *s);
int peak(Stack *s);
int prior(char instack, char coming);
void poppush(Stack *nums, Stack *ops);
typedef struct {
    char *ptr;
    char *str;
} Expression;
int eval(Expression *expr);
