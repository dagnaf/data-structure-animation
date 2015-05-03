#define N 15

typedef struct {
    int i;
    int j;
    int v;
} Triple;

typedef struct {
    Triple triple[N];
    int r;
    int c;
    int n;
} SparseMatrix;

void setTriple(Triple *t, int i, int j, int v);
void init(SparseMatrix *sm, int m[N][N], int r, int c);
void transpose(SparseMatrix *m, SparseMatrix *t);
int times(SparseMatrix *ma, SparseMatrix *mb, SparseMatrix *m);
int plus(SparseMatrix *ma, SparseMatrix *mb, SparseMatrix *m);
int minus(SparseMatrix *ma, SparseMatrix *mb, SparseMatrix *m);
