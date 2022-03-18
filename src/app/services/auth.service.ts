import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserLoginData } from '../classes/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<IUserLoginData> {
    return this.http.post<IUserLoginData>('/auth/login', {
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
  
  saveUserToLocalStorage(user: IUserLoginData) {
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }
}
