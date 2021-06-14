import {User} from '../../core/models';

export const testUser: User = {
  email: 'test@gmail.com',
  token: 'AAAAAAAAAAAAAAAAAAAaa',
  username: 'Иван Иванов',
};

export function setUserToLocaleStorage(user: User): void {
  const stringUser = JSON.stringify(user);
  localStorage.setItem(user.email, stringUser);
  localStorage.setItem('current_user', stringUser);
}

export function getUserFromLocalStorage(email: string): User {
  const stringUser = localStorage.getItem(email);
  return JSON.parse(stringUser) as User;
}

export function getCurrentUserFromLocalStorage(): User | null {
  const stringCurrentUser = localStorage.getItem('current_user');
  const currentJWTtoken = window.localStorage['jwtToken'];

  if (!stringCurrentUser || !currentJWTtoken) {
    return null;
  }
  return JSON.parse(stringCurrentUser) as User;
}
