import { withRouter } from '../../hocs/withRouter';
import Block from '../../utils/Block';
import template from './profile-form.hbs';
import wrench from '../../static/icons/wrench.svg';
import shild from '../../static/icons/shild.svg';
import person from '../../static/icons/person.svg';
import arrowBack from '../../static/icons/arrow_back.svg';

interface ProfileFormProps {
  edit?: boolean,
  profile?: boolean,
  password?: boolean,
  btnText?: string,
  isDisabled?: boolean,
  avatar?: string,
  onClick: () => {},
}

export class BaseProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    super({
      ...props,
    });

    this.setProps({
      onClickBack: () => this.navigate(),
      onClickToChats: () => this.navigate(),
    });
  }

  navigate() {
    if (!this.props.router){
      return;
    }
    this.props.profile ? this.props.router.go('/messenger') : this.props.router.back();
  }

  render() {
    return this.compile(template, {
      ...this.props,
      children: this.children,
      edit: this.props.edit,
      profile: this.props.profile,
      password: this.props.password,
      btnText: this.props.btnText,
      isDisabled: this.props.isDisabled,
      onClick: this.props.onClick,
      onClickBack: this.props.onClickBack,
      wrench: wrench,
      shild: shild,
      person: person,
      arrowBack: arrowBack,
    });
  }
}

export const ProfileForm = withRouter(BaseProfileForm);
