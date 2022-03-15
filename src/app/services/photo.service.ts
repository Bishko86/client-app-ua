import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IPhoto } from "../classes/photo.inteface";

@Injectable()
export class PhotoService {
    constructor(private http: HttpClient){}

    getPhoto(page: number, limit: number): Observable<IPhoto[]> {
        return this.http.get<IPhoto[]>(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=${limit}`);
    }
}