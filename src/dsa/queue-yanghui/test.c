#include <stdio.h>
#include "./queue-yanghui.h"

int main(int argc, char const *argv[]) {
  int n;
  while (scanf("%d", &n) != EOF) {
    yanghui(n);
  }
  return 0;
}
