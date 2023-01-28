import Block from '../../utils/Block';
import template from './messages.hbs';
import { withStore } from '../../utils/Store';

export class MessagesBase extends Block {
    constructor(props: any) {
        super(props);
    }

    render() {
        return this.compile(template, {
          ...this.props
        });
    }
}

const withActiveChatMessages = withStore(state => {

    const activeChatId = state.chat.activeChat.info.id;

    if (!activeChatId) {
      return {
        messages: [],
      };
    }

    return {
      messages: (state.messages || {})[activeChatId] || [],
    };
});

export const Messages = withActiveChatMessages(MessagesBase);
