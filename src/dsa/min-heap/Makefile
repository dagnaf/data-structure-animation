CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=test.c min-heap.c min-heap.h ../common/util.c ../common/util.h ../hash/hash.c ../hash/hash.h
OBJECTS=$(SOURCES:.c=.o)
EXECUTABLE=a.out

all: $(SOURCES) $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -rf *.o a.out
