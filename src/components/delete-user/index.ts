import Block from '../../utils/Block';
import template from './delete-user.hbs';

export class DeleteUser extends Block {
  render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}
