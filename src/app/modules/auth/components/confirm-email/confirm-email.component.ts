import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { selectQueryToken } from 'src/app/store/selectors/router.selectors';
import { IAppState } from 'src/app/store/states/app.state';

interface IConfirmResult {
  status: boolean;
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  confirmResult: IConfirmResult;

  private confirmToken$ = this.store.pipe(select(selectQueryToken));

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.confirmToken$.pipe(take(1)).subscribe((token) => {
      this.authService
        .verifyUser(token)
        .pipe(take(5))
        .subscribe(
          (data) => {
            this.confirmResult = {
              status: data.status,
              title: data.title,
              message: data.message,
            };
          },
          (err) => {
            this.confirmResult = {
              status: false,
              title: 'Confirm email is failed',
              message: err.error.message,
            };
          }
        );
    });
  }

  onToLoginPage(): void {
    this.router.navigateByUrl('login');
  }

  toWelcomePage() {
    console.log('Welcome Page');
  }
}
