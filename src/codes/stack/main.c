#include "stack.h"

int main(int argc, char const *argv[]) {
  Stack stack;
  init(&stack);
  push(&stack, 50);
  push(&stack, 100);
  push(&stack, 0);
  // 在系统中运行命令：
  // 初始化、入栈、出栈、栈顶
  return 0;
};
