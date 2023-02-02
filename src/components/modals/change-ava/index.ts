import Block from '../../../utils/Block';
import template from './change-ava.hbs';

interface ChangeAvaProps {
  onClose: () => void;
  onSend: () => void;
}

export class ChangeAva extends Block {
  constructor(props: ChangeAvaProps) {
    super({
        ...props,
        events: {
          click: props.onClose,
        },
    });
  }

  render() {
    return this.compile(template, {
      children: this.children,
      onSend: this.props.onSend,
    });
  }
}
