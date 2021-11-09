import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private router: Router, private accountService:AccountService, private transferService:TransferService) { }

  ngOnInit(): void {
  }
  

  login() {
    
    if(this.accountService.loginServ(this.username,this.password)) {
      this.transferService.setUsername(this.username);
      this.transferService.setPassword(this.password);
      this.accountService.getTokenServ().subscribe(
        (data: Object) => {
          this.token = Object.values(data)[0]
          this.transferService.setToken(this.token);
        });
      this.router.navigate(['home-page'])}
    
  }


}

