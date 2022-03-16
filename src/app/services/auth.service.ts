import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserAuthorized } from '../classes/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<IUserAuthorized> {
    return this.http.post<IUserAuthorized>('/auth/login', {
      username,
      password,
    });
  }

  registration(username: string, password: string): Observable<any> {
    return this.http.post<any>('/auth/registration', {
      username,
      password,
    });
  }
  
  saveUserToLocalStorage(user: IUserAuthorized) {
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }
}
