import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment as env } from '../../environments/environment'
import { Observable } from 'rxjs';

import {Meetup} from '../models/event'
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //#region Meetups
  GetMeetup(id:number):Observable<Meetup>{
    return this.http.get<Meetup>(`${env.ApiUrl}/event/${id}`);
  }

  PostMeetup(meetup:Meetup):Observable<boolean>{
    return this.http.post<boolean>(`${env.ApiUrl}/event`,meetup);
  }

  GetMeetups():Observable<{items:Meetup[], items_total:number}>{
    return this.http.get<{items:Meetup[], items_total:number}>(`${env.ApiUrl}/@meetup-filter`);
    
  }
//#endregion
  
  

  constructor(private http: HttpClient) { }
}
