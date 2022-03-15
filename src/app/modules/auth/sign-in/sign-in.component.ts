import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  passError: { message: string } | null = null;
  emailError: { message: string } | null = null;
  user = {
    username: '',
    isLoggedIn: false,
  };
  private destroy$ = new Subject<boolean>();
  constructor(
    private dialogRef: MatDialogRef<AuthModalComponent>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  closeModal() {
    this.dialogRef.close(this.user);
  }

  private initForm() {
    this.signInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signIn() {
    const { email, password } = this.signInForm.value;
    console.log(email, password);
    this.authService
      .login(email, password)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.authService.saveUserToLocalStorage(data);
          this.user.username = data.username;
          this.user.isLoggedIn = true;
          this.closeModal();
        },
        (err) => {
          console.log(err);
          this.passError = err.error;
        }
      );
  }

  setBackendError() {
    this.passError = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
