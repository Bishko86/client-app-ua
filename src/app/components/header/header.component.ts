import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthModalComponent } from 'src/app/modules/auth/auth-modal/auth-modal.component';
import { GetConfig } from 'src/app/store/actions/config.actions';
import { GetUsers } from 'src/app/store/actions/user.actions';
import { selectConfig } from 'src/app/store/selectors/config.selector';
import { IError } from 'src/app/store/states/user.state';
import { IAppState } from 'src/app/store/states/app.state';
import { IUserAuth } from 'src/app/common/interfaces/auth.interface';
import { Logout } from 'src/app/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  userName: string;
  dropdownVisible = false;
  accessToken: string | null = null;
  config$ = this.store.pipe(select(selectConfig));
  destroy$ = new Subject<boolean>();
  constructor(
    private store: Store<IAppState>,
    private router: Router,
    private dialog: MatDialog
  ) {}
  isError: IError;

  ngOnInit(): void {
    this.store.dispatch(new GetConfig());
    this.store.dispatch(new GetUsers());
    this.accessToken = localStorage.getItem('accessToken');
    this.isLoggedIn = !!this.accessToken;
    this.userName = localStorage.getItem('username') || '';

    //  this.error$.subscribe(d => this.isError = d);
  }
  navigate(event: Event) {
    const target = (event.target as HTMLElement).innerText
      .toLowerCase()
      .replace(' ', '-');
    this.router.navigateByUrl(target);
  }
  openAuthModal(page: string) {
    const dialogRef = this.dialog.open(AuthModalComponent, {
      data: {
        page,
      },
      autoFocus: false,
    });
    dialogRef
      .afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter((action) => !!action)
      )
      .subscribe((data: IUserAuth) => {
        this.isLoggedIn = data.isLoggedIn;
        this.userName = data.username;
      });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  signOut() {
    this.isLoggedIn = false;
    this.userName = '';
    localStorage.clear();
    this.dropdownVisible = !this.dropdownVisible;
    this.store.dispatch(new Logout());
  }

  settings() {
    console.log('Settings');
  }
}
