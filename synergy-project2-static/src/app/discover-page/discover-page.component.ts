import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../models/artist';
import { Track } from '../models/track';
import { User } from '../models/user';
import { UserImage } from '../models/user-image';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css']
})
export class DiscoverPageComponent implements OnInit {

  users: User[] = [];
  displayedUser:User|null|undefined = null;

  //Popped user information
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
  public currentUserId:string|null = '';
  public retrievedImage:string="";

  constructor(private as: AccountService, private router:Router) { }

  ngOnInit(): void {
    this.getPotentialMatches();
  }

  getPotentialMatches(){
    this.as.getPotentialMatches().subscribe(value=>{
      
      value.forEach(element => {
        let userValues:any[] = Object.values(element);
        let newUser:User = new User(userValues[0], userValues[1], userValues[2], userValues[3], userValues[4], userValues[5], userValues[6],
          userValues[7], userValues[8], userValues[9], userValues[10], userValues[11], userValues[12], null);
        this.users?.push(newUser);
      });
      this.displayedUser = this.users.pop();
      if(this.displayedUser != null)
      {
        this.displayProfile();
      }
    });
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

  displayProfile()
  {
    if(this.displayedUser != null)
    {
      let numId:number = this.displayedUser.userId;
      this.as.getUser(numId).subscribe((value: User) =>
        {
          this.displayedUser = value, this.firstName=this.displayedUser.firstName; this.profileDescription = 
          this.displayedUser.profileDescription, this.age=this.displayedUser.age, this.anthem=this.displayedUser.anthem, this.topUserGenres=this.generateGenres(this.displayedUser.topGenres);
            this.topUserArtists=this.generateTopArtists(this.displayedUser.topArtists),
            this.username=this.displayedUser.username, this.lastName=this.displayedUser.lastName, this.interest=this.displayedUser.filterType;
            this.as.getUserImages(numId).subscribe((value: UserImage[] | null)=>
              {
                if(this.displayedUser != null)
                {
                  this.displayedUser.images = value;
                  if(this.displayedUser.images?.length != undefined && this.displayedUser?.images.length > 0)
                    this.retrievedImage = 'data:image/png;base64,'+this.displayedUser?.images[this.displayedUser?.images.length - 1].picByte;
                }
              });
          
          this.token = sessionStorage.getItem('token');
          if(this.token != null)
          {
            this.as.getSongServ(this.token, this.anthem).subscribe(
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

  getTopArtists(){
    console.log("inTopArtists "+this.authToken);
    this.as.getTopArtists(this.authToken).subscribe(
     (data:Object)=> {
       this.topArtists = JSON.stringify(data);
       console.log(this.topArtists);
     }
    )
   }
 
   getTokenFromUrl() {
     this.authToken = this.as.getTokenFromUrl();
     this.as.getTokenServ().subscribe(
       (data: Object) => {
         this.token = Object.values(data)[0];
         if(this.token != null)
         {
           sessionStorage.setItem('token', this.token);
         }
         console.log(this.token);
       });
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

  login(){
    sessionStorage.clear();
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

  goDiscover()
  {
    this.router.navigate(['discover-page']);
  }

  goMatches()
  {
    this.router.navigate(['match-page']);
  }

}
