import React from 'react';

import { CircularProgress } from 'material-ui';

const Loader = () => {
  return (
    <div className="loading">
      <CircularProgress size={80} thickness={5} />
    </div>
  );
};

export default Loader;
