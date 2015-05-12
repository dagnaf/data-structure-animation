#ifndef SEARCH_H
#define SEARCH_H

void *LinearSearch (void *k, void *a, int n, int s, int(*Compare)(const void *, const void *));
void *BinarySearch (void *k, void *a, int n, int s, int(*Compare)(const void *, const void *));

#endif
