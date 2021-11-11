import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { AccountService } from './account.service';
import {Subject} from 'rxjs';
import { UserImage } from '../models/user-image';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  private username:string = '';
  private password:string = '';
  public token:string = '';
  public user:User|null = null;
  public images:UserImage[]|null = null;
  userChange : Subject<User> = new Subject<User>();
  imageChange : Subject<UserImage[]> = new Subject<UserImage[]>();

  public userImage : Observable<UserImage[]>|null = null;
  serverUrl:string = 'http://localhost:8083/data';


  constructor(private http:HttpClient) { 
    this.userChange.subscribe((value) => {
      this.user = value;
      this.updateUserImages();
    })
  }

  setUsername(username:string){
    this.username=username;
  }
  getUsername():string{
    return this.username;
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

  getUser():User|null {
    return this.user;
  }
  
}
