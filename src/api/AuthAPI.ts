import HTTPTransport from '../utils/HTTPTransport';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  avatar: string;
}

export class AuthAPI {
  protected http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport('/auth');
  }

  signin(data: SigninData) {
    return this.http.post('/signin', data);
  }

  signup(data: SignupData): Promise<{ id: number }> {
    return this.http.post('/signup', data);
  }

  read(): Promise<User> {
    return this.http.get('/user');
  }

  logout() {
    return this.http.post('/logout');
  }
}

export default new AuthAPI();
