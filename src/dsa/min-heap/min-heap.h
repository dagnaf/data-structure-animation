#ifndef MIN_HEAP_H
#define MIN_HEAP_H

typedef struct min_heap {
    int size;
    int capacity;
    void** array;
    int (*Compare)(const void* a, const void* b);
} min_heap;

min_heap* MinHeapCreate(int n, int (*CompFn)(const void*, const void*));
void MinHeapInsert(min_heap* h, void* item);
void* MinHeapPop(min_heap* h);

#endif
