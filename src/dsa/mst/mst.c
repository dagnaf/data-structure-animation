#include "../common/graph.h"
#include "../min-heap/min-heap.h"
#include "../common/util.h"
#include <stdlib.h>

typedef struct prim_node {
    int i;
    void *w;
    graph_edge *e;
} prim_node;

int (*_gGraphEdgeWeightCompare)(const void*, const void*);
int _gNegInfinity = 0;
int _gPosInfinity = 0;

int _GraphPrimNodeCompare(const void *a, const void *b) {
    if (((prim_node *)a)->w == &_gNegInfinity || ((prim_node *)b)->w == &_gPosInfinity) {
        return -1;
    } else if (((prim_node *)a)->w == &_gPosInfinity || ((prim_node *)b)->w == &_gNegInfinity) {
        return 1;
    }
    return _gGraphEdgeWeightCompare(((prim_node *)a)->w, ((prim_node *)b)->w);
}

graph_edge **GraphPrim(graph *g, int (*CompFn)(const void*, const void*)) {
    int i;
    graph_edge **mst;
    min_heap *mh;
    graph_edge *e;
    prim_node *pns;
    prim_node *pn;
    if (g->n <= 1) {
        return NULL;
    }
    _gGraphEdgeWeightCompare = CompFn;
    mst = SafeMalloc((g->n-1)*sizeof(graph_edge *));
    mh = MinHeapCreate(g->n, sizeof(prim_node), _GraphPrimNodeCompare);
    pns = SafeMalloc(g->n*sizeof(prim_node));
    for (i = 0; i < g->n; ++i) {
        pns[i].i = i;
        pns[i].w = (i == 0 ? &_gNegInfinity : &_gPosInfinity);
        pns[i].e = NULL;
        MinHeapInsert(mh, &pns[i], i);
    }
    for (i = 0; i < g->n; ++i) {
        pn = MinHeapPop(mh);
        if (pn->e != NULL) {
            mst[i-1] = pn->e;
        }
        pns[pn->i].w = &_gNegInfinity;
        if (i == g->n-1) {
            break;
        }
        for (e = g->adja[pn->i]->next; e != NULL; e = e->next) {
            if (pns[e->v].w == &_gPosInfinity ||
                        (pns[e->v].w != &_gNegInfinity && _gGraphEdgeWeightCompare(pns[e->v].w, e->w) > 0)
                ) {
                pns[e->v].w = e->w;
                pns[e->v].e = e;
                MinHeapUpdate(mh, &pns[e->v], e->v);
            }
        }
        free(pn);
    }
    MinHeapDestroy(mh);
    free(pns);
    return mst;
}
