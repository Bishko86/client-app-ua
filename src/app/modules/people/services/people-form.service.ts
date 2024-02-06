import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()
export class PeopleFormService {

  constructor(private readonly fb: FormBuilder) { }

  initPeopleForm() {
    return this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      phone: [''],
      website: [''],
      company: [''],
      address: this.fb.group({
        street: '',
        city: ['', Validators.required],
        zipcode: '',
      }),
    });
  }
}
