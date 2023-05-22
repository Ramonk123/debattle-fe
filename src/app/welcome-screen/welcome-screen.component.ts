import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})


export class WelcomeScreenComponent implements OnInit {

  loginForm!: FormGroup;
  isLoginForm: boolean = true;
  unequalPasswordsValidator: boolean = false;


  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService) {
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(7)]]
    });
  }


  submitForm() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;

    if (this.loginForm.get('password')?.value === this.loginForm.get('passwordRepeat')?.value) {
      this.authService.register(email, password).subscribe(data => {
        console.log(data)

      })
    } else {
      this.unequalPasswordsValidator = !this.unequalPasswordsValidator
    }
  }


}

