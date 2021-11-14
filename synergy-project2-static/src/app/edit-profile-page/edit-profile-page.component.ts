import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  public id:string|null = '';
  public profileDescription='';
  public lastName:string= '';
  public interest:string= '';
  public identify:string='';
  public selectedFile:File|null = null;
  public retrievedImage:any;
  public form:FormGroup;

  public username:string = '';
  public password:string = '';
  public anthem:string = '';
  public artistName:string = '';
  public artistId:string ='';
  public artistImage:string = ''
  public favoriteGenre:string = '';
  public gender:string = '';
  public preference:string = '';
  public token:any = '';
  public anthemUrl:string = '';
  public genres:any=[];
  genreList: any=[];

  constructor(private accountService: AccountService, private router:Router, private formBuilder:FormBuilder) 
  { 
    
    this.id = sessionStorage.getItem('currentUser');
    if(this.id != null)
    {
      let numID:number = parseInt(this.id);
      accountService.getUser(numID).subscribe(value =>
      {
        this.user = value; this.anthem = this.user.anthem; this.artistName = this.user.topArtists[0].artistName;
        this.user.userId = numID; this.firstName=this.user.firstName; this.profileDescription = this.user.profileDescription; 
        this.age=this.user.age; this.lastName=this.user.lastName; this.interest=this.user.filterType;
        this.gender = this.user.userType; this.preference = this.user.filterType;
        accountService.getUserImages(numID).subscribe(value=>
        {
          this.user.images = value;
          if(this.user?.images?.length != undefined && this.user?.images.length > 0)
            this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
        });
        this.token = sessionStorage.getItem('token');
        if(this.token != null && this.anthem != "")
        {
          this.accountService.getSongServ(this.token, this.anthem).subscribe(
            (data: Object) => 
            {
              let innerData = Object.values(data);
              let songName = innerData[11]; 
              this.anthem = songName;
            });
        }
      });
    }
    this.form = this.formBuilder.group({
      genre: this.formBuilder.array([],[Validators.required])});
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
    if(this.id != null)
    {
      let numId:number = parseInt(this.id);
      this.accountService.uploadUserImage(this.selectedFile, numId)?.subscribe(value=>{
        this.accountService.getUserImages(numId).subscribe(value=>
          {
            this.user.images = value;
            if(this.user?.images?.length != undefined && this.user?.images.length > 0)
              this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
        });
      });    
    }
  }

  onCheckboxChange(e: any) {
    const genre: FormArray = this.form.get('genre') as FormArray;
      if (e.target.checked) {
        genre.push(new FormControl(e.target.value));
      } else {
         const index = genre.controls.findIndex(x => x.value === e.target.value);
         genre.removeAt(index);
      }  
  }

  submit(){

    console.log(this.form.value);
  }

  confirmEdit()
  {
    this.token=sessionStorage.getItem("token");
    console.log("is token here: " + this.token);
    if(this.token != "" && this.anthem != "")
    {
      this.accountService.searchSongServ(this.token, this.anthem, '').subscribe(
        (data: Object) => {
          let innerData: any[] = Object.values(data);
          let innerInfo: any[] = Object.values(innerData[0]);
          let innerSongs: any[] = Object.values(innerInfo[1]);
          let innerSongsInfo: any[] = Object.values(innerSongs[0]);
          let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
          let finalUrl = innerSongsInfoUrl[0];
          this.anthem = finalUrl.substring(31, finalUrl.length);
          this.accountService.createUserServ(this.user.userId.toString(), this.user.username, this.user.password, this.firstName, 
          this.lastName, this.age, this.profileDescription, this.anthem, this.preference, this.gender).subscribe(()=>{
        });
      });
    }
    else{
      this.accountService.createUserServ(this.user.userId.toString(), this.user.username, this.user.password, this.firstName, 
        this.lastName, this.age, this.profileDescription, this.anthem, this.preference, this.gender);
    }
    if(this.artistName != "")
    {
      this.accountService.searchArtistServ(this.token, this.artistName).subscribe(
        (data: Object) => 
        {
            console.log(data);
            let innerArtistSearch:any[] = Object.values(data);
            let innerArtistSearchInfo:any[] = Object.values(innerArtistSearch[0]);
            let innerArtistSearchDetails:any[] = Object.values(innerArtistSearchInfo[1]);
            let innerArtistSearchArray:any[] = Object.values(innerArtistSearchDetails[0]);
            let innerArtistId = innerArtistSearchArray[4];
            let innerArtistName = innerArtistSearchArray[6];
            let innerArtistImageDetails:any[]=Object.values(innerArtistSearchArray[5]);
            let innerArtistImageArray:any[]=Object.values(innerArtistImageDetails[0]);
            let innerArtistImage = innerArtistImageArray[1];
            this.accountService.createUserTopArtistServ(this.user.userId.toString(), innerArtistId,innerArtistName,innerArtistImage).subscribe(()=>{this.router.navigate(['home-page']);});
        });
    }
    else
      this.router.navigate(['home-page']);
  }
}
