CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=test.c huffman-tree.c huffman-tree.h ../common/util.c ../common/util.h ../min-heap/min-heap.c ../min-heap/min-heap.h
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=a.out

all: $(SOURCES) $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -rf *.o a.out
