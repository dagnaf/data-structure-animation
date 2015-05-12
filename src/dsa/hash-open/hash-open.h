#ifndef HASH_CLOSED
#define HASH_CLOSED

#include <stddef.h>

typedef struct hash_open {
    int n;
    size_t item_size;
    void *table;
    void *occupied;
    int (*Hash)(const struct hash_open *, const void *);
    int (*Compare)(const void *, const void *);
} hash_open;

hash_open *HashTableCreate(
    int n,
    size_t item_size,
    int (*Hash)(const struct hash_open *, const void *),
    int (*Compare)(const void *, const void *)
);
void HashTableDestroy(hash_open *ht);
void *HashTableInsert(hash_open *ht, void *key);
void *HashTableDelete(hash_open *ht, void *key);
void *HashTableSearch(hash_open *ht, void *key);

#endif
