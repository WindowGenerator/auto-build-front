import {User} from '../../core/models';

export const testUser: User = {
  email: 'test@gmail.com',
  token: 'AAAAAAAAAAAAAAAAAAAaa',
  username: 'Иван Иванов',
};

export let testUsers: Map<string, User> = new Map();
