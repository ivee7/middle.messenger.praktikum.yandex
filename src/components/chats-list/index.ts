import { ChatData } from '../../api/ChatAPI';
import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/Block';
import store, { withStore } from '../../utils/Store';
import template from './chats-list.hbs';

export class BaseChatsList extends Block {
    constructor(props: any) {
        super(props);
        this.setProps({
            onChooseChat: this._onChooseChat.bind(this),
        });
    }

    private _onChooseChat(e: Event) {
        e.stopPropagation();

        const target = e.currentTarget as HTMLAnchorElement;

        if (target.hasAttribute('data-chat-id')) {
            const chatID = Number(target.getAttribute('data-chat-id'));

            const state = store.getState();
            const currentChat = state.chat.list.find((item: ChatData) => item.id === chatID);
            const userID = state.user?.id;

            if (chatID && userID) {
              store.set('chat.activeChat.info', currentChat);
              ChatsController.refetch()
              this.setProps({
                messages: store.getState().messages[chatID]
              })
            }
        }
    }

    render() {
        return this.compile(template, {
          ...this.props,
          children: this.children,
          onChooseChat: this.props.onChooseChat,
        });
    }
}

const withActiveChatMessages = withStore(state => {
    return {
      list: (state.chat || {})['list'] || [],
    };
});

export const ChatsList = withActiveChatMessages(BaseChatsList);
