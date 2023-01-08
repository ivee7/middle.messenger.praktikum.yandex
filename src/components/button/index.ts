import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
  text: string;
  type?: string;
  onClick?: () => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      text: props.text,
      type: props.type,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      type: this.props.type,
    });
  }
}
