import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from'@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  form:FormGroup;

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
  public genres:any=[];
  genreList: any=[];
  constructor(private accountService: AccountService, private transferService: TransferService,private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      genre: this.formBuilder.array([],[Validators.required])
    })
   }

  ngOnInit(): void {
    this.getGenres()
    this.form = this.formBuilder.group({
      genre:this.formBuilder.array([])
    });
  }

  getGenres(){
    this.accountService.getGenres(this.token).subscribe(
     (data:Object)=> {
       this.genres=data
       console.log(this.genres.genres.length)
       for(let i = 0; i<this.genres.genres.length;i++){
         this.genreList.push({id:i,genre:this.genres.genres[i]})
       }
     }
    )
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

  registerUser(){
    this.accountService.createUserServ(this.artistId, this.username, this.password, this.firstName, this.lastName, this.age,
      this.profileDescription, this.searchSong(this.anthem, ''), this.preference, this.gender).subscribe( (data: Object) => {
        console.log(data); 
         

      })
  }

  searchSong(artistSearch:string, songSearch:string):string {
    this.accountService.getTokenServ().subscribe(
      (data: Object) => {
        this.token = Object.values(data)[0];
      
    this.accountService.searchSongServ(this.token, artistSearch, songSearch).subscribe(
      (data: Object) => {
        let innerData: any[] = Object.values(data);
        let innerInfo: any[] = Object.values(innerData[0]);
        let innerSongs: any[] = Object.values(innerInfo[1]);
        let innerSongsInfo: any[] = Object.values(innerSongs[0]);
        let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
        let finalUrl = innerSongsInfoUrl[0];
        let anthem = finalUrl.substring(31, finalUrl.length);
        console.log(anthem);
        return anthem;     
  })
});
  return "hello";
}

searchArtist(artistName:string):Artist {
  this.accountService.searchArtistServ(this.transferService.token, artistName).subscribe(
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


}
