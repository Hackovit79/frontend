import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-meetup',
  templateUrl: './add-meetup.component.html',
  styleUrls: ['./add-meetup.component.scss']
})
export class AddMeetupComponent implements OnInit {
  title: string = "";
  datetime;
  link: string = "";
  description: string = "";
  platform: string = "";
  category: string = "";
  subcategory: string = "";
  
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
    console.log(this.datetime)
  }
  }
