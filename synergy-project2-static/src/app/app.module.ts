import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { JunkBranchComponent } from './junk-branch/junk-branch.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    RegistrationComponent,
    JunkBranchComponent,
    EditProfilePageComponent
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
