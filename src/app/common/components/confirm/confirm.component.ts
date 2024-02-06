import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmComponent {
  constructor(
    public readonly dialog: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly title: string
  ) {}

  public confirmed(): void {
    this.dialog.close(true);
  }

  public cancelled(): void {
    this.dialog.close(false);
  }
}
