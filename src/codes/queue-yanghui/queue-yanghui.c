#include <stdio.h>
#include "../queue/queue.h"

void print_line(n) {
    int i;
    int j;
    int a;
    int b;
    Queue nums;
    init(&nums);
    for (i = 1; i <= n; ++i) {
        enque(&nums, 1);
        for (j = 0; j < i-2; ++j) {
            a = front(&nums);
            deque(&nums);
            b = front(&nums);
            enque(&nums, a+b);
        }
        deque(&nums);
        enque(&nums, 1);
    }
    for (i = 1; i <= n; ++i) {
        a = front(&nums);
        printf("%d ", a);
        deque(&nums);
    }
    return;
}
