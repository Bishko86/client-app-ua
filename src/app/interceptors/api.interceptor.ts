import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorStatus } from '../common/enums/error-status.enum';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { IAppState } from '../store/states/app.state';
import { Logout } from '../modules/auth/store/auth.actions';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private apiUrl = environment.production
    ? 'http://192.168.0.140:8080'
    : 'http://localhost:8080';

  private isRefreshing = false;

  constructor(
    private authService: AuthService,
    private store: Store<IAppState>
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('accessToken')) {
      request = this.addAccessTokenToHeader(
        request,
        localStorage.getItem('accessToken') || ''
      );
    }

    const url = request.url.includes('placeholder')
      ? `${request.url}`
      : `${this.apiUrl}${request.url}`;

    const modifiedRequest = request.clone({ url, withCredentials: true });
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        const isUnAuthorized = [ErrorStatus.UNAUTHORIZED].some((code) => error.status === code);

        if (isUnAuthorized) {
          return this.handleUnauthorized(modifiedRequest, next);
        }

        return throwError(error);
      })
    );
  }

  /**
   * Adds access token to authentication header.
   *
   * @param req - {@link HttpRequest}
   * @param accessToken - {@link string} - access token key.
   */
  private addAccessTokenToHeader(
    req: HttpRequest<any>,
    accessToken: string
  ): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }


  private handleUnauthorized(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refresh().pipe(
        take(1),
        tap((tokens) => {
          this.isRefreshing = false;
          localStorage.setItem('accessToken', tokens.accessToken);
        }),
        switchMap((tokens) => next.handle(
          this.addAccessTokenToHeader(req, tokens.accessToken)
        )),
        catchError((err: HttpErrorResponse) => this.handleRefreshTokenIsNotValid())
      );
    } else {
      return of<HttpEvent<any>>();
    }
  }

  private handleRefreshTokenIsNotValid(): Observable<HttpEvent<any>> {
    this.isRefreshing = false;
    localStorage.clear();
    this.store.dispatch(new Logout());
    this.authService.openAuthModal('sign-in');
    return of<HttpEvent<any>>();
  }
}
