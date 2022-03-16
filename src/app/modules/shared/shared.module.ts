import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/common/components/loader/loader.component';
import { ScrollLoadDataDirective } from 'src/app/directives/scroll-load-data.directive';



@NgModule({
  declarations: [
    LoaderComponent,
    ScrollLoadDataDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    LoaderComponent,
    ScrollLoadDataDirective
  ]
})
export class SharedModule { }
