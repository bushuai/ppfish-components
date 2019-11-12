"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

exports.__esModule = true;
exports.default = void 0;

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.set-prototype-of");

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var __extends = void 0 && (void 0).__extends || function () {
  var _extendStatics = function extendStatics(d, b) {
    _extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
      }
    };

    return _extendStatics(d, b);
  };

  return function (d, b) {
    _extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __rest = void 0 && (void 0).__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

var TimelineItem =
/** @class */
function (_super) {
  __extends(TimelineItem, _super);

  function TimelineItem() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  TimelineItem.prototype.render = function () {
    var _a, _b;

    var _c = this.props,
        prefixCls = _c.prefixCls,
        className = _c.className,
        _d = _c.color,
        color = _d === void 0 ? '' : _d,
        children = _c.children,
        pending = _c.pending,
        dot = _c.dot,
        restProps = __rest(_c, ["prefixCls", "className", "color", "children", "pending", "dot"]);

    var itemClassName = (0, _classnames.default)((_a = {}, _a[prefixCls + "-item"] = true, _a[prefixCls + "-item-pending"] = pending, _a), className);
    var dotClassName = (0, _classnames.default)((_b = {}, _b[prefixCls + "-item-head"] = true, _b[prefixCls + "-item-head-custom"] = dot, _b[prefixCls + "-item-head-" + color] = true, _b));
    return React.createElement("li", __assign({}, restProps, {
      className: itemClassName
    }), React.createElement("div", {
      className: prefixCls + "-item-tail"
    }), React.createElement("div", {
      className: dotClassName,
      style: {
        borderColor: /blue|red|green/.test(color) ? undefined : color
      }
    }, dot), React.createElement("div", {
      className: prefixCls + "-item-content"
    }, children));
  };

  TimelineItem.defaultProps = {
    prefixCls: 'fishd-timeline',
    color: 'blue',
    pending: false
  };
  return TimelineItem;
}(React.Component);

var _default = TimelineItem;
exports.default = _default;