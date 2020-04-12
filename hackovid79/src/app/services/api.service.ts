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
  getMeetupImg(username:string,id:string):string{
    let url:string = `${env.ApiUrl}/users/${username}/${id}/@download/img`;
    return url
  }

  PostMeetup(meetup:Meetup):Observable<boolean>{
    let username:string = this.service.getUsernameLoggedIn();
    return this.http.post<boolean>(`${env.ApiUrl}/users/${username}`,meetup);
  }
  DeleteMeetup(id:string):Observable<boolean>{
    let username:string = this.service.getUsernameLoggedIn();
    return this.http.delete<boolean>(`${env.ApiUrl}/users/${username}/${id}`);
  }

  GetMeetups():Observable<{items:Meetup[], items_total:number, aggregations:any}>{
    return this.http.get<{items:Meetup[], items_total:number, aggregations:any}>(`${env.ApiUrl}/@meetup-filter`);
    
  }
  GetMeetupsFiltered(user:string, category:string,start_date:Date,platform:string):Observable<{items:Meetup[], items_total:number,aggregations:any}>{
    let url:string = `${env.ApiUrl}/@meetup-filter?`
    if(!this.emptyString(user)){
      url += "user="+user+"&"
    }
    if(!this.emptyString(category)){
      url += "category="+category+"&"
    }
    if(start_date != null){
      url += "start_date="+start_date.toISOString()+"&"
    }
    if(!this.emptyString(platform)){
      url += "platform="+platform+"&"
    }
    // delete last &
    url = url.substring(0, url.length - 1);
    return this.http.get<{items:Meetup[], items_total:number, aggregations:any}>(url);
    
  }

  private emptyString(value:string):boolean{
    return (!value || value == undefined || value == "" || value.length == 0);
  }
//#endregion
  
  

  constructor(private http: HttpClient, private service:AuthService) { }
}
