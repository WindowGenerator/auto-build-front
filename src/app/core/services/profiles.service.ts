import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { Profile } from '../models';
import {map, takeUntil} from 'rxjs/operators';
import {NgOnDestroy} from './unsubscribe.service';

@Injectable()
export class ProfilesService {
  constructor (
    private apiService: ApiService,
    private unsubscribe: NgOnDestroy,
  ) {}

  get(username: string): Observable<Profile> {
    return this.apiService
      .get('/profiles/' + username)
      .pipe(takeUntil(this.unsubscribe))
      .pipe(map((data: {profile: Profile}) => data.profile));
  }

  follow(username: string): Observable<Profile> {
    return this.apiService
      .post('/profiles/' + username + '/follow')
      .pipe(takeUntil(this.unsubscribe));
  }

  unFollow(username: string): Observable<Profile> {
    return this.apiService
      .delete('/profiles/' + username + '/follow')
      .pipe(takeUntil(this.unsubscribe));
  }

}
