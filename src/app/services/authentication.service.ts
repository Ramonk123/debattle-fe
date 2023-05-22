import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  register(email: string, password: string) {
    const URL = environment.URL + '/auth/register';
    const body = {email: email, password: password};
    return this.http.post(URL, body)


  }
}
