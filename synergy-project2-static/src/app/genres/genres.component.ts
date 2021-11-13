import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from'@angular/forms';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';
import { User } from '../models/user';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  form:FormGroup;
  public token:string = this.transferService.getToken();
  public genres:any=[];
  public id:number = 1;
  
//this.id = sessionStorage.getItem("currentUser");
  genreList: any=[];

  constructor(private formBuilder:FormBuilder,private accountService: AccountService, private transferService:TransferService) {
    this.form = this.formBuilder.group({
      genre: this.formBuilder.array([],[Validators.required])
    })
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

  ngOnInit(): void {
    this.getGenres()
    this.form = this.formBuilder.group({
      genre:this.formBuilder.array([])
    });
  }

}
