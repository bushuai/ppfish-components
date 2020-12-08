import * as React from 'react';
import classNames from 'classnames';
import omit from 'omit.js';

export interface ContainerProps {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  prefixCls?: string;
  style?: React.CSSProperties
}

const Container = (props: ContainerProps) => {
  const { children, className = '', prefixCls = 'fishd-spin', style } = props;
  const otherProps = omit(props, [
    'className',
    'prefixCls',
  ]);
  const classString = classNames(`${prefixCls}-container`, className);
  return (
    <div {...otherProps} className={classString} style={{style}}>
      {children}
    </div>
  );
};

export default Container;
