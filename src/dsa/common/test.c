#include <stdlib.h>
#include "./util.h"

int main(int argc, char const *argv[])
{
  void *ptr = SafeMalloc(sizeof(int));
  free(ptr);
  return 0;
}
