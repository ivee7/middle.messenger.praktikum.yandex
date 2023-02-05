import Block from '../../../utils/Block';
import template from './add-user.hbs';

interface AddUserProps {
  onClose: () => void;
  onSend: () => void;
}

export class AddUser extends Block {
  constructor(props: AddUserProps) {
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
