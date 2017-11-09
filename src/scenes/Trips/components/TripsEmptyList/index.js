import React from 'react';
import { PropTypes } from 'prop-types';
import { translate } from 'utils/i18n';

const TripsEmptyList = props => {
  return (
    <div>
      {translate({ id: `trips.${props.type}EmptyList` })}
    </div>
  );
};

TripsEmptyList.propTypes = {
  type: PropTypes.string.isRequired
};

export default TripsEmptyList;
