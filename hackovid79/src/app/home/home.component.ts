import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import { Meetup } from '../models/event';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private service:ApiService) { }

  //Properties
  GlobalMeetup:Meetup;

  Meetups: Meetup[];

  ngOnInit(): void {
    this.GetAllMeetups();

  }



  GetMeetup(id:number){
    this.service.GetMeetup(id).subscribe( (requestedMeetup) => {
            if(requestedMeetup != null){
      }
    } )
  }
  GetAllMeetups(){
    this.GetMeetup(1);
    this.GetMeetup(2);
    this.GetMeetup(3);
  }
}
