// src/app/services/topstories.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopstoriesService {
  protected readonly apiKey = environment.apiKey;
  // console.log()

  constructor(private http: HttpClient) { }

  getHomestories(): Observable<any> {
    // console.log(this.apiKey);
    const url = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${this.apiKey}`;
    return this.http.get<any>(url);
  }
}
