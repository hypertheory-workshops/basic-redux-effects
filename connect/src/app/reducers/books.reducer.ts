import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/book.actions';

export interface BooksEntity {
  id: string;
  title: string;
  author: string;
  genre: string;
}

export interface BooksState extends EntityState<BooksEntity> {

}

export const adapter = createEntityAdapter<BooksEntity>();

const initialState = adapter.getInitialState();
// const initialState: BooksState = {
//   ids: ['1', '2', '3'],
//   entities: {
//     '1': { id: '1', title: 'Fake Book 1 Title', author: 'Fake book 1 author', genre: 'Fiction' },
//     '2': { id: '1', title: 'Fake Book 2 Title', author: 'Fake book 2 author', genre: 'Non-Fiction' },
//     '3': { id: '3', title: 'Fake Book 3 Title', author: 'Fake book 3 author', genre: 'Non-Fiction' },
//   }
// }



const reducerFunction = createReducer(
  initialState,
  on(actions.bookAddedFailure, (s, a) => adapter.removeOne(a.payload.id, s)),
  on(actions.bookAddedSuccessfully, (s, a) => adapter.updateOne({ id: a.oldId, changes: { id: a.payload.id } }, s)),
  on(actions.bookAdded, (s, a) => adapter.addOne(a.payload, s)),
  on(actions.loadBooksSucceeded, (s, a) => adapter.setAll(a.payload, s)),
  on(actions.updateBookTitle, (s, a) => adapter.updateOne({
    id: a.payload.book.id,
    changes: {
      title: a.payload.newTitle,
      genre: 'Updated'
    }
  }, s))
);

export function reducer(state: BooksState = initialState, action: Action): BooksState {
  return reducerFunction(state, action);
}



