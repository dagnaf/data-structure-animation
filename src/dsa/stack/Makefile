CC=gcc
CFLAGS=-c -Wall
LDFLAGS=
SOURCES=test.c stack.c stack.h ../common/util.c ../common/util.h
OBJECTS=$(SOURCES:.cpp=.o)
EXECUTABLE=a.out

all: $(SOURCES) $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm -rf *.o a.out
