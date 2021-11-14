import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  public token:any = '';
  public anthemUrl:string = '';
  public genres:any=[];
  genreList: any=[];
  
  constructor(private accountService: AccountService,private formBuilder:FormBuilder,private router:Router) {
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
    console.log(this.token);
    this.token=sessionStorage.getItem("token");
    console.log(this.token);
    this.accountService.searchSongServ(this.token, this.anthem, '').subscribe(
      (data: Object) => {
        let innerData: any[] = Object.values(data);
        let innerInfo: any[] = Object.values(innerData[0]);
        let innerSongs: any[] = Object.values(innerInfo[1]);
        let innerSongsInfo: any[] = Object.values(innerSongs[0]);
        let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
        let finalUrl = innerSongsInfoUrl[0];
        let anthem:string = finalUrl.substring(31, finalUrl.length);          
        this.accountService.createUserServ(this.artistId, this.username, this.password, this.firstName, this.lastName, this.age,
      this.profileDescription, anthem, this.preference, this.gender).subscribe( (data: Object) => {
        console.log(data);
        let userValues:any = Object.values(data);
        let userId = userValues[0];
        this.accountService.searchArtistServ(this.token, this.artistName).subscribe(
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
              console.log(userId, innerArtistId, innerArtistName, innerArtistImage)
             this.accountService.createUserTopArtistServ(userId, innerArtistId,innerArtistName,innerArtistImage).subscribe(
               (data:Object)=> {
                 console.log(data);
               }
             )      
          })

    })
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
