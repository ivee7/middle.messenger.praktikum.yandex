import Block from '../../utils/Block';
import template from './click-menu.hbs';

export interface ClickMenuObj {
  iconName?: string,
  text?: string
}

interface ClickMenuProps {
  list: Array<ClickMenuObj>;
}

export class ClickMenu extends Block {
  constructor(props: ClickMenuProps) {
    super({
      list: props.list,
    });
  }

  render() {
    return this.compile(template, {
      list: this.props.list,
    });
  }
}
