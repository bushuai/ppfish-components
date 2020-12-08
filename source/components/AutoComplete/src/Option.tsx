import * as React from 'react';
import PropTypes from 'prop-types';

export interface OptionProps {
  value: string | number
}

export default class Option extends React.Component<OptionProps, any> {
  static propTypes = {
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  };

  static isSelectOption = true;
}
