#include <stdio.h>
#include "./sparse-matrix.h"

void setTriple(Triple *t, int i, int j, int v) {
    t->i = i;
    t->j = j;
    t->v = v;
}

void init(SparseMatrix *sm, int m[N][N], int r, int c) {
    int i;
    int j;
    int k = 0;
    for (i = 0; i < r; ++i) {
        for (j = 0; j < c; ++j) {
            if (m[i][j] != 0) {
                setTriple(&(sm->triple[k++]), i, j, m[i][j]);
            }
        }
    }
    sm->r = r;
    sm->c = c;
    sm->n = k;
}

void transpose(SparseMatrix *m, SparseMatrix *t) {
    int i;
    int j;
    int cpos[N];
    t->r = m->c;
    t->c = m->r;
    t->n = m->n;
    for (i = 0; i < m->c; ++i) {
        cpos[i] = 0;
    }
    for (i = 0; i < m->n; ++i) {
        cpos[m->triple[i].j]++;
    }
    for (i = 1; i < m->c; ++i) {
        cpos[i] += cpos[i-1];
    }
    for (i = m->n-1; i >= 0; --i) {
        j = --cpos[m->triple[i].j];
        setTriple(
            &(t->triple[j]),
            m->triple[i].j,
            m->triple[i].i,
            m->triple[i].v
        );
    }
}

void _get_rpos(SparseMatrix *m, int *rpos) {
    int i;
    int j = -1;
    for (i = 0; i < m->r; ++i) {
        rpos[i] = -1;
    }
    rpos[m->r] = m->n;
    for (i = 0; i < m->n; ++i) {
        if (m->triple[i].i != j) {
            j = m->triple[i].i;
            rpos[j] = i;
        }
    }
    for (i = m->r-1; i >= 0; --i) {
        if (rpos[i] == -1) {
            rpos[i] = rpos[i+1];
        }
    }
}

int times(SparseMatrix *ma, SparseMatrix *mb, SparseMatrix *m) {
    int i0;
    int i;
    int j0;
    int j;
    int k = 0;
    int ma_rpos[N];
    int mb_rpos[N];
    int tmp[N];
    if (ma->c != mb-> r) {
        printf("demenstion mismatch\n");
        return 1;
    }
    _get_rpos(ma, ma_rpos);
    _get_rpos(mb, mb_rpos);
    for (i0 = 0; i0 < ma->r; ++i0) {
        for (j0 = 0; j0 < mb->c; ++j0) {
            tmp[j0] = 0;
        }
        for (i = ma_rpos[i0]; i < ma_rpos[i0+1]; i++) {
            j0 = ma->triple[i].j;
            for (j = mb_rpos[j0]; j < mb_rpos[j0+1]; ++j) {
                tmp[mb->triple[j].j] += ma->triple[i].v * mb->triple[j].v;
            }
        }
        for (j0 = 0; j0 < mb->c; ++j0) {
            if (tmp[j0] != 0) {
                setTriple(&(m->triple[k++]), i0, j0, tmp[j0]);
            }
        }
    }
    m->r = ma->r;
    m->c = mb->c;
    m->n = k;
    return 0;
}
int plus(SparseMatrix *ma, SparseMatrix *mb, SparseMatrix *m) {
    int i = 0;
    int j = 0;
    int k = 0;
    if (ma->r != mb->r || ma->c != mb->c) {
        printf("demenstion mismatch\n");
        return 1;
    }
    while (i < ma->n && j < mb->n) {
        if (ma->triple[i].i == mb->triple[j].i &&
            ma->triple[i].j == mb->triple[j].j) {
            if (ma->triple[i].v + mb->triple[j].v != 0) {
                setTriple(
                    &(m->triple[k]),
                    ma->triple[i].i,
                    ma->triple[i].j,
                    ma->triple[i].v + mb->triple[j].v
                );
                ++k;
            }
            ++i;
            ++j;
        } else if (ma->triple[i].i < mb->triple[j].i ||
            (ma->triple[i].i == mb->triple[j].i &&
            ma->triple[i].j < mb->triple[j].j)) {
            m->triple[k++] = ma->triple[i++];
        } else {
            m->triple[k++] = mb->triple[j++];
        }
    }
    while (i < ma->n) {
        m->triple[k++] = ma->triple[i++];
    }
    while (j < mb->n) {
        m->triple[k++] = mb->triple[j++];
    }
    m->r = ma->r;
    m->c = ma->c;
    m->n = k;
    return 0;
}
void _negate(SparseMatrix *m) {
    int i;
    for (i = 0; i < m->n; ++i) {
        m->triple[i].v = -m->triple[i].v;
    }
}
int minus(SparseMatrix *ma, SparseMatrix *mb, SparseMatrix *m) {
    SparseMatrix neg_mb = *mb;
    _negate(&neg_mb);
    return plus(ma, &neg_mb, m);
}
