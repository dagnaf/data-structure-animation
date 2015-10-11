#include <stdio.h>
#include <assert.h>
#include "./stack-eval.h"

int main(int argc, char const *argv[]) {
    char s[100];
    int ret, exp;
    while (scanf("%s %d", s, &exp) != EOF) {
        ret = eval(s);
        printf("eval: %s = %d\n", s, ret);
        assert(ret == exp);
    }
    return 0;
}
