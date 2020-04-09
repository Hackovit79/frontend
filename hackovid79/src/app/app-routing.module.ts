import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'user/:name', component: UserComponent },
  {path: 'login', component: LogInComponent },
  {path: 'register', component: RegisterComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
