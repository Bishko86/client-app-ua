import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people/people.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PeopleFormService } from './services/people-form.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PeopleApiService } from './services/people-api.service';
import { PeopleListComponent } from './people-list/people-list.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    PeopleComponent,
    PeopleListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PeopleComponent }]),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [PeopleFormService, PeopleApiService]
})
export class PeopleModule { }
