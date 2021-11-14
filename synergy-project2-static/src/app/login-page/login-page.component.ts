import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { TransferService } from '../services/transfer.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})

export class LoginPageComponent implements OnInit {
  public username: string = '';
  public password: string = ''
  public token:string = '';
  public user:User = new User(0, '','','','','','','','',[],[], '', '', null);


  constructor(private router: Router, private accountService:AccountService, private transferService:TransferService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    
  }
  

  login() {
    
    if(true) {
      this.accountService.loginServ(this.username, this.password).subscribe(
        (data:Object)=> {
          console.log(JSON.stringify(data))
          let userValues:any[]=Object.values(data);
          console.log(userValues);
          this.user = new User(userValues[0], userValues[1], userValues[2], userValues[3], userValues[4], userValues[5], userValues[6],
            userValues[7], userValues[8], userValues[9], userValues[10], userValues[11], userValues[12], null);;
          sessionStorage.setItem('currentUser', this.user.userId.toString());
          this.accountService.getTokenServ().subscribe(
            (data: Object) => {
              this.token = Object.values(data)[0];
              sessionStorage.setItem('token', this.token);
              this.router.navigate(['home-page']);
            });
        }
      )
    }
  }

  register(){
    this.accountService.getTokenServ().subscribe(
      (data: Object) => {
        this.token = Object.values(data)[0];
        sessionStorage.setItem('token', this.token);
        this.router.navigate(['registration']);
      });
  }


}

