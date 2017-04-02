import React from 'react';
import {Link} from 'react-router';

export default function Homepage() {
  return (
    <div>
      <div className="row">
        <h1 className="col-md-offset-3 col-md-6">
          SIMPLE APP HOMEPAGE
        </h1>
      </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div className="row">
        <div className="col-md-offset-5 col-md-2">
          <Link
            to="/demo"
          >
            TODO-LIST
          </Link>
        </div>
      </div>
    </div>
  );
}
