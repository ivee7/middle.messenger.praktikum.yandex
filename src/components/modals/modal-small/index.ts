import Block from '../../../utils/Block';
import template from './modal-small.hbs';

interface ModalSmallProps {
    colorTitle: string;
    title: string;
    text: string;
    btnText: string;
    input?: boolean;
    exit?: boolean;
    file?: boolean;
    onSend?: () => void;
}

export class ModalSmall extends Block {
  constructor(props: ModalSmallProps) {
    super({
      ...props,
    });
    this.setProps({
      onSendData: this.onSendData.bind(this, this.props.onSend)
    })
  }

  onSendData(onSend: (content: any) => void) {
    onSend && onSend(this.getContent())
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
      file: this.props.file,
      onSendData: this.props.onSendData
    });
  }
}
