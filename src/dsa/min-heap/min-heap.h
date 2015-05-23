#ifndef MIN_HEAP_H
#define MIN_HEAP_H

#include <stddef.h>

typedef struct min_heap_pair {
    void *item;
    int key;
} min_heap_pair;

typedef struct min_heap {
    int size;
    int capacity;
    size_t item_size;
    min_heap_pair* array;
    int (*Compare)(const void* a, const void* b);
    int* map;
} min_heap;

min_heap* MinHeapCreate(int n, size_t item_size, int (*CompFn)(const void*, const void*));
void MinHeapInsert(min_heap* h, void* item, int id);
void* MinHeapPop(min_heap* h);
void MinHeapDestroy(min_heap* h);
void *MinHeapUpdate(min_heap *h, void *item, int id);

#endif
