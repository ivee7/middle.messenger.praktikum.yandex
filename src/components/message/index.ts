import Block from '../../utils/Block';
import template from './message.hbs';
import checksSvg from '../../static/icons/checks.svg';

interface MessageProps {
  text: string;
  time: string;
  outgoing: boolean;
}

export class Message extends Block {
  constructor(props: MessageProps) {
    super({
      text: props.text,
      time: props.time,
      outgoing: props.outgoing,
    });
  }

  render() {
    return this.compile(template, {
      text: this.props.text,
      time: this.props.time,
      outgoing: this.props.outgoing,
      checksSvg: checksSvg,
    });
  }
}
