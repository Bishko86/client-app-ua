import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPasswordDirective } from 'src/app/directives/show-password.directive';



@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthModalComponent,
    ShowPasswordDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AuthModalComponent,
  ]
})
export class AuthModule { }
