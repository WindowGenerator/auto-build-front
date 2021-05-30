import {testUser, testProfile} from './mocks';
import {HttpRequest, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';


const profilesRegex = (new RegExp(`profiles/[0-9a-zA-Z]+`)).compile();


const loginUser = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testUser,
  }));
};
const getUser = (request: HttpRequest<any>) => {
  return of(new HttpResponse({
    status: 200, body: testUser,
  }));
};
const updateUser = (request: HttpRequest<any>) => {
  const userFields = JSON.parse(request.body).user;

  return of(new HttpResponse({
    status: 200, body: {...testUser, ...userFields},
  }));
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
      // if (profilesRegex.test(neededPartFromApiPath)) {
      //   return getProfile;
      // }
      return null;
    case 'POST':
      if (neededPartFromApiPath === 'users/login') {
        return loginUser;
      } if (neededPartFromApiPath === 'users/register') {
        return registerUser;
      }
      return null;
    case 'PUT':
      if (neededPartFromApiPath === 'user') {
        return updateUser;
      }
      return null;
    default:
      return null;
  }
};
