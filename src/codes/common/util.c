#include <stdio.h>
#include <stdlib.h>
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

// FIXME
//   stack,queue and other dsa should use dynamically
//   allocated memory, which is what util.c provides.
//   Also should be included in model-file descripttions.
