import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Person } from '../interfaces/people.interface';
import { ConfirmService } from 'src/app/services/confirm.service';
import { filter, switchMap, take } from 'rxjs/operators';
import { PeopleApiService } from '../services/people-api.service';

@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent {
  displayedColumns: string[] = ['name', 'username', 'email', 'company', 'phone', 'zipcode', 'options'];
  @Input() people: Person[];

  @Output() refreshGrid = new EventEmitter<void>();

  constructor(
    private readonly confirmService: ConfirmService,
    private readonly peopleApiService: PeopleApiService,
  ) { }

  public removePerson(personId: string): void {
    this.confirmService.confirm('Are you sure you want to delete?')
      .pipe(
        take(1),
        filter(Boolean),
        switchMap(() => this.peopleApiService.deletePerson(personId))
      )
      .subscribe({
        next: () => {
          this.refreshGrid.emit();
        },
        error: (error) => {
          alert('Something went wrong, please reload the page')
        }
      });
  }

}
