import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { BookListModel } from 'src/app/models/books/book-list.model';
import { AppState, selectBooksListModel } from 'src/app/reducers';
import { tap } from 'rxjs/operators'
import { BooksEntity } from 'src/app/reducers/books.reducer';
import { updateBookTitle } from 'src/app/actions/book.actions';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit, OnDestroy {

  books$: Observable<BookListModel[]>
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.books$ = this.store.select(selectBooksListModel);



    // console.log('The books after the subscribe', this.books)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  updateTitle(titleEl: HTMLInputElement, book: BooksEntity): void {
    this.store.dispatch(updateBookTitle({
      payload: {
        newTitle: titleEl.value,
        book
      }
    }));

    titleEl.value = '';
  }

}
