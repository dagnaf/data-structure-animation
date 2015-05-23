#ifndef GRAPH_H
#define GRAPH_H
#include <stddef.h>

typedef struct graph_edge {
  int u;
  int v;
  void *w;
  struct graph_edge *next;
} graph_edge;

typedef struct graph {
  int n;
  size_t w_size;
  graph_edge **adja;
} graph;

graph* GraphCreate(int n, size_t w_size);
void GraphDestroy(graph *g);
graph_edge* GraphInsert(graph *g, int u, int v, void *w);
graph_edge* GraphDelete(graph *g, int u, int v);
int GraphNodeValid(graph *g, int u);

#endif
