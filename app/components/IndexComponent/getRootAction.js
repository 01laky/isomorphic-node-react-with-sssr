import { isObject as _isObject } from 'lodash';
import actionsConfig from './rootActions.json';

function getAction(pathname) {
  const foundActionKey = Object.keys(actionsConfig).find(
    actionKey => actionKey === pathname
  );
  return foundActionKey ? actionsConfig[foundActionKey] : null;
}

export default (pathname) => {
  const rootAction = getAction(pathname);
  if (rootAction) {
    return _isObject(rootAction)
      ? rootAction.map(actionIndex => rootAction[actionIndex])
      : [rootAction];
  }
  return [];
};
