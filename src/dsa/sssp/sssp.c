#include  <stdlib.h>
#include "../common/graph.h"
#include "../min-heap/min-heap.h"
#include "../common/util.h"
#include "../stack/stack.h"

typedef struct dijkstra_node {
    int i;
    void *w;
    graph_edge *e;
} dijkstra_node;

int (*_gGraphEdgeWeightCompare)(const void *, const void *);
void (*_gGraphEdgeWeightAdd)(const void *, const void *, const void *);
int _gNegInfinity = 0;
int _gPosInfinity = 0;

int _GraphDijkstraEdgeCompare(const void *a, const void *b) {
    if (a == &_gNegInfinity || b == &_gPosInfinity) {
        return a == b ? 0 : -1;
    } else if (a == &_gPosInfinity || b == &_gNegInfinity) {
        return a == b ? 0 : 1;
    }
    return _gGraphEdgeWeightCompare(a, b);
}

int _GraphDijkstraNodeCompare(const void *a, const void *b) {
    return _GraphDijkstraEdgeCompare(((dijkstra_node *)a)->w, ((dijkstra_node *)b)->w);
}

const void *_GraphDijkstraWeightAdd(const void *a, const void *b, const void *c) {
    if (a == &_gPosInfinity || b == &_gPosInfinity) {
        return &_gPosInfinity;
    } else if (a == &_gNegInfinity || b == &_gNegInfinity) {
        return a == &_gNegInfinity ? b : a;
    }
    _gGraphEdgeWeightAdd(a, b, c);
    return c;
}

stack *GraphDijkstra(
    graph *g,
    int src,
    int dest,
    int (*CompFn)(const void *, const void *),
    void (*AddFn)(const void *, const void *, const void *)
) {
    int i;
    void *w;
    const void *rw;
    min_heap *mh;
    graph_edge *e;
    dijkstra_node *dns;
    dijkstra_node *dn;
    stack *s;
    if (!GraphNodeValid(g, src) || !GraphNodeValid(g, dest)) {
        return NULL;
    }
    w = SafeMalloc(g->w_size);
    _gGraphEdgeWeightCompare = CompFn;
    _gGraphEdgeWeightAdd = AddFn;
    mh = MinHeapCreate(g->n, sizeof(dijkstra_node), _GraphDijkstraNodeCompare);
    s = StackCreate(g->n, sizeof(graph_edge));
    dns = SafeMalloc(g->n*sizeof(dijkstra_node));
    for (i = 0; i < g->n; ++i) {
        dns[i].i = i;
        dns[i].w = (i == src ? &_gNegInfinity : &_gPosInfinity);
        dns[i].e = NULL;
        MinHeapInsert(mh, &dns[i], i);
    }
    for (i = 0; i < g->n; ++i) {
        dn = MinHeapPop(mh);
        if (i == g->n-1) {
          break;
        }
        for (e = g->adja[dn->i]->next; e != NULL; e = e->next) {
            rw = _GraphDijkstraWeightAdd(dn->w, e->w, w);
            if (_GraphDijkstraEdgeCompare(dns[e->v].w, rw) > 0) {
               if (dns[e->v].w == &_gPosInfinity) {
                   dns[e->v].w = SafeMalloc(g->w_size);
               }
               MemoryCopy(dns[e->v].w, w, g->w_size);
               dns[e->v].e = e;
               MinHeapUpdate(mh, &dns[e->v], e->v);
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
