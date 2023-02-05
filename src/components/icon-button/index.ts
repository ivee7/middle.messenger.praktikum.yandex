import Block from '../../utils/Block';
import template from './icon-button.hbs';

interface IconButtonProps {
    btnClass?: string;
    imgClass?: string;
    labelClass?: string;
    label?: string;
    type?: string;
    imageSrc?: string;
    onClick?: () => void;
}

export class IconButton extends Block {
    constructor(props: IconButtonProps) {
      super({
        ...props,
        events: {
          click: props.onClick,
        },
      });
    }

    render() {
      return this.compile(template, {
        btnClass: this.props.btnClass,
        imgClass: this.props.imgClass,
        labelClass: this.props.labelClass,
        label: this.props.label,
        type: this.props.type,
        imageSrc: this.props.imageSrc,
      });
    }
  }
