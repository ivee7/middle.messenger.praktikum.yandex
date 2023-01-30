import Block from '../../../utils/Block';
import template from './create-chat.hbs';

interface CreateChatProps {
  onClose: () => void;
  onSend: () => void;
}

export class CreateChat extends Block {
  constructor(props: CreateChatProps) {
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
      onClose: this.props.onClose,
      onSend: this.props.onSend,
    });
  }
}
