import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserLoginCredentials, IUserLoginData } from '../modules/auth/store/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login({username, email, password}: IUserLoginCredentials): Observable<IUserLoginData> {
    return this.http.post<IUserLoginData>('/auth/login', {
      username,
      email,
      password,
    });
  }

  registration({username, email, password}: IUserLoginCredentials): Observable<any> {
    return this.http.post<any>('/auth/registration', {
      username,
      email,
      password,
    });
  }

  verifyUser(token: string) {
    return this.http.get<any>(`/auth/confirm/${token}`);
  }
  
  saveUserToLocalStorage(user: IUserLoginData) {
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }
}
