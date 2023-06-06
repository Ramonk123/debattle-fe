import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
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
  public category: string = '';
  public questions: any[] = [];
  private questionIndex: number = 0;
  public currentQuestion: Question | null = null;
  public buttonText: string[] = [];
  public statusBars: string[] = [];
  public firstOptionClicked: boolean = false;
  public secondOptionClicked: boolean = false;


  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private statusBarService: StatusBarService,
              private authenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.questionService.getQuestions(this.category).subscribe(data => {
        this.questions = data;
        this.currentQuestion = this.questions[this.questionIndex];
        this.setButtonText();
        this.setStatusBar();
      })
    })
  }

  ngOnDestroy(): void {
    this.questions = [];
    this.currentQuestion = null;
  }

  private setButtonText() {
    Object.keys(this.currentQuestion!.answers).forEach(answerText => {
      this.buttonText.push(answerText);
    })
  }

  confirmChoice() {
    if (this.questions.length == this.questionIndex) {
      return;
    }
    this.questionIndex += 1;
    this.currentQuestion = this.questions[this.questionIndex];

  }

  private setStatusBar() {
    const answers = this.currentQuestion?.answers;
    if (answers) {
      const answerKeys = Object.keys(answers);
      for (const key of answerKeys) {
        const answerValues = answers[key];
        answerValues.forEach(value => {
          let bar = Object.keys(value)[0];
          if (!this.statusBars.includes(bar)) {
            this.statusBars.push(bar)
          }
        });
      }
    }


  }
//TODO: Remember old values so that user can revert
  public selectFirstOption() {
    if (this.firstOptionClicked) {
      return;
    }
    console.log(this.authenticationService.getUser());
    this.firstOptionClicked = true;
    this.secondOptionClicked = false;
   let x = this.currentQuestion?.answers[`${this.buttonText[0]}`]
    x?.forEach(entry => {
      Object.entries(entry).forEach(e => {
        console.log(entry)
        this.statusBarService.updateValue(e[0], e[1]);
      })
    })
  }

  public selectSecondOption() {
    if (this.secondOptionClicked) {
      return;

    }
    this.firstOptionClicked = false;
    this.secondOptionClicked = true;
    let x = this.currentQuestion?.answers[`${this.buttonText[1]}`]
    x?.forEach(entry => {
      Object.entries(entry).forEach(e => {
        this.statusBarService.updateValue(e[0], e[1]);
      })
    })

  }
}


