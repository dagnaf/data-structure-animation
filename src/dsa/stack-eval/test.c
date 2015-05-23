#include <stdio.h>
#include "./stack-eval.h"

int main(int argc, char const *argv[]) {
  char s[100];
  while (scanf("%s", s) != EOF) {
    printf("%s = %d\n", s, eval(s));
  }
  return 0;
}
