import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../models/artist';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  public username:string = '';
  public password:string = '';
  public firstName:string = '';
  public lastName:string = '';
  public profileDescription:string = '';
  public age:string = '';
  public anthem:string = '';
  public artistName:string = '';
  public artistId:string ='';
  public artistImage:string = ''
  public favoriteGenre:string = '';
  public gender:string = '';
  public preference:string = '';
  public token:string = '';
  public anthemUrl:string = '';

  constructor(private accountService: AccountService,  private router:Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    console.log(this.token);
    let url =this.searchSong(); 
    this.accountService.createUserServ(this.artistId, this.username, this.password, this.firstName, this.lastName, this.age,
      this.profileDescription, url, this.preference, this.gender).subscribe( (data: Object) => {
        console.log(data); 
         console.log(this.anthemUrl);

      })
  }

  getToken() {
    this.accountService.getTokenServ().subscribe(
      (data: Object) => {
        this.token = Object.values(data)[0];
      console.log(this.token);
});
}

searchSong():string{
this.accountService.searchSongServ(this.token, this.anthem, '').subscribe(
  (data: Object) => {
    let innerData: any[] = Object.values(data);
    let innerInfo: any[] = Object.values(innerData[0]);
    let innerSongs: any[] = Object.values(innerInfo[1]);
    let innerSongsInfo: any[] = Object.values(innerSongs[0]);
    let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
    let finalUrl = innerSongsInfoUrl[0];
    let anthem:string = finalUrl.substring(31, finalUrl.length);
    console.log(anthem);
    this.anthemUrl=anthem;
    console.log(this.anthemUrl);
    console.log(anthem);
      return anthem;
})
return this.anthemUrl; }

searchArtist(artistName:string):Artist {
  this.accountService.searchArtistServ(this.token, artistName).subscribe(
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

login(){
  this.router.navigate(['']);
}


}
