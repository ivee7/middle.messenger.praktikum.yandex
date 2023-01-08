import Block from '../../utils/Block';
import template from './main-chat.hbs';
import dotsSvg from '../../static/icons/dots.svg';
import routeSvg from '../../static/icons/route.svg';
import binSvg from '../../static/icons/bin.svg';
import plusSvg from '../../static/icons/plus.svg';
import minusSvg from '../../static/icons/minus.svg';
import filesSvg from '../../static/icons/files.svg';

export class MainChat extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            children: this.children,
            dotsSvg: dotsSvg,
            routeSvg: routeSvg,
            binSvg: binSvg,
            plusSvg: plusSvg,
            minusSvg: minusSvg,
            filesSvg: filesSvg,
        });
    }
}
