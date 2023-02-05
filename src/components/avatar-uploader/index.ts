import Block from '../../utils/Block';
import template from './avatar-uploader.hbs';

interface AvatarUploaderProps {
  onClick?: () => void;
}

export class AvatarUploader extends Block {
  constructor(props: AvatarUploaderProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render() {
    return this.compile(template, {});
  }
}
