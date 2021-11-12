import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {

  public user:User = new User(0, '','','','','','','','',[],[], '', '', null);
  public age:string = '';
  public firstName:string='';
  public id:string = '';
  public profileDescription='';
  public lastName:string= '';
  public interest:string= '';
  public identify:string='';
  public selectedFile:File|null = null;
  public retrievedImage:any;

  constructor(private accountService: AccountService, private transferService:TransferService, private router:Router) 
  { 
    transferService.userChange.subscribe(value => 
      {
      //Values
      this.user = value, this.firstName=this.user.firstName, this.id=this.transferService.id; console.log(this.id); this.profileDescription = 
      this.user.profileDescription, this.age=this.user.age,
        this.identify=this.user.userType, this.lastName=this.user.lastName, this.interest=this.user.filterType;
      }
    );
    transferService.imageChange.subscribe((value)=>{ 
      if(this.user?.images?.length != undefined && this.user?.images.length > 0)
        this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
    });
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['']);
  }

  goHome()
  {
    this.router.navigate(['home-page']);  
  }

  goEdit()
  {
    this.router.navigate(['edit-profile-page']);
  }

  onFileChange(event:any)
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.transferService.uploadUserImage(this.selectedFile);
  }

}
