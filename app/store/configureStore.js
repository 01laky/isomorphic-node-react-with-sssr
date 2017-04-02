import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import rootSaga from '../sagas';
import { isClient, isDebug } from '../../config/app';

const composeEnhancers = typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const sagaMiddleware = createSagaMiddleware();

function composeMiddleware(history) {
  return isClient && isDebug
    ? [routerMiddleware(history), sagaMiddleware, createLogger()]
    : [routerMiddleware(history), sagaMiddleware];
}

function stopSagas(dispatch) {
  return dispatch && dispatch(END);
}

function configureStoreWithSagas(store) {
  sagaMiddleware.run(rootSaga);

  return {
    ...store,
    stopSagas,
    runSagas: sagaMiddleware.run
  };
}

function treatModuleHot(store) {
  if (module.hot) {
    const { hot: { accept } } = module;
    accept('reducers', () => {
      const nextReducer = require('../reducers');

      const { replaceReducer } = store;
      replaceReducer(nextReducer);
    });
  }
}

function composeStore(initialState, middleware) {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
  );
}

/**
** Server && client side common store configuration
**/
export default (initialState, history) => {
  const middleware = composeMiddleware(history);
  const store = composeStore(initialState, middleware);

  treatModuleHot(store);

  return configureStoreWithSagas(store);
};
