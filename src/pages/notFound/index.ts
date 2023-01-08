import Block from '../../utils/Block';
import template from './not-found.hbs';
import notFoundErrorImage from '../../static/images/404.png';

export class NotFound extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            children: this.children,
            notFoundErrorImage: notFoundErrorImage,
        });
    }
}
