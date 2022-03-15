import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { AuthModalComponent } from '../auth-modal/auth-modal.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../sign-in/sign-in.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  emailError: any;
  passError: { message: string } | null = null;
  destroy$ = new Subject<boolean>();

  constructor(
    private dialogRef: MatDialogRef<AuthModalComponent>,
    private authServise: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
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

  signUn() {
    const { email, password, confirmPassword } = this.signUpForm.value;
    console.log(email, password, confirmPassword);
    if (password === confirmPassword) {
      this.authServise
        .registration(email, password)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            console.log(data);
            this.closeModal();
            this.openSnackBar(data.message, 'Sign up');
          },
          (err) => {
            console.log(err);
            this.emailError = err.error;
          }
        );
    } else {
      this.passError = {
        message: 'Confirm your password',
      };
    }
  }

  setPassBackendError() {
    if (this.passError) {
      this.passError = null;
    }
  }

  setEmailBackendError() {
    if (this.emailError) {
      this.emailError = null;
    }
  }
}
