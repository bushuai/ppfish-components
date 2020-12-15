import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {polyfill} from 'react-lifecycles-compat';

import Color from './helpers/color';
import percentage from './helpers/percentage';
import { PickedColor } from './Board';
import { ModeTypes } from './Panel';

const modesMap = ['RGB', 'HSB'];

interface ParamsProps {
  alpha: number
  color: PickedColor
  enableAlpha: boolean
  enableHistory: boolean
  mode: ModeTypes

  onAlphaChange: (alpha: number) => void
  onChange: (color: PickedColor, flag?: boolean) => void
  rootPrefixCls: string
}

interface ParamsState {
  color: PickedColor
  hex: string
  mode: ModeTypes
}

class Params extends React.Component<ParamsProps, ParamsState> {

  static propTypes = {
    alpha: PropTypes.number,
    color: PropTypes.object.isRequired,
    enableAlpha: PropTypes.bool,
    enableHistory: PropTypes.bool,
    mode: PropTypes.oneOf(modesMap),
    onAlphaChange: PropTypes.func,
    onChange: PropTypes.func,
    rootPrefixCls: PropTypes.string,
  };

  static defaultProps = {
    mode: modesMap[0],
    enableAlpha: true,
  };

  static getDerivedStateFromProps: React.GetDerivedStateFromProps<ParamsProps, ParamsState> = (nextProps, prevState) => {
    // @ts-ignore
    const newState: ParamsState = {}

    if ('color' in nextProps) {
      newState.color = nextProps.color;
      newState.hex = nextProps.color.hex;
    }
    return newState;
  }

  constructor(props) {
    super(props);

    // 管理 input 的状态
    this.state = {
      mode: props.mode,
      hex: props.color.hex,
      color: props.color, // instanceof tinycolor
    };
  }

  getChannelInRange = (value, index) => {
    const channelMap = {
      RGB: [[0, 255], [0, 255], [0, 255]],
      HSB: [[0, 359], [0, 100], [0, 100]],
    };
    const mode = this.state.mode;
    const range = channelMap[mode][index];
    let result = parseInt(value, 10);
    if (isNaN(result)) {
      result = 0;
    }
    result = Math.max(range[0], result);
    result = Math.min(result, range[1]);
    return result;
  };

  getPrefixCls = () => {
    return `${this.props.rootPrefixCls}-params`;
  };

  handleHexBlur = () => {
    const hex = this.state.hex;

    let color = null;

    if (Color.isValidHex(hex)) {
      color = new Color(hex);
    }

    if (color !== null) {
      this.setState({
        color,
        hex,
      });
      this.props.onChange(color, false);
    }
  };

  handleHexPress = event => {
    const hex = this.state.hex;
    if (event.nativeEvent.which === 13) {
      let color = null;

      if (Color.isValidHex(hex)) {
        color = new Color(hex);
      }

      if (color !== null) {
        this.setState({
          color,
          hex,
        });
        this.props.onChange(color, false);
      }
    }
  };

  handleHexChange = event => {
    const hex = event.target.value;

    this.setState({
      hex,
    });
  };

  handleModeChange = () => {
    let mode = this.state.mode;

    const modeIndex = (modesMap.indexOf(mode) + 1) % modesMap.length;

    mode = modesMap[modeIndex] as ModeTypes;

    this.setState({
      mode,
    });
  };

  handleAlphaHandler = event => {
    let alpha = parseInt(event.target.value, 10);

    if (isNaN(alpha)) {
      alpha = 0;
    }
    alpha = Math.max(0, alpha);
    alpha = Math.min(alpha, 100);

    this.props.onAlphaChange(alpha);
  };

  updateColorByChanel = (channel, value) => {
    const {color} = this.props;
    const {mode} = this.state;

    if (mode === 'HSB') {
      if (channel === 'H') {
        color.hue = parseInt(value, 10);
      } else if (channel === 'S') {
        color.saturation = parseInt(value, 10) / 100;
      } else if (channel === 'B') {
        color.brightness = parseInt(value, 10) / 100;
      }
    } else {
      if (channel === 'R') {
        color.red = parseInt(value, 10);
      } else if (channel === 'G') {
        color.green = parseInt(value, 10);
      } else if (channel === 'B') {
        color.blue = parseInt(value, 10);
      }
    }

    return color;
  };

  handleColorChannelChange = (index, event) => {
    const value = this.getChannelInRange(event.target.value, index);
    const {mode} = this.state;
    const channel = mode[index];

    const color = this.updateColorByChanel(channel, value);

    this.setState(
      {
        hex: color.hex,
        color,
      },
      () => {
        this.props.onChange(color, false);
      }
    );
  };

  render() {
    const prefixCls = this.getPrefixCls();

    const {enableAlpha, enableHistory} = this.props;
    const {mode, color} = this.state;
    const colorChannel = color[mode];

    if (mode === 'HSB') {
      colorChannel[0] = parseInt(colorChannel[0], 10);
      colorChannel[1] = percentage(colorChannel[1]);
      colorChannel[2] = percentage(colorChannel[2]);
    }

    const paramsClasses = classNames({
      [prefixCls]: true,
      [`${prefixCls}-has-history`]: enableHistory,
      [`${prefixCls}-has-alpha`]: enableAlpha,
    });

    return (
      <div className={paramsClasses}>
        <div className={`${prefixCls}-input`}>
          <input
            className={`${prefixCls}-hex`}
            type="text"
            maxLength={6}
            onKeyPress={this.handleHexPress}
            onBlur={this.handleHexBlur}
            onChange={this.handleHexChange}
            value={this.state.hex.toLowerCase()}
          />
          <input
            type="number"
            ref="channel_0"
            value={colorChannel[0]}
            onChange={this.handleColorChannelChange.bind(null, 0)}
          />
          <input
            type="number"
            ref="channel_1"
            value={colorChannel[1]}
            onChange={this.handleColorChannelChange.bind(null, 1)}
          />
          <input
            type="number"
            ref="channel_2"
            value={colorChannel[2]}
            onChange={this.handleColorChannelChange.bind(null, 2)}
          />
          {enableAlpha && (
            <input
              type="number"
              value={Math.round(this.props.alpha)}
              onChange={this.handleAlphaHandler}
            />
          )}
        </div>
        <div className={`${prefixCls}-lable`}>
          <label className={`${prefixCls}-lable-hex`}>Hex</label>
          <label className={`${prefixCls}-lable-number`} onClick={this.handleModeChange}>
            {mode[0]}
          </label>
          <label className={`${prefixCls}-lable-number`} onClick={this.handleModeChange}>
            {mode[1]}
          </label>
          <label className={`${prefixCls}-lable-number`} onClick={this.handleModeChange}>
            {mode[2]}
          </label>
          {enableAlpha && <label className={`${prefixCls}-lable-alpha`}>A</label>}
        </div>
      </div>
    );
  }
}

polyfill(Params);

export default Params;
