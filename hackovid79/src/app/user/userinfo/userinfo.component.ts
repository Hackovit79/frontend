import { Component, OnInit, ViewChild } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent implements OnInit {

  constructor(private service:AuthService, private router:Router) { }

  // variables
  user:User 
  userPicPath:string = null;
  
  editionMode:boolean = false;
  editedUser:User;

  ngOnInit(): void {
    this.GetUserInfo();
  }


  @ViewChild('updatedPic') updatedPicInput;
  updatedPic: File | null = null;

  onClickFileInputButton(): void {
    this.updatedPicInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.updatedPicInput.nativeElement.files;
    this.updatedPic = files[0];
    this.service.UpdateUserPic(this.updatedPic).subscribe((response) =>{
      this.GetUserInfo();
    });
  }

  logout(){
    this.service.logout();
    this.router.navigate(['home'])
  }

  editInfo(){
    this.editionMode = true;
    this.editedUser = JSON.parse(JSON.stringify(this.user));
  }
  cancelEdition(){
    this.editionMode = false;

  }

  saveChanges(){
    this.service.UpdateUser({
        description:this.editedUser.description,
        email:this.editedUser.email,
        password:this.editedUser.password,
      }).subscribe((response) =>{
      this.cancelEdition();
      this.GetUserInfo();
    })
  }


  private GetUserInfo(){
    this.service.GetUserInfo().subscribe((info) => {
      if (info != null){
        this.user = info;
        if(info.avatar != null){
          this.userPicPath = this.service.UrlUserPic()
        } else{
          this.userPicPath = "assets/user.jpg"
        }
      }
    })
  }

}
