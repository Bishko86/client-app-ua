import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectRoute } from 'src/app/store/selectors/router.selectors';
import { IAppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css'],
})
export class SidebarItemComponent implements OnInit, OnDestroy {
  @Input() sidebarItem: string;

  highlight = false;
  destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<IAppState>
  ) {}
 
  currentRoute$ = this._store.pipe(select(selectRoute));

  ngOnInit(): void {
    this.currentRoute$.pipe(takeUntil(this.destroy$)).subscribe((route) => {
      this.highlight = route === this.sidebarItem.toLowerCase();
    });
  }

  onClick(event: MouseEvent) {
    const url = (event.target as HTMLElement).innerText.toLowerCase();
    this.router.navigate([url], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
