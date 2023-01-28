import Block from '../../../utils/Block';
import template from './edit-profile.hbs';
import Validator from '../../../utils/Validator';
import UserController from '../../../controllers/UserController';
import AuthController from '../../../controllers/AuthController';
import { withStore } from '../../../utils/Store';

class BaseEditProfile extends Block {
  constructor() {
    super();
    this.setProps({
      onClick: this._onChangeData.bind(this),
    });
  }

  protected init(): void {
    AuthController.fetchUser();
  }

  _onChangeData(e: Event) {
    e.preventDefault();
    const form = this.getContent().querySelector('form');

    if (!form) {
      return;
    }

    const inputGroups = form.querySelectorAll('.plain-input');
    const fields = form.querySelectorAll('.plain-input__field');
    const data: Record<string, unknown> = {};

    inputGroups.forEach((el: HTMLElement) => {
      const validationType = el.getAttribute('data-validation');

      Validator.validate(el, validationType as string);
    });

    Array.from(fields).forEach((el: HTMLInputElement) => {
      data[el.name] = el.value;
    });

    UserController.changeProfile(data);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      onClick: this.props.onClick,
      avatar: `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`,
    });
  }
}

const withUser = withStore((state) => ({ ...state.user }));

export const EditProfile = withUser(BaseEditProfile);
