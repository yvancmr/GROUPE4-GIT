#include <stdlib.h>
#include <string.h>
#include "struct_book.h"
#include "io_file.c"
#include "search.c"

int main() {
    Book b1 = {.id = 1, .year = 2020};
    strcpy(b1.title, "C Programming");
    strcpy(b1.author, "Dennis Ritchie");

    saveBook(&b1, "books.dat");
    loadBooks("books.dat");

    return 0;
}
