import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { ProfileComponent } from './profile/profile.component';
import { NewsComponent } from './news/news.component';
import { FriendsComponent } from './friends/friends.component';
import { SettingsComponent } from './settings/settings.component';
import { HomeRoutingModule } from './home-routing.module';
import { AvatarComponent } from 'src/app/common/components/avatar/avatar.component';
import { ShowInfoDirective } from 'src/app/directives/show-info.directive';


@NgModule({
  declarations: [
    HomeComponent,
    SidebarItemComponent,
    ProfileComponent,
    NewsComponent,
    FriendsComponent,
    SettingsComponent,
    AvatarComponent,
    ShowInfoDirective,
  ],
  imports: [CommonModule, HomeRoutingModule]
})
export class HomeModule {}
