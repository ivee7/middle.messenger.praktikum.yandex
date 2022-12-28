import Block from '../../utils/Block';
import template from './burger.hbs';

export class Burger extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {});
  }
}
