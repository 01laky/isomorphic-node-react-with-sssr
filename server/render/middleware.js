import axios from 'axios';
import { createMemoryHistory, match } from 'react-router';
import createRouter, { _getRoutePath } from '../../app/router';
import configureStore from '../../app/store/configureStore';
import rootReducer from '../../app/reducers';
import { baseURL } from '../../config/app';
import renderOnServer from './renderOnServer';
import requireRootSaga from '../../app/sagas/RootSagas';

axios.defaults.baseURL = baseURL;

function runServerRender(store, props, res) {
  const routerPath = _getRoutePath(props);
  const requiredRootSaga = requireRootSaga(routerPath);
  if (requiredRootSaga) {
    store.runSagas(requiredRootSaga).done.then((...args) => {
      const html = renderOnServer(store, props, args);
      res.status(200).send(html);
    });
    store.stopSagas(store.dispatch);
  } else {
    const html = renderOnServer(store, props);
    res.status(200).send(html);
  }
}

function makeReducerOnServer() {
  const reducer = rootReducer();
  return reducer.toJS ? reducer.toJS() : reducer;
}

function makeStoreOnServer() {
  const history = createMemoryHistory();
  const serverReducer = makeReducerOnServer();
  return configureStore({ ...serverReducer }, history);
}

export default (req, res) => {
  const store = makeStoreOnServer();
  const router = createRouter(store);
  match({ routes: router, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      runServerRender(store, props, res);
    } else {
      res.sendStatus(404);
    }
  });
};
