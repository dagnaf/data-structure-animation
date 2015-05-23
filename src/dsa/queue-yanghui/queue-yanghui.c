#include <stdio.h>
#include "../queue/queue.h"

void yanghui(n) {
    int i;
    int j;
    int a;
    int one = 1;
    queue *nums = QueueCreate(n+1, sizeof(int));
    QueuePush(nums, &one);
    for (i = 1; i <= n; ++i) {
        QueuePush(nums, &one);
        for (j = 0; j < i-1; ++j) {
            a = *(int *)QueuePeak(nums);
            QueuePop(nums);
            a += *(int *)QueuePeak(nums);
            QueuePush(nums, &a);
        }
        QueuePop(nums);
        QueuePush(nums, &one);
    }
    for (i = 0; i < n+1; ++i) {
        a = *(int *)QueuePeak(nums);
        printf("%d ", a);
        QueuePop(nums);
    }
    printf("\n");
    QueueDestroy(nums);
    return;
}
