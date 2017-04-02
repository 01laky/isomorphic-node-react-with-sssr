import React, { PropTypes } from 'react';
import { isObject as _isObject } from 'lodash';
import shouldPreventComponentUpdate from './shouldPreventComponentUpdate';

export default class BaseComponent extends React.Component {
  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  };

  shouldComponentUpdate(nextProps, nextState) {
    const { state, props } = this;
    return !shouldPreventComponentUpdate(props, nextProps) ||
      !shouldPreventComponentUpdate(state, nextState);
  }
}
