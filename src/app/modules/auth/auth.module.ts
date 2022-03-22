import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthModalComponent } from './components/auth-modal/auth-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShowPasswordDirective } from 'src/app/directives/show-password.directive';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/modules/auth/components/auth/auth.component';
import { ConfirmEmailComponent } from './components/confirm-email/confirm-email.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  {
    path: 'confirm/:token',
    component: ConfirmEmailComponent,
    pathMatch: 'full',
  },
];
@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
    AuthModalComponent,
    ShowPasswordDirective,
    ConfirmEmailComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  exports: [RouterModule],
  entryComponents: [AuthModalComponent],
})
export class AuthModule {}
