#include <stdio.h>
#include "struct_book.h"

void saveBook(const Book *book, const char *filename) {
    FILE *fp = fopen(filename, "ab");
    if (fp) {
        fwrite(book, sizeof(Book), 1, fp);
        fclose(fp);
    }
}

void loadBooks(const char *filename) {
    FILE *fp = fopen(filename, "rb");
    Book book;
    if (fp) {
        while (fread(&book, sizeof(Book), 1, fp)) {
            printf("ID: %d, Title: %s, Author: %s, Year: %d\n",
                   book.id, book.title, book.author, book.year);
        }
        fclose(fp);
    }
}
