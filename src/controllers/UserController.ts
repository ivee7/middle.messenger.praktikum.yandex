import store from '../utils/Store';
import router from '../utils/Router';
import API, { PasswordToChange, UserApi } from '../api/UserAPI';
import AuthController from './AuthController';
import { User } from '../api/AuthAPI';

export class UserController {
  private readonly api: UserApi;

  constructor() {
    this.api = API;
  }

  async changeProfile(data: any) {
    try {
      await this.api.changeProfile(data);

      await AuthController.fetchUser()

    } catch (e: any) {
      console.log(e.reason);
    }
  }

  async changePassword(data: PasswordToChange) {
    try {
      await this.api.changePassword(data);

      await AuthController.fetchUser()

    } catch (e: any) {
      console.log(e.reason);
    }
  }

  public async searchUser(login: string) {
    try {
      return await this.api.searchUser(login) as unknown as User[];
    } catch (error) {
      console.error(error)
    }
  }

  public async uploadAvatar(avatar: FormData) {
    try {
      const response: any = await this.api.changeAvatar(avatar);
      store.set('user.avatar', response.avatar);
    } catch (error) {
      console.error(error)
    }
  }

  public async logout() {
    try {
      await this.api.logout();

      router.go('/');
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserController();
