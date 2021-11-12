
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './user-home-page/user-home-page.component';
import { RegistrationComponent} from './registration/registration.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';
import { MatchPageComponent } from './match-page/match-page.component';

const routes: Routes = [
  {path: '', component:LoginPageComponent, pathMatch: 'full'},

  {path: 'home-page', component: HomePageComponent, pathMatch: 'full'},

  {path: 'registration', component: RegistrationComponent, pathMatch: 'full'},
  {path: 'edit-profile-page', component: EditProfilePageComponent, pathMatch: 'full'},

  {path: 'match-page', component: MatchPageComponent, pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
 
export class AppRoutingModule {
 
}

export const routingComponents = [HomePageComponent, LoginPageComponent, EditProfilePageComponent, RegistrationComponent, MatchPageComponent]

