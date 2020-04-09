import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment as env } from '../environments/environment'
import { Observable } from 'rxjs';

import {Meetup} from './models/event'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  GetMeetup(id:number):Observable<Meetup>{
    return this.http.get<Meetup>(`${env.ApiUrl}/event/${id}`);
  }

  PostMeetup(meetup:Meetup):Observable<boolean>{
    return this.http.post<boolean>(`${env.ApiUrl}/event`,meetup);
  }


  
  constructor(private http: HttpClient) { }
}
