import React from 'react';

const Preloader = () => {
  const image = require('../../styles/preloader.gif');
  return (
    <div>
      <br /><br /><br /><br /><br /><br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <img
        src={image}
        alt="No logo"
        height="80"
        width="100"
      />
      <br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default Preloader;
