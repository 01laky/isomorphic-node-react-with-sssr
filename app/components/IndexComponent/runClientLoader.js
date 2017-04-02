import { isObject as _isObject } from 'lodash';
import Promise from 'bluebird';
import getRootAction from './getRootAction';
import { isClient } from '../../../config/app';

function _isString(val) {
  return val ? typeof val === 'string' || val instanceof String : false;
}

function _isArray(val) {
  return val ? Object.prototype.toString.call(val) === '[object Array]' : false;
}

function _clientLoadPromises(store, pathname) {
  const rootActions = getRootAction(pathname);
  const { resolve } = Promise;
  const { dispatch } = store;
  if (rootActions && _isArray(rootActions)) {
    return rootActions.map(rootActionType =>
      resolve(dispatch({ type: rootActionType })));
  } else if (rootActions && _isString(rootActions)) {
    return [resolve(dispatch({ type: rootActions }))];
  }
  return [resolve()];
}

export default function runClientLoader(store, pathname) {
    return (isClient && (store && _isObject(store) && store.dispatch))
      ? Promise.all(_clientLoadPromises(store, pathname))
      : Promise.resolve();
}
