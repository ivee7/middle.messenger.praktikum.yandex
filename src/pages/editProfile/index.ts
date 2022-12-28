import Block from '../../utils/Block';
import template from './edit-profile.hbs';
import Validator from '../../utils/Validator';

export class EditProfile extends Block {
  constructor() {
    super();
    this.setProps({
      onClick: this._onChangeData.bind(this),
    });
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
    console.log(data);
  }

  render() {
    return this.compile(template, {
      children: this.children,
      onClick: this.props.onClick,
    });
  }
}
