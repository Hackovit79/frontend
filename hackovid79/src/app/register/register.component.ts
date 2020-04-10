import { Component, OnInit, ViewChild } from '@angular/core';

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

  @ViewChild('fileInput')
  fileInput;
  file: File | null = null;

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
    console.log(this.file)
  }
  }
