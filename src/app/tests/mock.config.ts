import {getCurrentUserFromLocalStorage, getUserFromLocalStorage, setUserToLocaleStorage, testProfile, testUser} from './mocks';
import {HttpErrorResponse, HttpRequest, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {InputUser, User} from '../core/models';


const loginUserSuccess = (user: InputUser, request: HttpRequest<any>) => {
  const loginUser = getUserFromLocalStorage(user.email);

  if (!getUserFromLocalStorage(user.email)) {
    return loginUnauthorized;
  }

  if (user.password !== loginUser.token) {
    return loginUnauthorized;
  }

  return function (_request: HttpRequest<any>) {
    return of(new HttpResponse({status: 200, body: loginUser}));
  };
};

const loginUnauthorized = (request: HttpRequest<any>) => {
  return of(new HttpErrorResponse({
    status: 401, statusText: 'Пользователь не авторизован',
  }));
};

const loginForbidden = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 403, statusText: 'У пользователя нет прав на это действие',
  }));
};

const getUser = (request: HttpRequest<any>) => {
  const user = getCurrentUserFromLocalStorage();
  return of(new HttpResponse({
    status: 200, body: user || {} as User,
  }));
};

const updateUser = (updateUserFields: InputUser, request: HttpRequest<any>) => {
  const oldUser = getCurrentUserFromLocalStorage();
  const userWithToken = {...oldUser, ...updateUserFields, token: updateUserFields.password};

  setUserToLocaleStorage(userWithToken);

  return function (_request: HttpRequest<any>) {
    return of(new HttpResponse({
      status: 200, body: userWithToken
    }));
  };
};

const registerUser = (user: InputUser, request: HttpRequest<any>) => {

  if (getUserFromLocalStorage(user.email)) {
    return loginForbidden;
  }

  const userFields = JSON.parse(request.body).user;

  const userWithToken = {...testUser, ...userFields, token: userFields.email};
  setUserToLocaleStorage(userWithToken);

  return function (_request: HttpRequest<any>) {
    return of(new HttpResponse({
      status: 200, body: userWithToken
    }));
  };
};

const getProfile = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testProfile,
  }));
};

const getNeededPartFromApiPath = (requestUrl: URL) => {
  return requestUrl.pathname.split('api/').pop();
};

export const selectHandler = (request: HttpRequest<any>) => {
  const requestUrl = new URL(request.url);
  const neededPartFromApiPath = getNeededPartFromApiPath(requestUrl);

  switch (request.method) {
    case RequestMethods.GET:
      if (neededPartFromApiPath === 'user') {
        return getUser;
      }
      if (neededPartFromApiPath.indexOf('profiles') !== -1) {
        return getProfile;
      }
      return null;
    case RequestMethods.POST:
      if (neededPartFromApiPath === 'users/login') {

        const body = JSON.parse(request.body).user;
        return loginUserSuccess(body, request);

      }
      if (neededPartFromApiPath === 'users/register') {

        const body = JSON.parse(request.body).user;
        return registerUser(body, request);
      }
      return null;
    case RequestMethods.PUT:
      if (neededPartFromApiPath === 'user') {
        const body = JSON.parse(request.body).user;

        return updateUser(body, request);
      }
      return null;
    default:
      return null;
  }
};

enum RequestMethods {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  PATCH = 'PATCH'
}
