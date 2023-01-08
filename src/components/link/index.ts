import Block from '../../utils/Block';
import template from './link.hbs';

interface LinkProps {
  text: string;
  to: string;
  linkClass?: string;
  linkType?: string;
  onClick?: () => void;
}

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      text: props.text,
      to: props.to,
      linkClass: props.linkClass,
      linkType: props.linkType,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      to: this.props.to,
      linkClass: this.props.linkClass,
      linkType: this.props.linkType,
    });
  }
}
