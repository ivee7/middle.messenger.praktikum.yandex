import Block from '../../utils/Block';
import template from './message.hbs';
import checksSvg from '../../static/icons/checks.svg';

interface MessageProps {
  content: string;
  time: string;
  is_read: boolean;
  not_mine: boolean;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      content: props.content,
      time: props.time,
      is_read: props.is_read,
      not_mine: props.not_mine,
    });
  }

  render() {
    return this.compile(template, {
      content: this.props.content,
      time: this.props.time.match(/\b[0-2]?\d:[0-5]\d\b/),
      is_read: this.props.is_read,
      not_mine: this.props.not_mine,
      checksSvg: checksSvg,
    });
  }
}
