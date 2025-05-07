#ifndef STRUCT_BOOK_H_INCLUDED
#define STRUCT_BOOK_H_INCLUDED

#ifndef STRUCT_BOOK_H
#define STRUCT_BOOK_H

#define MAX_TITLE 100
#define MAX_AUTHOR 100

typedef struct {
    char title[MAX_TITLE];
    char author[MAX_AUTHOR];
    int year;
    int id;
} Book;

#endif


#endif // STRUCT_BOOK_H_INCLUDED
