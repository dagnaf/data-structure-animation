#ifndef SORT_H
#define SORT_H

void MergeSort(void *a, int n, int s, int(*Compare)(const void *, const void *));
void QuickSort(void *a, int n, int s, int(*Compare)(const void *, const void *));

#endif
