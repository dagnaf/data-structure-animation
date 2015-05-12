#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "./util.h"

void* SafeMalloc(size_t size) {
    void* m;
    if ((m = malloc(size))) {
        return m;
    } else {
        printf("memory overflow\n");
        exit(-1);
        return 0;
    }
}

void MemoryCopy(void *a, const void *b, size_t size) {
    // size_t i;
    // size_t n = size / sizeof(char);
    // for (i = 0; i < n; ++i) {
    //     *((char *)a + i) = *((char *)b + i);
    // }
    memcpy(a, b, size);
}

void MemorySwap(void *a, void *b, size_t size) {
    // size_t i;
    // size_t n = size / sizeof(char);
    // char t;
    // for (i = 0; i < n; ++i) {
    //     t = *(char *)a;
    //     *((char *)a + i) = *((char *)b + i);
    //     *((char *)b + i) = t;
    // }
    void *t = SafeMalloc(size);
    memcpy(t, a, size);
    memcpy(a, b, size);
    memcpy(b, t, size);
}

void MemoryClear(void *a, size_t size) {
    memset(a, 0, size);
}
