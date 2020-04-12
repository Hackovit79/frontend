import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment as env } from './../../environments/environment'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log("HTTP request intercepted");
        const idToken = localStorage.getItem('access_token');
        if (idToken){
          const tokenReq = req.clone({
            headers : req.headers.set("Authorization", "Bearer "+idToken)
          })
          return next.handle(tokenReq)
        } else{
          return next.handle(req);
        }
    }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // navigation

  GoToUserInfo(){
    if (this.loggedIn()){
      let username = localStorage.getItem('current_user')
      this.router.navigate(['user/'+username]);
    } else{
      this.router.navigate(['login']);
    }
  }
  GoToUserEvents(){
    if (this.loggedIn()){
      let username = localStorage.getItem('current_user')
      this.router.navigate(['user/events/'+username+'']);
    } else{
      this.router.navigate(['login']);
    }
  }

  // sesion managers methods

   login(username:string, password:string):Promise<boolean>{
     return new Promise((reslove) => {
      this.http.post<{token:  string,text:string, exp:number}>(`${env.ApiUrl}/@login`, {username, password}).
      subscribe(
            (res:{token:  string, exp:number}) =>{
              localStorage.setItem('access_token', res.token);
              let expDate = new Date()
              expDate.setSeconds(expDate.getSeconds() + res.exp);
              localStorage.setItem('access_token_exp', expDate.toString());
              localStorage.setItem('current_user', username);
              reslove(true);
            },
            (error:{text:string}) =>{
              reslove(false);
            }
        )
     })

  }
  register(user:User):Observable<User>{
      return this.http.post<User>(`${env.ApiUrl}/@register`, user)
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token_exp');
    localStorage.removeItem('current_user');
  }

  // get current user info
  GetUserInfo():Observable<User>{
    let username = this.getUsernameLoggedIn();
    return this.http.get<User>(`${env.ApiUrl}/users/${username}`);
  }

  UpdateUserPic(pic:File){
    let username = this.getUsernameLoggedIn();
    return this.http.patch(`${env.ApiUrl}/users/${username}/@upload/avatar`,pic);
  }
  UrlUserPic():string{
    let username = this.getUsernameLoggedIn();
    return `${env.ApiUrl}/users/${username}/@download/avatar`
  }
  UpdateUser(user:any){
    let username = this.getUsernameLoggedIn();
    return this.http.patch(`${env.ApiUrl}/users/${username}`,user);
  }

  getUsernameLoggedIn():string{
    return localStorage.getItem('current_user')
  }

  // verify access
  public loggedIn(): boolean{
    let token = localStorage.getItem('access_token');
    let tokenExp = localStorage.getItem('access_token_exp');
    if (tokenExp != null){
      let expiration = new Date(tokenExp);
      let now = new Date();
      if (now < expiration){
        return token != null;
      }
    }
    return  false;
  }
  public verifyUserAccess(username:string): boolean{
    let localUsername = localStorage.getItem('current_user')
    return username ==  localUsername;
  }
   

}
