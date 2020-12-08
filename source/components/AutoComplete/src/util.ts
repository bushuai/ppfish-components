import * as React from 'react';

export function toTitle(title) {
  if (typeof title === 'string') {
    return title;
  }
  return null;
}

export function getValuePropValue(child) {
  if (!child) {
    return null;
  }

  const props = child.props;
  if ('value' in props) {
    return props.value;
  }
  if (child.key) {
    return child.key;
  }
  if (child && child.isSelectOptGroup && props.label) {
    return props.label;
  }
  throw new Error(
    `Need at least a key or a value or a label (only for OptGroup) for ${child}`
  );
}

export function getPropValue(child, prop) {
  if (prop === 'value') {
    return getValuePropValue(child);
  }
  return child.props[prop];
}

export function isMultiple(props) {
  return props.multiple;
}

export function isCombobox(props) {
  return props.combobox;
}

export function isMultipleOrTags(props) {
  return props.multiple || props.tags;
}

export function isMultipleOrTagsOrCombobox(props) {
  return isMultipleOrTags(props) || isCombobox(props);
}

export function isSingleMode(props) {
  return !isMultipleOrTagsOrCombobox(props);
}

export function childrenToArray(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function toArray(value) {
  let ret = value;
  if (value === undefined) {
    ret = [];
  } else if (!Array.isArray(value)) {
    ret = [value];
  }
  return ret;
}

export function getMapKey(value) {
  return `${typeof value}-${value}`;
}

export function preventDefaultEvent(e: React.MouseEvent<Element>) {
  e.preventDefault();
}

export function findIndexInValueBySingleValue(value, singleValue) {
  let index = -1;
  for (let i = 0; i < value.length; i++) {
    if (value[i] === singleValue) {
      index = i;
      break;
    }
  }
  return index;
}

export function getLabelFromPropsValue(value, key) {
  let label;
  value = toArray(value);
  for (let i = 0; i < value.length; i++) {
    if (value[i].key === key) {
      label = value[i].label;
      break;
    }
  }
  return label;
}

export function getSelectKeys(menuItems, value) {
  if (value === null || value === undefined) {
    return [];
  }
  let selectedKeys = [];
  React.Children.forEach(menuItems, (item: any) => {
    if (item.isMenuItemGroup) {
      selectedKeys = selectedKeys.concat(
        getSelectKeys(item.props.children, value)
      );
    } else {
      const itemValue = getValuePropValue(item);
      const itemKey = item.key;
      if (findIndexInValueBySingleValue(value, itemValue) !== -1 && itemKey) {
        selectedKeys.push(itemKey);
      }
    }
  });
  return selectedKeys;
}

export const UNSELECTABLE_STYLE: React.CSSProperties = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
};

export const UNSELECTABLE_ATTRIBUTE = {
  unselectable: 'on',
};

export function findFirstMenuItem(children) {
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (child.isMenuItemGroup) {
      const found = findFirstMenuItem(child.props.children);
      if (found) {
        return found;
      }
    } else if (!child.props.disabled) {
      return child;
    }
  }
  return null;
}

export function includesSeparators(string, separators) {
  for (let i = 0; i < separators.length; ++i) {
    if (string.lastIndexOf(separators[i]) > 0) {
      return true;
    }
  }
  return false;
}

export function splitBySeparators(string, separators) {
  const reg = new RegExp(`[${separators.join()}]`);
  return string.split(reg).filter(token => token);
}

export function defaultFilterFn(input, child) {
  if (child.props.disabled) {
    return false;
  }
  const value = toArray(getPropValue(child, this.props.optionFilterProp)).join('');
  return (
    value.toLowerCase().indexOf(input.toLowerCase()) > -1
  );
}

export function validateOptionValue(value, props) {
  if (isSingleMode(props) || isMultiple(props)) {
    return;
  }
  if (typeof value !== 'string') {
    throw new Error(
      `Invalid \`value\` of type \`${typeof value}\` supplied to Option, ` +
      `expected \`string\` when \`tags/combobox\` is \`true\`.`
    );
  }
}

type SaveRefFunc = (node: React.ReactNode) => void

export function saveRef(instance: React.ReactInstance, name: string): SaveRefFunc {
  return (node: React.ReactNode) => {
    instance[name] = node;
  };
}
