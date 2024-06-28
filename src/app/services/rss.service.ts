import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RssService {

  constructor(private http: HttpClient) { }

  getSectionData(section: string): Observable<string> {
    const sectionurl = `https://rss.nytimes.com/services/xml/rss/nyt/${section}.xml`;
    return this.http.get(sectionurl, { responseType: 'text' });
  }
}
