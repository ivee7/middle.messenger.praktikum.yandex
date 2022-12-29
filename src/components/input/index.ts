import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import template from './input.hbs';

interface InputProps {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  defaultValue?: string;
  errorMessage?: string;
  validationType?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });

    this.setProps({
      onBlur: this.validateField.bind(this),
      onFocus: this.validateField.bind(this),
    });

    if (!props.validationType) {
      return;
    }
  }

  validateField() {
    const inputGroup = this.getContent();
    Validator.validate(inputGroup, this.props.validationType as string)
  }

  render() {
    return this.compile(template, {
      children: this.children,
      class: this.props.class,
      type: this.props.type,
      id: this.props.id,
      name: this.props.name,
      placeholder: this.props.placeholder,
      label: this.props.label,
      validationType: this.props.validationType,
      errorMessage: this.props.errorMessage,
      defaultValue: this.props.defaultValue,
      onBlur: this.props.onBlur,
      onFocus: this.props.onFocus,
    });
  }
}
