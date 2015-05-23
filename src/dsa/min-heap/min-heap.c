#include <stddef.h>
#include <stdlib.h>
#include "../common/util.h"
#include "./min-heap.h"

min_heap* MinHeapCreate(int n, size_t item_size, int (*CompFn)(const void*, const void*)) {
    int i;
    min_heap* h = (min_heap*)SafeMalloc(sizeof(min_heap));
    h->array = SafeMalloc(n * sizeof(min_heap_pair));
    h->capacity = n;
    h->size = 0;
    h->item_size = item_size;
    h->Compare = CompFn;
    h->map = SafeMalloc(n*sizeof(int));
    for (i = 0; i < n; ++i) {
        h->array[i].item = NULL;
        h->map[i] = -1;
    }
    return h;
}

void MinHeapDestroy(min_heap *h) {
    int i;
    for (i = 0; i < h->capacity; ++i) {
        if (h->array[i].item != NULL) {
            free(h->array[i].item);
        }
    }
    free(h->array);
    free(h->map);
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
    min_heap_pair tmp;
    tmp = h->array[i];
    h->array[i] = h->array[j];
    h->array[j] = tmp;
    h->map[h->array[i].key] = i;
    h->map[h->array[j].key] = j;
}

void _Swim(min_heap *h, int x) {
    while (x != 0 && h->Compare(h->array[x].item, h->array[_P(x)].item) < 0) {
        _Exchange(h, x, _P(x));
        x = _P(x);
    }
}

void _Sink(min_heap *h, int x) {
    int y = -1;
    while (x != y) {
        y = x;
        if (_L(x) < h->size && h->Compare(h->array[_L(x)].item, h->array[x].item) < 0) {
            y = _L(x);
        }
        if (_R(x) < h->size && h->Compare(h->array[_R(x)].item, h->array[y].item) < 0) {
            y = _R(x);
        }
        if (y != x) {
            _Exchange(h, x, y);
            x = y;
            y = -1;
        }
    }
}

void MinHeapInsert(min_heap* h, void* item, int id) {
    int x = h->size;
    if (x == h->capacity) {
        return;
    }
    h->array[x].key = id;
    h->map[id] = x;
    if (h->array[x].item == NULL) {
        h->array[x].item = SafeMalloc(h->item_size);
    }
    MemoryCopy(h->array[x].item, item, h->item_size);
    h->size++;
    _Swim(h, x);
}

void* MinHeapPop(min_heap* h) {
    void* item = SafeMalloc(h->item_size);
    if (h->size == 0) {
        return NULL;
    }
    MemoryCopy(item, h->array[0].item, h->item_size);
    h->map[h->array[0].key] = -1;
    MemoryCopy(h->array[0].item, h->array[h->size-1].item, h->item_size);
    h->array[0].key = h->array[h->size-1].key;
    h->map[h->array[0].key] = 0;
    free(h->array[h->size-1].item);
    h->array[h->size-1].item = NULL;
    h->size--;
    _Sink(h, 0);
    return item;
}

void *MinHeapUpdate(min_heap *h, void *item, int id) {
    int i;
    int rc;
    if (id < 0 || id >= h->capacity) {
        return NULL;
    }
    i = h->map[id];
    rc = h->Compare(h->array[i].item, item);
    MemoryCopy(h->array[i].item, item, h->item_size);
    if (rc < 0) {
        _Sink(h, i);
        return item;
    } else if (rc > 0) {
        _Swim(h, i);
        return item;
    }
    return NULL;
}
