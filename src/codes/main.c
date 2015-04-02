#include <stdio.h>
#include "stack.h"
// main.c
int main(int argc, char const *argv[]) {
    freopen("in", "r", stdin);
    Expression expr;
    char str[N];
    scanf("%s", str);
    expr.str = str;
    expr.ptr = expr.str;
    int val = eval(&expr);
    printf("%s=%d\n", str, val);
    return 0;
};
