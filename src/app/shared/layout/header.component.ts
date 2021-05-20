import { Component, OnInit } from '@angular/core';

import { User, UserService } from '../../core';
import {testUser} from '../../tests/mocks';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  currentUser: User = testUser;

  ngOnInit() {
  }
}
