#include <stdio.h>
#include <assert.h>
#include "./search.h"
#include "../common/util.h"

int cf(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

int main(int argc, char const *argv[])
{
    int i;
    int n, m;
    int *a;
    int x;
    scanf("%d%d", &n, &m);
    a = SafeMalloc(sizeof(int)*n);
    for (i = 0; i < n; ++i) {
        scanf("%d", a+i);
    }
    for (i = 0; i < m; ++i) {
        scanf("%d", &x);
        printf("test %d search %d ", i+1, x);
        assert(LinearSearch(&x,a,n,sizeof(int),cf) == BinarySearch(&x,a,n,sizeof(int),cf));
        printf("passed\n");
    }
    printf("all %d tests passed\n", m);
    return 0;
}
