import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AbstractCheckboxProps } from '../Checkbox/Checkbox';
import Radio from './Radio';
import { RadioChangeEvent } from './interface';

export type RadioButtonProps = AbstractCheckboxProps<RadioChangeEvent>;
// case sensitive
export default class RadioButton extends React.Component<RadioButtonProps, any> {
  static defaultProps = {
    prefixCls: 'fishd-radio-button'
  };

  static contextTypes = {
    radioGroup: PropTypes.any
  };

  render() {
    const radioProps: RadioButtonProps = { ...this.props };
    if (this.context.radioGroup) {
      radioProps.onChange = this.context.radioGroup.onChange;
      radioProps.checked = this.props.value === this.context.radioGroup.value;
      radioProps.disabled = this.props.disabled || this.context.radioGroup.disabled;
    }

    return <Radio {...radioProps} />;
  }
}
