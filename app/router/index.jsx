import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../main';
import Homepage from '../features/Homepage';
import Demo from '../features/Demo';
import {getRoutePath} from './routerHelpers';

export const _getRoutePath = getRoutePath;

export default (store) => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Homepage} />
      <Route path="demo" component={Demo} />
    </Route>);
}
