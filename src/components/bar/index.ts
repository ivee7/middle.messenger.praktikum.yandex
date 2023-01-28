import Block from '../../utils/Block';
import template from './bar.hbs';
import store, { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import person from '../../static/icons/person.svg';
import people from '../../static/icons/people.svg';
import bin from '../../static/icons/bin.svg';

export class BaseBar extends Block {
    constructor() {
        super({
            events: {
              click: (e: Event) => this._onCloseBar(e),
            },
        });

        this.setProps({
            onLogout: this._onLogout.bind(this),
        });
    }

    private _onCloseBar(e: Event) {
        e.stopPropagation();

        let target = e.target as HTMLAnchorElement;

        if (target.classList.contains('main__dimmer')) {
            store.set('barStatus', false);
        }
    }

    private _onLogout() {
        store.set('barStatus', false);

        AuthController.logout();
    }

    render() {
        return this.compile(template, {
          ...this.props,
          children: this.children,
          onLogout: this.props.onLogout,
          person: person,
          people: people,
          bin: bin,
        });
    }
}


const withActiveBar = withStore((state) => {
    return {
      isBarActive: state.barStatus,
    };
});

export const Bar = withActiveBar(BaseBar);