import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/reducers/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/effects/user.effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserService } from './services/user.service';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { PhotoService } from './services/photo.service';
import { PhotoEffects } from './modules/gallery/store/photo.effects';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AuthModule } from './modules/auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './services/auth.service';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { AuthEffects } from './modules/auth/store/auth.effects';
import { SharedModule } from './modules/shared/shared.module';
import { ConfirmComponent } from './common/components/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'people',
    loadChildren: () =>
      import('./modules/people/people.module').then((mod) => mod.PeopleModule),
  },
  { path: 'about-us', component: AboutUsComponent, pathMatch: 'full' },
  { path: 'users', component: UsersListComponent, pathMatch: 'full' },
  {
    path: 'users/:id',
    component: UserComponent,
    pathMatch: 'full',
    data: {
      foo: 123,
      bar: 456,
      baz: 789,
    },
  },
  {
    path: 'photo',
    loadChildren: () =>
      import('./modules/gallery/gallery.module').then(
        (mod) => mod.GalleryModule
      ),
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    UserComponent,
    AboutUsComponent,
    HeaderComponent,
    ConfirmComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    AuthModule, //TODO import with lazy loading
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot([PhotoEffects, UserEffects, AuthEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    BrowserAnimationsModule,
    SharedModule,
    MatButtonModule
  ],
  providers: [
    UserService,
    PhotoService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
