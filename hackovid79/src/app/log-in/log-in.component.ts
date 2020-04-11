import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  username: string = "";
  password: string = "";
  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.service.logout();
  }

  authUser(){
    this.service.login(this.username,this.password).then((resp) => {
      if(resp){
        this.service.GoToUserInfo();
      } else{
        alert('Ususari o contrasenya incorrecte')
      }
    });
  }

}
