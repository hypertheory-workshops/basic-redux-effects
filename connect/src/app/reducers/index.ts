import { ActionReducerMap, createSelector } from "@ngrx/store";
import { BookListModel } from "../models/books/book-list.model";
import * as fromBooks from './books.reducer';

export interface AppState {
  books: fromBooks.BooksState
}

export const reducers: ActionReducerMap<AppState> = {
  books: fromBooks.reducer
}

const selectRootState = (state: AppState) => state;

const selectBooksBranch = createSelector(selectRootState, s => s.books);

const { selectAll: selectBooksArray } = fromBooks.adapter.getSelectors(selectBooksBranch);

export const selectBooksListModel = createSelector(
  selectBooksArray,
  a => a.map(book => {
    return {
      ...book,
      isSaved: !book.id.toString().startsWith('TEMP')
    } as BookListModel
  })
);
