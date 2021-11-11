
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { HomePageComponent } from './user-home-page/user-home-page.component';
import { PotentialMatchComponent } from './potential-match/potential-match.component';



const routes: Routes = [
  {path: '', component:LoginPageComponent, pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent, pathMatch: 'full'},
  {path: 'potential-match', component: PotentialMatchComponent, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 

export class AppRoutingModule {
 
}

export const routingComponents = [HomePageComponent, LoginPageComponent, PotentialMatchComponent]