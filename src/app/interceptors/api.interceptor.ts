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
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { ITokenPair } from '../common/interfaces/auth.interface';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  apiUrl = environment.production
    ? 'http://137.184.2.106:8080'
    : 'http://127.0.0.1:8080';
  constructor(
    private authService: AuthService
  ) {}
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

    const modifiedRequest = request.clone({ url });
    return next.handle(modifiedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (this.checkErrorStatus(error.status, [ErrorStatus.UNAUTHORIZED])) {
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
      withCredentials: true,
      headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
    });
  }
  private checkErrorStatus(
    errStatusCode: number,
    statusCodesToVerify: number[]
  ): boolean {
    return statusCodesToVerify.some((code) => errStatusCode === code);
  }

  private handleUnauthorized(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const refreshToken = localStorage.getItem('refreshToken') || '';
    return this.getNewTokens(refreshToken).pipe(
      catchError((err) => {
        return of(err);
      }),
      switchMap((tokens) => {
        localStorage.setItem('accessToken', tokens.accessToken);
        return next.handle(
          this.addAccessTokenToHeader(req, tokens.accessToken)
        );
      })
    );
  }

  private getNewTokens(refreshToken: string): Observable<ITokenPair> {
    return this.authService.refresh(refreshToken);
  }
}
