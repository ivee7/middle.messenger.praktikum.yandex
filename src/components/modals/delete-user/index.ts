import Block from '../../../utils/Block';
import template from './delete-user.hbs';

interface DeleteUserProps {
  onClose: () => void;
  onSend: () => void;
}

export class DeleteUser extends Block {
  constructor(props: DeleteUserProps) {
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
