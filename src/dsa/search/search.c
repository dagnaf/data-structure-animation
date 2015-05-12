#include <stddef.h>
#include "search.h"

void *LinearSearch (void *k, void *a, int n, int s, int(*Compare)(const void *,const void *)) {
  char *p;
  for (p = (char *)a; p < (char *)a + n*s; p += s) {
    if (Compare(p, k) == 0) {
      return p;
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
  return Compare(k, (char *)a + l*s) != 0 ? NULL : (char *)a + l*s;
}
