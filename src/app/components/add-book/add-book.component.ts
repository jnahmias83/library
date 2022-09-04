import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Book } from 'src/app/interfaces/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
})
export class AddBookComponent implements OnInit {
  book: Book = { name: '', author: '', genre: 'Novel', price: 0 };

  constructor(private bs: BooksService) {}

  ngOnInit(): void {}

  onSubmit(bookForm: NgForm) {
    this.bs
      .addBook(this.book)
      .then(() => {
        alert('Book was added succesfully');
        this.reset();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  reset(): void {
    this.book = { name: '', author: '', genre: 'novel', price: 0 };
  }
}
