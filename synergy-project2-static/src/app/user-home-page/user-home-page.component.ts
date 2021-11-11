import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Track } from '../models/track';
import { LoginPageComponent } from '../login-page/login-page.component';
import { TransferService } from '../services/transfer.service';
import { Artist } from '../models/artist';
import { ThisReceiver } from '@angular/compiler';
import { User } from '../models/user';

import { HttpClient } from '@angular/common/http';
import { UserImage } from '../models/user-image';
@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public token:string = this.transferService.getToken();
  public authToken:string = '';
  public newReleases: string = '';
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
  public username:string = this.transferService.getUsername();
  public password:string = this.transferService.getPassword();
  public user:User|null = null;
  
  selectedFile: File|null = null;
  retrievedImage: any;
  message: string = "";

  constructor(private accountService: AccountService, private transferService:TransferService, private httpClient:HttpClient) 
  {
    transferService.userChange.subscribe(value => {this.user = value;});
    transferService.imageChange.subscribe((value)=>{ 
      if(this.user?.images.length != undefined && this.user?.images.length > 0)
        this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
    });
  }
 
  ngOnInit(): void {
  }
  
  initfunction(){
  }

  connectUserAccount() {
    this.accountService.getAccessToken();  
  }

  onFileChange(event:any)
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    this.transferService.uploadUserImage(this.selectedFile);
  }

  clearResults() {
    this.newReleases = '';
    console.log(this.transferService.getUser());
    console.log(this.user);
  }

  searchSong():Track {
    this.accountService.searchSongServ(this.transferService.token, this.artistSearch, this.songSearch).subscribe(
      (data: Object) => {
        let innerData: any[] = Object.values(data);
        let innerInfo: any[] = Object.values(innerData[0]);
        let innerSongs: any[] = Object.values(innerInfo[1]);
        let innerSongsInfo: any[] = Object.values(innerSongs[0]);
        let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
        let finalUrl = innerSongsInfoUrl[0];
        this.songId = finalUrl.substring(31, finalUrl.length);
        
        this.accountService.getSongServ(this.transferService.token, this.songId).subscribe(
          (data: Object) => {
            let innerData = Object.values(data);
            let innerArtistandAlbum: any[] = Object.values(innerData[0]);
            let innerArtistInfo: any[] = Object.values(innerArtistandAlbum[1]);
            let innerArtistDetails: any[] = Object.values(innerArtistInfo[0]);
            let artistName = innerArtistDetails[3];
            let albumName = innerArtistandAlbum[6];
            let songName = innerData[11]; 
            let innerAlbumImageInfo: any[] = Object.values(innerArtistandAlbum[5]);
            let innerAlbumImageDetails: any[] = Object.values(innerAlbumImageInfo[0]);
            let albumImageUrl = innerAlbumImageDetails[1];
            this.albumImageUrl = albumImageUrl;
            let track = new Track(this.songId, songName, artistName, albumName, albumImageUrl);
            this.track = track;
            return track;
          }
        )
      }

    )
  return new Track('','','','','');
  }

  searchArtist():Artist {
  this.accountService.searchArtistServ(this.transferService.token, this.getArtistSearch).subscribe(
    (data: Object) => {
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
        let artist = new Artist(innerArtistId, innerArtistName, innerArtistImage); 
        console.log(Object.values(artist));
        return artist;
       
    })
    return new Artist('','','');
}



getGenres(){
  this.accountService.getGenres(this.token).subscribe(
   (data:Object)=> {
     this.genres = JSON.stringify(data);
     console.log("in getGenres()");
   }
  )
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
    console.log(this.authToken);
    this.accountService.getTokenServ().subscribe(
      (data: Object) => {
        this.token = Object.values(data)[0]
        this.transferService.setToken(this.token);
        console.log(this.token);
      });
  }

}



