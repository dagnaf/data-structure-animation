#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../common/util.h"
#include "./hash-closed.h"

int ha(const hash_open *self, const void *k) {
    return *(int *)k % self->n;
}

int cf(const void *a, const void *b) {
    // printf("compare %d and %d\n", *(int *)a, *(int *)b);
    return *(int *)a - *(int *)b;
}

int main(int argc, char const *argv[])
{
    int i, cmd, occupied;
    int n, x;
    int *y;
    scanf("%d", &n);
    hash_open *ht = HashTableCreate(n, sizeof(int), ha, cf);
    while (scanf("%d", &cmd) != EOF) {
        scanf("%d", &x);
        switch(cmd) {
            case 0:
                y = HashTableInsert(ht, &x);
                printf("insert %d(%d)\n", y == NULL ? -1 : *y,x);
                break;
            case 1:
                y = HashTableSearch(ht, &x);
                printf("search %d(%d)\n", y == NULL ? -1 : *y,x);
                break;
            case 2:
                y = HashTableDelete(ht, &x);
                printf("delete %d(%d)\n", y == NULL ? -1 : *y,x);
                break;
        }
        // for (i = 0; i < n; ++i) {
        //     printf("%4d ", i);
        // }
        // printf("\n");
        // for (i = 0; i < n; ++i) {
        //     occupied = ((int *)ht->occupied)[i];
        //     if (occupied == 1) {
        //         printf("%4d ", ((int *)ht->table)[i]);
        //     } else {
        //         printf("%4s ", occupied == 0 ? "emp" : "del");
        //     }
        // }
        // printf("\n");
    }
    HashTableDestroy(ht);
    return 0;
}
