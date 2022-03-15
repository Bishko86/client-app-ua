import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IPhoto } from 'src/app/classes/photo.inteface';
import {
  GetPhotos,
  GetPhotosNextPage,
} from 'src/app/store/actions/photo.actions';
import {
  selectPhotoIsFetching,
  selectPhotoList,
  selectPhotoListPage,
} from 'src/app/store/selectors/photo.selector';
import { IAppState } from 'src/app/store/states/app.state';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css'],
})
export class GalleryComponent implements OnInit, OnDestroy {
  images: IPhoto[];
  showImgModal = false;
  isFetching = false;
  url = '';
  showUpBtn = false;

  constructor(private _store: Store<IAppState>) {}

  destroy$ = new Subject();
  photos$ = this._store.pipe(select(selectPhotoList));
  page$ = this._store.pipe(select(selectPhotoListPage));
  loading$ = this._store.pipe(select(selectPhotoIsFetching));

  ngOnInit(): void {
    this._store.dispatch(new GetPhotos());
    this.loading$
      .pipe(takeUntil(this.destroy$))
      .subscribe((fetch) => (this.isFetching = fetch));
  }

  getPage(): number {
    let page = 0;
    this.page$.pipe(take(1)).subscribe((value: number) => (page = value));
    return page;
  }

  downloadPhoto() {
   
    if (!this.isFetching) {
      this.showUpBtn = true
      this._store.dispatch(new GetPhotosNextPage(this.getPage() + 1));
      this._store.dispatch(new GetPhotos());
    }
  }

  showPhoto(event: any) {
    this.showImgModal = true;
    this.url = event.url;
    document.body.style.overflow = 'hidden';
  }

  onCloseModal() {
    this.showImgModal = false;
    this.url = '';
    document.body.style.overflow = 'auto';
  }

  onScrollData(event: boolean) {
    
    this.downloadPhoto();
  }

  onScrollTop() {
    this.showUpBtn = false;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
