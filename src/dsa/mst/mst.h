#ifndef PRIM_H
#define PRIM_H

#include "../common/graph.h"

graph_edge **GraphPrim(graph *g, int (*CompFn)(const void*, const void*));

#endif
