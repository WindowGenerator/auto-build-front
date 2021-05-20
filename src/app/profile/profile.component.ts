import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User, UserService, Profile } from '../core';
import { concatMap ,  tap } from 'rxjs/operators';
import {testUser} from '../tests/mocks';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  profile: Profile;
  currentUser: User = testUser;
  isUser: boolean;
  title: String = '';

  ngOnInit() {
    this.title = 'Ваш профиль';
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }

}
