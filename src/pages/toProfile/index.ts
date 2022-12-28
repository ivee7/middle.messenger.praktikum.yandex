import Block from '../../utils/Block';
import template from './to-profile.hbs';
import dots from '../../static/icons/dots.svg';
import route from '../../static/icons/route.svg';
import person from '../../static/icons/person.svg';
import people from '../../static/icons/people.svg';
import bin from '../../static/icons/bin.svg';

export class ToProfile extends Block {
    constructor() {
        super();
    }

    render() {
        return this.compile(template, {
            dots: dots,
            route: route,
            person: person,
            people: people,
            bin: bin,
        });
    }
}
