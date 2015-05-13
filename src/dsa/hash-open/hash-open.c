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
    hash_open_item *p = NULL;
    ht->n = n;
    ht->item_size = item_size;
    ht->table = SafeMalloc(n*sizeof(hash_open_item *));
    for (i = 0; i < n; ++i) {
        p = SafeMalloc(sizeof(hash_open_item));
        p->item = NULL;
        p->next = NULL;
        ((hash_open_item **)ht->table)[i] = p;
    }
    ht->Hash = Hash;
    ht->Compare = Compare;
    return ht;
}

void _Destroy(hash_open *ht, int i) {
    hash_open_item *p = ((hash_open_item **)ht->table)[i];
    hash_open_item *q = NULL;
    while (p != NULL) {
        q = p->next;
        if (p->item != NULL) {
            free(p->item);
        }
        free(p);
        p = q;
    }
}

void HashTableDestroy(hash_open *ht) {
    int i;
    for (i = 0; i < ht->n; ++i) {
        _Destroy(ht, i);
    }
    free(ht->table);
}

void *HashTableInsert(hash_open *ht, void *key) {
    int i = ht->Hash(ht, key);
    hash_open_item *p = ((hash_open_item **)ht->table)[i];
    hash_open_item *q = p->next;
    p->next = SafeMalloc(sizeof(hash_open_item));
    p->next->next = q;
    p->next->item = SafeMalloc(ht->item_size);
    MemoryCopy(p->next->item, key, ht->item_size);
    return key;
}

hash_open_item *_Search(hash_open *ht, void *key) {
    int i = ht->Hash(ht, key);
    hash_open_item *p = ((hash_open_item **)ht->table)[i];
    hash_open_item *q = NULL;
    hash_open_item *r = NULL;
    while (p->next != NULL) {
        q = p;
        p = p->next;
        if (ht->Compare(key,p->item) == 0) {
            r = q;
            break;
        }
    }
    return r;
}

void *HashTableDelete(hash_open *ht, void *key) {
    hash_open_item *p = _Search(ht, key);
    hash_open_item *q;
    if (p == NULL) {
        return NULL;
    }
    q = p->next;
    p->next = q->next;
    q->next = NULL;
    free(q->item);
    free(q);
    return key;
}

void *HashTableSearch(hash_open *ht, void *key) {
    hash_open_item *p = _Search(ht, key);
    return p == NULL ? NULL : key;
}
// #include <stdio.h>
// void print(hash_open *ht) {
//     int i;
//     hash_open_item *p;
//     for (i = 0; i < ht->n; ++i) {
//         p = ((hash_open_item **)ht->table)[i];
//         printf("%d: ", i);
//         while (p->next != NULL) {
//             p = p->next;
//             printf("%4d ", *(int *)p->item);
//         }
//         printf("\n");
//     }
// }
