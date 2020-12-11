let isServer = false;
/* istanbul ignore next */
export const on = (function() {
  if (!isServer && document.addEventListener) {
    return function(element: HTMLElement | Document, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        // @ts-ignore
        element.attachEvent('on' + event, handler);
      }
    };
  }
})();

/* istanbul ignore next */
export const off = (function() {
  if (!isServer && document.removeEventListener) {
    return function(element: HTMLElement | Document, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element: HTMLElement, event, handler) {
      if (element && event) {
        // @ts-ignore
        element.detachEvent('on' + event, handler);
      }
    };
  }
})();
