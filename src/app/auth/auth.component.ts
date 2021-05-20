import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {Errors, UserService} from '../core';


function passwordControlValidator(control: AbstractControl): ValidationErrors | null {
  const password_check = control.get('password_check') || null;
  if (password_check === null) {
    return null;
  }
  const password = control.get('password');

  if (password.value !== password_check.value) {
    return {passwordMismatch: true};
  }
  return null;
}


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private authType: String = '';

  title: String = '';
  errors: Errors = {errors: {}};
  isSubmitting = false;
  authForm: FormGroup;
  submitButtonName: String = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      // Get the last piece of the URL (it's either 'login' or 'register')
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly

      this.title = this.isLoginPage ? 'Войти в аккаунт' : 'Создать аккаунт';
      this.submitButtonName = this.isLoginPage ? 'Войти' : 'Зарегистрироваться';

      // add form control for username if this is the register page
      if (this.isRegisterPage) {
        this.authForm.addControl('password_check', new FormControl('', [Validators.required]));
        this.authForm.addControl('username', new FormControl('', [Validators.required]));
      }
      this.authForm.setValidators(passwordControlValidator);
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};

    console.log(this.authForm?.errors);

    const credentials = this.authForm.value;
    this.userService
    .attemptAuth(this.authType, credentials)
    .subscribe(
      data => this.router.navigateByUrl('/'),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  get isLoginPage(): boolean {
    return this.authType === 'login';
  }

  get isRegisterPage(): boolean {
    return this.authType === 'register';
  }
}
