import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {passwordControlValidator} from '../shared/validators';
import {Profile, ProfilesService, User, UserService} from '../core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  isSubmitting = false;
  submitButtonName = '';

  aliasedForValidationErrors = {
    username: 'Имя пользователя',
    old_password: 'Старый пароль',
    password: 'Пароль',
    password_check: 'Проверка пароля',
    email: 'Электронная почта',
  };

  constructor(
    private profilesService: ProfilesService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
  ) {
    // use FormBuilder to create a form group
    this.profileForm = this.fb.group({
      'username': [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
        ]
      ],
      'old_password': [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
        ]
      ],
      'password': [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
        ]
      ],
      'password_check': [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(255),
          passwordControlValidator
        ]
      ],
    });
  }

  profile: Profile;
  currentUser: User;

  title: String = '';

  ngOnInit() {
    this.title = 'Ваш профиль';
    this.submitButtonName = 'Изменить';

    this.userService.currentUser.subscribe(data => {
      this.currentUser = {...data};
      this.usernameControl.setValue(this.currentUser.username);
    });

  }

  get usernameControl() {
    return this.profileForm.get('username');
  }

  get passwordControl() {
    return this.profileForm.get('password');
  }

  get changeIsValid() {
    return (this.currentUser.username !== this.usernameControl.value)
      && this.profileForm.valid;
  }

  submitForm() {
    this.isSubmitting = true;

    const newUserFields = {
      ...this.currentUser,
      'username': this.usernameControl.value,
      'password': this.passwordControl.value
    };

    this.userService
      .update(newUserFields)
      .pipe(finalize(() => this.isSubmitting = false))
      .subscribe(userData => {
        this.currentUser = {...userData};
        this.router.navigateByUrl('/profile/' + userData.username);
      });

  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigateByUrl('/');
  }

}
