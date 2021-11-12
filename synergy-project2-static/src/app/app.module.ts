import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';


import { GenresComponent } from './genres/genres.component';

import { JunkBranchComponent } from './junk-branch/junk-branch.component';
import { EditProfilePageComponent } from './edit-profile-page/edit-profile-page.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,



    GenresComponent,



    

    JunkBranchComponent,
    EditProfilePageComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
