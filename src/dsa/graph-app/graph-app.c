#include <stdlib.h>
#include "../common/util.h"
#include "../queue/queue.h"
#include "../stack/stack.h"
#include "../common/graph.h"

queue *GraphBFS(graph *g, int x) {
    queue *q, *arr;
    int *vis, *inq;
    graph_edge *e;
    int i, u;
    if (!GraphNodeValid(x)) {
        return NULL;
    }
    q = QueueCreate(g->n, sizeof(int));
    arr = QueueCreate(g->n, sizeof(int));
    vis = SafeMalloc(sizeof(int)*g->n);
    inq = SafeMalloc(sizeof(int)*g->n);
    for (i = 0; i < g->n; ++i) {
        vis[i] = 0;
        inq[i] = 0;
    }
    i = x;
    QueuePush(q, &i);
    inq[i] = 1;
    while (!QueueIsEmpty(q)) {
        u = *(int *)QueuePeak(q);
        QueuePop(q);
        vis[u] = 1;
        inq[u] = 0;
        QueuePush(arr, &u);
        for (e = g->adja[u]->next; e != NULL; e = e->next) {
            if (!vis[e->v] && !inq[e->v]) {
                QueuePush(q, &e->v);
                inq[e->v] = 1;
            }
        }
    }
    QueueDestroy(q);
    free(vis);
    free(inq);
    return arr;
}

queue *GraphDFS(graph *g, int x) {
    stack *su, *se;
    queue *arr;
    int *vis, *ins;
    graph_edge *e;
    int i, u;
    if (!GraphNodeValid(x)) {
        return NULL;
    }
    su = StackCreate(g->n, sizeof(int));
    se = StackCreate(g->n, sizeof(graph_edge *));
    arr = QueueCreate(g->n, sizeof(int));
    vis = SafeMalloc(sizeof(int)*g->n);
    ins = SafeMalloc(sizeof(int)*g->n);
    for (i = 0; i < g->n; ++i) {
        vis[i] = 0;
        ins[i] = 0;
    }
    i = x;
    StackPush(su, &i);
    StackPush(se, &g->adja[i]->next);
    ins[i] = 1;
    while (!StackIsEmpty(su)) {
        u = *(int *)StackPeak(su);
        e = *(graph_edge **)StackPeak(se);
        for (; e != NULL; e = e->next) {
            if (!vis[e->v] && !ins[e->v]) {
                StackPop(se);
                StackPush(se, &e->next);
                StackPush(su, &e->v);
                StackPush(se, &g->adja[e->v]->next);
                ins[e->v] = 1;
                break;
            }
        }
        if (e == NULL) {
            StackPop(su);
            StackPop(se);
            vis[u] = 1;
            ins[u] = 0;
            QueuePush(arr, &u);
        }
    }
    StackDestroy(su);
    StackDestroy(se);
    free(vis);
    free(ins);
    return arr;
}

stack *GraphTopoSort(graph *g) {
    stack *su = StackCreate(g->n, sizeof(int));
    stack *se = StackCreate(g->n, sizeof(graph_edge *));
    stack *arr = StackCreate(g->n, sizeof(int));
    int *vis = SafeMalloc(sizeof(int)*g->n);
    int *ins = SafeMalloc(sizeof(int)*g->n);
    graph_edge *e;
    int i, u;
    int circular = 0;
    for (i = 0; i < g->n; ++i) {
        vis[i] = 0;
        ins[i] = 0;
    }
    for (i = 0; i < g->n && !circular; ++i) {
        if (vis[i]) {
            continue;
        }
        StackPush(su, &i);
        StackPush(se, &g->adja[i]->next);
        ins[i] = 1;
        while (!StackIsEmpty(su) && !circular) {
            u = *(int *)StackPeak(su);
            e = *(graph_edge **)StackPeak(se);
            for (; e != NULL; e = e->next) {
                if (!vis[e->v] && !ins[e->v]) {
                    StackPop(se);
                    StackPush(se, &e->next);
                    StackPush(su, &e->v);
                    StackPush(se, &g->adja[e->v]->next);
                    ins[e->v] = 1;
                    break;
                } else if (ins[e->v]) {
                    circular = 1;
                    break;
                }
            }
            if (e == NULL) {
                StackPop(su);
                StackPop(se);
                vis[u] = 1;
                ins[u] = 0;
                StackPush(arr, &u);
            }
        }
    }
    StackDestroy(su);
    StackDestroy(se);
    free(vis);
    free(ins);
    if (circular) {
        StackDestroy(arr);
        return NULL;
    }
    return arr;
}

int _gId;
int _gColorK;
int *_gColor;
int *_gIndex;
int *_gLowLk;
int *_gInStk;
stack *_gStack;

int _GraphSccTarjanMin(int a, int b) {
    return a < b ? a : b;
}

void _GraphSccTarjanColor(graph *g, int u) {
    int v;
    graph_edge *e;
    _gIndex[u] = _gId++;
    _gLowLk[u] = _gIndex[u];
    StackPush(_gStack, &u);
    _gInStk[u] = 1;
    for (e = g->adja[u]->next; e != NULL; e = e->next) {
        if (_gIndex[e->v] == -1 && !_gInStk[e->v]) {
            _GraphSccTarjanColor(g, e->v);
            _gLowLk[u] = _GraphSccTarjanMin(_gLowLk[u], _gLowLk[e->v]);
        } else if (_gInStk[e->v]) {
            _gLowLk[u] = _GraphSccTarjanMin(_gLowLk[u], _gIndex[e->v]);
        }
    }
    if (_gLowLk[u] == _gIndex[u]) {
        do {
            v = *(int *)StackPeak(_gStack);
            StackPop(_gStack);
            _gInStk[v] = 0;
            _gColor[v] = _gColorK;
        } while (v != u);
        _gColorK++;
    }
}

int *GraphSccTarjan(graph *g) {
    int i;
    _gId = 0;
    _gColorK = 0;
    _gColor = SafeMalloc(g->n*sizeof(int));
    _gIndex = SafeMalloc(g->n*sizeof(int));
    _gLowLk = SafeMalloc(g->n*sizeof(int));
    _gInStk = SafeMalloc(g->n*sizeof(int));
    _gStack = StackCreate(g->n, sizeof(int));
    for (i = 0; i < g->n; ++i) {
        _gIndex[i] = -1;
        _gInStk[i] = 0;
    }
    for (i = 0; i < g->n; ++i) {
        if (_gIndex[i] == -1) {
            _GraphSccTarjanColor(g, i);
        }
    }
    free(_gIndex);
    free(_gLowLk);
    free(_gInStk);
    StackDestroy(_gStack);
    return _gColor;
}
