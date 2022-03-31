import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  user = {
    name: 'Roman',
    sureName: 'Bishko',
    city: 'Sukhovolya',
    education: 'Lviv colledge of food technology and business',
    get study() {
      return this.education.length> 20? this.education.slice(0, 20) + '...': this.education
    }
  }
  

  ngOnInit(): void {
  }

}
