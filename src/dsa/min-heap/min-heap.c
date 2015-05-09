#include "../common/util.h"
#include "./min-heap.h"
#include <stdio.h>

min_heap* MinHeapCreate(int n, int (*CompFn)(const void*, const void*)) {
    min_heap* h = (min_heap*)SafeMalloc(sizeof(min_heap));
    h->array = (void**)SafeMalloc(sizeof(void*)*n);
    h->capacity = n;
    h->size = 0;
    h->Compare = CompFn;
    return h;
}
int _P(int x) {
    return (x-1)/2;
}
int _L(int x) {
    return x*2+1;
}
int _R(int x) {
    return x*2+2;
}
void _Exchange(min_heap* h, int i, int j) {
    void* tmp = h->array[i];
    h->array[i] = h->array[j];
    h->array[j] = tmp;
}

void MinHeapInsert(min_heap* h, void* item) {
    int x = h->size;
    if (x == h->capacity) {
        return;
    }
    h->array[x] = item;
    h->size++;
    while (x != 0 && h->Compare(h->array[x], h->array[_P(x)]) < 0) {
        _Exchange(h, x, _P(x));
        x = _P(x);
    }
}

void* MinHeapPop(min_heap* h) {
    int x;
    int y;
    void* item;
    if (h->size == 0) {
        return NULL;
    }
    item = h->array[0];
    h->array[0] = h->array[h->size-1];
    h->array[h->size-1] = NULL;
    h->size--;
    x = 0;
    y = -1;
    while (x != y) {
        y = x;
        if (_L(x) < h->size) {
            if (h->Compare(h->array[_L(x)], h->array[x]) < 0) {
                y = _L(x);
            }
        }
        if (_R(x) < h->size) {
            if (h->Compare(h->array[_R(x)], h->array[y]) < 0) {
                y = _R(x);
            }
        }
        if (y != x) {
            _Exchange(h, x, y);
            x = y;
            y = -1;
        }
    }
    return item;
}
