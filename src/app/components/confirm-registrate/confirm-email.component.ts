import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { selectQueryToken } from 'src/app/store/selectors/router.selectors';
import { IAppState } from 'src/app/store/states/app.state';

interface IConfirmResult {
  status: boolean;
  title: string;
  text: string;
}

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  confirmResult: IConfirmResult = {
    status: true,
    title: 'Email successfully verified',
    text: 'Please wait...',
  };

  private confirmToken$ = this.store.pipe(select(selectQueryToken));

  constructor(
    private store: Store<IAppState>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.confirmToken$.pipe(take(1)).subscribe((token) => {
      this.authService
        .verifyUser(token)
        .pipe(take(5))
        .subscribe((data) => {
          this.confirmResult = {
            status: data.status,
            title: data.title,
            text: data.text,
          };
        });
    });
  }

  onToLoginPage(): void {
    console.log('Login Page');
  }

  toWelcomePage() {
    console.log('Welcome Page');
  }
}
