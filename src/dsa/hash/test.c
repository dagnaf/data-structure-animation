#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../common/util.h"
#include "./hash.h"

void print_open(hash *ht) {
    int i;
    hash_item *p;
    for (i = 0; i < ht->n; ++i) {
        p = ((hash_item **)ht->table)[i];
        printf("%d: ", i);
        while (p->next != NULL) {
            p = p->next;
            printf("%4d ", *(int *)p->item);
        }
        printf("\n");
    }
}

void print_closed(hash *ht) {
    int i;
    hash_item *p;
    for (i = 0; i < ht->n; ++i) {
        printf("%4d ", i);
    }
    printf("\n");
    for (i = 0; i < ht->n; ++i) {
        p = ((hash_item **)ht->table)[i];
        if (p->item != NULL) {
            printf("%4d ", *(int *)p->item);
        } else {
            printf("%4s ", p->next == NULL ? "emp" : "del");
        }
    }
    printf("\n");
}

int ha(const hash *self, const void *k) {
    return *(int *)k % self->n;
}

int cf(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

int main(int argc, char const *argv[])
{
    int cmd;
    int n, x;
    int *y;
    scanf("%d", &n);
    hash *hc = HashCreate(n, sizeof(int), ha, cf);
    hash *ho = HashCreate(n, sizeof(int), ha, cf);
    while (scanf("%d", &cmd) != EOF) {
        scanf("%d", &x);
        switch(cmd) {
            case 0:
                y = HashClosedInsert(hc, &x);
                printf("insert closed hashing %d(%d)\n", y == NULL ? -1 : *y,x);
                y = HashOpenInsert(ho, &x);
                printf("insert open hashing %d(%d)\n", y == NULL ? -1 : *y,x);
                break;
            case 1:
                y = HashClosedSearch(hc, &x);
                printf("search closed hashing %d(%d)\n", y == NULL ? -1 : *y,x);
                y = HashOpenSearch(ho, &x);
                printf("search open hashing %d(%d)\n", y == NULL ? -1 : *y,x);
                break;
            case 2:
                y = HashClosedDelete(hc, &x);
                printf("delete closed hashing %d(%d)\n", y == NULL ? -1 : *y,x);
                y = HashOpenDelete(ho, &x);
                printf("delete open hashing %d(%d)\n", y == NULL ? -1 : *y,x);
                break;
            default:
                break;
        }
        print_closed(hc);
        print_open(ho);
    }
    HashDestroy(hc);
    HashDestroy(ho);
    return 0;
}
