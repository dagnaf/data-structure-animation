#include <stdio.h>
#include <stdlib.h>
#include <assert.h>
#include "./sort.h"
#include "../common/util.h"

int cf(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

int main(int argc, char const *argv[])
{
    int i, j, m, n, *a, *b;
    scanf("%d", &m);
    for (i = 0; i < m; ++i) {
        scanf("%d", &n);
        a = SafeMalloc(sizeof(int)*n);
        b = SafeMalloc(sizeof(int)*n);
        for (j = 0; j < n; ++j) {
            scanf("%d", a+j);
            b[j] = a[j];
        }
        // MergeSort(a, n, sizeof(int), cf);
        QuickSort(b, n, sizeof(int), cf);
        printf("test %d:\n", i+1);
        for (j = 0; j < n; ++j) {
            printf("%d ", b[j]);
        }
        printf("\n");
        for (j = 1; j < n; ++j) {
            // assert(a[j-1] <= a[j]);
            assert(b[j-1] <= b[j]);
        }
        // printf("  MergeSort passed\n");
        printf("  QuickSort passed\n");
        free(a);
        free(b);
    }
    printf("all %d tests passed\n", m);
    return 0;
}
