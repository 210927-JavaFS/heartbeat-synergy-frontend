import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { PotentialMatchComponent } from './potential-match/potential-match.component';
import { FriendsPageComponent } from './friends-page/friends-page.component';
import { JunkBranchComponent } from './junk-branch/junk-branch.component';



@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RegistrationComponent,
    PotentialMatchComponent,
    FriendsPageComponent,
    JunkBranchComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
