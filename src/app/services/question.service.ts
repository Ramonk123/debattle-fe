import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) {
  }


  addQuestion(body: string[]) {
    const URL = environment.URL + '/question';

    this.http.post(URL, body, {withCredentials: true}).subscribe(data => {
      console.log(data);

    }, error => {
      console.log(error)

    })
  }
}
