CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=test.c ../common/util.c ../common/util.h ../graph/graph.c ../graph/graph.h ../min-heap/min-heap.c ../min-heap/min-heap.h ./mst.c ./mst.h
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=a.out

all: $(SOURCES) $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -rf *.o a.out
