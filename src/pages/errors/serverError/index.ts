import Block from '../../../utils/Block';
import template from './server-error.hbs';
import serverErrorImage from '../../static/images/505.png';

export class ServerError extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            children: this.children,
            serverErrorImage: serverErrorImage,
        });
    }
}
