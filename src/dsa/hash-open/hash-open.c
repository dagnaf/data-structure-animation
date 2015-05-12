#include <stddef.h>
#include <stdlib.h>
#include "./hash-open.h"
#include "../common/util.h"

typedef struct hash_open_item {
    struct hash_open_item *next;
    void *item;
} hash_open_item;

hash_open *HashTableCreate(
    int n,
    size_t item_size,
    int (*Hash)(const struct hash_open *, const void *),
    int (*Compare)(const void *, const void *)
){
    int i;
    hash_open *ht = SafeMalloc(sizeof(hash_open));
    ht->n = n;
    ht->item_size = item_size;
    ht->table = SafeMalloc(n*sizeof(hash_open_item));
    ht->occupied = SafeMalloc(n*sizeof(int));
    for (i = 0; i < n; ++i) {
        ((int *)ht->occupied)[i] = 0;
    }
    ht->Hash = Hash;
    ht->Compare = Compare;
    return ht;
}

void _Destroy(hash_open *ht, int i) {
    int j = ((int *)ht->occupied)[i];
    hash_open_item *p = (hash_open_item *)//;
    hash_open_item *q = //;
    while (j--) {
        q = p->next()
    }
}

void HashTableDestroy(hash_open *ht) {
    int i;
    for (i = 0; i < n; ++i) {
        if (((int *)ht->occupied)[i] > 0) {
            _Destroy(ht, i);
        }
    }
    free(ht->table);
    free(ht->occupied);
}

void _SetTable(hash_open *ht, int i, void *key) {
    ((int *)ht->occupied)[i] = 1;
    MemoryCopy((char *)ht->table + i*ht->item_size, key, ht->item_size);
}

void *HashTableInsert(hash_open *ht, void *key) {
    int i = ht->Hash(ht, key);
    if ()
    i = _GetSlot(ht, i);
    if (i != -1) {
        _SetTable(ht, i, key);
        return key;
    }
    return NULL;
}

void _UnsetTable(hash_open *ht, int i) {
    ((int *)ht->occupied)[i] = -1;
}

int _Search(hash_open *ht, void *key) {
    int i = ht->Hash(ht, key);
    int j;
    int occupied = ((int *)ht->occupied)[i];
    if (occupied == 0) {
        return -1;
    }
    if (occupied == 1 && ht->Compare(key,(char *)ht->table + i*ht->item_size) == 0) {
        return i;
    }
    for (j = (i+1) % ht->n; j != i; j = (j+1) % ht->n) {
        occupied = ((int *)ht->occupied)[j];
        if (occupied == 1 && ht->Compare(key,(char *)ht->table + j*ht->item_size) == 0) {
            return j;
        }
    }
    return -1;
}

void *HashTableDelete(hash_open *ht, void *key) {
    int i = _Search(ht, key);
    if (i == -1) {
        return NULL;
    }
    _UnsetTable(ht, i);
    return key;
}

void *HashTableSearch(hash_open *ht, void *key) {
    int i = _Search(ht, key);
    return i == -1 ? NULL : key;
}
