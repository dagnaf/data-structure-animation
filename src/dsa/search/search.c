#include <stddef.h>
#include "search.h"

void *LinearSearch (void *k, void *a, int n, int s, int(*Compare)(const void *,const void *)) {
    char *p;
    int r;
    for (p = (char *)a; p < (char *)a + n*s; p += s) {
        r = Compare(p, k);
        if (r == 0) {
            return p;
        } else if (r > 0) {
            break;
        }
    }
    return NULL;
}

void *BinarySearch (void *k, void *a, int n, int s, int(*Compare)(const void *,const void *)) {
    int l = 0, m, r = n-1;
    while (l < r) {
        m = (l+r) / 2;
        if (Compare(k, (char *)a + m*s) > 0) {
            l = m+1;
        } else {
            r = m;
        }
    }
    if (Compare(k, (char *)a + l*s) != 0) {
      return NULL;
    }
    return  (char *)a + l*s;
}
