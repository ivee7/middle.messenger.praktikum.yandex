import Block from '../../utils/Block';
import template from './burger.hbs';
import store from '../../utils/Store';

export class Burger extends Block {
  constructor() {
    super({
      events: {
        click: () => this._onOpenBar(),
      },
    });
  }

  private _onOpenBar() {
    store.set('barStatus', true);
  }

  render() {
    return this.compile(template, {});
  }
}
