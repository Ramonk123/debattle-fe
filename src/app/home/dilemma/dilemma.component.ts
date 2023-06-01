import {Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../services/question.service";
import {Question} from "../../models/iQuestion";


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

  constructor(private route: ActivatedRoute, private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category')!;
      this.questionService.getQuestions(this.category).subscribe(data => {
        console.log(data)
        this.questions = data;
        this.currentQuestion = this.questions[this.questionIndex];
        this.setButtonOptions();
        this.setStatusBar();
      })
    })
  }

  ngOnDestroy(): void {
    this.questions = [];
    this.currentQuestion = null;
  }

  private setButtonOptions() {
    this.currentQuestion?.answers.forEach(answer => {
      Object.keys(answer).forEach(key => {
        this.buttonText.push(key.toString())
      })
    })
  }

  test() {
    if (this.questions.length == this.questionIndex) {
      console.log('Out of questions')
      return;
    }
    console.log('hier kom ik')
    this.questionIndex += 1;
    this.currentQuestion = this.questions[this.questionIndex];

  }

  public submitChoice(event: MouseEvent) {
    console.log(event)
  }

  private setStatusBar() {

  }
}


