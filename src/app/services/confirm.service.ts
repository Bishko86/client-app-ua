import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { ConfirmComponent } from '../common/components/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private readonly isAllowed: Subject<boolean> = new Subject();

  constructor(private readonly dialog: MatDialog) {}

  public confirm(message: string): Observable<boolean> {
    this.dialog
      .open(ConfirmComponent, {
        data: message,
        width: 'auto',
        height: '180px',
      })
      .afterClosed()
      .subscribe((confirm: boolean) => {
        if (confirm) {
          this.isAllowed.next(true);
        } else {
          this.isAllowed.next(false);
        }
      });
    return this.isAllowed;
  }
}
