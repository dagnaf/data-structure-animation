#ifndef UTIL_H
#define UTIL_H

#include <stddef.h>

void * SafeMalloc(size_t size);
void MemoryCopy(void *a, const void *b, size_t size);
void MemorySwap(void *a, void *b, size_t size);
void MemoryClear(void *a, size_t size);

#endif
