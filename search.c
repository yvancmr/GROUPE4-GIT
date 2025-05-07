#include <string.h>
#include "struct_book.h"

int searchByTitle(const Book *books, int count, const char *title) {
    for (int i = 0; i < count; i++) {
        if (strcmp(books[i].title, title) == 0) return i;
    }
    return -1;
}

int searchByAuthor(const Book *books, int count, const char *author) {
    for (int i = 0; i < count; i++) {
        if (strcmp(books[i].author, author) == 0) return i;
    }
    return -1;
}
