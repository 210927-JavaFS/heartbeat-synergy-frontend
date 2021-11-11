import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';
import { Track } from '../models/track';
import { LoginPageComponent } from '../login-page/login-page.component';
import { TransferService } from '../services/transfer.service';
import { Artist } from '../models/artist';
import { ThisReceiver } from '@angular/compiler';
import { User } from '../models/user';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public token:string = this.transferService.getToken();
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
  public user:User = new User(0, '','','','','','','',[],[]);;
  public firstName:string = '';
  public profileDescription = '';
  public anthem:string = '';
  public track1:Track|null = null;
  public topUserArtists:any[] = [];
  public topUserGenres:any[] = [];
  constructor(private accountService: AccountService, private transferService:TransferService) 
  {
    transferService.userChange.subscribe(value => 
    {
    //Values
    this.user = value, this.firstName=this.user.firstName, this.profileDescription = 
    this.user.profileDescription, this.anthem=this.user.playlist, this.topUserGenres=this.generateGenres(this.user.topArtists),
      console.log(this.topUserGenres), this,this.topUserArtists=this.generateTopArtists(this.user.topGenres);
      console.log(this.topArtists);
     
    
    //Functions
    this.accountService.getSongServ(this.transferService.token, this.anthem).subscribe(
      (data: Object) => {
        let innerData = Object.values(data);
        let innerArtistandAlbum: any[] = Object.values(innerData[0]);
        let innerArtistInfo: any[] = Object.values(innerArtistandAlbum[1]);
        let innerArtistDetails: any[] = Object.values(innerArtistInfo[0]);
        let artistName = innerArtistDetails[3];
        let albumName = innerArtistandAlbum[7];
        let songName = innerData[11]; 
        let innerAlbumImageInfo: any[] = Object.values(innerArtistandAlbum[6]);
        let innerAlbumImageDetails: any[] = Object.values(innerAlbumImageInfo[2]);
        let albumImageUrl = innerAlbumImageDetails[1];
        this.albumImageUrl = albumImageUrl;
        let track = new Track(this.songId, songName, artistName, albumName, albumImageUrl);
        this.track = track;

      }
    )}  );

  }
 
  ngOnInit(): void {
  }

  
  initfunction(){
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
    return array;}
    else{
      let array = ["nothing here yet"];
      return array;
    }
  }

  getSong(songUrl:string):Track {
    this.accountService.getSongServ(this.transferService.token, songUrl).subscribe(
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
    return new Track('','','','','');
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
            let track1 = new Track(this.songId, songName, artistName, albumName, albumImageUrl);
            this.track1 = track1;
            return track1;
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

  getArtist(artistId:any):Artist {
    this.accountService.getArtistServ(this.transferService.token, artistId).subscribe(
      (data: Object) => {
        console.log(data);
        let innerGetData:any[]=Object.values(data);
        console.log(innerGetData);
        let artistName=innerGetData[6];
        let artistImage:any[] = innerGetData[5];
        let artistImageArray:any[]=Object.values(artistImage[2]);
        let artistImageUrl = artistImageArray[1];
        let artist = new Artist('adsfasdf', artistName, artistImageUrl);
        console.log(artist);
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



