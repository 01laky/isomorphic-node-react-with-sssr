export function addEventListener(node, event, listener) {
  if (node.addEventListener) {
    node.addEventListener(event, listener, false);
  } else if (node.attachEvent) {
    node.attachEvent('on' + event, listener);
  }
}

export function removeEventListener(node, event, listener) {
  if (node.removeEventListener) {
    node.removeEventListener(event, listener, false);
  } else {
    node.detachEvent('on' + event, listener);
  }
}

export const canUseDOM = !!(typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement);
