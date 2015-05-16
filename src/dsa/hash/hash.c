#include <stddef.h>
#include <stdlib.h>
#include "./hash.h"
#include "../common/util.h"

void _SetTable(hash *ht, int i, void *key) {
    hash_item *p = ((hash_item **)ht->table)[i];
    p->item = SafeMalloc(ht->item_size);
    MemoryCopy(p->item, key, ht->item_size);
    p->next = p;
}

int _GetSlot(hash *ht, int i) {
    int j = i;
    hash_item *p = ((hash_item **)ht->table)[i];
    if (p->item == NULL) {
        return i;
    }
    for (j = (i+1) % ht->n; j != i; j = (j+1) % ht->n) {
        p = ((hash_item **)ht->table)[j];
        if (p->item == NULL) {
          return j;
        }
    }
    return -1;
}

void *HashClosedInsert(hash *ht, void *key) {
    int i = ht->Hash(ht, key);
    i = _GetSlot(ht, i);
    if (i != -1) {
        _SetTable(ht, i, key);
        return key;
    }
    return NULL;
}

void _UnsetTable(hash *ht, int i) {
    hash_item *p = ((hash_item **)ht->table)[i];
    free(p->item);
    p->item = NULL;
}

int _SearchClosed(hash *ht, void *key) {
    int i = ht->Hash(ht, key);
    int j;
    hash_item *p = ((hash_item **)ht->table)[i];
    if (p->item == NULL && p->next == NULL) {
        return -1;
    }
    if (p->item != NULL && ht->Compare(key,p->item) == 0) {
        return i;
    }
    for (j = (i+1) % ht->n; j != i; j = (j+1) % ht->n) {
        p = ((hash_item **)ht->table)[j];
        if (p->item == NULL && p->next == NULL) {
            break;
        }
        if (p->item != NULL && ht->Compare(key, p->item) == 0) {
            return j;
        }
    }
    return -1;
}

void *HashClosedDelete(hash *ht, void *key) {
    int i = _SearchClosed(ht, key);
    if (i == -1) {
        return NULL;
    }
    _UnsetTable(ht, i);
    return key;
}

void *HashClosedSearch(hash *ht, void *key) {
    int i = _SearchClosed(ht, key);
    return i == -1 ? NULL : key;
}

// =============================================

void *HashOpenInsert(hash *ht, void *key) {
    int i = ht->Hash(ht, key);
    hash_item *p = ((hash_item **)ht->table)[i];
    hash_item *q = p->next;
    p->next = SafeMalloc(sizeof(hash_item));
    p->next->next = q;
    p->next->item = SafeMalloc(ht->item_size);
    MemoryCopy(p->next->item, key, ht->item_size);
    return key;
}

hash_item *_SearchOpen(hash *ht, void *key) {
    int i = ht->Hash(ht, key);
    hash_item *p = ((hash_item **)ht->table)[i];
    hash_item *q = NULL;
    hash_item *r = NULL;
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

void *HashOpenDelete(hash *ht, void *key) {
    hash_item *p = _SearchOpen(ht, key);
    hash_item *q;
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

void *HashOpenSearch(hash *ht, void *key) {
    hash_item *p = _SearchOpen(ht, key);
    return p == NULL ? NULL : key;
}

// =============================================

hash *HashCreate(
    int n,
    size_t item_size,
    int (*Hash)(const struct hash *, const void *),
    int (*Compare)(const void *, const void *)
){
    int i;
    hash *ht = SafeMalloc(sizeof(hash));
    hash_item *p = NULL;
    ht->n = n;
    ht->item_size = item_size;
    ht->table = SafeMalloc(n*sizeof(hash_item *));
    for (i = 0; i < n; ++i) {
        p = SafeMalloc(sizeof(hash_item));
        p->item = NULL;
        p->next = NULL;
        ((hash_item **)ht->table)[i] = p;
    }
    ht->Hash = Hash;
    ht->Compare = Compare;
    return ht;
}

void _Destroy(hash *ht, int i) {
    hash_item *p = ((hash_item **)ht->table)[i];
    hash_item *q = NULL;
    while (p != NULL) {
        q = p->next;
        if (q == p) {
            q = NULL;
        }
        if (p->item != NULL) {
            free(p->item);
        }
        free(p);
        p = q;
    }
}

void HashDestroy(hash *ht) {
    int i;
    for (i = 0; i < ht->n; ++i) {
        _Destroy(ht, i);
    }
    free(ht->table);
}
