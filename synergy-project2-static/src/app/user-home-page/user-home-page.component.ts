import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Track } from '../models/track';
import { LoginPageComponent } from '../login-page/login-page.component';
import { TransferService } from '../services/transfer.service';
import { Artist } from '../models/artist';
import { ThisReceiver } from '@angular/compiler';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public token:string|null = '';
  public authToken:string = '';
  public songSearch: string = '';
  public artistSearch: string = '';
  public userSearch: string = '';
  public songResult: string = '';
  public songId: string = '';
  public albumImageUrl: string = '';
  public genres:string = '';
  public topArtists:string = '';
  public track:Track|null = null;
  public artist:Artist|null = null;
  public getArtistSearch:string = '';
  public user:User = new User(0, '','','','','','','','',[],[], '', '', null);
  public friend:User = new User(0, '','','','','','','','',[],[], '', '', null);
  public firstName:string = '';
  public profileDescription = '';
  public anthem:string = '';
  public track1:Track|null = null;
  public topUserArtists:any[] = [];
  public topUserGenres:any[] = [];
  public age:string = '';
  public username:string = '';
  public lastName:string= '';
  public interest:string= '';
  public id:string|null = '';
  constructor(private accountService: AccountService, private router:Router) 
  {
    this.id = sessionStorage.getItem('currentUser');
    if(this.id != null)
    {
      accountService.getUser(parseInt(this.id)).subscribe(value =>
        {
          this.user = value, this.firstName=this.user.firstName; console.log(this.id); this.profileDescription = 
          this.user.profileDescription, this.age=this.user.age, this.anthem=this.user.anthem, this.topUserGenres=this.generateGenres(this.user.topGenres),
            console.log(this.topUserGenres), this,this.topUserArtists=this.generateTopArtists(this.user.topArtists),
            this.username=this.user.username, this.lastName=this.user.lastName, this.interest=this.user.filterType;
            console.log(this.topUserArtists);
            console.log(this.user);
          
          this.token = sessionStorage.getItem('token');
          if(this.token != null)
          {
            this.accountService.getSongServ(this.token, this.anthem).subscribe(
              (data: Object) => {
                let innerData = Object.values(data);
                let innerArtistandAlbum: any[] = Object.values(innerData[0]);
                let innerArtistInfo: any[] = Object.values(innerArtistandAlbum[1]);
                let innerArtistDetails: any[] = Object.values(innerArtistInfo[0]);
                let artistName = innerArtistDetails[3];
                let albumName = innerArtistandAlbum[6];
                let songName = innerData[11]; 
                let innerAlbumImageInfo: any[] = Object.values(innerArtistandAlbum[5]);
                let innerAlbumImageDetails: any[] = Object.values(innerAlbumImageInfo[2]);
                let albumImageUrl = innerAlbumImageDetails[1];
                this.albumImageUrl = albumImageUrl;
                console.log(albumName,albumImageUrl);
                let track = new Track(this.songId, songName, artistName, albumName, albumImageUrl);
                this.track = track;
              }
            )
        }});
    }
  }
 
  ngOnInit(): void {

  }

  

  connectUserAccount() {
    this.accountService.getAccessToken();  
  }

  generateGenres(genres:any):any[] {
    if(genres != undefined){
    let array:any[] = [];
    for(let i=0; i<genres.length; i++){
      
      array[i]=Object.values(genres[i])[1];
    }
    return array;}
    else{ 
      let array = ["nothing here yet"];
      return array;
    }
  }

  generateTopArtists(artists:any):any[] {
    if(artists!=undefined){
    let array:any[] = [];
    for(let i=0; i<artists.length; i++){
      console.log(artists);
      array[i]=Object.values(artists[i]);
    }
    console.log(array);
    return array;
  }
    else{
      let array = ["nothing here yet"];
      return array;
    }
  }

  searchUser(){
    this.accountService.getUser(parseInt(this.userSearch)).subscribe(
    (data: Object) => {
      console.log(data);
      let userValues:any[]=Object.values(data);
          console.log(userValues);
          this.friend = new User(userValues[0], userValues[1], userValues[2], userValues[3], userValues[4], userValues[5], userValues[6],
            userValues[7], userValues[8], userValues[9], userValues[10], userValues[11], userValues[12], null);
    this.router.navigate(['home-page']);
  })}

  goHome(){
    this.router.navigate(['home-page']);  
  }

login(){
  this.router.navigate(['']);
}

goEdit()
{
  this.router.navigate(['edit-profile-page']);
}

  
getGenres()
{
  if(this.token != null)
  {
    this.accountService.getGenres(this.token).subscribe(
      (data:Object)=> {
        this.genres = JSON.stringify(data);
        console.log("in getGenres()");
      })
  }
 }

 getTopArtists(){
   console.log("inTopArtists "+this.authToken);
   this.accountService.getTopArtists(this.authToken).subscribe(
    (data:Object)=> {
      this.topArtists = JSON.stringify(data);
      console.log(this.topArtists);
    }
   )
  }

  getTokenFromUrl() {
    this.authToken = this.accountService.getTokenFromUrl();
    this.accountService.getTokenServ().subscribe(
      (data: Object) => {
        this.token = Object.values(data)[0];
        if(this.token != null)
        {
          sessionStorage.setItem('token', this.token);
        }
        console.log(this.token);
      });
  }

}



