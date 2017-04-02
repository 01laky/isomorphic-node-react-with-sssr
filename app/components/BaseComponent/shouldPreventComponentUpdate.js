import { isObject as _isObject } from 'lodash';

function isSomeContainerUnitialized(previousContainer, nextContainer) {
  return typeof previousContainer !== 'object' ||
    !_isObject(previousContainer) ||
    previousContainer === null ||
    typeof nextContainer !== 'object' ||
    !_isObject(nextContainer) ||
    nextContainer === null;
}

function shouldUseImmutableCompare(previousContainer, nextContainer) {
  return previousContainer.equals && nextContainer.equals;
}

function compareImmutableContainers(previousContainer, nextContainer) {
  return previousContainer.equals(nextContainer);
}

function getContainerKeys(container) {
  return Object.keys(container);
}

function hasDifferentKeys(previousContainerKeys, nextContainerKeys) {
  return previousContainerKeys.length !== nextContainerKeys.length;
}

export default (previousContainer, nextContainer) => {
  if (previousContainer === nextContainer) return true;

  if (isSomeContainerUnitialized(previousContainer, nextContainer)) {
    return false;
  }

  if (shouldUseImmutableCompare(previousContainer, nextContainer)) {
    return compareImmutableContainers(previousContainer, nextContainer);
  }

  const previousContainerKeys = getContainerKeys(previousContainer);
  const nextContainerKeys = getContainerKeys(nextContainer);

  if (hasDifferentKeys(previousContainerKeys, nextContainerKeys)) return false;

  const nextContainerHasOwnProperty = Object.prototype.hasOwnProperty.bind(
    nextContainer
  );

  for (let i = 0; i < previousContainerKeys.length; i += 1) {
    if (!nextContainerHasOwnProperty(previousContainerKeys[i])) return false;
    const previousVal = previousContainer[previousContainerKeys[i]];
    const nextVal = nextContainer[nextContainerKeys[i]];

    if (previousVal && previousVal.equals && (nextVal && nextVal.equals)) {
      if (!previousVal.equals(nextVal)) return false;
    } else if (previousVal !== nextVal) {
      return false;
    }
  }

  return true;
};
