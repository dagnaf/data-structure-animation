#ifndef HASH_H
#define HASH_H

#include <stddef.h>

typedef struct hash_item {
    struct hash_item *next;
    void *item;
} hash_item;

typedef struct hash {
    int n;
    size_t item_size;
    void *table;
    int (*Hash)(const struct hash *, const void *);
    int (*Compare)(const void *, const void *);
} hash;

hash *HashCreate(
    int n,
    size_t item_size,
    int (*Hash)(const struct hash *, const void *),
    int (*Compare)(const void *, const void *)
);
void HashDestroy(hash *ht);

void *HashClosedInsert(hash *ht, void *key);
void *HashClosedDelete(hash *ht, void *key);
void *HashClosedSearch(hash *ht, void *key);
void *HashOpenInsert(hash *ht, void *key);
void *HashOpenDelete(hash *ht, void *key);
void *HashOpenSearch(hash *ht, void *key);

#endif
