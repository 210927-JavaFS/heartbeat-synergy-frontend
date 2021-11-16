import { Component, OnInit } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Artist } from '../models/artist';
import { Track } from '../models/track';
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

  public genreList: any=[];
  public genreArray:any[]=[];
  public userGenres:any[]=[];
  


  public ageError:boolean = false;
  public error:boolean = false;
  public artistError:boolean = false;

  public topArtists:any[] = [];

  constructor(private accountService: AccountService, private router:Router, private formBuilder:FormBuilder) 
  { 
    this.id = sessionStorage.getItem('currentUser');
    
    if(this.id != null)
    {
      let numID:number = parseInt(this.id);
      accountService.getUser(numID).subscribe(value =>
      {
        this.user = value; this.anthem = this.user.anthem; this.topArtists = this.user.topArtists; 
        if(this.topArtists.length > 0)
        {
          this.artistName = this.user.topArtists[0].artistName;
        }
        this.user.userId = numID; this.firstName=this.user.firstName; this.profileDescription = this.user.profileDescription; 
        this.age=this.user.age; this.lastName=this.user.lastName; this.interest=this.user.filterType;
        this.gender = this.user.userType; this.preference = this.user.filterType;
        accountService.getUserImages(numID).subscribe(value=>
        {
          this.user.images = value;
          if(this.user?.images?.length != undefined && this.user?.images.length > 0)
            this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
        });

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
    
    this.token = sessionStorage.getItem('token');
    this.getGenres();
    this.form = this.formBuilder.group({
      genre:this.formBuilder.array([])
    });
    let genre: FormArray = this.form.get('genre') as FormArray;
  }

  deleteArtist(artist:any){
    if(this.id != null)
    {
      this.accountService.deleteUserTopArtist(this.id.toString(), artist.id).subscribe(()=>{ let index:number = this.topArtists.indexOf(artist); this.topArtists.splice(index, 1); this.user.topArtists = this.topArtists;});
    }
  }

  getGenres(){
    const genre: FormArray = this.form.get('genre') as FormArray;
    
    if(this.token!=null){
      this.accountService.getGenres(this.token).subscribe(
        (data:Object)=> {
          this.genres=data;


          this.accountService.getUserGenres(this.id).subscribe(
            (data2)=>{
              let dataArray:any[]=Object.values(data2);
              this.genreArray=[];
              let compare:boolean=false;
              for(let i =0;i<dataArray.length;i++){
                this.genreArray.push(dataArray[i].genre);
              }
              
              for(let i = 0; i<this.genres.genres.length;i++){
                compare=false;
                if(this.genreArray.includes(this.genres.genres[i])){
                  compare = true;
                  this.form.get('genre')?.value.push(this.genres.genres[i]);
                }
                this.genreList.push({id:i,genre:this.genres.genres[i],checked:compare})

              }

              

            })

         

        }
       )
       this.userGenres = this.form.value;
    }  
   }

   onCheckboxChange(e: any) {

    const genre: FormArray = this.form.get('genre') as FormArray;

 
    
        if (e.target.checked) {
          genre.value.push(e.target.value);


        } else {
          const index = genre.value.indexOf(e.target.value);
          if (index>-1){
            genre.value.splice(index,1);
          }
        }
        this.userGenres = this.form.value;

      
    

    
    
  }


   genreSubmit():Observable<Object>|null{
    let genreArray: { id: number; genre: any; }[] = [];
    let userId = this.id;
    console.log(genreArray);
    console.log(userId)
    console.log(sessionStorage.getItem("userId"))
    let genres=this.form.value;
  

    if(this.genres.length == 0) return null;

    for(let i = 0; i<genres.genre.length;i++){
      genreArray.push({"id":i,"genre":genres.genre[i]})
    }
                 
    console.log(genreArray);
                 
    return this.accountService.postGenres(userId, genreArray);

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

  toggleOffArtistError()
  {
    this.artistError = false;
  }

  submitFavoriteArtist()
  {
    if(this.artistName != "")
    {
      if(this.topArtists.length == 3)
      {
        this.artistError = true;
        return;
      }
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
            this.accountService.createUserTopArtistServ(this.user.userId.toString(), innerArtistId,innerArtistName,innerArtistImage).subscribe(()=>
            {
              if(this.id != null)
              {
                let numID:number = parseInt(this.id);
                this.accountService.getUser(numID).subscribe(value =>
                {
                  this.user = value; this.anthem = this.user.anthem; this.topArtists = this.user.topArtists; 
                  if(this.topArtists.length > 0)
                  {
                    this.artistName = this.user.topArtists[this.topArtists.length - 1].artistName;
                  }
                  this.user.userId = numID; this.firstName=this.user.firstName; this.profileDescription = this.user.profileDescription; 
                  this.age=this.user.age; this.lastName=this.user.lastName; this.interest=this.user.filterType;
                  this.gender = this.user.userType; this.preference = this.user.filterType;
                  this.accountService.getUserImages(numID).subscribe(value=>
                  {
                    this.user.images = value;
                    if(this.user?.images?.length != undefined && this.user?.images.length > 0)
                      this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
                  });
          
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
            });
        } , 
        error=> {console.log("error"); this.error=true;});
    }
  }

  confirmEdit()
  {
    
    if(!(Number.isInteger(parseInt(this.age))) && this.age!= ''){this.ageError=true}
    else if(parseInt(this.age)<0){this.ageError=true}
    else if(parseInt(this.age)>120){this.ageError=true}
    else{
    this.token=sessionStorage.getItem("token");
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
          this.lastName, this.age, this.profileDescription, this.anthem, this.preference, this.gender, this.genres).subscribe(()=>{
            let genreObservable:Observable<Object>|null = this.genreSubmit();
              if(genreObservable != null)
              {
                genreObservable.subscribe(()=>{this.router.navigate(['home-page']);});
              }
        });
      } , 
      error=> {console.log("error"); this.error=true;});
    }
    else{
      this.accountService.createUserServ(this.user.userId.toString(), this.user.username, this.user.password, this.firstName, 
        this.lastName, this.age, this.profileDescription, this.anthem, this.preference, this.gender, this.genres).subscribe(()=>{
          let genreObservable:Observable<Object>|null = this.genreSubmit();
              if(genreObservable != null)
              {
                genreObservable.subscribe(()=>{this.router.navigate(['home-page']);});
              }
        });
    }
  }
}}
