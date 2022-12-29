import Block from '../../utils/Block';
import template from './add-user.hbs';

export class AddUser extends Block {
  render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}
