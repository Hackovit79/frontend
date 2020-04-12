import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from '../models/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() meetup: Meetup;
  panelOpenState = false;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.meetup)
  }

}
