import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ITokenPair, IVerifyUserDto } from '../common/interfaces/auth.interface';
import { AuthModalComponent } from '../modules/auth/components/auth-modal/auth-modal.component';
import {
  IUserLoginCredentials,
  IUserLoginData,
  IUserRegistrated,
} from '../modules/auth/store/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  login({
    username,
    email,
    password,
  }: IUserLoginCredentials): Observable<any> {
    return this.http.post<IUserLoginData>('/auth/login', {
      username,
      email,
      password,
    });
  }

  registration({
    username,
    email,
    password,
  }: IUserLoginCredentials): Observable<IUserRegistrated> {
    return this.http.post<IUserRegistrated>('/auth/registration', {
      username,
      email,
      password,
    });
  }

  verifyUser(token: string): Observable<IVerifyUserDto> {
    return this.http.get<IVerifyUserDto>(`/auth/confirm/${token}`);
  }

  saveUserToLocalStorage(user: IUserLoginData) {
    Object.entries(user).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
  }

  openAuthModal(page: string) {
    this.dialog.open(AuthModalComponent, {
      data: {
        page,
      },
      autoFocus: false,
    });
  }

  refresh(): Observable<ITokenPair> {
    return this.http.get<ITokenPair>('/auth/refresh/');
  }
}
