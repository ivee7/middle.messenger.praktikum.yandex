import Block from '../../../utils/Block';
import template from './bar.hbs';
import store, { withStore } from '../../../utils/Store';
import AuthController from '../../../controllers/AuthController';
import person from '../../../static/icons/person.svg';
import people from '../../../static/icons/people.svg';
import bin from '../../../static/icons/bin.svg';

interface InputProps {
    onToggleCreateChatModal: () => void;
    onClose: () => void;
}

export class BaseBar extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
              click: props.onClose,
            },
        });

        this.setProps({
            onLogout: this._onLogout.bind(this),
        });
    }

    private _onLogout() {
        store.set('isBarOpen', false);

        AuthController.logout();
    }

    render() {
        return this.compile(template, {
          ...this.props,
          children: this.children,
          onToggleCreateChatModal: this.props.onToggleCreateChatModal,
          onLogout: this.props.onLogout,
          person: person,
          people: people,
          bin: bin,
          avatar: store.getState().user.avatar ? `https://ya-praktikum.tech/api/v2/resources/${store.getState().user.avatar}` : person,
        });
    }
}


const withActiveBar = withStore((state) => ({
      ...state,
      isBarOpen: state.isBarOpen,
}))

export const Bar = withActiveBar(BaseBar as typeof Block);