#include "../common/util.h"
#include "./min-heap.h"
#include <stddef.h>
#include <stdlib.h>

min_heap* MinHeapCreate(int n, size_t item_size, int (*CompFn)(const void*, const void*)) {
    min_heap* h = (min_heap*)SafeMalloc(sizeof(min_heap));
    h->array = SafeMalloc(item_size*n);
    h->capacity = n;
    h->size = 0;
    h->item_size = item_size;
    h->Compare = CompFn;
    return h;
}

void MinHeapDestroy(min_heap *h) {
    free(h->array);
    free(h);
}

int _P(int x) {
    return x == 0 ? 0 : (x-1)/2;
}
int _L(int x) {
    return x*2+1;
}
int _R(int x) {
    return x*2+2;
}
void _Exchange(min_heap* h, int i, int j) {
    MemorySwap(
        MemoryAddress(h->array, i, h->item_size),
        MemoryAddress(h->array, j, h->item_size),
        h->item_size
    );
}

void MinHeapInsert(min_heap* h, void* item) {
    int x = h->size;
    if (x == h->capacity) {
        return;
    }
    MemoryCopy(MemoryAddress(h->array, x, h->item_size), item, h->item_size)
    h->size++;
    while (x != 0 &&
        h->Compare(MemoryAddress(h->array, x, h->item_size), MemoryAddress(h->array, _P(x), h->item_size)) < 0
    ) {
        _Exchange(h, x, _P(x));
        x = _P(x);
    }
}

void* MinHeapPop(min_heap* h) {
    int x;
    int y;
    void* item = SafeMalloc(h->item_size);
    if (h->size == 0) {
        return NULL;
    }
    MemoryCopy(item, MemoryAddress(h->array, 0, h->item_size), h->item_size);
    MemoryCopy(MemoryAddress(h->array, 0, h->item_size), MemoryAddress(h->array, h->size-1, h->item_size),h->item_size);
    h->size--;
    x = 0;
    y = -1;
    while (x != y) {
        y = x;
        if (_L(x) < h->size &&
            h->Compare(MemoryAddress(h->array, _L(x), h->item_size), MemoryAddress(h->array, x, h->item_size)) < 0
        ) {
            y = _L(x);
        }
        if (_R(x) < h->size &&
            h->Compare(MemoryAddress(h->array, _R(x), h->item_size), MemoryAddress(h->array, y, h->item_size)) < 0
        ) {
            y = _R(x);
        }
        if (y != x) {
            _Exchange(h, x, y);
            x = y;
            y = -1;
        }
    }
    return item;
}
