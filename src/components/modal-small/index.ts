import Block from '../../utils/Block';
import template from './modal-small.hbs';

interface ModalSmallProps {
    colorTitle: string;
    title: string;
    text: string;
    btnText: string;
    input?: boolean;
    exit?: boolean;
}

export class ModalSmall extends Block {
  constructor(props: ModalSmallProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, {
      children: this.children,
      title: this.props.title,
      colorTitle: this.props.colorTitle,
      text: this.props.text,
      btnText: this.props.btnText,
      input: this.props.input,
      exit: this.props.exit,
    });
  }
}