import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from './account.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private username:string = '';
  private password:string = '';
  public token:string = '';
  public user:User = new User(0, '','','','','','','','',[],[], '', '');
  public friend:User = new User(0, '','','','','','','','',[],[], '', '');
  public id:string = ''

  userChange : Subject<User> = new Subject<User>();
  friendChange : Subject<User> = new Subject<User>();

  constructor() { 
    this.userChange.subscribe((value) => {
      this.user = value;
    })
    this.friendChange.subscribe((value) => {
      this.friend = value;
    })
   
  }

  

  setUsername(username:string){
    this.username=username;
  }
  getUsername():string{
    return this.username;
  }

  setPassword(password:string) {
    this.password=password;
  }

  getPassword():string{
    return this.password
  }

  setToken(token:string) {
    this.token=token;
  }

  getToken():string{
    return this.token;
  }

  setUser(user:User) {
    this.userChange.next(user);
  }

  getUser():User {
    return this.user;
  }

  setFriend(friend:User) {
    this.userChange.next(friend);
  }

  getFriend():User {
    return this.friend;
  }

  getId():string {
    return this.id;
  }

  setId(id:string){
    this.id=id;
  }

  
}
