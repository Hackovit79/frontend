import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from '../models/event';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() meetup: Meetup;
  panelOpenState = false;
  constructor(private service:ApiService) { }

  // defaultImg:string = 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80'
  // backImgStyle: string = 'url('+this.defaultImg+') 20% 1% / cover no-repeat'
  
  
  backImgStyle: string;

  ngOnInit(): void {
    if(this.meetup.img != null){
      let urlImg = this.service.getMeetupImg(this.meetup.user, this.meetup.id);
      this.backImgStyle = 'url('+urlImg+') 20% 1% / cover no-repeat'
    }

  }

}
