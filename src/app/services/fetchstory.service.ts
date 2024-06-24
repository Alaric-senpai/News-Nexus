import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FetchstoryService {
  private apiKey = environment.apiKey;  // Replace with your actual API key
  private apiUrl = 'https://api.nytimes.com/svc/news/v3/content/nyt'; 
  constructor(private http: HttpClient) { }

  fetchStory(id: string): Observable<any[]>{
    const url = `${this.apiUrl}/${id}.json?api-key=${this.apiKey}`;
    return this.http.get<any[]>(url);
  }
}
