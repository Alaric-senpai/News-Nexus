import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewswireService {

  constructor(private http: HttpClient) { }

  apikey = environment.apiKey;

  getCategory(category: string): Observable<any> {
    const url = `https://api.nytimes.com/svc/news/v3/content/nyt/${category}.json?api-key=${this.apikey}`;
    return this.http.get<any>(url);
  }
  
}
