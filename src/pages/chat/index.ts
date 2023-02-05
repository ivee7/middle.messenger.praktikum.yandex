import dotsSvg from '../../static/icons/dots.svg';
import routeSvg from '../../static/icons/route.svg';
import plusSvg from '../../static/icons/plus.svg';
import minusSvg from '../../static/icons/minus.svg';
import binSvg from '../../static/icons/bin.svg';
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
            onDelete: this.onDelete.bind(this),
            onAddUser: this._onAddUser.bind(this),
            onDeleteUser: this._onDeleteUser.bind(this),
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
        const input = content.querySelector('.input')

        if (Validator.validate(input, 'required')) {
          return;
        }

        const inputField = input.querySelector('.val__field');

        ChatsController.create(inputField.value);

        store.set('isCreateChatModalOpen', false);
    }

    onDelete() {
      ChatsController.delete(store.getState().chat.activeChat.info.id);

      store.set('isClickMenuOpen', false);
    }

    private _onAddUser(content: any) {
      const input = content.querySelector('.input')

      if (Validator.validate(input, 'required')) {
        return;
      }

      const userName: string = input.querySelector('.val__field').value;

      ChatsController.addUser(userName, store.getState().chat.activeChat.info.id);

      store.set('isAddUserModalOpen', false);
    }

    private _onDeleteUser(content: any) {
      const input = content.querySelector('.input')

      if (Validator.validate(input, 'required')) {
        return;
      }

      const userName: string = input.querySelector('.val__field').value;

      ChatsController.deleteUser(userName, store.getState().chat.activeChat.info.id);

      store.set('isDeleteUserModalOpen', false);
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
            plusSvg: plusSvg,
            minusSvg: minusSvg,
            binSvg: binSvg,
            chatTitle: this.props.activeChat?.info.title || '',
            onSendMessage: this.props.onSendMessage,
            onCreate: this.props.onCreate,
            onDelete: this.props.onDelete,
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
