import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as bookActions from '../actions/book.actions';
import { BooksContainerComponent } from "../containers/books-container/books-container.component";
import { BooksEntity } from "../reducers/books.reducer";
@Injectable()
export class BookEffects {

  // bookAdded => (bookAddedSuccesfully | bookAddedFailure)
  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.bookAdded),
      switchMap(a => this.http.post<BooksEntity>('http://localhost:1337/books', a.payload)
        .pipe(
          map(book => bookActions.bookAddedSuccessfully({ oldId: a.payload.id, payload: book })),
          catchError(err => of(bookActions.bookAddedFailure({ payload: a.payload, errorMessage: 'Blammo' })))
        )
      )
    ));

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.loadBooks),
      switchMap(() => this.http.get<{ data: BooksEntity[] }>('http://localhost:1337/books')
        .pipe(

          map(response => bookActions.loadBooksSucceeded({ payload: response.data }))
        )
      )

    ), { dispatch: true }

  )
  logItAll$ = createEffect(() =>
    this.actions$.pipe(
      tap(a => console.log(`Got an action of type ${a.type}`))
    )
    , { dispatch: false }
  );

  constructor(private actions$: Actions, private http: HttpClient) { }
}
