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
  name?: string,
  btnText?: string,
  isDisabled?: boolean,
  onClick: () => {},
}

export class ProfileForm extends Block {
  constructor(props: ProfileFormProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, {
      children: this.children,
      edit: this.props.edit,
      profile: this.props.profile,
      password: this.props.password,
      name: this.props.name,
      btnText: this.props.btnText,
      isDisabled: this.props.isDisabled,
      onClick: this.props.onClick,
      wrench: wrench,
      shild: shild,
      person: person,
      arrowBack: arrowBack,
    });
  }
}
