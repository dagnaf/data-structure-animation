#include <stdio.h>
#include "./sparse-matrix.h"

void print_matrix(int m[N][N], int r, int c) {
    int i;
    int j;
    printf("matrix, r=%d, c=%d\n", r, c);
    for (i = 0; i < r; ++i) {
        for (j = 0; j < c; ++j) {
            printf("%d ", m[i][j]);
        }
        printf("\n");
    }
}

void print_sparse_matrix(SparseMatrix m) {
    int i;
    int j;
    int k = 0;
    printf("sparse matrix, r=%d, c=%d, n=%d\n", m.r, m.c, m.n);
    for (i = 0; i < m.r; ++i) {
        for (j = 0; j < m.c; ++j) {
            if (m.triple[k].i == i && m.triple[k].j == j) {
                printf("%d ", m.triple[k].v);
                ++k;
            } else {
                printf("%d ", 0);
            }
        }
        printf("\n");
    }
}

int main(int argc, char const *argv[]) {
    int m[N][N];
    int r;
    int c;
    int i;
    int j;
    int rc;
    SparseMatrix sm;
    SparseMatrix tm;
    SparseMatrix mplus;
    SparseMatrix mminus;
    SparseMatrix mtimes;
    freopen("in", "r", stdin);
    scanf("%d%d", &r, &c);
    for (i = 0; i < r; ++i) {
        for (j = 0; j < c; ++j) {
            scanf("%d ", &m[i][j]);
        }
    }
    print_matrix(m, r, c);
    init(&sm, m, r, c);
    print_sparse_matrix(sm);
    printf("transpose ");
    transpose(&sm, &tm);
    print_sparse_matrix(tm);
    printf("plus ");
    rc = plus(&sm, &tm, &mplus);
    if (!rc) {
        print_sparse_matrix(mplus);
    }
    printf("minus ");
    rc = minus(&sm, &tm, &mminus);
    if (!rc) {
        print_sparse_matrix(mminus);
    }
    printf("times ");
    rc = times(&sm, &tm, &mtimes);
    if (!rc) {
        print_sparse_matrix(mtimes);
    }
    return 0;
};
