import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createRouter from './router';
import configureStore from './store/configureStore';
import Promise from 'bluebird';

/**
** Get state from server side render
**/
const initialState = window.__STATIC_INITIAL_STATE__;
window.Promise = Promise;

const store = configureStore(initialState, browserHistory);
const history = syncHistoryWithStore(browserHistory, store, {adjustUrlOnReplay: false});
const routes = createRouter(store);
render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('app')
);
