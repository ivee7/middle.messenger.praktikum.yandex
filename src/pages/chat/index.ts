import dotsSvg from '../../static/icons/dots.svg';
import routeSvg from '../../static/icons/route.svg';
import Block from '../../utils/Block';
import template from './chat.hbs';
import ChatsController from '../../controllers/ChatsController';
import store, { withStore } from '../../utils/Store';
import Validator from '../../utils/Validator';

export class BaseChat extends Block {
    constructor() {
        super();
        this.setProps({
            onToggleBar: this._onToggleModal.bind(this, 'isBarOpen'),
            onToggleCreateChatModal: this._onToggleModal.bind(this, 'isCreateChatModalOpen'),
            onToggleAddUserModal: this._onToggleModal.bind(this, 'isAddUserModalOpen'),
            onToggleDeleteUserModal: this._onToggleModal.bind(this, 'isDeleteUserModalOpen'),
            onToggleClickMenu: this._onToggleClickMenu.bind(this),
            onCreate: this.onCreate.bind(this),
            onAddUser: this._onAddUser.bind(this),
            // onDeleteUser: this._onDeleteUser.bind(this),
            onSendMessage: this._onSendMessage.bind(this),
        });
    }

    private _onToggleClickMenu(e: Event) {
      e.stopPropagation();

      if (store.getState()['isClickMenuOpen']) {
        store.set('isClickMenuOpen', false);
      } else {
        store.set('isClickMenuOpen', true);
      }
    }

    private _onToggleModal(status: string, e: Event) {
      if (store.getState()[`${status}`]) {
        e.stopPropagation();

        let target = e.target as HTMLAnchorElement;

        if (target.dataset.dimmer === 'true') {
            store.set(status, false);
        }
      } else {
        store.set(status, true);
      }
    }

    private _onSendMessage(e: Event) {
      e.preventDefault()
      const input = this.getContent().querySelector('.main__input-typer') as HTMLInputElement;
      const value = input.value;
      if  (!value) {
        return;
      }
      ChatsController.sendMessage(value, store.getState().chat.activeChat.info.id)
    }

    onCreate(content: any) {
        const data = {
          title: '',
        };
        const input = content.querySelector('input')

        if (!input.value) {
          return;
        }
        data.title = input.value
        ChatsController.create(input.value)
        store.set('isCreateChatModalOpen', false);
    }

    private _onAddUser(content: any) {
      const input = content.querySelector('input')

      if (Validator.validate(input, 'required')) {
        return;
      }

      const userName: string = input.value

      ChatsController.addUser(userName, store.getState().chat.selectedChat.info.id);

      store.set('isAddUserModalOpen', false);
    }

    protected init(): void {
        ChatsController.get();
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            dotsSvg: dotsSvg,
            routeSvg: routeSvg,
            chatTitle: this.props.activeChat?.info.title || '',
            onSendMessage: this.props.onSendMessage,
            onCreate: this.props.onCreate,
            onAddUser: this.props.onAddUser,
            onDeleteUser: this.props.onDeleteUser,
            onToggleBar: this.props.onToggleBar,
            onToggleCreateChatModal: this.props.onToggleCreateChatModal,
            onToggleClickMenu: this.props.onToggleClickMenu,
        });
    }
}

const withChat = withStore((state) => ({
  ...state.chat ,
  isBarOpen: state.isBarOpen,
  isCreateChatModalOpen: state.isCreateChatModalOpen,
  isAddUserModalOpen: state.isAddUserModalOpen,
  isDeleteUserModalOpen: state.isDeleteUserModalOpen,
  isClickMenuOpen: state.isClickMenuOpen,
}))

export const Chat = withChat(BaseChat);
