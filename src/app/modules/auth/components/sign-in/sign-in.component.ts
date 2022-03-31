import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthError, IUserLoginCredentials } from 'src/app/modules/auth/store/auth.interface';
import { IUserAuth } from 'src/app/common/interfaces/auth.interface';
import { AuthService } from 'src/app/services/auth.service';
import { EraseLoginError, Login } from 'src/app/modules/auth/store/auth.actions';
import {
  selectLoginError,
  selectAuthIsFetching,
  selectUserAuthData,
} from 'src/app/modules/auth/store/auth.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  loginError: IAuthError | null;
  isLoggedIn = false;
  user: IUserAuth;
  isFetching$ = this.store.pipe(select(selectAuthIsFetching));
  user$ = this.store.pipe(select(selectUserAuthData));
  passError$ = this.store.pipe(select(selectLoginError));
  
  private destroy$ = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService,
    private store: Store<IAppState>,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.passError$
      .pipe(takeUntil(this.destroy$))
      .subscribe((error) => {
        this.loginError = error});
  }

  closeModal() {
    this.dialogRef.close(this.user);
  }

  private initForm() {
    this.signInForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signIn() {
    const loginData: IUserLoginCredentials = {...this.signInForm.value } 
    
    this.store.dispatch(new Login(loginData));

    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      this.isLoggedIn = !!user.accessToken;
      this.user = {
        ...user,
        isLoggedIn: this.isLoggedIn,
      };

      if (this.isLoggedIn) {
        this.closeModal();
        this.authService.saveUserToLocalStorage(this.user);
      }
    });
  }

  setBackendError() {
    if (this.loginError) {
      this.store.dispatch(new EraseLoginError());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
