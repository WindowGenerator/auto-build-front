import {User} from '../core/models/user.model';
import {testUser} from './mocks';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';


const loginUser = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testUser
  }));
};
const getUser = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testUser
  }));
};
const updateUser = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testUser
  }));
};

const extractIdPathParamFromUrl = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  return requestUrl.pathname.split('/').pop();
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  const getOneRegexp: RegExp = new RegExp(`/countries/[0-9a-zA-Z]+`);
  switch (request.method) {
    case 'GET':
      const pathname = requestUrl.pathname;
      console.log(pathname);
      return null;
    default:
      return null;
  }
};
