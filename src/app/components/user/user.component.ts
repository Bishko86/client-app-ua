import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { GetUser } from 'src/app/store/actions/user.actions';
import {
  selectCurrentRoute,
  selectQueryParams,
  selectRouteNestedParams,
  selectRouteParams,
} from 'src/app/store/selectors/router.selectors';
import {
  selectSelectedUser,
  selectUserList,
} from 'src/app/store/selectors/user.selector';
import { IAppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user$ = this._store.pipe(select(selectSelectedUser));
  users$ = this._store.pipe(select(selectUserList));
  currentRoute$ = this._store.pipe(select(selectCurrentRoute));
  queryParams$ = this._store.pipe(select(selectQueryParams));
  selectRouteParams$ = this._store.pipe(select(selectRouteParams));
  selectRouteNestedParams$ = this._store.pipe(select(selectRouteNestedParams));

  constructor(
    private _store: Store<IAppState>,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.getUserData();
  }

  private getUserData() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.users$.subscribe((data) => {
        if (data.length) {
          this._store.dispatch(new GetUser(parseFloat(id)));
        }
      });
    }
  }
}
