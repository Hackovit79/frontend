import { Component, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Meetup } from '../../models/event';
import { ApiService } from '../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddMeetupComponent } from 'src/app/add-meetup/add-meetup.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userevents',
  templateUrl: './userevents.component.html',
  styleUrls: ['./userevents.component.scss']
})
export class UsereventsComponent implements OnInit {

  constructor(private service:ApiService,public dialog: MatDialog, private auth:AuthService, private router:Router) { }
  private popup: MatDialogRef<AddMeetupComponent>;


  Meetups: Meetup[];

  ngOnInit(): void {
    this.GetAllMeetups();
    // // force reload
    // this.router.routeReuseStrategy.shouldReuseRoute = function() {return true;}
  }

  addMeetup(){
    const newMeetup:Meetup = new Meetup();
    this.popup = this.dialog.open(AddMeetupComponent,{data:newMeetup});
    this.popup.afterClosed().subscribe((saved:boolean) => {
      if(saved){
        this.GetAllMeetups();
      }
    });
  }

  GetAllMeetups(){
    this.service.GetMeetupsFiltered(this.auth.getUsernameLoggedIn(), null,null,null).subscribe( (requestedMeetups) => {
      console.log("Meetups: "+ requestedMeetups.items_total);
      if(requestedMeetups.items.length> 0){
          this.Meetups = requestedMeetups.items;
      }
    } )
  }


}
