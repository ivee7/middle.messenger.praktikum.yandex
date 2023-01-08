import Block from '../../utils/Block';
import template from './profile.hbs';

export class Profile extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            children: this.children,
        });
    }
}
