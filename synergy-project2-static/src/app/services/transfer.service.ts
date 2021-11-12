import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from './account.service';
import {Subject} from 'rxjs';
import { UserImage } from '../models/user-image';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private serverUrl:string = 'http://localhost:8083/data';
  private username:string = '';
  private password:string = '';
  public token:string = '';
  public user:User = new User(0, '','','','','','','','',[],[], '', '', null);
  public friend:User = new User(0, '','','','','','','','',[],[], '', '', null);
  public id:string = ''

  userChange : Subject<User> = new Subject<User>();
  friendChange : Subject<User> = new Subject<User>();
  imageChange : Subject<UserImage[]> = new Subject<UserImage[]>();

  public userImage : Observable<UserImage[]>|null = null;

  constructor(private http:HttpClient) { 
    this.userChange.subscribe((value) => {
      this.user = value;
      this.updateUserImages();
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

  getUserImages():Observable<UserImage[]>{
    return this.http.get<UserImage[]>(this.serverUrl + '/account/' + this.user?.userId + "/photo");
  }

  updateUserImages(){
    this.userImage = this.getUserImages();
    this.userImage.subscribe((value) => {
      if(this.user != null)
        this.user.images = value;
      this.imageChange.next(value);});
  }

  uploadUserImage(file:File|null){
    if(file===null)return;
    const uploadImageData = new FormData();
    uploadImageData.append('image', file, file.name);
    this.http.post(this.serverUrl+'/account/'+this.user?.userId+'/photo', uploadImageData, {observe:'response'})
    .subscribe((response)=> {
    if(response.status ===201){
      console.log("upload success");
      this.updateUserImages();
    }
    else
      console.log("upload not successful");
    });
  }

  
}
