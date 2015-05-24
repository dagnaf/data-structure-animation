#include <stdio.h>
#include <stdlib.h>
#include "../common/graph.h"
#include "./sssp.h"
#include "../stack/stack.h"

int Compare(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

void Add(const void *a, const void *b, const void *c) {
    *(int *)c = *(int *)a + *(int *)b;
}

int main(int argc, char const *argv[])
{
    int n, m, i, u, v, w;
    graph *g;
    stack *s;
    graph_edge *e;
    int sum = 0;
    while (scanf("%d%d", &n,&m) != EOF) {
        g = GraphCreate(n, sizeof(int));
        for (i = 0; i < m; ++i) {
            scanf("%d%d%d", &u, &v, &w);
            GraphInsert(g, u, v, &w);
        }
        s = GraphDijkstra(g, 0, n-1, Compare, Add);
        sum = 0;
        while (!StackIsEmpty(s)) {
            e = StackPeak(s);
            StackPop(s);
            printf ("u = %d, v = %d, w = %d\n", e->u, e->v, *(int *)(e->w));
            sum += *(int *)(e->w);
        }
        printf("sum = %d\n", sum);
        StackDestroy(s);
        GraphDestroy(g);
    }
    return 0;
}
