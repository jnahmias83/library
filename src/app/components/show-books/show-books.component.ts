import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Book } from 'src/app/interfaces/Book';
import { BooksService } from 'src/app/services/books.service';
import { EditBookComponent } from '../edit-book/edit-book.component';

@Component({
  selector: 'app-show-books',
  templateUrl: './show-books.component.html',
  styleUrls: ['./show-books.component.css']
})

export class ShowBooksComponent implements OnInit {
  books : Book[] = [];
  
  constructor(private bs : BooksService,private modal: NgbModal) { }

  ngOnInit(): void {
    this.bs.getBooks().subscribe((booksData: Book[]) => {
      this.books = booksData;
    });

  }

  deleteBook(book : Book) {
    if(confirm('Are you sure?')) {
      this.bs.deleteBook(book).then(()=>console.log('Book deleted successfully')).catch(error=>{console.log(error);
      })
    }
  }

  updateBook(book : Book) : void {
    const modalRef = this.modal.open(EditBookComponent,
      {
        size: 'lg',
        centered: true,
        windowClass: 'dark-modal'
      }
    );
    modalRef.componentInstance.id = book.id;
  }
}
