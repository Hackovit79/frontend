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

  GoToUserInfo(){
    if (this.loggedIn()){
      let username = localStorage.getItem('current_user')
      this.router.navigate(['user/'+username]);
    } else{
      this.router.navigate(['login']);
    }
  }

   login(username:string, password:string):Promise<boolean>{
     return new Promise((reslove) => {
      this.http.post<{token:  string,text:string}>(`${env.ApiUrl}/@login`, {username, password}).
      subscribe(
            (res:{token:  string}) =>{
              localStorage.setItem('access_token', res.token);
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
    localStorage.removeItem('current_user');
  }

  GetUserInfo():Observable<User>{
    let username = this.getUsernameLoggedIn();
    return this.http.get<User>(`${env.ApiUrl}/users/${username}`);
  }

  UpdateUserPic(pic:File){
    let username = this.getUsernameLoggedIn();
    return this.http.patch(`${env.ApiUrl}/users/${username}/@upload/avatar`,pic);
  }
  UrlUserPic(filename:string):string{
    let username = this.getUsernameLoggedIn();
    return `${env.ApiUrl}/users/${username}/@download/avatar/${filename}`
  }
  UpdateUser(user:any){
    let username = this.getUsernameLoggedIn();
    return this.http.patch(`${env.ApiUrl}/users/${username}`,user);
  }

  getUsernameLoggedIn():string{
    return localStorage.getItem('current_user')
  }

  public loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }
  public verifyUserAccess(username:string): boolean{
    let localUsername = localStorage.getItem('current_user')
    return username ==  localUsername;
  }
   

}
