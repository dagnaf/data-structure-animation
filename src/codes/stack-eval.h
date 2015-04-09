int prior(char instack, char coming);
void poppush(Stack *nums, Stack *ops);
typedef struct {
    char *ptr;
    char *str;
} Expression;
int eval(Expression *expr);
