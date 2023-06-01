import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../services/question.service";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private questionService: QuestionService, private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.authenticationService.autoLogin();
  }

  testMethod() {
    const body = [
      {
        "Question": "What is the world",
        "Answers": [
          "Nithinsf",
          "asdjajd",
          "asdasdad"
        ]
      },
      {
        "Question" : "Who ami ",
        "Answers": ["No one", "Ramon", "Shrugs"]
      }
    ]
    this.questionService.addQuestion(body);
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['login'])

  }
}



