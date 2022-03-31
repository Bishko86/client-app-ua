import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { getUsers } from 'src/app/store/actions/user.actions';
import { selectErrorCase, selectUserList } from 'src/app/store/selectors/user.selector';
import { IError } from 'src/app/store/states/user.state';
import { IAppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(private _store: Store<IAppState>, private router: Router) { }
  users$ = this._store.pipe(select(selectUserList))
  error$ = this._store.pipe(select(selectErrorCase));
  isError: IError;
  ngOnInit(): void {
    this.error$.subscribe(d => this.isError = d);
  }

  load() {
    this._store.dispatch(getUsers());
  }
  onUserInfo(id: number) {
    this.router.navigate(['/users', id]);
  }
}
