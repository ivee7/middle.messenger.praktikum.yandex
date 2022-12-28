import Block from '../../utils/Block';
import template from './approve-exit.hbs';

export class ApproveExit extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {
      children: this.children,
    });
  }
}