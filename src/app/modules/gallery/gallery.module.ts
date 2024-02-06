import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowImageComponent } from './components/show-image/show-image.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: GalleryComponent}
]

@NgModule({
  declarations: [
    GalleryComponent,
    ShowImageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]

})
export class GalleryModule { }
