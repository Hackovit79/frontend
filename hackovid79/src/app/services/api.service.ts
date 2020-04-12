import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment as env } from '../../environments/environment'
import { Observable } from 'rxjs';

import {Meetup} from '../models/event'
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //#region Meetups
  GetMeetup(id:number):Observable<Meetup>{
    return this.http.get<Meetup>(`${env.ApiUrl}/event/${id}`);
  }

  PostMeetup(meetup:Meetup):Observable<boolean>{
    let username:string = this.service.getUsernameLoggedIn();
    return this.http.post<boolean>(`${env.ApiUrl}/users/${username}`,meetup);
  }

  GetMeetups():Observable<{items:Meetup[], items_total:number}>{
    return this.http.get<{items:Meetup[], items_total:number}>(`${env.ApiUrl}/@meetup-filter`);
    
  }
//#endregion
  
  

  constructor(private http: HttpClient, private service:AuthService) { }
}
