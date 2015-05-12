#ifndef HASH_CLOSED
#define HASH_CLOSED

#include <stddef.h>

typedef struct hash_closed {
    int n;
    size_t item_size;
    void *table;
    void *occupied;
    int (*Hash)(const struct hash_closed *, const void *);
    int (*Compare)(const void *, const void *);
} hash_closed;

hash_closed *HashTableCreate(
    int n,
    size_t item_size,
    int (*Hash)(const struct hash_closed *, const void *),
    int (*Compare)(const void *, const void *)
);
void HashTableDestroy(hash_closed *ht);
void *HashTableInsert(hash_closed *ht, void *key);
void *HashTableDelete(hash_closed *ht, void *key);
void *HashTableSearch(hash_closed *ht, void *key);

#endif
