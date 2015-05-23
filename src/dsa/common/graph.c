#include <stddef.h>
#include <stdlib.h>
#include "../common/util.h"
#include "./graph.h"

graph* GraphCreate(int n, size_t w_size) {
    int i;
    if (n == 0) {
        return NULL;
    }
    graph *g = SafeMalloc(sizeof(graph));
    g->n = n;
    g->w_size = w_size;
    g->adja = SafeMalloc(n*(sizeof(graph_edge *)));
    for (i = 0; i < n; ++i) {
        g->adja[i] = SafeMalloc(sizeof(graph_edge));
        g->adja[i]->next = NULL;
        g->adja[i]->w = NULL;
    }
    return g;
}

void GraphDestroy(graph *g) {
    int i;
    graph_edge *p, *e;
    for (i = 0; i < g->n; ++i) {
        e = g->adja[i];
        while (e != NULL) {
            p = e->next;
            if (e->w != NULL) {
                free(e->w);
            }
            free(e);
            e = p;
        }
    }
    free(g->adja);
    free(g);
}

int GraphNodeValid(graph *g, int u) {
    return 0 <= u && u < g->n ? 1 : 0;
}

graph_edge* _GraphNewEdge(int u, int v, void *w, size_t w_size) {
    graph_edge *e = SafeMalloc(sizeof(graph_edge));
    e->u = u;
    e->v = v;
    e->w = SafeMalloc(w_size);
    MemoryCopy(e->w, w, w_size);
    return e;
}

graph_edge* GraphInsert(graph *g, int u, int v, void *w) {
    graph_edge *e;
    if (!GraphNodeValid(g,u) || !GraphNodeValid(g,v)) {
        return NULL;
    }
    e = _GraphNewEdge(u,v,w,g->w_size);
    e->next = g->adja[u]->next;
    g->adja[u]->next = e;
    return e;
}
