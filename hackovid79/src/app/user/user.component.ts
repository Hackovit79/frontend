import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private router:Router, private service:AuthService) { }
  // variables
  TabSelected:number;

  ngOnInit(): void {
    let url = this.router.url.toLowerCase().split("/");
    if (url[url.length-2] == "events"){
      this.TabSelected= 1;
    } else{
      this.TabSelected = 0;
    }
  }

  ngOnChanges(){
    
  }
navigate(index:number){
    console.log(index)
  this.TabSelected = index;
  if(index == 0) {this.GoInfo();}
  if(index == 1) {this.GoEvents();}
}

  GoInfo(){
    this.service.GoToUserInfo();
  }
  GoEvents(){
    this.service.GoToUserEvents();
  }
}
