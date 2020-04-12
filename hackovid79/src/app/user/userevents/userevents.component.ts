import { Component, OnInit } from '@angular/core';
import { Meetup } from '../../models/event';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMeetupComponent } from 'src/app/add-meetup/add-meetup.component';

@Component({
  selector: 'app-userevents',
  templateUrl: './userevents.component.html',
  styleUrls: ['./userevents.component.scss']
})
export class UsereventsComponent implements OnInit {

  constructor(private service:ApiService,public dialog: MatDialog) { }
  private popup: MatDialogRef<AddMeetupComponent>;


  Meetups: Meetup[];

  ngOnInit(): void {
    this.GetAllMeetups();
  }

  addMeetup(){
    const newMeetup:Meetup = new Meetup();
    this.popup = this.dialog.open(AddMeetupComponent,{data:newMeetup});
    this.popup.afterClosed().subscribe((newMeetup) => {console.log(newMeetup)});
  }

  GetAllMeetups(){
    this.service.GetMeetups().subscribe( (requestedMeetups) => {
      console.log("Meetups: "+ requestedMeetups.items_total);
      if(requestedMeetups.items.length> 0){
          this.Meetups = requestedMeetups.items;
      }
    } )
  }


}
