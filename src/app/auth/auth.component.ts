import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {emailValidator, passwordControlValidator} from '../shared/validators';
import {UserService} from '../core';
import {finalize} from 'rxjs/operators';


@Component({
  selector: 'app-auth-page',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  private authType: String = '';

  title: String = '';
  isSubmitting = false;
  authForm: FormGroup;
  submitButtonName: String = '';

  aliasedForValidationErrors = {
    username: 'Имя пользователя',
    password: 'Пароль',
    password_check: 'Проверка пароля',
    email: 'Электронная почта',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'email': [
        '',
        [
          Validators.required,
          emailValidator
        ]
      ],
      'password': [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255)
        ]
      ]
    }, {updateOn: 'blur'});
  }

  ngOnInit() {
    this.route.url
      .subscribe(data => {

        // Get the last piece of the URL (it's either 'login' or 'register')
        this.authType = data[data.length - 1].path;
        // Set a title for the page accordingly

        this.title = this.isLoginPage ? 'Войти в аккаунт' : 'Создать аккаунт';
        this.submitButtonName = this.isLoginPage ? 'Войти' : 'Зарегистрироваться';

        // add form control for username if this is the register page
        if (this.isRegisterPage) {
          this.authForm.addControl(
            'password_check',
            new FormControl(
              '', [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255)
              ]
            )
          );
          this.authForm.addControl(
            'username',
            new FormControl(
              '',
              [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(255)
              ]
            )
          );
          this.authForm.setValidators(passwordControlValidator);
        }
      });
  }

  submitForm() {
    this.isSubmitting = true;

    const credentials = this.authForm.value;
    this.userService
      .attemptAuth(this.authType, credentials)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe(
        () => this.router.navigateByUrl('/'),
      );
  }

  get isLoginPage(): boolean {
    return this.authType === 'login';
  }

  get isRegisterPage(): boolean {
    return this.authType === 'register';
  }
}
