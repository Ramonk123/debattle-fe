import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})


export class WelcomeScreenComponent implements OnInit {

  registerForm!: UntypedFormGroup;
  isLoginForm: boolean = true;
  unequalPasswordsValidator: boolean = false;

  loginForm!: UntypedFormGroup


  constructor(private formBuilder: UntypedFormBuilder, private authService: AuthenticationService) {
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(7)]]
    });


    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }


  submitRegisterForm() {
    let email = this.registerForm.get('email')?.value;
    let password = this.registerForm.get('password')?.value;
    if (this.registerForm.get('password')?.value === this.registerForm.get('passwordRepeat')?.value) {
      this.authService.register(email, password).subscribe(data => {
        console.log(data)

      })
    } else {
      this.unequalPasswordsValidator = !this.unequalPasswordsValidator
    }
  }

  submitLoginForm() {
    let email = this.loginForm.get('email')?.value;
    let password = this.loginForm.get('password')?.value;
    console.log(email, password)
    this.authService.login(email, password)
  }
}

