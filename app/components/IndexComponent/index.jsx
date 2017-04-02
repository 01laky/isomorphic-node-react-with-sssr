import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import BaseComponent from '../BaseComponent';
import _runClientLoader from './runClientLoader';

class IndexComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this._runClientLoader = _runClientLoader.bind(this);
  }

  componentDidMount() {
    const {
      props: { location: { pathname } },
      context: { store }
    } = this;
    return this._runClientLoader(store, pathname);
  }
}

IndexComponent.contextTypes = {
  router: PropTypes.object,
  store: PropTypes.object
};

IndexComponent.propTypes = {
  location: PropTypes.object.isRequired
};

export default IndexComponent;
