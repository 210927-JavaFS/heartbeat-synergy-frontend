import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';


@Component({
  selector: 'app-match-page',
  templateUrl: './match-page.component.html',
  styleUrls: ['./match-page.component.css']
})
export class MatchPageComponent implements OnInit {

  constructor(private as: AccountService, private router:Router) { }

  ngOnInit(): void {
  }


  getPotentialMatches(){
    let potentMatches=this.as.getPotentialMatches();
    console.log(potentMatches);
  }
}
