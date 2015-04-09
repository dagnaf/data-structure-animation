#define N 5

typedef struct {
    int top;
    int data[N];
} Stack;

void init(Stack *s);
int isFull(Stack *s);
int isEmpty(Stack *s);
void push(Stack *s, int val);
void pop(Stack *s);
int peak(Stack *s);

