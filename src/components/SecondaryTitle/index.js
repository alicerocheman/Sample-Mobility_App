import React from 'react';
import PropTypes from 'prop-types';

const SecondaryTitle = props => {
  const icon = props.icon
    ? props.icon
    : <div
        style={{
          fontSize: '8px',
          height: '24px',
          lineHeight: '24px',
          textAlign: 'center',
          width: '24px'
        }}
      >
        <span>{props.iconTxt}</span>
      </div>;

  return (
    <div style={{ display: 'flex', flexShrink: 0 }}>
      <span style={{ margin: '.8rem .8rem .5rem 0', minHeight: '24px' }}>
        {icon}
      </span>
      <h2
        style={{
          fontSize: '1rem',
          margin: '1rem 0 .5rem',
          minHeight: '24px'
        }}
      >
        {props.title}
      </h2>
    </div>
  );
};

SecondaryTitle.propTypes = {
  title: PropTypes.object.isRequired,
  icon: PropTypes.element,
  iconTxt: PropTypes.string
};

export default SecondaryTitle;
