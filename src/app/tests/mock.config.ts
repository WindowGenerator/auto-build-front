import {testProfile, testUser, testUsers} from './mocks';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {User} from '../core/models';


const loginUserSuccess = (user: User, request: HttpRequest<any>) => {
  return function (_request: HttpRequest<any>) {
    return of(new HttpResponse({status: 200, body: user}));
  };
};

const loginUnauthorized = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 401, statusText: 'Пользователь не авторизован',
  }));
};

const loginForbidden = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 403, statusText: 'У пользователя нет прав на это действие',
  }));
};

const getUser = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testUser,
  }));
};

const updateUser = (user: User, oldUser: User, request: HttpRequest<any>) => {
  return function (_request: HttpRequest<any>) {
    return of(new HttpResponse({status: 200, body: {...oldUser, ...user}}));
  };
};

const registerUser = (request: HttpRequest<any>) => {
  const userFields = JSON.parse(request.body).user;
  return of(new HttpResponse({
    status: 200, body: {...testUser, ...userFields},
  }));
};

const getProfile = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testProfile,
  }));
};

const extractIdPathParamFromUrl = (requestUrl: URL) => {
  return getNeededPartFromApiPath(requestUrl).split('/').pop();
};

const getNeededPartFromApiPath = (requestUrl: URL) => {
  return requestUrl.pathname.split('api/').pop();
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  const neededPartFromApiPath = getNeededPartFromApiPath(requestUrl);

  switch (request.method) {
    case 'GET':
      if (neededPartFromApiPath === 'user') {
        return getUser;
      }
      if (neededPartFromApiPath.indexOf('profiles') !== -1) {
        return getProfile;
      }
      return null;
    case 'POST':
      if (neededPartFromApiPath === 'users/login') {

        const body = JSON.parse(request.body);
        if (!testUsers.has(body.email)) {
          return loginUnauthorized;
        }
        return loginUserSuccess(testUsers.get(body.email), request);

      }
      if (neededPartFromApiPath === 'users/register') {

        const body = JSON.parse(request.body);
        if (testUsers.has(body.email)) {
          return loginForbidden;
        }
        testUsers.set(body.email, body);
        return registerUser;
      }
      return null;
    case 'PUT':
      if (neededPartFromApiPath === 'user') {
        const body = JSON.parse(request.body);

        if (!testUsers.has(body.email)) {
          return loginUnauthorized;
        }

        return updateUser(testUsers.get(body.email), body, request);
      }
      return null;
    default:
      return null;
  }
};
