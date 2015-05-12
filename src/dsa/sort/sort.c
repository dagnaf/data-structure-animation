#include <stdlib.h>
#include "sort.h"
#include "../common/util.h"

void MergeSort(void *a, int n, int s, int(*Compare)(const void *, const void *)) {
    int i, j, k;
    char *t;
    if (n == 1) {
        return;
    }
    i = 0;
    j = n/2;
    MergeSort(a, n/2, s, Compare);
    MergeSort((char *)a + j*s, n-n/2, s, Compare);
    t = SafeMalloc(n*s);
    k = 0;
    while (i < n/2 && j < n) {
        if (Compare((char *)a + i*s, (char *)a + j*s) <= 0) {
            MemoryCopy((char *)t + k*s, (char *)a + i*s, s);
            i++;
        } else {
             MemoryCopy((char *)t + k*s, (char *)a + j*s, s);
            j++;
        }
        k++;
    }
    while (i < n/2) {
        MemoryCopy((char *)t + k*s, (char *)a + i*s, s);
        k++;
        i++;
    }
    while (j < n) {
        MemoryCopy((char *)t + k*s, (char *)a + j*s, s);
        k++;
        j++;
    }
    for (i = 0; i < n; ++i) {
        MemoryCopy((char *)t + i*s, (char *)a + i*s, s);
    }
    free(t);
}

void QuickSort(void *a, int n, int s, int(*Compare)(const void *, const void *)) {
    int i, j;
    if (n <= 1) {
        return;
    }
    i = 0;
    j = n-1;
    while (i < j) {
        while (i < j && Compare(a, (char *)a + j*s) <= 0) {
            j--;
        }
        while (i < j && Compare(a, (char *)a + i*s) >= 0) {
            i++;
        }
        MemorySwap((char *)a + i*s, (char *)a + j*s, s);
    }
    MemorySwap(a, (char *)a + j*s, s);
    QuickSort(a, j, s, Compare);
    QuickSort((char *)a + (j+1)*s, n-j-1, s, Compare);
}
