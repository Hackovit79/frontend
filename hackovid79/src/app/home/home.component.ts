import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service'
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
  Categories:any[] = [];

  //filters
  user:string="";
  inici:Date = null;
  categoria:string;
  platform:string;

  Meetups: Meetup[];

  ngOnInit(): void {
    this.GetAllMeetups();

  }
  
  GetAllMeetups(){
    this.service.GetMeetups().subscribe( (requestedMeetups) => {
      //console.log("Meetups: "+ requestedMeetups.items_total);
      // get categories
      for(let i=0; i < requestedMeetups.aggregations.categories.buckets.length; i++){
        let c = {key:requestedMeetups.aggregations.categories.buckets[i].key, count: requestedMeetups.aggregations.categories.buckets[i].doc_count }
        this.Categories.push(c);
      }
      this.Meetups = requestedMeetups.items;
      this.evaluateLiveMeetups();
      
    } )
  }
  GetFilteredMeetups(){
    this.service.GetMeetupsFiltered(this.user,this.categoria,this.inici,this.platform).subscribe( (requestedMeetups) => {
      //console.log("Meetups: "+ requestedMeetups.items_total);
      this.Meetups = requestedMeetups.items;
      this.evaluateLiveMeetups();
      
    } )
  }

  evaluateLiveMeetups(){
    for(let meetup of this.Meetups){
      let meetupStart = new Date(meetup.start)
      let meetupEnd = new Date(meetup.end)
      let actualTime = new Date()
      // if(meetup.links) {
      // for(let link of meetup.links){
      //   console.log(link.platform)
      // }}
      if ((meetupStart.getTime() < actualTime.getTime()) && (actualTime.getTime() < meetupEnd.getTime())){
        meetup.isLive = true
      } else {
        meetup.isLive = false
      }
    }
  }
}
