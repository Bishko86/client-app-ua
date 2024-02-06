import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../interfaces/people.interface';

@Injectable()
export class PeopleApiService {

  constructor(private readonly httpClient: HttpClient) { }

  fetchPeople(): Observable<Person[]> {
    return this.httpClient.get<Person[]>('/api/friends');
  }

  addNewPerson(person: Person): Observable<Person> {
    return this.httpClient.post<Person>('/api/friends', person);
  }

  deletePerson(personId: string): Observable<unknown> {
    return this.httpClient.delete(`/api/friends/${personId}`);
  }
}
