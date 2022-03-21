import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { GetUsers } from 'src/app/store/actions/user.actions';
import { IAppState } from 'src/app/store/states/app.state';
import { Logout } from 'src/app/modules/auth/store/auth.actions';
import { selectUserAuthData, selectUserIsLoggedIn } from 'src/app/modules/auth/store/auth.selector';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  dropdownVisible = false;
  destroy$ = new Subject<boolean>();

  userData$ = this.store.pipe(select(selectUserAuthData));
  isLoggedIn$ = this.store.pipe(select(selectUserIsLoggedIn));

  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private authServise: AuthService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUsers());
  }

  navigate(event: Event) {
    const target = (event.target as HTMLElement).innerText
      .toLowerCase()
      .replace(' ', '-');
    this.router.navigateByUrl(target);
  }

  openAuthModal(page: string) {
  this.authServise.openAuthModal(page);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  signOut() {
    localStorage.clear();
    this.dropdownVisible = !this.dropdownVisible;
    this.store.dispatch(new Logout());
  }

  settings() {
    console.log('Settings');
  }
}
