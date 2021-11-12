import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  users: User[] | null = null;

  constructor(private as: AccountService, private router:Router) { }

  ngOnInit(): void {
    this.getPotentialMatches();
  }


  getPotentialMatches(){
    this.as.getPotentialMatches().subscribe(value=>{
      this.users=value;
    });
  }
}
