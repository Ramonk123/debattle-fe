import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = ''; //might be removed in the future

  constructor(private http: HttpClient) {
  }

  register(email: string, password: string) {
    const URL = environment.URL + '/auth/register';
    const body = {email: email, password: password};
    return this.http.post(URL, body)
  }

  login(email: string, password: string) {
    const URL = environment.URL + '/auth/login';
    const body = {email: email, password: password};
    return this.http.post(URL, body, {withCredentials: true, observe: "response"}).subscribe((data: any) => {
      const token = data.headers.get('Set-Cookie');
      }, error => {
      console.log(error)
      }
    )
  }
}
