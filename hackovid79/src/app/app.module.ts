import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {AuthInterceptor} from './services/auth.service'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddMeetupComponent } from './add-meetup/add-meetup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatFormFieldModule} from '@angular/material/form-field'; 
import { MomentDateModule } from '@angular/material-moment-adapter';
import {MatInputModule} from '@angular/material/input'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatBadgeModule} from '@angular/material/badge'; 

import { UserinfoComponent } from './user/userinfo/userinfo.component';
import { UsereventsComponent } from './user/userevents/userevents.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    RegisterComponent,
    UserComponent,
    EventComponent,
    NavbarComponent,
    AddMeetupComponent,
    UserinfoComponent,
    UsereventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatExpansionModule,
    MatDatepickerModule,
    MomentDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatDialogModule,
    MatBadgeModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
