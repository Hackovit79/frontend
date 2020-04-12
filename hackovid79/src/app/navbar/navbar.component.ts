import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router, public service:AuthService,) { }

  //varaibles 
  username:string
  userpic:string

  ngOnInit(): void {
    this.service.GetUserInfo().subscribe((user) =>{
      if (user != null){
        this.username = user.username
        if (user.avatar != null){
          this.userpic = this.service.UrlUserPic();
        } else{
        this.userpic = "assets/user.jpg"
        }
      } else{
        this.userpic = "assets/user.jpg"
      }

    })
  }

  goHome(){
    this.router.navigate(['home']);
  }

  goUser(){
    this.service.GoToUserInfo()
  }



}
