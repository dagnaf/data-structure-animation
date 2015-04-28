#define N 15

typedef struct {
    int head;
    int tail;
    int data[N];
} Queue;

void init(Queue *q);
int isFull(Queue *q);
int isEmpty(Queue *q);
void enque(Queue *q, int val);
void deque(Queue *q);
int front(Queue *q);

