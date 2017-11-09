import React from 'react';
import PropTypes from 'prop-types';

const MainTitle = props => {
  return (
    <div className="main-title">
      <h1>{props.title}</h1>
    </div>
  );
};

MainTitle.propTypes = {
  title: PropTypes.object.isRequired
};

export default MainTitle;
