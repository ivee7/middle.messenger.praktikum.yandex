import HTTPTransport from '../utils/HTTPTransport';

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

export type ChangeProfileData = Omit<User, 'avatar' | 'id'>

export interface PasswordToChange {
  oldPassword: string;
  newPassword: string;
}

export class UserApi {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport('/user');
  }

  public changeProfile(data: ChangeProfileData) {
    return this.http.put('/profile', data);
  }

  public changeAvatar(data: FormData) {
    return this.http.put<User>('/profile/avatar', data, {});
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
}

export default new UserApi();
