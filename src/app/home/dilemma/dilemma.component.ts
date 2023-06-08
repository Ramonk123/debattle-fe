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
  public category: string = '';
  public questions: any[] = [];
  private questionIndex: number = 0;
  public currentQuestion: Question | null = null;
  public buttonText: string[] = [];
  public statusBars: string[] = [];
  public firstOptionClicked: boolean = false;
  public secondOptionClicked: boolean = false;
  private progress: any = {};
  private newProgress: any = {};


  constructor(private route: ActivatedRoute,
              private questionService: QuestionService,
              private statusBarService: StatusBarService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.questionService.getQuestions(this.category).subscribe(data => {
        this.questions = data;
        this.currentQuestion = this.questions[this.questionIndex];
        this.setButtonText();
        this.setStatusBar();
      })
    });
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.questionService.getProgress().subscribe(data => {
        console.log(data)
        this.progress = data;
        this.newProgress = data;

      });
    }
  }

  ngOnDestroy(): void {
    this.questions = [];
    this.currentQuestion = null;
    this.statusBarService.resetCurrentStatus(this.progress);
  }

  private setButtonText() {
    Object.keys(this.currentQuestion!.answers).forEach(answerText => {
      this.buttonText.push(answerText);
    })
  }

  confirmChoice() {
    if (this.questions.length == this.questionIndex) {
      return; //TODO: Go to end screen or return to home island
    }
    this.statusBarService.updateProgress(this.progress).subscribe(data => {
      console.log(data);

    });
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
    this.resetStatusBars();
    this.firstOptionClicked = true;
    this.secondOptionClicked = false;
    let x = this.currentQuestion?.answers[`${this.buttonText[0]}`]
    x?.forEach(entry => {
      Object.entries(entry).forEach(e => {
        console.log(e[0] + ' ' + e[1])
        this.newProgress.progress[e[0]] = e[1]
        this.statusBarService.updateValue(e[0], e[1]);
        console.log(this.newProgress);
      });
    });
  }

  public selectSecondOption() {
    if (this.secondOptionClicked) {
      return;
    }
    this.resetStatusBars();
    this.firstOptionClicked = false;
    this.secondOptionClicked = true;
    let x = this.currentQuestion?.answers[`${this.buttonText[1]}`]
    x?.forEach(entry => {
      Object.entries(entry).forEach(e => {
        this.newProgress.progress[e[0]] = e[1] //Deze line fucked alles op. Zie ook R.109
        this.statusBarService.updateValue(e[0], e[1]);
      })
    })
  }


  private resetStatusBars() {
    this.statusBarService.resetCurrentStatus(this.progress);
    // this.statusBars.forEach(bar => {
    //   console.log(bar)
    //   console.log(this.progress.progress[bar])
    //   this.statusBarService.updateValue(bar, this.progress.progress[bar]);
    //
    // })
  }
}


