import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private questionList: Question[] = [];

  constructor(private http: HttpClient) {
  }


  addQuestion(body: ({ Answers: string[]; Question: string })[]) {
    const URL = environment.URL + '/question';

    this.http.post(URL, body, {withCredentials: true}).subscribe(data => {
      console.log(data);

    }, error => {
      console.log(error)

    })
  }

  getQuestions(category: string): Observable<Question[]> {
    const URL = environment.URL + `/question/${category}`
    return this.http.get<Question[]>(URL);
  }

  updateProgress(id: string, body: {}) {
    const URL = environment.URL + `/user/${id}`;
    return this.http.post(URL, body);
  }
  getProgress() {
    const userId = localStorage.getItem('userId');

      const URL = environment.URL + `/user/${userId}`;
      return this.http.get<any>(URL);

  }

}

interface Answer {
  [key: string]: { [key: string]: number }[];
}

interface Question {
  _id: string;
  category: string;
  question: string;
  answers: Answer[];
}
