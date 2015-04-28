#include <stdio.h>
#include "../queue/queue.h"

void yanghui(n) {
    int i;
    int j;
    int a;
    int b;
    Queue nums;
    init(&nums);
    enque(&nums, 1);
    for (i = 1; i <= n; ++i) {
        enque(&nums, 1);
        for (j = 0; j < i-1; ++j) {
            a = front(&nums);
            deque(&nums);
            b = front(&nums);
            enque(&nums, a+b);
        }
        deque(&nums);
        enque(&nums, 1);
    }
    for (i = 0; i < n+1; ++i) {
        a = front(&nums);
        printf("%d ", a);
        deque(&nums);
    }
    printf("\n");
    return;
}
