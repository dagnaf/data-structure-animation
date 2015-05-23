#include <stdio.h>
#include <stdlib.h>
#include "../common/graph.h"
#include "./graph-app.h"
#include "../queue/queue.h"
#include "../stack/stack.h"

int main(int argc, char const *argv[])
{
  int n, m, i, u, v;
  int w = 1;
  graph *g;
  queue *q;
  stack *s;
  int *c;
  while (scanf("%d%d", &n,&m) != EOF) {
    g = GraphCreate(n, sizeof(int));
    for (i = 0; i < m; ++i) {
      scanf("%d%d", &u, &v);
      GraphInsert(g, u, v, &w);
    }
    q = GraphBFS(g);
    while (!QueueIsEmpty(q)) {
      printf("%d ", *(int *)QueuePeak(q));
      QueuePop(q);
    }
    printf("--bfs\n");
    QueueDestroy(q);
    q = GraphDFS(g);
    while (!QueueIsEmpty(q)) {
      printf("%d ", *(int *)QueuePeak(q));
      QueuePop(q);
    }
    printf("--dfs\n");
    QueueDestroy(q);
    s = GraphTopoSort(g);
    if (s == NULL) {
      printf("circular");
    } else {
      while (!StackIsEmpty(s)) {
        printf("%d ", *(int *)StackPeak(s));
        StackPop(s);
      }
      StackDestroy(s);
    }
    printf("--topoSort\n");
    c = GraphSccTarjan(g);
    for (i = 0; i < g->n; ++i) {
      printf("%d ", i);
    }
    printf("--sccTarjan\n");
    for (i = 0; i < g->n; ++i) {
      printf("%d ", c[i]);
    }
    printf("--sccTarjan\n");
    free(c);

    GraphDestroy(g);
  }
  return 0;
}
