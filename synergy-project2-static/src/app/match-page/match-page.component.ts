import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserImage } from '../models/user-image';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  users: User[] = [];

  constructor(private as: AccountService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // this.getPotentialMatches();
    this.getConsensualMatches();
  }

  getConsensualMatches() {
    this.as.getConsensualMatches().subscribe(value => {
      value.forEach(element => {
        let userValues: any[] = Object.values(element);
        let newUser: User = new User(userValues[0], userValues[1], userValues[2], userValues[3], userValues[4], userValues[5], userValues[6],
          userValues[7], userValues[8], userValues[9], userValues[10], userValues[11], null);
        this.users?.push(newUser);

        this.as.getUserImages(newUser.userId).subscribe(value => {
          newUser.images = [];

          value.forEach(element => {
            let imageValues: any[] = Object.values(element);
            let newUserImage: UserImage = new UserImage(imageValues[0], imageValues[1], imageValues[2], imageValues[3]);
            newUser.images?.push(newUserImage);
          })
        });
      });
    });
  }

  // getPotentialMatches(){
  //   this.as.getPotentialMatches().subscribe(value=>{

  //     value.forEach(element => {
  //       let userValues:any[] = Object.values(element);
  //       let newUser:User = new User(userValues[0], userValues[1], userValues[2], userValues[3], userValues[4], userValues[5], userValues[6],
  //         userValues[7], userValues[8], userValues[9], userValues[10], userValues[11], userValues[12], null);
  //       this.users?.push(newUser);

  //       this.as.getUserImages(newUser.userId).subscribe(value=>{
  //         newUser.images = [];

  //         value.forEach(element => {
  //           let imageValues:any[] = Object.values(element);
  //           let newUserImage:UserImage = new UserImage(imageValues[0], imageValues[1], imageValues[2], imageValues[3]);
  //           newUser.images?.push(newUserImage);
  //         })
  //       });
  //     });
  //   });
  // }



  getUserImage(user: User) {
    if (user.images != null && user.images.length != 0) {
      return user.images[0].getImageString();
    }
    return "/assets/blank-profile.png";
  }

  login() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  goHome() {
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

  goProfile(user:User)
  {
    sessionStorage.setItem('viewedUser', user.userId.toString());
    this.router.navigate(['user-profile-page']);
  }
}


