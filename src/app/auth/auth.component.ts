import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {emailValidator, passwordControlValidator} from '../shared/validators';
import {Errors, UserService} from '../core';


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
      'email': [
        '',
        [
          Validators.required,
          Validators.email,
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
    this.route.url.subscribe(data => {
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
    this.checkedValidationsErrorsBeforeSubmit();
    this.isSubmitting = true;
    this.errors = {errors: {}};

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

  private checkedValidationsErrorsBeforeSubmit() {

  }

  haveValidationErrorsForControl(controlName: string): boolean {
    if (this.authForm[controlName]) {
      console.log('Что-то не так тута');
      return false;
    }
    const control = this.authForm.get(controlName);

    if (!control.touched) {
      return false;
    }
    return control?.errors !== null;
  }

  getValidationErrors(controlName: string): Array<string> {
    const errors = [];

    if (!this.haveValidationErrorsForControl) {
      return errors;
    }
    for (const [keyError, valueError] of Object.entries(this.authForm.get(controlName).errors)) {
      let outputString = keyError;

      switch (keyError) {
        case 'required':
          outputString = `Значение поля: ${controlName} обязательно для ввода`;
          break;
        case 'minlength':
          outputString = `Минимальная длина для поля ${controlName} равна ${valueError?.requiredLength}`;
          break;
        case 'maxlength':
          outputString = `Максимальная длина для поля ${controlName} равна ${valueError?.requiredLength}`;
          break;
        default:
          break;
      }
      errors.push(outputString);
    }
    return errors;
  }
}
