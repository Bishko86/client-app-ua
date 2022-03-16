import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  apiUrl = 'http://137.184.2.106:8080';

  intercept( request: HttpRequest<unknown>, next: HttpHandler ): Observable<HttpEvent<unknown>> {
    const url = request.url.includes('placeholder')
      ? `${request.url}`
      : `${this.apiUrl}${request.url}`;
    const apiReq = request.clone({ url });
    return next.handle(apiReq);
  }
}
