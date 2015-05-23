#include  <stdlib.h>
#include "../graph/graph.h"
#include "../min-heap/min-heap.h"
#include "../common/util.h"
#include "../stack/stack.h"

typedef struct dijkstra_node {
    int i;
    void *w;
    graph_edge *e;
} dijkstra_node;

int (*_gGraphEdgeWeightCompare)(const void*, const void*);
int _gNegInfinity = 0;
int _gPosInfinity = 0;

int _GraphDijkstraNodeCompare(const void *a, const void *b) {
    if (((dijkstra_node *)a)->w == &_gNegInfinity || ((dijkstra_node *)b)->w == &_gPosInfinity) {
        return -1;
    } else if (((dijkstra_node *)a)->w == &_gPosInfinity || ((dijkstra_node *)b)->w == &_gNegInfinity) {
        return 1;
    }
    return _gGraphEdgeWeightCompare(((dijkstra_node *)a)->w, ((dijkstra_node *)b)->w);
}

stack *GraphDijkstra(
    graph *g,
    int src,
    int dest,
    int (*CompFn)(const void*, const void*),
    void (*AddFn)(const void*, const void*, const void *)
) {
    int i;
    void *w;
    min_heap *mh;
    graph_edge *e;
    dijkstra_node *dns;
    dijkstra_node *dn;
    stack *s;
    if (src == dest || !GraphNodeValid(g, src) || !GraphNodeValid(g, dest)) {
        return NULL;
    }
    w = SafeMalloc(g->w_size);
    _gGraphEdgeWeightCompare = CompFn;
    // mst = SafeMalloc((g->n-1)*sizeof(graph_edge *));
    mh = MinHeapCreate(g->n, sizeof(dijkstra_node), _GraphDijkstraNodeCompare);
    s = StackCreate(g->n, sizeof(graph_edge));
    dns = SafeMalloc(g->n*sizeof(dijkstra_node));
    for (i = 0; i < g->n; ++i) {
        dns[i].i = i;
        dns[i].w = (i == 0 ? &_gNegInfinity : &_gPosInfinity);
        dns[i].e = NULL;
        MinHeapInsert(mh, &dns[i], i);
    }
    for (i = 0; i < g->n; ++i) {
        dn = MinHeapPop(mh);
        if (dn->i == dest) {
          break;
        }
        e = g->adja[dn->i]->next;
        for (e = g->adja[dn->i]->next; e != NULL; e = e->next) {
            if (dns[e->v].w == &_gPosInfinity) {
              dns[e->v].w = SafeMalloc(g->w_size);
              MemoryCopy(dns[e->v].w, e->w, g->w_size);
              dns[e->v].e = e;
              MinHeapUpdate(mh, &dns[e->v], e->v);
            } else if (dns[e->v].w != &_gNegInfinity && dn->w != &_gNegInfinity) {
              AddFn(dn->w, e->w, w);
              if (_gGraphEdgeWeightCompare(dns[e->v].w, w) > 0) {
                MemoryCopy(dns[e->v].w, w, g->w_size);
                dns[e->v].e = e;
                MinHeapUpdate(mh, &dns[e->v], e->v);
              }
            }
        }
        free(dn);
    }
    i = dest;
    while (i != src) {
      StackPush(s, dns[i].e);
      i = dns[i].e->u;
    }
    MinHeapDestroy(mh);
    free(w);
    for (i = 1; i < g->n; ++i) {
      if (dns[i].w != &_gPosInfinity) {
        free(dns[i].w);
      }
    }
    free(dns);
    return s;
}
