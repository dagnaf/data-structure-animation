#include <stdlib.h>
#include <assert.h>
#include <stdio.h>
#include "./util.h"

int main(int argc, char const *argv[])
{
    void *i, *j, *k;
    i = SafeMalloc(sizeof(int));
    j = SafeMalloc(sizeof(int));
    k = SafeMalloc(sizeof(int));
    *(int *)i = 12345;
    MemoryCopy(j, i, sizeof(int));
    assert(*(int *)i == *(int *)j);
    *(int *)k = 67890;
    MemorySwap(k, j, sizeof(int));
    assert(*(int *)i == *(int *)k);
    assert(*(int *)k != *(int *)j);
    assert(*(int *)j != *(int *)i);
    MemoryClear(k, sizeof(int));
    assert(*(int *)k == 0);
    free(i);
    free(j);
    free(k);
    printf("all tests passed\n");
    return 0;
}
