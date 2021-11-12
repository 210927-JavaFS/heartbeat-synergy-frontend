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
  public genres:string='';
  
  //public genres:any[] = this.accountService.getGenres(this.token);
  genreList: any=[
    {id:1, genre:'Rock'},{id:2,genre:'Roll'}
  ];

  constructor(private formBuilder:FormBuilder,private accountService: AccountService, private transferService:TransferService) {
    this.form = this.formBuilder.group({
      genre: this.formBuilder.array([],[Validators.required])
    })
   }

   getGenres(){
    this.accountService.getGenres(this.token).subscribe(
     (data:Object)=> {
       this.genres = JSON.stringify(data);
       console.log(this.genres)
       for(let i = 0; i<this.genres.length;i++){
         this.genreList.push({id:i,genre:this.genres[i]})
       }
     }
    )
   }

   onCheckboxChange(e: any) {
     this.getGenres()
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
    this.form = this.formBuilder.group({
      genre:this.formBuilder.array([])
    });
  }

}
