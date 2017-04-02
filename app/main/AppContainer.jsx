import React, { PropTypes } from 'react';
// import classNames from 'classnames/bind';
// import styles from '../styles/main';

// const cx = classNames.bind(styles);

export default function AppContainer(props) {
  const { children } = props;
  return (
    <div className="app row">
      {children}
    </div>
  );
}

// AppContainer.propTypes = {
//   children: PropTypes.object
// };
