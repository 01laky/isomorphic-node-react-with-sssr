import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
import getAppScripts from './getAppScripts';
import getStaticStyles from './getStaticStyles';
import { isObject as _isObject } from 'lodash';

const renderStatic = (store, props) =>
  renderToString(
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  );

const createInitialState = store => {
  const failState = {};
  const state = (store &&
    _isObject(store) &&
    store.getState &&
    store.getState()) ||
    failState;
  return JSON.stringify(state);
};

const createPageRender = (
  { staticComponent, initialState, headAssets, appScripts, staticStyles }
) => {
  const { meta, title, link } = headAssets;
  return `
<!doctype html>
<html>
  <head>
    ${title.toString()}
    ${meta.toString()}
    ${link.toString()}
  </head>
  <body>
    ${appScripts.map(appScript => appScript)}
    ${staticStyles.map(staticStyleScript => staticStyleScript)}
  </body>
</html>`;
};

export default (store, props) => {
  const initialState = createInitialState(store);
  const staticComponent = renderStatic(store, props);
  const headAssets = Helmet.rewind();
  const appScripts = getAppScripts(initialState, staticComponent);
  const staticStyles = getStaticStyles();
  return createPageRender({
    staticComponent,
    initialState,
    headAssets,
    appScripts,
    staticStyles
  });
};
