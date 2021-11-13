import { Component, OnInit } from '@angular/core';
import { Artist } from '../models/artist';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from'@angular/forms';
import { getLocaleTimeFormat } from '@angular/common';
import { Router } from '@angular/router';

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
  public token: any= sessionStorage.getItem("token");
  public anthemUrl:string = '';
  public genres:any=[];
  public genreList: any=[];
  public genre: any=[];
  
  constructor(private router: Router,private accountService: AccountService, private transferService: TransferService,private formBuilder:FormBuilder) {
    this.form = this.formBuilder.group({
      genre: this.formBuilder.array([],[Validators.required])
    })
   }





  ngOnInit(): void {
    console.log(this.token)
    this.getGenres()
    this.form = this.formBuilder.group({
      genre:this.formBuilder.array([])
    });
  }

  getGenres(){
    if(this.token!=null){
      console.log(this.token)
      this.accountService.getGenres(this.token).subscribe(
       (data:Object)=> {
         this.genres=data
         for(let i = 0; i<this.genres.genres.length;i++){
           this.genreList.push({id:i,genre:this.genres.genres[i]})
         }
       }
      )
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
    this.genres=this.form.value;
  
    console.log("this.genre" + this.genres);
  }

  registerUser(){

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
      this.profileDescription, anthem, this.preference, this.gender, this.genre).subscribe( (data: Object) => {
        let userValues:any = Object.values(data);
        let userId = userValues[0];
        this.accountService.searchArtistServ(this.token, this.artistName).subscribe(
          (data: Object) => {
              let innerArtistSearch:any[] = Object.values(data);
              let innerArtistSearchInfo:any[] = Object.values(innerArtistSearch[0]);
              let innerArtistSearchDetails:any[] = Object.values(innerArtistSearchInfo[1]);
              let innerArtistSearchArray:any[] = Object.values(innerArtistSearchDetails[0]);
              let innerArtistId = innerArtistSearchArray[4];
              let innerArtistName = innerArtistSearchArray[6];
              let innerArtistImageDetails:any[]=Object.values(innerArtistSearchArray[5]);
              let innerArtistImageArray:any[]=Object.values(innerArtistImageDetails[0]);
              let innerArtistImage = innerArtistImageArray[1];
             this.accountService.createUserTopArtistServ(userId, innerArtistId,innerArtistName,innerArtistImage).subscribe(
               (data:Object)=> {
                let genreArray = [];

                let genres=this.form.value;
  
                for(let i = 0; i<genres.genre.length;i++){
                  genreArray.push({"id":i,"genre":genres.genre[i]})
                }
                 
                 console.log(genreArray);
                 
                 this.accountService.postGenres(userId, genreArray).subscribe(
                   (data:Object)=>{
                      console.log(data)
                   }
                 )
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
});
}
searchSong(){
  if(this.token!=null){
    this.accountService.searchSongServ(this.token, this.anthem, '').subscribe(
      (data: Object) => {
        let innerData: any[] = Object.values(data);
        let innerInfo: any[] = Object.values(innerData[0]);
        let innerSongs: any[] = Object.values(innerInfo[1]);
        let innerSongsInfo: any[] = Object.values(innerSongs[0]);
        let innerSongsInfoUrl: any[] = Object.values(innerSongsInfo[6]);
        let finalUrl = innerSongsInfoUrl[0];
        let anthem = finalUrl.substring(31, finalUrl.length);
        console.log(anthem);
        this.anthemUrl=anthem;
        console.log(this.anthemUrl);
          return(anthem);
    })
  }
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
