import Block from '../../../utils/Block';
import template from './profile.hbs';
import { withStore } from '../../../utils/Store';
import AuthController from '../../../controllers/AuthController';

class BaseProfile extends Block {
    constructor() {
        super();
    }

    init(): void {
        AuthController.fetchUser();
    }

    render() {
        return this.compile(template, {
            ...this.props,
            children: this.children,
            avatar: `https://ya-praktikum.tech/api/v2/resources/${this.props.avatar}`,
        });
    }
}

const withUser = withStore((state) => ({ ...state.user }))

export const Profile = withUser(BaseProfile);
