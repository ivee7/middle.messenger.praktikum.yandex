import Block from '../../utils/Block';
import template from './add-user.hbs';

export class AddUser extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}
