import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';

export class AuthController {
  private readonly api: AuthAPI;

  constructor() {
    this.api = API;
  }

  async signin(data: SigninData) {
    try {
      await this.api.signin(data);

      router.go('/settings');
    } catch (e: any) {
      console.log(e.message);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/settings');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
      const user = await this.api.read();
      store.set('user', user);
      console.log(store);
  }

  async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
