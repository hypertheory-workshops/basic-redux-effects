import { createAction, props } from "@ngrx/store";
import { BooksEntity } from "../reducers/books.reducer";

let id = 1;
export const bookAdded = createAction(
  '[app] book added',
  ({ book }: { book: BookCreate }) => ({

    payload: {
      id: 'TEMP' + id++,
      ...book
    } as BooksEntity
  })
);


export const bookAddedSuccessfully = createAction(
  '[ap] book added successfully',
  props<{ payload: BooksEntity, oldId: string }>()
);

export const bookAddedFailure = createAction(
  '[app] book added failure',
  props<{ payload: BooksEntity, errorMessage: string }>()
);

// initiation, success, failure
export const loadBooks = createAction(
  '[app] load books'
);


export const loadBooksSucceeded = createAction(
  '[app] load books succeeded',
  props<{ payload: BooksEntity[] }>()
);

export const loadBooksFailed = createAction(
  '[app] load books failed',
  props<{ payload: { errorMessage: string } }>()
);


export const updateBookTitle = createAction(
  '[app] update book title',
  props<{ payload: { newTitle: string, book: BooksEntity } }>()
);

interface BookCreate {
  title: string;
  author: string;
  genre: string;
}
