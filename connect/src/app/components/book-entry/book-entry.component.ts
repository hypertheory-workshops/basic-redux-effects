import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { bookAdded } from 'src/app/actions/book.actions';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-book-entry',
  templateUrl: './book-entry.component.html',
  styleUrls: ['./book-entry.component.css']
})
export class BookEntryComponent implements OnInit {

  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    })
  }

  submit(focusMe: HTMLInputElement): void {
    if (this.form.valid) {
      this.store.dispatch(bookAdded({ book: this.form.value }));
      this.form.reset();
      focusMe.focus();
    } else {
      Object.keys(this.form.controls).forEach(field => {
        const control = this.form.get(field);
        control.markAsTouched({ onlySelf: true });
      });
      focusMe.focus();
    }
  }

  get title(): AbstractControl { return this.form.get('title'); }
  get author(): AbstractControl { return this.form.get('author'); }
  get genre(): AbstractControl { return this.form.get('genre'); }
}
