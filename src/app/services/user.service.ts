import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    constructor(private http: HttpClient){}
    
    getUsers() {
        return this.http.get('https://jsonplaceholder.typicode.com/users');
    }

    test() {
        return this.http.get("/api/friends");
    }
}