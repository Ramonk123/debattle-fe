import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from 'src/environments/environment';
import {Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string = ''; //might be removed in the future
  public isLoggedIn: boolean = false;
  private userId: string = '';
  private user: {} = {};
  private session = new BehaviorSubject({ token: '', user: '' }); //might also be removed

  constructor(private http: HttpClient, private router: Router) {
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
        this.token = data.headers.get('Set-Cookie');
        console.log(document.cookie)
        this.userId = data.body[0]._id
        this.user = data.body[0]
      console.log(this.user)
      localStorage.setItem('userId', this.userId);
        localStorage.setItem('userState', String(this.isLoggedIn));
        this.session.next({ token: this.token, user: this.userId }); //Maybe unnecessary

        this.router.navigate(['/home'])

      }, error => {
        console.log(error)
      }
    )
  }

  public logout() {
    const userId = localStorage.getItem('userId');
    const URL = environment.URL + '/auth/logout';
    this.http.post(URL, this.userId, {withCredentials: true}).subscribe(data => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userState');
    })
  }


  public autoLogin() {
    const userState = localStorage.getItem('userState');
    const userId = localStorage.getItem('userId');
    if (!userId || !userState) {
      this.router.navigate(['/login'])
      return;
    }

    this.isLoggedIn = true;
  }

  public getUser() {
    return this.user;

  }

}
