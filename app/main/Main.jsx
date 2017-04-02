import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

export default function Main(props) {
  const { title, link, meta, children } = props;
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
}

Main.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  meta: PropTypes.array
};
