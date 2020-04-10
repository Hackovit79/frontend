import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';

import {AuthGuardService as guard} from './services/auth-guard.service'

const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {
      path: 'user/:name', 
    component: UserComponent,
    canActivate: [guard], 
  },
  {path: 'login', component: LogInComponent },
  {path: 'register', component: RegisterComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  { path: '**',
    redirectTo: '/home',
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
