import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Meetup, link } from '../models/event';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-meetup',
  templateUrl: './add-meetup.component.html',
  styleUrls: ['./add-meetup.component.scss'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'es-CAT'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})

export class AddMeetupComponent implements OnInit {

  
  
  constructor(private dialogRef:MatDialogRef<AddMeetupComponent>, @Inject(MAT_DIALOG_DATA) public data:Meetup, private service:ApiService) { }
    
  ngOnInit(): void {
  }

  // variables
  newUrl:string;
  errorLink:string= "invalid url";
  categories:string[] = ["MÚSICA", "EXERCICI","EDUCACIÓ","ALIMENTACIÓ","CULTURA","JOCS","ALTRES"]
  newCategorie:string;
  newSubcategorie:string;

  createMeetup(){

    this.service.PostMeetup(this.data).subscribe();
    this.dialogRef.close();  
  }

  //manage Categories
  addCategorie(){
    if (this.newCategorie != ""){
      this.data.categories.push(this.newCategorie);
      this.newCategorie = "";
    }
  }
  deleteCategorie(c){
    let index = this.data.categories.indexOf(c);
    this.data.categories.splice(index,1);
  }
  addSubcategorie(){
    if (this.newSubcategorie != ""){
      this.data.subcategories.push(this.newSubcategorie);
      this.newSubcategorie = "";
    }
  }
  deleteSubcategorie(c){
    let index = this.data.categories.indexOf(c);
    this.data.subcategories.splice(index,1);
  }

  // manage links
  addLink(){
    let platform = this.getPlatform(this.newUrl);
    if (platform != "error"){
      let newLink: link = new link();
      newLink.platform = platform;
      newLink.url = this.newUrl;
      this.data.links.push(newLink)
      this.newUrl = "";
    }
  }
  deleteLink(link){
    let index = this.data.links.indexOf(link);
    this.data.links.splice(index,1);
  }

  getPlatform(url:string){
    let urlLower = url.toLowerCase();
    if (urlLower.includes('youtube') || urlLower.includes('youtu.be') ){
      return "youtube";
    } else if ( urlLower.includes('instagram') ){
      return "instagram";
    } else{
      return "error"
    }
  }


  // manage img
  @ViewChild('fileInput')
  fileInput;
  file: File | null = null;

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    this.file = files[0];
  }
  }
