import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private username:string = '';
  private password:string = '';
  public token:string = '';
  public user:User|null = null;

  constructor() { }

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
    this.user=user
  }

  getUser():any {
    return this.user;
  }
}
