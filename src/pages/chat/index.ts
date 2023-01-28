import Block from '../../utils/Block';
import template from './chat.hbs';

export class Chat extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            children: this.children,
        });
    }
}
