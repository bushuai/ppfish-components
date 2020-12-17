import * as React from 'react';
import omit from 'omit.js';
import classNames from 'classnames';
import { polyfill } from 'react-lifecycles-compat';

import TextArea, { TextAreaProps } from './TextArea';

function countValue(value: string) {
  return value.length;
}

export interface CounterProps extends TextAreaProps {
  inputPrefixCls?: string;
  prefixCls?: string;
  limit: number;
  count?: (value: string) => number;
  value: any;
  defaultValue: any;
}

export interface CounterState {
  value?: any;
  prevProps: CounterProps;
}

class Counter extends React.Component<CounterProps, CounterState> {
  static defaultProps = {
    inputPrefixCls: 'fishd-input',
    prefixCls: 'fishd-input-counter'
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const newState: CounterState = { prevProps: nextProps };
    if (prevProps.value !== nextProps.value) {
      newState.value = nextProps.value;
    }

    return newState;
  }

  constructor(props) {
    super(props);
    let value = '';
    if ('value' in props) {
      value = props.value;
    } else if ('defaultValue' in props) {
      value = props.defaultValue;
    }
    this.state = {
      value,
      prevProps: props
    };
  }

  private textarea: TextArea;

  focus() {
    this.textarea.focus();
  }

  blur() {
    this.textarea.blur();
  }

  saveTextarea = (node: TextArea) => {
    this.textarea = node;
  };

  getTextAreaClassName() {
    const { inputPrefixCls, className, disabled } = this.props;
    return classNames(inputPrefixCls, className, {
      [`${inputPrefixCls}-disabled`]: disabled
    });
  }

  handleClick = () => {
    this.focus();
  };

  handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { onChange } = this.props;
    const textareaValue = this.textarea && this.textarea.textAreaRef.value;
    this.setState({
      value: textareaValue
    });
    if (onChange) {
      onChange(e);
    }
  };

  getCount = () => {
    const { count } = this.props;
    const value = this.state.value;
    if (!value) {
      return 0;
    }
    // 自定义计数方法
    if (count) {
      return count(String(value));
    }
    return countValue(String(value));
  };

  render() {
    const { inputPrefixCls, className, prefixCls, disabled, limit } = this.props;
    const inputClassName = classNames(className, {
      [`${prefixCls}`]: true,
      [`${inputPrefixCls}-disabled`]: disabled
    });
    const textareaClassName = classNames(inputPrefixCls, className);
    const otherProps = omit(this.props, [
      'inputPrefixCls',
      'prefixCls',
      'limit',
      'count',
      'value',
      'onChange'
    ]);
    const total = this.getCount();
    return (
      <span className={inputClassName} onClick={this.handleClick}>
        <TextArea
          {...otherProps}
          className={textareaClassName}
          maxLength={limit}
          onChange={this.handleTextareaChange}
          value={this.state.value}
          ref={this.saveTextarea}
        />
        <span className={`${prefixCls}-footer`}>
          <span className={`${prefixCls}-indicator`}>
            {total}/{limit}
          </span>
        </span>
      </span>
    );
  }
}

polyfill(Counter);

export default Counter;
