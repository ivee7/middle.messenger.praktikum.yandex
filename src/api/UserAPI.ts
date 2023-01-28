import BaseAPI from './BaseAPI';

interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface PasswordToChange {
  oldPassword: string;
  newPassword: string;
}

export class UserApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  public changeProfile(data: any) {
    return this.http.put('/profile', data);
  }


  public changeAvatar(data: any) {
    return this.http.put('/profile/avatar', data, {});
  }

  public searchUser(login: string) {
    return this.http.post(`/search`,  {
      login: login
    });
  }

  public changePassword(data: PasswordToChange) {
    return this.http.put('/password', data);
  }

  public getUserById(id: string): Promise<User> {
    return this.http.get(`/${id}`);
  }

  public logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UserApi();
