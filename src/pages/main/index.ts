import Block from '../../utils/Block';
import template from './main.hbs';

export class Main extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            children: this.children,
        });
    }
}
