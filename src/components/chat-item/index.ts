import Block from '../../utils/Block';
import template from './chat-item.hbs';
import Avatar from '../../static/icons/person.svg';
import Checks from '../../static/icons/checks.svg';

export interface ChatItemProps {
  active?: string;
  image?: string;
  name: string;
  outgoing?: boolean;
  time: string | Date;
  count: number | string;
  lastMessage: string;
  number: string | number;
}
export class ChatItem extends Block {
  constructor(props: ChatItemProps) {
    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, {
      active: this.props.active,
      name: this.props.name,
      image: this.props.image,
      outgoing: this.props.outgoing,
      time: this.props.time,
      count: this.props.count,
      lastMessage: this.props.lastMessage,
      number: this.props.number,
      avatarImage: Avatar,
      checksImage: Checks,
    });
  }
}
