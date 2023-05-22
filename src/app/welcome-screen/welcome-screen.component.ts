import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})



export class WelcomeScreenComponent implements OnInit {

  loginForm!: FormGroup;
  isLoginForm: boolean = true;
  emailControl! : AbstractControl | null;
  passwordControl! : AbstractControl | null;
  passwordRepeatControl! : AbstractControl | null;

  constructor(private formBuilder: FormBuilder) {
  }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      passwordRepeat: ['', [Validators.required, Validators.minLength(7)]]
    }, this.passwordMatchValidator);
    this.emailControl = this.loginForm.get('email');
    this.passwordControl = this.loginForm.get('password');
    this.passwordRepeatControl = this.loginForm.get('passwordRepeat');
  }



  submitForm() {
    console.log(this.loginForm.value);
    console.log(    this.loginForm.valid)
    console.log(this.loginForm.get('passwordRepeat')?.errors)
  }

  passwordMatchValidator() {
    const frm = this.loginForm;
    return frm.controls['newPassword'].value === frm.controls['repeatNewPassword'].value ? null : {'mismatch': true};
  }


}

