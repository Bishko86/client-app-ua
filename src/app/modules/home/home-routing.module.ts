import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendsComponent } from './friends/friends.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
        { path: '', redirectTo: 'profile', pathMatch: 'prefix' },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'news',
        component: NewsComponent,
      },
      {
        path: 'friends',
        component: FriendsComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
