import Block from '../../../utils/Block';
import template from './chats-list-item.hbs';
import avatarPlaceholder from '../../../static/icons/person.svg';
import checks from '../../../static/icons/checks.svg';
import store from '../../../utils/Store';
import { formatDate } from '../../../utils/helpers';

export interface ChatsListItemProps {
  id: number;
  title: string;
  author: string;
  content: string;
  time: string | Date;
  unreadCount: boolean;
  avatarSrc: string;
  onClick?: () => {};
}

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    })

    this.setProps({
      isActive: store.getState().chat.activeChat?.info.id === this.props.id
    })
  }

  render() {
    return this.compile(template, {
      children: this.children,
      id: this.props.id,
      title: this.props.title,
      author: this.props.author,
      content: this.props.content,
      time: this.props.time? formatDate(new Date(this.props.time as string)) : '',
      unreadCount: this.props.unreadCount,
      avatarSrc: this.props.avatarSrc || avatarPlaceholder,
      isActive: this.props.isActive,
      checksImage: checks,
    });
  }
}
