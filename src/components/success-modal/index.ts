import Block from '../../utils/Block';
import template from './success-modal.hbs';

export class SuccessModal extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}
