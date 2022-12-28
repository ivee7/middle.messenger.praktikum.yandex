import Block from '../../utils/Block';
import template from './search.hbs';
import Magnifier from '../../static/icons/magnifier.svg';
import Cross from '../../static/icons/cross.svg';

export class Search extends Block {
  constructor() {
    super();
  }

  render() {
    return this.compile(template, {
      imageSrc: Magnifier,
      imageSrcTwo: Cross,
    });
  }
}