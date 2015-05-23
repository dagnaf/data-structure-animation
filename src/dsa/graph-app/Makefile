CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=test.c ../common/util.c ../common/util.h ./graph.c ./graph.h ./graph-scc-tarjan.c ./graph-scc-tarjan.h ./graph-topo-sort.c ./graph-topo-sort.h ./graph-traverse.c ./graph-traverse.h ../stack/stack.c ../stack/stack.h ../queue/queue.c ../queue/queue.h
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=a.out

all: $(SOURCES) $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -rf *.o a.out
