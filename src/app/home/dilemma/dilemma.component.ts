import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/iQuestion";
import {StatusBarService} from "../../services/status-bar.service";
import {AuthenticationService} from "../../services/authentication.service";


@Component({
  selector: 'app-dilemma',
  templateUrl: './dilemma.component.html',
  styleUrls: ['./dilemma.component.css']
})
export class DilemmaComponent implements OnInit, OnDestroy {
  private category: string = '';
  public displayedCategory: string = '';
  public questions: any[] = [];
  private questionIndex: number = 0;
  public currentQuestion: Question | null = null;
  public buttonText: string[] = [];
  private progress: any = {};
  public firstButtonClicked = false;
  public secondButtonClicked = false;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private statusBarService: StatusBarService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.displayedCategory = params.get('category')!;
      this.questionService.getQuestions(this.displayedCategory).subscribe(data => {
        this.questions = data;
        console.log(this.questions)
        this.setInnerCategory();
        this.questionIndex = this.progress['questionsAnswered'][this.category];
        this.currentQuestion = this.questions[this.questionIndex];
        this.setButtonText()
      })
    });
    let unParsedProgress = localStorage.getItem('progress');
    if (unParsedProgress) {
      this.progress = JSON.parse(unParsedProgress);
    }


  }

  ngOnDestroy(): void {
    this.questions = [];
    this.currentQuestion = null;
  }

  private setButtonText() {
    this.buttonText = [];
    Object.keys(this.currentQuestion!.answers).forEach(answerText => {
      this.buttonText.push(answerText);
    })
  }

  confirmChoice() {
    this.questionIndex += 1;
    this.firstButtonClicked = false;
    this.secondButtonClicked = false;
    this.currentQuestion = this.questions[this.questionIndex];
    this.progress.questionsAnswered[this.category] = this.questionIndex
    this.statusBarService.updateProgress(this.progress) // maybe here;
    this.setButtonText(); // and here

  }

  public selectFirstOption() {
    if (this.secondButtonClicked) {
      this.statusBarService.resetCurrentStatus();
    }
    this.firstButtonClicked = true;
    this.secondButtonClicked = false;
    let answerObject = this.currentQuestion?.answers[`${this.buttonText[0]}`];
    answerObject?.forEach(domain => {
      Object.entries(domain).forEach(consequence => {
        this.statusBarService.updateValue(consequence[0], consequence[1]);
      })
    })

  }

  public selectSecondOption() {
    if (this.firstButtonClicked) {
      this.statusBarService.resetCurrentStatus();
    }
    this.secondButtonClicked = true;
    this.firstButtonClicked = false;
    let answerObject = this.currentQuestion?.answers[`${this.buttonText[1]}`];
    answerObject?.forEach(domain => {
      Object.entries(domain).forEach(consequence => {
        this.statusBarService.updateValue(consequence[0], consequence[1]);
      })
    })
  }

  private setInnerCategory() {
    switch (this.displayedCategory) {
      case 'Natuur' :
        this.category = 'climate';
        break;
      case 'Onderwijs' :
        this.category = 'education';
        break;
      case 'Huisvesting' :
        this.category = 'housing'
        break;
    }
  }
}


