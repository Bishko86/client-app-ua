import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface IUserDto {
  username: string;
  accessToken: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<IUserDto> {
    return this.http.post<IUserDto>('/auth/login', {
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
  
  saveUserToLocalStorage(user: IUserDto) {
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }
}
