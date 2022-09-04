import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  DocumentReference,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../interfaces/Book';

@Injectable({
  providedIn: 'root',
})

export class BooksService {
  booksRef = collection(this.firestore, 'books');

  constructor(private firestore: Firestore) {}

  addBook(book: Book): Promise<DocumentReference<Book>> {
    return addDoc(this.booksRef, book) as Promise<DocumentReference<Book>>;
  }

  getBooks(): Observable<Book[]> {
    return collectionData(this.booksRef, { idField: 'id' }) as Observable<
      Book[]
    >;
  }

  deleteBook(book: Book): Promise<void> {
    const bookRef = doc(this.firestore, `books/${book.id}`);
    return deleteDoc(bookRef) as Promise<void>;
  }

  updateBook(book : Book) : Promise<void>{
    const bookRef = doc(this.firestore, `books/${book.id}`);
    return setDoc(bookRef,book)  as Promise<void>;
  }

  getBookByid(id : string) : Observable<Book> {
    const bookRef = doc(this.firestore, `books/${id}`);
    return docData(bookRef,{idField:'id'}) as Observable<Book>;
  }
}
