import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseurl = 'http://localhost:3000'
  constructor(private _http: HttpClient) { }

  registeruser(userDetails: User) {
    return this._http.post(`${this.baseurl}/users`, userDetails);
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this._http.get<User[]>(`${this.baseurl}/users?email=${email}`);
  }


}
