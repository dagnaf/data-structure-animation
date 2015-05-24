#include <stdio.h>
#include <stdlib.h>
#include "../common/graph.h"
#include "./mst.h"

int Compare(const void *a, const void *b) {
    return *(int *)a - *(int *)b;
}

int main(int argc, char const *argv[])
{
    int n, m, i, u, v, w;
    graph *g;
    graph_edge **mst;
    int sum = 0;
    while (scanf("%d%d", &n,&m) != EOF) {
        g = GraphCreate(n, sizeof(int));
        for (i = 0; i < m; ++i) {
            scanf("%d%d%d", &u, &v, &w);
            GraphInsert(g, u, v, &w);
            GraphInsert(g, v, u, &w);
        }
        mst = GraphPrim(g, Compare);
        sum = 0;
        for (i = 0; i < n-1; ++i) {
            printf ("u = %d, v = %d, w = %d\n", mst[i]->u, mst[i]->v, *(int *)(mst[i]->w));
            sum += *(int *)(mst[i]->w);
        }
        printf("sum = %d\n", sum);
        free(mst);
        GraphDestroy(g);
    }
    return 0;
}
