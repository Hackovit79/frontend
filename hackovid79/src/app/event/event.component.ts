import { Component, OnInit, Input } from '@angular/core';
import { Meetup } from '../models/event';
import { ApiService } from '../services/api.service';
import { AddMeetupComponent } from '../add-meetup/add-meetup.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  @Input() meetup: Meetup;
  @Input() role: string;
  panelOpenState = false;
  constructor(private service:ApiService, public dialog: MatDialog, private auth:AuthService) { }
  private popup: MatDialogRef<AddMeetupComponent>;

  // defaultImg:string = 'https://images.unsplash.com/photo-1496979551903-46e46589a88b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cda12b505afa1beb06e49d89014cbd65&auto=format&fit=crop&w=634&q=80'
  // backImgStyle: string = 'url('+this.defaultImg+') 20% 1% / cover no-repeat'
  
  
  backImgStyle: string;

  ngOnInit(): void {
    if(this.meetup.has_img){
      let urlImg = this.service.getMeetupImg(this.meetup.user, this.meetup.id);
      this.backImgStyle = 'url('+urlImg+') 20% 1% / cover no-repeat'
    }

  }

  deleteMeetup(){
    this.service.DeleteMeetup(this.meetup.id).subscribe((request) =>{
      debugger;
      this.auth.GoToUserEvents();
    })
  }

}
