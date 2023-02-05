import Block from '../../utils/Block';
import template from './burger.hbs';

interface BurgerProps {
  onClick: () => void;
}

export class Burger extends Block {
  constructor(props: BurgerProps) {
    super({
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}
