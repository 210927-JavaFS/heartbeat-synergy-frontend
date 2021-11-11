import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css']
})
export class FriendsPageComponent implements OnInit {

  user: User | undefined;
  userId: number=0; // change to whichever user id you want
  users: User[]=[];


  constructor(private as: AccountService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.as.getAllUsers().subscribe(
      (response: User[])=>{
        this.users = response;
        console.log(response);
      }
    )
  }

  getUser(){
    this.as.getUser(this.userId).subscribe(
      (response: User)=>{
        this.user = response;
        console.log(response);
      }
    )
  }

}


