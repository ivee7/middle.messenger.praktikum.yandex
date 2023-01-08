import Block from '../../utils/Block';
import template from './error.hbs';

interface ErrorProps {
    code: string;
    message: string;
    imageSrc: string;
}

export class Error extends Block {
  constructor(props: ErrorProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, {
      children: this.children,
      code: this.props.code,
      message: this.props.message,
      imageSrc: this.props.imageSrc,
    });
  }
}
