import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IAuthDialogData } from 'src/app/common/interfaces/auth.interface';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
})
export class AuthModalComponent implements OnInit {
  authPage: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IAuthDialogData,
    public dialogRef: MatDialogRef<AuthModalComponent>
  ) {}

  ngOnInit(): void {
    this.authPage = this.data.page;
  }
}
