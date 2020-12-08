import Trigger from 'rc-trigger';
import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import DropdownMenu from './DropdownMenu';
import * as ReactDOM from 'react-dom';
import { isSingleMode, saveRef } from './util';

Trigger.displayName = 'Trigger';

const BUILT_IN_PLACEMENTS = {
  bottomLeft: {
    points: ['tl', 'bl'],
    offset: [0, 4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
  topLeft: {
    points: ['bl', 'tl'],
    offset: [0, -4],
    overflow: {
      adjustX: 0,
      adjustY: 1,
    },
  },
};

export type SelectValue = { label: string, title: string, name: string }

export interface SelectTriggerProps {
  onPopupFocus?: () => void
  onPopupScroll?: () => void
  dropdownMatchSelectWidth?: boolean
  dropdownAlign?: object
  visible?: boolean
  disabled?: boolean
  showSearch?: boolean
  dropdownClassName?: string
  multiple?: boolean
  inputValue?: string
  filterOption?: boolean | (() => [])
  options: any[]
  prefixCls?: string
  popupClassName?: string
  showAction?: string[]
  onMenuSelect?: (object) => void
  onMenuDeselect?: (object) => void
  value: string
  backfillValue?: string
  firstActiveValue?: SelectValue | SelectValue[]
  defaultActiveFirstOption?: boolean
  dropdownMenuStyle?: React.CSSProperties
  transitionName?: string
  animation?: string
  dropdownStyle?: React.CSSProperties
  onDropdownVisibleChange?: (visible: boolean) => void
  getPopupContainer?: (node: React.ReactNode) => HTMLElement
}

export interface SelectTriggerState {
  dropdownWidth: any
}

export default class SelectTrigger extends React.Component<SelectTriggerProps, SelectTriggerState> {
  static displayName = 'SelectTrigger';

  static propTypes = {
    onPopupFocus: PropTypes.func,
    onPopupScroll: PropTypes.func,
    dropdownMatchSelectWidth: PropTypes.bool,
    dropdownAlign: PropTypes.object,
    visible: PropTypes.bool,
    disabled: PropTypes.bool,
    showSearch: PropTypes.bool,
    dropdownClassName: PropTypes.string,
    multiple: PropTypes.bool,
    inputValue: PropTypes.string,
    filterOption: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.func,
    ]),
    options: PropTypes.array,
    prefixCls: PropTypes.string,
    popupClassName: PropTypes.string,
    children: PropTypes.node,
    showAction: PropTypes.arrayOf(PropTypes.string),
  };

  saveDropdownMenuRef: (node: React.ReactNode) => void
  saveTriggerRef: React.Ref<HTMLElement> = null
  dropdownMenuRef: { menuRef: React.ReactNode }= null
  triggerRef: typeof Trigger = null

  constructor(props) {
    super(props);

    this.saveDropdownMenuRef = saveRef(this, 'dropdownMenuRef');
    this.saveTriggerRef = saveRef(this, 'triggerRef');

    this.state = {
      dropdownWidth: null,
    };
  }

  componentDidMount() {
    this.setDropdownWidth();
  }

  componentDidUpdate() {
    this.setDropdownWidth();
  }

  setDropdownWidth = () => {
    const width = (ReactDOM.findDOMNode(this) as HTMLElement).offsetWidth;

    if (width !== this.state.dropdownWidth) {
      this.setState({ dropdownWidth: width });
    }
  }

  getInnerMenu = () => {
    return this.dropdownMenuRef && this.dropdownMenuRef.menuRef;
  };

  getPopupDOMNode = () => {
    return this.triggerRef.getPopupDomNode();
  };

  getDropdownElement = newProps => {
    const props = this.props;
    return (
      <DropdownMenu
        ref={this.saveDropdownMenuRef}
        {...newProps}
        prefixCls={this.getDropdownPrefixCls()}
        onMenuSelect={props.onMenuSelect}
        onMenuDeselect={props.onMenuDeselect}
        onPopupScroll={props.onPopupScroll}
        value={props.value}
        backfillValue={props.backfillValue}
        firstActiveValue={props.firstActiveValue}
        defaultActiveFirstOption={props.defaultActiveFirstOption}
        dropdownMenuStyle={props.dropdownMenuStyle}
      />
    );
  };

  getDropdownTransitionName = () => {
    const props = this.props;
    let transitionName = props.transitionName;
    if (!transitionName && props.animation) {
      transitionName = `${this.getDropdownPrefixCls()}-${props.animation}`;
    }
    return transitionName;
  };

  getDropdownPrefixCls = () => {
    return `${this.props.prefixCls}-dropdown`;
  };

  render() {
    const { onPopupFocus, ...props } = this.props;
    const {
      multiple,
      visible,
      inputValue,
      dropdownAlign,
      disabled,
      showSearch,
      dropdownClassName,
      dropdownStyle,
      dropdownMatchSelectWidth,
    } = props;
    const dropdownPrefixCls = this.getDropdownPrefixCls();
    const popupClassName = {
      [dropdownClassName]: !!dropdownClassName,
      [`${dropdownPrefixCls}--${multiple ? 'multiple' : 'single'}`]: 1,
    };
    const popupElement = this.getDropdownElement({
      menuItems: props.options,
      onPopupFocus,
      multiple,
      inputValue,
      visible,
    });
    let hideAction;
    if (disabled) {
      hideAction = [];
    } else if (isSingleMode(props) && !showSearch) {
      hideAction = ['click'];
    } else {
      hideAction = ['blur'];
    }
    const popupStyle = { ...dropdownStyle };
    const widthProp = dropdownMatchSelectWidth ? 'width' : 'minWidth';
    if (this.state.dropdownWidth) {
      popupStyle[widthProp] = `${this.state.dropdownWidth}px`;
    }

    return (
      <Trigger
        {...props}
        showAction={disabled ? [] : this.props.showAction}
        hideAction={hideAction}
        ref={this.saveTriggerRef}
        popupPlacement="bottomLeft"
        builtinPlacements={BUILT_IN_PLACEMENTS}
        prefixCls={dropdownPrefixCls}
        popupTransitionName={this.getDropdownTransitionName()}
        onPopupVisibleChange={props.onDropdownVisibleChange}
        popup={popupElement}
        popupAlign={dropdownAlign}
        popupVisible={visible}
        getPopupContainer={props.getPopupContainer}
        popupClassName={classnames(popupClassName)}
        popupStyle={popupStyle}
      >
        {props.children}
      </Trigger>
    );
  }
}
