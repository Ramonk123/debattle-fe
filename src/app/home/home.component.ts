import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../services/question.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";
import {StatusBarService} from "../services/status-bar.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private questionService: QuestionService, private authenticationService: AuthenticationService, private router: Router, private statusBarService: StatusBarService) { }

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }


  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login'])

  }


}



