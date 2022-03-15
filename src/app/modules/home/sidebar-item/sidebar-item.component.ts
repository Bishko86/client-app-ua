import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { selectRoute } from 'src/app/store/selectors/router.selectors';
import { IAppState } from 'src/app/store/states/app.state';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css'],
})
export class SidebarItemComponent implements OnInit {
  @Input() sidebarItem: string;

  highlight = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _store: Store<IAppState>
  ) {}

  currentRoute$ = this._store.pipe(select(selectRoute));

  ngOnInit(): void {
    this.currentRoute$.subscribe((route) => {
      this.highlight = route === this.sidebarItem.toLowerCase();
    });
  }

  onClick(event: MouseEvent) {
    const url = (event.target as HTMLElement).innerText.toLowerCase();
    console.log(url);

    this.router.navigate([url], { relativeTo: this.route });
  }
}
