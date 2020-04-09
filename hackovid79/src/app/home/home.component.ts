import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service'
import { Meetup } from '../models/event';

import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-CAT'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
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
    // this.service.GetMeetup(id).subscribe( (requestedMeetup) => {
    //         if(requestedMeetup != null){
    //   }
    // } )
  }
  GetAllMeetups(){
    this.service.GetMeetups().subscribe( (requestedMeetups) => {
      if(requestedMeetups != null){
          this.Meetups = requestedMeetups;
      }
    } )
  }
}
