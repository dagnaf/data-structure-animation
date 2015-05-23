#ifndef GRAPH_APP_H
#define GRAPH_APP_H
#include "../common/graph.h"
#include "../queue/queue.h"
#include "../stack/stack.h"

int *GraphSccTarjan(graph *g);
stack *GraphTopoSort(graph *g);
queue *GraphBFS(graph *g);
queue *GraphDFS(graph *g);

#endif
