import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DosService {

  constructor(private http: HttpClient) { }

  go(url: string):Observable<any>{
    return this.http.get(url)
  }
}
