import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from'@angular/forms';

@Component({
  selector: 'app-edit-profile-page',
  templateUrl: './edit-profile-page.component.html',
  styleUrls: ['./edit-profile-page.component.css']
})
export class EditProfilePageComponent implements OnInit {
  form:FormGroup;
  public user:User = new User(0, '','','','','','','','',[],[], '', '', null);
  public age:string = '';
  public firstName:string='';
  public id:string|null = '';
  public token:string|null = sessionStorage.getItem('token');
  public profileDescription='';
  public lastName:string= '';
  public interest:string= '';
  public identify:string='';
  public selectedFile:File|null = null;
  public retrievedImage:any;
  public genres:any=[];
  genreList: any=[];

  constructor(private accountService: AccountService, private router:Router, private formBuilder:FormBuilder) 
  { 
    this.form = this.formBuilder.group({
      genre: this.formBuilder.array([],[Validators.required])
    })
    this.id = sessionStorage.getItem('currentUser');
    
    if(this.id != null)
    {
      let numID:number = parseInt(this.id);
      accountService.getUser(numID).subscribe(value =>
        {
          this.user = value, this.firstName=this.user.firstName; console.log(this.id); this.profileDescription = 
          this.user.profileDescription, this.age=this.user.age, this.lastName=this.user.lastName, this.interest=this.user.filterType;
            console.log(this.user);
          accountService.getUserImages(numID).subscribe(value=>
            {
              this.user.images = value;
              if(this.user?.images?.length != undefined && this.user?.images.length > 0)
                this.retrievedImage = 'data:image/png;base64,'+this.user?.images[this.user?.images.length - 1].picByte;
          });
        });
    }
  }

  ngOnInit(): void {
    this.getGenres()
    this.form = this.formBuilder.group({
      genre:this.formBuilder.array([])
    });
  }

  getGenres(){
    if(this.token!=null){
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
    let genreArray = [];
    let userId = this.id;
    console.log(userId)
    console.log(sessionStorage.getItem("userId"))
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

  login(){
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

  onFileChange(event:any)
  {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
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

}
