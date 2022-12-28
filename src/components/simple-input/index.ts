import Block from "../../utils/Block";
import template from "./simple-input.hbs";

interface SimpleInputProps {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  class?: string;
  isDisabled?: boolean;
  onFocus: () => void;
  onBlur: () => void;
}
export class SimpleInput extends Block {
  constructor(props: SimpleInputProps) {
    super({
      ...props,
      events: {
        blur: props.onBlur,
        focus: props.onFocus,
      },
    });
  }

  render() {
    return this.compile(template, {
      class: this.props.class,
      type: this.props.type,
      id: this.props.id,
      name: this.props.name,
      placeholder: this.props.placeholder,
      value: this.props.value,
      isDisabled: this.props.isDisabled,
    });
  }
}