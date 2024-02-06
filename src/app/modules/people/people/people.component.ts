import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PeopleFormService } from '../services/people-form.service';
import { PeopleApiService } from '../services/people-api.service';
import { switchMap, take } from 'rxjs/operators';
import { Person } from '../interfaces/people.interface';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent implements OnInit {
  peopleForm = this.peopleFormService.initPeopleForm();
  people: Person[] = [];

  constructor(
    private peopleFormService: PeopleFormService,
    private peopleApiService: PeopleApiService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.peopleApiService.fetchPeople().subscribe((people) => {
      this.people = people;
      this.cdr.markForCheck();
    });
  }

  addPerson(): void {
    if (this.peopleForm.valid) {
    const person = this.peopleForm.getRawValue();
  
    this.peopleApiService.addNewPerson(person)
      .pipe(
        switchMap(() => this.peopleApiService.fetchPeople()),
        take(1)
      ).subscribe((people) => {
        this.people = people;
        this.cdr.markForCheck();
      });
    } else {
      this.peopleForm.markAllAsTouched();
    }
  }
}
