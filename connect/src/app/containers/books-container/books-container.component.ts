import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadBooks } from 'src/app/actions/book.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-books-container',
  templateUrl: './books-container.component.html',
  styleUrls: ['./books-container.component.css']
})
export class BooksContainerComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

}
