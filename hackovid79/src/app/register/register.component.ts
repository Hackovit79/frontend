import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../models/user';
import {AuthService} from '../services/auth.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user:User = new User;

    
  constructor(private service:AuthService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.service.register(this.user).subscribe(
      (requestedUser) =>{
        if (requestedUser){
          alert("Usuari registrat correctament")
        }
      },
      (error:{text:string}) =>{
        alert("Ususari invalid")

      })
  }

  // @ViewChild('fileInput')
  // fileInput;
  // file: File | null = null;

  // onClickFileInputButton(): void {
  //   this.fileInput.nativeElement.click();
  // }

  // onChangeFileInput(): void {
  //   const files: { [key: string]: File } = this.fileInput.nativeElement.files;
  //   this.file = files[0];
  // }
  }
