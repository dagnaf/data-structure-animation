#ifndef DIJKSTRA_H
#define DIJKSTRA_H

#include "../common/graph.h"
#include "../stack/stack.h"

stack *GraphDijkstra(
    graph *g,
    int src,
    int dest,
    int (*CompFn)(const void*, const void*),
    void (*AddFn)(const void*, const void*, const void *)
);

#endif


