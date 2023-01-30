import Block from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
  text: string;
  type?: string;
  dataDimmer?: string;
  onClick?: () => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      dataDimmer: props.dataDimmer,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      type: this.props.type,
      dataDimmer: this.props.dataDimmer,
    });
  }
}
