import Block from '../../utils/Block';
import Validator from '../../utils/Validator';
import template from './plain-input.hbs';

interface PlainInputProps {
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  validationType?: string;
  value?: string;
  defaultValue?: string;
  isDisabled?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export class PlainInput extends Block {
  constructor(props: PlainInputProps) {
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
      value: this.props.value,
      defaultValue: this.props.defaultValue,
      isDisabled: this.props.isDisabled,
      onBlur: this.props.onBlur,
      onFocus: this.props.onFocus,
    });
  }
}
