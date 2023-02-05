import Block from '../../../utils/Block';
import template from './edit-profile.hbs';
import Validator from '../../../utils/Validator';
import UserController from '../../../controllers/UserController';
import AuthController from '../../../controllers/AuthController';
import store, { withStore } from '../../../utils/Store';

class BaseEditProfile extends Block {
  constructor() {
    super();
    this.setProps({
      onClick: this._onChangeData.bind(this),
      onAvatarClick: this._onAvatarChangeClick.bind(this),
      onAvatarUpload: this._onAvatarUpload.bind(this),
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

  private _onAvatarChangeClick(e: Event) {
    if (store.getState()['isChangeAvatar']) {
      e.stopPropagation();

      let target = e.target as HTMLAnchorElement;

      if (target.dataset.dimmer === 'true') {
          store.set('isChangeAvatar', false);
      }
    } else {
      store.set('isChangeAvatar', true);
    }
  }

  _onAvatarUpload(content: any) {
    if (!content) {
      return;
    }

    const formData = new FormData(content);

    UserController.uploadAvatar(formData);
  }

  render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      onClick: this.props.onClick,
      onAvatarClick: this.props.onAvatarClick,
      onAvatarUpload: this.props.onAvatarUpload,
    });
  }
}

const withUser = withStore((state) => ({
  ...state.user,
  isChangeAvatar: state.isChangeAvatar,
}));

export const EditProfile = withUser(BaseEditProfile);
