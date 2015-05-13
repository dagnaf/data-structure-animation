#ifndef MIN_HEAP_H
#define MIN_HEAP_H

#include <stddef.h>

typedef struct min_heap {
    int size;
    int capacity;
    size_t item_size;
    void* array;
    int (*Compare)(const void* a, const void* b);
} min_heap;

min_heap* MinHeapCreate(int n, size_t item_size, int (*CompFn)(const void*, const void*));
void MinHeapInsert(min_heap* h, void* item);
void* MinHeapPop(min_heap* h);
void MinHeapDestroy(min_heap* h);

#endif
