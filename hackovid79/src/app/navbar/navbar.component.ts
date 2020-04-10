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

  ngOnInit(): void {
  }

  goHome(){
    this.router.navigate(['home']);
  }

  goUser(){
    this.service.GoToUserInfo()
  }



}
