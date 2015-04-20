#include <stdio.h>
#include "./stack-eval.h"

int main(int argc, char const *argv[]) {
  freopen("in", "r", stdin);
  char s[10];
  scanf("%s", s);
  printf("%s = %d\n", s, eval(s));
  return 0;
}
