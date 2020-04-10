import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  username: string = "";
  password: string = "";
  email: string = "";
  description: string = "";
  image: string = "";
  constructor() { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.description)
  }
}
