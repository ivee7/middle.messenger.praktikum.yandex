import Block from '../../../utils/Block';
import template from './mistake.hbs';

export class Mistake extends Block {
    render() {
        return this.compile(template, {
            children: this.children,
        });
    }
}
