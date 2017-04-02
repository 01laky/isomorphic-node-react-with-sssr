import React from 'react';
import cx from 'classnames';
import Main from './Main';
import AppContainer from './AppContainer';
import { links } from './assets';
import BaseComponent from '../components/BaseComponent';

export default class App extends BaseComponent {

  render() {
    return (
      <Main title="Some page title" meta={[]} link={links}>
        <div className={cx('container-fluid')}>
          <AppContainer {...this.props} />
        </div>
      </Main>
    );
  }
}
