import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IAuthError } from 'src/app/classes/auth.interface';
import {
  EraseRegistrateError,
  Registration,
} from 'src/app/store/actions/auth.actions';
import {
  selectRegistrateError,
  selectRegistrateResult,
} from 'src/app/store/selectors/auth.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  emailError: IAuthError | null;
  passError: IAuthError | null;
  destroy$ = new Subject<boolean>();
  registrateResult$ = this.store.pipe(select(selectRegistrateResult));
  passError$ = this.store.pipe(select(selectRegistrateError));

  constructor(
    private dialogRef: MatDialogRef<AuthModalComponent>,
    private snackBar: MatSnackBar,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.passError$.pipe(takeUntil(this.destroy$)).subscribe((error) => {
      this.emailError = error;
    });
  }

  closeModal() {
    this.dialogRef.close();
  }

  private initForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    });
  }

  openSnackBar(text: string, action: string) {
    this.snackBar.open(text, action, {
      duration: 2000,
      verticalPosition: 'top',
      panelClass: ['color-snackbar'],
    });
  }

  signUp() {
    const { email, password, confirmPassword } = this.signUpForm.value;
    if (password === confirmPassword) {
      this.store.dispatch(new Registration(email, password));
      this.registrateResult$
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          if (result.registrateIsSuccess) {
            this.closeModal();
            this.openSnackBar(result.message, 'Sign up');
          }
        });
    }
  }

  setPassBackendError() {
    if (this.passError) {
      this.passError = null;
    }
  }

  setEmailBackendError() {
    if (this.emailError) {
      this.store.dispatch(new EraseRegistrateError());
    }
  }
}
