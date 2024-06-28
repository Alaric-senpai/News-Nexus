import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private apikey = environment.apiKey;

  constructor(private http:HttpClient) { }

  getAllBooks(): Observable<any[]>{
    const booksurl = `https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=${this.apikey}`;
    return this.http.get<any[]>(booksurl);
    
  }
  getBookByAuthor(author: string): Observable<any[]>{
    const author_url = `https://api.nytimes.com/svc/books/v3/lists//reviews.json?author=${author}&api-key=${this.apikey}`;
    return this.http.get<any[]>(author_url);
  }
  getBookbgIsbn(isbn: number): Observable<any>{
    const isbnurl =   `https://api.nytimes.com/svc/books/v3/lists//reviews.json?isbn=${isbn}&api-key=${this.apikey}`;
    return this.http.get<any>(isbnurl);
  }

  getBookbyTitle(title: string): Observable<any[]>{
    const titleurl = `https://api.nytimes.com/svc/books/v3/lists//reviews.json?title=${title}&api-key=${this.apikey}`;
    return this.http.get<any[]>(titleurl);
  }
  

}
