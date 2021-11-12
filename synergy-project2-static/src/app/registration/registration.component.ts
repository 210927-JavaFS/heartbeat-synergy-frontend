import { Component, OnInit } from '@angular/core';
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

  constructor(private accountService: AccountService, private transferService: TransferService) { }

  ngOnInit(): void {
  }

  registerUser(){
    this.accountService.createUserServ(this.artistId, this.username, this.password, this.firstName, this.lastName, this.age,
      this.profileDescription, this.searchSong(this.anthem, ''), this.preference, this.gender).subscribe( (data: Object) => {
        console.log(data);
      })
  }

  searchSong(artistSearch:string, songSearch:string):string {
    this.accountService.getTokenServ().subscribe(
      (data: Object) => {
        this.token = Object.values(data)[0]
        this.transferService.setToken(this.token);
      
    this.accountService.searchSongServ(this.transferService.token, artistSearch, songSearch).subscribe(
      (data: Object) => {
        let innerData: any[] = Object.values(data);
        let innerInfo: any[] = Object.values(innerData[0]);
        let innerSongs: any[] = Object.values(innerInfo[1]);
        let innerSongsInfo: any[] = Object.values(innerSongs[0]);
        let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
        let finalUrl = innerSongsInfoUrl[0];
        let anthem = finalUrl.substring(31, finalUrl.length);
        return anthem;     
  })
});
  return "hello";
}


}
