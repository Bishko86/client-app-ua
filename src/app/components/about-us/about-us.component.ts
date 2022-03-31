import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
friends$: Observable<any>
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }
  onClick() {
    this.friends$ =  this.userService.test()
  }
}
